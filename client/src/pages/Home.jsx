import { Link } from "react-router-dom";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const STATS = [
  ["2K+", "Happy Customers"],
  ["50+", "Menu Items"],
  ["4.9★", "Google Rating"],
  ["100%", "Natural"],
];

const FEATURES = [
  ["leaf", "Premium Quality", "Ceremonial grade"],
  ["drop", "100% Natural", "No artificial flavors"],
  ["heart", "Handmade", "Made with love"],
  ["sprout", "Sustainable", "Eco friendly"],
];

function Icon({ name, className = "w-5 h-5" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  switch (name) {
    case "leaf":
      return (
        <svg {...common}>
          <path d="M4 20c0-8 6-14 16-14 0 10-6 16-16 14Z" />
          <path d="M6 18c3-4 6-7 12-10" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path d="M12 3c4 5 6.5 8.3 6.5 11.5A6.5 6.5 0 1 1 5.5 14.5C5.5 11.3 8 8 12 3Z" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 5c-2.3 4.5-9.3 9-9.3 9Z" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common}>
          <path d="M12 21V11" />
          <path d="M12 11C12 6 8 5 5 5c0 4 2 7 7 7Z" />
          <path d="M12 13c0-5 4-6 7-6 0 4-2 7-7 7Z" />
        </svg>
      );
    default:
      return null;
  }
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

export default function Home() {
  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }

        @keyframes ciaoBob {
          0%, 100% { transform: translateY(0) rotate(0.4deg); }
          50% { transform: translateY(-8px) rotate(-0.6deg); }
        }

        .ciao-boat svg {
          animation: ciaoBob 3.6s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .ciao-boat svg {
            animation: none;
          }
        }
      `}</style>

      {/* HERO */}
      <Section className="pt-10 md:pt-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Istanbul&apos;s own matcha bar</Eyebrow>

            <h1 className="font-display font-extrabold text-5xl md:text-6xl leading-[1.05] text-forest">
              Like you
              <br />
              <span className="font-accent italic font-medium text-forest">
                so matcha.
              </span>
            </h1>

            <WaveRule className="w-24 h-4 mt-3 text-clay/70" />

            <p className="mt-5 text-forest/70 max-w-md">
              Premium matcha drinks & desserts made with love in Istanbul.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/order">
                Order Now
              </Button>

              <Button as={Link} to="/menu" variant="secondary">
                View Menu
              </Button>
            </div>
          </div>

          <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] bg-[#fff3f8] border border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-pink-300/40 rounded-full blur-3xl z-0" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-green-200/40 rounded-full blur-3xl z-0" />

            <img
              src="/images/pp5.jpg"
              alt="Ciao Matcha Bar storefront"
              className="relative z-10 w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-pink-100/10 via-transparent to-white/10 z-20" />

            <div className="absolute bottom-5 left-5 z-30 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 border border-white/50 shadow-lg">
              <p className="text-xs font-semibold text-forest">
                ✨ Istanbul&apos;s Pink Matcha Spot
              </p>
            </div>
          </div>
        </div>

        {/* STATS + FEATURES */}
        <div className="mt-14 pt-10 border-t border-forest/10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map(([n, l], i) => (
              <div
                key={l}
                className={`px-4 md:px-6 py-2 ${
                  i > 0 ? "border-l border-forest/10" : ""
                }`}
              >
                <p className="font-accent italic font-semibold text-3xl md:text-4xl text-forest">
                  {n}
                </p>
                <p className="text-sm text-forest/60 mt-1">{l}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-y-6">
            {FEATURES.map(([icon, t, s], i) => (
              <div
                key={t}
                className={`flex items-start gap-3 px-4 md:px-6 ${
                  i > 0 ? "md:border-l md:border-forest/10" : ""
                }`}
              >
                <span className="text-clay mt-0.5 shrink-0">
                  <Icon name={icon} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-forest">{t}</p>
                  <p className="text-xs text-forest/60">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* MATCHA BOAT */}
      <Section className="!py-14">
        <div className="relative rounded-2xl border border-white/40 bg-ciao-gradient-soft p-8 md:p-14 overflow-hidden shadow-xl">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-200/30 rounded-full blur-3xl" />

          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <Eyebrow>Coming soon to the Bosphorus</Eyebrow>

              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-forest leading-tight">
                The world&apos;s first
                <br />
                <span className="font-accent italic font-medium">
                  matcha boat.
                </span>
              </h2>

              <p className="mt-4 text-forest/70 max-w-md">
                Ceremonial-grade matcha, poured over open water. Follow along
                as we bring Ciao&apos;s floating bar to life.
              </p>

              <Button as={Link} to="/about" variant="secondary" className="mt-6">
                Follow the journey
              </Button>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="ciao-boat">
                <svg
                  viewBox="0 0 800 400"
                  className="w-72 md:w-96 drop-shadow-xl"
                >
                  <path
                    d="M90,300 C60,300 40,290 30,278 L60,262 L620,215 C690,210 740,225 775,255 C745,290 690,305 620,308 L120,308 C108,308 98,305 90,300 Z"
                    fill="#F5A9C4"
                  />
                  <path
                    d="M60,262 L775,255"
                    stroke="#FFFFFF"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <path
                    d="M330,215 L470,208 C500,207 525,215 545,232 L545,255 L330,258 Z"
                    fill="#0F5C52"
                    opacity="0.92"
                  />
                  <text
                    x="555"
                    y="285"
                    fontWeight="700"
                    fontSize="34"
                    fill="#0F5C52"
                    fontStyle="italic"
                  >
                    Ciao
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section className="!py-14">
        <div className="rounded-2xl bg-ciao-gradient-soft p-8 md:p-14 shadow-xl border border-white/40">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Eyebrow>About us</Eyebrow>

              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-forest">
                More than a drink.
                <br />
                <span className="font-accent italic font-medium">
                  It&apos;s a moment.
                </span>
              </h2>

              <p className="mt-4 text-forest/70 max-w-md">
                At Ciao Matcha Bar, we believe matcha is more than just a drink
                — it&apos;s a lifestyle. We source the finest ceremonial grade
                matcha and craft every cup with care.
              </p>

              <Button as={Link} to="/about" variant="secondary" className="mt-6">
                Learn More
              </Button>
            </div>

            <div className="relative rounded-xl2 bg-white/75 border border-white/60 p-10 flex flex-col justify-center min-h-[280px] shadow-sm">
              <span className="font-accent italic text-6xl text-clay/40 leading-none absolute top-6 left-8">
                &ldquo;
              </span>

              <p className="font-accent italic text-xl md:text-2xl text-forest leading-snug relative z-10 mt-6">
                Every cup is whisked to order — no shortcuts, no syrup, just
                matcha the way it&apos;s meant to be.
              </p>

              <p className="mt-4 text-sm text-forest/50">
                — Ciao Matcha Bar
              </p>

              <WaveRule className="w-16 h-3 mt-4 text-clay/50" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}