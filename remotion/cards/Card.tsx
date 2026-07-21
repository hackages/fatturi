import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, LOGO, NAVY_DEEP } from "../brand";
import { playfair, dmSans } from "../fonts";
import { DottedBackground } from "../components/DottedBackground";

export const CARD_W = 1080;
export const CARD_H = 1350;

type CardData =
  | { kind: "quote"; kicker: string; quote: string; sub: string }
  | { kind: "stat"; kicker: string; big: string; sub: string };

export const CARDS: Record<string, CardData> = {
  "reform-2026": {
    kind: "stat",
    kicker: "Réforme e-invoicing",
    big: "2026",
    sub: "La facturation électronique devient obligatoire pour les entreprises assujetties à la TVA. Fatturi vous met en règle, sans rien changer à vos habitudes.",
  },
  "morning-invoiced": {
    kind: "quote",
    kicker: "L'idée derrière Fatturi",
    quote: "Encaissé le matin, facturé avant midi.",
    sub: "Sans y penser. Chaque vente devient une facture envoyée automatiquement.",
  },
  "autoentrepreneur": {
    kind: "quote",
    kicker: "Auto-entrepreneur ?",
    quote: "Concerné, vous aussi.",
    sub: "Réception dès 2026, émission dès 2027. Le montant de votre CA n'y change rien.",
  },
  "pdp-security": {
    kind: "quote",
    kicker: "Sécurité",
    quote: "Une plateforme agréée par l'État.",
    sub: "Données chiffrées, plateforme certifiée. Fatturi s'appuie sur une PA pour envoyer vos factures.",
  },
  "b2c-ereporting": {
    kind: "quote",
    kicker: "Clients particuliers",
    quote: "B2C ≠ hors réforme.",
    sub: "Pas de facture électronique vers un particulier — mais le e-reporting de tes encaissements, oui.",
  },
  "receive-2026": {
    kind: "quote",
    kicker: "Réception",
    quote: "Dès septembre 2026.",
    sub: "Toutes les entreprises doivent pouvoir recevoir une facture électronique — même si vous émettez en 2027.",
  },
  "cost-truth": {
    kind: "quote",
    kicker: "Le vrai coût",
    quote: "Ce n'est pas l'abonnement.",
    sub: "Ce sont les 20 heures par mois passées à facturer à la main. Fatturi remet le compteur à 0.",
  },
  "pdp-trust": {
    kind: "quote",
    kicker: "Confiance",
    quote: "Agréée par l'État.",
    sub: "Les PA sont certifiées : chiffrement et sécurité obligatoires. Fatturi s'appuie sur ce cadre.",
  },
};

const Bg: React.FC = () => (
  <>
    <DottedBackground color={COLORS.navy} opacity={0.07} />
    <AbsoluteFill style={{ background: `radial-gradient(900px 800px at 50% 42%, ${NAVY_DEEP}00, ${NAVY_DEEP})`, opacity: 0.55 }} />
  </>
);

const Frame: React.FC<{ kicker: string; children: React.ReactNode }> = ({ kicker, children }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.navy, fontFamily: dmSans }}>
    <Bg />
    <div style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Img src={staticFile(LOGO.fullLight)} style={{ height: 64, width: "auto" }} />
    </div>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 96 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: COLORS.gold, marginBottom: 34 }}>
          {kicker}
        </div>
        {children}
      </div>
    </AbsoluteFill>
    <div style={{ position: "absolute", bottom: 84, left: 0, right: 0, textAlign: "center", color: "rgba(245,242,236,0.7)", fontWeight: 600, fontSize: 32 }}>
      fatturi.com
    </div>
  </AbsoluteFill>
);

export const Card: React.FC<{ id: string }> = ({ id }) => {
  const data = CARDS[id];
  if (!data) return <AbsoluteFill style={{ backgroundColor: COLORS.navy }} />;
  if (data.kind === "stat") {
    return (
      <Frame kicker={data.kicker}>
        <div style={{ fontFamily: playfair, fontWeight: 900, fontSize: 300, lineHeight: 1, color: COLORS.gold }}>{data.big}</div>
        <div style={{ fontSize: 46, lineHeight: 1.35, color: COLORS.ivoire, marginTop: 30, maxWidth: 800 }}>{data.sub}</div>
      </Frame>
    );
  }
  return (
    <Frame kicker={data.kicker}>
      <div style={{ fontFamily: playfair, fontWeight: 900, fontSize: 96, lineHeight: 1.12, color: COLORS.ivoire }}>
        « {data.quote} »
      </div>
      <div style={{ fontSize: 46, lineHeight: 1.35, color: "rgba(245,242,236,0.82)", marginTop: 40, maxWidth: 800 }}>{data.sub}</div>
    </Frame>
  );
};
