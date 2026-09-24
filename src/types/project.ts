import type { ProjectExecutionStatus } from "@/types/database";

export type ProjectCategory = "Asphalt Road" | "Gravel Road" | "Bridge" | "Urban Infrastructure" | "Cobblestone";
export type ProjectStatus = ProjectExecutionStatus;
export interface ProjectImage { url: string; alt: string; caption?: string; }
export interface Project {
  id: string; title: string; slug: string; description: string; client: string; consultant?: string; location: string;
  contractValue?: number; status?: ProjectStatus; contractorRole?: string; startDate?: string; contractDate?: string; completionDate?: string;
  featuredImage: ProjectImage; gallery: ProjectImage[]; category: ProjectCategory; featured: boolean; createdAt: string; updatedAt: string;
  budget: number; image: string; seoTitle?: string; seoDescription?: string;
}
