import Link from "next/link";
import type { Race, Report } from "@/lib/content";
import { formatDate, reportHref, type Dictionary, type Locale } from "@/lib/i18n";

export function RaceList({
  races,
  locale,
  t,
  empty,
  reports = [],
  reportLabel,
}: {
  races: (Race & { slug?: string })[];
  locale: Locale;
  t: Dictionary["races"];
  empty: string;
  reports?: (Report & { slug: string })[];
  reportLabel?: string;
}) {
  if (races.length === 0) {
    return <p className="border-t border-line py-8 text-muted">{empty}</p>;
  }
  return (
    <ul className="border-t border-line">
      {races.map((race) => {
        const note = locale === "de" ? race.note_de : race.note_en;
        const report = reports.find((r) => r.race && r.race === race.slug);
        const splits = [
          ["Swim", race.swim],
          ["Bike", race.bike],
          ["Run", race.run],
        ].filter(([, v]) => v);
        return (
          <li key={`${race.date}-${race.name}`} className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:gap-6">
            <p className="text-sm text-muted tabular-nums md:col-span-2">{formatDate(race.date, locale)}</p>
            <div className="md:col-span-6">
              <p className="h-section text-xl md:text-2xl">{race.name}</p>
              <p className="mt-1 text-sm text-muted">
                {[race.location, t.distance[race.distance]].filter(Boolean).join(" · ")}
              </p>
              {note && <p className="mt-2 text-sm text-ink-soft">{note}</p>}
              {splits.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted tabular-nums">
                  {splits.map(([k, v]) => (
                    <span key={k}>
                      {k} <span className="text-ink-soft">{v}</span>
                    </span>
                  ))}
                </p>
              )}
              {report && (
                <Link href={reportHref(locale, report.slug)} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline">
                  {reportLabel ?? "→"} →
                </Link>
              )}
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
