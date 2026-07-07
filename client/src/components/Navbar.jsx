import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import Logo from "./Logo.jsx";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/menu", label: "Menu" },
  { to: "/order", label: "Order" },
  { to: "/reservations", label: "Reservations" },
  { to: "/location", label: "Location" },
  { to: "/blog", label: "Blog" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-forest font-semibold"
                    : "text-forest/60 hover:text-forest"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative inline-flex items-center justify-center text-forest hover:text-forest-light transition-colors"
            aria-label="Shopping Cart"
          >
            <span className="text-lg">🛍</span>

            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-5 px-1 rounded-full bg-forest text-white text-[11px] font-bold flex items-center justify-center shadow-md">
                {count}
              </span>
            )}
          </Link>

          {/* User */}
          {user ? (
            <div className="hidden md:flex items-center gap-3 text-sm">
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-forest/70 hover:text-forest"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="text-forest/70 hover:text-forest"
              >
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline text-sm text-forest/70 hover:text-forest"
            >
              Login
            </Link>
          )}

          {/* Order Button */}
          <Link
            to="/order"
            className="hidden sm:inline-flex items-center bg-forest text-cream text-sm font-semibold px-5 py-2 rounded-full hover:bg-forest-light transition-colors"
          >
            Order Now
          </Link>

          {/* Mobile Menu */}
          <button
            className="lg:hidden text-2xl px-1"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <nav className="lg:hidden border-t border-forest/10 bg-cream px-5 py-4 flex flex-col gap-3 text-sm font-medium">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-forest/80 hover:text-forest"
            >
              {l.label}
            </NavLink>
          ))}

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="text-forest/80"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-left text-forest/80"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-forest/80"
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}