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
  it("creates URL-safe project slugs and keeps draft validation permissive", () => {
    expect(slugifyProject("Bale Egziaber Airport Asphalt Road")).toBe("bale-egziaber-airport-asphalt-road");
    expect(validateProjectInput({ title: "Draft", slug: "draft", featured: false, status: "draft" }, false)).toEqual({});
    expect(validateProjectInput({ title: "", slug: "bad slug", featured: false, status: "published" }, true)).toMatchObject({ title: expect.any(String), slug: expect.any(String), description: expect.any(String) });
  });
  it("renders an empty state", async () => { service.getAdminProjects.mockResolvedValueOnce([]); render(<MemoryRouter><AdminProjects/></MemoryRouter>); expect(await screen.findByText("No projects found")).toBeInTheDocument(); });
  it("requires confirmation before deleting a project", async () => { service.getAdminProjects.mockResolvedValueOnce([project]); render(<MemoryRouter><AdminProjects/></MemoryRouter>); await screen.findAllByText("Airport Road"); fireEvent.click(screen.getAllByRole("button", { name: "Delete Airport Road" })[0]); expect(screen.getByRole("heading", { name: "Delete this project?" })).toBeInTheDocument(); expect(service.deleteProject).not.toHaveBeenCalled(); });
});
