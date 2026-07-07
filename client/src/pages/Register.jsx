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

function Label({ children }) {
  return (
    <span className="block text-[11px] font-semibold uppercase tracking-widest text-forest/50 mb-1.5">
      {children}
    </span>
  );
}

const inputClass =
  "w-full border border-forest/20 rounded-lg px-4 py-2.5 bg-white/70 focus:outline-none focus:ring-2 focus:ring-forest/20 text-forest";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section className="max-w-sm">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&display=swap');
        .font-accent { font-family: 'Fraunces', serif; }
      `}</style>

      <Eyebrow>Create account</Eyebrow>
      <h1 className="font-display font-extrabold text-3xl text-forest">
        Join{" "}
        <span className="font-accent italic font-medium">Ciao Matcha Bar</span>
      </h1>
      <WaveRule className="w-16 h-3 mt-3 mb-6 text-clay/60" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Full name</Label>
          <input
            className={inputClass}
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label>Password</Label>
          <input
            className={inputClass}
            placeholder="At least 8 characters"
            type="password"
            minLength={8}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            required
          />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating account…" : "Register"}
        </Button>
      </form>
      <p className="text-sm text-forest/60 mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-forest font-semibold">
          Log in
        </Link>
      </p>
    </Section>
  );
}