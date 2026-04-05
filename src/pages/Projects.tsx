import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import roadImg from "@/assets/road-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import airportImg from "@/assets/airport-project.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";

const projects = [
  { title: "Bahir Dar Airport Expansion", client: "Ethiopian Airports Enterprise", budget: "2.1 Billion Birr", status: "Ongoing", image: airportImg },
  { title: "Lalibela Road Project", client: "Ethiopian Roads Authority", budget: "890 Million Birr", status: "Completed", image: roadImg },
  { title: "Gondar Asphalt Road", client: "Amhara Region Roads Authority", budget: "1.5 Billion Birr", status: "Ongoing", image: heroImg },
  { title: "Debre Tabor – Nefas Mewcha Road", client: "Ethiopian Roads Authority", budget: "1.2 Billion Birr", status: "Completed", image: bridgeImg },
  { title: "Bahir Dar – Motta Highway", client: "Ethiopian Roads Authority", budget: "3.4 Billion Birr", status: "Ongoing", image: equipmentImg },
  { title: "Dessie – Woldiya Road Rehabilitation", client: "Ethiopian Roads Authority", budget: "780 Million Birr", status: "Completed", image: roadImg },
];

const filters = ["All", "Ongoing", "Completed"];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter(p => p.status === filter);

  return (
    <main>
      <PageHero title="Our Projects" subtitle="Showcasing Ethiopia's transformative infrastructure projects" image={heroImg} />

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex justify-center gap-3 mb-12">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-body font-medium transition-all ${
                  filter === f
                    ? "bg-accent text-accent-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.1}>
                  <div className="group bg-card rounded-xl overflow-hidden border border-border card-hover">
                    <div className="relative overflow-hidden h-52">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-body font-semibold ${
                        p.status === "Completed" ? "bg-green-500/90 text-primary-foreground" : "bg-accent/90 text-accent-foreground"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-lg mb-3">{p.title}</h3>
                      <div className="space-y-1.5 text-sm font-body text-muted-foreground">
                        <p><span className="font-medium text-foreground">Client:</span> {p.client}</p>
                        <p><span className="font-medium text-foreground">Budget:</span> {p.budget}</p>
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
