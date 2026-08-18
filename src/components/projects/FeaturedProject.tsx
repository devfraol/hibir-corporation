import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { formatBirr, type Project } from "@/data/projects";

const FeaturedProject = ({ project }: { project: Project }) => {
  const reduced = useReducedMotion();

  return (
    <section className="section-padding" aria-labelledby="featured-project-heading">
      <div className="container-custom">
        <span className="text-accent font-body font-semibold text-xs tracking-[0.2em] uppercase">Featured Project</span>

        <motion.article
          initial={reduced ? undefined : { opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-border group">
            <div className="aspect-[16/10]">
              <img
                src={project.featuredImage.url}
                alt={project.featuredImage.alt}
                className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden />
            <span className="absolute top-5 left-5 px-3 py-1 rounded-full text-[10px] font-body font-bold tracking-[0.18em] uppercase bg-accent text-accent-foreground">
              {project.status}
            </span>
          </div>

          <div className="lg:col-span-5">
            <h2 id="featured-project-heading" className="font-display font-bold text-foreground leading-[1.1] mb-5" style={{ fontSize: "clamp(1.6rem, 2.4vw + 0.6rem, 2.75rem)" }}>
              {project.title}
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed mb-8">{project.description}</p>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 mb-9">
              {[
                { l: "Client", v: project.client },
                { l: "Contract Value", v: formatBirr(project.contractValue) },
                { l: "Location", v: project.location },
                { l: "Status", v: project.status },
              ].map((f) => (
                <div key={f.l}>
                  <dt className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground">{f.l}</dt>
                  <dd className="font-display font-semibold text-foreground text-sm mt-1.5">{f.v}</dd>
                </div>
              ))}
            </dl>

            <Link to={`/projects/${project.slug}`} className="btn-accent text-sm">
              View Project Details <ArrowRight size={16} />
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default FeaturedProject;
