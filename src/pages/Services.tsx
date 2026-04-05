import { HardHat, Landmark, Wrench, Truck, Factory, Settings } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import roadImg from "@/assets/road-construction.jpg";
import bridgeImg from "@/assets/bridge-construction.jpg";
import heroImg from "@/assets/hero-construction.jpg";
import equipmentImg from "@/assets/equipment-fleet.jpg";
import airportImg from "@/assets/airport-project.jpg";
import safetyImg from "@/assets/safety-workers.jpg";

const services = [
  { icon: <HardHat size={32} />, title: "Road Construction", desc: "Design and construction of highways, urban roads, and rural access roads across Ethiopia's diverse terrain. We handle grading, paving, and finishing to international standards.", image: roadImg },
  { icon: <Landmark size={32} />, title: "Asphalt & Infrastructure Development", desc: "Full-service asphalt production and laying, including hot mix plants, surface dressing, and bituminous treatments for durable road surfaces.", image: heroImg },
  { icon: <Wrench size={32} />, title: "Bridge Construction", desc: "Engineering and construction of reinforced concrete bridges, culverts, and drainage structures that connect communities and withstand Ethiopia's varied climate.", image: bridgeImg },
  { icon: <Settings size={32} />, title: "Road Maintenance & Upgrading", desc: "Comprehensive rehabilitation, maintenance, and upgrading of existing road networks to extend service life and improve safety.", image: safetyImg },
  { icon: <Factory size={32} />, title: "Material Production & Supply", desc: "Production and supply of construction materials including crushed aggregate, asphalt, and concrete from our own plants and quarries.", image: airportImg },
  { icon: <Truck size={32} />, title: "Equipment Leasing", desc: "Leasing of heavy construction equipment including excavators, graders, loaders, and dump trucks to other contractors and organizations.", image: equipmentImg },
];

const Services = () => (
  <main>
    <PageHero title="Our Services" subtitle="Comprehensive construction solutions for Ethiopia's infrastructure needs" image={roadImg} />

    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection className="text-center mb-20">
          <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">What We Do</span>
          <h2 className="section-title mt-3">End-to-End Infrastructure Solutions</h2>
        </AnimatedSection>

        <div className="space-y-20">
          {services.map((s, i) => (
            <AnimatedSection key={i}>
              <div className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
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
