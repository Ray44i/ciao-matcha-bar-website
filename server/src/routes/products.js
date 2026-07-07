import { Router } from "express";
import db from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(db.prepare("SELECT * FROM products ORDER BY id").all());
});

router.post("/", requireAuth, requireAdmin, (req, res) => {
  const { name, description, price, image, stock } = req.body;
  if (!name || price == null) return res.status(400).json({ error: "name and price are required" });
  const info = db
    .prepare("INSERT INTO products (name, description, price, image, stock) VALUES (?, ?, ?, ?, ?)")
    .run(name, description || "", price, image || "", stock ?? 0);
  res.status(201).json({ id: info.lastInsertRowid });
});

router.put("/:id", requireAuth, requireAdmin, (req, res) => {
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Product not found" });
  const { name, description, price, image, stock } = req.body;
  db.prepare("UPDATE products SET name=?, description=?, price=?, image=?, stock=? WHERE id=?").run(
    name ?? existing.name,
    description ?? existing.description,
    price ?? existing.price,
    image ?? existing.image,
    stock ?? existing.stock,
    req.params.id
  );
  res.json({ ok: true });
});

router.delete("/:id", requireAuth, requireAdmin, (req, res) => {
  db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
