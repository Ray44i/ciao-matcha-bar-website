import { Link, useSearchParams } from "react-router-dom";
import { Section, Button } from "../components/ui.jsx";

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

export default function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");
  const note = params.get("note");

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-14 text-center">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="relative mx-auto mb-8 w-44 h-44">
            <div className="w-full h-full rounded-full bg-white/70 border border-white/60 overflow-hidden shadow-xl p-2">
              <img
                src="/images/matcha-latte.png"
                alt="Ciao Matcha order confirmed"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            <span className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-forest text-cream flex items-center justify-center shadow-lg text-xl">
              ✓
            </span>

            <span className="absolute -bottom-2 -right-4 -rotate-12 text-[10px] uppercase tracking-widest text-forest/70 bg-cream border-2 border-dashed border-forest/40 rounded-full w-20 h-20 flex items-center justify-center text-center leading-tight shadow-sm">
              Order
              <br />
              Confirmed
            </span>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-forest/50">
            Thank you
          </p>

          <h1 className="mt-3 font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            Order{" "}
            <span className="font-accent italic font-medium">
              confirmed!
            </span>
          </h1>

          <WaveRule className="w-20 h-4 mt-5 mx-auto text-clay/60" />

          <p className="mt-5 text-forest/70 max-w-xl mx-auto text-lg">
            Thanks — your order{" "}
            {orderId ? (
              <span className="font-accent italic font-semibold text-forest">
                #{orderId}{" "}
              </span>
            ) : (
              ""
            )}
            has been received and is being prepared by our matcha bar.
          </p>

          {note && (
            <div className="mt-6 max-w-md mx-auto rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 text-left">
              Card payment couldn&apos;t be processed automatically ({note}).
              Our team will follow up shortly to confirm payment.
            </div>
          )}

          <div className="mt-10 max-w-xl mx-auto rounded-[30px] bg-white/85 border border-forest/10 shadow-xl p-7 text-left">
            <div className="flex justify-between gap-4 pb-4 border-b border-forest/10">
              <span className="text-forest/60">Estimated ready</span>
              <span className="font-semibold text-forest">10–15 min</span>
            </div>

            <div className="flex justify-between gap-4 py-4 border-b border-forest/10">
              <span className="text-forest/60">Pickup</span>
              <span className="font-semibold text-forest text-right">
                Ciao Matcha Bar • Moda
              </span>
            </div>

            <div className="flex justify-between gap-4 pt-4">
              <span className="text-forest/60">Status</span>
              <span className="font-semibold text-forest">
                Preparing 🍵
              </span>
            </div>
          </div>

          <div className="mt-9 flex justify-center gap-3 flex-wrap">
            <Button as={Link} to="/">
              Back to Home
            </Button>

            <Button as={Link} to="/menu" variant="secondary">
              View Menu
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}