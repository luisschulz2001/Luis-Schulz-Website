import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Inhalte aus /content auch zur Laufzeit verfügbar machen (Kontaktformular, Server-Rendering)
  outputFileTracingIncludes: {
    "/**": [
      "./content/**/*",
      "./node_modules/@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff",
      "./node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff",
    ],
  },
  experimental: {
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
