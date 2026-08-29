import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Screen } from "@/components/cruce/Screen";
import { BadgeCard } from "@/components/cruce/BadgeCard";
import { StickerCard } from "@/components/cruce/StickerCard";
import {
  badges,
  groupByEvent,
  rarityColorVar,
  rarityLabel,
  stickers,
  type Badge,
  type Rarity,
  type Sticker,
} from "@/lib/cruce-data";

export const Route = createFileRoute("/coleccion")({
  head: () => ({
    meta: [
      { title: "Colección — CR×CE" },
      {
        name: "description",
        content: "Tu álbum de insignias de eventos y stickers coleccionables agrupados por evento.",
      },
      { property: "og:title", content: "Colección — CR×CE" },
      { property: "og:description", content: "Insignias permanentes y stickers por rareza." },
    ],
  }),
  component: ColeccionPage,
});

const filters: Array<Rarity | "todas"> = ["todas", "normal", "raro", "epico", "mitico", "legendario"];

function ColeccionPage() {
  const [rarity, setRarity] = useState<Rarity | "todas">("todas");
  const [detail, setDetail] = useState<Sticker | null>(null);
  const [badgeDetail, setBadgeDetail] = useState<Badge | null>(null);

  const grouped = useMemo(
    () => groupByEvent(rarity === "todas" ? stickers : stickers.filter((s) => s.rarity === rarity)),
    [rarity],
  );

  return (
    <Screen title="Colección">
      <section>
        <h2 className="text-eyebrow">Insignias</h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {badges.map((b) => (
            <BadgeCard key={b.id} badge={b} onClick={() => setBadgeDetail(b)} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-eyebrow">Stickers</h2>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setRarity(f)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                rarity === f
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-surface text-muted-foreground"
              }`}
            >
              {f === "todas" ? "Todas" : rarityLabel[f]}
            </button>
          ))}
        </div>

        {Object.entries(grouped).map(([event, list]) => (
          <div key={event} className="mt-8">
            <h3 className="text-sm font-semibold text-foreground">{event}</h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {list.map((s) => (
                <StickerCard key={s.id} sticker={s} onClick={() => setDetail(s)} />
              ))}
            </div>
          </div>
        ))}

        {Object.keys(grouped).length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Aún no tienes stickers de esta rareza.
          </p>
        ) : null}
      </section>

      {detail ? (
        <Overlay onClose={() => setDetail(null)}>
          <div className="mx-auto w-40">
            <StickerCard sticker={detail} showCount={false} glow />
          </div>
          <p className="mt-6 text-center text-lg font-semibold">{detail.name}</p>
          <p className="mt-1 text-center text-xs text-muted-foreground">{detail.event}</p>
          <div className="mt-6 flex items-center justify-center gap-6 text-center">
            <div>
              <p className="text-eyebrow">Rareza</p>
              <p className="mt-1 text-sm" style={{ color: rarityColorVar[detail.rarity] }}>
                {rarityLabel[detail.rarity]}
              </p>
            </div>
            <div>
              <p className="text-eyebrow">Cantidad</p>
              <p className="mt-1 text-sm">×{detail.count}</p>
            </div>
          </div>
        </Overlay>
      ) : null}

      {badgeDetail ? (
        <Overlay onClose={() => setBadgeDetail(null)}>
          <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-border bg-surface-2 text-2xl text-primary">
            {badgeDetail.emoji}
          </div>
          <p className="mt-6 text-center text-lg font-semibold">{badgeDetail.event}</p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            {badgeDetail.city} · {badgeDetail.date}
          </p>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Insignia permanente. Prueba de asistencia y no se puede intercambiar.
          </p>
        </Overlay>
      ) : null}
    </Screen>
  );
}

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-reveal w-full max-w-md rounded-t-3xl border border-border bg-surface p-6 pb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded-2xl border border-border py-3 text-sm text-muted-foreground"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
