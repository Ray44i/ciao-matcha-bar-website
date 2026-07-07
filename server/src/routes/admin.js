import { Router } from "express";
import db from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
router.use(requireAuth, requireAdmin);

router.get("/stats", (_req, res) => {
  const totalOrders = db.prepare("SELECT COUNT(*) c FROM orders").get().c;
  const revenue = db.prepare("SELECT COALESCE(SUM(total),0) t FROM orders WHERE status != 'cancelled'").get().t;
  const newCustomers = db
    .prepare("SELECT COUNT(*) c FROM users WHERE created_at >= datetime('now', '-30 day')")
    .get().c;
  const totalCustomers = db.prepare("SELECT COUNT(*) c FROM users").get().c;

  const salesOverview = db
    .prepare(
      `SELECT date(created_at) as day, SUM(total) as revenue
       FROM orders WHERE status != 'cancelled'
       GROUP BY day ORDER BY day DESC LIMIT 14`
    )
    .all()
    .reverse();

  const topProducts = db
    .prepare(
      `SELECT name, SUM(qty) as units, SUM(price*qty) as revenue
       FROM order_items GROUP BY name ORDER BY revenue DESC LIMIT 5`
    )
    .all();

  const ordersByStatus = db
    .prepare(`SELECT status, COUNT(*) as c FROM orders GROUP BY status`)
    .all();

  const recentOrders = db.prepare("SELECT * FROM orders ORDER BY id DESC LIMIT 6").all();

  res.json({
    totalOrders,
    revenue,
    newCustomers,
    totalCustomers,
    salesOverview,
    topProducts,
    ordersByStatus,
    recentOrders,
  });
});

export default router;
