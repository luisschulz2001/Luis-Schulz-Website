import Image from "next/image";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { Visual } from "@/components/Visual";
import { getPartners, getPartnersPage, getSettings } from "@/lib/content";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/partners">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "partners", getPartnersPage(lang).seo);
}

export default async function PartnersPage({ params }: PageProps<"/[lang]/partners">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getPartnersPage(lang);
  const t = getDictionary(lang);
  const partners = getPartners();
  const settings = getSettings();

  return (
    <>
      <PageHeader eyebrow={t.nav.partners} title={c.title} lead={c.lead} />

      {c.image && (
        <section className="container-page mb-20 md:mb-28">
          <Visual src={c.image} alt={c.title} priority className="aspect-[3/2] md:aspect-[21/9]" sizes="100vw" position="center 15%" />
        </section>
      )}

      <section className="container-page">
        <h2 className="eyebrow mb-6">{t.partners.current}</h2>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line md:grid-cols-4">
          {partners.map((p) => {
            const logo = p.logo ? (
              <Image src={p.logo} alt={p.name} width={180} height={80} className="max-h-14 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
            ) : (
              <span className="h-section text-lg">{p.name}</span>
            );
            return (
              <div key={p.slug} className="flex h-36 items-center justify-center bg-surface p-6">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </div>
            );
          })}
          {Array.from({ length: partners.length === 0 ? 4 : (4 - (partners.length % 4)) % 4 }).map((_, i) => (
            <div key={`free-${i}`} className="flex h-36 items-center justify-center bg-paper p-6 text-center text-sm text-muted">
              {i === 0 ? t.partners.none : ""}
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-24 md:mt-32">
        <h2 className="h-section mb-10 text-4xl md:text-5xl">{c.benefitsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {c.benefits.map((b, i) => (
            <div key={b.title} className="rounded-[1.5rem] border border-line bg-surface p-8">
              <p className="font-serif text-3xl text-gold italic">0{i + 1}</p>
              <h3 className="h-section mt-6 text-2xl">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title={c.ctaTitle}
        text={c.ctaText}
        primary={{ href: `${href(lang, "contact")}?topic=partners`, label: t.cta.partner }}
        secondary={
          settings.emails.partners
            ? { href: `mailto:${settings.emails.partners}`, label: settings.emails.partners }
            : undefined
        }
      />
    </>
  );
}
