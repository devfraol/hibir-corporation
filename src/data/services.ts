import roadImg from "@/assets/road-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import airportImg from "@/assets/airport-project.jpg";
import safetyImg from "@/assets/safety-workers.jpg";
import type { ProjectCategory } from "@/data/projects";

/** Backend-ready service model with dedicated SEO fields. */
export interface Service {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  h1: string;
  /** Long-form, source-supported page content. */
  sections: { heading: string; body: string }[];
  capabilities: string[];
  /** Used to surface genuinely related projects. */
  projectCategories: ProjectCategory[];
  /** Used to surface genuinely related news. */
  newsTags: string[];
  relatedServices: string[];
  order: number;
}

const raw: Omit<Service, "canonicalUrl" | "order">[] = [
  {
    id: "svc-road-construction",
    name: "Road Construction",
    slug: "road-construction",
    h1: "Road Construction Services in Ethiopia",
    shortDescription:
      "New asphalt and gravel road construction for regional and federal road authorities across Ethiopia.",
    description:
      "Hibir Construction Corporation builds new asphalt and gravel roads for the Ethiopian Roads Administration, the ANRS Roads Bureau and city administrations across the Amhara Region, working as a GC-1 classified general contractor with its own workforce, plant and machinery.",
    heroImage: roadImg,
    heroImageAlt: "Asphalt road construction works carried out by Hibir Construction Corporation",
    seoTitle: "Road Construction in Ethiopia | Hibir Construction Corporation",
    seoDescription:
      "Asphalt and gravel road construction in Ethiopia by Hibir Construction Corporation — a GC-1 contractor in Bahir Dar delivering road projects for federal, regional and city road authorities.",
    sections: [
      {
        heading: "What we build",
        body: "Road construction is the corporation's founding mandate: constructing, improving and maintaining roads at regional and national level. Our contracts cover full-width asphalt concrete carriageways, gravel roads, associated drainage structures, culverts and roadside works, delivered from earthworks through to final surfacing and handover.",
      },
      {
        heading: "Who we build for",
        body: "Clients include the Ethiopian Roads Administration, the ANRS Roads Bureau and city administrations such as Dessie, Woldia, Bahir Dar and Gondar. Road contracts form the largest share of an active portfolio with a contract value exceeding ETB 25 billion.",
      },
      {
        heading: "Capacity behind the work",
        body: "Road delivery is supported by 843 permanent staff — engineers, technicians and operators — and 282 vehicles, plants and machinery units, including 10 industrial plants producing asphalt, crushed aggregate and sand. Owning the plant and fleet lets the corporation control programme, quality and cost on remote road corridors.",
      },
    ],
    capabilities: [
      "Asphalt concrete carriageway construction",
      "Gravel road construction and upgrading",
      "Earthworks, sub-base and base course production",
      "Drainage structures and culverts",
      "Own asphalt, crusher and sand plants",
    ],
    projectCategories: ["Asphalt Road", "Gravel Road"],
    newsTags: ["road", "asphalt", "infrastructure"],
    relatedServices: ["road-maintenance", "bridge-construction", "materials-production"],
  },
  {
    id: "svc-bridge-construction",
    name: "Bridge Construction",
    slug: "bridge-construction",
    h1: "Bridge Construction Services in Ethiopia",
    shortDescription:
      "Design-and-build reinforced concrete bridges, culverts and drainage structures.",
    description:
      "The corporation designs and constructs reinforced concrete bridges, culverts and drainage structures, including design-and-build contracts such as the Dura Bridge and the Gimbober and Berbisa bridges for the Ethiopian Roads Administration.",
    heroImage: bridgeImg,
    heroImageAlt: "Reinforced concrete bridge construction by Hibir Construction Corporation",
    seoTitle: "Bridge Construction in Ethiopia | Hibir Construction Corporation",
    seoDescription:
      "Bridge construction in Ethiopia by Hibir Construction Corporation — design-and-build reinforced concrete bridges, culverts and drainage structures for federal and regional road authorities.",
    sections: [
      {
        heading: "Design and build capability",
        body: "Bridge works are delivered as complete design-and-build packages where the client requires it, covering survey, structural design, substructure and superstructure construction, approach works and river training.",
      },
      {
        heading: "Delivered bridge contracts",
        body: "Completed and ongoing bridge contracts include the design and build of the Dura Bridge and the design and build of the Gimbober and Berbisa bridges, both for the Ethiopian Roads Administration.",
      },
      {
        heading: "Integration with road corridors",
        body: "Most bridge structures are built as part of wider road corridors, so bridge crews, formwork and concrete supply are programmed alongside the road teams working the same alignment.",
      },
    ],
    capabilities: [
      "Reinforced concrete bridge superstructure and substructure",
      "Design-and-build contract delivery",
      "Box and pipe culverts",
      "Drainage and river-training structures",
    ],
    projectCategories: ["Bridge"],
    newsTags: ["bridge", "infrastructure"],
    relatedServices: ["road-construction", "urban-infrastructure"],
  },
  {
    id: "svc-building-construction",
    name: "Building Construction",
    slug: "building-construction",
    h1: "Building Construction Services in Ethiopia",
    shortDescription:
      "Institutional, commercial and public buildings delivered under a GC-1 general contractor licence.",
    description:
      "Hibir Construction Corporation constructs institutional, commercial and public buildings using its own workforce, plant and quality-control system, working under a Grade One (GC-1) general contractor licence issued by the Ethiopian Construction Authority.",
    heroImage: heroImg,
    heroImageAlt: "Building construction site operated by Hibir Construction Corporation",
    seoTitle: "Building Construction in Ethiopia | Hibir Construction Corporation",
    seoDescription:
      "Building construction in Ethiopia by Hibir Construction Corporation — institutional, commercial and public buildings delivered by a GC-1 licensed general contractor based in Bahir Dar.",
    sections: [
      {
        heading: "Scope of building works",
        body: "Building contracts cover substructure and superstructure works, finishing, sanitary and electrical installation and external works, delivered to the specification of the client's consultant and inspected under the corporation's internal quality-control programme.",
      },
      {
        heading: "Why a GC-1 licence matters",
        body: "The GC-1 (Grade One) classification is the highest general contractor grade in Ethiopia and carries no ceiling on contract value, which allows the corporation to tender for large public building programmes alongside its road portfolio.",
      },
      {
        heading: "Public accountability",
        body: "As a public enterprise accountable to the Amhara Regional Public Enterprises' Authority, building projects are executed under public procurement rules with documented cost, programme and quality reporting.",
      },
    ],
    capabilities: [
      "Institutional and public buildings",
      "Commercial buildings",
      "Substructure and superstructure works",
      "Finishing and external works",
    ],
    projectCategories: ["Urban Infrastructure"],
    newsTags: ["building", "corporate"],
    relatedServices: ["urban-infrastructure", "industrial-parks"],
  },
  {
    id: "svc-urban-infrastructure",
    name: "Urban Infrastructure",
    slug: "urban-infrastructure",
    h1: "Urban Infrastructure Construction in Ethiopia",
    shortDescription:
      "City roads, cobblestone streets, bus stations and urban drainage for city administrations.",
    description:
      "The corporation delivers urban infrastructure for city administrations across the Amhara Region — city asphalt roads, cobblestone streets, bus stations, walkways and urban drainage — in Bahir Dar, Dessie, Gondar, Woldia, Worabi, Mekane Eyesus and Lalibela.",
    heroImage: airportImg,
    heroImageAlt: "Urban road infrastructure built by Hibir Construction Corporation",
    seoTitle: "Urban Infrastructure Construction in Ethiopia | Hibir Construction Corporation",
    seoDescription:
      "Urban infrastructure construction in Ethiopia — city asphalt roads, cobblestone streets, bus stations and drainage delivered by Hibir Construction Corporation for Amhara city administrations.",
    sections: [
      {
        heading: "Building inside living cities",
        body: "Urban contracts are executed inside working city centres, which means staged traffic management, utility coordination and short working fronts. Projects such as the Worabi City asphalt concrete road, the Woldia City road project and the Bahir Dar bus station were delivered on this basis.",
      },
      {
        heading: "Cobblestone and pedestrian works",
        body: "Cobblestone street programmes in Bahir Dar and Mekane Eyesus combine labour-intensive construction with durable surfacing, supporting local employment while upgrading secondary city streets.",
      },
      {
        heading: "City partners",
        body: "Urban clients include the Bahir Dar City Administration and Bahir Dar City Roads Authority, Dessie, Gondar, Woldia, Worabi, Mekane Eyesus, Lalibela and Dangila administrations.",
      },
    ],
    capabilities: [
      "City asphalt concrete roads",
      "Cobblestone streets and walkways",
      "Bus stations and terminals",
      "Urban drainage and ancillary works",
    ],
    projectCategories: ["Urban Infrastructure", "Cobblestone"],
    newsTags: ["urban", "infrastructure", "city"],
    relatedServices: ["road-construction", "building-construction"],
  },
  {
    id: "svc-road-maintenance",
    name: "Road Maintenance",
    slug: "road-maintenance",
    h1: "Road Maintenance and Upgrading in Ethiopia",
    shortDescription:
      "Heavy maintenance, rehabilitation and upgrading of existing road networks.",
    description:
      "Hibir Construction Corporation maintains, rehabilitates and upgrades existing roads to extend service life, improve road safety and bring older corridors up to current standards — a duty written into the corporation's establishing proclamation.",
    heroImage: safetyImg,
    heroImageAlt: "Road maintenance and rehabilitation works in progress",
    seoTitle: "Road Maintenance & Upgrading in Ethiopia | Hibir Construction Corporation",
    seoDescription:
      "Road maintenance and upgrading in Ethiopia by Hibir Construction Corporation — heavy maintenance, rehabilitation and resurfacing of regional and city road networks from Bahir Dar.",
    sections: [
      {
        heading: "Maintenance as a core mandate",
        body: "Maintaining and upgrading existing road infrastructure sits alongside new construction in the corporation's stated objectives. Maintenance contracts range from routine surface repair to heavy maintenance that effectively rebuilds the pavement structure.",
      },
      {
        heading: "Fleet-led delivery",
        body: "Maintenance depends on plant availability. With 155 vehicles, 117 machinery units and 10 plants under direct ownership, the corporation can mobilise graders, rollers, tippers and asphalt supply without waiting on third-party hire.",
      },
      {
        heading: "Safety on live roads",
        body: "Maintenance is carried out on roads that stay open to traffic, so works are run under the corporation's health, safety and environment procedures with signed diversions and supervised working zones.",
      },
    ],
    capabilities: [
      "Heavy maintenance and rehabilitation",
      "Pavement resurfacing and patching",
      "Drainage clearance and repair",
      "Road upgrading to modern standards",
    ],
    projectCategories: ["Asphalt Road", "Gravel Road"],
    newsTags: ["maintenance", "road", "safety"],
    relatedServices: ["road-construction", "materials-production"],
  },
  {
    id: "svc-materials-production",
    name: "Materials Production",
    slug: "materials-production",
    h1: "Construction Materials Production and Supply",
    shortDescription:
      "Asphalt, crushed aggregate and sand produced in the corporation's own plants.",
    description:
      "The corporation produces and supplies the construction materials its projects consume — asphalt hot mix, crushed aggregate and manufactured sand — from ten industrial plants, a duty set out in its establishing proclamation.",
    heroImage: equipmentImg,
    heroImageAlt: "Aggregate and asphalt production plant operated by the corporation",
    seoTitle: "Construction Materials Production in Ethiopia | Hibir Construction Corporation",
    seoDescription:
      "Asphalt, crushed aggregate and sand production in Ethiopia by Hibir Construction Corporation — ten owned plants supplying the corporation's road and infrastructure projects.",
    sections: [
      {
        heading: "Ten plants under direct ownership",
        body: "Asphalt plants, crushers and sand-making plants — ten in total — form part of the corporation's 282 vehicles, plants and machinery units. Producing materials in-house removes a common source of delay on Ethiopian road contracts.",
      },
      {
        heading: "Quality from source to surface",
        body: "Because aggregate production and road laying are run by the same organisation, material specification, testing and placement are managed under one quality-control chain rather than split across suppliers.",
      },
      {
        heading: "Supply to projects",
        body: "Production is primarily directed to the corporation's own contracts, with supply to third parties handled as permitted under its mandate to produce and supply construction materials and tools.",
      },
    ],
    capabilities: [
      "Asphalt hot mix production",
      "Crushed aggregate production",
      "Manufactured sand",
      "Quarry operation and haulage",
    ],
    projectCategories: ["Asphalt Road"],
    newsTags: ["materials", "plant", "capacity"],
    relatedServices: ["road-construction", "road-maintenance"],
  },
  {
    id: "svc-industrial-parks",
    name: "Industrial Parks",
    slug: "industrial-parks",
    h1: "Industrial Park Infrastructure Construction",
    shortDescription:
      "Site works, internal roads and supporting infrastructure for industrial park development.",
    description:
      "Working with the ANRS Industry Parks Development Corporation, Hibir Construction Corporation delivers site works, internal roads and supporting infrastructure for industrial and agro-industry park development, including the Burie Integrated Agro Industry Park.",
    heroImage: airportImg,
    heroImageAlt: "Industrial park site infrastructure under construction",
    seoTitle: "Industrial Park Construction in Ethiopia | Hibir Construction Corporation",
    seoDescription:
      "Industrial park infrastructure in Ethiopia — internal roads, site works and utilities corridors delivered by Hibir Construction Corporation for the ANRS Industry Parks Development Corporation.",
    sections: [
      {
        heading: "Enabling industrial development",
        body: "Industrial parks need finished ground, access roads, drainage and utility corridors before any factory can be built. The corporation delivers that enabling infrastructure as a single contract package.",
      },
      {
        heading: "Burie Integrated Agro Industry Park",
        body: "The completed Burie Integrated Agro Industry Park contract, executed for the ANRS Industry Parks Development Corporation, is the corporation's reference project in this category.",
      },
      {
        heading: "Institutional partners",
        body: "Partners in industrial development work include the ANRS Industry Parks Development Corporation, the Ethiopian Sugar Corporation and the Ethiopian Ports Corporation.",
      },
    ],
    capabilities: [
      "Bulk earthworks and site formation",
      "Internal access roads",
      "Drainage and utility corridors",
      "Agro-industry park infrastructure",
    ],
    projectCategories: ["Urban Infrastructure"],
    newsTags: ["industrial", "corporate", "infrastructure"],
    relatedServices: ["building-construction", "road-construction"],
  },
  {
    id: "svc-capacity-building",
    name: "Capacity Building",
    slug: "capacity-building",
    h1: "Road Sector Capacity Building and Training",
    shortDescription:
      "Operator training and road-sector capacity building programmes.",
    description:
      "The corporation runs road-sector capacity building activities, including machinery operator training and related programmes formulated and implemented on approval of its managing board.",
    heroImage: equipmentImg,
    heroImageAlt: "Machinery operator training conducted by the corporation",
    seoTitle: "Construction Capacity Building & Training | Hibir Construction Corporation",
    seoDescription:
      "Road sector capacity building in Ethiopia — machinery operator training and technical development programmes run by Hibir Construction Corporation in Bahir Dar.",
    sections: [
      {
        heading: "Training the operators the sector needs",
        body: "Device and machinery operator training is delivered using the corporation's own fleet and sites, so trainees work on the same equipment used on live contracts.",
      },
      {
        heading: "Kaizen and continuous improvement",
        body: "The corporation was ranked first nationally for implementation of first-level Kaizen by the Ethiopian Kaizen Institute in October 2019, and continues Kaizen implementation across its operations.",
      },
      {
        heading: "Board-approved programmes",
        body: "Capacity building programmes are formulated and implemented upon approval of the managing board, in line with the corporation's establishing proclamation.",
      },
    ],
    capabilities: [
      "Machinery and device operator training",
      "Technical staff development",
      "Kaizen implementation",
      "Technology and knowledge transfer",
    ],
    projectCategories: [],
    newsTags: ["training", "kaizen", "corporate"],
    relatedServices: ["materials-production", "road-maintenance"],
  },
];

export const services: Service[] = raw.map((s, i) => ({
  ...s,
  canonicalUrl: `/services/${s.slug}`,
  order: i + 1,
}));

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug) ?? null;

export const getServicesBySlugs = (slugs: string[]) =>
  slugs.map((s) => getServiceBySlug(s)).filter((s): s is Service => !!s);

/** Services whose project categories cover a given project category. */
export const getServicesForProjectCategory = (category: string) =>
  services.filter((s) => (s.projectCategories as string[]).includes(category));
