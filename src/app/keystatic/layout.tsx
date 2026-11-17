import KeystaticApp from "./keystatic";

export const metadata = { title: "Inhalte bearbeiten", robots: { index: false, follow: false } };

export default function KeystaticLayout() {
  return (
    <html lang="de">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
