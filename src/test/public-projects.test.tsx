import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import ProjectGallery from "@/components/projects/ProjectGallery";

const service = vi.hoisted(() => ({ getProjects: vi.fn(), getProjectBySlug: vi.fn(), getRelatedProjects: vi.fn() }));
vi.mock("@/services/projectService", () => service);
const project = {
  id: "published-1", title: "Published Airport Road", slug: "published-airport-road", description: "A published road project.", client: "Dessie", consultant: "Consultant", location: "Dessie", category: "Asphalt Road" as const, status: "Completed" as const, contractDate: "2026-01-02", completionDate: "2026-06-02", featured: true, featuredImage: { url: "/cover.jpg", alt: "Published Airport Road cover" }, gallery: [{ url: "/two.jpg", alt: "", caption: "Completed works" }], createdAt: "2026-01-01", updatedAt: "2026-01-01", budget: 0, image: "/cover.jpg", seoTitle: "Airport Road SEO", seoDescription: "SEO description",
};
const renderPage = (ui: React.ReactNode, route = "/projects") => render(<HelmetProvider><MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter></HelmetProvider>);

describe("public projects", () => {
  it("renders published CMS cards with slug routes and execution information", async () => {
    service.getProjects.mockResolvedValueOnce([project]);
    renderPage(<Projects />);
    expect((await screen.findAllByText("Published Airport Road")).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /published airport road/i })).toHaveAttribute("href", "/projects/published-airport-road");
    expect(screen.getAllByText("Completed").length).toBeGreaterThan(0);
  });
  it("renders the project detail SEO fallbacks, gallery caption, and related published project", async () => {
    service.getProjectBySlug.mockResolvedValueOnce(project); service.getRelatedProjects.mockResolvedValueOnce([{ ...project, id: "published-2", title: "Related project", slug: "related-project" }]);
    renderPage(<ProjectDetail />, "/projects/published-airport-road");
    expect((await screen.findAllByRole("heading", { name: "Published Airport Road" })).length).toBeGreaterThan(0);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://hibir-visions.lovable.app/projects/published-airport-road");
    expect(document.head.querySelector('meta[property="og:image"]')).toHaveAttribute("content", "https://hibir-visions.lovable.app/cover.jpg");
    expect(screen.getByText("Related project")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open image 1 full screen" }));
    expect(screen.getAllByText(/Completed works/).length).toBeGreaterThan(0);
  });
  it("uses meaningful gallery fallback alt text supplied by the project service", () => {
    renderPage(<ProjectGallery images={[{ url: "/image.jpg", alt: "Airport Road project image" }]} />);
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Airport Road project image");
  });
  it("shows the existing not-found state for an unavailable project", async () => {
    service.getProjectBySlug.mockResolvedValueOnce(null);
    renderPage(<ProjectDetail />, "/projects/unavailable");
    expect(await screen.findByRole("heading", { name: "Project not found" })).toBeInTheDocument();
  });
});
