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
  { end: 10, label: "Industrial plants", suffix: "" },
  { end: 3.4, label: "Birr average annual turnover", suffix: "B+", decimals: 1 },
  { end: 25, label: "Birr active project contract value", suffix: "B+" },
  { end: 929, label: "Million Birr recorded capital", suffix: "M+" },
];

export const companyProfile = {
  name: "Hibir Construction Corporation",
  abbreviation: "HCC",
  headOffice: "Bahir Dar, Amhara Regional State — near Bahir Dar University, Gish Abay Campus",
  accountability: "Amhara Regional Public Enterprises' Authority (RPEA)",
  vision: "To be one of the best contractors in Africa's construction industry by 2030.",
  mission:
    "Building infrastructures with the desired quality, timely, and thereby creating a profitable corporation.",
  overview: [
    "Hibir Construction Corporation (HCC) is a government-owned construction enterprise headquartered in Bahir Dar, Amhara Regional State, accountable to the Amhara Regional Public Enterprises' Authority. The corporation is owned and run entirely by Ethiopian professionals.",
    "Originally established through Proclamation No. 71/2010 as Amhara Road Works Enterprise, re-established through Proclamation No. 170/2018, and elevated to full corporation status under Proclamation No. 214/2024.",
    "Today the corporation holds the GC-1 (Grade One) general contractor classification, employs 843 people, operates 282 vehicles, plants and machinery units, and carries an active project contract value exceeding ETB 25 billion.",
  ],
  values: [
    { title: "Team Work", desc: "Collaborative effort across all departments and project sites." },
    { title: "Cost Effectiveness", desc: "Maximising value while maintaining the highest quality standards." },
    { title: "Industriousness", desc: "Relentless commitment and hard work in every project we undertake." },
    { title: "Honesty", desc: "Transparent operations and ethical business practices at all levels." },
    { title: "Loyalty", desc: "Dedicated to our nation, clients and employees with unwavering commitment." },
  ],
  objectives: [
    "Construct new quality roads with economic feasibility that support regional and national development.",
    "Maintain and upgrade existing road infrastructure to modern standards.",
    "Produce and supply construction materials required for road and building works.",
    "Build institutional capacity through training and technology transfer.",
    "Operate profitably and sustainably as a public enterprise.",
  ],
  duties: [
    "Construct, improve and maintain roads at regional and national level.",
    "Design and build bridges, culverts and drainage structures.",
    "Produce asphalt, crushed aggregate and other construction inputs.",
    "Deliver building and urban infrastructure works.",
    "Provide road-sector capacity building and operator training.",
  ],
  contact: {
    city: "Bahir Dar, Amhara Regional State, Ethiopia",
    address: "Near Bahir Dar University, Gish Abay Campus",
  },
} as const;

export interface Partner {
  id: string;
  name: string;
  short: string;
  category: string;
  logo?: string;
  website?: string;
  featured: boolean;
  order: number;
}

/** The 19 partner and client organisations listed in the 2026 profile. */
const rawPartners: Array<[string, string, string]> = [
  ["Ethiopian Roads Administration (ERA)", "ERA", "Road Authorities"],
  ["ANRS Road & Transport Bureau", "ANRS RTB", "Government"],
  ["ANRS Roads Bureau", "ANRS RB", "Road Authorities"],
  ["ANRS Industry Parks Development Corporation", "ANRS IPDC", "Industrial Development"],
  ["Amhara National Regional State", "ANRS", "Government"],
  ["Regional Public Enterprises' Authority", "RPEA", "Government"],
  ["Ethiopian Construction Authority", "ECA", "Government"],
  ["Ethiopian Kaizen Institute", "EKI", "Other Institutional Partners"],
  ["Ethiopian Sugar Corporation", "ESC", "Industrial Development"],
  ["Ethiopian Ports Corporation", "EPC", "Industrial Development"],
  ["Bahir Dar City Administration", "Bahir Dar", "City Administrations"],
  ["Bahir Dar City Roads Authority", "BD Roads", "Road Authorities"],
  ["Gondar City Administration", "Gondar", "City Administrations"],
  ["Dessie City Administration", "Dessie", "City Administrations"],
  ["Woldia City Administration", "Woldia", "City Administrations"],
  ["Worabi City Administration", "Worabi", "City Administrations"],
  ["Mekane Eyesus City Administration", "Mekane Eyesus", "City Administrations"],
  ["Lalibela Town Administration", "Lalibela", "City Administrations"],
  ["Dangila Town Administration", "Dangila", "City Administrations"],
];

export const partners: Partner[] = rawPartners.map(([name, short, category], i) => ({
  id: `partner-${i + 1}`,
  name,
  short,
  category,
  featured: i < 6,
  order: i + 1,
}));

export interface LegalEntity {
  id: string;
  title: string;
  documentType: string;
  image?: string;
  description: string;
  reference: string;
  order: number;
}

/** 11 legal-entity records held by the corporation. Document images pending. */
export const legalEntities: LegalEntity[] = [
  { title: "Establishment Proclamation", documentType: "Proclamation", reference: "No. 71/2010", description: "Established as Amhara Road Works Enterprise on 26 January 2010." },
  { title: "Re-establishment Proclamation", documentType: "Proclamation", reference: "No. 170/2018", description: "Re-established on 31 March 2018 with recorded capital of Birr 929.3 Million." },
  { title: "Corporation Proclamation", documentType: "Proclamation", reference: "No. 214/2024", description: "Upgraded to corporation level and renamed Hibir Construction Corporation." },
  { title: "Commercial Registration Certificate", documentType: "Registration", reference: "980/2008", description: "Registered trade record held with the regional trade bureau." },
  { title: "Business Licence", documentType: "Licence", reference: "General Construction", description: "Licensed for general construction works nationwide." },
  { title: "Contractor Licence", documentType: "Licence", reference: "GC-1 (Grade One)", description: "Grade One General Contractor licence from the Ethiopian Construction Authority." },
  { title: "TIN Certificate", documentType: "Tax Record", reference: "0013324621", description: "Taxpayer identification registration certificate." },
  { title: "VAT Registration Certificate", documentType: "Tax Record", reference: "3028900006", description: "Value added tax registration certificate." },
  { title: "Tax Clearance Certificate", documentType: "Tax Record", reference: "Annual", description: "Current tax clearance issued by the ANRS Bureau of Revenue." },
  { title: "Board Charter", documentType: "Governance", reference: "Managing Board", description: "Governance charter defining the mandate of the managing board." },
  { title: "Accountability Instrument", documentType: "Governance", reference: "RPEA", description: "Accountable to the Regional Public Enterprises' Authority." },
].map((d, i) => ({ ...d, id: `legal-${i + 1}`, order: i + 1 }));

export interface Certificate {
  id: string;
  title: string;
  type: string;
  image?: string;
  description: string;
  issuedBy: string;
  issueDate: string;
  order: number;
}

/** 6 award / certificate visuals recorded in the profile. Images pending. */
export const certificates: Certificate[] = [
  { title: "National Kaizen Award — 1st Place", type: "Award", issuedBy: "Ethiopian Kaizen Institute", issueDate: "2019", description: "Ranked first nationally for implementation of first-level Kaizen, awarded 29 October 2019." },
  { title: "Revenue Compliance Recognition", type: "Recognition", issuedBy: "ANRS Bureau of Revenue", issueDate: "2023", description: "Recognised for outstanding tax compliance and corporate responsibility." },
  { title: "Quality Management Certificate", type: "Certificate", issuedBy: "Internal QA Programme", issueDate: "2024", description: "Certified quality control programme covering procurement, construction and inspection." },
  { title: "Occupational Safety Recognition", type: "Recognition", issuedBy: "ANRS Labour & Skills Bureau", issueDate: "2024", description: "Recognition for scientific HSE procedures and workplace safety performance." },
  { title: "Regional Development Contribution Award", type: "Award", issuedBy: "Amhara National Regional State", issueDate: "2025", description: "Awarded for contribution to regional infrastructure and national development." },
  { title: "Kaizen Implementation Certificate", type: "Certificate", issuedBy: "Ethiopian Kaizen Institute", issueDate: "2020", description: "Certificate confirming continued implementation of Kaizen across corporate operations." },
].map((c, i) => ({ ...c, id: `cert-${i + 1}`, order: i + 1 }));
