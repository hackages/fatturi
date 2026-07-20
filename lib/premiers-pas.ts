export type SetupStep = {
  id: string;
  title: string;
  hint: string;
  optional?: boolean;
  href?: string;
  linkLabel?: string;
  imageSrc?: string;
  imageAlt?: string;
};

/** Checklist de démarrage — alignée sur Paramètres + Abonnement. */
export const SETUP_STEPS: SetupStep[] = [
  {
    id: "entreprise",
    title: "Renseigner mon entreprise (SIRET)",
    hint: "Dans Paramètres → Informations entreprise : saisissez votre SIRET pour récupérer les données. C’est l’étape REQUISE pour démarrer.",
    href: "https://fatturi.com",
    linkLabel: "Ouvrir Fatturi",
    imageSrc: "/blog/premiers-pas/01-parametres.png",
    imageAlt:
      "Paramètres Fatturi : progression globale, Entreprise requis, Stripe optionnel",
  },
  {
    id: "stripe",
    title: "Connecter Stripe — si vous en avez un",
    optional: true,
    hint: "Dans Paramètres → Stripe Connect. Si vous encaissez avec Stripe, reliez-le : chaque paiement peut déclencher une facture. Pas de Stripe ? Laissez vide et facturez dans Fatturi — cochez quand même.",
    href: "/creer-compte-fatturi-connecter-stripe",
    linkLabel: "Guide compte & Stripe",
  },
  {
    id: "premiere-facture",
    title: "Émettre ma 1re facture",
    hint: "Aussi marquée REQUIS dans Paramètres. Créez ou laissez partir une première facture (via Stripe ou directement dans Fatturi) pour compléter la configuration.",
  },
  {
    id: "abonnement",
    title: "Choisir mon abonnement + code offert",
    hint: "Menu Abonnement : choisissez la formule selon votre volume (Gratuit, Starter, Pro, Business), puis appliquez le code promo reçu dans l’invitation.",
    imageSrc: "/blog/premiers-pas/02-abonnement.png",
    imageAlt:
      "Écran Abonnement Fatturi : plans Gratuit, Starter, Pro et Business",
  },
];

export const SETUP_STORAGE_KEY = "fatturi-premiers-pas-v2";
