import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-forest text-cream mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-xl">Ciao Matcha Bar</span>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-cream/80">
          <span>Secure payments · Powered by Stripe</span>
          <span>Fast delivery · Across Istanbul</span>
          <span>Premium quality · 100% Ceremonial Matcha</span>
        </div>
        <div className="flex gap-4 text-cream/80">
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="TikTok">TT</a>
        </div>
      </div>
      <div className="border-t border-cream/10 text-center text-xs text-cream/60 py-4">
        © {new Date().getFullYear()} Ciao Matcha Bar. All rights reserved.
      </div>
    </footer>
  );
}
