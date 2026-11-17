import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
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

  return (
    <>
      <PageHeader eyebrow={t.nav.coaching} title={c.title} lead={c.lead} />

      <section className="container-page">
        <Visual src={c.image} alt={c.title} className="aspect-[16/9] md:aspect-[21/9]" sizes="100vw" />
      </section>

      {/* Angebote */}
      <section className="container-page mt-24 md:mt-32">
        <h2 className="h-section mb-10 text-4xl md:text-5xl">{t.coaching.offers}</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {c.offers.map((o) => (
            <article
              key={o.title}
              className={`relative flex flex-col rounded-[1.75rem] p-8 md:p-10 ${
                o.highlighted ? "bg-ink text-white" : "border border-line bg-surface"
              }`}
            >
              {o.highlighted && (
                <span className="absolute top-8 right-8 rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-wide text-ink uppercase">
                  {t.coaching.popular}
                </span>
              )}
              <p className={`text-sm ${o.highlighted ? "text-white/60" : "text-muted"}`}>{o.audience}</p>
              <h3 className="h-section mt-3 text-3xl">{o.title}</h3>
              <p className={`mt-4 leading-relaxed ${o.highlighted ? "text-white/75" : "text-muted"}`}>{o.text}</p>
              <ul className="mt-8 space-y-3 text-[0.9375rem]">
                {o.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <svg viewBox="0 0 16 16" className={`mt-1 h-4 w-4 shrink-0 ${o.highlighted ? "text-gold" : "text-accent"}`} aria-hidden>
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className={`mt-auto pt-10 ${o.highlighted ? "border-white/15" : "border-line"}`}>
                <p className="h-section text-xl">{o.price}</p>
                <Link
                  href={href(lang, "contact")}
                  className={`btn mt-5 w-full ${o.highlighted ? "btn-light" : "btn-primary"}`}
                >
                  {t.cta.contact} <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
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
