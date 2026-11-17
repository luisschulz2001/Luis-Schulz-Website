# Website Luis Schulz – Profi-Triathlet & Coach

Zweisprachige Website (Deutsch / Englisch) mit selbst pflegbaren Inhalten.

**Stack:** Next.js 16 · Tailwind CSS 4 · Keystatic (CMS) · Resend (Kontaktformular) · Cal.com (Terminbuchung) · Hosting auf Vercel

## Seiten

| Pfad | Inhalt |
|---|---|
| `/de`, `/en` | Startseite |
| `/…/about` | Über mich: Werdegang, Steckbrief |
| `/…/races` | Saisonplanung & Ergebnisse |
| `/…/coaching` | Angebote, Ablauf, FAQ |
| `/…/partners` | Partner & Sponsoren |
| `/…/contact` | Kontaktformular (nach Anliegen sortiert) & Terminbuchung |
| `/…/imprint`, `/…/privacy` | Impressum & Datenschutz |
| `/keystatic` | **Inhalte bearbeiten** |

Wer `/` aufruft, wird je nach Browsersprache auf `/de` oder `/en` weitergeleitet.

## Lokal starten

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Inhalte bearbeiten: http://localhost:3000/keystatic

Lokal speichert Keystatic Änderungen direkt in den Ordnern `content/` und `public/images/`.
Danach committen und pushen; Vercel veröffentlicht die Seite automatisch.

## Inhalte pflegen

Alle Texte, Bilder, Rennen, Partner und Stimmen werden im CMS unter `/keystatic` gepflegt:

- **Einstellungen & Kontaktdaten:** Name, E-Mail-Adressen, Link zur Terminbuchung, Social Media
- **Rennen & Ergebnisse:** Status „Geplant“ oder „Absolviert“, Platzierung, Zeit
- **Partner & Sponsoren:** Logo, Website, Reihenfolge
- **Stimmen / Referenzen:** Zitate von Athleten
- **Seiten – Deutsch / Pages – English:** alle Seitentexte je Sprache

Längere Textfelder unterstützen eine einfache Formatierung:
Leerzeile = neuer Absatz · `## ` am Zeilenanfang = Zwischenüberschrift · `- ` = Aufzählung.

Platzhalter in `[eckigen Klammern]` und Einträge mit `[Beispiel]` vor dem Livegang ersetzen bzw. löschen.

## Veröffentlichen mit Vercel

1. Auf vercel.com mit GitHub anmelden → **Add New Project** → dieses Repository importieren (Framework: Next.js wird erkannt).
2. Unter **Settings → Environment Variables** die Werte aus `.env.example` eintragen (mindestens `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`).
3. Unter **Settings → Domains** die Domain hinzufügen (`luisschulz.de` und `www.luisschulz.de`).
4. Bei Strato im DNS die Einträge setzen, die Vercel anzeigt (A-Record für die Hauptdomain, CNAME für `www`).
   **MX-Einträge nicht ändern**, sonst funktionieren die E-Mail-Postfächer nicht mehr.

## Kontaktformular (Resend)

1. Konto bei resend.com anlegen, Region **EU (Frankfurt)** wählen, Domain hinzufügen.
2. Die angezeigten DNS-Einträge (DKIM/SPF, auf einer Subdomain wie `send.`) bei Strato eintragen. Die MX-Einträge der Hauptdomain bleiben unverändert.
3. API-Key erzeugen und als `RESEND_API_KEY` in Vercel eintragen.

Anfragen werden je nach gewähltem Anliegen (Coaching / Partner / Presse / Sonstiges) an die passende Adresse aus den CMS-Einstellungen geschickt. Mit „Antworten“ im Postfach schreibt man direkt dem Absender.

## Terminbuchung (Cal.com)

Kostenloses Konto bei cal.com (oder cal.eu) anlegen, einen Termintyp „Erstgespräch“ erstellen und den Link im CMS unter **Einstellungen → Link zur Terminbuchung** eintragen.
Der Kalender wird aus Datenschutzgründen erst nach einem Klick geladen (Zwei-Klick-Lösung).

## Inhalte online bearbeiten (Keystatic GitHub-Modus)

Damit sich die Inhalte auch direkt auf der Live-Seite (`www.luisschulz.de/keystatic`) bearbeiten lassen:

1. Lokal in `.env.local` eintragen: `NEXT_PUBLIC_KEYSTATIC_STORAGE=github`
2. `npm run dev` starten und http://localhost:3000/keystatic öffnen. Keystatic führt durch das Anlegen einer GitHub-App und schreibt die Zugangsdaten in `.env`.
3. In der GitHub-App als Callback-URL zusätzlich `https://www.luisschulz.de/api/keystatic/github/oauth/callback` eintragen.
4. Alle `KEYSTATIC_*`-Variablen und `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` in Vercel übernehmen und neu deployen.

Danach meldet man sich unter `/keystatic` mit GitHub an. Jede gespeicherte Änderung wird als Commit gespeichert und automatisch veröffentlicht (ca. 1 Minute).

## Rechtliches

Impressum und Datenschutzerklärung sind **Vorlagen**. Vor dem Livegang Anschrift ergänzen und die Datenschutzerklärung prüfen lassen (z. B. eRecht24-Generator oder anwaltlich).
Außerdem mit Vercel, Resend und Cal.com jeweils einen Auftragsverarbeitungsvertrag (DPA) abschließen.
