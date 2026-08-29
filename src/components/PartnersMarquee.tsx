import { partners, type Partner } from "@/data/company";

interface Props {
  rows?: 1 | 2;
  className?: string;
}

const LogoTile = ({ p }: { p: Partner }) => (
  <div className="shrink-0 w-[220px] h-20 px-4 rounded-xl border border-border/60 bg-surface/60 backdrop-blur-sm flex items-center justify-center opacity-80 grayscale hover:opacity-100 hover:grayscale-0 hover:border-accent/50 transition-all duration-500">
    {p.logo ? (
      <img
        src={p.logo}
        alt={p.name}
        className="max-h-12 max-w-[180px] w-auto object-contain select-none"
        loading="lazy"
      />
    ) : (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-display font-bold text-sm text-foreground leading-tight">{p.short}</span>
        <span className="mt-1 text-[10px] font-body text-muted-foreground leading-tight line-clamp-2">{p.name}</span>
      </div>
    )}
  </div>
);

const Row = ({ items, reverse, duration }: { items: Partner[]; reverse?: boolean; duration: number }) => (
  <div className="group relative overflow-hidden">
    <div
      className="flex gap-5 w-max marquee-track group-hover:[animation-play-state:paused]"
      style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[...items, ...items].map((p, i) => (
        <LogoTile key={`${p.short}-${i}`} p={p} />
      ))}
    </div>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" aria-hidden />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" aria-hidden />
  </div>
);

/** Continuous, seamless partner logo marquee. Pauses on hover. */
const PartnersMarquee = ({ rows = 2, className = "" }: Props) => {
  const half = Math.ceil(partners.length / 2);
  return (
    <div className={`space-y-5 ${className}`}>
      {rows === 2 ? (
        <>
          <Row items={partners.slice(0, half)} duration={55} />
          <Row items={partners.slice(half)} duration={65} reverse />
        </>
      ) : (
        <Row items={partners} duration={70} />
      )}
    </div>
  );
};

export default PartnersMarquee;
