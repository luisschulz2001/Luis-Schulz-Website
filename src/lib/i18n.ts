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
      talks: "Vorträge",
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
    progress: {
      eyebrow: "Entwicklung",
      title: "in einem Jahr",
      lead: "Nachhaltig besser werden heißt für mich: jedes Jahr ein Stück schneller, ohne den Körper zu verheizen.",
      swim: "Swim",
      bike: "Bike",
      run: "Run",
    },
    fit: {
      eyebrow: "Coaching-Check",
      title: "Passt das Coaching zu mir?",
      lead: "Vier kurze Fragen. Danach weißt Du, wie ich Dich unterstützen kann.",
      step: "Frage",
      of: "von",
      back: "Zurück",
      restart: "Neu starten",
      questions: [
        {
          key: "goal",
          label: "Was ist Dein Ziel?",
          options: ["Mein erster Triathlon", "Schneller werden", "Eine Langdistanz finishen", "Bestzeit auf der Langdistanz"],
        },
        {
          key: "experience",
          label: "Wie lange machst Du schon Ausdauersport?",
          options: ["Ich fange gerade an", "1 bis 3 Jahre", "Mehr als 3 Jahre"],
        },
        {
          key: "hours",
          label: "Wie viele Stunden pro Woche kannst Du trainieren?",
          options: ["Bis 6 Stunden", "6 bis 10 Stunden", "10 bis 15 Stunden", "Mehr als 15 Stunden"],
        },
        {
          key: "distance",
          label: "Welche Distanz reizt Dich am meisten?",
          options: ["Sprint oder Olympisch", "Mitteldistanz", "Langdistanz", "Noch offen"],
        },
      ],
      resultTitle: "Das passt gut zusammen.",
      resultBeginner:
        "Gerade am Anfang macht eine gute Begleitung den größten Unterschied. Wir bauen Dich Schritt für Schritt auf, ohne Dich zu überfordern.",
      resultTight:
        "Eine Langdistanz mit wenig Trainingszeit ist ambitioniert, aber mit kluger Planung machbar. Dann muss jede Einheit sitzen, und genau darum kümmere ich mich.",
      resultDefault:
        "Mit Deinen Voraussetzungen lässt sich einiges erreichen. Im Erstgespräch schauen wir gemeinsam, wie Dein Weg aussieht.",
      summary: "Deine Angaben",
      send: "Anfrage mit diesen Angaben senden",
      book: "Erstgespräch vereinbaren",
      messageIntro: "Hallo Luis, hier meine Angaben aus dem Coaching-Check:",
    },
    reports: {
      title: "Rennberichte",
      read: "Bericht lesen",
      link: "Rennbericht",
      back: "Alle Rennen & Berichte",
      fallback: "Diesen Bericht gibt es nur auf Deutsch.",
      result: "Ergebnis",
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
        talks: "Vortrag & Workshop",
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
      talks: "Talks",
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
    progress: {
      eyebrow: "Progress",
      title: "in one year",
      lead: "To me, sustainable progress means getting a little faster every year without burning out.",
      swim: "Swim",
      bike: "Bike",
      run: "Run",
    },
    fit: {
      eyebrow: "Coaching check",
      title: "Is the coaching right for me?",
      lead: "Four quick questions. Then you'll know how I can support you.",
      step: "Question",
      of: "of",
      back: "Back",
      restart: "Start again",
      questions: [
        {
          key: "goal",
          label: "What's your goal?",
          options: ["My first triathlon", "Getting faster", "Finishing a long distance", "A long-distance PB"],
        },
        {
          key: "experience",
          label: "How long have you been doing endurance sport?",
          options: ["I'm just starting", "1 to 3 years", "More than 3 years"],
        },
        {
          key: "hours",
          label: "How many hours per week can you train?",
          options: ["Up to 6 hours", "6 to 10 hours", "10 to 15 hours", "More than 15 hours"],
        },
        {
          key: "distance",
          label: "Which distance appeals to you most?",
          options: ["Sprint or Olympic", "Middle distance", "Long distance", "Not sure yet"],
        },
      ],
      resultTitle: "That's a good fit.",
      resultBeginner:
        "Especially at the start, good support makes the biggest difference. We'll build you up step by step without overloading you.",
      resultTight:
        "A long distance with limited training time is ambitious, but doable with smart planning. Every session has to count, and that's exactly what I take care of.",
      resultDefault:
        "With your background there's a lot we can achieve. In the intro call we'll work out together what your path looks like.",
      summary: "Your answers",
      send: "Send enquiry with these answers",
      book: "Book an intro call",
      messageIntro: "Hi Luis, here are my answers from the coaching check:",
    },
    reports: {
      title: "Race reports",
      read: "Read report",
      link: "Race report",
      back: "All races & reports",
      fallback: "This report is only available in German.",
      result: "Result",
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
        talks: "Talk & workshop",
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
  talks: "/talks",
  partners: "/partners",
  contact: "/contact",
  imprint: "/imprint",
  privacy: "/privacy",
} as const;

export const href = (locale: Locale, route: keyof typeof routes) => `/${locale}${routes[route]}`;

export const reportHref = (locale: Locale, slug: string) => `/${locale}/reports/${slug}`;

export function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
