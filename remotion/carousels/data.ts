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

  // ───────── J5 · « Suis-je concerné ? » ─────────
  concerned: [
    { kind: "cover", kicker: "Suis-je concerné ?", title: "La réforme 2026 : concerné, ou pas ?" },
    {
      kind: "point",
      n: 1,
      kicker: "Réception",
      title: "Obligatoire pour tous",
      body: "Dès le 1er sept. 2026, toute entreprise — même micro, même sans TVA — doit pouvoir recevoir ses factures en électronique.",
    },
    {
      kind: "point",
      n: 2,
      kicker: "Émission",
      title: "Selon votre taille",
      body: "TPE, micro-entreprises et auto-entrepreneurs émettent leurs factures B2B en électronique à partir du 1er sept. 2027.",
    },
    {
      kind: "point",
      n: 3,
      kicker: "Peu importe le CA",
      title: "Même à 0 €",
      body: "Le niveau de chiffre d'affaires n'exonère de rien. Auto-entrepreneur, petit volume : vous êtes concerné.",
    },
    {
      kind: "cta",
      title: "Fatturi vous met en règle.",
      body: "Vous branchez vos paiements ; la conformité 2026-2027 suit, sans migration dans l'urgence.",
    },
  ],

  // ───────── J6 · Vendre en ligne / plateformes ─────────
  channels: [
    { kind: "cover", kicker: "Vendre en ligne", title: "Qui facture quoi, selon votre canal ?" },
    {
      kind: "point",
      n: 1,
      kicker: "Clients particuliers",
      title: "B2C = e-reporting",
      body: "Pas de facture électronique vers un particulier, mais les données de vos encaissements doivent être transmises.",
    },
    {
      kind: "point",
      n: 2,
      kicker: "Marketplaces",
      title: "Amazon, Uber, Vinted…",
      body: "La plateforme peut facturer pour vous, mais votre e-reporting — et vos ventes hors plateforme — restent à votre charge.",
    },
    {
      kind: "point",
      n: 3,
      kicker: "Vente directe",
      title: "Stripe · PayPal · Shopify",
      body: "Chaque encaissement devient une facture conforme, prête pour le e-reporting.",
    },
    {
      kind: "cta",
      title: "Fatturi centralise tout.",
      body: "Un seul outil pour vos factures et vos données, quel que soit le canal de vente.",
    },
  ],

  // ───────── J7 · Objections (outil / format / sécurité / coût) ─────────
  objections: [
    { kind: "cover", kicker: "Idées reçues", title: "Ce qu'on croit sur la facture électronique." },
    {
      kind: "myth",
      myth: "« Ma facture par email, c'est déjà électronique. »",
      reality: "Non : il faut un format structuré (Factur-X = PDF lisible + données XML).",
    },
    {
      kind: "myth",
      myth: "« Ces plateformes vont se faire pirater. »",
      reality: "Les PDP sont certifiées par l'État : sécurité et chiffrement obligatoires.",
    },
    {
      kind: "myth",
      myth: "« Encore un abonnement pour rien. »",
      reality: "Le temps de saisie coûte plus cher ; Fatturi automatise, le portail public couvre le minimum.",
    },
    {
      kind: "cta",
      title: "Fatturi, prêt et conforme.",
      body: "Vos factures partent via une plateforme agréée. Sécurisé, automatique, sans y penser.",
    },
  ],

  // ───────── J11 · Clients particuliers / B2C ─────────
  b2c: [
    { kind: "cover", kicker: "Clients particuliers", title: "Je ne facture que des particuliers…" },
    {
      kind: "myth",
      myth: "« Donc la réforme ne me concerne pas. »",
      reality: "Faux. En B2C, pas de facture électronique — mais le e-reporting, oui.",
    },
    {
      kind: "point",
      n: 1,
      kicker: "B2C",
      title: "Pas d'e-facture client",
      body: "Tu n'as pas à envoyer une facture électronique à un particulier.",
    },
    {
      kind: "point",
      n: 2,
      kicker: "E-reporting",
      title: "Tes encaissements, déclarés",
      body: "Les données de tes ventes aux particuliers doivent être transmises à l'administration.",
    },
    {
      kind: "cta",
      title: "Fatturi prépare tes données.",
      body: "Coiffeuse, taxi, thérapeute, aide à domicile : on centralise tes paiements sans y passer tes soirées.",
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
