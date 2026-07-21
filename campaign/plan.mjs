// Plan de contenu J2–J10 — LinkedIn Page (Fatturi) + Instagram + TikTok.
// Angles J2–J4 : « coût caché » (J2), « idées reçues » (J3), « avant / après » (J4).
// Angles J5–J7 (basés sur les vraies questions clients — docs/questions.txt) :
// « Suis-je concerné ? » (J5), « Vendre en ligne / plateformes » (J6),
// « Objections : format, sécurité, coût » (J7). Cible : e-commerçants / indépendants.
// Angles J8–J10 (tirés du plan SEO — docs/seo-content-plan.mdx) : « À partir de
// quand ? / calendrier » (J8), « Combien ça coûte vraiment ? » (J9), « Avant /
// après : la solution » (J10). Ces trois jours réutilisent les visuels déjà
// hébergés (jsDelivr) avec une copie neuve, pour refaire le plein de la file.
// Angle J11 : « Clients particuliers / B2C + e-reporting » — reel avec VO
// ElevenLabs (voix féminine FR) + musique acoustique chaude.
//
// Convention playbook :
//   - Le premier commentaire Buffer est payant → les hashtags sont dans le texte,
//     séparés par une ligne « \n.\n ».
//   - Les reels IG portent leur cover en frame 0 (miniature du grid).
//   - Les médias sont référencés par fichier ; le runner les convertit en URL
//     publique (MEDIA_BASE_URL) car Buffer récupère le média via une URL.
//   - LinkedIn carrousels → document PDF (document: { file, title, thumbnail }).
//     Les multi-images LinkedIn sortent en grille ; Instagram garde images: […].
//     Générer les PDF : npm run render:carousel-pdfs
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
  "j11-b2c-reel-li.mp4": "J11 · Clients particuliers / B2C — Vidéo (LinkedIn 4:5, VO + musique)",
  "j11-b2c-reel.mp4": "J11 · Clients particuliers / B2C — Reel (Instagram · TikTok, 9:16, VO + musique)",
  "j12-receive-reel-li.mp4": "J12 · Recevoir dès 2026 — Vidéo (LinkedIn 4:5, VO + musique)",
  "j12-receive-reel.mp4": "J12 · Recevoir dès 2026 — Reel (Instagram · TikTok, 9:16, VO + musique)",
  "j13-cost-reel-li.mp4": "J13 · Combien ça coûte — Vidéo (LinkedIn 4:5, VO + musique)",
  "j13-cost-reel.mp4": "J13 · Combien ça coûte — Reel (Instagram · TikTok, 9:16, VO + musique)",
  "j14-security-reel-li.mp4": "J14 · Sécurité PA — Vidéo (LinkedIn 4:5, VO + musique)",
  "j14-security-reel.mp4": "J14 · Sécurité PA — Reel (Instagram · TikTok, 9:16, VO + musique)",
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
    document: {
      file: "public/campaign/j2-cost.pdf",
      title: "Le vrai prix de facturer à la main",
      thumbnail: "public/campaign/j2-cost-1.png",
    },
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
    document: {
      file: "public/campaign/j3-myths.pdf",
      title: "Ce qu'on croit (à tort) sur ses factures",
      thumbnail: "public/campaign/j3-myths-1.png",
    },
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
    document: {
      file: "public/campaign/j4-recap.pdf",
      title: "Pourquoi les e-commerçants passent à Fatturi",
      thumbnail: "public/campaign/j4-recap-1.png",
    },
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
    document: {
      file: "public/campaign/j5-concerned.pdf",
      title: "Concerné par la facturation électronique, ou pas ?",
      thumbnail: "public/campaign/j5-concerned-1.png",
    },
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
    document: {
      file: "public/campaign/j6-channels.pdf",
      title: "3 façons de vendre en ligne, 3 réponses face à la réforme",
      thumbnail: "public/campaign/j6-channels-1.png",
    },
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
    document: {
      file: "public/campaign/j7-objections.pdf",
      title: "Les idées reçues sur la facture électronique (et la réalité)",
      thumbnail: "public/campaign/j7-objections-1.png",
    },
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

Données chiffrées, plateforme certifiée : tes factures partent en sécurité. Fatturi s'appuie sur une PA.

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

  // ─────────────────────── J8 · À partir de quand ? (calendrier) ───────────────────────
  {
    key: "j8-li-text",
    day: "2026-07-16",
    time: "08:30",
    channel: "page",
    label: "J8 · LinkedIn · Post texte (calendrier / dates)",
    text: withTags(
      `« On verra ça en 2027. » Peut-être. Mais pas pour tout le monde, et pas pour tout.

Le calendrier de la facturation électronique tient en deux dates à ne pas confondre :

📅 1er septembre 2026 — RÉCEPTION
Toutes les entreprises doivent être capables de recevoir une facture électronique. Sans exception : micro, auto-entrepreneur, franchise en base de TVA. Il suffit qu'un seul de vos fournisseurs bascule pour que vous deviez pouvoir la recevoir.

📅 1er septembre 2027 — ÉMISSION + e-reporting
Les TPE, micro-entreprises et auto-entrepreneurs doivent émettre leurs factures B2B au format électronique et transmettre leurs données de vente.

Autrement dit : même si votre obligation d'émettre tombe en 2027, celle de recevoir arrive dès 2026. Attendre le dernier moment, c'est prendre le risque de tout gérer dans l'urgence.

Fatturi vous prépare dès maintenant : vos paiements branchés une fois, vos factures prêtes le jour J.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j8-li-video",
    day: "2026-07-16",
    time: "12:30",
    channel: "page",
    label: "J8 · LinkedIn · Vidéo calendrier (4:5, réutilisation J5)",
    video: { file: "public/campaign/j5-concerned-reel-li.mp4", thumbnail: "public/campaign/j5-concerned-thumb-li.png" },
    text: withTags(
      `2026 ou 2027 : à partir de quand, pour vous ? 👇

Réception pour toutes les entreprises dès septembre 2026, émission pour les TPE et indépendants en 2027. On résume le calendrier en 15 secondes.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j8-li-carousel",
    day: "2026-07-16",
    time: "19:00",
    channel: "page",
    label: "J8 · LinkedIn · Carrousel calendrier (réutilisation J5)",
    document: {
      file: "public/campaign/j5-concerned.pdf",
      title: "Le calendrier de la réforme, en clair",
      thumbnail: "public/campaign/j5-concerned-1.png",
    },
    images: [
      { file: "public/campaign/j5-concerned-1.png" },
      { file: "public/campaign/j5-concerned-2.png" },
      { file: "public/campaign/j5-concerned-3.png" },
      { file: "public/campaign/j5-concerned-4.png" },
      { file: "public/campaign/j5-concerned-5.png" },
    ],
    text: withTags(
      `Le calendrier de la réforme, en clair. 🔗

Deux dates, deux obligations à ne pas confondre. Faites glisser pour savoir ce qui s'applique à vous — et quand.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j8-ig-carousel",
    day: "2026-07-16",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J8 · Instagram · Carrousel calendrier (réutilisation J5)",
    images: [
      { file: "public/campaign/j5-concerned-1.png" },
      { file: "public/campaign/j5-concerned-2.png" },
      { file: "public/campaign/j5-concerned-3.png" },
      { file: "public/campaign/j5-concerned-4.png" },
      { file: "public/campaign/j5-concerned-5.png" },
    ],
    text: withTags(
      `2026 ? 2027 ? Ça tombe quand pour toi ? 📅

Deux dates à retenir, et elles ne veulent pas dire la même chose. Swipe pour t'y retrouver 👉

Fatturi te prépare dès maintenant.`,
      TAGS_IG
    ),
  },
  {
    key: "j8-ig-reel",
    day: "2026-07-16",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J8 · Instagram · Reel calendrier (réutilisation J5)",
    video: { file: "public/campaign/j5-concerned-reel.mp4", thumbnail: "public/campaign/j5-concerned-thumb.png" },
    text: withTags(
      `« Je verrai ça en 2027. » 😅 Sauf que la réception, c'est dès 2026.

Le calendrier de la réforme en 15 secondes.

Fatturi te met en règle sans que tu y penses. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j8-ig-card",
    day: "2026-07-16",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J8 · Instagram · Card réforme 2026",
    image: { file: "public/campaign/card-reform-2026.png" },
    text: withTags(
      `Deux dates à noter dans ton agenda. 📌

Réception : septembre 2026. Émission + e-reporting : septembre 2027 pour les indépendants.

Prends de l'avance sans stress avec Fatturi.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  {
    key: "j8-tt-reel",
    day: "2026-07-16",
    time: "12:30",
    channel: "tiktok",
    label: "J8 · TikTok · Reel calendrier (réutilisation J5)",
    video: { file: "public/campaign/j5-concerned-reel.mp4", thumbnail: "public/campaign/j5-concerned-thumb.png" },
    text: withTags(
      `POV : tu penses avoir jusqu'en 2027… mais la réception c'est dès 2026. 👀

Les 2 dates de la réforme, expliquées vite fait.

Fatturi s'en occupe pour toi. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j8-tt-reel-concept",
    day: "2026-07-16",
    time: "19:00",
    channel: "tiktok",
    label: "J8 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Être prêt pour 2026 sans rien changer à ta routine. 🔗

Tu branches Stripe, PayPal ou Shopify une fois — chaque vente devient une facture envoyée automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────────── J9 · Combien ça coûte vraiment ? ───────────────────────
  {
    key: "j9-li-text",
    day: "2026-07-17",
    time: "08:30",
    channel: "page",
    label: "J9 · LinkedIn · Post texte (coût / prix)",
    text: withTags(
      `« Encore un abonnement pour faire mes factures ? Non merci. » On comprend la réaction. Alors posons les vrais chiffres.

Ce que coûte la facturation manuelle, aujourd'hui, sans aucun abonnement :
→ ~20 heures par mois pour une boutique à 300 ventes,
→ des erreurs de saisie (TVA, montant, mentions légales) qui se paient cher,
→ des relances et des factures oubliées.

Ce qui vous attend si vous ne changez rien pour 2026 :
→ le portail public de l'État restera gratuit pour le strict minimum,
→ mais il ne fait que le minimum : pas d'automatisation, pas de connexion à vos paiements. Tout reste à faire à la main, une facture après l'autre.

La vraie question n'est donc pas « combien coûte l'outil ? » mais « combien me coûte de continuer comme avant ? ».

Fatturi remplace ces 20 heures par 0 : vous branchez vos paiements une fois, chaque vente devient une facture — et vous êtes prêt pour la réforme.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j9-li-video",
    day: "2026-07-17",
    time: "12:30",
    channel: "page",
    label: "J9 · LinkedIn · Vidéo compteur (4:5, réutilisation J2)",
    video: { file: "public/campaign/j2-counter-reel-li.mp4", thumbnail: "public/campaign/j2-counter-thumb-li.png" },
    text: withTags(
      `Le vrai coût de la facturation, ce n'est pas l'abonnement. 👇

Ce sont les 20 heures par mois passées à recopier des factures à la main. On fait le calcul en 15 secondes.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j9-li-carousel",
    day: "2026-07-17",
    time: "19:00",
    channel: "page",
    label: "J9 · LinkedIn · Carrousel coût (réutilisation J2)",
    document: {
      file: "public/campaign/j2-cost.pdf",
      title: "« Ça coûte combien ? » La mauvaise question",
      thumbnail: "public/campaign/j2-cost-1.png",
    },
    images: [
      { file: "public/campaign/j2-cost-1.png" },
      { file: "public/campaign/j2-cost-2.png" },
      { file: "public/campaign/j2-cost-3.png" },
      { file: "public/campaign/j2-cost-4.png" },
      { file: "public/campaign/j2-cost-5.png" },
    ],
    text: withTags(
      `« Ça coûte combien ? » La mauvaise question. 🔗

Le poste de coût le plus lourd, c'est le temps passé à la main — pas l'outil. Faites glisser pour le détail chiffré.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j9-ig-carousel",
    day: "2026-07-17",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J9 · Instagram · Carrousel coût (réutilisation J2)",
    images: [
      { file: "public/campaign/j2-cost-1.png" },
      { file: "public/campaign/j2-cost-2.png" },
      { file: "public/campaign/j2-cost-3.png" },
      { file: "public/campaign/j2-cost-4.png" },
      { file: "public/campaign/j2-cost-5.png" },
    ],
    text: withTags(
      `« Je vais pas payer pour faire mes factures. » 💸

Ok, mais à la main ça te coûte déjà 20 h/mois. Swipe pour voir le vrai calcul 👉

Fatturi remet le compteur à 0.`,
      TAGS_IG
    ),
  },
  {
    key: "j9-ig-reel",
    day: "2026-07-17",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J9 · Instagram · Reel compteur (réutilisation J2)",
    video: { file: "public/campaign/j2-counter-reel.mp4", thumbnail: "public/campaign/j2-counter-thumb.png" },
    text: withTags(
      `20 heures par mois. C'est le prix de la facture « gratuite » faite à la main. ⏱️

Fatturi le ramène à 0 : chaque vente → une facture automatique. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j9-ig-card",
    day: "2026-07-17",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J9 · Instagram · Card citation",
    image: { file: "public/campaign/card-morning-invoiced.png" },
    text: withTags(
      `« Encaissé le matin, facturé avant midi. » ☕

Sans y penser, sans y passer tes soirées. Chaque vente devient une facture envoyée automatiquement.

C'est ça, Fatturi.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  {
    key: "j9-tt-reel",
    day: "2026-07-17",
    time: "12:30",
    channel: "tiktok",
    label: "J9 · TikTok · Reel compteur (réutilisation J2)",
    video: { file: "public/campaign/j2-counter-reel.mp4", thumbnail: "public/campaign/j2-counter-thumb.png" },
    text: withTags(
      `« Je paierai pas un abonnement pour mes factures. » 😤 Ok… mais à la main tu paies déjà 20 h/mois.

Le vrai calcul en 15 secondes.

Fatturi remet le compteur à 0. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j9-tt-reel-concept",
    day: "2026-07-17",
    time: "19:00",
    channel: "tiktok",
    label: "J9 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Le maillon manquant entre ton paiement et ta facture. 🔗

Fatturi le remplace : la vente encaissée devient une facture PDF envoyée par email. Automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────────── J10 · Avant / après (la solution) ───────────────────────
  {
    key: "j10-li-text",
    day: "2026-07-18",
    time: "08:30",
    channel: "page",
    label: "J10 · LinkedIn · Post texte (avant/après solution)",
    text: withTags(
      `Deux e-commerçants. Même chiffre d'affaires. Même réforme qui arrive. Une seule différence : leur mois de facturation.

Le premier, sans rien changer :
→ il exporte ses ventes, recopie chaque client, génère chaque PDF, traque les oublis. ~3 heures par mois, et une charge mentale permanente. Et en 2026, il devra en plus gérer la conformité, dans l'urgence.

Le second, avec Fatturi :
→ il a branché ses paiements une fois. Chaque vente devient une facture envoyée automatiquement, au bon format, prête pour la réforme. Temps passé : 0.

La différence n'est pas « un peu de temps gagné ». C'est une tâche entière qui disparaît de votre mois — et une échéance 2026 déjà réglée avant même qu'elle n'arrive.

Vous voulez être lequel des deux ?

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j10-li-video",
    day: "2026-07-18",
    time: "12:30",
    channel: "page",
    label: "J10 · LinkedIn · Vidéo avant/après (4:5, réutilisation J4)",
    video: { file: "public/campaign/j4-beforeafter-reel-li.mp4", thumbnail: "public/campaign/j4-beforeafter-thumb-li.png" },
    text: withTags(
      `Votre facturation : avant / après Fatturi. 👇

Le même mois, deux réalités — ~3 heures de saisie manuelle d'un côté, 0 de l'autre. Et une conformité 2026 déjà en place.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j10-li-carousel",
    day: "2026-07-18",
    time: "19:00",
    channel: "page",
    label: "J10 · LinkedIn · Carrousel récap (réutilisation J4)",
    document: {
      file: "public/campaign/j4-recap.pdf",
      title: "Ce qui change quand vous arrêtez de facturer à la main",
      thumbnail: "public/campaign/j4-recap-1.png",
    },
    images: [
      { file: "public/campaign/j4-recap-1.png" },
      { file: "public/campaign/j4-recap-2.png" },
      { file: "public/campaign/j4-recap-3.png" },
      { file: "public/campaign/j4-recap-4.png" },
      { file: "public/campaign/j4-recap-5.png" },
    ],
    text: withTags(
      `Ce qui change quand vous arrêtez de facturer à la main. 🔗

3 raisons qui font passer les e-commerçants à Fatturi : multi-canaux, zéro saisie, prêt pour 2026. Faites glisser 👉

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j10-ig-carousel",
    day: "2026-07-18",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J10 · Instagram · Carrousel récap (réutilisation J4)",
    images: [
      { file: "public/campaign/j4-recap-1.png" },
      { file: "public/campaign/j4-recap-2.png" },
      { file: "public/campaign/j4-recap-3.png" },
      { file: "public/campaign/j4-recap-4.png" },
      { file: "public/campaign/j4-recap-5.png" },
    ],
    text: withTags(
      `Avant : 3 h de saisie. Après : 0. ⚡

3 raisons de laisser Fatturi facturer à ta place. Swipe 👉

Encaissé le matin, facturé avant midi.`,
      TAGS_IG
    ),
  },
  {
    key: "j10-ig-reel",
    day: "2026-07-18",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J10 · Instagram · Reel avant/après (réutilisation J4)",
    video: { file: "public/campaign/j4-beforeafter-reel.mp4", thumbnail: "public/campaign/j4-beforeafter-thumb.png" },
    text: withTags(
      `Ta facturation : avant vs après. ⚡

~3 h de saisie manuelle → 0. Tu branches une fois, Fatturi fait le reste.

Prêt pour 2026, sans y penser. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j10-ig-card",
    day: "2026-07-18",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J10 · Instagram · Card auto-entrepreneur (réutilisation)",
    image: { file: "public/campaign/card-autoentrepreneur.png" },
    text: withTags(
      `Prends de l'avance, pas la réforme dans la figure. 📌

Auto-entrepreneur, micro, indépendant : Fatturi te met en règle pour 2026 sans changer tes habitudes.

Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  {
    key: "j10-tt-reel",
    day: "2026-07-18",
    time: "12:30",
    channel: "tiktok",
    label: "J10 · TikTok · Reel avant/après (réutilisation J4)",
    video: { file: "public/campaign/j4-beforeafter-reel.mp4", thumbnail: "public/campaign/j4-beforeafter-thumb.png" },
    text: withTags(
      `POV : ton pote galère 3 h sur ses factures, toi 0. 😎

Avant/après quand tu branches Fatturi.

Prêt pour 2026 sans y penser. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j10-tt-reel-concept",
    day: "2026-07-18",
    time: "19:00",
    channel: "tiktok",
    label: "J10 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `La conformité 2026 sans lever le petit doigt. 🔗

Tu branches tes paiements une fois — Fatturi génère et envoie tes factures au bon format, automatiquement.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────────── J11 · Clients particuliers / B2C ───────────────────────
  {
    key: "j11-li-text",
    day: "2026-07-20",
    time: "08:30",
    channel: "page",
    label: "J11 · LinkedIn · Post texte (B2C / e-reporting)",
    text: withTags(
      `« Je ne facture que des particuliers — donc la réforme ne me concerne pas. »

On l'entend souvent chez les coiffeuses, taxis, thérapeutes, aides à domicile. Et c'est un malentendu.

En B2C, vous n'avez effectivement pas à envoyer une facture électronique à votre client particulier.

En revanche, vous devez transmettre les données de vos encaissements à l'administration : c'est le e-reporting. Même règle pour une micro-entreprise, même sans TVA.

Autrement dit : pas d'e-facture client ≠ hors réforme.

Fatturi centralise vos paiements et prépare vos données — sans y passer vos soirées.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j11-li-video",
    day: "2026-07-20",
    time: "12:30",
    channel: "page",
    label: "J11 · LinkedIn · Vidéo B2C (4:5, VO + musique)",
    video: { file: "public/campaign/j11-b2c-reel-li.mp4", thumbnail: "public/campaign/j11-b2c-thumb-li.png" },
    text: withTags(
      `Tu ne factures que des particuliers ? La réforme te concerne quand même. 👇

B2C, e-reporting, métiers de service : on clarifie en 20 secondes (voix + musique).

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j11-li-carousel",
    day: "2026-07-20",
    time: "19:00",
    channel: "page",
    label: "J11 · LinkedIn · Carrousel B2C",
    document: {
      file: "public/campaign/j11-b2c.pdf",
      title: "Clients particuliers : ce qui change vraiment avec la réforme",
      thumbnail: "public/campaign/j11-b2c-1.png",
    },
    images: [
      { file: "public/campaign/j11-b2c-1.png" },
      { file: "public/campaign/j11-b2c-2.png" },
      { file: "public/campaign/j11-b2c-3.png" },
      { file: "public/campaign/j11-b2c-4.png" },
      { file: "public/campaign/j11-b2c-5.png" },
    ],
    text: withTags(
      `Clients particuliers : ce qui change vraiment avec la réforme. 🔗

Pas d'e-facture, mais e-reporting. Faites glisser pour démêler le vrai du faux.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },

  {
    key: "j11-ig-carousel",
    day: "2026-07-20",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J11 · Instagram · Carrousel B2C",
    images: [
      { file: "public/campaign/j11-b2c-1.png" },
      { file: "public/campaign/j11-b2c-2.png" },
      { file: "public/campaign/j11-b2c-3.png" },
      { file: "public/campaign/j11-b2c-4.png" },
      { file: "public/campaign/j11-b2c-5.png" },
    ],
    text: withTags(
      `Tu ne factures que des particuliers ? 💇‍♀️🚕

« Donc la réforme c'est pas pour moi. » Spoiler : si. Swipe pour comprendre 👉

Fatturi prépare tes données sans y passer tes soirées.`,
      TAGS_IG
    ),
  },
  {
    key: "j11-ig-reel",
    day: "2026-07-20",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J11 · Instagram · Reel B2C (VO + musique)",
    video: { file: "public/campaign/j11-b2c-reel.mp4", thumbnail: "public/campaign/j11-b2c-thumb.png" },
    text: withTags(
      `POV : tu ne factures que des particuliers et tu penses être tranquille. 👀

B2C ≠ hors réforme. E-reporting, je t'explique en 20 secondes.

Fatturi centralise tes paiements. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j11-ig-card",
    day: "2026-07-20",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J11 · Instagram · Card B2C",
    image: { file: "public/campaign/card-b2c-ereporting.png" },
    text: withTags(
      `B2C ≠ hors réforme. 📌

Pas de facture électronique vers un particulier — mais le e-reporting de tes encaissements, oui.

Fatturi t'accompagne.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },

  {
    key: "j11-tt-reel",
    day: "2026-07-20",
    time: "12:30",
    channel: "tiktok",
    label: "J11 · TikTok · Reel B2C (VO + musique)",
    video: { file: "public/campaign/j11-b2c-reel.mp4", thumbnail: "public/campaign/j11-b2c-thumb.png" },
    text: withTags(
      `POV : tu ne factures que des particuliers et tu penses être hors réforme. 😬

B2C = e-reporting. Je t'explique vite fait.

Fatturi s'en occupe. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j11-tt-reel-concept",
    day: "2026-07-20",
    time: "19:00",
    channel: "tiktok",
    label: "J11 · TikTok · Reel concept (réutilisation J1)",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Tes encaissements B2C, prêts pour le e-reporting. 🔗

Tu branches tes paiements une fois — Fatturi centralise et prépare tes données.

Encaissé le matin, facturé avant midi.
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────────── J12 · Recevoir dès 2026 ───────────────────────
  {
    key: "j12-li-text",
    day: "2026-07-21",
    time: "08:30",
    channel: "page",
    label: "J12 · LinkedIn · Post texte (réception 2026)",
    text: withTags(
      `« J'émets mes factures en 2027 — je peux attendre. » Pas pour tout.

Dès le 1er septembre 2026, TOUTES les entreprises doivent pouvoir RECEVOIR une facture électronique. Micro, auto-entrepreneur, franchise en base de TVA : sans exception.

Pourquoi si tôt ? Parce qu'il suffit qu'un seul de vos fournisseurs bascule pour que vous soyez concerné. L'émission peut attendre 2027 pour les TPE ; la réception, non.

Fatturi vous prépare dès maintenant : paiements branchés, factures prêtes, zéro panique le jour J.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j12-li-video",
    day: "2026-07-21",
    time: "12:30",
    channel: "page",
    label: "J12 · LinkedIn · Vidéo réception (VO + musique)",
    video: { file: "public/campaign/j12-receive-reel-li.mp4", thumbnail: "public/campaign/j12-receive-thumb-li.png" },
    text: withTags(
      `Tu penses avoir jusqu'en 2027… sauf pour la réception. 👇

Dès septembre 2026, toutes les entreprises doivent pouvoir recevoir en électronique.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j12-li-carousel",
    day: "2026-07-21",
    time: "19:00",
    channel: "page",
    label: "J12 · LinkedIn · Carrousel réception",
    document: {
      file: "public/campaign/j12-receive.pdf",
      title: "Réception 2026 : ce qu'il faut savoir",
      thumbnail: "public/campaign/j12-receive-1.png",
    },
    images: [
      { file: "public/campaign/j12-receive-1.png" },
      { file: "public/campaign/j12-receive-2.png" },
      { file: "public/campaign/j12-receive-3.png" },
      { file: "public/campaign/j12-receive-4.png" },
      { file: "public/campaign/j12-receive-5.png" },
    ],
    text: withTags(
      `Réception 2026 : ce qu'il faut savoir. 🔗

Faites glisser pour démêler émission vs réception — et pourquoi attendre coûte cher.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j12-ig-carousel",
    day: "2026-07-21",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J12 · Instagram · Carrousel réception",
    images: [
      { file: "public/campaign/j12-receive-1.png" },
      { file: "public/campaign/j12-receive-2.png" },
      { file: "public/campaign/j12-receive-3.png" },
      { file: "public/campaign/j12-receive-4.png" },
      { file: "public/campaign/j12-receive-5.png" },
    ],
    text: withTags(
      `Tu penses avoir jusqu'en 2027 ? 📅

Sauf pour la réception — dès sept. 2026. Swipe 👉

Fatturi te prépare dès maintenant.`,
      TAGS_IG
    ),
  },
  {
    key: "j12-ig-reel",
    day: "2026-07-21",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J12 · Instagram · Reel réception (VO + musique)",
    video: { file: "public/campaign/j12-receive-reel.mp4", thumbnail: "public/campaign/j12-receive-thumb.png" },
    text: withTags(
      `POV : tu crois avoir jusqu'en 2027… 👀

La réception, c'est dès 2026. Pour tout le monde.

Fatturi te prépare. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j12-ig-card",
    day: "2026-07-21",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J12 · Instagram · Card réception",
    image: { file: "public/campaign/card-receive-2026.png" },
    text: withTags(
      `Dès septembre 2026. 📌

Recevoir une facture électronique : obligatoire pour toutes les entreprises.

Prends de l'avance avec Fatturi.
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j12-tt-reel",
    day: "2026-07-21",
    time: "12:30",
    channel: "tiktok",
    label: "J12 · TikTok · Reel réception (VO + musique)",
    video: { file: "public/campaign/j12-receive-reel.mp4", thumbnail: "public/campaign/j12-receive-thumb.png" },
    text: withTags(
      `POV : tu penses avoir jusqu'en 2027… sauf pour la réception. 😬

Dès sept. 2026, tout le monde doit pouvoir recevoir.

Fatturi s'en occupe. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j12-tt-reel-concept",
    day: "2026-07-21",
    time: "19:00",
    channel: "tiktok",
    label: "J12 · TikTok · Reel concept",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Prêt pour la réception 2026 sans y penser. 🔗

Tu branches tes paiements une fois — Fatturi fait le reste.

Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────────── J13 · Combien ça coûte ───────────────────────
  {
    key: "j13-li-text",
    day: "2026-07-22",
    time: "08:30",
    channel: "page",
    label: "J13 · LinkedIn · Post texte (coût)",
    text: withTags(
      `« Je ne paierai pas un abonnement pour faire mes factures. »

On comprend. Alors posons les vrais chiffres.

Facturer à la main pour 300 ventes/mois, c'est ~20 heures. Sans compter les erreurs et la charge mentale.

Le portail public reste gratuit pour le strict minimum — mais il n'automatise rien : chaque facture reste à faire.

La vraie question n'est pas « combien coûte l'outil ? » mais « combien coûte de continuer comme avant ? ».

Fatturi remet ce compteur à 0.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j13-li-video",
    day: "2026-07-22",
    time: "12:30",
    channel: "page",
    label: "J13 · LinkedIn · Vidéo coût (VO + musique)",
    video: { file: "public/campaign/j13-cost-reel-li.mp4", thumbnail: "public/campaign/j13-cost-thumb-li.png" },
    text: withTags(
      `Le vrai coût de la facturation, ce n'est pas l'abonnement. 👇

Ce sont les 20 heures par mois à la main. On fait le calcul.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j13-li-carousel",
    day: "2026-07-22",
    time: "19:00",
    channel: "page",
    label: "J13 · LinkedIn · Carrousel coût",
    document: {
      file: "public/campaign/j13-cost.pdf",
      title: "« Ça coûte combien ? » La mauvaise question",
      thumbnail: "public/campaign/j13-cost-1.png",
    },
    images: [
      { file: "public/campaign/j13-cost-1.png" },
      { file: "public/campaign/j13-cost-2.png" },
      { file: "public/campaign/j13-cost-3.png" },
      { file: "public/campaign/j13-cost-4.png" },
      { file: "public/campaign/j13-cost-5.png" },
    ],
    text: withTags(
      `« Ça coûte combien ? » La mauvaise question. 🔗

Faites glisser pour le vrai calcul — temps vs outil vs portail public.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j13-ig-carousel",
    day: "2026-07-22",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J13 · Instagram · Carrousel coût",
    images: [
      { file: "public/campaign/j13-cost-1.png" },
      { file: "public/campaign/j13-cost-2.png" },
      { file: "public/campaign/j13-cost-3.png" },
      { file: "public/campaign/j13-cost-4.png" },
      { file: "public/campaign/j13-cost-5.png" },
    ],
    text: withTags(
      `« Je paierai pas un abonnement. » 💸

Ok — mais à la main tu paies déjà 20 h/mois. Swipe 👉

Fatturi remet le compteur à 0.`,
      TAGS_IG
    ),
  },
  {
    key: "j13-ig-reel",
    day: "2026-07-22",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J13 · Instagram · Reel coût (VO + musique)",
    video: { file: "public/campaign/j13-cost-reel.mp4", thumbnail: "public/campaign/j13-cost-thumb.png" },
    text: withTags(
      `20 heures par mois. C'est le prix de la facture « gratuite ». ⏱️

Fatturi : compteur à 0. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j13-ig-card",
    day: "2026-07-22",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J13 · Instagram · Card coût",
    image: { file: "public/campaign/card-cost-truth.png" },
    text: withTags(
      `Ce n'est pas l'abonnement. 📌

Ce sont les 20 h/mois à la main. Fatturi remet le compteur à 0.

Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j13-tt-reel",
    day: "2026-07-22",
    time: "12:30",
    channel: "tiktok",
    label: "J13 · TikTok · Reel coût (VO + musique)",
    video: { file: "public/campaign/j13-cost-reel.mp4", thumbnail: "public/campaign/j13-cost-thumb.png" },
    text: withTags(
      `« Je paierai pas un abonnement »… mais à la main tu paies 20 h/mois. 😤

Le vrai calcul. Fatturi = 0. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j13-tt-reel-concept",
    day: "2026-07-22",
    time: "19:00",
    channel: "tiktok",
    label: "J13 · TikTok · Reel concept",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Zéro saisie. Zéro abonnement mental. 🔗

Chaque vente → une facture automatique.

Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },

  // ─────────────────────── J14 · Sécurité PA ───────────────────────
  {
    key: "j14-li-text",
    day: "2026-07-23",
    time: "08:30",
    channel: "page",
    label: "J14 · LinkedIn · Post texte (sécurité)",
    text: withTags(
      `« Ces plateformes vont se faire pirater — je n'ai aucune confiance. »

C'est l'objection la plus fréquente. Et elle mérite une réponse claire.

Les plateformes de dématérialisation partenaires (PA) sont agréées par l'État. Elles doivent respecter des exigences de sécurité et de chiffrement : ce n'est pas un SaaS improvisé.

Le cadre de la réforme (e-facture + e-reporting) existe aussi pour lutter contre la fraude. Vos données transitent dans un circuit officiel, pas dans un outil opaque.

Fatturi s'appuie sur une PA agréée : vos factures partent au bon format, dans un cadre sécurisé.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j14-li-video",
    day: "2026-07-23",
    time: "12:30",
    channel: "page",
    label: "J14 · LinkedIn · Vidéo sécurité (VO + musique)",
    video: { file: "public/campaign/j14-security-reel-li.mp4", thumbnail: "public/campaign/j14-security-thumb-li.png" },
    text: withTags(
      `Et si la plateforme se fait pirater ? 👇

PA agréée par l'État, chiffrement, cadre légal. On clarifie en 20 secondes.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j14-li-carousel",
    day: "2026-07-23",
    time: "19:00",
    channel: "page",
    label: "J14 · LinkedIn · Carrousel sécurité",
    document: {
      file: "public/campaign/j14-security.pdf",
      title: "Sécurité des factures électroniques : le vrai du faux",
      thumbnail: "public/campaign/j14-security-1.png",
    },
    images: [
      { file: "public/campaign/j14-security-1.png" },
      { file: "public/campaign/j14-security-2.png" },
      { file: "public/campaign/j14-security-3.png" },
      { file: "public/campaign/j14-security-4.png" },
      { file: "public/campaign/j14-security-5.png" },
    ],
    text: withTags(
      `Sécurité des factures électroniques : le vrai du faux. 🔗

Faites glisser pour comprendre ce qu'est une PA agréée — et le rôle de Fatturi.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com`,
      TAGS_LI
    ),
  },
  {
    key: "j14-ig-carousel",
    day: "2026-07-23",
    time: "08:30",
    channel: "instagram",
    igType: "post",
    label: "J14 · Instagram · Carrousel sécurité",
    images: [
      { file: "public/campaign/j14-security-1.png" },
      { file: "public/campaign/j14-security-2.png" },
      { file: "public/campaign/j14-security-3.png" },
      { file: "public/campaign/j14-security-4.png" },
      { file: "public/campaign/j14-security-5.png" },
    ],
    text: withTags(
      `« Et si ça fuit ? » 🔒

Les PA sont agréées par l'État. Swipe pour le détail 👉

Fatturi s'appuie sur ce cadre.`,
      TAGS_IG
    ),
  },
  {
    key: "j14-ig-reel",
    day: "2026-07-23",
    time: "12:30",
    channel: "instagram",
    igType: "reel",
    label: "J14 · Instagram · Reel sécurité (VO + musique)",
    video: { file: "public/campaign/j14-security-reel.mp4", thumbnail: "public/campaign/j14-security-thumb.png" },
    text: withTags(
      `Et si la plateforme se fait pirater ? 👀

PA agréée = pas un outil au hasard.

Fatturi s'appuie dessus. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j14-ig-card",
    day: "2026-07-23",
    time: "19:00",
    channel: "instagram",
    igType: "post",
    label: "J14 · Instagram · Card confiance",
    image: { file: "public/campaign/card-pdp-trust.png" },
    text: withTags(
      `Agréée par l'État. 🔒

Chiffrement, sécurité, circuit officiel. Fatturi s'appuie sur une PA agréée.

Accès prioritaire → fatturi.com`,
      TAGS_IG
    ),
  },
  {
    key: "j14-tt-reel",
    day: "2026-07-23",
    time: "12:30",
    channel: "tiktok",
    label: "J14 · TikTok · Reel sécurité (VO + musique)",
    video: { file: "public/campaign/j14-security-reel.mp4", thumbnail: "public/campaign/j14-security-thumb.png" },
    text: withTags(
      `« Ces plateformes vont se faire pirater » — et la réalité. 🔒

PA agréée par l'État. Je t'explique.

Fatturi s'en occupe. 🔗
Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
  {
    key: "j14-tt-reel-concept",
    day: "2026-07-23",
    time: "19:00",
    channel: "tiktok",
    label: "J14 · TikTok · Reel concept",
    video: { file: "public/campaign/j1-screen-demo.mp4", thumbnail: "public/campaign/j1-thumbnail.png" },
    text: withTags(
      `Conformité sécurisée, sans y penser. 🔗

Tes factures partent via une PA agréée.

Accès prioritaire → fatturi.com`,
      TAGS_TT
    ),
  },
];
