import Link from "next/link";
import { Arrow } from "./Arrow";

export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="container-page mt-24 md:mt-32">
      <div className="relative overflow-hidden rounded-[2rem] bg-accent px-6 py-14 text-white md:px-16 md:py-20">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full border border-white/10" aria-hidden />
        <div className="pointer-events-none absolute -top-10 -right-10 h-72 w-72 rounded-full border border-white/10" aria-hidden />
        <h2 className="h-section max-w-2xl text-4xl md:text-5xl">{title}</h2>
        <p className="mt-5 max-w-xl text-lg text-white/75">{text}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={primary.href} className="btn btn-light">
            {primary.label} <Arrow />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn border border-white/30 text-white hover:border-white">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
