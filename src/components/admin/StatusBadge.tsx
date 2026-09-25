import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  published: "border-success/30 bg-success/10 text-success",
  completed: "border-success/30 bg-success/10 text-success",
  draft: "border-border bg-muted text-muted-foreground",
  archived: "border-border bg-transparent text-muted-foreground line-through decoration-muted-foreground/40",
  ongoing: "border-accent/30 bg-accent/10 text-accent",
  in_progress: "border-accent/30 bg-accent/10 text-accent",
  planned: "border-primary/30 bg-primary/10 text-primary",
};

export const StatusBadge = ({ status, className }: { status: string | null | undefined; className?: string }) => {
  if (!status) return <span className="text-xs text-muted-foreground">—</span>;
  const label = status.replace(/_/g, " ");
  return <span className={cn("inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium capitalize", tones[status] ?? tones.draft, className)}>
    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />{label}
  </span>;
};
