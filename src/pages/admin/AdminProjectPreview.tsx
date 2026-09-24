import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getAdminProjectById, type AdminProject } from "@/services/projectService";
import ProjectGallery from "@/components/projects/ProjectGallery";

/** Authenticated preview: it reads the admin record directly and never changes status. */
export default function AdminProjectPreview() {
  const { id = "" } = useParams(); const [project, setProject] = useState<AdminProject | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { void getAdminProjectById(id).then(setProject).finally(() => setLoading(false)); }, [id]);
  if (loading) return <div className="grid min-h-64 place-items-center"><Loader2 className="animate-spin text-accent" aria-label="Loading preview"/></div>;
  if (!project) return <div className="surface-card p-8"><p>Project preview is unavailable.</p><Button asChild className="mt-4"><Link to="/admin/projects">Back to Projects</Link></Button></div>;
  const title = project.seo_title || project.title; const description = project.seo_description || project.description || "Project description is not yet available.";
  const gallery = project.images.map((image) => ({ url: image.image_url, alt: image.alt_text || `${project.title} project image`, ...(image.caption ? { caption: image.caption } : {}) }));
  return <main className="space-y-6"><Seo title={`${title} | Preview`} description={description} path={`/admin/projects/${project.id}/preview`} image={project.cover_image ?? gallery[0]?.url} noindex/><div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-accent/40 bg-accent/10 p-4"><strong className="text-sm tracking-wide">PREVIEW — NOT PUBLISHED</strong><Button asChild variant="outline"><Link to={`/admin/projects/${project.id}/edit`}><ArrowLeft size={16}/>Back to editor</Link></Button></div><article className="overflow-hidden rounded-xl border bg-card">{project.cover_image && <img src={project.cover_image} alt={project.title} className="aspect-[16/7] w-full object-cover"/>}<div className="space-y-6 p-6 md:p-10"><p className="label-eyebrow">{project.category ?? "Project"} · {project.project_status ?? "Status not set"}</p><h1 className="font-display text-4xl font-semibold">{project.title || "Untitled project"}</h1><p className="max-w-3xl whitespace-pre-wrap leading-relaxed text-muted-foreground">{project.description || "No description has been added."}</p><dl className="grid gap-4 sm:grid-cols-2"><div><dt className="text-xs uppercase text-muted-foreground">Location</dt><dd>{project.location || "Not specified"}</dd></div><div><dt className="text-xs uppercase text-muted-foreground">Client</dt><dd>{project.client || "Not specified"}</dd></div></dl>{gallery.length > 0 && <section><h2 className="font-display text-2xl font-semibold">Project gallery</h2><div className="mt-4"><ProjectGallery images={gallery}/></div></section>}</div></article></main>;
}
