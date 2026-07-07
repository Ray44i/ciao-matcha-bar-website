import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
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

const inputClass =
  "w-full border border-forest/15 rounded-[18px] px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-forest/20 text-forest placeholder:text-forest/35";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="relative overflow-hidden rounded-[36px] bg-ciao-gradient-soft border border-white/50 shadow-xl p-8 md:p-12">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-200/40 rounded-full blur-3xl" />

          <div className="relative z-10">
            <Eyebrow>Welcome back</Eyebrow>

            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-forest leading-[1.05]">
              Log in to your{" "}
              <span className="font-accent italic font-medium">
                matcha moment.
              </span>
            </h1>

            <WaveRule className="w-24 h-4 mt-5 text-clay/70" />

            <p className="mt-5 text-forest/70 max-w-md">
              Access your orders, reservations and Ciao Matcha favorites.
            </p>

            <div className="mt-10 rounded-[28px] bg-white/70 border border-white/60 p-6 shadow-sm">
              <p className="font-accent italic text-xl text-forest leading-snug">
                “Good matcha is worth coming back for.”
              </p>

              <p className="mt-3 text-sm text-forest/50">
                — Ciao Matcha Bar
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white/90 border border-forest/10 p-8 md:p-10 shadow-xl">
          <h2 className="font-display font-extrabold text-3xl text-forest mb-2">
            Login
          </h2>

          <p className="text-sm text-forest/50 mb-6">
            Enter your details below to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              className={inputClass}
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              required
            />

            <input
              className={inputClass}
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => ({ ...f, password: e.target.value }))
              }
              required
            />

            {error && (
              <div className="rounded-[18px] bg-red-50 border border-red-200 px-4 py-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in…" : "Login"}
            </Button>
          </form>

          <p className="text-sm text-forest/60 mt-6 text-center">
            No account?{" "}
            <Link
              to="/register"
              className="text-forest font-semibold underline underline-offset-4 decoration-forest/30 hover:decoration-forest"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}