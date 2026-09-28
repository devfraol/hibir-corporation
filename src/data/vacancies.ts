import type { Vacancy } from "@/types/vacancy";

/**
 * DEMO DATA ONLY — not real Hibir vacancies.
 * Used solely to preview the layout during development (never shown in production builds).
 * Delete this file when vacancyService is connected to the CMS.
 */
const demoText = "Placeholder text for layout preview. The official announcement content will be published by Hibir Construction Corporation through the CMS.";

const base = {
  summary: demoText,
  description: demoText,
  responsibilities: ["Demo responsibility item one", "Demo responsibility item two", "Demo responsibility item three"],
  qualifications: ["Demo qualification item one", "Demo qualification item two"],
  experience: "Demo experience requirement — to be supplied by Hibir.",
  skills: ["Demo skill", "Demo skill", "Demo skill"],
  applicationInstructions: "Demo application instructions. Official instructions, required documents and the submission channel will appear here.",
  isDemo: true,
  createdAt: "2026-09-01",
  updatedAt: "2026-09-01",
} as const;

export const demoVacancies: Vacancy[] = [
  { ...base, responsibilities: [...base.responsibilities], qualifications: [...base.qualifications], skills: [...base.skills], id: "demo-1", slug: "demo-senior-civil-engineer", title: "Senior Civil Engineer (Demo)", department: "Engineering", location: "Bahir Dar, Ethiopia", employmentType: "Full-time", status: "open", publishedAt: "2026-09-20", applicationDeadline: "2026-10-30", featured: true },
  { ...base, responsibilities: [...base.responsibilities], qualifications: [...base.qualifications], skills: [...base.skills], id: "demo-2", slug: "demo-quantity-surveyor", title: "Quantity Surveyor (Demo)", department: "Contract Administration", location: "Bahir Dar, Ethiopia", employmentType: "Contract", status: "open", publishedAt: "2026-09-18", applicationDeadline: "2026-10-20", featured: false },
  { ...base, responsibilities: [...base.responsibilities], qualifications: [...base.qualifications], skills: [...base.skills], id: "demo-3", slug: "demo-engineering-intern", title: "Engineering Intern (Demo)", department: "Engineering", location: "Project Site", employmentType: "Internship", status: "closed", publishedAt: "2026-08-10", applicationDeadline: "2026-09-10", featured: false },
  { ...base, responsibilities: [...base.responsibilities], qualifications: [...base.qualifications], skills: [...base.skills], id: "demo-4", slug: "demo-heavy-machinery-operator", title: "Heavy Machinery Operator (Demo)", department: "Equipment", location: "Project Site", employmentType: "Full-time", status: "expired", publishedAt: "2026-07-01", applicationDeadline: "2026-08-01", featured: false },
];
