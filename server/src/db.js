import { DatabaseSync } from "node:sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "ciao.db");

export const db = new DatabaseSync(DB_PATH);
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS menu_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT NOT NULL,          -- drinks | desserts | specials
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image TEXT,
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image TEXT,
  stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'pending', -- pending | paid | preparing | completed | cancelled
  subtotal REAL NOT NULL,
  delivery_fee REAL NOT NULL DEFAULT 2.0,
  total REAL NOT NULL,
  payment_method TEXT,
  stripe_session_id TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_address TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL DEFAULT 'menu', -- menu | product
  ref_id INTEGER,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  res_date TEXT NOT NULL,
  res_time TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  special_request TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | cancelled
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image TEXT,
  published_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'drinks' -- drinks | desserts | interior
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
`);

export default db;
