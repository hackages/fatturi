import Link from "next/link";
import { categoryOf, formatDate, type Post } from "@/lib/posts";
import { PostThumbnail } from "@/components/post-thumbnail";
import { CategoryPill } from "@/components/category-pill";

export function PostCard({ post }: { post: Post }) {
  const cat = categoryOf(post.category);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(19,44,70,0.35)]">
      <Link href={`/${post.slug}`} className="block">
        <PostThumbnail theme={post.theme} className="aspect-[16/10] w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3">
          <CategoryPill label={cat.label} accent={cat.accent} />
          <span className="text-xs text-navy/45">{post.readingMin} min de lecture</span>
        </div>
        <h3 className="font-serif text-xl font-bold leading-snug text-navy-deep">
          <Link href={`/${post.slug}`} className="transition-colors group-hover:text-navy">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-navy/60">{post.excerpt}</p>
        <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
          <time className="text-xs text-navy/45" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <Link
            href={`/${post.slug}`}
            className="text-sm font-semibold text-sage transition-colors hover:text-navy"
          >
            Lire →
          </Link>
        </div>
      </div>
    </article>
  );
}
