import { Fragment } from "react";

/**
 * Einfache Textformatierung für Inhalte aus dem CMS:
 * Leerzeile = Absatz · "## " = Zwischenüberschrift · "- " = Aufzählung
 */
export function RichText({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className={`space-y-5 text-[1.0625rem] leading-relaxed text-ink-soft ${className}`}>
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="h-section pt-4 text-2xl text-ink">
              {block.slice(3)}
            </h2>
          );
        }
        if (lines.every((l) => l.trim().startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-4 shrink-0 bg-accent" aria-hidden />
                  <span>{l.trim().slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i}>
            {lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {l}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
