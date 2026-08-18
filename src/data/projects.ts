import airportImg from "@/assets/airport-project.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import highwayImg from "@/assets/hero-highway.jpg";
import machineryImg from "@/assets/capacity-machinery.jpg";
import roadImg from "@/assets/road-construction.jpg";
import safetyImg from "@/assets/safety-workers.jpg";

export type ProjectStatus = "Ongoing" | "Completed" | "Suspended" | "Terminated";
export type ProjectCategory =
  | "Asphalt Road"
  | "Gravel Road"
  | "Bridge"
  | "Urban Infrastructure"
  | "Cobblestone";

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
}

/** Backend-ready project model. All values are sourced from the company profile. */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  client: string;
  location: string;
  contractValue: number;
  status: ProjectStatus;
  contractorRole: string;
  startDate?: string;
  completionDate?: string;
  featuredImage: ProjectImage;
  gallery: ProjectImage[];
  category: ProjectCategory;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  /** Legacy aliases kept for existing components. */
  budget: number;
  image: string;
}

export const PROJECT_STATUSES: ProjectStatus[] = ["Completed", "Ongoing", "Suspended", "Terminated"];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

interface Seed {
  title: string;
  client: string;
  budget: number;
  status: ProjectStatus;
  image: string;
  location: string;
  category: ProjectCategory;
  gallery?: string[];
  featured?: boolean;
}

const seeds: Seed[] = [
  { title: "Bale Egziaber–Airport Asphalt Road", client: "Dessie City Administration", budget: 5_119_831_284, status: "Ongoing", image: airportImg, location: "Dessie, Amhara Region", category: "Asphalt Road", featured: true, gallery: [airportImg, roadImg, machineryImg, highwayImg, equipmentImg, bridgeImg] },
  { title: "Werabe–Bojober Road Project", client: "Woldia City Mayor Office", budget: 2_777_252_940, status: "Ongoing", image: roadImg, location: "Woldia, Amhara Region", category: "Asphalt Road", gallery: [roadImg, machineryImg, highwayImg] },
  { title: "Debecha–Feresbet Asphalt Road", client: "Ethiopian Roads Authority", budget: 1_790_005_721, status: "Ongoing", image: heroImg, location: "Amhara Region", category: "Asphalt Road", gallery: [heroImg, roadImg, equipmentImg] },
  { title: "Worabi City Asphalt Concrete Road", client: "Worabi City Administration", budget: 1_436_924_300, status: "Ongoing", image: equipmentImg, location: "Worabi", category: "Urban Infrastructure", gallery: [equipmentImg, roadImg, machineryImg] },
  { title: "Lalibela–Sekota Asphalt Road", client: "Ethiopian Roads Authority", budget: 1_061_557_954, status: "Ongoing", image: bridgeImg, location: "Lalibela–Sekota, Amhara Region", category: "Asphalt Road", gallery: [bridgeImg, highwayImg, roadImg] },
  { title: "Woldia City Road Project", client: "Woldia City Administration", budget: 1_009_075_429, status: "Ongoing", image: safetyImg, location: "Woldia, Amhara Region", category: "Urban Infrastructure", gallery: [safetyImg, roadImg, machineryImg] },
  { title: "Dessie City Asphalt Road", client: "Gashina-Bilibala Office", budget: 591_816_447, status: "Ongoing", image: roadImg, location: "Dessie, Amhara Region", category: "Urban Infrastructure" },
  { title: "Gonji-Kolela Road Project", client: "Ethiopian Roads Authority", budget: 333_027_800, status: "Ongoing", image: heroImg, location: "Gonji Kolela, Amhara Region", category: "Asphalt Road" },
  { title: "Gebreal–Kidanemihiret Asphalt Roads", client: "Bahir Dar City Road Authority", budget: 321_025_676, status: "Ongoing", image: equipmentImg, location: "Bahir Dar, Amhara Region", category: "Urban Infrastructure" },
  { title: "Warkaw–Zenzelma Asphalt Road", client: "Bahir Dar City Roads Authority", budget: 308_530_361, status: "Ongoing", image: airportImg, location: "Bahir Dar, Amhara Region", category: "Asphalt Road" },
  { title: "Design & Build Gimbober & Berbisa Bridges", client: "Ethiopian Roads Authority", budget: 47_392_364, status: "Ongoing", image: bridgeImg, location: "Amhara Region", category: "Bridge", gallery: [bridgeImg, heroImg, machineryImg] },
  { title: "Gagbaya–Kurba Gravel Road", client: "ANRS Road Bureau", budget: 1_020_626_150, status: "Completed", image: roadImg, location: "Amhara Region", category: "Gravel Road", gallery: [roadImg, machineryImg, heroImg] },
  { title: "Dangila–Jawi Gravel Road", client: "ANRS Road Bureau", budget: 776_368_131, status: "Completed", image: heroImg, location: "Dangila–Jawi, Amhara Region", category: "Gravel Road" },
  { title: "Burie Integrated Agro Industry Park", client: "ANRS Industry Parks Dev. Corp.", budget: 701_064_304, status: "Completed", image: equipmentImg, location: "Burie, Amhara Region", category: "Urban Infrastructure" },
  { title: "Beles Road Projects", client: "Ethiopian Sugar Corporation", budget: 564_394_659, status: "Completed", image: safetyImg, location: "Beles, Amhara Region", category: "Gravel Road" },
  { title: "Almesh Gravel Road", client: "ANRS Road Bureau", budget: 476_975_441, status: "Completed", image: bridgeImg, location: "Amhara Region", category: "Gravel Road" },
  { title: "Gondar Addisalem–Ayira Asphalt Road", client: "Gondar City Administration", budget: 474_740_087, status: "Completed", image: roadImg, location: "Gondar, Amhara Region", category: "Asphalt Road" },
  { title: "Getermenged Square–Airport Asphalt Road", client: "Bahir Dar City Administration", budget: 216_051_863, status: "Completed", image: airportImg, location: "Bahir Dar, Amhara Region", category: "Asphalt Road" },
  { title: "Bahir Dar Airport Expansion Asphalt", client: "Ethiopian Ports Corporation", budget: 94_729_005, status: "Completed", image: airportImg, location: "Bahir Dar, Amhara Region", category: "Asphalt Road" },
  { title: "Bahir Dar Cobblestone Projects", client: "Bahir Dar City Administration", budget: 91_020_589, status: "Completed", image: heroImg, location: "Bahir Dar, Amhara Region", category: "Cobblestone" },
  { title: "Segno Gebeya–Salayish Gravel Road", client: "Dessie City Administration", budget: 56_130_031, status: "Completed", image: safetyImg, location: "Dessie, Amhara Region", category: "Gravel Road" },
  { title: "Bahir Dar Bus Station", client: "ANRS Road & Transport Bureau", budget: 52_466_450, status: "Completed", image: equipmentImg, location: "Bahir Dar, Amhara Region", category: "Urban Infrastructure" },
  { title: "Mekane Eyesus Cobblestone Project", client: "Mekane Eyesus City Admin", budget: 38_194_935, status: "Completed", image: roadImg, location: "Mekane Eyesus, Amhara Region", category: "Cobblestone" },
  { title: "Design & Build of Dura Bridge", client: "Ethiopian Roads Authority", budget: 31_535_962, status: "Completed", image: bridgeImg, location: "Amhara Region", category: "Bridge", gallery: [bridgeImg, heroImg, roadImg] },
];

const describe = (s: Seed) =>
  `${s.title} is a ${s.category.toLowerCase()} contract executed by Hibir Construction Corporation for ${s.client} in ${s.location}. The contract value is recorded at ${s.budget.toLocaleString()} Birr and the project is currently ${s.status.toLowerCase()} under the corporation's GC-1 general contractor licence.`;

export const projects: Project[] = seeds.map((s, i) => ({
  id: `prj-${String(i + 1).padStart(3, "0")}`,
  title: s.title,
  slug: slugify(s.title),
  description: describe(s),
  client: s.client,
  location: s.location,
  contractValue: s.budget,
  status: s.status,
  contractorRole: "General Contractor (GC-1)",
  featuredImage: { url: s.image, alt: `${s.title} — project site` },
  gallery: (s.gallery ?? [s.image]).map((url, gi) => ({
    url,
    alt: `${s.title} — site photograph ${gi + 1}`,
  })),
  category: s.category,
  featured: !!s.featured,
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  budget: s.budget,
  image: s.image,
}));

export const formatBirr = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B Birr`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M Birr`;
  return `${value.toLocaleString()} Birr`;
};
