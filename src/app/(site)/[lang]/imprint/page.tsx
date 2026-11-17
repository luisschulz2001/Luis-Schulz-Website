import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { RichText } from "@/components/RichText";
import { getLegal } from "@/lib/content";
import { getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/imprint">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).legal.imprint, robots: { index: false } };
}

export default async function LegalPage({ params }: PageProps<"/[lang]/imprint">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const legal = getLegal(lang);
  return (
    <>
      <PageHeader title={getDictionary(lang).legal.imprint} />
      <section className="container-page">
        <RichText text={legal.imprint} className="max-w-3xl" />
      </section>
    </>
  );
}
