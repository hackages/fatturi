import Link from "next/link";
import { categoryOf, formatDate, type Post } from "@/lib/posts";
import { PostThumbnail } from "@/components/post-thumbnail";
import { CategoryPill } from "@/components/category-pill";

export function FeaturedCard({ post }: { post: Post }) {
  const cat = categoryOf(post.category);
  return (
    <article className="group grid overflow-hidden rounded-3xl border border-black/[0.07] bg-white transition-shadow hover:shadow-[0_28px_60px_-30px_rgba(19,44,70,0.4)] md:grid-cols-2">
      <Link href={`/${post.slug}`} className="block">
        <PostThumbnail theme={post.theme} size="featured" className="h-64 w-full md:h-full md:min-h-[22rem]" />
      </Link>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <div className="mb-4 flex items-center gap-3">
          <CategoryPill label={cat.label} accent={cat.accent} />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">À la une</span>
        </div>
        <h2 className="font-serif text-3xl font-black leading-tight text-navy-deep sm:text-[2.4rem]">
          <Link href={`/${post.slug}`} className="transition-colors group-hover:text-navy">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-navy/65">{post.excerpt}</p>
        <div className="mt-6 flex items-center gap-4 text-sm text-navy/50">
          <span>{post.author}</span>
          <span className="h-1 w-1 rounded-full bg-navy/30" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="h-1 w-1 rounded-full bg-navy/30" />
          <span>{post.readingMin} min</span>
        </div>
        <Link
          href={`/${post.slug}`}
          className="mt-7 inline-block w-fit rounded-full bg-navy px-6 py-3 text-sm font-semibold text-ivoire transition-transform hover:-translate-y-0.5"
        >
          Lire l&apos;article →
        </Link>
      </div>
    </article>
  );
}
