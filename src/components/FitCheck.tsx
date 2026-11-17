"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { Arrow } from "./Arrow";

/** Kurzer Check mit vier Fragen – füllt danach die Anfrage im Kontaktformular vor */
export function FitCheck({ t, contactHref }: { t: Dictionary["fit"]; contactHref: string }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step >= t.questions.length;

  const choose = (i: number) => setAnswers((a) => [...a, i]);
  const back = () => setAnswers((a) => a.slice(0, -1));

  let result = t.resultDefault;
  if (done) {
    const [goal, experience, hours, distance] = answers;
    const longDistance = goal === 2 || goal === 3 || distance === 2;
    if (experience === 0) result = t.resultBeginner;
    else if (longDistance && hours === 0) result = t.resultTight;
  }

  const summary = t.questions.map((q, i) => `${q.label} ${q.options[answers[i]] ?? ""}`);
  const message = [t.messageIntro, "", ...summary.map((l) => `- ${l}`)].join("\n");
  const sendHref = `${contactHref}?topic=coaching&message=${encodeURIComponent(message)}`;

  return (
    <div className="rounded-[2rem] border border-line bg-surface p-6 md:p-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 className="h-section mt-3 text-3xl md:text-4xl">{t.title}</h2>
          <p className="mt-3 max-w-xl text-muted">{t.lead}</p>
        </div>
        {!done && (
          <p className="text-sm text-muted tabular-nums">
            {t.step} {step + 1} {t.of} {t.questions.length}
          </p>
        )}
      </div>

      {/* Fortschritt */}
      <div className="mt-8 grid grid-cols-4 gap-1.5" aria-hidden>
        {t.questions.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-colors duration-500 ${i < step ? "bg-accent" : "bg-line"}`} />
        ))}
      </div>

      <div className="mt-10 min-h-[16rem]" aria-live="polite">
        {!done ? (
          <div key={step} className="animate-[fadeUp_.45s_ease-out]">
            <p className="h-section text-2xl md:text-3xl">{t.questions[step].label}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.questions[step].options.map((o, i) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => choose(i)}
                  className="group flex items-center justify-between rounded-2xl border border-line bg-paper px-5 py-4 text-left transition hover:border-ink hover:bg-white"
                >
                  <span>{o}</span>
                  <Arrow className="text-muted transition group-hover:translate-x-1 group-hover:text-ink" />
                </button>
              ))}
            </div>
            {step > 0 && (
              <button type="button" onClick={back} className="mt-6 text-sm text-muted underline-offset-2 hover:text-ink hover:underline">
                ← {t.back}
              </button>
            )}
          </div>
        ) : (
          <div className="grid animate-[fadeUp_.45s_ease-out] gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="h-section text-2xl md:text-3xl">{t.resultTitle}</p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{result}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={sendHref} className="btn btn-primary">
                  {t.send} <Arrow />
                </Link>
                <Link href={`${contactHref}#booking`} className="btn btn-ghost">
                  {t.book}
                </Link>
              </div>
              <button type="button" onClick={() => setAnswers([])} className="mt-6 text-sm text-muted hover:text-ink">
                ↺ {t.restart}
              </button>
            </div>
            <dl className="divide-y divide-line rounded-2xl bg-paper px-5 lg:col-span-5">
              <p className="eyebrow pt-5 pb-2">{t.summary}</p>
              {t.questions.map((q, i) => (
                <div key={q.key} className="py-3">
                  <dt className="text-xs text-muted">{q.label}</dt>
                  <dd className="font-medium">{q.options[answers[i]]}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
