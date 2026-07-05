import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS, NAVY_DEEP } from "./brand";
import { playfair, dmSans } from "./fonts";
import { DottedBackground } from "./components/DottedBackground";
import { Chain } from "./components/Chain";

export const BANNER_W = 1584;
export const BANNER_H = 396;

export const LinkedInBanner: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: dmSans }}>
      <DottedBackground color={COLORS.navy} opacity={0.07} />

      {/* Halo lumineux subtil derrière le texte */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(1100px 500px at 78% 40%, ${NAVY_DEEP}00 0%, ${NAVY_DEEP} 85%)`,
          opacity: 0.55,
        }}
      />

      {/* Motif de chaîne décoratif, très discret, à droite */}
      <div
        style={{
          position: "absolute",
          right: -60,
          top: 40,
          opacity: 0.1,
          transform: "rotate(-8deg)",
        }}
      >
        <Chain unit={90} thickness={16} sideColor={COLORS.ivoire} middleColor={COLORS.gold} />
      </div>

      {/* Pas de logo ici : l'avatar de la page LinkedIn l'affiche déjà (évite le doublon). */}

      {/* Bloc message — décalé à droite pour rester à l'écart de l'avatar/nom (gauche). */}
      <div
        style={{
          position: "absolute",
          left: 540,
          right: 72,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            color: COLORS.gold,
            textTransform: "uppercase",
          }}
        >
          Facturation en ligne automatisée
        </div>

        <div
          style={{
            fontFamily: playfair,
            fontWeight: 900,
            fontSize: 62,
            lineHeight: 1.02,
            color: COLORS.ivoire,
            letterSpacing: -0.5,
          }}
        >
          Le chaînon manquant
          <br />
          <span style={{ fontWeight: 700 }}>
            entre vos <span style={{ color: COLORS.gold }}>paiements</span> et vos{" "}
            <span style={{ color: COLORS.gold }}>factures</span>.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 6 }}>
          <div
            style={{
              fontSize: 21,
              color: "rgba(245,242,236,0.82)",
              fontWeight: 500,
            }}
          >
            Stripe · PayPal · Shopify → facture email automatique
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: COLORS.gold,
              color: COLORS.navy,
              fontWeight: 700,
              fontSize: 20,
              padding: "12px 26px",
              borderRadius: 999,
            }}
          >
            Accès prioritaire · fatturi.com
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
