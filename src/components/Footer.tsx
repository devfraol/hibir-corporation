import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { services } from "@/data/services";

const columns: { title: string; links: { to: string; label: string }[] }[] = [
  {
    title: "About Hibir",
    links: [
      { to: "/about", label: "Company Overview" },
      { to: "/about#history", label: "History" },
      { to: "/about#partnerships", label: "Partnerships" },
      { to: "/about#legal-entities", label: "Legal Entities" },
      { to: "/about#certifications", label: "Certifications" },
      { to: "/organization", label: "Organization" },
      { to: "/safety", label: "Safety & Quality" },
    ],
  },
  {
    title: "Services",
    links: services.slice(0, 6).map((s) => ({ to: s.canonicalUrl, label: s.name })),
  },
  {
    title: "Projects",
    links: [
      { to: "/projects", label: "All Projects" },
      { to: "/projects#completed", label: "Completed Projects" },
      { to: "/projects#ongoing", label: "Ongoing Projects" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/resources#human-resources", label: "Human Resources" },
      { to: "/resources#vehicles", label: "Vehicles" },
      { to: "/resources#plants", label: "Plants" },
      { to: "/resources#machinery", label: "Machinery" },
      { to: "/resources", label: "Capacity" },
    ],
  },
  {
    title: "News",
    links: [
      { to: "/news", label: "Latest News" },
      { to: "/news/category/company-news", label: "Company News" },
      { to: "/news/category/projects", label: "Project News" },
      { to: "/news/category/infrastructure", label: "Infrastructure" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

const Footer = () => (
  <footer className="relative bg-background border-t border-border overflow-hidden">
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/3 rounded-full blur-[150px]" />

    <div className="container-custom section-padding relative z-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img src="/Hibir%20Logo.png" alt="" aria-hidden="true" className="w-11 h-11 object-contain" />
            <div>
              <span className="font-display font-bold text-lg block text-foreground">Hibir</span>
              <span className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-body">
                Construction Corp.
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm font-body leading-relaxed mb-4">
            GC-1 rated government-owned corporation building Ethiopia's infrastructure with 843 professionals and 282
            vehicles, plants and machinery units.
          </p>
          <p className="text-muted-foreground text-xs font-body">Reg. No: 980/2008 · TIN: 0013324621</p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-foreground mb-6 text-sm tracking-wider uppercase">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground text-sm font-body hover:text-accent transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-14 pt-10 border-t border-border grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-muted-foreground text-sm font-body">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="mt-0.5 text-accent shrink-0" />
          <span>Near Bahir Dar University, Gish Abay Campus, Bahir Dar, Amhara Regional State, Ethiopia</span>
        </div>
        <div className="flex items-start gap-3">
          <Phone size={16} className="mt-0.5 text-accent shrink-0" />
          <a href="tel:+251582204493" className="hover:text-accent transition-colors">+251 582 20 4493</a>
        </div>
        <div className="flex items-start gap-3">
          <Mail size={16} className="mt-0.5 text-accent shrink-0" />
          <a href="mailto:HCCnt2005@gmail.com" className="hover:text-accent transition-colors">HCCnt2005@gmail.com</a>
        </div>
        <div className="flex items-start gap-3">
          <Globe size={16} className="mt-0.5 text-accent shrink-0" />
          <span>www.Hibir.et · P.O. Box 1678</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
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
