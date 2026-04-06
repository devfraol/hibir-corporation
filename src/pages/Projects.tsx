import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import roadImg from "@/assets/road-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import airportImg from "@/assets/airport-project.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import safetyImg from "@/assets/safety-workers.jpg";

const formatBirr = (value: number) => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B Birr`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}M Birr`;
  return `${value.toLocaleString()} Birr`;
};

const projects = [
  // Major ongoing projects
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
  // Major completed projects
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

const filters = ["All", "Ongoing", "Completed"];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter(p => p.status === filter);

  return (
    <main>
      <PageHero title="Our Projects" subtitle="A portfolio exceeding 20.3 billion Birr across Ethiopia's infrastructure landscape" image={heroImg} />

      {/* Summary Stats */}
      <section className="relative -mt-16 z-20 px-4 md:px-8 mb-12">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { label: "Total Portfolio Value", value: "20.3B+ Birr" },
              { label: "Annual Turnover", value: "2.5B+ Birr" },
              { label: "Total Projects", value: `${projects.length}+` },
            ].map((s, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="text-2xl md:text-3xl font-display font-bold text-gradient-gold">{s.value}</div>
                <div className="text-xs text-muted-foreground font-body mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex justify-center gap-3 mb-14">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-300 ${
                  filter === f
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {f} ({f === "All" ? projects.length : projects.filter(p => p.status === f).length})
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.05}>
                  <div className="group glass-card rounded-2xl overflow-hidden">
                    <div className="relative overflow-hidden h-56">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-body font-semibold backdrop-blur-sm ${
                        p.status === "Completed" ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-accent/15 text-accent border border-accent/20"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-lg mb-3 text-foreground">{p.title}</h3>
                      <div className="space-y-2 text-sm font-body text-muted-foreground">
                        <p><span className="font-medium text-foreground/80">Client:</span> {p.client}</p>
                        <p><span className="font-medium text-foreground/80">Contract Value:</span> <span className="text-accent font-semibold">{formatBirr(p.budget)}</span></p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
};

export default Projects;
