import type { Badge } from "@/lib/cruce-data";

export function BadgeCard({ badge, onClick }: { badge: Badge; onClick?: () => void }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className="w-full rounded-2xl border border-border bg-surface px-3 py-4 text-center transition-colors hover:border-primary/40"
    >
      <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-border bg-surface-2 text-lg text-primary">
        {badge.emoji}
      </div>
      <p className="mt-3 truncate text-xs font-medium text-foreground">{badge.event}</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{badge.date}</p>
    </Tag>
  );
}
