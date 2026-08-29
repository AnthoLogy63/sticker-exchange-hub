import { createFileRoute } from "@tanstack/react-router";
import { Screen } from "@/components/cruce/Screen";
import { BadgeCard } from "@/components/cruce/BadgeCard";
import { StickerCard } from "@/components/cruce/StickerCard";
import { badges, profile, stickers } from "@/lib/cruce-data";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — CR×CE" },
      {
        name: "description",
        content: "Tu identidad en CR×CE: eventos asistidos, insignias y stickers destacados.",
      },
      { property: "og:title", content: "Perfil — CR×CE" },
      { property: "og:description", content: "Eventos, insignias y stickers destacados." },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  const featured = [...stickers]
    .sort((a, b) => rarityRank(b.rarity) - rarityRank(a.rarity))
    .slice(0, 4);

  return (
    <Screen>
      <div className="flex flex-col items-center text-center">
        <div className="flex size-20 items-center justify-center rounded-full border border-border bg-surface text-lg font-semibold text-primary">
          {profile.initials}
        </div>
        <h1 className="mt-5 text-2xl font-semibold">{profile.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{profile.handle}</p>

        <div className="mt-6 flex items-center gap-10">
          <Stat value={profile.events} label="Eventos" />
          <Stat value={badges.length} label="Insignias" />
          <Stat value={profile.stickers} label="Stickers" />
        </div>
      </div>

      <div className="my-10 h-px bg-border" />

      <section>
        <h2 className="text-eyebrow">Insignias</h2>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {badges.map((b) => (
            <BadgeCard key={b.id} badge={b} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-eyebrow">Stickers destacados</h2>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {featured.map((s) => (
            <StickerCard key={s.id} sticker={s} showCount={false} />
          ))}
        </div>
      </section>
    </Screen>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-display text-xl font-semibold">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function rarityRank(r: string) {
  return ["normal", "raro", "epico", "mitico", "legendario"].indexOf(r);
}
