import { Router } from "express";
import db from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email and message are required" });
  }
  const info = db
    .prepare("INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)")
    .run(name, email, message);
  res.status(201).json({ id: info.lastInsertRowid });
});

router.get("/", requireAuth, requireAdmin, (_req, res) => {
  res.json(db.prepare("SELECT * FROM contact_messages ORDER BY id DESC").all());
});

export default router;
