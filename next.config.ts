import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Inhalte aus /content auch zur Laufzeit verfügbar machen (Kontaktformular, Server-Rendering)
  outputFileTracingIncludes: {
    "/**": ["./content/**/*"],
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
