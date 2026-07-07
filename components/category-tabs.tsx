import Link from "next/link";
import { CATEGORIES, type CategorySlug } from "@/lib/posts";

export function CategoryTabs({ active }: { active: CategorySlug | "all" }) {
  const base =
    "rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap";
  const on = "bg-navy text-ivoire";
  const off = "bg-white text-navy/70 border border-black/[0.08] hover:border-navy/30 hover:text-navy";
  return (
    <div className="flex flex-wrap gap-2.5">
      <Link href="/" className={`${base} ${active === "all" ? on : off}`}>
        Tous
      </Link>
      {CATEGORIES.map((c) => (
        <Link
          key={c.slug}
          href={`/categorie/${c.slug}`}
          className={`${base} ${active === c.slug ? on : off}`}
        >
          {c.label}
        </Link>
      ))}
    </div>
  );
}
