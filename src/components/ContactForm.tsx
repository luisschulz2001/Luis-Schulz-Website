"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import type { Dictionary } from "@/lib/i18n";

export function ContactForm({
  t,
  privacyHref,
  defaultTopic = "coaching",
}: {
  t: Dictionary["contact"];
  privacyHref: string;
  defaultTopic?: string;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const topicsRef = useRef<HTMLFieldSetElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Vorauswahl über Link, z. B. /de/contact?topic=partners
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("topic");
    const input = topicsRef.current?.querySelector<HTMLInputElement>(`input[value="${fromUrl}"]`);
    if (input) input.checked = true;
    // z. B. aus dem Coaching-Check
    const message = new URLSearchParams(window.location.search).get("message");
    const textarea = messageRef.current;
    if (message && textarea && !textarea.value) textarea.value = message.slice(0, 2000);
  }, []);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-accent/20 bg-accent-soft p-8 text-accent-strong" role="status">
        {t.success}
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate={false}>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset ref={topicsRef}>
        <legend className="mb-3 text-sm font-medium">{t.topic}</legend>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(t.topics) as (keyof typeof t.topics)[]).map((key) => (
            <label key={key} className="cursor-pointer">
              <input type="radio" name="topic" value={key} defaultChecked={key === defaultTopic} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent">
                {t.topics[key]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">{t.name}</span>
          <input name="name" required autoComplete="name" className="field" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">{t.email}</span>
          <input name="email" type="email" required autoComplete="email" className="field" />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-medium">{t.message}</span>
        <textarea ref={messageRef} name="message" required rows={7} className="field resize-y" />
      </label>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[var(--color-accent)]" />
        <span>
          {t.consent}{" "}
          <Link href={privacyHref} className="underline underline-offset-2 hover:text-ink">
            {t.consentLink}
          </Link>
          .
        </span>
      </label>

      {(state.status === "error" || state.status === "invalid") && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {state.status === "invalid" ? t.invalid : t.error}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {pending ? t.sending : t.submit}
      </button>
    </form>
  );
}
