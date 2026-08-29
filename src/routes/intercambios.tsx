import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, ArrowRight, Check } from "lucide-react";
import { Screen } from "@/components/cruce/Screen";
import { StickerCard } from "@/components/cruce/StickerCard";
import { partnerStickers, profile, stickers } from "@/lib/cruce-data";

export const Route = createFileRoute("/intercambios")({
  head: () => ({
    meta: [
      { title: "Intercambios — CRUCE" },
      {
        name: "description",
        content: "Muestra tu QR, conéctate en persona e intercambia stickers cara a cara.",
      },
      { property: "og:title", content: "Intercambios — CRUCE" },
      { property: "og:description", content: "Intercambia stickers en persona durante el evento." },
    ],
  }),
  component: IntercambiosPage,
});

type Step = "qr" | "select" | "confirm" | "done";

function IntercambiosPage() {
  const [step, setStep] = useState<Step>("qr");
  const [give, setGive] = useState<string[]>([]);
  const [receive, setReceive] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, id: string) =>
    set(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  if (step === "qr") {
    return (
      <Screen title="Intercambio">
        <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
          <div className="relative flex size-56 items-center justify-center rounded-3xl border border-border bg-surface">
            <div className="absolute inset-0 rounded-3xl border border-primary/30 animate-pulse-ring" />
            <QrCode className="size-24 text-foreground" strokeWidth={1} />
          </div>
          <p className="mt-8 text-sm text-foreground">Muestra este código</p>
          <p className="mt-1 text-xs text-muted-foreground">a la otra persona</p>
          <p className="mt-8 text-xs text-primary">Esperando…</p>
          <button
            type="button"
            onClick={() => setStep("select")}
            className="mt-10 w-full rounded-2xl border border-border bg-surface py-4 text-sm font-medium"
          >
            Simular conexión
          </button>
        </div>
      </Screen>
    );
  }

  if (step === "done") {
    return (
      <Screen title="Intercambio">
        <div className="flex min-h-[65vh] flex-col items-center justify-center text-center">
          <div className="animate-reveal flex size-16 items-center justify-center rounded-full border border-success/40 bg-surface">
            <Check className="size-7 text-success" />
          </div>
          <h2 className="mt-6 text-xl font-semibold">Intercambio realizado</h2>
          <p className="mt-2 text-xs text-muted-foreground">Tu inventario se ha actualizado.</p>
          <button
            type="button"
            onClick={() => {
              setStep("qr");
              setGive([]);
              setReceive([]);
            }}
            className="mt-10 w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground"
          >
            Nuevo intercambio
          </button>
        </div>
      </Screen>
    );
  }

  const giving = stickers.filter((s) => give.includes(s.id));
  const receiving = partnerStickers.filter((s) => receive.includes(s.id));

  if (step === "confirm") {
    return (
      <Screen title="Confirmación">
        <div className="grid grid-cols-2 gap-4">
          <Column title="Entregas" items={giving} />
          <Column title="Recibes" items={receiving} />
        </div>
        <button
          type="button"
          onClick={() => setStep("done")}
          className="mt-10 w-full rounded-2xl bg-primary py-5 text-sm font-semibold text-primary-foreground"
        >
          Confirmar intercambio
        </button>
        <button
          type="button"
          onClick={() => setStep("select")}
          className="mt-3 w-full text-center text-xs text-muted-foreground"
        >
          Volver a editar
        </button>
      </Screen>
    );
  }

  return (
    <Screen title="Intercambio">
      <div className="flex items-center justify-center gap-3 text-sm">
        <span className="font-medium">{profile.name.split(" ")[0]}</span>
        <ArrowRight className="size-4 text-primary" />
        <span className="font-medium">María</span>
      </div>

      <section className="mt-8">
        <h2 className="text-eyebrow">Tú ofreces</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {stickers.slice(0, 6).map((s) => (
            <StickerCard
              key={s.id}
              sticker={s}
              selected={give.includes(s.id)}
              onClick={() => toggle(give, setGive, s.id)}
            />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-eyebrow">Recibes</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {partnerStickers.map((s) => (
            <StickerCard
              key={s.id}
              sticker={s}
              selected={receive.includes(s.id)}
              onClick={() => toggle(receive, setReceive, s.id)}
            />
          ))}
        </div>
      </section>

      <button
        type="button"
        disabled={give.length === 0 || receive.length === 0}
        onClick={() => setStep("confirm")}
        className="mt-10 w-full rounded-2xl bg-primary py-5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
      >
        Continuar
      </button>
    </Screen>
  );
}

function Column({ title, items }: { title: string; items: typeof stickers }) {
  return (
    <div>
      <h2 className="text-eyebrow text-center">{title}</h2>
      <div className="mt-3 space-y-3">
        {items.map((s) => (
          <StickerCard key={s.id} sticker={s} showCount={false} />
        ))}
      </div>
    </div>
  );
}
