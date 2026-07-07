import { Link } from "react-router-dom";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const VALUES = [
  [
    "I",
    "Ceremonial grade",
    "We only work with ceremonial-grade matcha sourced from trusted farms.",
  ],
  [
    "II",
    "Small batch",
    "Everything is whisked and baked fresh, in small batches, every day.",
  ],
  [
    "III",
    "Made in Istanbul",
    "Born in Moda, Kadıköy — a neighborhood spot with a global palate.",
  ],
];

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

export default function About() {
  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-14">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>About Ciao Matcha Bar</Eyebrow>

            <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05] max-w-2xl">
              More than a drink.
              <br />
              <span className="font-accent italic font-medium">
                It&apos;s a moment.
              </span>
            </h1>

            <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

            <p className="mt-5 text-forest/70 max-w-xl">
              Ciao Matcha Bar started as a love letter to ceremonial-grade
              matcha — the kind that turns an ordinary afternoon into a small
              ritual. Every cup is whisked to order, every dessert is baked
              in-house, and every visit is meant to feel like a pause in your
              day.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/menu">
                Explore Menu
              </Button>

              <Button as={Link} to="/reservations" variant="secondary">
                Reserve a Table
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[32px] overflow-hidden aspect-[4/5] bg-[#fff3f8] border border-white/60 shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
              <img
                src="/images/pp5.jpg"
                alt="Ciao Matcha Bar interior"
                className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-pink-100/20 via-transparent to-white/10" />

              <div className="absolute top-5 right-5 w-24 h-24 -rotate-6 rounded-full bg-white/85 backdrop-blur-md border-2 border-dashed border-forest/30 flex items-center justify-center text-center shadow-lg">
                <span className="font-accent italic text-[10px] leading-tight text-forest/70 uppercase tracking-widest">
                  Moda, Kadıköy
                  <br />
                  Est. 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="mt-16 grid md:grid-cols-3 gap-5">
        {VALUES.map(([num, t, d]) => (
          <div
            key={t}
            className="relative rounded-[28px] bg-white/80 border border-forest/10 p-7 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-pink-200/30 rounded-full blur-2xl" />

            <span className="font-accent italic font-semibold text-4xl text-clay/70">
              {num}
            </span>

            <h3 className="mt-5 font-display font-bold text-lg text-forest">
              {t}
            </h3>

            <p className="mt-2 text-sm text-forest/70 leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      {/* STORY + QUOTE */}
      <div className="mt-16 grid md:grid-cols-[1fr_1.1fr] gap-8 items-stretch">
        <div className="rounded-[32px] bg-forest text-white p-8 md:p-10 shadow-xl">
          <Eyebrow className="text-white/70">Our philosophy</Eyebrow>

          <h2 className="mt-3 font-display font-extrabold text-3xl md:text-4xl leading-tight">
            Slow matcha,
            <br />
            soft moments,
            <br />
            sweet details.
          </h2>

          <p className="mt-5 text-white/75 text-sm leading-relaxed">
            We care about the small things: the texture of the foam, the balance
            of sweetness, the color of every cup, and the feeling guests take
            with them when they leave.
          </p>

          <WaveRule className="w-20 h-4 mt-6 text-white/40" />
        </div>

        <div className="relative rounded-[32px] bg-white border border-forest/10 p-8 md:p-10 shadow-xl overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-pink-200/40 rounded-full blur-3xl" />

          <span className="font-accent italic text-6xl text-clay/40 leading-none absolute top-6 left-8">
            &ldquo;
          </span>

          <p className="font-accent italic text-xl md:text-2xl text-forest leading-snug relative z-10 mt-8">
            We didn&apos;t want to open another café. We wanted a place where
            matcha gets the same care a good espresso does — slow, deliberate,
            worth the wait.
          </p>

          <p className="mt-5 text-sm text-forest/50 relative z-10">
            — The Ciao Matcha Bar team
          </p>

          <WaveRule className="w-16 h-3 mt-4 text-clay/50 relative z-10" />
        </div>
      </div>
    </Section>
  );
}