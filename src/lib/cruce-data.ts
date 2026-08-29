export type Rarity = "normal" | "raro" | "epico" | "mitico" | "legendario";

export const rarityLabel: Record<Rarity, string> = {
  normal: "Normal",
  raro: "Raro",
  epico: "Épico",
  mitico: "Mítico",
  legendario: "Legendario",
};

export const rarityColorVar: Record<Rarity, string> = {
  normal: "var(--rarity-common)",
  raro: "var(--rarity-rare)",
  epico: "var(--rarity-epic)",
  mitico: "var(--rarity-mythic)",
  legendario: "var(--rarity-legendary)",
};

export type Sticker = {
  id: string;
  name: string;
  event: string;
  rarity: Rarity;
  emoji: string;
  count: number;
};

export type Badge = {
  id: string;
  event: string;
  date: string;
  city: string;
  emoji: string;
};

export type Pack = {
  id: string;
  event: string;
  size: number;
  obtainedAt: string;
};

export const profile = {
  name: "Anthony Ajra",
  handle: "@anthony",
  initials: "AA",
  events: 12,
  stickers: 48,
};

export const badges: Badge[] = [
  { id: "b1", event: "The Next Craft", date: "12 Ago 2026", city: "Lima", emoji: "◆" },
  { id: "b2", event: "Dev Summit LATAM", date: "28 Jul 2026", city: "Bogotá", emoji: "▲" },
  { id: "b3", event: "Nocturna Tech", date: "03 Jul 2026", city: "Lima", emoji: "●" },
  { id: "b4", event: "Startup Weekend", date: "19 Jun 2026", city: "Arequipa", emoji: "■" },
];

export const stickers: Sticker[] = [
  { id: "s1", name: "Prototipo 01", event: "The Next Craft", rarity: "legendario", emoji: "🛠", count: 1 },
  { id: "s2", name: "Café de las 3am", event: "The Next Craft", rarity: "mitico", emoji: "☕", count: 2 },
  { id: "s3", name: "Deploy Viernes", event: "The Next Craft", rarity: "epico", emoji: "🚀", count: 1 },
  { id: "s4", name: "Pixel Perfecto", event: "The Next Craft", rarity: "raro", emoji: "▦", count: 3 },
  { id: "s5", name: "Badge Azul", event: "The Next Craft", rarity: "normal", emoji: "🎫", count: 5 },
  { id: "s6", name: "Merge Limpio", event: "The Next Craft", rarity: "normal", emoji: "⑃", count: 2 },
  { id: "s7", name: "Keynote", event: "Dev Summit LATAM", rarity: "epico", emoji: "🎤", count: 1 },
  { id: "s8", name: "Stack Overflow", event: "Dev Summit LATAM", rarity: "raro", emoji: "📚", count: 2 },
  { id: "s9", name: "Lanyard", event: "Dev Summit LATAM", rarity: "normal", emoji: "🪪", count: 4 },
  { id: "s10", name: "Luz Neón", event: "Nocturna Tech", rarity: "mitico", emoji: "✦", count: 1 },
  { id: "s11", name: "Set de DJ", event: "Nocturna Tech", rarity: "raro", emoji: "🎛", count: 1 },
  { id: "s12", name: "After Party", event: "Nocturna Tech", rarity: "normal", emoji: "🌙", count: 3 },
];

export const packs: Pack[] = [
  { id: "p1", event: "The Next Craft", size: 4, obtainedAt: "Hoy · 19:24" },
  { id: "p2", event: "Dev Summit LATAM", size: 4, obtainedAt: "Ayer · 21:10" },
];

export const partnerStickers: Sticker[] = [
  { id: "m1", name: "Soldadura", event: "The Next Craft", rarity: "legendario", emoji: "⚡", count: 1 },
  { id: "m2", name: "Mapa del Venue", event: "The Next Craft", rarity: "epico", emoji: "🗺", count: 1 },
  { id: "m3", name: "Sticker Rosa", event: "Nocturna Tech", rarity: "mitico", emoji: "🌸", count: 1 },
  { id: "m4", name: "Primer Commit", event: "Dev Summit LATAM", rarity: "raro", emoji: "◇", count: 2 },
  { id: "m5", name: "Vaso Reusable", event: "The Next Craft", rarity: "normal", emoji: "🥤", count: 3 },
];

const pool: Omit<Sticker, "count">[] = [
  { id: "n1", name: "Router Perdido", event: "The Next Craft", rarity: "normal", emoji: "📡" },
  { id: "n2", name: "Cinta Gaffer", event: "The Next Craft", rarity: "normal", emoji: "🩹" },
  { id: "n3", name: "Sesión Doble", event: "The Next Craft", rarity: "raro", emoji: "◈" },
  { id: "n4", name: "Modo Oscuro", event: "The Next Craft", rarity: "epico", emoji: "🌑" },
  { id: "n5", name: "Cruce Perfecto", event: "The Next Craft", rarity: "mitico", emoji: "✕" },
  { id: "n6", name: "Insignia Dorada", event: "The Next Craft", rarity: "legendario", emoji: "👑" },
];

export function openPack(size: number): Sticker[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, size).map((s, i) => ({ ...s, id: `${s.id}-${i}`, count: 1 }));
}

export function groupByEvent(list: Sticker[]) {
  return list.reduce<Record<string, Sticker[]>>((acc, s) => {
    (acc[s.event] ??= []).push(s);
    return acc;
  }, {});
}
