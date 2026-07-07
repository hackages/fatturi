import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import { FeaturedCard } from "@/components/featured-card";
import { PostCard } from "@/components/post-card";
import { CategoryTabs } from "@/components/category-tabs";
import { CtaBand } from "@/components/cta-band";

export default function HomePage() {
  const featured = getFeaturedPost();
  const rest = getAllPosts().filter((p) => p.slug !== featured.slug);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="dotted-ink border-b border-black/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Le blog Fatturi</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-black leading-[1.05] text-navy-deep sm:text-5xl">
            La facturation électronique, sans le jargon.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/65">
            Réforme 2026, PDP, Factur-X, automatisation : nos guides et actualités pour les indépendants
            et e-commerçants qui veulent prendre de l&apos;avance — pas la migraine.
          </p>
        </div>
      </section>

      {/* À la une */}
      <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
        <FeaturedCard post={featured} />
      </section>

      {/* Liste + filtres */}
      <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
        <div className="flex flex-col gap-6 border-b border-black/[0.06] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-serif text-2xl font-bold text-navy-deep">Tous les articles</h2>
          <CategoryTabs active="all" />
        </div>
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <div className="pt-24">
        <CtaBand />
      </div>
    </div>
  );
}
