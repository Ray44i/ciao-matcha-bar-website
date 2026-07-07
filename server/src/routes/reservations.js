import { Router } from "express";
import db from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/", (req, res) => {
  const { name, email, phone, date, time, guests, special_request } = req.body;
  if (!name || !email || !date || !time) {
    return res.status(400).json({ error: "name, email, date and time are required" });
  }
  const info = db
    .prepare(
      `INSERT INTO reservations (name, email, phone, res_date, res_time, guests, special_request)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(name, email, phone || "", date, time, guests || 2, special_request || "");
  res.status(201).json({ id: info.lastInsertRowid });
});

router.get("/", requireAuth, requireAdmin, (_req, res) => {
  res.json(db.prepare("SELECT * FROM reservations ORDER BY id DESC").all());
});

router.put("/:id/status", requireAuth, requireAdmin, (req, res) => {
  const { status } = req.body;
  if (!["pending", "confirmed", "cancelled"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  db.prepare("UPDATE reservations SET status = ? WHERE id = ?").run(status, req.params.id);
  res.json({ ok: true });
});

export default router;
