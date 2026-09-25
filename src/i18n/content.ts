import type { Locale } from "@/i18n";

export const localized = <T extends Record<string, unknown>>(locale: Locale, english: T, amharic: T) => locale === "am" ? amharic : english;

/** Selects only publisher-approved localized CMS fields. It deliberately has no English fallback for Amharic. */
export const approvedLocalized = (locale: Locale, english: string, amharic?: string) => locale === "am" ? amharic : english;

export const navLabel = (locale: Locale, label: string) => {
  if (locale !== "am") return label;
  return ({
    Home: "መነሻ", About: "ስለ እኛ", Services: "አገልግሎቶች", Projects: "ፕሮጀክቶች", Resources: "መረጃዎች", "Safety & Quality": "ደህንነትና ጥራት", News: "ዜና", Contact: "ያግኙን",
    "Company Overview": "የድርጅቱ አጠቃላይ እይታ", History: "ታሪክ", "Vision, Mission & Values": "ራዕይ፣ ተልዕኮና እሴቶች", "Objectives & Duties": "ዓላማዎችና ተግባራት", "Our Approach": "የአሰራር አቀራረባችን", "Why Choose Us": "ለምን እኛ?", "Leadership / Organization": "አመራር / አደረጃጀት", Partnerships: "አጋርነቶች", "Legal Entities": "ሕጋዊ አካላት", "Certifications & Awards": "ማረጋገጫዎችና ሽልማቶች",
    "Road Construction": "የመንገድ ግንባታ", "Bridge Construction": "የድልድይ ግንባታ", "Urban Infrastructure": "የከተማ መሠረተ ልማት", "Building Construction": "የሕንፃ ግንባታ", "Materials Production & Supply": "የቁሳቁስ ምርትና አቅርቦት", "Industrial Parks & Facilities": "የኢንዱስትሪ ፓርኮችና ተቋማት", "Road Maintenance": "የመንገድ ጥገና", "Capacity Building & Training": "የአቅም ግንባታና ሥልጠና",
    "Featured Project": "ተለይቶ የቀረበ ፕሮጀክት", "Completed Projects": "የተጠናቀቁ ፕሮጀክቶች", "Ongoing Projects": "በሂደት ላይ ያሉ ፕሮጀክቶች", "Suspended Projects": "የተቋረጡ ፕሮጀክቶች", "Terminated Projects": "የተሰረዙ ፕሮጀክቶች", "Project Gallery": "የፕሮጀክት ምስሎች",
    "Human Resources": "የሰው ኃይል", Vehicles: "ተሽከርካሪዎች", Plants: "ፕላንቶች", Machinery: "ማሽነሪዎች", "Equipment Capacity": "የመሣሪያ አቅም", "Financial Capacity": "የፋይናንስ አቅም", "Construction Experience": "የግንባታ ልምድ",
  } as Record<string, string>)[label] ?? label;
};
