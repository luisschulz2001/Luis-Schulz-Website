"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion, useInView } from "./useInView";

const LEG_COLORS = {
  swim: "bg-[#7fb3bf]",
  bike: "bg-accent",
  run: "bg-gold",
} as const;

type Leg = {
  total: number;
  swim: number;
  bike: number;
  run: number;
  year: string;
  name: string;
};

const fmt = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.round(s % 60);
  const mm = String(m).padStart(2, "0");
  const ss = String(sec).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${m}:${ss}`;
};

/** Zählt beim Sichtbarwerden von 0 auf den Zielwert hoch */
function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  const [reduced] = useState(prefersReducedMotion);
  useEffect(() => {
    if (!run || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, reduced, target, duration]);
  return run && reduced ? target : value;
}

function Bar({
  leg,
  delay,
  max,
  inView,
}: {
  leg: Leg;
  delay: number;
  max: number;
  inView: boolean;
}) {
  return (
    <div className="grid grid-cols-[3.5rem_1fr] items-center gap-4 md:grid-cols-[5rem_1fr_6rem]">
      <span className="font-serif text-2xl text-white/80 italic">
        {leg.year}
      </span>
      <div className="h-9 overflow-hidden rounded-full bg-white/5">
        <div
          className="flex h-full transition-[width] duration-[1400ms] ease-out"
          style={{
            width: inView ? `${(leg.total / max) * 100}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        >
          {(["swim", "bike", "run"] as const).map((k) => (
            <div
              key={k}
              className={`${LEG_COLORS[k]} h-full`}
              style={{ width: `${(leg[k] / leg.total) * 100}%` }}
            />
          ))}
        </div>
      </div>
      <span className="col-start-2 -mt-2 text-sm text-white/70 tabular-nums md:col-start-3 md:mt-0 md:text-right md:text-base">
        {fmt(leg.total)}
      </span>
    </div>
  );
}

export function ProgressChart({
  before,
  after,
  t,
}: {
  before: Leg;
  after: Leg;
  t: {
    eyebrow: string;
    title: string;
    lead: string;
    swim: string;
    bike: string;
    run: string;
  };
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const gain = before.total - after.total;
  const counted = useCountUp(gain, inView);
  const legs = [
    { key: "swim", label: t.swim, color: LEG_COLORS.swim },
    { key: "bike", label: t.bike, color: LEG_COLORS.bike },
    { key: "run", label: t.run, color: LEG_COLORS.run },
  ] as const;

  return (
    <div ref={ref} className="rounded-[2rem] bg-ink p-8 text-white md:p-14">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow !text-gold">{t.eyebrow}</p>
          <p className="h-display mt-5 text-6xl tabular-nums md:text-8xl">
            −{fmt(counted)}
            <span className="mt-2 block font-serif text-3xl font-normal tracking-normal text-white/70 italic sm:mt-0 sm:ml-3 sm:inline md:text-4xl">
              {t.title}
            </span>
          </p>
        </div>
        <p className="text-white/70 lg:col-span-5">
          {after.name.replace(/\s*\d{4}$/, "")} {before.year} → {after.year}.{" "}
          {t.lead}
        </p>
      </div>

      <div className="mt-12 space-y-5">
        <Bar leg={before} delay={0} max={before.total} inView={inView} />
        <Bar leg={after} delay={250} max={before.total} inView={inView} />
      </div>

      <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
        {legs.map((l) => (
          <div key={l.key}>
            <dt className="flex items-center gap-2 text-sm text-white/60">
              <span
                className={`h-2.5 w-2.5 rounded-full ${l.color}`}
                aria-hidden
              />
              {l.label}
            </dt>
            <dd className="mt-2">
              <span className="block font-serif text-3xl text-gold italic tabular-nums md:text-4xl">
                {before[l.key] >= after[l.key] ? "−" : "+"}
                {fmt(Math.abs(before[l.key] - after[l.key]))}
              </span>
              <span className="mt-1 block text-xs text-white/50 tabular-nums md:text-sm">
                {fmt(before[l.key])} → {fmt(after[l.key])}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
