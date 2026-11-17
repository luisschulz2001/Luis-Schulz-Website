import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const dir = (pkg: string) => join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

/** Schriften für generierte Bilder (Icon, Vorschaubild beim Teilen) */
export async function ogFonts() {
  const [heading, serif] = await Promise.all([
    readFile(join(dir("inter-tight"), "inter-tight-latin-600-normal.woff")),
    readFile(join(dir("instrument-serif"), "instrument-serif-latin-400-italic.woff")),
  ]);
  return [
    { name: "Inter Tight", data: heading, weight: 600 as const, style: "normal" as const },
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}
