import { Router } from "express";
import db from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", (req, res) => {
  const { category } = req.query;
  if (category && category !== "all") {
    return res.json(db.prepare("SELECT * FROM gallery_images WHERE category = ? ORDER BY id").all(category));
  }
  res.json(db.prepare("SELECT * FROM gallery_images ORDER BY id").all());
});

router.post("/", requireAuth, requireAdmin, (req, res) => {
  const { url, category } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  const info = db
    .prepare("INSERT INTO gallery_images (url, category) VALUES (?, ?)")
    .run(url, category || "drinks");
  res.status(201).json({ id: info.lastInsertRowid });
});

router.delete("/:id", requireAuth, requireAdmin, (req, res) => {
  db.prepare("DELETE FROM gallery_images WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
