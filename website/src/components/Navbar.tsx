import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 w-full z-50 flex justify-center py-4 px-4 sm:px-6 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-full border",
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-slate-200/50 py-2"
            : "bg-white/70 backdrop-blur-sm shadow-sm border-transparent py-3"
        )}
      >
        <div className="px-6 sm:px-8">
          <div className="flex justify-between items-center h-14">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Sema Salama Logo" className="h-8 w-8 object-contain" />
              <span className="font-bold text-xl tracking-tight">Sema Salama</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-semibold transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center pb-1",
                    location.pathname === link.path ? "text-primary after:scale-x-100" : "text-slate-700"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://chrome.google.com/webstore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-bold hover:bg-secondary hover:-translate-y-0.5 transition-all shadow-md hover:shadow-lg"
              >
                <span>Chrome Store</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-700 hover:text-primary focus:outline-none transition-colors"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Links */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-xl transition-all duration-300 ease-in-out overflow-hidden pointer-events-auto",
            isOpen ? "max-h-80 opacity-100 py-4" : "max-h-0 opacity-0 py-0 border-transparent shadow-none"
          )}
        >
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-brand-light hover:text-primary transition-colors mx-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <a
                href="https://chrome.google.com/webstore"
                className="flex justify-center items-center space-x-2 w-full px-4 py-3.5 rounded-xl bg-primary text-white font-bold shadow-md hover:bg-secondary transition-colors"
              >
                <span>Add to Chrome</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}