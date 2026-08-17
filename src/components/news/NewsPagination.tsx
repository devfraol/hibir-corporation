import { Loader2, Plus } from "lucide-react";

interface Props {
  shown: number;
  total: number;
  loading?: boolean;
  onLoadMore: () => void;
}

const NewsPagination = ({ shown, total, loading = false, onLoadMore }: Props) => {
  const hasMore = shown < total;

  return (
    <div className="flex flex-col items-center gap-4 mt-16">
      <div
        className="h-px w-full max-w-xs"
        style={{ backgroundImage: "var(--gold-gradient)", opacity: 0.35 }}
        aria-hidden
      />
      <p className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground" aria-live="polite">
        Showing {shown} of {total} articles
      </p>
      {hasMore && (
        <button type="button" onClick={onLoadMore} disabled={loading} className="btn-outline-light text-sm px-7 py-3">
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Load more
        </button>
      )}
    </div>
  );
};

export default NewsPagination;
