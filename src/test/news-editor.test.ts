import { describe, expect, it } from "vitest";
import { createBlock, slugify, validateEditorialInput, validateImageFile } from "@/lib/newsEditor";
import type { CreateNewsInput } from "@/types/news";

const draft = (): CreateNewsInput => ({ title: "", slug: "", excerpt: "", content: [], category: "Company News", coverImage: "", status: "draft" });

describe("news editor helpers", () => {
  it("creates URL-safe slugs", () => expect(slugify("New Road: Infrastructure Project! ")).toBe("new-road-infrastructure-project"));
  it("permits incomplete drafts but validates publication requirements", () => {
    expect(validateEditorialInput(draft(), false)).toEqual({});
    expect(validateEditorialInput(draft(), true)).toMatchObject({ title: expect.any(String), slug: expect.any(String), coverImage: expect.any(String) });
  });
  it("validates supported cover image formats and size", () => {
    expect(validateImageFile(new File(["x"], "cover.gif", { type: "image/gif" }))).toMatch(/JPEG/);
    expect(validateImageFile(new File([new Uint8Array(8 * 1024 * 1024 + 1)], "cover.jpg", { type: "image/jpeg" }))).toMatch(/8 MB/);
    expect(validateImageFile(new File(["x"], "cover.webp", { type: "image/webp" }))).toBeNull();
  });
  it("creates stable image blocks", () => {
    const block = createBlock("image");
    expect(block).toMatchObject({ type: "image", url: "", alt: "" });
    expect(block.id).toMatch(/^block-/);
  });
});

// The preview is intentionally local: validation/editor utilities never invoke a publishing service.
it("does not turn preview data into a published record", () => {
  const preview = { ...draft(), title: "Local preview", slug: "local-preview", content: [createBlock("paragraph")] };
  expect(preview.status).toBe("draft");
  expect(validateEditorialInput(preview, false)).toEqual({});
});
