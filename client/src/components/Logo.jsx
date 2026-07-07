export default function Logo({ className = "" }) {
  return (
    <span className={`font-display font-extrabold text-2xl text-forest leading-none ${className}`}>
      Ciao
      <span className="block text-[0.5rem] tracking-[0.25em] font-semibold font-body uppercase -mt-1">
        Matcha Bar
      </span>
    </span>
  );
}
