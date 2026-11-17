import type { MetadataRoute } from "next";
import { locales, routes, siteUrl } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["home", "about", "races", "coaching", "partners", "contact"] as const;
  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${routes[page]}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${routes[page]}`])),
      },
    })),
  );
}
