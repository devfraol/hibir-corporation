import { useLocation } from "react-router-dom";

export default function AdminPlaceholder() {
  const pathSegments = useLocation().pathname.split("/");
  const section = pathSegments[pathSegments.length - 1] || "section";
  return <section className="surface-card max-w-2xl p-8"><p className="label-eyebrow">Administrator workspace</p><h1 className="mt-3 text-3xl font-semibold capitalize">{section}</h1><p className="mt-4 leading-7 text-muted-foreground">This module is coming in the next phase. Content management is intentionally not enabled yet.</p></section>;
}
