/** „LS“-Monogramm für Favicon und Apple-Icon (wird mit next/og gerendert) */
export function Monogram({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d1117",
        borderRadius: size * 0.22,
        position: "relative",
      }}
    >
      <div
        style={{
          fontFamily: "Inter Tight",
          fontWeight: 600,
          fontSize: size * 0.5,
          letterSpacing: -size * 0.03,
          color: "#ffffff",
          lineHeight: 1,
          display: "flex",
        }}
      >
        LS
      </div>
      <div
        style={{
          position: "absolute",
          right: size * 0.16,
          bottom: size * 0.2,
          width: size * 0.09,
          height: size * 0.09,
          borderRadius: 999,
          background: "#b08d57",
        }}
      />
    </div>
  );
}
