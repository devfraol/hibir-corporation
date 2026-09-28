import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2, MapPin } from "lucide-react";
import type { Vacancy, VacancyStatus } from "@/types/vacancy";
import { useI18n } from "@/i18n";

const statusStyle: Record<VacancyStatus, string> = {
  open: "border-accent/40 text-accent bg-accent/10",
  closed: "border-border text-muted-foreground bg-muted",
  expired: "border-destructive/30 text-destructive bg-destructive/10",
};
const statusLabel: Record<VacancyStatus, string> = { open: "Open", closed: "Closed", expired: "Expired" };

export const VacancyStatusBadge = ({ status }: { status: VacancyStatus }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-body font-semibold uppercase tracking-[0.18em] ${statusStyle[status]}`}>
    <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${status === "open" ? "bg-accent" : status === "expired" ? "bg-destructive" : "bg-muted-foreground"}`} />
    <span className="sr-only">Vacancy status: </span>
    {statusLabel[status]}
  </span>
);

export const DemoTag = () => (
  <span className="rounded border border-dashed border-muted-foreground/50 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">Demo</span>
);

export const formatDeadline = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(iso)).toUpperCase();

export const DeadlineBlock = ({ vacancy, compact = false }: { vacancy: Vacancy; compact?: boolean }) => {
  const closed = vacancy.status !== "open";
  return (
    <div className={compact ? "" : "rounded-xl border border-border p-4"}>
      <p className="text-[10px] font-body uppercase tracking-[0.2em] text-muted-foreground">{closed ? "Application closed" : "Application deadline"}</p>
      <p className={`font-display font-bold mt-1 ${compact ? "text-lg" : "text-2xl"} ${closed ? "text-muted-foreground line-through decoration-1" : "text-foreground"}`}>
        <time dateTime={vacancy.applicationDeadline}>{formatDeadline(vacancy.applicationDeadline)}</time>
      </p>
    </div>
  );
};

export const VacancyMeta = ({ vacancy }: { vacancy: Vacancy }) => (
  <dl className="grid gap-2 text-sm font-body text-muted-foreground">
    <div className="flex items-center gap-2"><Building2 className="h-4 w-4 text-accent" aria-hidden /><dt className="sr-only">Department</dt><dd>{vacancy.department}</dd></div>
    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" aria-hidden /><dt className="sr-only">Location</dt><dd>{vacancy.location}</dd></div>
    <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-accent" aria-hidden /><dt className="sr-only">Employment type</dt><dd>{vacancy.employmentType}</dd></div>
  </dl>
);

export const VacancyCard = ({ vacancy, index = 0 }: { vacancy: Vacancy; index?: number }) => {
  const { path } = useI18n();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-6 md:p-7 transition-colors hover:border-accent/50"
    >
      <div className="flex items-center justify-between gap-3 mb-5">
        <VacancyStatusBadge status={vacancy.status} />
        {vacancy.isDemo && <DemoTag />}
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5 leading-tight">{vacancy.title}</h3>
      <VacancyMeta vacancy={vacancy} />
      <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-end justify-between gap-4 mt-auto">
        <DeadlineBlock vacancy={vacancy} compact />
        <Link
          to={path(`/vacancies/${vacancy.slug}`)}
          className="inline-flex items-center gap-2 text-sm font-body font-semibold uppercase tracking-widest text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          aria-label={`View vacancy: ${vacancy.title}`}
        >
          View vacancy <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </motion.article>
  );
};
