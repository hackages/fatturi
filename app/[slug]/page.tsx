import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  POSTS,
  getPost,
  getRelatedPosts,
  categoryOf,
  formatDate,
} from "@/lib/posts";
import { ArticleBody } from "@/components/article-body";
import { PostThumbnail } from "@/components/post-thumbnail";
import { PostCard } from "@/components/post-card";
import { CategoryPill } from "@/components/category-pill";
import { CtaBand } from "@/components/cta-band";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const cat = categoryOf(post.category);
  const related = getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Fatturi" },
    mainEntityOfPage: `https://blogs.fatturi.com/${post.slug}`,
  };

  return (
    <div className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* En-tête */}
      <header className="dotted-ink border-b border-black/[0.06]">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-navy/50">
            <Link href="/" className="transition-colors hover:text-navy">Blog</Link>
            <span>/</span>
            <Link href={`/categorie/${cat.slug}`} className="transition-colors hover:text-navy">
              {cat.label}
            </Link>
          </nav>
          <CategoryPill label={cat.label} accent={cat.accent} />
          <h1 className="mt-5 font-serif text-4xl font-black leading-[1.08] text-navy-deep sm:text-[2.9rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-navy/65">{post.excerpt}</p>
          <div className="mt-7 flex items-center gap-4 text-sm text-navy/55">
            <span className="font-medium text-navy">{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-navy/30" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-navy/30" />
            <span>{post.readingMin} min de lecture</span>
          </div>
        </div>
      </header>

      {/* Visuel */}
      <div className="mx-auto max-w-4xl px-5 pt-10 sm:px-8">
        <PostThumbnail theme={post.theme} size="featured" className="aspect-[2/1] w-full rounded-3xl" />
      </div>

      {/* Corps */}
      <article className="mx-auto max-w-3xl px-5 pt-12 sm:px-8">
        <ArticleBody content={post.content} />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] pt-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-navy font-serif text-lg font-bold text-ivoire">
              {post.author.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-semibold text-navy-deep">{post.author}</p>
              <p className="text-xs text-navy/55">Cofondatrice de Fatturi</p>
            </div>
          </div>
          <Link href="/" className="text-sm font-semibold text-sage transition-colors hover:text-navy">
            ← Tous les articles
          </Link>
        </div>
      </article>

      {/* Articles liés */}
      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8">
          <h2 className="font-serif text-2xl font-bold text-navy-deep">À lire ensuite</h2>
          <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <PostCard key={r.slug} post={r} />
            ))}
          </div>
        </section>
      )}

      <div className="pt-24">
        <CtaBand />
      </div>
    </div>
  );
}
