import { NextResponse, type NextRequest } from "next/server";

const locales = ["de", "en"];

/** Leitet Adressen ohne Sprache (z. B. "/" oder "/coaching") auf /de/… bzw. /en/… weiter. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const accept = request.headers.get("accept-language")?.toLowerCase() ?? "";
  const preferred = accept
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2))
    .find((code) => locales.includes(code));
  const locale = preferred ?? "de";

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|keystatic|images|favicon.ico|icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
