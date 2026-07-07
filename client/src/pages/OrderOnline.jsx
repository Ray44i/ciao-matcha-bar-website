import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const IMAGE_MAP = {
  "Classic Matcha Latte": "/images/matcha-latte.png",
  "Strawberry Matcha": "/images/strawberry-latte.png",
  "Coconut Matcha": "/images/coconut-matcha.png",
  "Iced Matcha Latte": "/images/classic.png",
  "Blue Matcha": "/images/blue-matcha.png",
  "Vanilla Matcha": "/images/vanilla-matcha.png",
  "Mango Matcha": "/images/mango-matcha.png",
  "Purple Matcha": "/images/purple-matcha.png",
  "Ceremonial Matcha": "/images/ceremonial.png",

  "Matcha Cheesecake": "/images/Matcha-Cheesecake.jpg",
  "Matcha Tiramisu": "/images/Matcha-Tiramisu.jpg",
  "Matcha Cookie": "/images/Matcha-Cookie.jpg",
  "Cookies": "/images/cookies.jpg",
  "Matcha Roll Cake": "/images/Matcha-Roll-Cake.jpg",
  "Chocolate Croissant": "/images/Chocolate-Croissant.jpg",
  "Matcha Croissant": "/images/Matcha-Croissant.jpg",
};

function getImage(item) {
  return IMAGE_MAP[item.name] || "/images/classic.png";
}

function WaveRule({ className = "" }) {
  return (
    <svg viewBox="0 0 240 16" preserveAspectRatio="none" className={className}>
      <path
        d="M0,8 Q20,0 40,8 T80,8 T120,8 T160,8 T200,8 T240,8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export default function OrderOnline() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    items: cartItems,
    addItem,
    updateQty,
    subtotal,
    total,
    DELIVERY_FEE,
  } = useCart();

  useEffect(() => {
    api
      .get("/menu")
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-12">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Eyebrow>Order Online</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            1. Choose your{" "}
            <span className="font-accent italic font-medium">items.</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-4 text-clay/70" />

          <p className="mt-5 text-forest/70 max-w-xl text-lg">
            Add your favorite matcha drinks and desserts to your cart.
          </p>
        </div>
      </div>

      <div className="mt-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {loading ? (
            <p className="text-forest/50">Loading menu…</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-[28px] bg-white/85 border border-forest/10 p-4 flex items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="w-24 h-24 rounded-[22px] overflow-hidden bg-pink-50 shrink-0">
                    <img
                      src={getImage(item)}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-forest text-base truncate">
                      {item.name}
                    </p>

                    <p className="text-xs text-forest/50 capitalize">
                      {item.category}
                    </p>

                    <p className="mt-1 text-sm font-bold text-forest">
                      ₺{Number(item.price).toFixed(0)}
                    </p>
                  </div>

                  <Button
                    onClick={() =>
                      addItem({
                        ...item,
                        image: getImage(item),
                      })
                    }
                    variant="secondary"
                    className="!px-3 !py-1.5 text-xs shrink-0"
                  >
                    Add
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="rounded-[32px] bg-white/90 border border-forest/10 p-6 h-fit sticky top-24 shadow-xl">
          <h2 className="font-display font-bold text-xl text-forest mb-4">
            Order Summary
          </h2>

          {cartItems.length === 0 ? (
            <div className="rounded-[24px] bg-pink-50/70 border border-pink-100 p-5">
              <p className="text-sm text-forest/60">
                Your cart is empty. Add something delicious.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between gap-3 text-sm rounded-[20px] bg-cream/70 border border-forest/10 p-3"
                >
                  <div>
                    <p className="font-semibold text-forest">{it.name}</p>
                    <p className="text-xs text-forest/50">
                      ₺{Number(it.price).toFixed(0)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(it.id, it.qty - 1)}
                      className="w-7 h-7 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-cream transition-colors"
                    >
                      −
                    </button>

                    <span className="w-5 text-center text-forest font-semibold">
                      {it.qty}
                    </span>

                    <button
                      onClick={() => updateQty(it.id, it.qty + 1)}
                      className="w-7 h-7 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-cream transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t border-forest/10 pt-4 mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-forest/70">
                  <span>Subtotal</span>
                  <span>₺{Number(subtotal).toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-forest/70">
                  <span>Delivery</span>
                  <span>₺{Number(DELIVERY_FEE).toFixed(0)}</span>
                </div>

                <div className="flex justify-between font-bold text-forest text-lg pt-2">
                  <span>Total</span>
                  <span>₺{Number(total).toFixed(0)}</span>
                </div>
              </div>

              <Button as={Link} to="/checkout" className="w-full mt-4">
                Checkout
              </Button>
            </div>
          )}
        </aside>
      </div>
    </Section>
  );
}