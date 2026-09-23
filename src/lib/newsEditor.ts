import type { CreateNewsInput, NewsBlock } from "@/types/news";

export const MAX_IMAGE_SIZE = 8 * 1024 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const slugify = (value: string) => value
  .normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
  .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const createBlockId = () => `block-${crypto.randomUUID()}`;

export const createBlock = (type: NewsBlock["type"]): NewsBlock => {
  const id = createBlockId();
  switch (type) {
    case "heading": return { id, type, level: 2, text: "" };
    case "list": return { id, type, items: [""], ordered: false };
    case "quote": return { id, type, text: "", attribution: "" };
    case "image": return { id, type, url: "", alt: "", caption: "" };
    case "link": return { id, type, text: "", url: "" };
    default: return { id, type: "paragraph", text: "" };
  }
};

export const normalizeBlocks = (blocks: NewsBlock[]) => blocks.map((block) => block.id ? block : { ...block, id: createBlockId() }) as NewsBlock[];

export const validateImageFile = (file: File) => {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return "Use a JPEG, PNG, or WebP image.";
  if (file.size > MAX_IMAGE_SIZE) return "Images must be 8 MB or smaller.";
  return null;
};

export type EditorialErrors = Partial<Record<"title" | "slug" | "category" | "content" | "coverImage" | "seoTitle" | "seoDescription", string>>;
export const validateEditorialInput = (input: CreateNewsInput, publish: boolean): EditorialErrors => {
  const errors: EditorialErrors = {};
  if (publish && !input.title.trim()) errors.title = "A title is required before publishing.";
  if (publish && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) errors.slug = "Use a lowercase, URL-safe slug.";
  if (publish && !input.category) errors.category = "Select a category before publishing.";
  if (publish && !input.excerpt?.trim()) errors.content = "An excerpt is required before publishing.";
  if (publish && !input.content?.some((block) => ("text" in block && block.text.trim()) || block.type === "image")) errors.content = "Add article content before publishing.";
  if (publish && !input.coverImage?.trim()) errors.coverImage = "A cover image is required before publishing.";
  if (publish && input.content?.some((block) => block.type === "image" && (!block.url || !block.alt.trim()))) errors.content = "Published image blocks require an image and alternative text.";
  if (input.seoTitle && input.seoTitle.length > 70) errors.seoTitle = "Keep the SEO title to 70 characters or fewer.";
  if (input.seoDescription && input.seoDescription.length > 170) errors.seoDescription = "Keep the SEO description to 170 characters or fewer.";
  return errors;
};
