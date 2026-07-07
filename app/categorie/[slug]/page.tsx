import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  categoryOf,
  getPostsByCategory,
  type CategorySlug,
} from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { CategoryTabs } from "@/components/category-tabs";
import { CtaBand } from "@/components/cta-band";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

function isCategory(slug: string): slug is CategorySlug {
  return CATEGORIES.some((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCategory(slug)) return {};
  const cat = categoryOf(slug);
  return {
    title: cat.label,
    description: cat.blurb,
    alternates: { canonical: `/categorie/${slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCategory(slug)) notFound();
  const cat = categoryOf(slug);
  const posts = getPostsByCategory(slug);

  return (
    <div className="pb-24">
      <section className="dotted-ink border-b border-black/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Catégorie</p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-tight text-navy-deep sm:text-5xl">
            {cat.label}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/65">{cat.blurb}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
        <CategoryTabs active={slug} />
        {posts.length ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-navy/60">Aucun article dans cette catégorie pour l&apos;instant.</p>
        )}
      </section>

      <div className="pt-24">
        <CtaBand />
      </div>
    </div>
  );
}
