import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MediaPicker } from "@/components/admin/MediaPicker";

const service = vi.hoisted(() => ({ getNewsMedia: vi.fn(), uploadNewsImage: vi.fn() }));
vi.mock("@/services/newsService", () => service);
const asset = { name: "bridge.webp", path: "news/library/bridge.webp", publicUrl: "https://cdn.example/bridge.webp", createdAt: "2026-09-23T00:00:00Z" };

describe("MediaPicker", () => {
  it("opens, returns the selected asset, and cancels", async () => {
    service.getNewsMedia.mockResolvedValue([asset]);
    const selected = vi.fn(); const openChange = vi.fn();
    render(<MediaPicker open onOpenChange={openChange} onSelect={selected} />);
    expect(await screen.findByText("bridge.webp")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /bridge.webp/i }));
    fireEvent.click(screen.getByRole("button", { name: "Use This Image" }));
    expect(selected).toHaveBeenCalledWith(asset);
    expect(openChange).toHaveBeenCalledWith(false);
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(openChange).toHaveBeenCalledWith(false);
  });
});
