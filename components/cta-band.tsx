export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="dotted relative overflow-hidden rounded-3xl bg-navy px-8 py-16 text-center sm:px-16">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Prêt pour 2026</p>
          <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-black leading-tight text-ivoire sm:text-4xl">
            Vous encaissez en ligne ? Anticipez 2026.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ivoire/70">
            Rejoignez les indépendants qui prennent une longueur d&apos;avance. Chaque vente devient une
            facture envoyée automatiquement — dès aujourd&apos;hui.
          </p>
          <a
            href="https://fatturi.com"
            className="mt-8 inline-block rounded-full bg-gold px-7 py-3.5 font-semibold text-navy-deep transition-transform hover:-translate-y-0.5 hover:bg-gold-soft"
          >
            Demander un accès prioritaire
          </a>
          <p className="mt-3 text-xs text-ivoire/50">Formulaire rapide — réponse sous 48h.</p>
        </div>
      </div>
    </section>
  );
}
