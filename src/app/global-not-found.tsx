import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = { title: "404 – Seite nicht gefunden" };

export default function GlobalNotFound() {
  return (
    <html lang="de" className={inter.variable}>
      <body className="flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <p className="eyebrow">404</p>
          <h1 className="h-display mt-4 text-5xl">Seite nicht gefunden</h1>
          <p className="mt-4 text-muted">Page not found.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/de" className="btn btn-primary">Zur Startseite</Link>
            <Link href="/en" className="btn btn-ghost">English</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
