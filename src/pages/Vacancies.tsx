import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useI18n } from "@/i18n";
import { getAllVacancies, getFeaturedVacancy } from "@/services/vacancyService";
import type { Vacancy, VacancyStatus } from "@/types/vacancy";
import { DeadlineBlock, DemoTag, VacancyCard, VacancyStatusBadge } from "@/components/vacancies/VacancyParts";
import heroImage from "@/assets/road-construction.jpg";

const selectCls = "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-body text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const unique = (xs: string[]) => [...new Set(xs)].sort();

const Vacancies = () => {
  const { path, t } = useI18n();
  const [all, setAll] = useState<Vacancy[]>([]);
  const [featured, setFeatured] = useState<Vacancy | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<VacancyStatus | "all">("all");

  useEffect(() => {
    Promise.all([getAllVacancies(), getFeaturedVacancy()]).then(([v, f]) => { setAll(v); setFeatured(f); setLoaded(true); });
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return all.filter((v) =>
      (!q || `${v.title} ${v.department} ${v.location}`.toLowerCase().includes(q)) &&
      (!department || v.department === department) &&
      (!employmentType || v.employmentType === employmentType) &&
      (!location || v.location === location) &&
      (status === "all" || v.status === status));
  }, [all, search, department, employmentType, location, status]);

  const crumbs = [{ name: t("navigation.home"), path: path("/") }, { name: "Vacancies", path: path("/vacancies") }];
  const reset = () => { setSearch(""); setDepartment(""); setEmploymentType(""); setLocation(""); setStatus("all"); };

  return (
    <main>
      <Seo
        title="Vacancies & Careers | Hibir Construction Corporation"
        description="Official vacancy and recruitment announcements from Hibir Construction Corporation, Bahir Dar, Ethiopia."
        path={path("/vacancies")}
        breadcrumbs={crumbs}
      />

      <section className="relative pt-36 pb-20 px-4 md:px-8 overflow-hidden">
        <img src={heroImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" aria-hidden />
        <div className="container-custom relative">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="label-eyebrow">Careers at Hibir</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="display-xl text-foreground mt-4 max-w-4xl">
            Build Your Career with Hibir
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-subtitle mt-6">
            Hibir Construction Corporation announces opportunities for qualified professionals and candidates to contribute to Ethiopia's infrastructure development.
          </motion.p>
        </div>
      </section>

      {featured && (
        <section aria-labelledby="featured-vacancy" className="px-4 md:px-8 pb-16">
          <div className="container-custom">
            <div className="rounded-2xl border border-accent/30 bg-card p-6 md:p-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="label-eyebrow">Featured opportunity</span>
                  {featured.isDemo && <DemoTag />}
                </div>
                <h2 id="featured-vacancy" className="font-display text-3xl md:text-4xl font-bold text-foreground">{featured.title}</h2>
                <p className="mt-4 max-w-2xl text-muted-foreground font-body">{featured.summary}</p>
                <Link to={path(`/vacancies/${featured.slug}`)} className="btn-accent inline-flex items-center gap-2 mt-6">
                  View opportunity <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <div className="flex flex-col gap-4 md:min-w-[220px]">
                <VacancyStatusBadge status={featured.status} />
                <DeadlineBlock vacancy={featured} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="current-opportunities" className="px-4 md:px-8 pb-28">
        <div className="container-custom">
          <h2 id="current-opportunities" className="section-title">Current Opportunities</h2>
          <p className="section-subtitle mt-4">Explore current employment opportunities at Hibir Construction Corporation.</p>

          {loaded && all.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-border bg-card p-10 md:p-16 text-center">
              <p className="label-eyebrow">No current vacancies</p>
              <p className="mt-4 text-muted-foreground font-body max-w-md mx-auto">There are currently no open opportunities. Please check back later for new career opportunities.</p>
              <Link to={path("/")} className="btn-accent inline-flex items-center gap-2 mt-8">Back to Hibir</Link>
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]" role="search">
                <label className="relative">
                  <span className="sr-only">Search vacancies</span>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vacancies…" className={`${selectCls} pl-10`} />
                </label>
                <label><span className="sr-only">Department</span>
                  <select value={department} onChange={(e) => setDepartment(e.target.value)} className={selectCls}>
                    <option value="">All Departments</option>{unique(all.map((v) => v.department)).map((d) => <option key={d}>{d}</option>)}
                  </select></label>
                <label><span className="sr-only">Employment type</span>
                  <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className={selectCls}>
                    <option value="">All Employment Types</option>{unique(all.map((v) => v.employmentType)).map((d) => <option key={d}>{d}</option>)}
                  </select></label>
                <label><span className="sr-only">Location</span>
                  <select value={location} onChange={(e) => setLocation(e.target.value)} className={selectCls}>
                    <option value="">All Locations</option>{unique(all.map((v) => v.location)).map((d) => <option key={d}>{d}</option>)}
                  </select></label>
                <label><span className="sr-only">Status</span>
                  <select value={status} onChange={(e) => setStatus(e.target.value as VacancyStatus | "all")} className={selectCls}>
                    <option value="all">All Statuses</option><option value="open">Open</option><option value="closed">Closed</option><option value="expired">Expired</option>
                  </select></label>
              </div>

              {filtered.length === 0 ? (
                <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
                  <p className="font-display text-xl font-bold text-foreground">No vacancies found.</p>
                  <p className="mt-2 text-muted-foreground font-body">Try adjusting your search or filters.</p>
                  <button onClick={reset} className="mt-6 text-sm font-semibold uppercase tracking-widest text-accent">Clear filters</button>
                </div>
              ) : (
                <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((v, i) => <VacancyCard key={v.id} vacancy={v} index={i} />)}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Vacancies;
