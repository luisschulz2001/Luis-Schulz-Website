import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { Visual } from "@/components/Visual";
import { getTalks } from "@/lib/content";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/talks">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "talks", getTalks(lang).seo);
}

export default async function TalksPage({ params }: PageProps<"/[lang]/talks">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getTalks(lang);
  const t = getDictionary(lang);

  return (
    <>
      <section className="container-page grid items-end gap-10 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">{t.nav.talks}</p>
          <h1 className="h-display text-5xl md:text-7xl">{c.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{c.lead}</p>
        </div>
        <figure className="lg:col-span-5">
          <Visual src={c.image} alt={c.imageCaption || c.title} priority className="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          {c.imageCaption && <figcaption className="mt-3 text-sm text-muted">{c.imageCaption}</figcaption>}
        </figure>
      </section>

      <section className="container-page mt-24 md:mt-32">
        <h2 className="h-section mb-10 text-4xl md:text-5xl">{c.topicsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {c.topics.map((topic, i) => (
            <Reveal as="article" key={topic.title} delay={i * 90} className="rounded-[1.5rem] border border-line bg-surface p-8">
              <p className="font-serif text-3xl text-gold italic">0{i + 1}</p>
              <h3 className="h-section mt-6 text-2xl">{topic.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{topic.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page mt-24 grid gap-10 md:mt-32 lg:grid-cols-12">
        <h2 className="h-section text-4xl md:text-5xl lg:col-span-4">{c.formatsTitle}</h2>
        <div className="divide-y divide-line border-y border-line lg:col-span-8">
          {c.formats.map((f, i) => (
            <Reveal key={f.title} delay={i * 80} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
              <p className="h-section text-xl">{f.title}</p>
              <p className="leading-relaxed text-muted sm:col-span-2">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <CtaBand title={c.ctaTitle} text={c.ctaText} primary={{ href: `${href(lang, "contact")}?topic=talks`, label: t.cta.contact }} />
      </Reveal>
    </>
  );
}
