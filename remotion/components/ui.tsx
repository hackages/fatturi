import React from "react";
import { COLORS } from "../brand";
import { dmMono, dmSans } from "../fonts";

const shadow = "0 30px 60px rgba(0,0,0,0.28)";

// Carte "notification de paiement" (style encaissement en ligne).
export const PaymentCard: React.FC<{ processor?: string }> = ({
  processor = "Stripe",
}) => {
  return (
    <div
      style={{
        width: 760,
        backgroundColor: COLORS.ivoire,
        borderRadius: 34,
        boxShadow: shadow,
        padding: "44px 48px",
        fontFamily: dmSans,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <div style={{ width: 16, height: 16, borderRadius: 999, backgroundColor: COLORS.sage }} />
        <span
          style={{
            fontFamily: dmMono,
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 2,
            color: COLORS.sage,
            textTransform: "uppercase",
          }}
        >
          Paiement reçu
        </span>
      </div>

      <div
        style={{
          fontFamily: dmMono,
          fontSize: 96,
          fontWeight: 500,
          color: COLORS.navy,
          lineHeight: 1,
        }}
      >
        2 400,00 €
      </div>

      <div
        style={{
          marginTop: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 28, color: "rgba(13,13,15,0.62)" }}>
          Client · Studio Lumière
        </span>
        <span
          style={{
            backgroundColor: COLORS.navy,
            color: COLORS.ivoire,
            fontSize: 24,
            fontWeight: 700,
            padding: "10px 22px",
            borderRadius: 999,
          }}
        >
          {processor}
        </span>
      </div>
    </div>
  );
};

// Carte "email avec facture" reçue par le client.
export const InvoiceEmailCard: React.FC = () => {
  return (
    <div
      style={{
        width: 780,
        backgroundColor: COLORS.white,
        borderRadius: 34,
        boxShadow: shadow,
        overflow: "hidden",
        fontFamily: dmSans,
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.brume,
          padding: "26px 40px",
          borderBottom: `1px solid rgba(26,58,92,0.12)`,
        }}
      >
        <div style={{ fontSize: 24, color: "rgba(13,13,15,0.55)" }}>
          À : contact@studio-lumiere.fr
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.navy, marginTop: 6 }}>
          Votre facture — Fatturi
        </div>
      </div>

      <div style={{ padding: "34px 40px" }}>
        <div
          style={{
            border: `1px solid rgba(26,58,92,0.14)`,
            borderRadius: 18,
            padding: "28px 30px",
            backgroundColor: COLORS.ivoire,
          }}
        >
          <div
            style={{
              fontFamily: dmMono,
              fontSize: 26,
              color: COLORS.navy,
              letterSpacing: 1,
            }}
          >
            FACTURE N° 2026-0042
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22 }}>
            <span style={{ fontSize: 26, color: "rgba(13,13,15,0.6)" }}>Total TTC</span>
            <span style={{ fontFamily: dmMono, fontSize: 30, color: COLORS.navy }}>
              2 880,00 €
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28 }}>
          <span
            style={{
              backgroundColor: "rgba(200,149,42,0.15)",
              color: COLORS.gold,
              fontFamily: dmMono,
              fontSize: 22,
              padding: "10px 18px",
              borderRadius: 12,
            }}
          >
            📎 facture-2026-0042.pdf
          </span>
        </div>
      </div>
    </div>
  );
};

// Badge de statut (succès).
export const StatusBadge: React.FC<{ label: string }> = ({ label }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        backgroundColor: COLORS.sage,
        color: COLORS.white,
        fontFamily: dmSans,
        fontWeight: 700,
        fontSize: 34,
        padding: "18px 34px",
        borderRadius: 999,
        boxShadow: "0 16px 34px rgba(46,125,94,0.4)",
      }}
    >
      <span style={{ fontSize: 34 }}>✓</span>
      {label}
    </div>
  );
};

// Sous-titre burn-in (LinkedIn est muet par défaut).
export const Subtitle: React.FC<{ children: React.ReactNode; opacity: number }> = ({
  children,
  opacity,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        bottom: 240,
        textAlign: "center",
        opacity,
        fontFamily: dmSans,
        fontWeight: 700,
        fontSize: 44,
        lineHeight: 1.22,
        color: COLORS.ivoire,
        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </div>
  );
};
