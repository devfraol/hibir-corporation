import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, FileDown } from "lucide-react";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useI18n, localeDate } from "@/i18n";
import { getRelatedVacancies, getVacancyBySlug } from "@/services/vacancyService";
import type { Vacancy } from "@/types/vacancy";
import { DeadlineBlock, DemoTag, VacancyCard, VacancyMeta, VacancyStatusBadge } from "@/components/vacancies/VacancyParts";

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="border-t border-border pt-8">
    <h2 className="font-display text-2xl font-bold text-foreground mb-4">{title}</h2>
    <div className="font-body text-muted-foreground leading-relaxed">{children}</div>
  </section>
);
const List = ({ items }: { items: string[] }) => (
  <ul className="grid gap-2">{items.map((x, i) => <li key={i} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />{x}</li>)}</ul>
);

const VacancyDetail = () => {
  const { slug = "" } = useParams();
  const { path, t, locale } = useI18n();
  const [vacancy, setVacancy] = useState<Vacancy | null | undefined>(undefined);
  const [related, setRelated] = useState<Vacancy[]>([]);

  useEffect(() => {
    setVacancy(undefined);
    getVacancyBySlug(slug).then(async (v) => { setVacancy(v); setRelated(v ? await getRelatedVacancies(v) : []); });
  }, [slug]);

  if (vacancy === undefined) return <main className="min-h-[60vh] pt-40 text-center text-muted-foreground">{t("common.loading")}</main>;

  if (!vacancy) return (
    <main className="min-h-[60vh] pt-40 px-4 text-center">
      <Seo title="Vacancy not found | Hibir Construction Corporation" description="This vacancy is no longer available." path={path(`/vacancies/${slug}`)} noindex />
      <h1 className="section-title">Vacancy not found</h1>
      <p className="mt-4 text-muted-foreground">This announcement may have been removed.</p>
      <Link to={path("/vacancies")} className="btn-accent inline-flex mt-8">Back to vacancies</Link>
    </main>
  );

  const crumbs = [
    { name: t("navigation.home"), path: path("/") },
    { name: "Vacancies", path: path("/vacancies") },
    { name: vacancy.title, path: path(`/vacancies/${vacancy.slug}`) },
  ];
  const jsonLd = vacancy.isDemo ? undefined : {
    "@context": "https://schema.org", "@type": "JobPosting", title: vacancy.title, description: vacancy.description,
    datePosted: vacancy.publishedAt, validThrough: vacancy.applicationDeadline, employmentType: vacancy.employmentType.toUpperCase().replace("-", "_"),
    hiringOrganization: { "@type": "Organization", name: "Hibir Construction Corporation" },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: vacancy.location, addressCountry: "ET" } },
  };

  return (
    <main>
      <Seo
        title={vacancy.seoTitle ?? `${vacancy.title} | Vacancies | Hibir Construction Corporation`}
        description={vacancy.seoDescription ?? vacancy.summary}
        path={path(`/vacancies/${vacancy.slug}`)}
        image={vacancy.coverImage}
        type="article"
        publishedAt={vacancy.publishedAt}
        updatedAt={vacancy.updatedAt}
        noindex={vacancy.isDemo || vacancy.status !== "open"}
        breadcrumbs={crumbs}
        jsonLd={jsonLd}
      />

      <section className="pt-36 pb-12 px-4 md:px-8">
        <div className="container-custom">
          <Breadcrumbs crumbs={crumbs} className="mb-8" />
          {vacancy.isDemo && (
            <p className="mb-6 rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
              <DemoTag /> <span className="ml-2">Layout preview only — this is not an official Hibir vacancy.</span>
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <VacancyStatusBadge status={vacancy.status} />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Published <time dateTime={vacancy.publishedAt}>{localeDate(vacancy.publishedAt, locale)}</time></span>
          </div>
          <h1 className="display-xl text-foreground max-w-4xl">{vacancy.title}</h1>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <div className="container-custom grid gap-12 lg:grid-cols-[1fr_320px]">
          <article className="grid gap-10 min-w-0">
            <p className="text-lg font-body text-foreground/90 leading-relaxed">{vacancy.summary}</p>
            <Block title="Job description"><p>{vacancy.description}</p></Block>
            <Block title="Responsibilities"><List items={vacancy.responsibilities} /></Block>
            <Block title="Qualifications & requirements"><List items={vacancy.qualifications} /></Block>
            <Block title="Experience"><p>{vacancy.experience}</p></Block>
            <Block title="Required skills"><List items={vacancy.skills} /></Block>
            <section id="how-to-apply" className="rounded-2xl border border-accent/30 bg-card p-6 md:p-8">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">How to apply</h2>
              <p className="font-body text-muted-foreground leading-relaxed">{vacancy.applicationInstructions}</p>
              <div className="mt-6 grid gap-2 text-sm font-body">
                {vacancy.applicationEmail && <a className="text-accent" href={`mailto:${vacancy.applicationEmail}`}>{vacancy.applicationEmail}</a>}
                {vacancy.applicationUrl && <a className="text-accent" href={vacancy.applicationUrl} target="_blank" rel="noopener noreferrer">Apply online</a>}
                {!vacancy.applicationEmail && !vacancy.applicationUrl && <p className="text-muted-foreground">Official application channel will be listed in the announcement.</p>}
                <p className="text-muted-foreground">Deadline: <strong className="text-foreground">{localeDate(vacancy.applicationDeadline, locale)}</strong></p>
              </div>
            </section>
          </article>

          <aside className="lg:sticky lg:top-28 h-fit grid gap-5 rounded-2xl border border-border bg-card p-6">
            <DeadlineBlock vacancy={vacancy} />
            <VacancyMeta vacancy={vacancy} />
            {vacancy.documentUrl && (
              <a href={vacancy.documentUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-accent" download>
                <FileDown className="h-4 w-4" aria-hidden /> Download vacancy document
              </a>
            )}
            {vacancy.status === "open" && <a href="#how-to-apply" className="btn-accent text-center">How to apply</a>}
            <Link to={path("/vacancies")} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
              <ArrowLeft className="h-4 w-4" aria-hidden /> Back to vacancies
            </Link>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="container-custom mt-20">
            <h2 className="section-title mb-8">Related vacancies</h2>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{related.map((v, i) => <VacancyCard key={v.id} vacancy={v} index={i} />)}</div>
          </div>
        )}
      </section>
    </main>
  );
};

export default VacancyDetail;
