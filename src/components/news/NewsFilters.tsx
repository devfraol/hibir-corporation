import { Search } from "lucide-react";
import { NEWS_CATEGORIES, type NewsCategory } from "@/types/news";

interface Props {
  active: NewsCategory | "All";
  onChange: (c: NewsCategory | "All") => void;
  counts: Record<string, number>;
  total: number;
  search: string;
  onSearch: (v: string) => void;
}

const NewsFilters = ({ active, onChange, counts, total, search, onSearch }: Props) => (
  <div className="flex flex-col gap-6">
    <div className="relative max-w-md">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <label htmlFor="news-search" className="sr-only">
        Search news articles
      </label>
      <input
        id="news-search"
        type="search"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search the newsroom"
        className="w-full rounded-xl border border-border bg-surface pl-11 pr-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:border-accent/50 focus:outline-none transition-colors"
      />
    </div>

    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter news by category">
      {(["All", ...NEWS_CATEGORIES] as const).map((c) => {
        const count = c === "All" ? total : (counts[c] ?? 0);
        const isActive = active === c;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            aria-pressed={isActive}
            className={`px-4 py-2 rounded-lg text-xs font-body font-semibold tracking-[0.08em] uppercase transition-all duration-300 border ${
              isActive
                ? "bg-accent text-accent-foreground border-accent"
                : "border-border text-muted-foreground hover:text-foreground hover:border-accent/40"
            }`}
          >
            {c} <span className="opacity-60">({count})</span>
          </button>
        );
      })}
    </div>
  </div>
);

export default NewsFilters;
