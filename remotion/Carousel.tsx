import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { COLORS, LOGO, NAVY_DEEP } from "./brand";
import { playfair, dmSans, dmMono } from "./fonts";
import { DottedBackground } from "./components/DottedBackground";
import { Chain } from "./components/Chain";

export const CAROUSEL_W = 1080;
export const CAROUSEL_H = 1350;
export const CAROUSEL_COUNT = 5;

const PageDots: React.FC<{ index: number; light?: boolean }> = ({ index, light }) => (
  <div style={{ display: "flex", gap: 12 }}>
    {Array.from({ length: CAROUSEL_COUNT }).map((_, i) => (
      <div
        key={i}
        style={{
          width: i === index ? 30 : 12,
          height: 12,
          borderRadius: 999,
          backgroundColor:
            i === index ? COLORS.gold : light ? "rgba(245,242,236,0.35)" : "rgba(26,58,92,0.25)",
        }}
      />
    ))}
  </div>
);

const Footer: React.FC<{ index: number; light?: boolean }> = ({ index, light }) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      bottom: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Img
      src={staticFile(light ? LOGO.fullLight : LOGO.full)}
      style={{ height: 40, width: "auto", opacity: 0.9 }}
    />
    <PageDots index={index} light={light} />
  </div>
);

const StepBadge: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      width: 92,
      height: 92,
      borderRadius: 999,
      backgroundColor: COLORS.gold,
      color: COLORS.navy,
      fontFamily: playfair,
      fontWeight: 900,
      fontSize: 52,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 14px 30px rgba(200,149,42,0.35)",
    }}
  >
    {n}
  </div>
);

const Overline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: dmSans,
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: 4,
      textTransform: "uppercase",
      color: COLORS.gold,
    }}
  >
    {children}
  </div>
);

const StepSlide: React.FC<{
  index: number;
  n: number;
  kicker: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}> = ({ index, n, kicker, title, body, visual }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.ivoire, fontFamily: dmSans }}>
    <div style={{ position: "absolute", left: 72, right: 72, top: 130 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 40 }}>
        <StepBadge n={n} />
        <Overline>{kicker}</Overline>
      </div>
      <div
        style={{
          fontFamily: playfair,
          fontWeight: 900,
          fontSize: 104,
          lineHeight: 1.0,
          color: COLORS.navy,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 46,
          lineHeight: 1.35,
          color: "rgba(13,13,15,0.72)",
          marginTop: 34,
          maxWidth: 860,
        }}
      >
        {body}
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        left: 72,
        right: 72,
        bottom: 210,
        display: "flex",
        justifyContent: "center",
      }}
    >
      {visual}
    </div>
    <Footer index={index} />
  </AbsoluteFill>
);

// Petites illustrations réutilisées.
const PaymentChip: React.FC = () => (
  <div
    style={{
      backgroundColor: COLORS.white,
      borderRadius: 26,
      padding: "30px 40px",
      boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
      display: "flex",
      alignItems: "center",
      gap: 24,
    }}
  >
    <div style={{ width: 18, height: 18, borderRadius: 999, backgroundColor: COLORS.sage }} />
    <span style={{ fontFamily: dmMono, fontSize: 40, color: COLORS.navy }}>2 400,00 €</span>
    <span
      style={{
        backgroundColor: COLORS.navy,
        color: COLORS.ivoire,
        fontSize: 26,
        fontWeight: 700,
        padding: "8px 20px",
        borderRadius: 999,
      }}
    >
      Stripe
    </span>
  </div>
);

const BrokenGap: React.FC = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <Chain unit={92} thickness={16} sideColor={COLORS.navy} middleColor={COLORS.gold} middleProgress={0} />
  </div>
);

const SentBadge: React.FC = () => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 16,
      backgroundColor: COLORS.sage,
      color: COLORS.white,
      fontFamily: dmSans,
      fontWeight: 700,
      fontSize: 40,
      padding: "20px 40px",
      borderRadius: 999,
      boxShadow: "0 16px 34px rgba(46,125,94,0.35)",
    }}
  >
    <span>✓</span> Facture envoyée par email
  </div>
);

export const CarouselSlide: React.FC<{ index: number }> = ({ index }) => {
  // Slide 0 — couverture
  if (index === 0) {
    return (
      <AbsoluteFill style={{ fontFamily: dmSans }}>
        <DottedBackground color={COLORS.navy} opacity={0.07} />
        <AbsoluteFill
          style={{
            background: `radial-gradient(900px 700px at 50% 42%, ${NAVY_DEEP}00, ${NAVY_DEEP})`,
            opacity: 0.5,
          }}
        />
        <div style={{ position: "absolute", left: 72, right: 72, top: 150 }}>
          <Overline>Paiements &amp; factures</Overline>
          <div
            style={{
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: 118,
              lineHeight: 1.02,
              color: COLORS.ivoire,
              marginTop: 30,
            }}
          >
            Votre chaîne de facturation a un{" "}
            <span style={{ color: COLORS.gold }}>maillon cassé</span>.
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", justifyContent: "center" }}>
          <Chain unit={128} thickness={22} sideColor={COLORS.ivoire} middleColor={COLORS.gold} middleProgress={0} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 200,
            textAlign: "center",
            color: "rgba(245,242,236,0.75)",
            fontSize: 34,
            fontWeight: 500,
          }}
        >
          Faites glisser →
        </div>
        <Footer index={index} light />
      </AbsoluteFill>
    );
  }

  if (index === 1) {
    return (
      <StepSlide
        index={index}
        n={1}
        kicker="La vente"
        title="Le paiement tombe"
        body="Stripe, PayPal, Shopify… vous encaissez en ligne. Facile, instantané."
        visual={<PaymentChip />}
      />
    );
  }

  if (index === 2) {
    return (
      <StepSlide
        index={index}
        n={2}
        kicker="Le trou"
        title="Et la facture ?"
        body="Export, copier-coller, PDF à la main, envoi. Chaque vente. Chaque mois. C'est là que la chaîne casse."
        visual={<BrokenGap />}
      />
    );
  }

  if (index === 3) {
    return (
      <StepSlide
        index={index}
        n={3}
        kicker="Le chaînon Fatturi"
        title="Facturé aussitôt"
        body="Fatturi relie vos paiements à la facture, envoyée par email automatiquement. Dès aujourd'hui, et prêt pour 2026."
        visual={<SentBadge />}
      />
    );
  }

  // Slide 4 — CTA
  return (
    <AbsoluteFill
      style={{ fontFamily: dmSans, alignItems: "center", justifyContent: "center", padding: 90 }}
    >
      <DottedBackground color={COLORS.navy} opacity={0.07} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 700px at 50% 45%, ${NAVY_DEEP}00, ${NAVY_DEEP})`,
          opacity: 0.5,
        }}
      />
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <Img src={staticFile(LOGO.fullLight)} style={{ height: 84, width: "auto" }} />
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 900,
            fontSize: 100,
            lineHeight: 1.03,
            color: COLORS.ivoire,
            marginTop: 56,
          }}
        >
          Fatturi relie les deux bouts.
        </div>
        <div style={{ fontSize: 44, color: "rgba(245,242,236,0.82)", marginTop: 30 }}>
          Encaissé aujourd&apos;hui, facturé aussitôt.
        </div>
        <div style={{ marginTop: 60 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: COLORS.gold,
              color: COLORS.navy,
              fontWeight: 700,
              fontSize: 40,
              padding: "24px 52px",
              borderRadius: 999,
            }}
          >
            Accès prioritaire → fatturi.com
          </span>
        </div>
        <div style={{ marginTop: 30, fontSize: 30, color: "rgba(245,242,236,0.6)" }}>
          Réponse sous 48h
        </div>
      </div>
    </AbsoluteFill>
  );
};
