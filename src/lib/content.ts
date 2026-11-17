import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n";

/**
 * Liest die Inhalte, die über Keystatic (/keystatic) gepflegt werden.
 * Die Dateien liegen als JSON unter /content und werden beim Build gelesen.
 */
const root = path.join(process.cwd(), "content");

function readJson<T>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(root, file), "utf-8")) as T;
}

function readCollection<T>(dir: string): (T & { slug: string })[] {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ ...readJson<T>(path.join(dir, f)), slug: f.replace(/\.json$/, "") }));
}

type Seo = { title: string; description: string };

export type Settings = {
  name: string;
  businessName: string;
  role_de: string;
  role_en: string;
  location: string;
  emails: { general: string; coaching: string; partners: string; press: string };
  bookingUrl: string | null;
  social: {
    instagram: string | null;
    strava: string | null;
    youtube: string | null;
    linkedin: string | null;
  };
};

export type PageKey = "home" | "about" | "races" | "coaching" | "talks" | "partners" | "contact";

export type HomeContent = {
  seo: Seo;
  heroEyebrow: string;
  heroTitle: string;
  heroText: string;
  heroImage: string | null;
  introTitle: string;
  introText: string;
  pillars: { title: string; text: string; href: PageKey }[];
  quote: string;
  quoteAuthor: string;
  ctaTitle: string;
  ctaText: string;
};

export type AboutContent = {
  seo: Seo;
  title: string;
  lead: string;
  image: string | null;
  body: string;
  gallery: { image: string | null; alt: string }[];
  facts: { label: string; value: string }[];
  timeline: { year: string; title: string; text: string }[];
};

export type RacesContent = { seo: Seo; title: string; lead: string };

export type CoachingContent = {
  seo: Seo;
  title: string;
  lead: string;
  image: string | null;
  imageCaption: string;
  offer: {
    title: string;
    audience: string;
    text: string;
    highlights: { value: string; label: string }[];
    features: string[];
    price: string;
    note: string;
  };
  philosophyTitle: string;
  philosophyText: string;
  philosophyQuote: string;
  processTitle: string;
  process: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};

export type PartnersContent = {
  seo: Seo;
  title: string;
  lead: string;
  image: string | null;
  benefitsTitle: string;
  benefits: { title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
};

export type ContactContent = {
  seo: Seo;
  title: string;
  lead: string;
  bookingTitle: string;
  bookingText: string;
};

export type LegalContent = { imprint: string; privacy: string };

export type Race = {
  name: string;
  date: string;
  location: string;
  distance: "sprint" | "olympic" | "middle" | "long" | "other";
  status: "upcoming" | "completed";
  placement: string;
  time: string;
  swim: string;
  bike: string;
  run: string;
  note_de: string;
  note_en: string;
  link: string | null;
};

export type TalksContent = {
  seo: Seo;
  title: string;
  lead: string;
  image: string | null;
  imageCaption: string;
  topicsTitle: string;
  topics: { title: string; text: string }[];
  formatsTitle: string;
  formats: { title: string; text: string }[];
  ctaTitle: string;
  ctaText: string;
};

export type Report = {
  title: string;
  published: boolean;
  date: string;
  race: string | null;
  cover: string | null;
  excerpt_de: string;
  body_de: string;
  title_en: string;
  excerpt_en: string;
  body_en: string;
};

export type Partner = { name: string; logo: string | null; url: string | null; order: number };

export type Testimonial = {
  name: string;
  role_de: string;
  role_en: string;
  quote_de: string;
  quote_en: string;
  order: number;
};

export const getSettings = () => readJson<Settings>("settings.json");
export const getHome = (l: Locale) => readJson<HomeContent>(`${l}/home.json`);
export const getAbout = (l: Locale) => readJson<AboutContent>(`${l}/about.json`);
export const getRacesPage = (l: Locale) => readJson<RacesContent>(`${l}/races.json`);
export const getCoaching = (l: Locale) => readJson<CoachingContent>(`${l}/coaching.json`);
export const getPartnersPage = (l: Locale) => readJson<PartnersContent>(`${l}/partners.json`);
export const getTalks = (l: Locale) => readJson<TalksContent>(`${l}/talks.json`);
export const getContact = (l: Locale) => readJson<ContactContent>(`${l}/contact.json`);
export const getLegal = (l: Locale) => readJson<LegalContent>(`${l}/legal.json`);

export function getRaces() {
  const races = readCollection<Race>("races");
  const upcoming = races
    .filter((r) => r.status === "upcoming")
    .sort((a, b) => a.date.localeCompare(b.date));
  const completed = races
    .filter((r) => r.status === "completed")
    .sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, completed };
}

export const getPartners = () =>
  readCollection<Partner>("partners").sort((a, b) => a.order - b.order);

export const getTestimonials = () =>
  readCollection<Testimonial>("testimonials").sort((a, b) => a.order - b.order);

/** Veröffentlichte Rennberichte, neueste zuerst */
export const getReports = () =>
  readCollection<Report>("reports")
    .filter((r) => r.published)
    .sort((a, b) => b.date.localeCompare(a.date));

/** Bericht in der gewünschten Sprache (Englisch fällt auf Deutsch zurück) */
export function localizeReport(r: Report & { slug: string }, l: Locale) {
  const en = l === "en" && r.body_en.trim().length > 0;
  return {
    slug: r.slug,
    date: r.date,
    race: r.race,
    cover: r.cover,
    title: en && r.title_en ? r.title_en : r.title,
    excerpt: en && r.excerpt_en ? r.excerpt_en : r.excerpt_de,
    body: en ? r.body_en : r.body_de,
    fallback: l === "en" && !en,
  };
}

/** Zeit "h:mm:ss" oder "h:mm" in Sekunden */
export function toSeconds(t: string): number | null {
  const parts = t.trim().split(":").map(Number);
  if (parts.length < 2 || parts.some((n) => Number.isNaN(n))) return null;
  const [h, m, sec = 0] = parts;
  return h * 3600 + m * 60 + sec;
}

/** Die beiden letzten Rennen mit vollständigen Splits – für die Entwicklungs-Grafik */
export function getProgress() {
  const withSplits = getRaces()
    .completed.filter((r) => [r.time, r.swim, r.bike, r.run].every((t) => t && toSeconds(t) !== null))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (withSplits.length < 2) return null;
  const [before, after] = withSplits.slice(-2);
  const seconds = (r: Race) => ({
    total: toSeconds(r.time)!,
    swim: toSeconds(r.swim)!,
    bike: toSeconds(r.bike)!,
    run: toSeconds(r.run)!,
  });
  return {
    before: { name: before.name, year: before.date.slice(0, 4), ...seconds(before) },
    after: { name: after.name, year: after.date.slice(0, 4), ...seconds(after) },
  };
}
