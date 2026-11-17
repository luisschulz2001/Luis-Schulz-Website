export function PageHeader({ eyebrow, title, lead }: { eyebrow?: string; title: string; lead?: string }) {
  return (
    <header className="container-page pt-16 pb-12 md:pt-24 md:pb-16">
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h1 className="h-display max-w-4xl text-5xl md:text-7xl">{title}</h1>
      {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{lead}</p>}
    </header>
  );
}
