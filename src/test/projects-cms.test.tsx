import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AdminProjects from "@/pages/admin/AdminProjects";
import { slugifyProject, validateProjectInput } from "@/types/projects";

const { auth, service } = vi.hoisted(() => ({ auth: { role: "editor" as const }, service: { getAdminProjects: vi.fn(), deleteProject: vi.fn(), archiveProject: vi.fn() } }));
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => auth }));
vi.mock("@/services/projectService", () => service);
const project = { id: "project-1", title: "Airport Road", slug: "airport-road", description: null, location: "Dessie", category: "Asphalt Road", status: "published" as const, project_status: "Ongoing" as const, client: "City", consultant: null, contract_date: null, completion_date: null, featured: true, cover_image: null, created_at: "2026-09-01T00:00:00Z", updated_at: "2026-09-02T00:00:00Z", images: [] };

describe("projects CMS", () => {
  it("creates URL-safe project slugs and keeps drafts permissive", () => {
    expect(slugifyProject("Bahir Dar–Gondar Road Rehabilitation")).toBe("bahir-dar-gondar-road-rehabilitation");
    expect(validateProjectInput({ title: "", slug: "", featured: false, status: "draft" }, false)).toEqual({});
  });
  it("requires only public-facing fields for publishing and keeps execution independent", () => {
    const base = { title: "Road", slug: "road", description: "Description", category: "Asphalt Road" as const, location: "Dessie", featured: false, status: "draft" as const, projectStatus: "Ongoing" as const };
    expect(validateProjectInput(base, true)).toEqual({});
    expect(validateProjectInput({ ...base, completionDate: "2026-01-01", contractDate: "2026-02-01" }, true)).toMatchObject({ completionDate: expect.any(String) });
    expect(validateProjectInput({ ...base, status: "published", projectStatus: "Completed" }, true)).toEqual({});
  });
  it("renders an empty state", async () => { service.getAdminProjects.mockResolvedValueOnce([]); render(<MemoryRouter><AdminProjects/></MemoryRouter>); expect(await screen.findByText("No projects found")).toBeInTheDocument(); });
  it("requires confirmation before deleting a project", async () => { service.getAdminProjects.mockResolvedValueOnce([project]); render(<MemoryRouter><AdminProjects/></MemoryRouter>); await screen.findAllByText("Airport Road"); fireEvent.click(screen.getAllByRole("button", { name: "Delete Airport Road" })[0]); expect(screen.getByRole("heading", { name: "Delete this project?" })).toBeInTheDocument(); expect(service.deleteProject).not.toHaveBeenCalled(); });
});
