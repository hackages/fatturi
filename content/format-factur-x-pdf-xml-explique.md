---
title: "Factur-X : comprendre le format hybride PDF + XML"
excerpt: "Factur-X réconcilie l'humain et la machine : un PDF que vous lisez, des données XML que les logiciels traitent. Voici pourquoi c'est le format recommandé en France."
category: guides
date: "2026-06-05"
author: Arielle Toghau
readingMin: 5
theme: gold
---

Parmi les formats acceptés par la réforme, **Factur-X** est le plus rassurant pour les indépendants. Pourquoi ? Parce qu'il ne vous oblige pas à choisir entre lisibilité et conformité.

## Un fichier, deux visages

Un fichier Factur-X est un **PDF classique** (le PDF/A-3, pour être précis) dans lequel on a **glissé un fichier XML structuré**. Résultat :

- vous, votre client et votre comptable voyez une facture PDF normale, lisible ;
- les logiciels lisent le XML embarqué et traitent les données automatiquement (montant, TVA, SIREN…).

C'est le meilleur des deux mondes : la machine gagne en automatisation, l'humain garde un document compréhensible.

## Pourquoi c'est important pour la conformité

Les données structurées suivent la norme européenne **EN 16931**. C'est ce qui permet à une PDP de vérifier, transmettre et archiver la facture de façon fiable, et à l'administration de recouper les informations.

> [!NOTE] Bon à savoir
> Vous n'avez pas à produire ce XML à la main. Un bon outil de facturation le génère pour vous, sans que vous ayez à comprendre la moindre balise.

## Et concrètement avec Fatturi ?

Fatturi génère des factures au format Factur-X à partir de vos ventes, puis les transmet via une PDP agréée. Vous n'écrivez pas une ligne de XML : vous encaissez, la facture conforme part toute seule.
