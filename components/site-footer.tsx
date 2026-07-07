import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/posts";

export function SiteFooter() {
  return (
    <footer className="dotted relative mt-24 bg-navy-deep text-ivoire/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src="/logo-full-light.png" alt="Fatturi" width={150} height={56} className="h-8 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivoire/65">
            Le blog de Fatturi : la facturation électronique et la réforme 2026 expliquées aux
            indépendants et e-commerçants.
          </p>
          <p className="mt-6 font-serif text-lg text-ivoire">Encaissé aujourd&apos;hui, facturé aussitôt.</p>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Catégories</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/categorie/${c.slug}`} className="text-ivoire/70 transition-colors hover:text-ivoire">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Fatturi</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><a href="https://fatturi.com" className="text-ivoire/70 transition-colors hover:text-ivoire">Le produit</a></li>
            <li><a href="https://fatturi.com" className="text-ivoire/70 transition-colors hover:text-ivoire">Accès prioritaire</a></li>
            <li><a href="https://fatturi.com" className="text-ivoire/70 transition-colors hover:text-ivoire">Connexion</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-ivoire/55 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} FATTURI</p>
          <div className="flex gap-5">
            <a href="https://fatturi.com" className="transition-colors hover:text-ivoire/80">CGU</a>
            <a href="https://fatturi.com" className="transition-colors hover:text-ivoire/80">RGPD</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
