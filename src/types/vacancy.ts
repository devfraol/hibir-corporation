/** Vacancy model — field names mirror the planned CMS columns (camelCased). */
export type VacancyStatus = "open" | "closed" | "expired";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Temporary";

export interface Vacancy {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: EmploymentType;
  status: VacancyStatus;
  publishedAt: string;
  applicationDeadline: string;
  summary: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experience: string;
  skills: string[];
  applicationInstructions: string;
  applicationEmail?: string;
  applicationUrl?: string;
  documentUrl?: string;
  featured: boolean;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
  /** True for development placeholders. Removed once the CMS is connected. */
  isDemo?: boolean;
}

export interface VacancyFilters {
  search?: string;
  department?: string;
  employmentType?: string;
  location?: string;
  status?: VacancyStatus | "all";
}
