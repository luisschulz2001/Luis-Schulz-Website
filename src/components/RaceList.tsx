import type { Race } from "@/lib/content";
import type { Dictionary, Locale } from "@/lib/i18n";

function formatDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function RaceList({
  races,
  locale,
  t,
  empty,
}: {
  races: Race[];
  locale: Locale;
  t: Dictionary["races"];
  empty: string;
}) {
  if (races.length === 0) {
    return <p className="border-t border-line py-8 text-muted">{empty}</p>;
  }
  return (
    <ul className="border-t border-line">
      {races.map((race) => {
        const note = locale === "de" ? race.note_de : race.note_en;
        return (
          <li key={`${race.date}-${race.name}`} className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-6">
            <p className="text-sm text-muted tabular-nums md:col-span-2">{formatDate(race.date, locale)}</p>
            <div className="md:col-span-6">
              <p className="h-section text-xl md:text-2xl">{race.name}</p>
              <p className="mt-1 text-sm text-muted">
                {[race.location, t.distance[race.distance]].filter(Boolean).join(" · ")}
              </p>
              {note && <p className="mt-2 text-sm text-ink-soft">{note}</p>}
            </div>
            <div className="flex gap-6 text-sm md:col-span-4 md:justify-end">
              {race.placement && (
                <p>
                  <span className="text-muted">{t.placement} </span>
                  <span className="font-semibold">{race.placement}</span>
                </p>
              )}
              {race.time && (
                <p>
                  <span className="text-muted">{t.time} </span>
                  <span className="font-semibold tabular-nums">{race.time}</span>
                </p>
              )}
              {race.link && (
                <a href={race.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {t.report} ↗
                </a>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
