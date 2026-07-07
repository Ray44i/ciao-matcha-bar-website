import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Button } from "../components/ui.jsx";

const TABS = ["Overview", "Orders", "Reservations", "Menu", "Messages"];
const PIE_COLORS = ["#0B4A3C", "#BDEBD3", "#FBD2E1", "#E4D3F5", "#FDF0BE"];

const inputClass =
  "border border-forest/15 rounded-[16px] px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-forest/20 text-sm text-forest";

function WaveRule({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 16"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0,8 Q20,0 40,8 T80,8 T120,8 T160,8 T200,8 T240,8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[28px] bg-white/90 border border-forest/10 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [tab, setTab] = useState("Overview");

  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-12 mb-8">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-forest/50">
            Ciao Matcha Admin
          </p>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-forest mt-3">
            Admin{" "}
            <span className="font-accent italic font-medium">Dashboard.</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-4 text-clay/70" />

          <p className="mt-4 text-forest/70 max-w-2xl">
            Manage orders, reservations, menu items and customer messages from
            one clean control center.
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-8 rounded-[24px] bg-white/70 border border-forest/10 p-2 shadow-sm">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              tab === t
                ? "bg-forest text-cream shadow-lg"
                : "text-forest/55 hover:text-forest hover:bg-forest/5"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && <Overview token={token} />}
      {tab === "Orders" && <Orders token={token} />}
      {tab === "Reservations" && <Reservations token={token} />}
      {tab === "Menu" && <MenuManager token={token} />}
      {tab === "Messages" && <Messages token={token} />}
    </div>
  );
}

function Overview({ token }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats", token).then(setStats);
  }, [token]);

  if (!stats) return <p className="text-forest/50">Loading stats…</p>;

  const cards = [
    ["Total Orders", stats.totalOrders],
    ["Revenue", `€${stats.revenue.toFixed(2)}`],
    ["New Customers", stats.newCustomers],
    ["Total Customers", stats.totalCustomers],
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(([label, value]) => (
          <Card key={label} className="p-5 hover:shadow-xl transition-all">
            <p className="text-xs uppercase tracking-widest text-forest/40">
              {label}
            </p>
            <p className="font-display font-extrabold text-3xl text-forest mt-2">
              {value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-display font-bold text-xl text-forest mb-5">
            Sales Overview
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={stats.salesOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B4A3C10" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0B4A3C"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-display font-bold text-xl text-forest mb-5">
            Orders by Status
          </h3>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={stats.ordersByStatus}
                dataKey="c"
                nameKey="status"
                innerRadius={45}
                outerRadius={80}
              >
                {stats.ordersByStatus.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="text-xs text-forest/60 flex flex-wrap gap-3 mt-3">
            {stats.ordersByStatus.map((s, i) => (
              <span key={s.status} className="flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {s.status} ({s.c})
              </span>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-display font-bold text-xl text-forest mb-5">
            Top Products
          </h3>

          <div className="space-y-3 text-sm">
            {stats.topProducts.map((p) => (
              <div
                key={p.name}
                className="flex justify-between rounded-[18px] bg-cream/70 border border-forest/5 px-4 py-3 text-forest/70"
              >
                <span>{p.name}</span>
                <span className="font-semibold">€{p.revenue.toFixed(2)}</span>
              </div>
            ))}

            {stats.topProducts.length === 0 && (
              <p className="text-forest/40">No sales yet.</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-display font-bold text-xl text-forest mb-5">
            Recent Orders
          </h3>

          <div className="space-y-3 text-sm">
            {stats.recentOrders.map((o) => (
              <div
                key={o.id}
                className="flex justify-between rounded-[18px] bg-cream/70 border border-forest/5 px-4 py-3 text-forest/70"
              >
                <span>
                  #{o.id} — {o.contact_name || "Guest"}
                </span>
                <span className="font-semibold">
                  €{o.total.toFixed(2)} · {o.status}
                </span>
              </div>
            ))}

            {stats.recentOrders.length === 0 && (
              <p className="text-forest/40">No orders yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const STATUSES = ["pending", "paid", "preparing", "completed", "cancelled"];

  function load() {
    api.get("/orders", token).then(setOrders);
  }

  useEffect(load, [token]);

  async function updateStatus(id, status) {
    await api.put(`/orders/${id}/status`, { status }, token);
    load();
  }

  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-forest/50 border-b border-forest/10">
            <th className="p-4">Order</th>
            <th className="p-4">Customer</th>
            <th className="p-4">Total</th>
            <th className="p-4">Payment</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-forest/5">
              <td className="p-4 font-semibold text-forest">#{o.id}</td>
              <td className="p-4 text-forest/70">
                {o.contact_name || "Guest"}
              </td>
              <td className="p-4 text-forest/70">€{o.total.toFixed(2)}</td>
              <td className="p-4 text-forest/70">{o.payment_method}</td>
              <td className="p-4">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o.id, e.target.value)}
                  className={inputClass}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-forest/40">
                No orders yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}

function Reservations({ token }) {
  const [list, setList] = useState([]);

  function load() {
    api.get("/reservations", token).then(setList);
  }

  useEffect(load, [token]);

  async function updateStatus(id, status) {
    await api.put(`/reservations/${id}/status`, { status }, token);
    load();
  }

  return (
    <Card className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-forest/50 border-b border-forest/10">
            <th className="p-4">Name</th>
            <th className="p-4">Date</th>
            <th className="p-4">Guests</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {list.map((r) => (
            <tr key={r.id} className="border-b border-forest/5">
              <td className="p-4 font-semibold text-forest">{r.name}</td>
              <td className="p-4 text-forest/70">
                {r.res_date} {r.res_time}
              </td>
              <td className="p-4 text-forest/70">{r.guests}</td>
              <td className="p-4">
                <select
                  value={r.status}
                  onChange={(e) => updateStatus(r.id, e.target.value)}
                  className={inputClass}
                >
                  {["pending", "confirmed", "cancelled"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}

          {list.length === 0 && (
            <tr>
              <td colSpan={4} className="p-8 text-center text-forest/40">
                No reservations yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}

function MenuManager({ token }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    category: "drinks",
    name: "",
    price: "",
    description: "",
  });

  function load() {
    api.get("/menu").then(setItems);
  }

  useEffect(load, []);

  async function addItem(e) {
    e.preventDefault();

    await api.post("/menu", { ...form, price: Number(form.price) }, token);

    setForm({
      category: "drinks",
      name: "",
      price: "",
      description: "",
    });

    load();
  }

  async function removeItem(id) {
    await api.del(`/menu/${id}`, token);
    load();
  }

  return (
    <div className="space-y-6">
      <Card className="p-5">
        <form onSubmit={addItem} className="grid sm:grid-cols-5 gap-3">
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) =>
              setForm((f) => ({ ...f, category: e.target.value }))
            }
          >
            <option value="drinks">Drinks</option>
            <option value="desserts">Desserts</option>
            <option value="specials">Specials</option>
          </select>

          <input
            className={`${inputClass} sm:col-span-2`}
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />

          <input
            className={inputClass}
            placeholder="Price"
            type="number"
            step="0.1"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            required
          />

          <Button type="submit" className="!py-2 text-sm">
            Add item
          </Button>
        </form>
      </Card>

      <Card className="divide-y divide-forest/5 overflow-hidden">
        {items.map((it) => (
          <div
            key={it.id}
            className="flex items-center justify-between p-4 text-sm"
          >
            <span className="text-forest">
              {it.name}{" "}
              <span className="text-forest/40">({it.category})</span>
            </span>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-forest">
                €{it.price.toFixed(2)}
              </span>

              <button
                onClick={() => removeItem(it.id)}
                className="text-forest/40 hover:text-red-600 text-xs"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <p className="p-8 text-center text-forest/40">No menu items yet.</p>
        )}
      </Card>
    </div>
  );
}

function Messages({ token }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/contact", token).then(setMessages);
  }, [token]);

  return (
    <Card className="divide-y divide-forest/5 overflow-hidden">
      {messages.map((m) => (
        <div key={m.id} className="p-5 text-sm">
          <p className="font-semibold text-forest">
            {m.name}{" "}
            <span className="font-normal text-forest/50">— {m.email}</span>
          </p>

          <p className="text-forest/70 mt-2 leading-relaxed">{m.message}</p>
        </div>
      ))}

      {messages.length === 0 && (
        <p className="p-8 text-center text-forest/40">No messages yet.</p>
      )}
    </Card>
  );
}