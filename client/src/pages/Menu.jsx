import { useEffect, useState } from "react";
import { api } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const CATS = [
  { key: "all", label: "All" },
  { key: "drinks", label: "Drinks" },
  { key: "desserts", label: "Desserts" },
];

const DEFAULT_ITEMS = [
  {
    id: "drink-1",
    name: "Classic Matcha Latte",
    category: "drinks",
    description: "Ceremonial-grade matcha whisked with steamed milk.",
    price: 4.5,
  },
  {
    id: "drink-2",
    name: "Strawberry Matcha",
    category: "drinks",
    description: "Layered strawberry purée and creamy matcha over ice.",
    price: 5.2,
  },
  {
    id: "drink-3",
    name: "Coconut Matcha",
    category: "drinks",
    description: "Matcha with coconut milk for a tropical twist.",
    price: 5.2,
  },
  {
    id: "drink-4",
    name: "Iced Matcha Latte",
    category: "drinks",
    description: "Our classic latte, chilled and refreshing.",
    price: 4.8,
  },
  {
    id: "drink-5",
    name: "Blue Matcha",
    category: "drinks",
    description: "Creamy blue matcha latte with a soft floral finish.",
    price: 5.4,
  },
  {
    id: "drink-6",
    name: "Vanilla Matcha",
    category: "drinks",
    description: "Smooth matcha layered with sweet vanilla cream.",
    price: 5.1,
  },
  {
    id: "drink-7",
    name: "Mango Matcha",
    category: "drinks",
    description: "Bright mango purée with creamy ceremonial matcha.",
    price: 5.4,
  },
  {
    id: "drink-8",
    name: "Purple Matcha",
    category: "drinks",
    description: "Colorful purple latte with matcha and creamy milk.",
    price: 5.4,
  },
  {
    id: "drink-9",
    name: "Ceremonial Matcha",
    category: "drinks",
    description: "Pure ceremonial matcha prepared simply and beautifully.",
    price: 4.9,
  },

  {
    id: "dessert-1",
    name: "Matcha Cheesecake",
    category: "desserts",
    description: "Baked cheesecake swirled with ceremonial matcha.",
    price: 4.9,
  },
  {
    id: "dessert-2",
    name: "Matcha Tiramisu",
    category: "desserts",
    description: "Espresso-free tiramisu reimagined with matcha layers.",
    price: 5.3,
  },
  {
    id: "dessert-3",
    name: "Matcha Cookie",
    category: "desserts",
    description: "Soft matcha cookie with white chocolate and matcha glaze.",
    price: 5.2,
  },
  {
    id: "dessert-4",
    name: "Cookies",
    category: "desserts",
    description: "Fresh baked cookies with a soft center and sweet finish.",
    price: 4.5,
  },
  {
    id: "dessert-5",
    name: "Matcha Roll Cake",
    category: "desserts",
    description: "Soft sponge rolled with matcha cream.",
    price: 4.8,
  },
  {
    id: "dessert-6",
    name: "Chocolate Croissant",
    category: "desserts",
    description: "Fresh buttery croissant filled with rich chocolate.",
    price: 4.8,
  },
  {
    id: "dessert-7",
    name: "Matcha Croissant",
    category: "desserts",
    description: "Flaky croissant with smooth ceremonial matcha cream.",
    price: 5.2,
  },
];

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

function mergeItems(apiItems) {
  const map = new Map();

  DEFAULT_ITEMS.forEach((item) => {
    map.set(item.name, item);
  });

  apiItems.forEach((item) => {
    map.set(item.name, {
      ...item,
      category: item.category?.toLowerCase() || "drinks",
    });
  });

  return Array.from(map.values());
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

function LeafIcon({ className = "w-3.5 h-3.5" }) {
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
      <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14Z" />
      <path d="M6 18c3-4 6-7 12-10" />
    </svg>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[28px] overflow-hidden bg-white border border-forest/10 flex flex-col shadow-sm">
      <div className="aspect-square bg-forest/5 animate-pulse" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-2.5 w-16 rounded-full bg-forest/10 animate-pulse" />
        <div className="h-4 w-3/4 rounded-full bg-forest/10 animate-pulse" />
        <div className="h-3 w-full rounded-full bg-forest/10 animate-pulse" />
      </div>
    </div>
  );
}
export default function Menu() {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [cat, setCat] = useState("all");
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);

    api
      .get("/menu")
      .then((data) => setItems(mergeItems(data)))
      .catch(() => setItems(DEFAULT_ITEMS))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems =
    cat === "all" ? items : items.filter((item) => item.category === cat);

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-12">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <Eyebrow>Our Menu</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            What are you{" "}
            <span className="font-accent italic font-medium">craving?</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-4 text-clay/70" />

          <p className="mt-5 text-forest/70 max-w-2xl text-lg">
            Explore our premium matcha drinks, creamy lattes, desserts, and
            colorful specials.
          </p>

          <div className="mt-8 flex gap-3 flex-wrap">
            {CATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  cat === c.key
                    ? "bg-forest text-cream border-forest shadow-lg"
                    : "bg-white/70 border-forest/15 text-forest/70 hover:border-forest hover:text-forest"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-[28px] overflow-hidden bg-white border border-forest/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-pink-50 relative">
                <img
                  src={getImage(item)}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-pink-100/10 via-transparent to-white/5" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="inline-flex items-center gap-1.5 w-fit text-[11px] font-semibold uppercase tracking-widest text-clay bg-clay/10 px-2.5 py-1 rounded-full">
                  <LeafIcon />
                  {item.category}
                </span>

                <h3 className="font-display font-bold text-lg text-forest mt-3">
                  {item.name}
                </h3>

                <p className="text-sm text-forest/60 mt-2 flex-1 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="font-accent italic font-semibold text-xl text-forest">
                    €{Number(item.price).toFixed(2)}
                  </span>

                  <Button
                    onClick={() =>
                      addItem({
                        ...item,
                        image: getImage(item),
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

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-16 rounded-[28px] border border-dashed border-forest/20 bg-white/60">
              <p className="font-display font-bold text-lg text-forest">
                Nothing here yet
              </p>
              <p className="mt-1 text-sm text-forest/60">
                Try another category.
              </p>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}