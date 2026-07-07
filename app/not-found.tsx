import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Erreur 404</p>
      <h1 className="mt-4 font-serif text-4xl font-black text-navy-deep">Page introuvable</h1>
      <p className="mt-4 text-navy/65">
        Le maillon que vous cherchez est manquant. Revenons à des choses plus concrètes.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-ivoire transition-transform hover:-translate-y-0.5"
      >
        Retour au blog
      </Link>
    </div>
  );
}
