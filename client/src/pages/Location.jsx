import { Section, Eyebrow, Button } from "../components/ui.jsx";

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

export default function Location() {
  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent {
          font-family: 'Fraunces', serif;
        }
      `}</style>

      {/* HERO */}
      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-14 mb-12">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <Eyebrow>Visit us</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            Find our{" "}
            <span className="font-accent italic font-medium">
              matcha bar.
            </span>
          </h1>

          <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

          <p className="mt-5 text-forest/70 text-lg max-w-2xl">
            Nestled in the heart of Moda, Kadıköy — our café was designed
            to be your favorite slow corner in Istanbul.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">

        {/* INFO CARD */}
        <div className="relative rounded-[32px] bg-white/90 border border-forest/10 p-8 md:p-10 shadow-xl overflow-hidden">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-green-200/30 rounded-full blur-3xl" />

          <div className="relative z-10">

            <div className="mb-8">
              <div className="text-sm uppercase tracking-widest text-forest/40 font-semibold">
                📍 Address
              </div>

              <h2 className="font-display font-bold text-2xl text-forest mt-2">
                Ciao Matcha Bar
              </h2>

              <p className="mt-3 text-forest/70 leading-8">
                Caferağa Mahallesi
                <br />
                Moda Caddesi
                <br />
                Kadıköy / İstanbul
              </p>
            </div>

            <div className="border-t border-dashed border-forest/15 pt-6 mb-8">
              <div className="text-sm uppercase tracking-widest text-forest/40 font-semibold">
                🕒 Opening Hours
              </div>

              <p className="mt-3 text-forest/70 leading-8">
                Monday — Sunday
                <br />
                09:00 — 21:00
              </p>
            </div>

            <div className="border-t border-dashed border-forest/15 pt-6 mb-8">
              <div className="text-sm uppercase tracking-widest text-forest/40 font-semibold">
                ☎ Contact
              </div>

              <p className="mt-3 text-forest/70">
                +90 555 123 45 67
              </p>

              <p className="mt-2 text-forest/70">
                hello@ciaomatchabar.com
              </p>
            </div>

            <div className="rounded-[24px] bg-ciao-gradient-soft border border-white/50 p-6 mt-8">
              <p className="font-accent italic text-xl text-forest">
                "Come for the matcha,
                stay for the moment."
              </p>

              <WaveRule className="w-16 h-3 mt-4 text-clay/50" />
            </div>

            <Button
              as="a"
              href="https://maps.app.goo.gl/BdJEpYYKUC62LPsr5"
              target="_blank"
              rel="noreferrer"
              className="mt-8"
            >
              Get Directions
            </Button>
          </div>
        </div>

        {/* MAP CARD */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/50 h-[650px]">
          <iframe
            src="https://www.google.com/maps?q=Caferağa+Mahallesi+Moda+Caddesi+Kadıköy+İstanbul&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ciao Matcha Bar Location"
          />

          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md rounded-full px-5 py-3 shadow-lg border border-white/50">
            <p className="text-sm font-semibold text-forest">
              📍 Ciao Matcha Bar • Moda
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}