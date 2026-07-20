const LOOM_RE = /loom\.com\/(?:share|embed)\/([a-f0-9]+)/i;

export function loomIdFromUrl(href?: string | null): string | null {
  if (!href) return null;
  const match = LOOM_RE.exec(href);
  return match?.[1] ?? null;
}

export function LoomEmbed({
  id,
  title = "Tutoriel vidéo",
}: {
  id: string;
  title?: string;
}) {
  return (
    <figure className="fatturi-loom">
      <div className="fatturi-loom-frame">
        <iframe
          src={`https://www.loom.com/embed/${id}`}
          title={title}
          allowFullScreen
          loading="lazy"
        />
      </div>
      <figcaption className="fatturi-loom-caption">{title}</figcaption>
    </figure>
  );
}
