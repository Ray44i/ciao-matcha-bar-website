export function Section({ children, className = "", id }) {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-forest/60 mb-3">
      {children}
    </p>
  );
}

export function Button({ as: As = "button", className = "", variant = "primary", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors";
  const variants = {
    primary: "bg-forest text-cream hover:bg-forest-light",
    secondary: "bg-transparent border border-forest text-forest hover:bg-forest hover:text-cream",
    ghost: "text-forest hover:underline",
  };
  return <As className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white/70 rounded-xl2 border border-forest/10 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
