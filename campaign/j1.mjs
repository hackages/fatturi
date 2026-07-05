// Contenus J1 — campagne « Le chaînon manquant entre vos paiements et vos factures ».
// Le champ `video`/`image` référence un fichier local ; publish.mjs le convertit
// en URL publique (MEDIA_BASE_URL) car Buffer récupère le média via une URL.

export const J1 = {
  "post-accroche": {
    label: "J1 · Post accroche (texte seul)",
    text: `Vous encaissez sur Stripe. ✅
Le paiement arrive sur votre compte. ✅
Et la facture ? …

C'est là que la chaîne casse.

Aujourd'hui, entre le moment où vous êtes payé et le moment où votre client reçoit sa facture, il y a un trou. Vous le comblez à la main : export, copier-coller, PDF, envoi. Chaque vente. Chaque mois.

Fatturi est le chaînon manquant. On relie directement vos paiements en ligne à la facture envoyée par email — automatiquement, dès aujourd'hui. Et le jour où la réforme 2026 s'applique, la même facture part via une PDP agréée, sans que vous changiez quoi que ce soit.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com

#facturation #ecommerce #indépendants #Stripe #facturationélectronique2026`,
    assets: [],
  },

  "video-demo": {
    label: "J1 · Vidéo screen-demo",
    text: `De la vente encaissée à la facture envoyée par email — sans rien faire. 👇

Entre vos paiements en ligne et vos factures, il manque un maillon. Fatturi le remplace : chaque vente Stripe, PayPal ou Shopify devient une facture PDF envoyée automatiquement à votre client. Dès aujourd'hui, et prêt pour 2026.

Encaissé aujourd'hui, facturé aussitôt.

👉 Accès prioritaire (réponse sous 48h) : fatturi.com

#facturation #ecommerce #freelance #Stripe #facturationélectronique2026`,
    video: {
      file: "out/j1-screen-demo.mp4",
      thumbnail: "out/j1-thumbnail.png",
    },
  },

  carousel: {
    label: "J1 · Carrousel « chaîne cassée »",
    text: `Votre chaîne de facturation a un maillon cassé. 🔗

Vous encaissez en ligne en un clic… mais la facture, c'est encore à la main : export, copier-coller, PDF, envoi. Chaque vente. Chaque mois.

Fatturi est le chaînon manquant : chaque paiement Stripe, PayPal ou Shopify devient une facture envoyée par email, automatiquement. Dès aujourd'hui, et prêt pour 2026.

Faites glisser pour voir les 3 étapes 👉

👉 Accès prioritaire (réponse sous 48h) : fatturi.com

#facturation #ecommerce #freelance #Stripe #facturationélectronique2026`,
    images: [
      { file: "public/campaign/j1-carousel-1.png" },
      { file: "public/campaign/j1-carousel-2.png" },
      { file: "public/campaign/j1-carousel-3.png" },
      { file: "public/campaign/j1-carousel-4.png" },
      { file: "public/campaign/j1-carousel-5.png" },
    ],
  },
};
