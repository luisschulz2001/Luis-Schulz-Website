import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { RaceList } from "@/components/RaceList";
import { getRaces, getRacesPage } from "@/lib/content";
import { getDictionary, hasLocale } from "@/lib/i18n";
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

  return (
    <>
      <PageHeader eyebrow={t.nav.races} title={c.title} lead={c.lead} />
      <section className="container-page">
        <h2 className="h-section mb-6 text-3xl md:text-4xl">{t.races.upcoming}</h2>
        <RaceList races={upcoming} locale={lang} t={t.races} empty={t.races.noUpcoming} />
      </section>
      <section className="container-page mt-20">
        <h2 className="h-section mb-6 text-3xl md:text-4xl">{t.races.completed}</h2>
        <RaceList races={completed} locale={lang} t={t.races} empty={t.races.noCompleted} />
      </section>
    </>
  );
}
