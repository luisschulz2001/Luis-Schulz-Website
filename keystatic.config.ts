import { config, fields, singleton, collection } from "@keystatic/core";

/**
 * Keystatic CMS – Inhalte pflegen unter /keystatic
 *
 * Lokal (npm run dev) werden Änderungen direkt in die Dateien unter /content geschrieben.
 * Online (Vercel) läuft Keystatic im GitHub-Modus: jede Änderung wird als Commit
 * im Repository gespeichert und Vercel veröffentlicht die Seite automatisch neu.
 * Siehe README.md → "Inhalte online bearbeiten".
 */
const storage =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github"
    ? ({
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_KEYSTATIC_REPO_OWNER ?? "luisschulz2001",
          name: process.env.NEXT_PUBLIC_KEYSTATIC_REPO_NAME ?? "Luis-Schulz-Website",
        },
      } as const)
    : ({ kind: "local" } as const);

const locales = [
  { code: "de", label: "Deutsch" },
  { code: "en", label: "English" },
] as const;

const longText = (label: string, description?: string) =>
  fields.text({
    label,
    multiline: true,
    description:
      description ??
      "Leerzeile = neuer Absatz · Zeile mit „## “ = Zwischenüberschrift · Zeile mit „- “ = Aufzählung",
  });

const seo = fields.object(
  {
    title: fields.text({ label: "Seitentitel (Google)" }),
    description: fields.text({ label: "Beschreibung (Google)", multiline: true }),
  },
  { label: "SEO" },
);

const heroImage = (dir: string) =>
  fields.image({
    label: "Bild",
    directory: `public/images/${dir}`,
    publicPath: `/images/${dir}/`,
  });

/* ---------- Seiten je Sprache ---------- */

function pages(code: string, label: string) {
  const p = (key: string) => `content/${code}/${key}`;
  return {
    [`home_${code}`]: singleton({
      label: `Startseite (${label})`,
      path: p("home"),
      format: { data: "json" },
      schema: {
        seo,
        heroEyebrow: fields.text({ label: "Hero – kleine Zeile über der Überschrift" }),
        heroTitle: fields.text({ label: "Hero – Überschrift" }),
        heroText: fields.text({ label: "Hero – Text", multiline: true }),
        heroImage: heroImage("home"),
        introTitle: fields.text({ label: "Intro – Überschrift" }),
        introText: longText("Intro – Text"),
        pillars: fields.array(
          fields.object({
            title: fields.text({ label: "Titel" }),
            text: fields.text({ label: "Text", multiline: true }),
            href: fields.select({
              label: "Verlinkt auf",
              options: [
                { label: "Über mich", value: "about" },
                { label: "Rennen", value: "races" },
                { label: "Coaching", value: "coaching" },
                { label: "Partner", value: "partners" },
                { label: "Kontakt", value: "contact" },
              ],
              defaultValue: "about",
            }),
          }),
          { label: "Drei Säulen", itemLabel: (i) => i.fields.title.value || "Säule" },
        ),
        quote: fields.text({ label: "Zitat / Leitsatz", multiline: true }),
        quoteAuthor: fields.text({ label: "Zitat – von" }),
        ctaTitle: fields.text({ label: "Abschluss – Überschrift" }),
        ctaText: fields.text({ label: "Abschluss – Text", multiline: true }),
      },
    }),
    [`about_${code}`]: singleton({
      label: `Über mich (${label})`,
      path: p("about"),
      format: { data: "json" },
      schema: {
        seo,
        title: fields.text({ label: "Überschrift" }),
        lead: fields.text({ label: "Einleitung", multiline: true }),
        image: heroImage("about"),
        body: longText("Text"),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: "Bild",
              directory: "public/images/about/gallery",
              publicPath: "/images/about/gallery/",
            }),
            alt: fields.text({ label: "Bildbeschreibung (für Barrierefreiheit & Google)" }),
          }),
          { label: "Bildergalerie", itemLabel: (i) => i.fields.alt.value || "Bild" },
        ),
        facts: fields.array(
          fields.object({
            label: fields.text({ label: "Bezeichnung" }),
            value: fields.text({ label: "Wert" }),
          }),
          { label: "Steckbrief", itemLabel: (i) => i.fields.label.value || "Fakt" },
        ),
        timeline: fields.array(
          fields.object({
            year: fields.text({ label: "Jahr" }),
            title: fields.text({ label: "Titel" }),
            text: fields.text({ label: "Text", multiline: true }),
          }),
          {
            label: "Werdegang / Meilensteine",
            itemLabel: (i) => `${i.fields.year.value} – ${i.fields.title.value}`,
          },
        ),
      },
    }),
    [`races_${code}`]: singleton({
      label: `Rennen – Seitentexte (${label})`,
      path: p("races"),
      format: { data: "json" },
      schema: {
        seo,
        title: fields.text({ label: "Überschrift" }),
        lead: fields.text({ label: "Einleitung", multiline: true }),
      },
    }),
    [`coaching_${code}`]: singleton({
      label: `Coaching (${label})`,
      path: p("coaching"),
      format: { data: "json" },
      schema: {
        seo,
        title: fields.text({ label: "Überschrift" }),
        lead: fields.text({ label: "Einleitung", multiline: true }),
        image: heroImage("coaching"),
        imageCaption: fields.text({ label: "Bildunterschrift" }),
        offer: fields.object(
          {
            title: fields.text({ label: "Name des Angebots" }),
            audience: fields.text({ label: "Für wen?" }),
            text: fields.text({ label: "Beschreibung", multiline: true }),
            highlights: fields.array(
              fields.object({
                value: fields.text({ label: "Kennzahl (z. B. „< 3 h“)" }),
                label: fields.text({ label: "Beschreibung (z. B. „Reaktionszeit“)" }),
              }),
              { label: "Kernversprechen (groß hervorgehoben)", itemLabel: (i) => `${i.fields.value.value} – ${i.fields.label.value}` },
            ),
            features: fields.array(fields.text({ label: "Leistung" }), {
              label: "Leistungen",
              itemLabel: (i) => i.value,
            }),
            price: fields.text({ label: "Preis (z. B. „ab 249 € / Monat“ oder „auf Anfrage“)" }),
            note: fields.text({ label: "Hinweis (z. B. „Begrenzte Plätze“) – optional" }),
          },
          { label: "Coaching-Angebot" },
        ),
        philosophyTitle: fields.text({ label: "Trainingsphilosophie – Überschrift" }),
        philosophyText: longText("Trainingsphilosophie – Text"),
        philosophyQuote: fields.text({ label: "Trainingsphilosophie – Leitsatz", multiline: true }),
        processTitle: fields.text({ label: "Ablauf – Überschrift" }),
        process: fields.array(
          fields.object({
            title: fields.text({ label: "Schritt" }),
            text: fields.text({ label: "Text", multiline: true }),
          }),
          { label: "Ablauf", itemLabel: (i) => i.fields.title.value || "Schritt" },
        ),
        faq: fields.array(
          fields.object({
            question: fields.text({ label: "Frage" }),
            answer: fields.text({ label: "Antwort", multiline: true }),
          }),
          { label: "Häufige Fragen", itemLabel: (i) => i.fields.question.value || "Frage" },
        ),
      },
    }),
    [`partners_${code}`]: singleton({
      label: `Partner & Sponsoren – Seitentexte (${label})`,
      path: p("partners"),
      format: { data: "json" },
      schema: {
        seo,
        title: fields.text({ label: "Überschrift" }),
        lead: fields.text({ label: "Einleitung", multiline: true }),
        image: heroImage("partners-page"),
        benefitsTitle: fields.text({ label: "Vorteile – Überschrift" }),
        benefits: fields.array(
          fields.object({
            title: fields.text({ label: "Titel" }),
            text: fields.text({ label: "Text", multiline: true }),
          }),
          { label: "Vorteile für Partner", itemLabel: (i) => i.fields.title.value || "Vorteil" },
        ),
        ctaTitle: fields.text({ label: "Anfrage – Überschrift" }),
        ctaText: fields.text({ label: "Anfrage – Text", multiline: true }),
      },
    }),
    [`contact_${code}`]: singleton({
      label: `Kontakt (${label})`,
      path: p("contact"),
      format: { data: "json" },
      schema: {
        seo,
        title: fields.text({ label: "Überschrift" }),
        lead: fields.text({ label: "Einleitung", multiline: true }),
        bookingTitle: fields.text({ label: "Terminbuchung – Überschrift" }),
        bookingText: fields.text({ label: "Terminbuchung – Text", multiline: true }),
      },
    }),
    [`legal_${code}`]: singleton({
      label: `Impressum & Datenschutz (${label})`,
      path: p("legal"),
      format: { data: "json" },
      schema: {
        imprint: longText("Impressum"),
        privacy: longText("Datenschutzerklärung"),
      },
    }),
  };
}

const localizedPages = Object.assign({}, ...locales.map((l) => pages(l.code, l.label)));

export default config({
  storage,
  ui: {
    brand: { name: "Luis Schulz – Website" },
    navigation: {
      Allgemein: ["settings"],
      "Rennen, Partner & Stimmen": ["races", "partners", "testimonials"],
      "Seiten – Deutsch": Object.keys(pages("de", "")),
      "Pages – English": Object.keys(pages("en", "")),
    },
  },
  singletons: {
    settings: singleton({
      label: "Einstellungen & Kontaktdaten",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Name" }),
        businessName: fields.text({ label: "Name des Gewerbes", description: "Erscheint im Footer und im Impressum" }),
        role_de: fields.text({ label: "Rolle (Deutsch), z. B. „Pro-Triathlet & Coach“" }),
        role_en: fields.text({ label: "Rolle (Englisch)" }),
        location: fields.text({ label: "Ort" }),
        emails: fields.object(
          {
            general: fields.text({ label: "Allgemein (z. B. info@)" }),
            coaching: fields.text({ label: "Coaching (z. B. coaching@)" }),
            partners: fields.text({ label: "Partner & Sponsoring (z. B. management@)" }),
            press: fields.text({ label: "Presse (z. B. presse@)" }),
          },
          { label: "Öffentliche E-Mail-Adressen" },
        ),
        bookingUrl: fields.url({
          label: "Link zur Terminbuchung (Cal.com / Calendly)",
          description: "z. B. https://cal.com/luis-schulz/erstgespraech",
        }),
        social: fields.object(
          {
            instagram: fields.url({ label: "Instagram" }),
            strava: fields.url({ label: "Strava" }),
            youtube: fields.url({ label: "YouTube" }),
            linkedin: fields.url({ label: "LinkedIn" }),
          },
          { label: "Social Media" },
        ),
      },
    }),
    ...localizedPages,
  },
  collections: {
    races: collection({
      label: "Rennen & Ergebnisse",
      path: "content/races/*",
      slugField: "name",
      format: { data: "json" },
      columns: ["name", "date"],
      schema: {
        name: fields.slug({ name: { label: "Rennen" } }),
        date: fields.date({ label: "Datum", validation: { isRequired: true } }),
        location: fields.text({ label: "Ort" }),
        distance: fields.select({
          label: "Distanz",
          options: [
            { label: "Sprint", value: "sprint" },
            { label: "Olympisch", value: "olympic" },
            { label: "Mitteldistanz / 70.3", value: "middle" },
            { label: "Langdistanz / Ironman", value: "long" },
            { label: "Sonstige", value: "other" },
          ],
          defaultValue: "middle",
        }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Geplant", value: "upcoming" },
            { label: "Absolviert", value: "completed" },
          ],
          defaultValue: "upcoming",
        }),
        placement: fields.text({ label: "Platzierung (z. B. „3.“ oder „1. AK 25–29“)" }),
        time: fields.text({ label: "Zeit (z. B. 4:12:35)" }),
        note_de: fields.text({ label: "Notiz (Deutsch)", multiline: true }),
        note_en: fields.text({ label: "Notiz (Englisch)", multiline: true }),
        link: fields.url({ label: "Link (Ergebnisse / Bericht)" }),
      },
    }),
    partners: collection({
      label: "Partner & Sponsoren",
      path: "content/partners/*",
      slugField: "name",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        logo: fields.image({
          label: "Logo",
          directory: "public/images/partners",
          publicPath: "/images/partners/",
        }),
        url: fields.url({ label: "Website" }),
        order: fields.integer({ label: "Reihenfolge", defaultValue: 10 }),
      },
    }),
    testimonials: collection({
      label: "Stimmen / Referenzen",
      path: "content/testimonials/*",
      slugField: "name",
      format: { data: "json" },
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        role_de: fields.text({ label: "Beschreibung (Deutsch), z. B. „Age-Grouper, Ironman 70.3“" }),
        role_en: fields.text({ label: "Beschreibung (Englisch)" }),
        quote_de: fields.text({ label: "Zitat (Deutsch)", multiline: true }),
        quote_en: fields.text({ label: "Zitat (Englisch)", multiline: true }),
        order: fields.integer({ label: "Reihenfolge", defaultValue: 10 }),
      },
    }),
  },
});
