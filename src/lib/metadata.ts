import type { Metadata } from "next";
import { locales, routes, siteUrl, type Locale } from "./i18n";

/** Vorschaubild beim Teilen (WhatsApp, Instagram, LinkedIn …) */
export const ogImage = (locale: Locale) => ({
  url: `/images/og/${locale}.jpg`,
  width: 1200,
  height: 630,
  alt: "Luis Schulz Endurance Coaching",
});

export function pageMetadata(
  locale: Locale,
  route: keyof typeof routes,
  seo: { title: string; description: string },
): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${routes[route]}`]));
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${siteUrl}/${locale}${routes[route]}`,
      languages: { ...languages, "x-default": `${siteUrl}/de${routes[route]}` },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${siteUrl}/${locale}${routes[route]}`,
      locale: locale === "de" ? "de_DE" : "en_GB",
      type: "website",
      siteName: "Luis Schulz Endurance Coaching",
      images: [ogImage(locale)],
    },
  };
}
