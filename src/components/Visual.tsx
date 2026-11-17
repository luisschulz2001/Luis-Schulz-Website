import Image from "next/image";

/**
 * Zeigt ein Bild aus dem CMS – oder, solange keins hochgeladen ist,
 * eine dezente Grafik mit den drei Disziplinen als Platzhalter.
 */
export function Visual({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] bg-ink ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}

function Placeholder() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_10%_0%,#1b6377_0%,#0f4c5c_35%,#0d1117_100%)]">
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Swim */}
        <path d="M0 330 C 60 310, 100 350, 160 330 S 260 310, 320 330 S 380 350, 400 340" fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.2" />
        <path d="M0 350 C 60 330, 100 370, 160 350 S 260 330, 320 350 S 380 370, 400 360" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="1.2" />
        {/* Bike */}
        <path d="M0 400 L 400 260" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" />
        {/* Run */}
        <path d="M0 450 C 120 440, 220 380, 400 200" fill="none" stroke="#b08d57" strokeOpacity="0.7" strokeWidth="1.4" />
      </svg>
      <div className="absolute bottom-5 left-5 text-[0.7rem] tracking-[0.2em] text-white/50 uppercase">
        Swim · Bike · Run
      </div>
    </div>
  );
}
