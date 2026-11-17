import { notFound } from "next/navigation";
import { BookingEmbed } from "@/components/BookingEmbed";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { getContact, getSettings } from "@/lib/content";
import { getDictionary, hasLocale, href } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "contact", getContact(lang).seo);
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getContact(lang);
  const t = getDictionary(lang);
  const settings = getSettings();
  const emails = (["coaching", "partners", "press", "general"] as const).filter((k) => settings.emails[k]);

  return (
    <>
      <PageHeader eyebrow={t.nav.contact} title={c.title} lead={c.lead} />

      <section className="container-page grid gap-12 lg:grid-cols-12">
        <div className="rounded-[1.75rem] border border-line bg-surface p-6 md:p-10 lg:col-span-8">
          <h2 className="h-section mb-8 text-2xl">{t.contact.formTitle}</h2>
          <ContactForm t={t.contact} privacyHref={href(lang, "privacy")} />
        </div>
        <aside className="lg:col-span-4">
          <h2 className="eyebrow mb-4">{t.contact.directTitle}</h2>
          <dl className="divide-y divide-line border-y border-line">
            {emails.map((k) => (
              <div key={k} className="py-4">
                <dt className="text-sm text-muted">{t.contact.emailLabels[k]}</dt>
                <dd>
                  <a href={`mailto:${settings.emails[k]}`} className="font-medium break-all hover:text-accent">
                    {settings.emails[k]}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section id="booking" className="container-page mt-24 scroll-mt-28 md:mt-32">
        <h2 className="h-section text-4xl md:text-5xl">{c.bookingTitle}</h2>
        <p className="mt-4 mb-10 max-w-2xl text-lg text-muted">{c.bookingText}</p>
        <BookingEmbed url={settings.bookingUrl} t={t.booking} />
      </section>
    </>
  );
}
