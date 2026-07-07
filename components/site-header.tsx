import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/posts";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Le blog Fatturi — accueil">
          <Image src="/logo-full.png" alt="Fatturi" width={108} height={40} priority className="h-[26px] w-auto" />
          <span className="hidden select-none items-center gap-3 sm:flex">
            <span className="h-4 w-px bg-black/15" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-navy/70">Blog</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/categorie/${c.slug}`}
              className="text-sm font-medium text-navy/75 transition-colors hover:text-navy"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://fatturi.com"
            className="hidden text-sm font-medium text-navy/70 transition-colors hover:text-navy sm:inline"
          >
            fatturi.com ↗
          </a>
          <a
            href="https://fatturi.com"
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy-deep transition-transform hover:-translate-y-px hover:bg-gold-soft"
          >
            Accès prioritaire
          </a>
        </div>
      </div>
    </header>
  );
}
