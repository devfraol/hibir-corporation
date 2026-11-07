import { createContext, useContext, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

export type Locale = "en" | "am";

const messages = {
  en: {
    hero: {
      eyebrow: "ENGINEERING • INFRASTRUCTURE • CONSTRUCTION",
      headlineFirst: "Building Infrastructure.",
      headlineSecond: "Connecting Communities.",
      headlineFirstLead: "Building",
      headlineFirstAccent: "Infrastructure.",
      headlineSecondLead: "Connecting",
      headlineSecondAccent: "Communities.",
      description: "Hibir Construction Corporation delivers construction and infrastructure development through engineering expertise, dedicated people, and organizational strength.",
      projects: "Explore Our Projects",
      about: "Discover Hibir",
      imageAlt: "Illustrative landscape view of road construction and heavy machinery",
      panelLabel: "Hibir Construction Corporation",
      panelText: "A government-owned GC-1 contractor headquartered in Bahir Dar, delivering roads, bridges and urban infrastructure across the Amhara region.",
      panelLink: "Discover More",
    },
    navigation: { home: "Home", about: "About", services: "Services", projects: "Projects", resources: "Resources", safety: "Safety & Quality", news: "News", contact: "Contact", menu: "Menu", skip: "Skip to content", getInTouch: "Get in Touch" },
    common: { loading: "Loading…", notFound: "Page not found", backToProjects: "Back to Projects", allProjects: "All Projects", projectOverview: "Project overview", projectInformation: "Project information", projectGallery: "Project gallery", relatedProjects: "Related projects", contactHibir: "Contact Hibir" },
    seo: { siteSuffix: "Hibir Construction Corporation", newsTitle: "Hibir Construction Corporation News & Updates", newsDescription: "Updates, milestones and stories from Hibir Construction Corporation." },
  },
  am: {
    hero: {
      eyebrow: "ምህንድስና • መሠረተ ልማት • ግንባታ",
      headlineFirst: "መሠረተ ልማትን እንገነባለን።",
      headlineSecond: "ማህበረሰቦችን እናገናኛለን።",
      headlineFirstLead: "መሠረተ ልማትን",
      headlineFirstAccent: "እንገነባለን።",
      headlineSecondLead: "ማህበረሰቦችን",
      headlineSecondAccent: "እናገናኛለን።",
      description: "ሂቢር ኮንስትራክሽን ኮርፖሬሽን በምህንድስና እውቀት፣ በትጉህ ሠራተኞችና በድርጅታዊ ጥንካሬ የግንባታና የመሠረተ ልማት ሥራዎችን ያከናውናል።",
      projects: "ፕሮጀክቶቻችንን ይመልከቱ",
      about: "ሂቢርን ይወቁ",
      imageAlt: "የመንገድ ግንባታና ከባድ ማሽነሪዎች ማሳያ ምስል",
      panelLabel: "ሂቢር ኮንስትራክሽን ኮርፖሬሽን",
      panelText: "ዋና መሥሪያ ቤቱ በባሕር ዳር የሚገኝ ጂሲ-1 የመንግሥት ተቋራጭ ሲሆን በአማራ ክልል መንገዶችን፣ ድልድዮችንና የከተማ መሠረተ ልማቶችን ይገነባል።",
      panelLink: "ተጨማሪ ይወቁ",
    },
    navigation: { home: "መነሻ", about: "ስለ እኛ", services: "አገልግሎቶች", projects: "ፕሮጀክቶች", resources: "ሀብቶች", safety: "ደህንነትና ጥራት", news: "ዜና", contact: "ያግኙን", menu: "ማውጫ", skip: "ወደ ዋናው ይዘት ይሂዱ", getInTouch: "ያግኙን" },
    common: { loading: "በመጫን ላይ…", notFound: "ገጹ አልተገኘም", backToProjects: "ወደ ፕሮጀክቶች ተመለስ", allProjects: "ሁሉም ፕሮጀክቶች", projectOverview: "የፕሮጀክቱ አጠቃላይ እይታ", projectInformation: "የፕሮጀክት መረጃ", projectGallery: "የፕሮጀክት ምስሎች", relatedProjects: "ተዛማጅ ፕሮጀክቶች", contactHibir: "HIBIRን ያግኙ" },
    seo: { siteSuffix: "Hibir Construction Corporation", newsTitle: "የ Hibir Construction Corporation ዜናዎችና ወቅታዊ መረጃዎች", newsDescription: "ከ Hibir Construction Corporation የሚቀርቡ ወቅታዊ መረጃዎች፣ ዕድገቶችና ታሪኮች።" },
  },
} as const;

type TranslationKey = string;
const read = (source: object, key: TranslationKey): string => key.split(".").reduce<unknown>((value, part) => value && typeof value === "object" ? (value as Record<string, unknown>)[part] : undefined, source) as string || key;

export const localeFromPath = (pathname: string): Locale => pathname === "/am" || pathname.startsWith("/am/") ? "am" : "en";
export const localizePath = (path: string, locale: Locale): string => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const englishPath = normalized === "/am" ? "/" : normalized.replace(/^\/am(?=\/|$)/, "") || "/";
  return locale === "am" ? (englishPath === "/" ? "/am" : `/am${englishPath}`) : englishPath;
};
export const alternatePath = (path: string) => localizePath(path, localeFromPath(path) === "am" ? "en" : "am");
export const localeDate = (value: string, locale: Locale) => new Intl.DateTimeFormat(locale === "am" ? "am-ET" : "en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(value));

interface I18nValue { locale: Locale; t: (key: TranslationKey) => string; path: (value: string) => string; }
const I18nContext = createContext<I18nValue>({ locale: "en", t: (key) => read(messages.en, key), path: (value) => value });
export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  return <I18nContext.Provider value={{ locale, t: (key) => read(messages[locale], key), path: (value) => localizePath(value, locale) }}>{children}</I18nContext.Provider>;
};
export const useI18n = () => useContext(I18nContext);
