# Ciao Matcha Bar — Full-Stack Website

A complete website for Ciao Matcha Bar (Kadıköy, Istanbul): customer-facing site (home, about, menu,
order online + cart/checkout, gallery, reservations, location, blog, shop, contact, login/register)
plus an admin dashboard (orders, reservations, menu management, contact messages, sales stats).

Built to match the supplied brand mood board: dark forest green (#0B4A3C), pastel gradient
(mint/blush/lilac/butter), Poppins (display) + Inter (body).

## Stack

- **Frontend**: React + Vite + Tailwind CSS + React Router + Recharts (admin charts)
- **Backend**: Node.js + Express + Node's built-in `node:sqlite` (zero native build tools required)
- **Auth**: JWT, bcrypt password hashing. First registered account becomes admin automatically.
- **Payments**: Stripe Checkout integration (test mode). Cash-on-delivery is also supported.

## Project structure

```
ciaomatcha/
  server/   Express API (port 4000)
  client/   React app (port 5173)
```

## Getting started

### 1. Backend

```bash
cd server
cp .env.example .env       # then edit JWT_SECRET and (optionally) STRIPE_SECRET_KEY
npm install
npm run seed                # loads demo menu, shop products, blog posts
npm start                   # http://localhost:4000
```

Requires **Node.js 22.5+** (uses the built-in `node:sqlite` module, still experimental — you'll see
a harmless warning on boot). If you'd rather use Postgres in production, swap `src/db.js` for a `pg`
client; every query in the route files uses plain SQL that's Postgres-compatible with minor syntax
tweaks (e.g. `?` → `$1`).

### 2. Frontend

```bash
cd client
npm install
npm run dev                 # http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:4000`, so just run both and open
`http://localhost:5173`.

### 3. Create your admin account

Register the first account from the site's "Login → Create one" flow — it's automatically promoted
to `admin` and can access `/admin`. Every account after that is a regular customer.

### 4. Enable card payments (optional)

Add your Stripe secret key to `server/.env`:

```
STRIPE_SECRET_KEY=sk_test_...
```

Without it, the "Card / Apple Pay" checkout option gracefully falls back to an order confirmation
(so the demo still works without a Stripe account) — the order is still recorded, just without
automated payment collection.

## What's implemented

- Full page set from the mood board, styled to the brand's gradient/typography system
- Menu with category filters, live from the database
- Order Online flow: cart → checkout (contact + payment method) → Stripe Checkout session or
  cash-on-delivery confirmation
- Reservation booking form → stored + manageable from admin
- Contact form → stored + viewable from admin
- Blog (list + detail), Gallery (filterable), Shop (merch)
- JWT auth: register/login, protected admin route
- Admin dashboard: revenue/orders/customers stats, sales-over-time chart, orders-by-status chart,
  top products, order status management, reservation status management, menu item CRUD, contact
  message inbox

## What you'll want to add before going fully live

- Real product photography (all images are placeholder emoji tiles right now — swap in real photos
  and an image upload flow, e.g. via S3/Cloudinary)
- Production database (Postgres) and hosting (e.g. Railway/Render for the API, Vercel/Netlify for
  the client)
- Email notifications for orders/reservations (e.g. Resend or Postmark)
- Rate limiting and stricter input validation on the API
- A real Stripe account + webhook handler to mark orders "paid" automatically on successful payment
