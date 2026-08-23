import { HardHat, Landmark, Wrench, Truck, Factory, GraduationCap } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import roadImg from "@/assets/road-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import airportImg from "@/assets/airport-project.jpg";
import safetyImg from "@/assets/safety-workers.jpg";

const services = [
  { id: "road-construction", icon: <HardHat size={32} />, title: "Road Construction", desc: "Construct, improve, and maintain appropriate roads across the regional and national levels. We build new quality roads with economic feasibility, supporting development activities and alleviating infrastructural difficulties for communities.", image: roadImg },
  { id: "urban-infrastructure", icon: <Landmark size={32} />, title: "Asphalt & Urban Infrastructure", desc: "Full-service asphalt production and laying from our own asphalt, crusher and sand-making plants (10 in total), including hot mix production, surface dressing, and bituminous treatments for durable road surfaces.", image: heroImg },
  { id: "bridge-construction", icon: <Wrench size={32} />, title: "Bridge Construction", desc: "Engineering and construction of reinforced concrete bridges, culverts, and drainage structures — including design-and-build projects like the Dura Bridge and Gimbober & Berbisa Bridges for the Ethiopian Roads Authority.", image: bridgeImg },
  { id: "road-maintenance", icon: <Truck size={32} />, title: "Road Maintenance & Upgrading", desc: "Comprehensive rehabilitation, heavy maintenance, and upgrading of existing road networks to extend service life, improve safety, and bring roads to modern standards.", image: safetyImg },
  { id: "materials", icon: <Factory size={32} />, title: "Materials Production & Supply", desc: "Production and supply of various construction materials and tools necessary for road and other construction works from our own plants and quarries — including crushed aggregate, sand, and asphalt.", image: airportImg },
  { id: "building-construction", icon: <Landmark size={32} />, title: "Building Construction", desc: "Construction of institutional, commercial and residential buildings, delivered with the corporation's own workforce, plant and quality-control system as a GC-1 classified general contractor.", image: heroImg },
  { id: "industrial-parks", icon: <Factory size={32} />, title: "Industrial Parks & Facilities", desc: "Site works, internal roads and supporting infrastructure for industrial park development, delivered in partnership with the ANRS Industry Parks Development Corporation.", image: airportImg },
  { id: "capacity-building", icon: <GraduationCap size={32} />, title: "Capacity Building & Training", desc: "Road sector capacity building activities including device operator training and other related training programs, formulated and implemented upon approval of the managing board.", image: equipmentImg },
];

const Services = () => (
  <main>
    <PageHero title="Our Services" subtitle="Comprehensive construction solutions for Ethiopia's infrastructure needs" image={roadImg} />

    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-20">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Duties & Responsibilities</span>
          <h2 className="section-title mt-3">End-to-End Infrastructure Solutions</h2>
          <p className="section-subtitle mx-auto mt-4">As a GC-1 rated general contractor, Hibir Construction Corporation delivers complete infrastructure solutions from material production to project completion</p>
        </AnimatedSection>

        <div className="space-y-20">
          {services.map((s, i) => (
            <AnimatedSection key={i}>
              <div id={s.id} className={`scroll-mt-28 grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                    {s.icon}
                  </div>
                  <h3 className="font-display font-bold text-2xl mb-4 text-foreground">{s.title}</h3>
                  <p className="text-muted-foreground font-body leading-relaxed">{s.desc}</p>
                </div>
                <div className={`relative overflow-hidden rounded-2xl ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="absolute -inset-2 rounded-3xl bg-accent/5 blur-xl" />
                  <img src={s.image} alt={s.title} className="relative w-full h-72 object-cover rounded-2xl hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default Services;
