import type { ProjectCategory } from "@/data/projects";
import type { ProjectExecutionStatus, ProjectPublicationStatus } from "@/types/database";

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = ["Asphalt Road", "Gravel Road", "Bridge", "Urban Infrastructure", "Cobblestone"];
export const PROJECT_EXECUTION_STATUSES: readonly ProjectExecutionStatus[] = ["Ongoing", "Completed", "Suspended", "Terminated"];

export type { ProjectCategory, ProjectExecutionStatus, ProjectPublicationStatus };

export interface CreateProjectInput {
  title: string; slug: string; description?: string; client?: string; consultant?: string;
  location?: string; category?: ProjectCategory; coverImage?: string; featured: boolean;
  status: ProjectPublicationStatus; projectStatus?: ProjectExecutionStatus; contractDate?: string; completionDate?: string; seoTitle?: string; seoDescription?: string;
}
export type UpdateProjectInput = Partial<CreateProjectInput>;
export interface AdminProjectFilters { search?: string; status?: ProjectPublicationStatus | "all"; category?: ProjectCategory | "all"; featured?: "all" | "featured" | "not_featured"; projectStatus?: ProjectExecutionStatus | "all"; }

export const slugifyProject = (value: string): string => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const validateProjectInput = (input: CreateProjectInput, publishing: boolean): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (publishing) {
    if (!input.title.trim()) errors.title = "A project title is required to publish.";
    if (!input.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) errors.slug = "Use lowercase letters, numbers, and hyphens only.";
    if (!input.description?.trim()) errors.description = "A description is required to publish.";
    if (!input.location?.trim()) errors.location = "A location is required to publish.";
    if (!input.category) errors.category = "A category is required to publish.";
  }
  if (input.contractDate && input.completionDate && input.completionDate < input.contractDate) errors.completionDate = "Completion date cannot be earlier than contract date.";
  if (input.seoTitle && input.seoTitle.length > 70) errors.seoTitle = "Keep the SEO title to 70 characters or fewer.";
  if (input.seoDescription && input.seoDescription.length > 170) errors.seoDescription = "Keep the SEO description to 170 characters or fewer.";
  return errors;
};
