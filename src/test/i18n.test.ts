import { describe, expect, it } from "vitest";
import { alternatePath, localeFromPath, localizePath } from "@/i18n";

describe("URL-backed localization", () => {
  it("detects Amharic only from the /am URL prefix", () => {
    expect(localeFromPath("/about")).toBe("en");
    expect(localeFromPath("/am/projects/road-project")).toBe("am");
  });

  it("maps equivalent routes without changing stable slugs", () => {
    expect(localizePath("/projects/road-project", "am")).toBe("/am/projects/road-project");
    expect(alternatePath("/am/news/article-slug")).toBe("/news/article-slug");
    expect(alternatePath("/about")).toBe("/am/about");
  });
});
