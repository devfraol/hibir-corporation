import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight, Globe } from "lucide-react";

const Footer = () => (
  <footer className="relative bg-background border-t border-border overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/3 rounded-full blur-[150px]" />

    <div className="container-custom section-padding relative z-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-lg"
              style={{ background: "var(--gold-gradient)", color: "hsl(220 60% 8%)" }}
            >
              H
            </div>
            <div>
              <span className="font-display font-bold text-lg block text-foreground">Hibir</span>
              <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-body">Construction Corp.</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
            GC-1 rated government-owned corporation building Ethiopia's infrastructure with 843 professionals and 282 vehicles, plants and machinery units.
          </p>
          <p className="text-muted-foreground text-xs font-body">
            Reg. No: 980/2008 · TIN: 0013324621
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-6 text-sm tracking-wider uppercase">Navigate</h4>
          <div className="flex flex-col gap-3">
            {[
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/projects", label: "Projects" },
              { to: "/resources", label: "Resources" },
              { to: "/safety", label: "Safety & Quality" },
              { to: "/organization", label: "Organization" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-muted-foreground text-sm font-body hover:text-accent transition-colors duration-300 flex items-center gap-1 group"
              >
                {l.label}
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-6 text-sm tracking-wider uppercase">Services</h4>
          <div className="flex flex-col gap-3 text-muted-foreground text-sm font-body">
            <span>Road Construction</span>
            <span>Bridge Construction</span>
            <span>Asphalt & Infrastructure</span>
            <span>Material Production</span>
            <span>Capacity Building</span>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-foreground mb-6 text-sm tracking-wider uppercase">Contact</h4>
          <div className="flex flex-col gap-4 text-muted-foreground text-sm font-body">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-accent shrink-0" />
              <span>Near Bahir Dar University, Gish Abay Campus, Bahir Dar, Ethiopia</span>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={16} className="mt-0.5 text-accent shrink-0" />
              <span>+251 582 20 4493</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 text-accent shrink-0" />
              <span>HCCnt2005@gmail.com</span>
            </div>
            <div className="flex items-start gap-3">
              <Globe size={16} className="mt-0.5 text-accent shrink-0" />
              <span>www.Hibir.et</span>
            </div>
            <div className="flex items-start gap-3">
              <Mail size={16} className="mt-0.5 text-accent shrink-0" />
              <span>P.O. Box 1678</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-muted-foreground/60 text-sm font-body">
          © {new Date().getFullYear()} Hibir Construction Corporation. All rights reserved.
        </p>
        <div className="flex gap-6 text-muted-foreground/60 text-xs font-body">
          <span>VAT: 3028900006</span>
          <span>Contractor Grade: GC-1</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
