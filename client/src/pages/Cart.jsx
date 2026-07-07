import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const IMAGE_MAP = {
  "Classic Matcha Latte": "/images/matcha-latte.png",
  "Strawberry Matcha": "/images/strawberry-latte.png",
  "Coconut Matcha": "/images/coconut-matcha.png",
  "Iced Matcha Latte": "/images/classic.png",

  "Matcha Cheesecake": "/images/ceremonial.png",
  "Matcha Tiramisu": "/images/mango-matcha.png",
  "Matcha Cookie": "/images/vanilla-matcha.png",
  "Matcha Roll Cake": "/images/purple-matcha.png",
};

function getCartImage(item) {
  return item.image || item.image_path || item.imageUrl || IMAGE_MAP[item.name] || null;
}

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

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, total, DELIVERY_FEE } =
    useCart();

  if (items.length === 0) {
    return (
      <Section>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
          .font-accent { font-family: 'Fraunces', serif; }
        `}</style>

        <Eyebrow>Cart</Eyebrow>

        <div className="flex flex-col items-center text-center py-16 px-6 max-w-md mx-auto rounded-[32px] border border-dashed border-forest/20 bg-white/80 shadow-xl mt-6">
          <span className="text-clay/70">
            <CupIcon className="w-10 h-10" />
          </span>

          <h1 className="font-display font-extrabold text-2xl text-forest mt-5">
            Your cup is empty
          </h1>

          <p className="mt-2 text-sm text-forest/60">
            Nothing steeping yet — go find something worth adding.
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

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-12 mb-10">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Eyebrow>Cart</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-forest leading-[1.05]">
            Your{" "}
            <span className="font-accent italic font-medium">Cart.</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-4 text-clay/70" />

          <p className="mt-4 text-forest/70 max-w-xl">
            Review your matcha picks before checkout.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-4">
          {items.map((it) => {
            const image = getCartImage(it);

            return (
              <div
                key={it.id}
                className="flex items-center gap-4 bg-white/80 border border-forest/10 rounded-[28px] p-4 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-20 h-20 rounded-[20px] bg-ciao-gradient-soft overflow-hidden flex items-center justify-center text-clay shrink-0">
                  {image ? (
                    <img
                      src={image}
                      alt={it.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <CupIcon className="w-7 h-7" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-forest truncate">
                    {it.name}
                  </p>

                  <p className="text-xs text-forest/60">
                    €{Number(it.price).toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(it.id, it.qty - 1)}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-cream transition-colors"
                  >
                    −
                  </button>

                  <span className="w-6 text-center font-accent italic font-semibold text-forest">
                    {it.qty}
                  </span>

                  <button
                    onClick={() => updateQty(it.id, it.qty + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full border border-forest/20 text-forest hover:bg-forest hover:text-cream transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(it.id)}
                  className="text-xs text-forest/40 hover:text-red-600 ml-2"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <aside className="bg-white/90 border-2 border-dashed border-forest/20 rounded-[32px] p-6 h-fit shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-accent italic text-sm text-forest/60">
              Order summary
            </span>

            <span className="text-[10px] uppercase tracking-widest text-forest/40">
              {items.length} item{items.length > 1 ? "s" : ""}
            </span>
          </div>

          <div className="relative my-4">
            <div className="border-t-2 border-dashed border-forest/15" />
            <span className="absolute -left-6 -top-3 w-6 h-6 rounded-full bg-cream" />
            <span className="absolute -right-6 -top-3 w-6 h-6 rounded-full bg-cream" />
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-forest/70">
              <span>Subtotal</span>
              <span>€{Number(subtotal).toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-forest/70">
              <span>Delivery</span>
              <span>€{Number(DELIVERY_FEE).toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-baseline font-bold text-forest text-base pt-3 border-t border-forest/10 mt-2">
              <span>Total</span>
              <span className="font-accent italic text-xl">
                €{Number(total).toFixed(2)}
              </span>
            </div>
          </div>

          <Button as={Link} to="/checkout" className="w-full mt-5">
            Proceed to Checkout
          </Button>
        </aside>
      </div>
    </Section>
  );
}