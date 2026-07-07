import { Router } from "express";
import db from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(db.prepare("SELECT * FROM blog_posts ORDER BY id DESC").all());
});

router.get("/:id", (req, res) => {
  const post = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

router.post("/", requireAuth, requireAdmin, (req, res) => {
  const { title, excerpt, content, image } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const info = db
    .prepare("INSERT INTO blog_posts (title, excerpt, content, image) VALUES (?, ?, ?, ?)")
    .run(title, excerpt || "", content || "", image || "");
  res.status(201).json({ id: info.lastInsertRowid });
});

router.delete("/:id", requireAuth, requireAdmin, (req, res) => {
  db.prepare("DELETE FROM blog_posts WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

export default router;
