import type { ProjectCategory } from "@/data/projects";
import type { ProjectExecutionStatus, ProjectPublicationStatus } from "@/types/database";

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = ["Asphalt Road", "Gravel Road", "Bridge", "Urban Infrastructure", "Cobblestone"];
export const PROJECT_EXECUTION_STATUSES: readonly ProjectExecutionStatus[] = ["Ongoing", "Completed", "Suspended", "Terminated"];

export type { ProjectCategory, ProjectExecutionStatus, ProjectPublicationStatus };

export interface CreateProjectInput {
  title: string; slug: string; description?: string; client?: string; consultant?: string;
  location?: string; category?: ProjectCategory; coverImage?: string; featured: boolean;
  status: ProjectPublicationStatus; projectStatus?: ProjectExecutionStatus; contractDate?: string; completionDate?: string;
}
export type UpdateProjectInput = Partial<CreateProjectInput>;
export interface AdminProjectFilters { search?: string; status?: ProjectPublicationStatus | "all"; category?: ProjectCategory | "all"; featured?: "all" | "featured" | "not_featured"; projectStatus?: ProjectExecutionStatus | "all"; }

export const slugifyProject = (value: string): string => value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const validateProjectInput = (input: CreateProjectInput, publishing: boolean): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (!input.title.trim()) errors.title = "A project title is required.";
  if (!input.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) errors.slug = "Use lowercase letters, numbers, and hyphens only.";
  if (publishing) {
    if (!input.description?.trim()) errors.description = "A description is required to publish.";
    if (!input.client?.trim()) errors.client = "A client is required to publish.";
    if (!input.location?.trim()) errors.location = "A location is required to publish.";
    if (!input.category) errors.category = "A category is required to publish.";
    if (!input.coverImage?.trim()) errors.coverImage = "A cover image is required to publish.";
  }
  return errors;
};
