import { rarityColorVar, rarityLabel, type Sticker } from "@/lib/cruce-data";

export function StickerCard({
  sticker,
  selected = false,
  onClick,
  showCount = true,
  glow = false,
}: {
  sticker: Sticker;
  selected?: boolean;
  onClick?: () => void;
  showCount?: boolean;
  glow?: boolean;
}) {
  const color = rarityColorVar[sticker.rarity];
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      onClick={onClick}
      type={onClick ? "button" : undefined}
      className="relative block w-full rounded-2xl border bg-surface p-3 text-left transition-transform duration-200 active:scale-[0.97]"
      style={{
        borderColor: selected ? "var(--color-primary)" : color,
        boxShadow: glow
          ? `0 0 32px -6px ${color}`
          : selected
            ? "0 0 0 1px var(--color-primary)"
            : undefined,
      }}
    >
      <div
        className="flex aspect-square items-center justify-center rounded-xl bg-surface-2 text-3xl"
        style={{ boxShadow: `inset 0 -28px 40px -30px ${color}` }}
      >
        <span>{sticker.emoji}</span>
      </div>
      <p className="mt-2 truncate text-xs font-medium text-foreground">{sticker.name}</p>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color }}>
          {rarityLabel[sticker.rarity]}
        </span>
        {showCount && sticker.count > 1 ? (
          <span className="text-[10px] text-muted-foreground">×{sticker.count}</span>
        ) : null}
      </div>
    </Tag>
  );
}
