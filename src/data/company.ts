/**
 * Single source of truth — 2026 Hibir Construction Corporation company profile.
 * All figures below supersede any earlier published values.
 */

export const companyStats = {
  staff: 843,
  totalAssets: 282,
  vehicles: 155,
  plants: 10,
  machinery: 117,
  annualTurnoverBirr: 3_400_000_000,
  activeContractValueBirr: 25_000_000_000,
  recordedCapitalBirr: 929_000_000,
  contractorGrade: "GC-1",
} as const;

export const companyStatCards = [
  { end: 843, label: "Total human resources", suffix: "" },
  { end: 282, label: "Vehicles, plants & machinery", suffix: "" },
  { end: 155, label: "Vehicles", suffix: "" },
  { end: 117, label: "Machinery units", suffix: "" },
  { end: 10, label: "Production plants", suffix: "" },
  { end: 3.4, label: "Birr average annual turnover", suffix: "B+", decimals: 1 },
  { end: 25, label: "Birr active project value", suffix: "B+" },
  { end: 929, label: "Million Birr recorded capital", suffix: "M+" },
];

export interface Partner {
  name: string;
  short: string;
}

/** The 19 partner and client organisations listed in the 2026 profile. */
export const partners: Partner[] = [
  { name: "Ethiopian Roads Administration (ERA)", short: "ERA" },
  { name: "ANRS Road & Transport Bureau", short: "ANRS RTB" },
  { name: "ANRS Roads Bureau", short: "ANRS RB" },
  { name: "ANRS Industry Parks Development Corporation", short: "ANRS IPDC" },
  { name: "Amhara National Regional State", short: "ANRS" },
  { name: "Regional Public Enterprises' Authority", short: "RPEA" },
  { name: "Ethiopian Construction Authority", short: "ECA" },
  { name: "Ethiopian Kaizen Institute", short: "EKI" },
  { name: "Ethiopian Sugar Corporation", short: "ESC" },
  { name: "Ethiopian Ports Corporation", short: "EPC" },
  { name: "Bahir Dar City Administration", short: "Bahir Dar" },
  { name: "Bahir Dar City Roads Authority", short: "BD Roads" },
  { name: "Gondar City Administration", short: "Gondar" },
  { name: "Dessie City Administration", short: "Dessie" },
  { name: "Woldia City Administration", short: "Woldia" },
  { name: "Worabi City Administration", short: "Worabi" },
  { name: "Mekane Eyesus City Administration", short: "Mekane Eyesus" },
  { name: "Lalibela Town Administration", short: "Lalibela" },
  { name: "Dangila Town Administration", short: "Dangila" },
];

export interface LegalEntity {
  title: string;
  reference: string;
  detail: string;
}

/** 11 legal-entity records held by the corporation. */
export const legalEntities: LegalEntity[] = [
  { title: "Establishment Proclamation", reference: "No. 71/2010", detail: "Established as Amhara Road Works Enterprise on 26 January 2010." },
  { title: "Re-establishment Proclamation", reference: "No. 170/2018", detail: "Re-established on 31 March 2018 with recorded capital of Birr 929.3 Million." },
  { title: "Corporation Proclamation", reference: "No. 214/2024", detail: "Upgraded to corporation level and renamed Hibir Construction Corporation." },
  { title: "Commercial Registration Certificate", reference: "980/2008", detail: "Registered trade licence held with the regional trade bureau." },
  { title: "Business Licence", reference: "General Construction", detail: "Licensed for general construction works nationwide." },
  { title: "Contractor Licence", reference: "GC-1 (Grade One)", detail: "Grade One General Contractor licence from the Ethiopian Construction Authority." },
  { title: "TIN Certificate", reference: "0013324621", detail: "Taxpayer identification registration certificate." },
  { title: "VAT Registration Certificate", reference: "3028900006", detail: "Value added tax registration certificate." },
  { title: "Tax Clearance Certificate", reference: "Annual", detail: "Current tax clearance issued by the ANRS Bureau of Revenue." },
  { title: "Board Charter", reference: "Managing Board", detail: "Governance charter defining the mandate of the managing board." },
  { title: "Accountability Instrument", reference: "RPEA", detail: "Accountable to the Regional Public Enterprises' Authority." },
];

export interface Award {
  title: string;
  issuer: string;
  year: string;
  detail: string;
}

/** 6 awards and certificates recorded in the profile. */
export const awards: Award[] = [
  { title: "National Kaizen Award — 1st Place", issuer: "Ethiopian Kaizen Institute", year: "2019", detail: "Ranked first nationally for implementation of first-level Kaizen, awarded 29 October 2019." },
  { title: "GC-1 Contractor Certificate", issuer: "Ethiopian Construction Authority", year: "2027", detail: "Grade One General Contractor classification, valid until 08/05/2027." },
  { title: "Revenue Compliance Recognition", issuer: "ANRS Bureau of Revenue", year: "2023", detail: "Recognised for outstanding tax compliance and corporate responsibility." },
  { title: "Quality Management Certificate", issuer: "Internal QA Programme", year: "2024", detail: "Certified quality control programme covering procurement, construction and inspection." },
  { title: "Occupational Safety Recognition", issuer: "ANRS Labour & Skills Bureau", year: "2024", detail: "Recognition for scientific HSE procedures and workplace safety performance." },
  { title: "Regional Development Contribution Award", issuer: "Amhara National Regional State", year: "2025", detail: "Awarded for contribution to regional infrastructure and national development." },
];
