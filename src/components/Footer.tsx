import Link from "next/link";
import { cacheLife } from "next/cache";
import type { Settings } from "@/lib/content";
import { href, type Dictionary, type Locale } from "@/lib/i18n";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer({ locale, dict, settings }: { locale: Locale; dict: Dictionary; settings: Settings }) {
  const socials = [
    ["Instagram", settings.social.instagram],
    ["Strava", settings.social.strava],
    ["YouTube", settings.social.youtube],
    ["LinkedIn", settings.social.linkedin],
  ].filter((s): s is [string, string] => Boolean(s[1]));
  const role = locale === "de" ? settings.role_de : settings.role_en;
  const year = await currentYear();

  return (
    <footer className="mt-24 bg-ink text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="h-section text-2xl text-white">{settings.name}</p>
          <p className="mt-2">{role}</p>
          {settings.emails.general && (
            <a href={`mailto:${settings.emails.general}`} className="mt-6 inline-block text-white hover:text-gold">
              {settings.emails.general}
            </a>
          )}
        </div>
        <nav className="md:col-span-3" aria-label="Footer">
          <ul className="space-y-2">
            {(["about", "races", "coaching", "talks", "partners", "contact"] as const).map((key) => (
              <li key={key}>
                <Link href={href(locale, key)} className="hover:text-white">
                  {dict.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-4">
          {socials.length > 0 && (
            <ul className="space-y-2">
              {socials.map(([label, url]) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.businessName || settings.name}. {dict.footer.rights}
          </p>
          <div className="flex gap-6">
            <Link href={href(locale, "imprint")} className="hover:text-white">
              {dict.footer.imprint}
            </Link>
            <Link href={href(locale, "privacy")} className="hover:text-white">
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
