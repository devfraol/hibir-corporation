import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import FeaturedProject from "@/components/projects/FeaturedProject";
import { formatBirr, projects } from "@/data/projects";
import { Link } from "react-router-dom";
import roadImg from "@/assets/road-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import airportImg from "@/assets/airport-project.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import safetyImg from "@/assets/safety-workers.jpg";

const filters = ["All", "Ongoing", "Completed"];

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projects : projects.filter(p => p.status === filter);

  return (
    <main>
      <PageHero title="Our Projects" subtitle="An active contract portfolio exceeding 25 billion Birr across Ethiopia's infrastructure landscape" image={heroImg} />

      {/* Summary Stats */}
      <section className="relative -mt-16 z-20 px-4 md:px-8 mb-12">
        <div className="container-custom">
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {[
              { label: "Active Contract Value", value: "25B+ Birr" },
              { label: "Annual Turnover", value: "3.4B+ Birr" },
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

      <FeaturedProject project={projects.find((p) => p.featured) ?? projects[0]} />

      <section className="section-padding pt-0">
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
                <AnimatedSection key={p.id} delay={i * 0.05}>
                  <Link to={`/projects/${p.slug}`} className="group glass-card rounded-2xl overflow-hidden block hover:border-accent/40 transition-colors">
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
                  </Link>
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
