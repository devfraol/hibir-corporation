import { ImagePlus, Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { validateImageFile } from "@/lib/newsEditor";
import { getNewsMedia, uploadNewsImage, type MediaAsset } from "@/services/newsService";

interface MediaPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (asset: MediaAsset | MediaAsset[]) => void;
  multiple?: boolean;
  getMedia?: () => Promise<MediaAsset[]>;
  uploadImage?: (folder: string, file: File) => Promise<string>;
  mediaLabel?: string;
}

/** Authenticated picker shared by News (single selection) and project galleries. */
export function MediaPicker({ open, onOpenChange, onSelect, multiple = false, getMedia = getNewsMedia, uploadImage = uploadNewsImage, mediaLabel = "News" }: MediaPickerProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [selected, setSelected] = useState<MediaAsset[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const load = async () => {
    setLoading(true);
    try { setAssets(await getMedia()); } catch { toast.error("Unable to load the media library."); } finally { setLoading(false); }
  };
  useEffect(() => { if (open) void load(); }, [open]);
  const visibleAssets = useMemo(() => assets.filter((asset) => asset.name.toLowerCase().includes(query.trim().toLowerCase())), [assets, query]);
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; event.target.value = "";
    if (!file) return;
    const issue = validateImageFile(file); if (issue) return toast.error(issue);
    setUploading(true);
    try { await uploadImage("library", file); toast.success("Image uploaded to the library."); await load(); } catch { toast.error("Image upload failed. Please try again."); } finally { setUploading(false); }
  };
  const toggle = (asset: MediaAsset) => setSelected((current) => multiple ? (current.some((item) => item.path === asset.path) ? current.filter((item) => item.path !== asset.path) : [...current, asset]) : [asset]);
  const choose = () => { if (!selected.length) return; onSelect(multiple ? selected : selected[0]); onOpenChange(false); setSelected([]); };
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
      <DialogHeader><DialogTitle>Choose from Media Library</DialogTitle><DialogDescription>Select one existing {mediaLabel} image, or upload a new one.</DialogDescription></DialogHeader>
      <div className="flex flex-wrap gap-3"><div className="relative min-w-52 flex-1"><Search className="absolute left-3 top-3 text-muted-foreground" size={16}/><Input aria-label="Search media" className="pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search filenames" /></div><label className="inline-flex cursor-pointer"><Button asChild disabled={uploading}><span className="gap-2"><ImagePlus size={16}/>{uploading ? "Uploading…" : "Upload image"}</span></Button><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={upload}/></label></div>
      {loading ? <div className="grid min-h-64 place-items-center"><Loader2 className="animate-spin text-accent" aria-label="Loading media" /></div> : visibleAssets.length === 0 ? <div className="rounded-lg border border-dashed p-12 text-center text-sm text-muted-foreground">{assets.length ? "No images match that search." : "No media uploaded yet. Upload an image to get started."}</div> : <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">{visibleAssets.map((asset) => { const isSelected = selected.some((item) => item.path === asset.path); return <button type="button" key={asset.path} aria-pressed={isSelected} onClick={() => toggle(asset)} className={`overflow-hidden rounded-xl border text-left transition hover:border-accent ${isSelected ? "border-accent ring-2 ring-accent" : "bg-background"}`}><img src={asset.publicUrl} alt="" className="aspect-square w-full object-cover" onError={(event) => { event.currentTarget.classList.add("hidden"); }} /><span className="block truncate p-2 text-xs font-medium">{asset.name}</span><span className="block px-2 pb-2 text-[11px] text-muted-foreground">{asset.createdAt ? new Date(asset.createdAt).toLocaleDateString() : "Date unavailable"}</span></button>; })}</div>}
      {selected.length > 0 && <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 p-3"><p className="truncate text-sm">Selected: <strong>{multiple ? `${selected.length} images` : selected[0].name}</strong></p><Button type="button" onClick={choose}>{multiple ? "Add selected images" : "Use This Image"}</Button></div>}
      <div className="flex justify-end"><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button></div>
    </DialogContent>
  </Dialog>;
}
