import { Router } from "express";
import Stripe from "stripe";
import db from "../db.js";
import { requireAuth, requireAdmin, optionalAuth } from "../middleware/auth.js";

const router = Router();
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

const DELIVERY_FEE = 2.0;

// Create an order (cash/pay-on-pickup) OR kick off a Stripe Checkout session
router.post("/", optionalAuth, (req, res) => {
  const { items, contact, payment_method } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Order must include at least one item" });
  }

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const total = subtotal + DELIVERY_FEE;

  const orderInfo = db
    .prepare(
      `INSERT INTO orders (user_id, status, subtotal, delivery_fee, total, payment_method, contact_name, contact_email, contact_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      req.user?.id ?? null,
      "pending",
      subtotal,
      DELIVERY_FEE,
      total,
      payment_method || "card",
      contact?.name || "",
      contact?.email || "",
      contact?.address || ""
    );

  const orderId = orderInfo.lastInsertRowid;
  const insertItem = db.prepare(
    "INSERT INTO order_items (order_id, item_type, ref_id, name, price, qty) VALUES (?, 'menu', ?, ?, ?, ?)"
  );
  for (const it of items) insertItem.run(orderId, it.id ?? null, it.name, it.price, it.qty);

  res.status(201).json({ id: orderId, subtotal, total });
});

// Create a Stripe Checkout Session for an existing order (requires STRIPE_SECRET_KEY set)
router.post("/:id/checkout-session", optionalAuth, async (req, res) => {
  if (!stripe) {
    return res.status(501).json({
      error:
        "Stripe isn't configured yet. Add STRIPE_SECRET_KEY to server/.env to enable card payments.",
    });
  }
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        ...items.map((it) => ({
          price_data: {
            currency: "eur",
            product_data: { name: it.name },
            unit_amount: Math.round(it.price * 100),
          },
          quantity: it.qty,
        })),
        {
          price_data: {
            currency: "eur",
            product_data: { name: "Delivery fee" },
            unit_amount: Math.round(order.delivery_fee * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/order/success?order_id=${order.id}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout?cancelled=1`,
    });

    db.prepare("UPDATE orders SET stripe_session_id = ? WHERE id = ?").run(session.id, order.id);
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Current user's orders
router.get("/mine", requireAuth, (req, res) => {
  const orders = db.prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC").all(req.user.id);
  const withItems = orders.map((o) => ({
    ...o,
    items: db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(o.id),
  }));
  res.json(withItems);
});

// Admin: list all orders
router.get("/", requireAuth, requireAdmin, (_req, res) => {
  const orders = db.prepare("SELECT * FROM orders ORDER BY id DESC").all();
  res.json(orders);
});

router.get("/:id", requireAuth, (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ error: "Order not found" });
  if (req.user.role !== "admin" && order.user_id !== req.user.id) {
    return res.status(403).json({ error: "Not your order" });
  }
  const items = db.prepare("SELECT * FROM order_items WHERE order_id = ?").all(order.id);
  res.json({ ...order, items });
});

router.put("/:id/status", requireAuth, requireAdmin, (req, res) => {
  const { status } = req.body;
  const valid = ["pending", "paid", "preparing", "completed", "cancelled"];
  if (!valid.includes(status)) return res.status(400).json({ error: "Invalid status" });
  db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ ok: true });
});

export default router;
