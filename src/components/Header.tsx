"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type NavItem = { href: string; label: string };

export function Header({
  locale,
  name,
  items,
  ctaHref,
  ctaLabel,
  languageLabel,
  menuLabel,
  closeLabel,
}: {
  locale: Locale;
  name: string;
  items: NavItem[];
  ctaHref: string;
  ctaLabel: string;
  languageLabel: string;
  menuLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  // Menü ist nur auf der Seite offen, auf der es geöffnet wurde → schließt bei Navigation automatisch
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const otherLocale: Locale = locale === "de" ? "en" : "de";
  const switchHref = pathname.replace(/^\/(de|en)(?=\/|$)/, `/${otherLocale}`);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link href={`/${locale}`} className="group flex items-baseline gap-2" aria-label={name}>
          <span className="h-section text-lg tracking-tight md:text-xl">{name}</span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-gold sm:inline-block" aria-hidden />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.9375rem] transition-colors hover:text-ink ${
                isActive(item.href) ? "text-ink" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link href={switchHref} hrefLang={otherLocale} className="text-sm text-muted hover:text-ink">
            {languageLabel}
          </Link>
          <Link href={ctaHref} className="btn btn-primary !py-2.5">
            {ctaLabel}
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-10 w-10 items-center justify-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? closeLabel : menuLabel}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 h-px w-5 bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 h-px w-5 bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="container-page pb-8 lg:hidden" aria-label="Mobile Navigation">
          <ul className="divide-y divide-line border-t border-line">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="h-section block py-4 text-2xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4">
            <Link href={ctaHref} className="btn btn-primary">
              {ctaLabel}
            </Link>
            <Link href={switchHref} hrefLang={otherLocale} className="text-sm text-muted">
              {languageLabel}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
