import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import FeaturedProject from "@/components/projects/FeaturedProject";
import { formatBirr, type Project } from "@/data/projects";
import { getProjects } from "@/services/projectService";
import { Link, useLocation } from "react-router-dom";
import roadImg from "@/assets/road-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import airportImg from "@/assets/airport-project.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import safetyImg from "@/assets/safety-workers.jpg";
import Seo from "@/components/Seo";

const filters = ["All", "Ongoing", "Completed", "Suspended", "Terminated"];

const hashToFilter: Record<string, string> = {
  "#completed": "Completed",
  "#ongoing": "Ongoing",
  "#suspended": "Suspended",
  "#terminated": "Terminated",
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { hash } = useLocation();

  useEffect(() => {
    const f = hashToFilter[hash];
    if (f) setFilter(f);
  }, [hash]);
  useEffect(() => {
    let cancelled = false;
    void getProjects().then((items) => { if (!cancelled) setProjects(items); }).catch(() => { if (!cancelled) setProjects([]); }).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filtered = filter === "All" ? projects : projects.filter(p => p.status === filter);

  return (
    <main>
      <Seo
        title="Construction Projects in Ethiopia | Hibir Construction Corporation"
        description="Road, bridge, cobblestone and urban infrastructure projects delivered by Hibir Construction Corporation across the Amhara Region and Ethiopia, with an active contract portfolio above 25 billion Birr."
        path="/projects"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]}
      />
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

      <div id="featured" className="scroll-mt-24" />
      {!loading && projects.length > 0 && <FeaturedProject project={projects.find((p) => p.featured) ?? projects[0]} />}

      <section className="section-padding pt-0">
        <div className="container-custom">
          {/* Filters */}
          <div id="gallery" className="scroll-mt-28 flex flex-wrap justify-center gap-3 mb-14">
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
              {loading ? <div className="col-span-full surface-card p-10 text-center text-muted-foreground">Loading projects…</div> : filtered.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.05}>
                  <Link to={`/projects/${p.slug}`} className="group glass-card rounded-2xl overflow-hidden block hover:border-accent/40 transition-colors">
                    <div className="relative overflow-hidden h-56">
                      <img src={p.image} alt={p.featuredImage.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-xs font-body font-semibold backdrop-blur-sm ${
                        p.status === "Completed" ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-accent/15 text-accent border border-accent/20"
                      }`}>
                        {p.status ?? "Status not disclosed"}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-semibold text-lg mb-3 text-foreground">{p.title}</h3>
                      <div className="space-y-2 text-sm font-body text-muted-foreground">
                        <p><span className="font-medium text-foreground/80">Category:</span> {p.category}</p>
                        <p><span className="font-medium text-foreground/80">Location:</span> {p.location || "Not disclosed"}</p>
                        <p><span className="font-medium text-foreground/80">Client:</span> {p.client}</p>
                        {p.contractValue !== undefined && <p><span className="font-medium text-foreground/80">Contract Value:</span> <span className="text-accent font-semibold">{formatBirr(p.contractValue)}</span></p>}
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </motion.div>
          </AnimatePresence>
          {!loading && filtered.length === 0 && <p className="mt-8 text-center font-body text-muted-foreground">No projects match this execution status.</p>}
        </div>
      </section>
    </main>
  );
};

export default Projects;
