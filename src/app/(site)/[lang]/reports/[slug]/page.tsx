import Link from "next/link";
import { notFound } from "next/navigation";
import { RichText } from "@/components/RichText";
import { Visual } from "@/components/Visual";
import { getRaces, getReports, localizeReport } from "@/lib/content";
import { formatDate, getDictionary, hasLocale, href, locales, reportHref, siteUrl } from "@/lib/i18n";
import { ogImage } from "@/lib/metadata";

/** Platzhalter, damit die Route auch ohne veröffentlichte Berichte gebaut werden kann */
const NONE = "_";

export function generateStaticParams() {
  const slugs = getReports().map((r) => r.slug);
  return locales.flatMap((lang) => (slugs.length ? slugs : [NONE]).map((slug) => ({ lang, slug })));
}

function find(slug: string) {
  return getReports().find((r) => r.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/[lang]/reports/[slug]">) {
  const { lang, slug } = await params;
  const r = find(slug);
  if (!hasLocale(lang) || !r) return {};
  const rep = localizeReport(r, lang);
  const url = `${siteUrl}${reportHref(lang, slug)}`;
  return {
    title: `${rep.title} – Luis Schulz`,
    description: rep.excerpt,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${reportHref(l, slug)}`])),
    },
    openGraph: {
      title: rep.title,
      description: rep.excerpt,
      url,
      type: "article",
      siteName: "Luis Schulz Endurance Coaching",
      images: rep.cover ? [{ url: rep.cover }] : [ogImage(lang)],
    },
  };
}

export default async function ReportPage({ params }: PageProps<"/[lang]/reports/[slug]">) {
  const { lang, slug } = await params;
  const r = find(slug);
  if (!hasLocale(lang) || !r) notFound();
  const t = getDictionary(lang);
  const rep = localizeReport(r, lang);
  const { completed, upcoming } = getRaces();
  const race = [...completed, ...upcoming].find((x) => x.slug === rep.race);

  return (
    <article>
      <header className="container-page max-w-4xl pt-16 pb-10 md:pt-24">
        <Link href={href(lang, "races")} className="text-sm text-muted hover:text-ink">
          ← {t.reports.back}
        </Link>
        <p className="eyebrow mt-10">
          {t.reports.title} · {formatDate(rep.date, lang)}
        </p>
        <h1 className="h-display mt-5 text-5xl md:text-7xl">{rep.title}</h1>
        {rep.excerpt && <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{rep.excerpt}</p>}
      </header>

      {rep.cover && (
        <div className="container-page max-w-5xl">
          <Visual src={rep.cover} alt={rep.title} priority className="aspect-[16/10]" sizes="(min-width: 1024px) 64rem, 100vw" />
        </div>
      )}

      <div className="container-page mt-14 grid max-w-5xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {rep.fallback && <p className="mb-8 rounded-xl bg-accent-soft px-4 py-3 text-sm text-accent-strong">{t.reports.fallback}</p>}
          <RichText text={rep.body} />
        </div>
        {race && (race.time || race.placement) && (
          <aside className="lg:col-span-4">
            <div className="rounded-[1.5rem] bg-ink p-7 text-white lg:sticky lg:top-28">
              <p className="eyebrow !text-gold">{t.reports.result}</p>
              <p className="h-section mt-3 text-xl">{race.name}</p>
              {race.time && <p className="h-display mt-5 text-5xl tabular-nums">{race.time}</p>}
              {race.placement && <p className="mt-2 text-white/70">{race.placement}</p>}
              <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
                {(["swim", "bike", "run"] as const)
                  .filter((k) => race[k])
                  .map((k) => (
                    <div key={k} className="flex justify-between">
                      <dt className="text-white/60 capitalize">{k}</dt>
                      <dd className="tabular-nums">{race[k]}</dd>
                    </div>
                  ))}
              </dl>
            </div>
          </aside>
        )}
      </div>
    </article>
  );
}
