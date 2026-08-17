import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/resources", label: "Resources" },
  { to: "/safety-quality", label: "Safety & Quality" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-accent-foreground focus:font-body focus:text-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-2.5 border-b shadow-lg shadow-black/5"
            : "bg-transparent py-5 border-b border-transparent"
        }`}
        style={scrolled ? { borderColor: "var(--glass-border)" } : undefined}
      >
        <nav aria-label="Primary" className="container-custom px-4 md:px-8 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Hibir Construction Corporation — home">
            <div
              className="w-10 h-10 rounded-xl grid place-items-center font-display font-bold text-base transition-transform duration-500 group-hover:scale-105"
              style={{ background: "var(--gold-gradient)", color: "hsl(var(--accent-foreground))", boxShadow: "var(--glow-gold)" }}
              aria-hidden
            >
              H
            </div>
            <div className="leading-tight">
              <span className="text-foreground font-display font-bold text-base block">Hibir</span>
              <span className="text-muted-foreground text-[9px] tracking-[0.24em] uppercase font-body">Construction Corp.</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                aria-current={isActive(l.to) ? "page" : undefined}
                className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium font-body transition-colors duration-300 ${
                  isActive(l.to) ? "text-accent" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                {isActive(l.to) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full"
                    style={{ backgroundImage: "var(--gold-gradient)" }}
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <Link to="/contact" className="hidden xl:inline-flex btn-accent text-[13px] px-5 py-2.5">
              Get in Touch
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="xl:hidden w-10 h-10 rounded-xl grid place-items-center border border-border/70 text-foreground"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[60] xl:hidden bg-background/98 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <div className="absolute inset-0 blueprint-grid opacity-40" aria-hidden />
            <div className="relative h-full flex flex-col px-6 py-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-10">
                <span className="font-display font-bold text-foreground text-base">Menu</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl grid place-items-center border border-border text-foreground"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <ul className="flex flex-col gap-1 flex-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={reduced ? false : { opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={l.to}
                      className={`flex items-baseline gap-4 py-3 border-b border-border/60 font-display font-bold text-2xl transition-colors ${
                        isActive(l.to) ? "text-accent" : "text-foreground"
                      }`}
                    >
                      <span className="text-[10px] font-body tracking-widest text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.4 }}
                className="pt-8 flex items-center gap-3"
              >
                <Link to="/contact" className="btn-accent flex-1 text-sm">
                  Get in Touch <ArrowRight size={16} />
                </Link>
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
