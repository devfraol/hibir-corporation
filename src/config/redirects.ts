/**
 * Centralised 301-style redirect map for legacy / alternate URLs.
 * Keys are lowercase paths without trailing slash; values are the canonical path.
 */
export const redirectMap: Record<string, string> = {
  "/safety-quality": "/safety",
  "/quality": "/safety",
  "/service": "/services",
  "/project": "/projects",
  "/projects/all": "/projects",
  "/our-projects": "/projects",
  "/our-services": "/services",
  "/about-us": "/about",
  "/company": "/about",
  "/contact-us": "/contact",
  "/blog": "/news",
  "/press": "/news",
  "/news-events": "/news",
  "/equipment": "/resources",
  "/capacity": "/resources",
  "/partners": "/about#partnerships",
  "/certifications": "/about#certifications",
  "/legal": "/about#legal-entities",
  "/home": "/",
};

export const resolveRedirect = (pathname: string): string | null => {
  const key = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  return redirectMap[key] ?? null;
};
