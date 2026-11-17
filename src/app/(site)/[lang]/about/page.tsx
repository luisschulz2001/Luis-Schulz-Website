import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { RichText } from "@/components/RichText";
import { Visual } from "@/components/Visual";
import { getAbout, getHome } from "@/lib/content";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "about", getAbout(lang).seo);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getAbout(lang);
  const home = getHome(lang);
  const t = getDictionary(lang);

  return (
    <>
      <PageHeader eyebrow={t.nav.about} title={c.title} lead={c.lead} />

      <section className="container-page grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Visual src={c.image} alt={c.title} priority className="aspect-[4/5] lg:sticky lg:top-28" />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <RichText text={c.body} />

          {c.facts.length > 0 && (
            <div className="mt-16">
              <h2 className="eyebrow mb-4">{t.about.facts}</h2>
              <dl className="divide-y divide-line border-y border-line">
                {c.facts.map((f) => (
                  <div key={f.label} className="flex justify-between gap-6 py-4">
                    <dt className="text-muted">{f.label}</dt>
                    <dd className="text-right font-medium">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>

      {c.gallery.length > 0 && (
        <section className="container-page mt-24 grid gap-4 sm:grid-cols-3 md:mt-32">
          {c.gallery.map((g) => (
            <Visual key={g.image ?? g.alt} src={g.image} alt={g.alt} className="aspect-[4/5]" sizes="(min-width: 640px) 33vw, 100vw" />
          ))}
        </section>
      )}

      {c.timeline.length > 0 && (
        <section className="container-page mt-24 md:mt-32">
          <h2 className="h-section mb-10 text-4xl md:text-5xl">{t.about.timeline}</h2>
          <ol className={`grid gap-4 md:grid-cols-2 ${c.timeline.length === 5 ? "lg:grid-cols-5" : c.timeline.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
            {c.timeline.map((m) => (
              <li key={`${m.year}-${m.title}`} className="rounded-[1.5rem] border border-line bg-surface p-7">
                <p className="font-serif text-3xl text-accent italic">{m.year}</p>
                <h3 className="h-section mt-6 text-xl">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      <CtaBand
        title={home.ctaTitle}
        text={home.ctaText}
        primary={{ href: href(lang, "coaching"), label: t.cta.coaching }}
        secondary={{ href: href(lang, "partners"), label: t.cta.partner }}
      />
    </>
  );
}
