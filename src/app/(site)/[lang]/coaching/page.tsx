import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { CtaBand } from "@/components/CtaBand";
import { Visual } from "@/components/Visual";
import { getCoaching, getContact } from "@/lib/content";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/coaching">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "coaching", getCoaching(lang).seo);
}

export default async function CoachingPage({ params }: PageProps<"/[lang]/coaching">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getCoaching(lang);
  const contact = getContact(lang);
  const t = getDictionary(lang);
  const o = c.offer;

  return (
    <>
      <section className="container-page grid items-end gap-10 pt-16 md:pt-24 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">{t.nav.coaching}</p>
          <h1 className="h-display text-5xl md:text-7xl">{c.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{c.lead}</p>
        </div>
        <figure className="lg:col-span-5">
          <Visual src={c.image} alt={c.imageCaption || c.title} priority className="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
          {c.imageCaption && <figcaption className="mt-3 text-sm text-muted">{c.imageCaption}</figcaption>}
        </figure>
      </section>

      {/* Angebot */}
      <section className="container-page mt-24 md:mt-32">
        <p className="eyebrow mb-6">{t.coaching.offer}</p>
        <article className="relative grid overflow-hidden rounded-[2rem] bg-ink text-white lg:grid-cols-12">
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full border border-white/5" aria-hidden />
          <div className="relative flex flex-col p-8 md:p-14 lg:col-span-7">
            <p className="text-sm tracking-wide text-gold">{o.audience}</p>
            <h2 className="h-display mt-4 text-5xl md:text-6xl">{o.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{o.text}</p>
            {o.highlights.length > 0 && (
              <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                {o.highlights.map((h) => (
                  <div key={h.label}>
                    <dt className="sr-only">{h.label}</dt>
                    <dd>
                      <span className="block font-serif text-4xl text-gold italic">{h.value}</span>
                      <span className="mt-1 block text-sm text-white/60">{h.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="mt-auto pt-12">
              <p className="h-section text-3xl">{o.price}</p>
              {o.note && <p className="mt-2 text-sm text-white/55">{o.note}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`${href(lang, "contact")}#booking`} className="btn btn-light">
                  {t.cta.book} <Arrow />
                </Link>
                <Link href={href(lang, "contact")} className="btn border border-white/25 text-white hover:border-white">
                  {t.cta.contact}
                </Link>
              </div>
            </div>
          </div>
          <div className="relative border-t border-white/10 p-8 md:p-14 lg:col-span-5 lg:border-t-0 lg:border-l">
            <p className="eyebrow !text-white/50">{t.coaching.included}</p>
            <ul className="mt-6 divide-y divide-white/10">
              {o.features.map((f) => (
                <li key={f} className="flex gap-4 py-4">
                  <svg viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden>
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-white/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* Ablauf */}
      {c.process.length > 0 && (
        <section className="container-page mt-24 md:mt-32">
          <h2 className="h-section mb-10 text-4xl md:text-5xl">{c.processTitle}</h2>
          <ol className="grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {c.process.map((s, i) => (
              <li key={s.title} className="bg-paper p-8">
                <p className="font-serif text-4xl text-gold italic">{i + 1}</p>
                <h3 className="h-section mt-6 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* FAQ */}
      {c.faq.length > 0 && (
        <section className="container-page mt-24 grid gap-10 md:mt-32 lg:grid-cols-12">
          <h2 className="h-section text-4xl md:text-5xl lg:col-span-4">{t.coaching.faq}</h2>
          <div className="divide-y divide-line border-y border-line lg:col-span-8">
            {c.faq.map((f) => (
              <details key={f.question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                  {f.question}
                  <span className="text-2xl text-muted transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-prose leading-relaxed text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <CtaBand
        title={contact.bookingTitle}
        text={contact.bookingText}
        primary={{ href: `${href(lang, "contact")}#booking`, label: t.cta.book }}
      />
    </>
  );
}
