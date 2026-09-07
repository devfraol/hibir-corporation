/**
 * Central SEO + company configuration.
 *
 * SITE_URL is the ONLY place the production domain is defined. When the final
 * domain is connected, change `SITE_URL` here and every canonical URL, Open
 * Graph URL, structured-data URL, sitemap entry and breadcrumb updates with it.
 */

export const SITE_URL = "https://hibir-visions.lovable.app";

export const seoConfig = {
  siteName: "Hibir Construction Corporation",
  siteUrl: SITE_URL,
  defaultTitle: "Hibir Construction Corporation | Construction & Infrastructure in Ethiopia",
  titleTemplate: (t: string) => `${t} | Hibir Construction Corporation`,
  defaultDescription:
    "Hibir Construction Corporation is a GC-1 government-owned contractor in Bahir Dar, Ethiopia, delivering asphalt and gravel roads, bridges, buildings and urban infrastructure across the Amhara Region and beyond.",
  defaultImage: "/Hibir%20Logo.png",
  organizationName: "Hibir Construction Corporation",
  organizationLogo: "/Hibir%20Logo.png",
  locale: "en_US",
  language: "en",
  /** No verified official X/Twitter account — left empty rather than invented. */
  twitterHandle: "",
} as const;

/** Turns any site-relative path into an absolute production URL. */
export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean === "/" ? "/" : clean.replace(/\/$/, "")}`;
};

/**
 * Centralised company data. Only values supported by the 2026 company profile.
 * Unknown values (street number, social profiles) are intentionally omitted.
 */
export const companyData = {
  name: "Hibir Construction Corporation",
  legalName: "Hibir Construction Corporation",
  alternateName: "HCC",
  description:
    "Government-owned general contractor (GC-1) headquartered in Bahir Dar, Amhara Regional State, Ethiopia, delivering road, bridge, building and urban infrastructure construction.",
  founded: "2010",
  headOffice: "Near Bahir Dar University, Gish Abay Campus",
  address: {
    street: "Near Bahir Dar University, Gish Abay Campus",
    poBox: "P.O. Box 1678",
    city: "Bahir Dar",
    region: "Amhara Regional State",
    country: "Ethiopia",
    countryCode: "ET",
  },
  phone: "+251 582 20 4493",
  email: "HCCnt2005@gmail.com",
  website: SITE_URL,
  logo: "/Hibir%20Logo.png",
  /** Only real, verified profiles belong here. */
  socialLinks: [] as string[],
  sameAs: [] as string[],
  areasServed: [
    "Bahir Dar",
    "Amhara Regional State",
    "Ethiopia",
  ],
  registration: {
    commercialRegistration: "980/2008",
    tin: "0013324621",
    vat: "3028900006",
    contractorGrade: "GC-1",
  },
} as const;

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: companyData.name,
  legalName: companyData.legalName,
  alternateName: companyData.alternateName,
  url: SITE_URL,
  logo: absoluteUrl(companyData.logo),
  description: companyData.description,
  foundingDate: companyData.founded,
  email: companyData.email,
  telephone: companyData.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: companyData.address.street,
    postOfficeBoxNumber: "1678",
    addressLocality: companyData.address.city,
    addressRegion: companyData.address.region,
    addressCountry: companyData.address.countryCode,
  },
  areaServed: companyData.areasServed.map((a) => ({ "@type": "Place", name: a })),
  ...(companyData.sameAs.length ? { sameAs: companyData.sameAs } : {}),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: seoConfig.siteName,
  inLanguage: seoConfig.language,
  publisher: { "@id": `${SITE_URL}/#organization` },
});

export interface Crumb {
  name: string;
  path: string;
}

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});
