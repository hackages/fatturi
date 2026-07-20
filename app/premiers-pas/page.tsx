import type { Metadata } from "next";
import Link from "next/link";
import { PremiersPasChecklist } from "@/components/premiers-pas-checklist";
import { SETUP_STEPS } from "@/lib/premiers-pas";

export const metadata: Metadata = {
  title: "Premiers pas avec Fatturi — SIRET, Stripe, abonnement",
  description:
    "Checklist de démarrage Fatturi : SIRET dans Paramètres, Stripe si besoin, première facture, puis abonnement avec le code promo reçu dans l’invitation.",
  alternates: { canonical: "/premiers-pas" },
  openGraph: {
    type: "article",
    title: "Premiers pas avec Fatturi",
    description:
      "Checklist : infos entreprise (SIRET), Stripe optionnel, 1re facture, abonnement avec code promo.",
  },
  robots: { index: true, follow: true },
};

export default function PremiersPasPage() {
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Premiers pas avec Fatturi",
    description:
      "Renseigner l’entreprise avec le SIRET, connecter Stripe si applicable, émettre une première facture, puis choisir un abonnement avec un code promo.",
    totalTime: "PT15M",
    inLanguage: "fr-FR",
    step: SETUP_STEPS.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.hint,
    })),
  };

  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />

      <header className="dotted-ink border-b border-black/[0.06]">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-navy/50">
            <Link href="/" className="transition-colors hover:text-navy">
              Blog
            </Link>
            <span>/</span>
            <span className="text-navy/70">Premiers pas</span>
          </nav>

          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            Checklist de démarrage · ~15 min
          </p>
          <h1 className="mt-4 font-serif text-4xl font-black leading-[1.08] text-navy-deep sm:text-[2.9rem]">
            Premiers pas avec Fatturi
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy/65">
            Suivez la progression dans{" "}
            <strong className="font-semibold text-navy">Paramètres</strong>{" "}
            (entreprise / SIRET, 1re facture, Stripe si besoin), puis choisissez
            un{" "}
            <strong className="font-semibold text-navy">abonnement</strong> avec
            le code promo reçu dans l’invitation.
          </p>
          <p className="mt-4 text-sm text-navy/50">
            Connectez-vous d’abord sur{" "}
            <a
              href="https://fatturi.com"
              className="font-medium text-sage underline underline-offset-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              fatturi.com
            </a>
            , gardez cet onglet ouvert, et cochez au fil de l’eau.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8">
        <PremiersPasChecklist />
      </div>
    </div>
  );
}
