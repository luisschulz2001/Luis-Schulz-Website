"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";

/**
 * Terminbuchung (Cal.com / Calendly) mit Zwei-Klick-Lösung:
 * Der externe Kalender wird erst nach aktivem Klick geladen (DSGVO).
 */
export function BookingEmbed({ url, t }: { url: string | null; t: Dictionary["booking"] }) {
  const [loaded, setLoaded] = useState(false);

  if (!url) {
    return <p className="rounded-2xl border border-line bg-white p-8 text-muted">{t.missing}</p>;
  }

  const src = `${url}${url.includes("?") ? "&" : "?"}embed=true&theme=light`;

  if (loaded) {
    return (
      <iframe
        src={src}
        title={t.consentTitle}
        className="h-[720px] w-full rounded-2xl border border-line bg-white"
        loading="lazy"
      />
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-8">
      <p className="h-section text-xl">{t.consentTitle}</p>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted">{t.consentText}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="button" onClick={() => setLoaded(true)} className="btn btn-primary">
          {t.load}
        </button>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted underline underline-offset-2 hover:text-ink">
          {t.openExternal} ↗
        </a>
      </div>
    </div>
  );
}
