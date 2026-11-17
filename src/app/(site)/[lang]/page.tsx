import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { CtaBand } from "@/components/CtaBand";
import { RaceList } from "@/components/RaceList";
import { RichText } from "@/components/RichText";
import { Visual } from "@/components/Visual";
import { getHome, getRaces, getTestimonials } from "@/lib/content";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "home", getHome(lang).seo);
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getHome(lang);
  const t = getDictionary(lang);
  const upcoming = getRaces().upcoming.slice(0, 3);
  const testimonials = getTestimonials().slice(0, 3);
  const [qOpen, qClose] = lang === "de" ? ["„", "“"] : ["“", "”"];

  return (
    <>
      {/* Hero */}
      <section className="container-page grid items-center gap-10 pt-10 pb-8 md:pt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-6">{c.heroEyebrow}</p>
          <h1 className="h-display text-[2.9rem] sm:text-6xl xl:text-[5.5rem]">{c.heroTitle}</h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{c.heroText}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={href(lang, "coaching")} className="btn btn-primary">
              {t.cta.coaching} <Arrow />
            </Link>
            <Link href={href(lang, "about")} className="btn btn-ghost">
              {t.nav.about}
            </Link>
          </div>
        </div>
        <Visual src={c.heroImage} alt={c.heroTitle} priority className="aspect-[4/5] lg:col-span-5" />
      </section>

      {/* Intro */}
      <section className="container-page mt-24 grid gap-8 md:mt-32 lg:grid-cols-12">
        <h2 className="h-section text-4xl md:text-5xl lg:col-span-5">{c.introTitle}</h2>
        <RichText text={c.introText} className="lg:col-span-6 lg:col-start-7" />
      </section>

      {/* Säulen */}
      <section className="container-page mt-20 grid gap-4 md:grid-cols-3">
        {c.pillars.map((p, i) => (
          <Link
            key={p.title}
            href={href(lang, p.href)}
            className="group flex flex-col justify-between rounded-[1.5rem] border border-line bg-surface p-8 transition hover:border-ink"
          >
            <div>
              <p className="font-serif text-3xl text-gold italic">0{i + 1}</p>
              <h3 className="h-section mt-8 text-2xl">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.text}</p>
            </div>
            <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium">
              {t.cta.more} <Arrow className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      {/* Zitat */}
      {c.quote && (
        <section className="mt-24 bg-ink py-20 text-white md:mt-32 md:py-28">
          <figure className="container-page max-w-5xl">
            <blockquote className="font-serif text-4xl leading-[1.15] md:text-6xl">
              {qOpen}
              {c.quote}
              {qClose}
            </blockquote>
            {c.quoteAuthor && <figcaption className="eyebrow mt-8 !text-gold">{c.quoteAuthor}</figcaption>}
          </figure>
        </section>
      )}

      {/* Rennen */}
      <section className="container-page mt-24 md:mt-32">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="h-section text-4xl md:text-5xl">{t.home.upcomingTitle}</h2>
          <Link href={href(lang, "races")} className="hidden items-center gap-2 text-sm font-medium sm:inline-flex">
            {t.cta.allRaces} <Arrow />
          </Link>
        </div>
        <RaceList races={upcoming} locale={lang} t={t.races} empty={t.races.noUpcoming} />
      </section>

      {/* Stimmen */}
      {testimonials.length > 0 && (
        <section className="container-page mt-24 md:mt-32">
          <h2 className="h-section mb-10 text-4xl md:text-5xl">{t.home.testimonialsTitle}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map((q) => (
              <figure key={q.slug} className="rounded-[1.5rem] bg-surface p-8">
                <blockquote className="font-serif text-2xl leading-snug">
                  {qOpen}
                  {lang === "de" ? q.quote_de : q.quote_en}
                  {qClose}
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{q.name}</span>
                  <span className="block text-muted">{lang === "de" ? q.role_de : q.role_en}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <CtaBand
        title={c.ctaTitle}
        text={c.ctaText}
        primary={{ href: href(lang, "contact"), label: t.cta.book }}
        secondary={{ href: href(lang, "partners"), label: t.cta.partner }}
      />
    </>
  );
}
