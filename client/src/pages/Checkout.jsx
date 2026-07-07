import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

/* ---------- signature wave motif, shared across the site ---------- */
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

function CupIcon({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9h11l-1 8.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.5L6 9Z" />
      <path d="M17 10.5h1.5a2.5 2.5 0 0 1 0 5H17" />
      <path d="M9 6c0-1 .5-1.5.5-2.5S9 2 9 2" />
      <path d="M12.5 6c0-1 .5-1.5.5-2.5S12.5 2 12.5 2" />
    </svg>
  );
}

function CardIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
    </svg>
  );
}

function CashIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function Label({ children }) {
  return (
    <span className="block text-[11px] font-semibold uppercase tracking-widest text-forest/50 mb-1.5">
      {children}
    </span>
  );
}

const inputClass =
  "w-full border border-forest/20 rounded-lg px-4 py-2.5 bg-white/70 focus:outline-none focus:ring-2 focus:ring-forest/20 text-forest";

export default function Checkout() {
  const { items, subtotal, total, DELIVERY_FEE, clearCart } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", address: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.address) {
      setError("Please fill in your name, email and delivery address.");
      return;
    }
    setSubmitting(true);
    try {
      const order = await api.post(
        "/orders",
        { items, contact: form, payment_method: paymentMethod },
        token
      );

      if (paymentMethod === "card") {
        try {
          const session = await api.post(`/orders/${order.id}/checkout-session`, {}, token);
          clearCart();
          window.location.href = session.url;
          return;
        } catch (stripeErr) {
          // Stripe not configured in this environment — fall back to confirmation
          clearCart();
          navigate(`/order/success?order_id=${order.id}&note=${encodeURIComponent(stripeErr.message)}`);
          return;
        }
      }

      clearCart();
      navigate(`/order/success?order_id=${order.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <Section>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
          .font-accent { font-family: 'Fraunces', serif; }
        `}</style>

        <Eyebrow>Checkout</Eyebrow>
        <div className="flex flex-col items-center text-center py-16 px-6 max-w-md mx-auto rounded-xl2 border border-dashed border-forest/20 mt-6">
          <span className="text-clay/70">
            <CupIcon className="w-10 h-10" />
          </span>
          <h1 className="font-display font-extrabold text-2xl text-forest mt-5">
            Your cup is empty
          </h1>
          <p className="mt-2 text-sm text-forest/60">
            Nothing to check out yet — go find something worth adding.
          </p>
          <WaveRule className="w-16 h-3 mt-4 text-clay/50" />
          <Button as={Link} to="/menu" className="mt-6">
            Browse the menu
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <Eyebrow>2. Checkout</Eyebrow>
      <h1 className="font-display font-extrabold text-3xl text-forest">
        Almost{" "}
        <span className="font-accent italic font-medium">there.</span>
      </h1>
      <WaveRule className="w-16 h-3 mt-3 mb-8 text-clay/70" />

      <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="font-semibold text-forest mb-3">Contact information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Full name</Label>
                <input
                  className={inputClass}
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div>
                <Label>Email</Label>
                <input
                  className={inputClass}
                  placeholder="jane@email.com"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <input
                  className={inputClass}
                  placeholder="Optional"
                  value={form.phone || ""}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Delivery address</Label>
                <textarea
                  className={inputClass}
                  placeholder="Street, building, floor, apartment"
                  rows={3}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-forest mb-3">Payment method</h2>
            <div className="flex gap-3 flex-wrap">
              {[
                ["card", "Card / Apple Pay (Stripe)", CardIcon],
                ["cash", "Cash on delivery", CashIcon],
              ].map(([val, label, Ico]) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setPaymentMethod(val)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    paymentMethod === val
                      ? "bg-forest text-cream border-forest"
                      : "border-forest/20 text-forest/70 hover:border-forest/40"
                  }`}
                >
                  <Ico />
                  {label}
                </button>
              ))}
            </div>
            {paymentMethod === "card" && (
              <p className="text-xs text-forest/50 mt-2">
                You&apos;ll be redirected to a secure Stripe checkout page to complete payment.
              </p>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {/* ---------------- order summary, same receipt as Cart ---------------- */}
        <aside className="bg-white border-2 border-dashed border-forest/20 rounded-xl2 p-6 h-fit">
          <div className="flex items-center justify-between">
            <span className="font-accent italic text-sm text-forest/60">Order summary</span>
            <span className="text-[10px] uppercase tracking-widest text-forest/40">
              {items.length} item{items.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="relative my-4">
            <div className="border-t-2 border-dashed border-forest/15" />
            <span className="absolute -left-6 -top-3 w-6 h-6 rounded-full bg-cream" />
            <span className="absolute -right-6 -top-3 w-6 h-6 rounded-full bg-cream" />
          </div>

          <div className="space-y-2 text-sm mb-4">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between text-forest/70">
                <span>
                  {it.name} × {it.qty}
                </span>
                <span>€{(it.price * it.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm border-t border-forest/10 pt-3">
            <div className="flex justify-between text-forest/70">
              <span>Subtotal</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-forest/70">
              <span>Delivery</span>
              <span>€{DELIVERY_FEE.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline font-bold text-forest text-base pt-2">
              <span>Total</span>
              <span className="font-accent italic text-xl">€{total.toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" disabled={submitting} className="w-full mt-5">
            {submitting ? "Placing order…" : "Place Order"}
          </Button>
        </aside>
      </form>
    </Section>
  );
}