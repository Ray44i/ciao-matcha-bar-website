import "dotenv/config";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import reservationRoutes from "./routes/reservations.js";
import blogRoutes from "./routes/blog.js";
import galleryRoutes from "./routes/gallery.js";
import contactRoutes from "./routes/contact.js";
import adminRoutes from "./routes/admin.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "ciao-matcha-bar-api" }));

app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => res.status(404).json({ error: "Not found" }));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on our end" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Ciao Matcha Bar API running on http://localhost:${PORT}`));
