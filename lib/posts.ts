// Contenu éditorial du blog Fatturi. Les articles sont typés et rendus par
// components/article-body.tsx. Pas de dépendance MDX : tout est statique et SSG.

export type CategorySlug = "reforme" | "guides" | "produit" | "ecommerce";
export type Theme = "navy" | "gold" | "sage";

export interface Category {
  slug: CategorySlug;
  label: string;
  accent: Theme;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { slug: "reforme", label: "Réforme 2026", accent: "navy", blurb: "La réforme française de la facturation électronique, expliquée." },
  { slug: "guides", label: "Guides", accent: "sage", blurb: "PDP, Factur-X, TVA : les notions clés, sans jargon." },
  { slug: "produit", label: "Produit", accent: "gold", blurb: "Ce que Fatturi automatise pour vous, en détail." },
  { slug: "ecommerce", label: "E-commerce", accent: "navy", blurb: "Facturation pour ceux qui vendent en ligne." },
];

export function categoryOf(slug: CategorySlug): Category {
  return CATEGORIES.find((c) => c.slug === slug)!;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  date: string; // ISO
  author: string;
  readingMin: number;
  theme: Theme;
  featured?: boolean;
  body: Block[];
}

const CTA_NOTE =
  "Fatturi connecte Stripe, PayPal et Shopify pour envoyer automatiquement une facture PDF par email à chaque vente — dès aujourd'hui, et via une PDP agréée le jour où la réforme 2026 s'appliquera.";

export const POSTS: Post[] = [
  {
    slug: "facturation-electronique-2026-guide-complet",
    title: "Facturation électronique 2026 : le guide complet pour les indépendants",
    excerpt:
      "Calendrier, entreprises concernées, obligations, formats acceptés et sanctions : tout ce qu'un indépendant ou une TPE doit savoir sur la réforme française, expliqué simplement.",
    category: "reforme",
    date: "2026-07-01",
    author: "Arielle Toghau",
    readingMin: 8,
    theme: "navy",
    featured: true,
    body: [
      { type: "p", text: "La réforme française de la facturation électronique arrive, et elle concerne bien plus d'entreprises qu'on ne le croit. Si vous êtes indépendant, e-commerçant ou à la tête d'une TPE, voici l'essentiel — sans jargon inutile." },
      { type: "h2", text: "De quoi parle-t-on exactement ?" },
      { type: "p", text: "La réforme impose aux entreprises **assujetties à la TVA** d'échanger leurs factures B2B au **format électronique structuré** (et non plus un simple PDF envoyé par email), via une **Plateforme de Dématérialisation Partenaire (PDP)** agréée par l'État. En parallèle, un dispositif de **e-reporting** transmet à l'administration certaines données de transactions." },
      { type: "p", text: "L'objectif affiché : lutter contre la fraude à la TVA, simplifier les déclarations et fluidifier les échanges entre entreprises." },
      { type: "h2", text: "Qui est concerné ?" },
      { type: "p", text: "Contrairement à une idée reçue tenace, la réforme **ne vise pas que les grands groupes**. Sont concernées toutes les entreprises établies en France et assujetties à la TVA, y compris :" },
      { type: "ul", items: [
        "les micro-entrepreneurs et auto-entrepreneurs assujettis à la TVA,",
        "les indépendants et professions libérales,",
        "les TPE et PME,",
        "les e-commerçants qui vendent des biens ou services.",
      ] },
      { type: "p", text: "Même en franchise de TVA, vous devrez a minima être en mesure de **recevoir** des factures électroniques." },
      { type: "h2", text: "Le calendrier à retenir" },
      { type: "p", text: "Le déploiement est progressif : l'**obligation de réception** s'applique à toutes les entreprises en premier, puis l'**obligation d'émission** arrive par vagues selon la taille de l'entreprise. Le message clé : les petites structures ne sont pas exemptées, elles sont simplement servies plus tard dans le calendrier." },
      { type: "callout", title: "À anticiper", text: "Attendre la dernière minute, c'est risquer de devoir tout changer dans l'urgence. Mettre en place l'automatisation dès maintenant vous fait gagner du temps et vous évite le stress du jour J." },
      { type: "h2", text: "Quels formats sont acceptés ?" },
      { type: "p", text: "La réforme s'appuie sur des formats structurés conformes à la norme européenne EN 16931. En France, trois formats socles sont retenus : **Factur-X** (un PDF lisible avec des données XML intégrées), **UBL** et **CII**. Pour un indépendant, Factur-X est souvent le plus confortable car la facture reste lisible par un humain." },
      { type: "h2", text: "Et si je ne fais rien ?" },
      { type: "p", text: "Au-delà des sanctions prévues en cas de non-conformité, le vrai risque est opérationnel : vos clients B2B exigeront des factures conformes, et vos fournisseurs vous en enverront. Ne pas être équipé, c'est se couper d'une partie de ses échanges commerciaux." },
      { type: "h2", text: "Comment s'y préparer sereinement" },
      { type: "ul", items: [
        "Vérifiez votre statut TVA et identifiez vos flux B2B.",
        "Choisissez une solution reliée à une PDP agréée.",
        "Automatisez dès aujourd'hui l'émission de vos factures, même au format PDF par email.",
        "Activez la bascule vers la PDP le moment venu, sans changer vos habitudes.",
      ] },
      { type: "callout", title: "Le rôle de Fatturi", text: CTA_NOTE },
      { type: "p", text: "La réforme n'est pas une contrainte de plus si vous l'anticipez : c'est l'occasion de supprimer une tâche répétitive de votre quotidien." },
    ],
  },

  {
    slug: "pdp-ppf-qui-fait-quoi-facturation-electronique",
    title: "PDP, PPF, e-reporting : qui fait quoi dans la facturation électronique ?",
    excerpt:
      "Le vocabulaire de la réforme peut dérouter. On clarifie le rôle de chaque acteur — PDP, portail public, e-reporting — avec une analogie simple.",
    category: "guides",
    date: "2026-06-20",
    author: "Arielle Toghau",
    readingMin: 6,
    theme: "sage",
    body: [
      { type: "p", text: "PDP, PPF, PA, e-reporting… La facturation électronique a son propre vocabulaire. Bonne nouvelle : une fois l'image posée, tout devient clair." },
      { type: "h2", text: "L'analogie de la poste" },
      { type: "p", text: "Imaginez que vos factures soient des courriers recommandés. Vous ne les glissez plus dans n'importe quelle boîte : vous passez par un **bureau de poste agréé** qui garantit l'acheminement, l'horodatage et la traçabilité. C'est exactement le rôle d'une PDP." },
      { type: "h2", text: "La PDP (Plateforme de Dématérialisation Partenaire)" },
      { type: "p", text: "Une **PDP** est une plateforme privée **immatriculée par l'administration fiscale**. Elle est autorisée à émettre, transmettre et recevoir des factures électroniques entre entreprises, et à transmettre les données à l'administration. C'est le maillon central du dispositif." },
      { type: "h2", text: "Le PPF (Portail Public de Facturation)" },
      { type: "p", text: "Le **PPF** joue le rôle d'annuaire central et de chef d'orchestre des données. Il ne gère pas directement l'ensemble des flux de factures : ce sont les PDP qui font transiter les documents entre elles." },
      { type: "h2", text: "Le e-reporting" },
      { type: "p", text: "Le **e-reporting** consiste à transmettre à l'administration certaines données de transactions qui ne passent pas par la facturation électronique B2B : ventes aux particuliers (B2C), opérations à l'international, encaissements. C'est le complément logique de la e-invoicing." },
      { type: "callout", title: "Ce que ça change pour vous", text: "Vous n'avez pas à devenir expert : votre outil de facturation s'appuie sur une PDP et s'occupe de la transmission. Votre travail se résume à créer la facture — ou à la laisser se créer automatiquement." },
      { type: "h2", text: "En résumé" },
      { type: "ul", items: [
        "PDP : transporte et sécurise vos factures (le bureau de poste agréé).",
        "PPF : l'annuaire et le pilote central des données.",
        "E-reporting : les données de transactions hors B2B transmises à l'État.",
      ] },
      { type: "p", text: "Fatturi s'appuie sur une PDP officielle : vous restez concentré sur votre activité, la conformité tourne en arrière-plan." },
    ],
  },

  {
    slug: "format-factur-x-pdf-xml-explique",
    title: "Factur-X : comprendre le format hybride PDF + XML",
    excerpt:
      "Factur-X réconcilie l'humain et la machine : un PDF que vous lisez, des données XML que les logiciels traitent. Voici pourquoi c'est le format recommandé en France.",
    category: "guides",
    date: "2026-06-05",
    author: "Arielle Toghau",
    readingMin: 5,
    theme: "gold",
    body: [
      { type: "p", text: "Parmi les formats acceptés par la réforme, **Factur-X** est le plus rassurant pour les indépendants. Pourquoi ? Parce qu'il ne vous oblige pas à choisir entre lisibilité et conformité." },
      { type: "h2", text: "Un fichier, deux visages" },
      { type: "p", text: "Un fichier Factur-X est un **PDF classique** (le PDF/A-3, pour être précis) dans lequel on a **glissé un fichier XML structuré**. Résultat :" },
      { type: "ul", items: [
        "vous, votre client et votre comptable voyez une facture PDF normale, lisible ;",
        "les logiciels lisent le XML embarqué et traitent les données automatiquement (montant, TVA, SIREN…).",
      ] },
      { type: "p", text: "C'est le meilleur des deux mondes : la machine gagne en automatisation, l'humain garde un document compréhensible." },
      { type: "h2", text: "Pourquoi c'est important pour la conformité" },
      { type: "p", text: "Les données structurées suivent la norme européenne **EN 16931**. C'est ce qui permet à une PDP de vérifier, transmettre et archiver la facture de façon fiable, et à l'administration de recouper les informations." },
      { type: "callout", title: "Bon à savoir", text: "Vous n'avez pas à produire ce XML à la main. Un bon outil de facturation le génère pour vous, sans que vous ayez à comprendre la moindre balise." },
      { type: "h2", text: "Et concrètement avec Fatturi ?" },
      { type: "p", text: "Fatturi génère des factures au format Factur-X à partir de vos ventes, puis les transmet via une PDP agréée. Vous n'écrivez pas une ligne de XML : vous encaissez, la facture conforme part toute seule." },
    ],
  },

  {
    slug: "envoyer-factures-automatiquement-par-email",
    title: "Envoyer vos factures automatiquement par email, dès aujourd'hui",
    excerpt:
      "Pas besoin d'attendre 2026 pour arrêter de facturer à la main. Voici comment chaque vente peut devenir une facture PDF envoyée par email, sans intervention.",
    category: "produit",
    date: "2026-05-22",
    author: "Arielle Toghau",
    readingMin: 4,
    theme: "gold",
    body: [
      { type: "p", text: "La réforme 2026 fait parler d'elle, mais elle occulte un problème que vous vivez **déjà aujourd'hui** : le temps perdu à facturer à la main. Bonne nouvelle, ce problème se règle sans attendre." },
      { type: "h2", text: "Le maillon manquant" },
      { type: "p", text: "Entre le moment où vous êtes payé et celui où votre client reçoit sa facture, il y a un trou. Vous le comblez manuellement : export des ventes, copier-coller, génération du PDF, envoi. À chaque vente. Chaque mois." },
      { type: "p", text: "Fatturi remplace ce maillon : dès qu'un paiement arrive, une facture PDF est générée et **envoyée par email** à votre client, automatiquement." },
      { type: "h2", text: "Comment ça marche" },
      { type: "ul", items: [
        "Vous connectez Stripe, PayPal ou Shopify en quelques clics.",
        "À chaque vente, Fatturi crée la facture avec les bonnes mentions et le bon calcul de TVA.",
        "La facture part par email transactionnel, avec suivi d'ouverture et d'échec.",
      ] },
      { type: "callout", title: "Et pour 2026 ?", text: "Le jour où la réforme s'appliquera à vos clients B2B, un paramètre activera l'émission via PDP agréée. La même facture, transmise différemment — sans que vous changiez vos habitudes." },
      { type: "h2", text: "Ce que vous y gagnez" },
      { type: "p", text: "Plus d'oubli, plus de saisie, plus de relance pour une facture manquante. Vous récupérez des heures chaque mois et vous offrez une expérience nette à vos clients." },
    ],
  },

  {
    slug: "cout-cache-facturation-manuelle-ecommercant",
    title: "Le coût caché de la facturation manuelle pour un e-commerçant",
    excerpt:
      "Facturer à la main ne coûte pas 4 minutes, mais des dizaines d'heures par mois — sans compter les erreurs et la charge mentale. Faisons le calcul.",
    category: "ecommerce",
    date: "2026-05-10",
    author: "Arielle Toghau",
    readingMin: 5,
    theme: "navy",
    body: [
      { type: "p", text: "« Facturer, ça prend deux minutes. » C'est vrai pour une facture. Le problème, c'est le volume." },
      { type: "h2", text: "Le calcul qui fait mal" },
      { type: "p", text: "Prenons une boutique qui réalise **300 ventes par mois**. Comptez environ 4 minutes par facture (export, saisie, PDF, envoi) : cela représente **20 heures par mois**. Soit presque trois jours de travail par an, uniquement pour recopier des chiffres." },
      { type: "h2", text: "Les coûts qu'on ne voit pas" },
      { type: "ul", items: [
        "Les erreurs : une TVA fausse, un montant erroné, une mention légale oubliée — et il faut corriger, parfois en série.",
        "La charge mentale : penser à facturer, relancer, ne rien oublier, en plus de faire tourner la boutique.",
        "Le manque à gagner : ces heures ne sont ni vendues, ni consacrées à votre croissance.",
      ] },
      { type: "quote", text: "Les autres plateformes traitent les encaissements en ligne comme un cas particulier. Nous les avons placés au cœur du produit.", cite: "Arielle, cofondatrice de Fatturi" },
      { type: "h2", text: "Remettre le compteur à zéro" },
      { type: "p", text: "L'automatisation ne fait pas gagner « un peu de temps » : elle supprime une tâche entière. Chaque vente Stripe, PayPal ou Shopify devient une facture envoyée automatiquement. Le temps consacré à la facturation retombe à zéro." },
      { type: "callout", title: "Pensé pour l'e-commerce", text: CTA_NOTE },
    ],
  },

  {
    slug: "stripe-paypal-shopify-automatiser-factures",
    title: "Stripe, PayPal, Shopify : comment automatiser vos factures",
    excerpt:
      "Vos canaux de paiement contiennent déjà toutes les informations nécessaires à vos factures. Voici comment les brancher pour ne plus jamais facturer à la main.",
    category: "produit",
    date: "2026-04-28",
    author: "Arielle Toghau",
    readingMin: 4,
    theme: "sage",
    body: [
      { type: "p", text: "Vous encaissez déjà en ligne via Stripe, PayPal ou Shopify. Ces plateformes connaissent le montant, la date, souvent le client. Pourquoi ressaisir tout cela dans un outil de facturation ?" },
      { type: "h2", text: "Le principe : brancher, pas ressaisir" },
      { type: "p", text: "Plutôt que d'exporter puis recopier, on **connecte** vos comptes de paiement à votre facturation. Chaque transaction déclenche alors la création d'une facture, avec les bonnes données, sans intervention." },
      { type: "h2", text: "Multi-canaux, un seul endroit" },
      { type: "ul", items: [
        "Stripe : idéal pour les paiements par carte et les abonnements.",
        "PayPal : pour les clients qui préfèrent ce moyen de paiement.",
        "Shopify : pour synchroniser vos commandes de boutique.",
      ] },
      { type: "p", text: "Réunis au même endroit, ces canaux alimentent une facturation cohérente : plus de doublons, plus d'oublis, plus de fichiers éparpillés." },
      { type: "h2", text: "Et la collecte des informations client ?" },
      { type: "p", text: "Fatturi collecte automatiquement les coordonnées de facturation côté client. Et si une information manque, la facture est tout de même produite avec les données disponibles, pour que vous restiez en règle." },
      { type: "callout", title: "En pratique", text: "Comptez quelques clics pour connecter un canal. Une fois relié, il déclenche l'émission d'une facture à chaque vente — automatiquement, et prêt pour 2026." },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPost(): Post {
  return getAllPosts().find((p) => p.featured) ?? getAllPosts()[0];
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(slug: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === slug);
}

export function getRelatedPosts(post: Post, count = 3): Post[] {
  const sameCat = getAllPosts().filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = getAllPosts().filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCat, ...others].slice(0, count);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
