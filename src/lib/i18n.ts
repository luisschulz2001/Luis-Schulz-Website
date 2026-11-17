export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

/** Feste Oberflächentexte (Navigation, Formular, Buttons). Seiteninhalte kommen aus Keystatic. */
const dictionaries = {
  de: {
    nav: {
      about: "Über mich",
      races: "Rennen",
      coaching: "Coaching",
      partners: "Partner",
      contact: "Kontakt",
    },
    cta: {
      book: "Erstgespräch vereinbaren",
      contact: "Schreib mir",
      coaching: "Mein Coaching",
      partner: "Partner werden",
      more: "Mehr erfahren",
      allRaces: "Alle Rennen",
    },
    races: {
      upcoming: "Geplant",
      completed: "Gelaufen",
      noUpcoming: "Meine Rennplanung trage ich hier bald ein.",
      noCompleted: "Sobald die Saison losgeht, stehen hier meine Ergebnisse.",
      placement: "Ergebnis",
      time: "Zeit",
      report: "Ergebnisliste",
      distance: {
        sprint: "Sprint",
        olympic: "Olympisch",
        middle: "Mitteldistanz",
        long: "Langdistanz",
        other: "Sonstige",
      },
    },
    home: { upcomingTitle: "Meine nächsten Rennen", testimonialsTitle: "Das sagen meine Athleten" },
    about: { facts: "Kurz und knapp", timeline: "Mein Weg bisher" },
    coaching: { offer: "Mein Angebot", faq: "Häufige Fragen", included: "Enthalten" },
    partners: { current: "Die mich unterstützen", none: "Hier ist noch Platz für Dein Logo." },
    contact: {
      formTitle: "Deine Nachricht",
      directTitle: "Oder direkt per E-Mail",
      topic: "Anliegen",
      topics: {
        coaching: "Coaching",
        partners: "Partnerschaft & Sponsoring",
        press: "Presse & Medien",
        general: "Sonstiges",
      },
      name: "Name",
      email: "E-Mail",
      message: "Nachricht",
      consent:
        "Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden. Details in der",
      consentLink: "Datenschutzerklärung",
      submit: "Nachricht senden",
      sending: "Wird gesendet …",
      success: "Danke für Deine Nachricht! Ich melde mich bald bei Dir.",
      error: "Das hat leider nicht geklappt. Bitte schreib mir direkt eine E-Mail.",
      invalid: "Bitte füll alle Felder aus und bestätige den Datenschutzhinweis.",
      emailLabels: {
        general: "Allgemein",
        coaching: "Coaching",
        partners: "Partner & Sponsoring",
        press: "Presse",
      },
    },
    booking: {
      consentTitle: "Terminkalender laden",
      consentText:
        "Der Kalender wird von einem externen Anbieter bereitgestellt. Beim Laden werden Daten (z. B. Deine IP-Adresse) an diesen übertragen.",
      load: "Kalender anzeigen",
      openExternal: "In neuem Tab öffnen",
      missing: "Die Online-Terminbuchung kommt bald. Schreib mir bis dahin gern eine Nachricht.",
    },
    footer: { imprint: "Impressum", privacy: "Datenschutz", rights: "Alle Rechte vorbehalten." },
    legal: { imprint: "Impressum", privacy: "Datenschutzerklärung" },
    language: "English",
    menu: "Menü",
    close: "Schließen",
  },
  en: {
    nav: {
      about: "About",
      races: "Races",
      coaching: "Coaching",
      partners: "Partners",
      contact: "Contact",
    },
    cta: {
      book: "Book a free intro call",
      contact: "Write to me",
      coaching: "My coaching",
      partner: "Become a partner",
      more: "Learn more",
      allRaces: "All races",
    },
    races: {
      upcoming: "Planned",
      completed: "Done",
      noUpcoming: "I'll add my race schedule here soon.",
      noCompleted: "My results will appear here once the season starts.",
      placement: "Result",
      time: "Time",
      report: "Full results",
      distance: {
        sprint: "Sprint",
        olympic: "Olympic",
        middle: "Middle distance",
        long: "Long distance",
        other: "Other",
      },
    },
    home: { upcomingTitle: "My next races", testimonialsTitle: "What my athletes say" },
    about: { facts: "In short", timeline: "My journey so far" },
    coaching: { offer: "My offer", faq: "FAQ", included: "Included" },
    partners: { current: "Who supports me", none: "There's still room for your logo here." },
    contact: {
      formTitle: "Your message",
      directTitle: "Or email me directly",
      topic: "Topic",
      topics: {
        coaching: "Coaching",
        partners: "Partnership & sponsoring",
        press: "Press & media",
        general: "Other",
      },
      name: "Name",
      email: "Email",
      message: "Message",
      consent: "I agree that my details will be processed to handle my enquiry. See the",
      consentLink: "privacy policy",
      submit: "Send message",
      sending: "Sending …",
      success: "Thanks for your message! I'll get back to you soon.",
      error: "Something went wrong. Please send me an email directly.",
      invalid: "Please fill in all fields and accept the privacy notice.",
      emailLabels: {
        general: "General",
        coaching: "Coaching",
        partners: "Partnerships",
        press: "Press",
      },
    },
    booking: {
      consentTitle: "Load booking calendar",
      consentText:
        "The calendar is provided by an external service. Loading it transfers data (e.g. your IP address) to that provider.",
      load: "Show calendar",
      openExternal: "Open in new tab",
      missing: "Online booking is coming soon. Until then, feel free to send me a message.",
    },
    footer: { imprint: "Imprint", privacy: "Privacy", rights: "All rights reserved." },
    legal: { imprint: "Imprint", privacy: "Privacy policy" },
    language: "Deutsch",
    menu: "Menu",
    close: "Close",
  },
};

export type Dictionary = (typeof dictionaries)["de"];
export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export const routes = {
  home: "",
  about: "/about",
  races: "/races",
  coaching: "/coaching",
  partners: "/partners",
  contact: "/contact",
  imprint: "/imprint",
  privacy: "/privacy",
} as const;

export const href = (locale: Locale, route: keyof typeof routes) => `/${locale}${routes[route]}`;
