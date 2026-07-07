import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = Router();

function sign(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return res.status(409).json({ error: "An account with this email already exists" });

  const hash = bcrypt.hashSync(password, 10);
  // First registered user becomes admin automatically for bootstrap convenience
  const userCount = db.prepare("SELECT COUNT(*) as c FROM users").get().c;
  const role = userCount === 0 ? "admin" : "customer";

  const info = db
    .prepare("INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)")
    .run(name, email, hash, role);

  const user = { id: info.lastInsertRowid, name, email, role };
  res.status(201).json({ token: sign(user), user });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role };
  res.json({ token: sign(safeUser), user: safeUser });
});

export default router;
