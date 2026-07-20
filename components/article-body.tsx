import type { ReactElement, ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LoomEmbed, loomIdFromUrl } from "@/components/loom-embed";
import { remarkFatturi } from "@/lib/remark-fatturi";

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(textFromChildren).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren(
      (children as { props?: { children?: ReactNode } }).props?.children,
    );
  }
  return "";
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function onlyChild(children: ReactNode): ReactElement | null {
  const list = Array.isArray(children)
    ? children.filter((c) => c != null && c !== "")
    : [children];
  if (list.length !== 1) return null;
  const child = list[0];
  if (child && typeof child === "object" && "props" in child) {
    return child as ReactElement;
  }
  return null;
}

const components: Components = {
  h2({ children }) {
    const id = slugify(textFromChildren(children));
    return <h2 id={id}>{children}</h2>;
  },
  h3({ children }) {
    const id = slugify(textFromChildren(children));
    return <h3 id={id}>{children}</h3>;
  },
  p({ children }) {
    const child = onlyChild(children);
    if (child?.type === "a") {
      const href = (child.props as { href?: string }).href;
      const loomId = loomIdFromUrl(href);
      if (loomId) {
        const title = textFromChildren((child.props as { children?: React.ReactNode }).children);
        return <LoomEmbed id={loomId} title={title || "Tutoriel vidéo"} />;
      }
    }
    return <p>{children}</p>;
  },
  img({ src, alt }) {
    if (!src || typeof src !== "string") return null;
    return (
      <figure className="fatturi-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} loading="lazy" />
        {alt ? <figcaption>{alt}</figcaption> : null}
      </figure>
    );
  },
  ol({ children }) {
    return <ol className="fatturi-steps">{children}</ol>;
  },
};

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose-fatturi">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkFatturi]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
