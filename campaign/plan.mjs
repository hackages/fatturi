// Plan de contenu J2–J4 — LinkedIn Page (Fatturi) + Instagram (fatturi_officiel).
// Angles : « coût caché de la facturation manuelle » (J2), « idées reçues » (J3),
// « avant / après » (J4). Cible : e-commerçants / indépendants.
//
// Convention playbook :
//   - Le premier commentaire Buffer est payant → les hashtags sont dans le texte,
//     séparés par une ligne « \n.\n ».
//   - Les reels IG portent leur cover en frame 0 (miniature du grid).
//   - Les médias sont référencés par fichier ; le runner les convertit en URL
//     publique (MEDIA_BASE_URL) car Buffer récupère le média via une URL.
//
// Créneaux : 08:30 / 12:30 / 19:00 (Europe/Paris, +02:00 en juillet).

const TAGS_LI =
  "#facturation #ecommerce #Stripe #freelance #indépendants #facturationélectronique2026";

const TAGS_IG =
  "#facturation #ecommerce #entrepreneur #freelance #stripe #shopify #paypal #autoentrepreneur #comptabilité #facturationélectronique #vendreenligne #ecommercefrance #business2026";

// Ajoute le bloc hashtags façon playbook (séparateur « . » sur sa propre ligne).
const withTags = (body, tags) => `${body}\n.\n${tags}`;

export const PLAN = [
  // ───────────────────────── J2 · Le coût caché ─────────────────────────
  {
    key: "j2-li-text",
    day: "2026-07-07",
    time: "08:30",
    channel: "page",
    label: "J2 · LinkedIn · Post texte (coût caché)",
    text: withTags(
      `Facturer à la main ne vous coûte pas 4 minutes. Ça vous coûte 20 heures.

Faites le calcul d'un e-commerçant qui fait 300 ventes par mois :
→ 300 factures à créer,
→ ~4 minutes chacune (export, copier-coller, PDF, envoi),
→ = 20 heures par mois. Presque 3 jours de travail par an juste pour recopier des chiffres.

Et ces 20 heures ne sont pas les seules à coûter :
• le risque d'erreur (TVA, montant, mentions légales) à chaque saisie,
• la charge mentale de « ne rien oublier » en plus de faire tourner la boutique,
• les relances quand une facture manque.

Fatturi supprime cette ligne du budget. Chaque paiement Stripe, PayPal ou Shopify devient une facture envoyée par email, automatiquement. Le compteur retombe à 0.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j2-li-video",
    day: "2026-07-07",
    time: "12:30",
    channel: "page",
    label: "J2 · LinkedIn · Vidéo compteur (4:5)",
    video: { file: "public/campaign/j2-counter-reel-li.mp4", thumbnail: "public/campaign/j2-counter-thumb-li.png" },
    text: withTags(
      `20 heures par mois. C'est ce que coûte la facturation manuelle à une boutique qui fait 300 ventes. 👇

Avec Fatturi, ce compteur retombe à 0 : chaque vente devient une facture envoyée par email, sans intervention.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j2-li-carousel",
    day: "2026-07-07",
    time: "19:00",
    channel: "page",
    label: "J2 · LinkedIn · Carrousel coût",
    images: [
      { file: "public/campaign/j2-cost-1.png" },
      { file: "public/campaign/j2-cost-2.png" },
      { file: "public/campaign/j2-cost-3.png" },
      { file: "public/campaign/j2-cost-4.png" },
      { file: "public/campaign/j2-cost-5.png" },
    ],
    text: withTags(
      `Le vrai prix de facturer à la main (ce n'est pas que du temps). 🔗

Faites glisser pour voir les 3 postes de coût cachés derrière chaque facture recopiée — et comment Fatturi les remet à zéro.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j2-ig-carousel",
    day: "2026-07-07",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J2 · Instagram · Carrousel coût",
    images: [
      { file: "public/campaign/j2-cost-1.png" },
      { file: "public/campaign/j2-cost-2.png" },
      { file: "public/campaign/j2-cost-3.png" },
      { file: "public/campaign/j2-cost-4.png" },
      { file: "public/campaign/j2-cost-5.png" },
    ],
    text: withTags(
      `Facturer à la main, ça coûte combien vraiment ? 💸

Spoiler : 20 h par mois pour 300 ventes. Sans compter les erreurs et la charge mentale.

Swipe pour le détail 👉 et laisse Fatturi remettre le compteur à 0.
Encaissé le matin, facturé avant midi.`,
      TAGS_IG
    ),
  },
  {
    key: "j2-ig-reel",
    day: "2026-07-07",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J2 · Instagram · Reel compteur",
    video: { file: "public/campaign/j2-counter-reel.mp4", thumbnail: "public/campaign/j2-counter-thumb.png" },
    text: withTags(
      `20 heures. Par mois. Juste pour recopier des factures. ⏱️

Une boutique à 300 ventes/mois y passe 3 jours de travail par an. Avec Fatturi : 0.

Chaque vente Stripe, PayPal ou Shopify → une facture envoyée automatiquement. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j2-ig-reel-concept",
    day: "2026-07-07",
    time: "19:00",
    channel: "instagram",
    igType: "reel",
    label: "J2 · Instagram · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Entre ton paiement et ta facture, il manque un maillon. 🔗

Fatturi le remplace : la vente encaissée devient une facture PDF envoyée par email à ton client. Automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  // ───────────────────────── J3 · Idées reçues ─────────────────────────
  {
    key: "j3-li-text",
    day: "2026-07-08",
    time: "08:30",
    channel: "page",
    label: "J3 · LinkedIn · Post texte (idées reçues)",
    text: withTags(
      `3 idées reçues sur la facturation qui coûtent cher aux e-commerçants.

1. « Facturer, ça prend 2 minutes. »
Multipliez par 300 ventes : 20 heures par mois. La vraie question n'est pas le temps par facture, c'est le volume.

2. « La réforme 2026, c'est pour les grandes entreprises. »
Faux. Toutes les entreprises assujetties à la TVA sont concernées par la facturation électronique. Mieux vaut être prêt avant, pas dans l'urgence.

3. « Automatiser sa facturation, c'est compliqué. »
Plus maintenant. On branche Stripe, PayPal ou Shopify en quelques clics, et chaque vente devient une facture envoyée automatiquement.

La facturation manuelle n'est pas une fatalité — juste une habitude. Fatturi s'occupe de tout, de la vente encaissée à la facture envoyée.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j3-li-video",
    day: "2026-07-08",
    time: "12:30",
    channel: "page",
    label: "J3 · LinkedIn · Vidéo idées reçues (4:5)",
    video: { file: "public/campaign/j3-myths-reel-li.mp4", thumbnail: "public/campaign/j3-myths-thumb-li.png" },
    text: withTags(
      `« Facturer, ça prend 2 minutes. » Vraiment ? 👇

On démonte 3 idées reçues sur la facturation qui font perdre du temps (et de l'argent) aux e-commerçants.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j3-li-carousel",
    day: "2026-07-08",
    time: "19:00",
    channel: "page",
    label: "J3 · LinkedIn · Carrousel idées reçues",
    images: [
      { file: "public/campaign/j3-myths-1.png" },
      { file: "public/campaign/j3-myths-2.png" },
      { file: "public/campaign/j3-myths-3.png" },
      { file: "public/campaign/j3-myths-4.png" },
      { file: "public/campaign/j3-myths-5.png" },
    ],
    text: withTags(
      `Ce qu'on croit (à tort) sur ses factures. 🔗

3 idées reçues, 3 réalités. Faites glisser pour remettre les choses au clair — et voir comment Fatturi s'occupe de tout.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j3-ig-carousel",
    day: "2026-07-08",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J3 · Instagram · Carrousel idées reçues",
    images: [
      { file: "public/campaign/j3-myths-1.png" },
      { file: "public/campaign/j3-myths-2.png" },
      { file: "public/campaign/j3-myths-3.png" },
      { file: "public/campaign/j3-myths-4.png" },
      { file: "public/campaign/j3-myths-5.png" },
    ],
    text: withTags(
      `Non, facturer ne prend pas « 2 minutes ». 🙅

3 idées reçues sur la facturation qu'on entend tout le temps — et ce qui est vrai. Swipe 👉

Fatturi s'occupe de tout. Encaissé le matin, facturé avant midi.`,
      TAGS_IG
    ),
  },
  {
    key: "j3-ig-reel",
    day: "2026-07-08",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J3 · Instagram · Reel idées reçues",
    video: { file: "public/campaign/j3-myths-reel.mp4", thumbnail: "public/campaign/j3-myths-thumb.png" },
    text: withTags(
      `« Facturer, ça prend 2 minutes. » 🚩

× 300 ventes = 20 h/mois. On démonte 3 idées reçues sur la facturation en 15 secondes.

Fatturi s'occupe de tout, de la vente à la facture envoyée. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j3-ig-card",
    day: "2026-07-08",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J3 · Instagram · Card réforme 2026",
    image: { file: "public/campaign/card-reform-2026-2.png" },
    text: withTags(
      `2026, ce n'est pas « pour les grosses boîtes ». 📌

La facturation électronique devient obligatoire pour les entreprises à la TVA. Autant prendre de l'avance sans stress.

Fatturi te met en règle sans rien changer à tes habitudes.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  // ───────────────────────── J4 · Avant / Après ─────────────────────────
  {
    key: "j4-li-text",
    day: "2026-07-09",
    time: "08:30",
    channel: "page",
    label: "J4 · LinkedIn · Post texte (avant/après)",
    text: withTags(
      `La facturation d'un e-commerçant, le même mois, en deux versions.

AVANT :
→ exporter les ventes Stripe / PayPal,
→ recopier chaque client à la main,
→ générer chaque PDF, un par un,
→ n'oublier aucune vente,
→ renvoyer les factures manquantes.
Total : ~3 heures par mois, et une charge mentale permanente.

APRÈS :
→ vous branchez vos paiements une fois.
C'est tout. Chaque vente devient une facture envoyée par email, automatiquement. Total : 0 heure.

La différence n'est pas « un peu de temps gagné ». C'est une tâche entière qui disparaît de votre mois — et une conformité 2026 déjà en place, sans migration dans l'urgence.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j4-li-video",
    day: "2026-07-09",
    time: "12:30",
    channel: "page",
    label: "J4 · LinkedIn · Vidéo avant/après (4:5)",
    video: { file: "public/campaign/j4-beforeafter-reel-li.mp4", thumbnail: "public/campaign/j4-beforeafter-thumb-li.png" },
    text: withTags(
      `Votre facturation : avant / après Fatturi. 👇

Le même mois, deux réalités : ~3 heures de saisie manuelle d'un côté, 0 de l'autre. Vous branchez une fois, Fatturi facture à votre place.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j4-li-carousel",
    day: "2026-07-09",
    time: "19:00",
    channel: "page",
    label: "J4 · LinkedIn · Carrousel récap",
    images: [
      { file: "public/campaign/j4-recap-1.png" },
      { file: "public/campaign/j4-recap-2.png" },
      { file: "public/campaign/j4-recap-3.png" },
      { file: "public/campaign/j4-recap-4.png" },
      { file: "public/campaign/j4-recap-5.png" },
    ],
    text: withTags(
      `Pourquoi les e-commerçants passent à Fatturi. 🔗

Multi-canaux, zéro saisie, prêt pour 2026 : faites glisser pour les 3 raisons qui font la différence.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j4-ig-carousel",
    day: "2026-07-09",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J4 · Instagram · Carrousel récap",
    images: [
      { file: "public/campaign/j4-recap-1.png" },
      { file: "public/campaign/j4-recap-2.png" },
      { file: "public/campaign/j4-recap-3.png" },
      { file: "public/campaign/j4-recap-4.png" },
      { file: "public/campaign/j4-recap-5.png" },
    ],
    text: withTags(
      `Pourquoi les e-commerçants passent à Fatturi. ✨

Multi-canaux · zéro saisie · prêt pour 2026. Swipe pour les 3 raisons 👉

Encaissé le matin, facturé avant midi.`,
      TAGS_IG
    ),
  },
  {
    key: "j4-ig-reel",
    day: "2026-07-09",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J4 · Instagram · Reel avant/après",
    video: { file: "public/campaign/j4-beforeafter-reel.mp4", thumbnail: "public/campaign/j4-beforeafter-thumb.png" },
    text: withTags(
      `Ta facturation : avant vs après. ⚡

~3 h de saisie manuelle → 0. Tu branches une fois, Fatturi facture à ta place.

Chaque vente devient une facture envoyée automatiquement. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j4-ig-card",
    day: "2026-07-09",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J4 · Instagram · Card citation",
    image: { file: "public/campaign/card-morning-invoiced.png" },
    text: withTags(
      `« Encaissé le matin, facturé avant midi. » ☕

Sans y penser. Chaque vente devient une facture envoyée automatiquement à ton client.

C'est toute l'idée derrière Fatturi.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
];
