import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Seo from "@/components/Seo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Hibir" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/news", label: "News" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-32">
      <Seo
        title="Page Not Found | Hibir Construction Corporation"
        description="The page you requested could not be found. Browse our construction services, projects and news instead."
        path={location.pathname}
        noindex
      />
      <div className="max-w-xl text-center">
        <span className="label-eyebrow">Error 404</span>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mt-4 mb-4">Page not found</h1>
        <p className="text-muted-foreground font-body mb-10">
          The page you were looking for has moved or no longer exists. Here is where most visitors go next.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full border border-border px-5 py-2 text-sm font-body text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NotFound;
