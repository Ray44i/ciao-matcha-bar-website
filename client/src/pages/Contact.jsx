import { useState } from "react";
import { api } from "../api.js";
import { Section, Eyebrow, Button } from "../components/ui.jsx";

const initial = { name: "", email: "", message: "" };

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

function MailIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PhoneIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2C10.5 21 3 13.5 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function AtIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-4 7.5" />
    </svg>
  );
}

const inputClass =
  "w-full border border-forest/15 rounded-[18px] px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-forest/20 text-forest placeholder:text-forest/35";

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await api.post("/contact", form);
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
          <Eyebrow>Contact us</Eyebrow>

          <h1 className="font-display font-extrabold text-4xl md:text-6xl text-forest leading-[1.05]">
            We&apos;re here{" "}
            <span className="font-accent italic font-medium">for you.</span>
          </h1>

          <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

          <p className="mt-5 text-forest/70 max-w-xl text-lg">
            Questions, collaborations, private events, or just a sweet matcha
            thought — send us a message.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-[32px] bg-white/90 border border-forest/10 p-8 md:p-10 shadow-xl">
          {status === "success" ? (
            <div className="relative rounded-[28px] border-2 border-dashed border-forest/25 bg-ciao-gradient-soft p-8">
              <div className="flex items-center justify-between">
                <span className="font-accent italic text-sm text-forest/60">
                  Ciao Matcha Bar
                </span>
                <span className="text-[10px] uppercase tracking-widest text-forest/50 border border-forest/30 rounded-full px-2.5 py-1 -rotate-3">
                  Sent
                </span>
              </div>

              <p className="font-display font-extrabold text-2xl text-forest mt-5">
                Message sent!
              </p>

              <p className="text-sm text-forest/70 mt-2">
                We&apos;ll get back to you soon.
              </p>

              <WaveRule className="w-14 h-3 mt-5 text-clay/50" />
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
                <Label>Message</Label>
                <textarea
                  className={inputClass}
                  placeholder="How can we help?"
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <Button type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Sending…" : "Send Message"}
              </Button>
            </form>
          )}
        </div>

        <div className="relative rounded-[32px] border-2 border-dashed border-forest/20 bg-[#fff3f8] p-8 md:p-10 shadow-xl overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-pink-300/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-green-200/40 rounded-full blur-3xl" />

          <div className="absolute top-6 right-6 w-16 h-20 rotate-3 border border-forest/30 bg-cream flex items-center justify-center shadow-sm">
            <span className="font-accent italic text-[9px] text-forest/60 text-center leading-tight">
              Ciao
              <br />
              Istanbul
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-forest/50">
              Find us
            </span>

            <h2 className="font-display font-extrabold text-3xl text-forest mt-3">
              Say ciao anytime.
            </h2>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4 pb-5 border-b border-dashed border-forest/20">
                <span className="text-clay bg-white/80 border border-white/60 rounded-full w-10 h-10 flex items-center justify-center">
                  <MailIcon />
                </span>
                <p className="text-forest/80">hello@ciaomatchabar.com</p>
              </div>

              <div className="flex items-center gap-4 pb-5 border-b border-dashed border-forest/20">
                <span className="text-clay bg-white/80 border border-white/60 rounded-full w-10 h-10 flex items-center justify-center">
                  <PhoneIcon />
                </span>
                <p className="text-forest/80">+90 555 123 45 67</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-clay bg-white/80 border border-white/60 rounded-full w-10 h-10 flex items-center justify-center">
                  <AtIcon />
                </span>
                <p className="text-forest/80">@ciaomatchabar</p>
              </div>
            </div>

            <WaveRule className="w-16 h-3 mt-8 text-clay/40" />
          </div>
        </div>
      </div>
    </Section>
  );
}