import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/config/site";

/** Subtle visible breadcrumb trail. Pair with the same crumbs passed to <Seo />. */
const Breadcrumbs = ({ crumbs, className = "" }: { crumbs: Crumb[]; className?: string }) => {
  if (crumbs.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-[11px] font-body tracking-[0.16em] uppercase text-muted-foreground">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span className="text-foreground truncate max-w-[16rem]" aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link to={c.path} className="hover:text-accent transition-colors">
                  {c.name}
                </Link>
              )}
              {!last && <ChevronRight size={12} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
