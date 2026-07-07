import { Router } from "express";
import db from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  const { category } = req.query;
  let rows;
  if (category && category !== "all") {
    rows = db.prepare("SELECT * FROM menu_items WHERE is_active = 1 AND category = ? ORDER BY id").all(category);
  } else {
    rows = db.prepare("SELECT * FROM menu_items WHERE is_active = 1 ORDER BY id").all();
  }
  res.json(rows);
});

router.post("/", requireAuth, requireAdmin, (req, res) => {
  const { category, name, description, price, image } = req.body;
  if (!category || !name || price == null) {
    return res.status(400).json({ error: "category, name and price are required" });
  }
  const info = db
    .prepare("INSERT INTO menu_items (category, name, description, price, image) VALUES (?, ?, ?, ?, ?)")
    .run(category, name, description || "", price, image || "");
  res.status(201).json({ id: info.lastInsertRowid });
});

router.put("/:id", requireAuth, requireAdmin, (req, res) => {
  const { category, name, description, price, image, is_active } = req.body;
  const existing = db.prepare("SELECT * FROM menu_items WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Menu item not found" });
  db.prepare(
    `UPDATE menu_items SET category=?, name=?, description=?, price=?, image=?, is_active=? WHERE id=?`
  ).run(
    category ?? existing.category,
    name ?? existing.name,
    description ?? existing.description,
    price ?? existing.price,
    image ?? existing.image,
    is_active ?? existing.is_active,
    req.params.id
  );
  res.json({ ok: true });
});

router.delete("/:id", requireAuth, requireAdmin, (req, res) => {
  db.prepare("DELETE FROM menu_items WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
