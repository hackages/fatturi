import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkFatturi } from "@/lib/remark-fatturi";

export function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose-fatturi">
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkFatturi]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
