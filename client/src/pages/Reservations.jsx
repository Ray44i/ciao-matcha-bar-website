import { useState } from "react";
import { api } from "../api.js";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const initial = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: 2,
  special_request: "",
};

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

function Label({ children }) {
  return (
    <span className="block text-[11px] font-semibold uppercase tracking-widest text-forest/50 mb-1.5">
      {children}
    </span>
  );
}

const inputClass =
  "w-full border border-forest/15 rounded-[18px] px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-forest/20 text-forest placeholder:text-forest/35";

export default function Reservations() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({
      ...f,
      [field]: value,
    }));
  }

  function adjustGuests(delta) {
    setForm((f) => ({
      ...f,
      guests: Math.max(1, f.guests + delta),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setStatus("loading");
    setError("");

    try {
      await api.post("/reservations", form);
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-14 mb-12">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <Eyebrow>Reservation</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            Book your{" "}
            <span className="font-accent italic font-medium">table.</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

          <p className="mt-5 text-forest/70 max-w-xl text-lg">
            Reserve your table and enjoy a relaxing matcha moment in our cozy
            pink café corner.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-[32px] bg-white/90 border border-forest/10 p-8 md:p-10 shadow-xl">
          {status === "success" ? (
            <div className="relative rounded-[28px] border-2 border-dashed border-forest/25 bg-ciao-gradient-soft overflow-hidden">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl" />

              <div className="relative z-10 flex items-center justify-between px-6 pt-6">
                <span className="font-accent italic text-sm text-forest/60">
                  Ciao Matcha Bar
                </span>

                <span className="text-[10px] uppercase tracking-widest text-forest/50 border border-forest/30 rounded-full px-2.5 py-1 -rotate-3">
                  Confirmed
                </span>
              </div>

              <div className="relative z-10 px-6 pt-5">
                <p className="font-display font-extrabold text-2xl text-forest">
                  Reservation received! 🎉
                </p>

                <p className="text-sm text-forest/70 mt-2">
                  We&apos;ll confirm your table by email shortly.
                </p>
              </div>

              <div className="relative my-6">
                <div className="border-t-2 border-dashed border-forest/25" />
                <span className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-white" />
                <span className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-white" />
              </div>

              <div className="relative z-10 px-6 pb-6">
                <WaveRule className="w-16 h-3 text-clay/50" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Full name</Label>
                <input
                  className={inputClass}
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  required
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
                  required
                />
              </div>

              <div>
                <Label>Phone number</Label>
                <input
                  className={inputClass}
                  placeholder="Optional"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Date</Label>
                  <input
                    className={inputClass}
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label>Time</Label>
                  <input
                    className={inputClass}
                    type="time"
                    value={form.time}
                    onChange={(e) => update("time", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Guests</Label>

                <div className="flex items-center gap-4 border border-forest/15 rounded-[18px] px-4 py-3 bg-white/80 w-fit">
                  <button
                    type="button"
                    onClick={() => adjustGuests(-1)}
                    aria-label="Fewer guests"
                    className="w-8 h-8 rounded-full border border-forest/20 text-forest text-lg leading-none flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
                  >
                    –
                  </button>

                  <span className="font-accent italic font-semibold text-xl text-forest w-6 text-center">
                    {form.guests}
                  </span>

                  <button
                    type="button"
                    onClick={() => adjustGuests(1)}
                    aria-label="More guests"
                    className="w-8 h-8 rounded-full border border-forest/20 text-forest text-lg leading-none flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <Label>Special request</Label>
                <textarea
                  className={inputClass}
                  placeholder="Optional — anniversary, allergies, window seat..."
                  rows={4}
                  value={form.special_request}
                  onChange={(e) => update("special_request", e.target.value)}
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full"
              >
                {status === "loading" ? "Reserving..." : "Reserve Now"}
              </Button>
            </form>
          )}
        </div>

        <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/40 bg-ciao-gradient-soft h-[650px]">
          <video
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-full object-cover"
          >
            <source src="/videos/reservation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none" />

          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-full px-5 py-3 border border-white/50 shadow-lg">
            <span className="font-accent italic text-sm text-forest">
              A quiet corner in Moda
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}