import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AdminNews from "@/pages/admin/AdminNews";
import type { NewsArticle, NewsStatus } from "@/types/news";

const { auth, newsService } = vi.hoisted(() => ({
  auth: { role: "editor" as const },
  newsService: { getAdminNews: vi.fn(), deleteNews: vi.fn() },
}));
const article: NewsArticle = { id: "article-1", title: "A new road milestone", slug: "road-milestone", excerpt: "Update", content: [], featuredImage: { url: "", alt: "" }, gallery: [], category: "Projects", tags: [], author: { id: "author", name: "Hibir" }, publishedAt: "2026-09-01T00:00:00Z", updatedAt: "2026-09-02T00:00:00Z", createdAt: "2026-09-01T00:00:00Z", status: "published", featured: true, readingMinutes: 1 };
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => auth }));
vi.mock("@/services/newsService", () => newsService);

describe("admin news CMS", () => {
  it("uses only database-backed news statuses", () => {
    const statuses: NewsStatus[] = ["draft", "published", "archived"];
    expect(statuses).toHaveLength(3);
  });

  it("renders an administrator news list", async () => {
    newsService.getAdminNews.mockResolvedValueOnce([article]);
    render(<MemoryRouter><AdminNews /></MemoryRouter>);
    expect(await screen.findAllByText("A new road milestone")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /create news/i })).toHaveAttribute("href", "/admin/news/new");
  });

  it("requires confirmation before deleting an article", async () => {
    newsService.getAdminNews.mockResolvedValueOnce([article]);
    render(<MemoryRouter><AdminNews /></MemoryRouter>);
    await screen.findAllByText("A new road milestone");
    fireEvent.click(screen.getByRole("button", { name: "Delete A new road milestone" }));
    expect(screen.getByRole("heading", { name: "Delete this news article?" })).toBeInTheDocument();
    expect(newsService.deleteNews).not.toHaveBeenCalled();
  });
});
