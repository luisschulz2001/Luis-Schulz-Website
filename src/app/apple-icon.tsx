import { ImageResponse } from "next/og";
import { Monogram } from "@/components/Monogram";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<Monogram size={180} />, { ...size, fonts: await ogFonts() });
}
