import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

interface NavLinkItem {
  to: string;
  label: string;
  children?: { to: string; label: string }[];
}

const links: NavLinkItem[] = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about#overview", label: "Company Overview" },
      { to: "/about#history", label: "History" },
      { to: "/about#vision", label: "Vision, Mission & Values" },
      { to: "/about#objectives", label: "Objectives & Duties" },
      { to: "/about#approach", label: "Our Approach" },
      { to: "/about#why-hibir", label: "Why Choose Us" },
      { to: "/organization", label: "Leadership / Organization" },
      { to: "/about#partnerships", label: "Partnerships" },
      { to: "/about#legal-entities", label: "Legal Entities" },
      { to: "/about#certifications", label: "Certifications & Awards" },
    ],
  },
  {
    to: "/services",
    label: "Services",
    children: [
      { to: "/services/road-construction", label: "Road Construction" },
      { to: "/services/bridge-construction", label: "Bridge Construction" },
      { to: "/services/urban-infrastructure", label: "Urban Infrastructure" },
      { to: "/services/building-construction", label: "Building Construction" },
      { to: "/services/materials-production", label: "Materials Production & Supply" },
      { to: "/services/industrial-parks", label: "Industrial Parks & Facilities" },
      { to: "/services/road-maintenance", label: "Road Maintenance" },
      { to: "/services/capacity-building", label: "Capacity Building & Training" },
    ],
  },
  {
    to: "/projects",
    label: "Projects",
    children: [
      { to: "/projects#featured", label: "Featured Project" },
      { to: "/projects#completed", label: "Completed Projects" },
      { to: "/projects#ongoing", label: "Ongoing Projects" },
      { to: "/projects#suspended", label: "Suspended Projects" },
      { to: "/projects#terminated", label: "Terminated Projects" },
      { to: "/projects#gallery", label: "Project Gallery" },
    ],
  },
  {
    to: "/resources",
    label: "Resources",
    children: [
      { to: "/resources#human-resources", label: "Human Resources" },
      { to: "/resources#vehicles", label: "Vehicles" },
      { to: "/resources#plants", label: "Plants" },
      { to: "/resources#machinery", label: "Machinery" },
      { to: "/resources#equipment-capacity", label: "Equipment Capacity" },
      { to: "/resources#financial-capacity", label: "Financial Capacity" },
      { to: "/resources#construction-experience", label: "Construction Experience" },
    ],
  },
  { to: "/safety", label: "Safety & Quality" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const closeTimer = useRef<number>();
  const location = useLocation();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const navTextClass = scrolled ? "text-foreground" : "text-white/95";
  const navMutedClass = scrolled ? "text-muted-foreground" : "text-white/70";
  const navHoverTextClass = scrolled ? "hover:text-foreground" : "hover:text-white";

  const hoverOpen = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

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
            <img
              src="/Hibir%20Logo.png"
              alt=""
              aria-hidden="true"
              className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="leading-tight">
              <span className={`font-display font-bold text-base block ${navTextClass}`}>Hibir</span>
              <span className={`text-[9px] tracking-[0.24em] uppercase font-body ${scrolled ? "text-muted-foreground" : "text-white/60"}`}>
                Construction Corp.
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5">
            {links.map((l) => (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => l.children && hoverOpen(l.label)}
                onMouseLeave={() => l.children && hoverClose()}
              >
                <div className="flex items-center">
                  <Link
                    to={l.to}
                    aria-current={isActive(l.to) ? "page" : undefined}
                    className={`relative px-3 py-2 rounded-lg text-[13px] font-medium font-body transition-colors duration-300 ${
                      isActive(l.to) ? "text-accent" : `${navMutedClass} ${navHoverTextClass}`
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
                  {l.children && (
                    <button
                      type="button"
                      aria-label={`${l.label} menu`}
                      aria-expanded={openMenu === l.label}
                      onClick={() => setOpenMenu((c) => (c === l.label ? null : l.label))}
                      className={`-ml-1.5 p-1 transition-colors ${navMutedClass} ${navHoverTextClass}`}
                    >
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-300 ${openMenu === l.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {l.children && openMenu === l.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute left-0 top-full pt-3 w-64"
                    >
                      <div className="glass rounded-xl border p-2 shadow-xl shadow-black/10" style={{ borderColor: "var(--glass-border)" }}>
                        {l.children.map((c) => (
                          <Link
                            key={c.to}
                            to={c.to}
                            className="block px-3 py-2 rounded-lg text-[13px] font-body text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
            <div className="relative h-full flex flex-col px-6 py-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
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
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-border/60"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        to={l.to}
                        className={`flex items-baseline gap-4 py-3 font-display font-bold text-xl transition-colors ${
                          isActive(l.to) ? "text-accent" : "text-foreground"
                        }`}
                      >
                        <span className="text-[10px] font-body tracking-widest text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {l.label}
                      </Link>
                      {l.children && (
                        <button
                          type="button"
                          aria-label={`Toggle ${l.label} sections`}
                          aria-expanded={mobileOpen === l.label}
                          onClick={() => setMobileOpen((c) => (c === l.label ? null : l.label))}
                          className="w-9 h-9 grid place-items-center text-muted-foreground"
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${mobileOpen === l.label ? "rotate-180" : ""}`}
                          />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {l.children && mobileOpen === l.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                          className="overflow-hidden pl-8 pb-3"
                        >
                          {l.children.map((c) => (
                            <li key={c.to}>
                              <Link
                                to={c.to}
                                className="block py-2 text-sm font-body text-muted-foreground hover:text-accent transition-colors"
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
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
