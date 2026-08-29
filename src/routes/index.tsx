import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, KeyRound, X, Check } from "lucide-react";
import { Screen } from "@/components/cruce/Screen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRUCE — Escanea para cruzar" },
      {
        name: "description",
        content:
          "Escanea el QR del evento, consigue tu insignia y recibe sobres de stickers coleccionables.",
      },
      { property: "og:title", content: "CRUCE — Escanea para cruzar" },
      {
        property: "og:description",
        content: "Asiste, escanea y colecciona stickers de los eventos donde estuviste.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<"idle" | "scan" | "code">("idle");
  const [code, setCode] = useState("");
  const [claimed, setClaimed] = useState(false);

  return (
    <Screen>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-eyebrow">CRUCE</p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight">
          Escanea
          <br />
          para cruzar
        </h1>

        <div className="relative mt-12">
          <div className="absolute inset-0 rounded-3xl border border-primary/40 animate-pulse-ring" />
          <div className="relative flex size-56 items-center justify-center rounded-3xl border border-border bg-surface">
            {mode === "scan" ? (
              <div className="text-center">
                <QrCode className="mx-auto size-14 text-primary animate-float" strokeWidth={1.25} />
                <p className="mt-3 text-xs text-muted-foreground">Buscando código…</p>
              </div>
            ) : claimed ? (
              <div className="text-center">
                <Check className="mx-auto size-12 text-success" strokeWidth={1.5} />
                <p className="mt-3 text-xs text-muted-foreground">Asistencia validada</p>
              </div>
            ) : (
              <QrCode className="size-14 text-muted-foreground" strokeWidth={1} />
            )}
          </div>
        </div>

        {mode === "code" ? (
          <form
            className="mt-12 w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (code.trim()) {
                setClaimed(true);
                setMode("idle");
                setCode("");
              }
            }}
          >
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="CÓDIGO SECRETO"
              className="w-full rounded-2xl border border-border bg-surface px-5 py-4 text-center text-sm tracking-[0.3em] outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <button
              type="submit"
              className="mt-3 w-full rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground"
            >
              Validar código
            </button>
            <button
              type="button"
              onClick={() => setMode("idle")}
              className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground"
            >
              <X className="size-3" /> Cancelar
            </button>
          </form>
        ) : (
          <div className="mt-12 w-full space-y-3">
            <button
              type="button"
              onClick={() => {
                setMode("scan");
                setClaimed(false);
                setTimeout(() => {
                  setMode("idle");
                  setClaimed(true);
                }, 1800);
              }}
              className="w-full rounded-2xl bg-primary py-5 text-sm font-semibold text-primary-foreground transition-transform active:scale-[0.98]"
            >
              Escanear QR del evento
            </button>
            <button
              type="button"
              onClick={() => setMode("code")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-5 text-sm font-medium text-foreground"
            >
              <KeyRound className="size-4" /> Ingresar código secreto
            </button>
          </div>
        )}

        {claimed ? (
          <div className="animate-reveal mt-8 w-full rounded-2xl border border-border bg-surface p-5 text-left">
            <p className="text-eyebrow">The Next Craft</p>
            <p className="mt-2 text-sm text-foreground">
              Insignia obtenida y <span className="text-primary">1 sobre</span> añadido a tu cuenta.
            </p>
          </div>
        ) : null}
      </div>
    </Screen>
  );
}
