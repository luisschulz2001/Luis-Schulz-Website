import type { Metadata } from "next";
import { Inter, Inter_Tight, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSettings } from "@/lib/content";
import { getDictionary, hasLocale, href, locales, siteUrl } from "@/lib/i18n";
import { ogImage } from "@/lib/metadata";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-accent",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const settings = getSettings();
  const role = lang === "en" ? settings.role_en : settings.role_de;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${settings.name} – ${role}`, template: `%s` },
    openGraph: {
      siteName: "Luis Schulz Endurance Coaching",
      images: [ogImage(lang === "en" ? "en" : "de")],
    },
  };
}

export default async function SiteLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const settings = getSettings();

  const items = (["about", "races", "coaching", "talks", "partners", "contact"] as const).map((key) => ({
    href: href(lang, key),
    label: dict.nav[key],
  }));

  return (
    <html
      lang={lang}
      className={`${inter.variable} ${interTight.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Markiert, dass JavaScript läuft – erst dann werden Einblend-Effekte aktiv */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header
          locale={lang}
          name={settings.name}
          items={items}
          ctaHref={href(lang, "contact")}
          ctaLabel={dict.cta.book}
          languageLabel={dict.language}
          menuLabel={dict.menu}
          closeLabel={dict.close}
        />
        <main className="flex-1">{children}</main>
        <Footer locale={lang} dict={dict} settings={settings} />
      </body>
    </html>
  );
}
