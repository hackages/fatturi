// Plan de contenu J2–J7 — LinkedIn Page (Fatturi) + Instagram + TikTok.
// Angles J2–J4 : « coût caché » (J2), « idées reçues » (J3), « avant / après » (J4).
// Angles J5–J7 (basés sur les vraies questions clients — docs/questions.txt) :
// « Suis-je concerné ? » (J5), « Vendre en ligne / plateformes » (J6),
// « Objections : format, sécurité, coût » (J7). Cible : e-commerçants / indépendants.
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

const TAGS_TT =
  "#facturation #ecommerce #entrepreneur #freelance #stripe #shopify #autoentrepreneur #facturationélectronique #vendreenligne #business2026 #pourtoi";

// Ajoute le bloc hashtags façon playbook (séparateur « . » sur sa propre ligne).
const withTags = (body, tags) => `${body}\n.\n${tags}`;

// Noms lisibles des vidéos une fois sur Google Drive (clé = nom de fichier
// source). La manager y ajoute musique + voix : le nom doit dire quel jour,
// quel angle, quel format et pour quelle(s) plateforme(s).
export const VIDEO_LABELS = {
  "j2-counter-reel-li.mp4": "J2 · Coût caché — Vidéo compteur (LinkedIn 4:5)",
  "j2-counter-reel.mp4": "J2 · Coût caché — Reel compteur (Instagram · TikTok, 9:16)",
  "j3-myths-reel-li.mp4": "J3 · Idées reçues — Vidéo (LinkedIn 4:5)",
  "j3-myths-reel.mp4": "J3 · Idées reçues — Reel (Instagram · TikTok, 9:16)",
  "j4-beforeafter-reel-li.mp4": "J4 · Avant/Après — Vidéo (LinkedIn 4:5)",
  "j4-beforeafter-reel.mp4": "J4 · Avant/Après — Reel (Instagram · TikTok, 9:16)",
  "j5-concerned-reel-li.mp4": "J5 · Suis-je concerné — Vidéo (LinkedIn 4:5)",
  "j5-concerned-reel.mp4": "J5 · Suis-je concerné — Reel (Instagram · TikTok, 9:16)",
  "j6-channels-reel-li.mp4": "J6 · Vendre en ligne — Vidéo (LinkedIn 4:5)",
  "j6-channels-reel.mp4": "J6 · Vendre en ligne — Reel (Instagram · TikTok, 9:16)",
  "j7-format-reel-li.mp4": "J7 · PDF ≠ e-facture — Vidéo (LinkedIn 4:5)",
  "j7-format-reel.mp4": "J7 · PDF ≠ e-facture — Reel (Instagram · TikTok, 9:16)",
  "j1-screen-demo.mp4": "Concept · Démo produit (Instagram · TikTok, 9:16)",
};

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

  {
    key: "j2-tt-reel",
    day: "2026-07-07",
    time: "12:30",
    channel: "tiktok",
    label: "J2 · TikTok · Reel compteur",
    video: { file: "public/campaign/j2-counter-reel.mp4", thumbnail: "public/campaign/j2-counter-thumb.png" },
    text: withTags(
      `20 heures. Par mois. Juste pour recopier des factures. ⏱️

Une boutique à 300 ventes/mois y passe 3 jours de travail par an. Avec Fatturi : 0.

Chaque vente Stripe, PayPal ou Shopify → une facture envoyée automatiquement. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j2-tt-reel-concept",
    day: "2026-07-07",
    time: "19:00",
    channel: "tiktok",
    label: "J2 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Entre ton paiement et ta facture, il manque un maillon. 🔗

Fatturi le remplace : la vente encaissée devient une facture PDF envoyée par email à ton client. Automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
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

  // ─────────────────────── J5 · Suis-je concerné ? ───────────────────────
  {
    key: "j5-li-text",
    day: "2026-07-13",
    time: "08:30",
    channel: "page",
    label: "J5 · LinkedIn · Post texte (suis-je concerné ?)",
    text: withTags(
      `« Je ne suis pas à la TVA, ça ne me concerne pas. » On l'entend beaucoup. C'est faux.

La réforme de la facturation électronique repose sur deux obligations à ne pas confondre :

1. RECEVOIR des factures électroniques — obligatoire pour TOUTES les entreprises dès le 1er septembre 2026. Oui, même en micro-entreprise, même en franchise en base de TVA, même auto-entrepreneur.

2. ÉMETTRE ses factures entre professionnels au format électronique — à partir du 1er septembre 2027 pour les TPE, micro-entreprises et auto-entrepreneurs.

Et le niveau de chiffre d'affaires n'y change rien : que vous fassiez 500 € ou 50 000 €, vous êtes concerné.

La bonne nouvelle : anticiper coûte bien moins cher que subir la réforme dans l'urgence. En branchant vos paiements dès maintenant, Fatturi génère vos factures automatiquement — et le jour où l'obligation s'applique, elles partent via une plateforme agréée.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j5-li-video",
    day: "2026-07-13",
    time: "12:30",
    channel: "page",
    label: "J5 · LinkedIn · Vidéo concerné (4:5)",
    video: { file: "public/campaign/j5-concerned-reel-li.mp4", thumbnail: "public/campaign/j5-concerned-thumb-li.png" },
    text: withTags(
      `Auto-entrepreneur, micro, pas à la TVA ? Vous êtes concerné aussi. 👇

Réception dès 2026, émission dès 2027 : on résume la réforme en 15 secondes, sans jargon.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j5-li-carousel",
    day: "2026-07-13",
    time: "19:00",
    channel: "page",
    label: "J5 · LinkedIn · Carrousel concerné",
    images: [
      { file: "public/campaign/j5-concerned-1.png" },
      { file: "public/campaign/j5-concerned-2.png" },
      { file: "public/campaign/j5-concerned-3.png" },
      { file: "public/campaign/j5-concerned-4.png" },
      { file: "public/campaign/j5-concerned-5.png" },
    ],
    text: withTags(
      `Concerné par la facturation électronique, ou pas ? 🔗

Faites glisser pour le savoir en 3 points : réception 2026, émission 2027, et pourquoi le chiffre d'affaires n'y change rien.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j5-ig-carousel",
    day: "2026-07-13",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J5 · Instagram · Carrousel concerné",
    images: [
      { file: "public/campaign/j5-concerned-1.png" },
      { file: "public/campaign/j5-concerned-2.png" },
      { file: "public/campaign/j5-concerned-3.png" },
      { file: "public/campaign/j5-concerned-4.png" },
      { file: "public/campaign/j5-concerned-5.png" },
    ],
    text: withTags(
      `« Ça me concerne, moi ? » 🤔

Micro, auto-entrepreneur, pas à la TVA : oui, la réforme te concerne. Swipe pour comprendre en 3 points 👉

Fatturi te met en règle sans rien changer à tes habitudes.`,
      TAGS_IG
    ),
  },
  {
    key: "j5-ig-reel",
    day: "2026-07-13",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J5 · Instagram · Reel concerné",
    video: { file: "public/campaign/j5-concerned-reel.mp4", thumbnail: "public/campaign/j5-concerned-thumb.png" },
    text: withTags(
      `Pas à la TVA ? Auto-entrepreneur ? Concerné quand même. ⚠️

Réception 2026, émission 2027 : la réforme en 15 secondes.

Fatturi automatise tout, de la vente à la facture. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j5-ig-card",
    day: "2026-07-13",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J5 · Instagram · Card auto-entrepreneur",
    image: { file: "public/campaign/card-autoentrepreneur.png" },
    text: withTags(
      `Auto-entrepreneur ? Concerné, toi aussi. 📌

Réception dès 2026, émission dès 2027. Le montant de ton CA n'y change rien.

Prends de l'avance sans stress avec Fatturi.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  {
    key: "j5-tt-reel",
    day: "2026-07-13",
    time: "12:30",
    channel: "tiktok",
    label: "J5 · TikTok · Reel concerné",
    video: { file: "public/campaign/j5-concerned-reel.mp4", thumbnail: "public/campaign/j5-concerned-thumb.png" },
    text: withTags(
      `POV : t'es auto-entrepreneur et tu crois que la réforme 2026 c'est pas pour toi. 👀

Réception dès 2026, émission dès 2027 — spoiler : t'es concerné.

Fatturi s'en occupe pour toi. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j5-tt-reel-concept",
    day: "2026-07-13",
    time: "19:00",
    channel: "tiktok",
    label: "J5 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Être prêt pour la facturation électronique sans y penser. 🔗

Tu branches Stripe, PayPal ou Shopify une fois — chaque vente devient une facture envoyée automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────────── J6 · Vendre en ligne ───────────────────────
  {
    key: "j6-li-text",
    day: "2026-07-14",
    time: "08:30",
    channel: "page",
    label: "J6 · LinkedIn · Post texte (qui facture quoi)",
    text: withTags(
      `Vous vendez en ligne ? La vraie question n'est pas « dois-je facturer ? » mais « qui facture, et comment ? ». Trois situations, trois réponses.

1. Vous vendez à des particuliers (B2C).
Pas de facture électronique à leur envoyer, mais une obligation de e-reporting : les données de vos encaissements doivent être transmises à l'administration.

2. Vous vendez via une marketplace (Amazon, Uber, Vinted…).
La plateforme peut émettre la facture, mais votre e-reporting reste votre responsabilité — tout comme vos ventes réalisées en dehors de la plateforme.

3. Vous encaissez en direct (Stripe, PayPal, Shopify).
Chaque paiement doit devenir une facture conforme, prête pour le e-reporting.

Le point commun : dans tous les cas, il faut transmettre des données proprement, sans y passer vos soirées.

Fatturi se branche sur vos paiements et centralise tout — factures et données — quel que soit votre canal de vente.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j6-li-video",
    day: "2026-07-14",
    time: "12:30",
    channel: "page",
    label: "J6 · LinkedIn · Vidéo canaux (4:5)",
    video: { file: "public/campaign/j6-channels-reel-li.mp4", thumbnail: "public/campaign/j6-channels-thumb-li.png" },
    text: withTags(
      `B2C, marketplace, vente directe : qui facture vraiment ? 👇

On clarifie les 3 cas de figure du e-commerce en 15 secondes — et le rôle du e-reporting dans chacun.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j6-li-carousel",
    day: "2026-07-14",
    time: "19:00",
    channel: "page",
    label: "J6 · LinkedIn · Carrousel canaux",
    images: [
      { file: "public/campaign/j6-channels-1.png" },
      { file: "public/campaign/j6-channels-2.png" },
      { file: "public/campaign/j6-channels-3.png" },
      { file: "public/campaign/j6-channels-4.png" },
      { file: "public/campaign/j6-channels-5.png" },
    ],
    text: withTags(
      `3 façons de vendre en ligne, 3 réponses face à la réforme. 🔗

Particuliers, marketplaces, paiements directs : faites glisser pour voir qui facture quoi — et ce que Fatturi automatise.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j6-ig-carousel",
    day: "2026-07-14",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J6 · Instagram · Carrousel canaux",
    images: [
      { file: "public/campaign/j6-channels-1.png" },
      { file: "public/campaign/j6-channels-2.png" },
      { file: "public/campaign/j6-channels-3.png" },
      { file: "public/campaign/j6-channels-4.png" },
      { file: "public/campaign/j6-channels-5.png" },
    ],
    text: withTags(
      `Tu vends sur Shopify, Vinted ou Insta ? 🛍️

Voilà ce qui change pour toi selon ton canal de vente. Swipe pour les 3 cas 👉

Fatturi centralise tout. Encaissé le matin, facturé avant midi.`,
      TAGS_IG
    ),
  },
  {
    key: "j6-ig-reel",
    day: "2026-07-14",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J6 · Instagram · Reel canaux",
    video: { file: "public/campaign/j6-channels-reel.mp4", thumbnail: "public/campaign/j6-channels-thumb.png" },
    text: withTags(
      `Tu vends en ligne ? Qui fait tes factures, vraiment ? 🤯

B2C, marketplace, vente directe : 3 cas en 15 secondes.

Fatturi s'occupe de tout, quel que soit ton canal. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j6-ig-card",
    day: "2026-07-14",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J6 · Instagram · Card citation (réutilisation)",
    image: { file: "public/campaign/card-morning-invoiced.png" },
    text: withTags(
      `« Encaissé le matin, facturé avant midi. » ☕

Stripe, PayPal, Shopify : chaque vente devient une facture envoyée automatiquement à ton client.

C'est toute l'idée derrière Fatturi.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  {
    key: "j6-tt-reel",
    day: "2026-07-14",
    time: "12:30",
    channel: "tiktok",
    label: "J6 · TikTok · Reel canaux",
    video: { file: "public/campaign/j6-channels-reel.mp4", thumbnail: "public/campaign/j6-channels-thumb.png" },
    text: withTags(
      `Tu vends en ligne mais tu sais pas qui fait tes factures ? 👀

B2C, Amazon/Vinted, Stripe direct : je t'explique en 15 secondes.

Fatturi centralise tout. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j6-tt-reel-concept",
    day: "2026-07-14",
    time: "19:00",
    channel: "tiktok",
    label: "J6 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Le maillon manquant entre ton paiement et ta facture. 🔗

Fatturi le remplace : la vente encaissée devient une facture PDF envoyée par email. Automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────── J7 · Objections (format/sécurité/coût) ───────────────────
  {
    key: "j7-li-text",
    day: "2026-07-15",
    time: "08:30",
    channel: "page",
    label: "J7 · LinkedIn · Post texte (PDF ≠ e-facture)",
    text: withTags(
      `« Ma facture, je l'envoie par mail, donc c'est électronique. » Pas tout à fait — et c'est le malentendu le plus fréquent sur la réforme.

Une facture électronique, ce n'est pas un PDF envoyé par email. C'est un format structuré (le standard Factur-X : un PDF lisible + un fichier de données), transmis via une plateforme agréée. C'est ce qui permet à l'administration et à vos clients de la traiter automatiquement.

Trois objections qu'on entend souvent, et la réalité :

• « C'est une usine à gaz. » → Une fois vos paiements branchés, la facture part toute seule. Vous ne faites rien de plus.
• « Ces plateformes vont se faire pirater. » → Les plateformes agréées sont certifiées par l'État, avec des exigences de sécurité et de chiffrement.
• « Encore un abonnement pour rien. » → Le temps passé à facturer à la main coûte bien plus cher. Le portail public reste gratuit pour le strict minimum.

Fatturi rend tout ça invisible : vos factures partent au bon format, via une plateforme agréée, sans que vous y pensiez.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j7-li-video",
    day: "2026-07-15",
    time: "12:30",
    channel: "page",
    label: "J7 · LinkedIn · Vidéo format (4:5)",
    video: { file: "public/campaign/j7-format-reel-li.mp4", thumbnail: "public/campaign/j7-format-thumb-li.png" },
    text: withTags(
      `Un PDF par email ≠ une facture électronique. 👇

On explique la différence entre un simple PDF et le format Factur-X — celui qu'attend la réforme.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j7-li-carousel",
    day: "2026-07-15",
    time: "19:00",
    channel: "page",
    label: "J7 · LinkedIn · Carrousel objections",
    images: [
      { file: "public/campaign/j7-objections-1.png" },
      { file: "public/campaign/j7-objections-2.png" },
      { file: "public/campaign/j7-objections-3.png" },
      { file: "public/campaign/j7-objections-4.png" },
      { file: "public/campaign/j7-objections-5.png" },
    ],
    text: withTags(
      `Les idées reçues sur la facture électronique (et la réalité). 🔗

Format, sécurité, coût : faites glisser pour démêler le vrai du faux — et voir comment Fatturi s'en occupe.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j7-ig-carousel",
    day: "2026-07-15",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J7 · Instagram · Carrousel objections",
    images: [
      { file: "public/campaign/j7-objections-1.png" },
      { file: "public/campaign/j7-objections-2.png" },
      { file: "public/campaign/j7-objections-3.png" },
      { file: "public/campaign/j7-objections-4.png" },
      { file: "public/campaign/j7-objections-5.png" },
    ],
    text: withTags(
      `Ta facture PDF suffit ? Pas en 2026. 🙅

On démêle 3 idées reçues sur la facture électronique : format, sécurité, coût. Swipe 👉

Fatturi s'occupe de tout, au bon format.`,
      TAGS_IG
    ),
  },
  {
    key: "j7-ig-reel",
    day: "2026-07-15",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J7 · Instagram · Reel format",
    video: { file: "public/campaign/j7-format-reel.mp4", thumbnail: "public/campaign/j7-format-thumb.png" },
    text: withTags(
      `« Ma facture je l'envoie par mail. » 🚩 Ça, c'est pas une facture électronique.

PDF vs Factur-X : la différence en 15 secondes.

Fatturi envoie tes factures au bon format, via une plateforme agréée. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j7-ig-card",
    day: "2026-07-15",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J7 · Instagram · Card sécurité",
    image: { file: "public/campaign/card-pdp-security.png" },
    text: withTags(
      `Une plateforme agréée par l'État. 🔒

Données chiffrées, plateforme certifiée : tes factures partent en sécurité. Fatturi s'appuie sur une PDP agréée.

Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  {
    key: "j7-tt-reel",
    day: "2026-07-15",
    time: "12:30",
    channel: "tiktok",
    label: "J7 · TikTok · Reel format",
    video: { file: "public/campaign/j7-format-reel.mp4", thumbnail: "public/campaign/j7-format-thumb.png" },
    text: withTags(
      `Non, ta facture PDF par mail c'est pas une facture électronique. 😬

Factur-X = PDF + données. Je t'explique en 15 secondes.

Fatturi s'en occupe, au bon format. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j7-tt-reel-concept",
    day: "2026-07-15",
    time: "19:00",
    channel: "tiktok",
    label: "J7 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `La conformité 2026 sans lever le petit doigt. 🔗

Tu branches tes paiements une fois — Fatturi génère et envoie tes factures au bon format, automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
];
