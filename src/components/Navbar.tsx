import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/safety", label: "Safety" },
  { to: "/organization", label: "Organization" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      {/* Scroll Progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-2 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-lg transition-all duration-300 group-hover:shadow-lg"
              style={{ background: "var(--gold-gradient)", color: "hsl(220 60% 8%)", boxShadow: "0 0 20px hsla(38, 92%, 50%, 0.2)" }}
            >
              H
            </div>
            <div>
              <span className="text-primary-foreground font-display font-bold text-lg leading-tight block">
                Hibir
              </span>
              <span className="text-primary-foreground/40 text-[10px] tracking-[0.2em] uppercase font-body">
                Construction Corp.
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium font-body transition-all duration-300 ${
                  location.pathname === l.to
                    ? "text-accent"
                    : "text-primary-foreground/60 hover:text-primary-foreground"
                }`}
              >
                {l.label}
                {location.pathname === l.to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: "var(--gold-gradient)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <Link to="/contact" className="hidden lg:inline-flex btn-accent text-sm px-6 py-2.5">
            Get in Touch
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-primary-foreground p-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden glass overflow-hidden"
            >
              <div className="container-custom py-6 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-4 py-3 rounded-lg text-sm font-body transition-colors ${
                      location.pathname === l.to
                        ? "text-accent bg-accent/5"
                        : "text-primary-foreground/60 hover:text-primary-foreground"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link to="/contact" className="btn-accent text-sm text-center mt-4 px-6 py-2.5">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
