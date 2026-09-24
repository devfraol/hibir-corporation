import { describe, expect, it } from "vitest";
import { projectCatalogue } from "../../scripts/project-catalogue";

describe("Phase 4.5 project catalogue migration source", () => {
  it("has 24 publishable records with unique URL-safe slugs", () => {
    expect(projectCatalogue).toHaveLength(24);
    expect(new Set(projectCatalogue.map(({ slug }) => slug)).size).toBe(projectCatalogue.length);
    expect(projectCatalogue.every(({ slug }) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))).toBe(true);
  });
  it("maps only CMS-supported execution states and preserves gallery ordering", () => {
    expect(projectCatalogue.every(({ status }) => ["Ongoing", "Completed", "Suspended", "Terminated"].includes(status))).toBe(true);
    expect(projectCatalogue.every((project) => project.gallery.length > 0 && project.gallery[0].url === project.featuredImage.url)).toBe(true);
    expect(projectCatalogue.filter(({ featured }) => featured)).toHaveLength(1);
  });
});
