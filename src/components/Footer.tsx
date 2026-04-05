import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container-custom section-padding">
      <div className="grid md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-md flex items-center justify-center font-display font-bold text-lg" style={{ background: "var(--gold-gradient)", color: "hsl(215 70% 12%)" }}>H</div>
            <div>
              <span className="font-display font-bold text-lg block">Hibir</span>
              <span className="text-primary-foreground/60 text-[10px] tracking-widest uppercase font-body">Construction Corp.</span>
            </div>
          </div>
          <p className="text-primary-foreground/60 text-sm font-body leading-relaxed">
            Government-owned construction corporation building Ethiopia's future infrastructure since establishment.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {["/about", "/services", "/projects", "/contact"].map((p) => (
              <Link key={p} to={p} className="text-primary-foreground/60 text-sm font-body hover:text-accent transition-colors">
                {p.replace("/", "").replace(/^\w/, c => c.toUpperCase()) || "Home"}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Services</h4>
          <div className="flex flex-col gap-2 text-primary-foreground/60 text-sm font-body">
            <span>Road Construction</span>
            <span>Bridge Construction</span>
            <span>Asphalt & Infrastructure</span>
            <span>Equipment Leasing</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-primary-foreground/60 text-sm font-body">
            <div className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-accent shrink-0" /> Bahir Dar, Ethiopia</div>
            <div className="flex items-start gap-2"><Phone size={16} className="mt-0.5 text-accent shrink-0" /> +251 58 220 5678</div>
            <div className="flex items-start gap-2"><Mail size={16} className="mt-0.5 text-accent shrink-0" /> info@hibirconstruction.com</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-primary-foreground/40 text-sm font-body">
        © {new Date().getFullYear()} Hibir Construction Corporation. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
