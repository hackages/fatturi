import React from "react";
import type { Block } from "@/lib/posts";

// Formatage inline minimal : **gras** et [texte](url).
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b${i}`}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      const href = match[3];
      const external = href.startsWith("http");
      nodes.push(
        <a
          key={`${keyPrefix}-a${i}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[2]}
        </a>
      );
    }
    last = regex.lastIndex;
    i++;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-fatturi">
      {blocks.map((block, i) => {
        const key = `b${i}`;
        switch (block.type) {
          case "p":
            return <p key={key}>{renderInline(block.text, key)}</p>;
          case "h2":
            return <h2 key={key}>{block.text}</h2>;
          case "h3":
            return <h3 key={key}>{block.text}</h3>;
          case "ul":
            return (
              <ul key={key}>
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="my-8 border-l-4 border-gold bg-brume/50 px-6 py-5 not-prose"
              >
                <p className="font-serif text-xl italic leading-snug text-navy-deep">
                  “{block.text}”
                </p>
                {block.cite && (
                  <cite className="mt-3 block font-mono text-xs uppercase not-italic tracking-[0.14em] text-navy/55">
                    {block.cite}
                  </cite>
                )}
              </blockquote>
            );
          case "callout":
            return (
              <aside
                key={key}
                className="my-8 rounded-2xl border border-sage/25 bg-sage/[0.06] p-6"
              >
                <p className="mb-1 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-sage">
                  <span className="inline-block h-2 w-2 rotate-45 bg-sage" />
                  {block.title}
                </p>
                <p className="text-[1.0625rem] leading-relaxed text-[#2b3742]">
                  {renderInline(block.text, key)}
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
