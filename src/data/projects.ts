import airportImg from "@/assets/airport-project.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import roadImg from "@/assets/road-construction.jpg";
import safetyImg from "@/assets/safety-workers.jpg";

export type ProjectStatus = "Ongoing" | "Completed" | "Suspended" | "Terminated";

export interface Project {
  title: string;
  client: string;
  budget: number;
  status: ProjectStatus;
  image: string;
}

export const PROJECT_STATUSES: ProjectStatus[] = ["Completed", "Ongoing", "Suspended", "Terminated"];

/** Projects, clients and contract values as recorded in the company profile. */
export const projects: Project[] = [
  { title: "Bale Egziaber–Airport Asphalt Road", client: "Dessie City Administration", budget: 5_119_831_284, status: "Ongoing", image: airportImg },
  { title: "Werabe–Bojober Road Project", client: "Woldia City Mayor Office", budget: 2_777_252_940, status: "Ongoing", image: roadImg },
  { title: "Debecha–Feresbet Asphalt Road", client: "Ethiopian Roads Authority", budget: 1_790_005_721, status: "Ongoing", image: heroImg },
  { title: "Worabi City Asphalt Concrete Road", client: "Worabi City Administration", budget: 1_436_924_300, status: "Ongoing", image: equipmentImg },
  { title: "Lalibela–Sekota Asphalt Road", client: "Ethiopian Roads Authority", budget: 1_061_557_954, status: "Ongoing", image: bridgeImg },
  { title: "Woldia City Road Project", client: "Woldia City Administration", budget: 1_009_075_429, status: "Ongoing", image: safetyImg },
  { title: "Dessie City Asphalt Road", client: "Gashina-Bilibala Office", budget: 591_816_447, status: "Ongoing", image: roadImg },
  { title: "Gonji-Kolela Road Project", client: "Ethiopian Roads Authority", budget: 333_027_800, status: "Ongoing", image: heroImg },
  { title: "Gebreal–Kidanemihiret Asphalt Roads", client: "Bahir Dar City Road Authority", budget: 321_025_676, status: "Ongoing", image: equipmentImg },
  { title: "Warkaw–Zenzelma Asphalt Road", client: "Bahir Dar City Roads Authority", budget: 308_530_361, status: "Ongoing", image: airportImg },
  { title: "Design & Build Gimbober & Berbisa Bridges", client: "Ethiopian Roads Authority", budget: 47_392_364, status: "Ongoing", image: bridgeImg },
  { title: "Gagbaya–Kurba Gravel Road", client: "ANRS Road Bureau", budget: 1_020_626_150, status: "Completed", image: roadImg },
  { title: "Dangila–Jawi Gravel Road", client: "ANRS Road Bureau", budget: 776_368_131, status: "Completed", image: heroImg },
  { title: "Burie Integrated Agro Industry Park", client: "ANRS Industry Parks Dev. Corp.", budget: 701_064_304, status: "Completed", image: equipmentImg },
  { title: "Beles Road Projects", client: "Ethiopian Sugar Corporation", budget: 564_394_659, status: "Completed", image: safetyImg },
  { title: "Almesh Gravel Road", client: "ANRS Road Bureau", budget: 476_975_441, status: "Completed", image: bridgeImg },
  { title: "Gondar Addisalem–Ayira Asphalt Road", client: "Gondar City Administration", budget: 474_740_087, status: "Completed", image: roadImg },
  { title: "Getermenged Square–Airport Asphalt Road", client: "Bahir Dar City Administration", budget: 216_051_863, status: "Completed", image: airportImg },
  { title: "Bahir Dar Airport Expansion Asphalt", client: "Ethiopian Ports Corporation", budget: 94_729_005, status: "Completed", image: airportImg },
  { title: "Bahir Dar Cobblestone Projects", client: "Bahir Dar City Administration", budget: 91_020_589, status: "Completed", image: heroImg },
  { title: "Segno Gebeya–Salayish Gravel Road", client: "Dessie City Administration", budget: 56_130_031, status: "Completed", image: safetyImg },
  { title: "Bahir Dar Bus Station", client: "ANRS Road & Transport Bureau", budget: 52_466_450, status: "Completed", image: equipmentImg },
  { title: "Mekane Eyesus Cobblestone Project", client: "Mekane Eyesus City Admin", budget: 38_194_935, status: "Completed", image: roadImg },
  { title: "Design & Build of Dura Bridge", client: "Ethiopian Roads Authority", budget: 31_535_962, status: "Completed", image: bridgeImg },
];

export const formatBirr = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B Birr`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M Birr`;
  return `${value.toLocaleString()} Birr`;
};
