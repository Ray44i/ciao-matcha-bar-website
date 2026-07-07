import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const PRODUCTS = [
  {
    id: "shop-1",
    name: "Matcha Set",
    description: "A curated starter set for making matcha at home.",
    price: 24.9,
    image: "/images/matcha-set.jpg",
  },
  {
    id: "shop-2",
    name: "Bamboo Whisk",
    description: "Traditional bamboo whisk for smooth ceremonial matcha.",
    price: 12.5,
    image: "/images/Bamboo-Whisk.jpg",
  },
  {
    id: "shop-3",
    name: "Ciao Tumbler",
    description: "Reusable Ciao tumbler for iced matcha on the go.",
    price: 14.9,
    image: "/images/Ciao-Tumbler.jpg",
  },
  {
    id: "shop-4",
    name: "Stickers",
    description: "Cute Ciao Matcha stickers for laptops, bottles and notebooks.",
    price: 3.5,
    image: "/images/stickers.jpg",
  },
];

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

export default function Shop() {
  const [products] = useState(PRODUCTS);
  const { addItem } = useCart();

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-14">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          <Eyebrow>Shop</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            Take the ritual{" "}
            <span className="font-accent italic font-medium">home.</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

          <p className="mt-5 text-forest/70 max-w-2xl text-lg">
            Discover matcha essentials, accessories and curated Ciao products.
          </p>
        </div>
      </div>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="group rounded-[32px] bg-white/90 border border-forest/10 overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="aspect-square overflow-hidden bg-pink-50">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display font-bold text-lg text-forest">
                {p.name}
              </h3>

              <p className="text-sm text-forest/60 mt-2 flex-1 leading-relaxed">
                {p.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3">
                <span className="font-accent italic font-semibold text-xl text-forest">
                  €{Number(p.price).toFixed(2)}
                </span>

                <Button
                  onClick={() =>
                    addItem({
                      id: p.id,
                      name: p.name,
                      price: Number(p.price),
                      image: p.image,
                    })
                  }
                  className="!px-4 !py-2 text-xs"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}