// Decks de carrousels (J2–J4), data-driven. Un deck = liste de slides typées.
export type Slide =
  | { kind: "cover"; kicker: string; title: string }
  | { kind: "stat"; kicker: string; big: string; unit: string; body: string }
  | { kind: "point"; n: number; kicker: string; title: string; body: string }
  | { kind: "myth"; myth: string; reality: string }
  | { kind: "cta"; title: string; body: string };

export const DECKS: Record<string, Slide[]> = {
  cost: [
    { kind: "cover", kicker: "Le coût caché", title: "Le vrai prix de facturer à la main." },
    {
      kind: "stat",
      kicker: "Le temps",
      big: "20 h",
      unit: "par mois",
      body: "300 ventes × 4 min de saisie. À refaire chaque mois.",
    },
    {
      kind: "point",
      n: 1,
      kicker: "Les erreurs",
      title: "Un risque à chaque ligne",
      body: "TVA, montants, mentions légales : chaque saisie manuelle peut coûter cher.",
    },
    {
      kind: "point",
      n: 2,
      kicker: "La charge mentale",
      title: "Penser à tout",
      body: "Facturer, relancer, ne rien oublier — en plus de faire tourner la boutique.",
    },
    {
      kind: "cta",
      title: "Fatturi remet le compteur à 0.",
      body: "Chaque vente devient une facture envoyée par email, automatiquement.",
    },
  ],

  myths: [
    { kind: "cover", kicker: "Idées reçues", title: "Ce qu'on croit (à tort) sur ses factures." },
    { kind: "myth", myth: "« Facturer, ça prend 2 minutes. »", reality: "× 300 ventes = 20 h par mois, à la main." },
    {
      kind: "myth",
      myth: "« La réforme 2026, c'est pour les grandes entreprises. »",
      reality: "Toutes les entreprises assujetties à la TVA sont concernées.",
    },
    {
      kind: "myth",
      myth: "« Automatiser sa facturation, c'est compliqué. »",
      reality: "Stripe, PayPal, Shopify : branchés en quelques clics.",
    },
    {
      kind: "cta",
      title: "Fatturi s'occupe de tout.",
      body: "De la vente encaissée à la facture envoyée par email, sans vous.",
    },
  ],

  recap: [
    { kind: "cover", kicker: "Avant / Après", title: "Pourquoi les e-commerçants passent à Fatturi." },
    {
      kind: "point",
      n: 1,
      kicker: "Multi-canaux",
      title: "Tout au même endroit",
      body: "Stripe, PayPal, Shopify réunis dans un seul outil de facturation.",
    },
    {
      kind: "point",
      n: 2,
      kicker: "Zéro saisie",
      title: "Facturé automatiquement",
      body: "Chaque vente devient une facture PDF envoyée par email à votre client.",
    },
    {
      kind: "point",
      n: 3,
      kicker: "Prêt pour 2026",
      title: "Aucune migration dans l'urgence",
      body: "Le jour J, vos factures partent via une PDP agréée. Rien à changer.",
    },
    {
      kind: "cta",
      title: "Encaissé aujourd'hui, facturé aussitôt.",
      body: "Rejoignez les indépendants qui prennent une longueur d'avance.",
    },
  ],
};

export const deckLength = (deck: string) => DECKS[deck]?.length ?? 0;
