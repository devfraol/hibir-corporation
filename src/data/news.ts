import type { NewsArticle } from "@/types/news";
import airportImg from "@/assets/airport-project.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import roadImg from "@/assets/road-construction.jpg";
import safetyImg from "@/assets/safety-workers.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import machineryImg from "@/assets/capacity-machinery.jpg";
import highwayImg from "@/assets/hero-highway.jpg";

/**
 * PLACEHOLDER NEWSROOM CONTENT.
 * Every figure, client name, project and award referenced below is taken from the
 * Hibir Construction Corporation company profile. The articles themselves are
 * editorial placeholders written around those verified facts and are intended to
 * be replaced by real records from the backend. No certifications, clients or
 * financials have been invented.
 */
const author = {
  id: "hcc-comms",
  name: "Corporate Communications",
  role: "Hibir Construction Corporation",
};

const now = "2026-08-17T08:00:00.000Z";

export const newsArticles: NewsArticle[] = [
  {
    id: "n-001",
    title: "Bale Egziaber–Airport Asphalt Road advances as our largest active contract",
    slug: "bale-egziaber-airport-asphalt-road-progress",
    excerpt:
      "With a contract value of 5.12 billion Birr for the Dessie City Administration, the Bale Egziaber–Airport asphalt road is the single largest project in the corporation's active portfolio.",
    content: [
      { type: "paragraph", text: "The Bale Egziaber–Airport asphalt road project, contracted by the Dessie City Administration at a value of 5,119,831,284 Birr, is currently the largest ongoing undertaking in Hibir Construction Corporation's portfolio." },
      { type: "heading", level: 2, text: "Delivered with in-house capacity" },
      { type: "paragraph", text: "The corporation executes the works using its own production and equipment base rather than relying on subcontracted capacity. That base includes two asphalt plants, five crusher and sand-making plants, 146 vehicles and 89 machinery units — 242 units of vehicles, plants and machinery in total." },
      { type: "list", items: ["Client: Dessie City Administration", "Contract value: 5.12 billion Birr", "Status: Ongoing", "Scope: Asphalt concrete road construction"] },
      { type: "heading", level: 2, text: "Part of a 20.3 billion Birr programme" },
      { type: "paragraph", text: "The project sits inside a current asphalt project portfolio valued at more than 20.3 billion Birr including VAT, supported by an annual construction turnover exceeding 2.5 billion Birr." },
      { type: "quote", text: "Our mandate is to construct, improve and maintain roads that carry regional and national development forward.", attribution: "Hibir Construction Corporation" },
    ],
    featuredImage: { url: airportImg, alt: "Asphalt road construction works approaching an airport corridor" },
    gallery: [
      { url: roadImg, alt: "Asphalt laying operations on a new road corridor" },
      { url: equipmentImg, alt: "Heavy equipment fleet mobilised on site" },
    ],
    category: "Projects",
    tags: ["Asphalt", "Dessie", "Ongoing"],
    author,
    publishedAt: "2026-08-12T08:00:00.000Z",
    updatedAt: now,
    createdAt: "2026-08-10T08:00:00.000Z",
    status: "published",
    featured: true,
    readingMinutes: 4,
    seoTitle: "Bale Egziaber–Airport Asphalt Road progress | Hibir Construction Corporation",
    seoDescription:
      "The 5.12 billion Birr Bale Egziaber–Airport asphalt road for Dessie City Administration is the largest active contract in Hibir Construction Corporation's portfolio.",
  },
  {
    id: "n-002",
    title: "Upgraded to corporation level under Proclamation No. 214/2024",
    slug: "hibir-construction-corporation-proclamation-214-2024",
    excerpt:
      "The enterprise founded in 2010 as Amhara Road Works Enterprise has been re-established and upgraded as Hibir Construction Corporation, accountable to the Regional Public Enterprises' Authority.",
    content: [
      { type: "paragraph", text: "Hibir Construction Corporation was originally established as Amhara Road Works Enterprise by Proclamation No. 71/2010, re-established by Proclamation No. 170/2018, and upgraded to corporation level by Proclamation No. 214/2024." },
      { type: "heading", level: 2, text: "A wider mandate" },
      { type: "paragraph", text: "The corporation is a government-owned construction enterprise headquartered in Bahir Dar, accountable to the Regional Public Enterprises' Authority, and holds a GC-1 general contractor grade from the Ethiopian Construction Authority." },
      { type: "list", items: ["2010 — Established as Amhara Road Works Enterprise (Proclamation No. 71/2010)", "2018 — Re-established under Proclamation No. 170/2018", "2024 — Upgraded to Hibir Construction Corporation (Proclamation No. 214/2024)"] },
    ],
    featuredImage: { url: highwayImg, alt: "Completed highway corridor at dusk" },
    gallery: [],
    category: "Corporate",
    tags: ["Governance", "Proclamation"],
    author,
    publishedAt: "2026-07-28T08:00:00.000Z",
    updatedAt: "2026-07-28T08:00:00.000Z",
    createdAt: "2026-07-26T08:00:00.000Z",
    status: "published",
    featured: false,
    readingMinutes: 3,
  },
  {
    id: "n-003",
    title: "Zero accidents, zero man-hours lost: inside our HSE practice",
    slug: "zero-accidents-hse-practice",
    excerpt:
      "The corporation follows scientific health, safety and environment procedures with strict implementation and follow-up across every active site.",
    content: [
      { type: "paragraph", text: "Safety at Hibir Construction Corporation is governed by scientific HSE procedures with principles set for strict implementation and follow-up. The objective is unambiguous: zero accidents and zero man-hours lost." },
      { type: "heading", level: 2, text: "Practices applied on every site" },
      { type: "list", items: ["Use of Personal Protective Equipment (PPE)", "Use of safe tools and equipment", "Trained and competent staff", "Regular on-site safety supervisions"] },
      { type: "paragraph", text: "These practices are paired with the corporation's quality controls — procurement control, construction process control, inspection and testing, control of non-conforming outputs, and a customer complaint and corrective action system." },
    ],
    featuredImage: { url: safetyImg, alt: "Construction workers wearing full personal protective equipment" },
    gallery: [],
    category: "Safety",
    tags: ["HSE", "PPE", "Quality"],
    author,
    publishedAt: "2026-07-14T08:00:00.000Z",
    updatedAt: "2026-07-14T08:00:00.000Z",
    createdAt: "2026-07-12T08:00:00.000Z",
    status: "published",
    featured: false,
    readingMinutes: 3,
  },
  {
    id: "n-004",
    title: "National Kaizen Award: ranked first for first-level Kaizen implementation",
    slug: "national-kaizen-award-first-place",
    excerpt:
      "The Ethiopian Kaizen Institute recognised the corporation with first place nationally for its implementation of first-level Kaizen on 29 October 2019.",
    content: [
      { type: "paragraph", text: "On 29 October 2019 the Ethiopian Kaizen Institute (EKI) awarded the corporation first place nationally for implementing first-level Kaizen." },
      { type: "paragraph", text: "The recognition reflects a continuous-improvement culture applied to construction processes, equipment utilisation and material production across the corporation's plants and sites." },
    ],
    featuredImage: { url: machineryImg, alt: "Machinery fleet lined up at a corporation facility" },
    gallery: [],
    category: "Awards",
    tags: ["Kaizen", "Recognition"],
    author,
    publishedAt: "2026-06-30T08:00:00.000Z",
    updatedAt: "2026-06-30T08:00:00.000Z",
    createdAt: "2026-06-28T08:00:00.000Z",
    status: "published",
    featured: false,
    readingMinutes: 2,
  },
  {
    id: "n-005",
    title: "Design-and-build bridge works delivered for the Ethiopian Roads Authority",
    slug: "design-and-build-bridge-works-era",
    excerpt:
      "From the completed Dura Bridge to the ongoing Gimbober and Berbisa bridges, the corporation delivers reinforced concrete structures under design-and-build contracts.",
    content: [
      { type: "paragraph", text: "The corporation's bridge portfolio for the Ethiopian Roads Authority includes the completed design and build of the Dura Bridge and the ongoing design and build of the Gimbober and Berbisa bridges." },
      { type: "paragraph", text: "Bridge works are executed alongside the corporation's road programme, which includes the Debecha–Feresbet, Lalibela–Sekota and Gonji-Kolela projects for the Ethiopian Roads Authority." },
    ],
    featuredImage: { url: bridgeImg, alt: "Reinforced concrete bridge under construction" },
    gallery: [{ url: roadImg, alt: "Approach road works adjacent to a bridge structure" }],
    category: "Infrastructure",
    tags: ["Bridges", "ERA", "Design and build"],
    author,
    publishedAt: "2026-06-16T08:00:00.000Z",
    updatedAt: "2026-06-16T08:00:00.000Z",
    createdAt: "2026-06-14T08:00:00.000Z",
    status: "published",
    featured: false,
    readingMinutes: 3,
  },
  {
    id: "n-006",
    title: "803 professionals and 242 units of plant behind every contract",
    slug: "human-resources-and-equipment-capacity",
    excerpt:
      "Human resources of 803 people work alongside 146 vehicles, 89 machinery units and 7 plants — the delivery capacity behind the corporation's active programme.",
    content: [
      { type: "paragraph", text: "Hibir Construction Corporation employs 803 people and operates 242 units of vehicles, plants and machinery: 146 vehicles, 89 machinery units and 7 plants." },
      { type: "heading", level: 2, text: "Production plants" },
      { type: "paragraph", text: "The plant base comprises two asphalt plants and five crusher and sand-making plants, enabling in-house production and supply of construction materials for road works." },
      { type: "paragraph", text: "The corporation also carries out road sector capacity building, including device operator training and related programmes implemented upon approval of the managing board." },
    ],
    featuredImage: { url: equipmentImg, alt: "Fleet of construction vehicles and machinery" },
    gallery: [],
    category: "Company News",
    tags: ["Capacity", "Equipment", "Training"],
    author,
    publishedAt: "2026-05-29T08:00:00.000Z",
    updatedAt: "2026-05-29T08:00:00.000Z",
    createdAt: "2026-05-27T08:00:00.000Z",
    status: "published",
    featured: false,
    readingMinutes: 3,
  },
  {
    id: "n-007",
    title: "Contact channels for tender and partnership enquiries",
    slug: "contact-channels-for-tender-enquiries",
    excerpt:
      "Enquiries can be directed to the corporation's head office near Bahir Dar University, Gish Abay Campus, Bahir Dar, Ethiopia.",
    content: [
      { type: "paragraph", text: "Tender, partnership and supplier enquiries can be directed to the corporation's head office in Bahir Dar." },
      { type: "list", items: ["Address: Near Bahir Dar University, Gish Abay Campus, Bahir Dar, Ethiopia", "P.O. Box 1678", "Telephone: +251 582 20 4493", "Email: HCCnt2005@gmail.com"] },
    ],
    featuredImage: { url: roadImg, alt: "Road construction corridor under an open sky" },
    gallery: [],
    category: "Announcements",
    tags: ["Contact", "Tenders"],
    author,
    publishedAt: "2026-05-08T08:00:00.000Z",
    updatedAt: "2026-05-08T08:00:00.000Z",
    createdAt: "2026-05-06T08:00:00.000Z",
    status: "published",
    featured: false,
    readingMinutes: 2,
  },
];
