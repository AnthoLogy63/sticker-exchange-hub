import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Screen } from "@/components/cruce/Screen";
import { StickerCard } from "@/components/cruce/StickerCard";
import { openPack, packs as initialPacks, rarityColorVar, type Pack, type Sticker } from "@/lib/cruce-data";

export const Route = createFileRoute("/sobres")({
  head: () => ({
    meta: [
      { title: "Sobres — CRUCE" },
      {
        name: "description",
        content: "Abre tus sobres y descubre los stickers uno a uno con su rareza.",
      },
      { property: "og:title", content: "Sobres — CRUCE" },
      { property: "og:description", content: "El momento coleccionable de CRUCE." },
    ],
  }),
  component: SobresPage,
});

type Phase = "list" | "ready" | "opening" | "result";

function SobresPage() {
  const [packs, setPacks] = useState<Pack[]>(initialPacks);
  const [active, setActive] = useState<Pack | null>(null);
  const [phase, setPhase] = useState<Phase>("list");
  const [revealed, setRevealed] = useState<Sticker[]>([]);
  const [index, setIndex] = useState(0);

  function selectPack(pack: Pack) {
    setActive(pack);
    setPhase("ready");
  }

  function open() {
    if (!active) return;
    setRevealed(openPack(active.size));
    setIndex(0);
    setPhase("opening");
  }

  function next() {
    if (index < revealed.length - 1) {
      setIndex((i) => i + 1);
    } else {
      setPacks((p) => p.filter((x) => x.id !== active?.id));
      setPhase("result");
    }
  }

  if (phase === "opening") {
    const s = revealed[index];
    const color = rarityColorVar[s.rarity];
    return (
      <Screen>
        <button
          type="button"
          onClick={next}
          className="flex min-h-[80vh] w-full flex-col items-center justify-center"
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-1/4 h-64 blur-3xl"
            style={{ background: `radial-gradient(circle, ${color}, transparent 70%)`, opacity: 0.35 }}
          />
          <p className="text-eyebrow relative">
            {index + 1} / {revealed.length}
          </p>
          <div key={s.id} className="animate-reveal relative mt-8 w-48">
            <StickerCard sticker={s} showCount={false} glow />
          </div>
          <p className="relative mt-10 text-xs text-muted-foreground">Toca para continuar</p>
        </button>
      </Screen>
    );
  }

  if (phase === "result") {
    return (
      <Screen title="Sobre abierto">
        <div className="grid grid-cols-2 gap-3">
          {revealed.map((s, i) => (
            <div key={s.id} className="animate-reveal" style={{ animationDelay: `${i * 80}ms` }}>
              <StickerCard sticker={s} showCount={false} />
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Añadidos a tu colección.
        </p>
        <button
          type="button"
          onClick={() => {
            setPhase("list");
            setActive(null);
          }}
          className="mt-6 w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground"
        >
          Volver a sobres
        </button>
      </Screen>
    );
  }

  if (phase === "ready" && active) {
    return (
      <Screen title="Tu sobre">
        <div className="flex min-h-[65vh] flex-col items-center justify-center">
          <PackArt />
          <p className="mt-10 text-lg font-semibold">{active.event}</p>
          <p className="mt-1 text-xs text-muted-foreground">{active.size} stickers</p>
          <button
            type="button"
            onClick={open}
            className="mt-12 w-full rounded-2xl bg-primary py-5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
          >
            Abrir sobre
          </button>
          <button
            type="button"
            onClick={() => setPhase("list")}
            className="mt-3 text-xs text-muted-foreground"
          >
            Volver
          </button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen title="Sobres">
      {packs.length === 0 ? (
        <p className="mt-24 text-center text-sm text-muted-foreground">
          No tienes sobres disponibles. Asiste a un evento y escanea su QR.
        </p>
      ) : (
        <div className="space-y-3">
          {packs.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => selectPack(p)}
              className="flex w-full items-center gap-4 rounded-3xl border border-border bg-surface p-4 text-left transition-colors hover:border-primary/40"
            >
              <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-surface-2 text-primary">
                ✦
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{p.event}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.size} stickers · {p.obtainedAt}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Screen>
  );
}

function PackArt() {
  return (
    <div className="animate-float relative flex h-64 w-44 items-center justify-center rounded-3xl border border-border bg-surface">
      <div className="absolute inset-x-6 top-6 h-px bg-border" />
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_20%,color-mix(in_oklab,var(--color-primary)_22%,transparent),transparent_65%)]" />
      <span className="relative font-display text-2xl tracking-[0.3em] text-primary">CRUCE</span>
    </div>
  );
}
