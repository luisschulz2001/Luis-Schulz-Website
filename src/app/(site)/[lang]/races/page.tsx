import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { PageHeader } from "@/components/PageHeader";
import { ProgressChart } from "@/components/ProgressChart";
import { RaceList } from "@/components/RaceList";
import { Reveal } from "@/components/Reveal";
import { Visual } from "@/components/Visual";
import { getProgress, getRaces, getRacesPage, getReports, localizeReport } from "@/lib/content";
import { formatDate, getDictionary, hasLocale, reportHref } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/races">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "races", getRacesPage(lang).seo);
}

export default async function RacesPage({ params }: PageProps<"/[lang]/races">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getRacesPage(lang);
  const t = getDictionary(lang);
  const { upcoming, completed } = getRaces();
  const reports = getReports();
  const progress = getProgress();

  return (
    <>
      <PageHeader eyebrow={t.nav.races} title={c.title} lead={c.lead} />
      <Reveal as="section" className="container-page">
        <h2 className="h-section mb-6 text-3xl md:text-4xl">{t.races.upcoming}</h2>
        <RaceList races={upcoming} locale={lang} t={t.races} empty={t.races.noUpcoming} reports={reports} reportLabel={t.reports.link} />
      </Reveal>
      <Reveal as="section" className="container-page mt-20">
        <h2 className="h-section mb-6 text-3xl md:text-4xl">{t.races.completed}</h2>
        <RaceList races={completed} locale={lang} t={t.races} empty={t.races.noCompleted} reports={reports} reportLabel={t.reports.link} />
      </Reveal>

      {progress && progress.before.total > progress.after.total && (
        <Reveal as="section" className="container-page mt-20">
          <ProgressChart before={progress.before} after={progress.after} t={t.progress} />
        </Reveal>
      )}

      {reports.length > 0 && (
        <section className="container-page mt-24 md:mt-32">
          <h2 className="h-section mb-10 text-4xl md:text-5xl">{t.reports.title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((r, i) => {
              const rep = localizeReport(r, lang);
              return (
                <Reveal as="article" key={r.slug} delay={i * 90}>
                  <Link href={reportHref(lang, r.slug)} className="group block">
                    <Visual src={rep.cover} alt={rep.title} className="aspect-[4/3] transition duration-500 group-hover:opacity-90" sizes="(min-width: 1024px) 33vw, 100vw" />
                    <p className="mt-5 text-sm text-muted">{formatDate(rep.date, lang)}</p>
                    <h3 className="h-section mt-2 text-2xl">{rep.title}</h3>
                    {rep.excerpt && <p className="mt-2 leading-relaxed text-muted">{rep.excerpt}</p>}
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                      {t.reports.read} <Arrow className="transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
