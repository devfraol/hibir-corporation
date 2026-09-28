import type { Vacancy, VacancyFilters } from "@/types/vacancy";
import { demoVacancies } from "@/data/vacancies";

/**
 * Single access point for vacancy data. Swap the body of `source()` for a CMS query later;
 * pages and components only depend on these functions.
 * Demo records are only returned in development so they never appear on the live site.
 */
const source = async (): Promise<Vacancy[]> => (import.meta.env.DEV ? demoVacancies : []);

const byDate = (a: Vacancy, b: Vacancy) => b.publishedAt.localeCompare(a.publishedAt);

export const getVacancies = async (filters: VacancyFilters = {}): Promise<Vacancy[]> => {
  const q = filters.search?.trim().toLowerCase();
  return (await source())
    .filter((v) => !q || `${v.title} ${v.department} ${v.location} ${v.summary}`.toLowerCase().includes(q))
    .filter((v) => !filters.department || v.department === filters.department)
    .filter((v) => !filters.employmentType || v.employmentType === filters.employmentType)
    .filter((v) => !filters.location || v.location === filters.location)
    .filter((v) => !filters.status || filters.status === "all" || v.status === filters.status)
    .sort(byDate);
};

export const getAllVacancies = () => getVacancies();
export const getVacancyBySlug = async (slug: string) => (await source()).find((v) => v.slug === slug) ?? null;
export const getFeaturedVacancy = async () => (await source()).find((v) => v.featured && v.status === "open") ?? null;
export const getRelatedVacancies = async (v: Vacancy, limit = 3) =>
  (await source()).filter((o) => o.id !== v.id).sort((a, b) => Number(b.department === v.department) - Number(a.department === v.department)).slice(0, limit);
