import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./brand";
import { playfair, dmSans } from "./fonts";

export const BANNER_W = 1584;
export const BANNER_H = 396;

// Motif de chaîne en fil fin (line-art), discret — clin d'œil au "chaînon".
const ChainMotif: React.FC = () => {
  const link = { w: 150, h: 92, r: 46, t: 3.5 };
  const step = 96;
  const links = 7;
  return (
    <svg
      width={step * links + link.w}
      height={260}
      style={{ position: "absolute", left: -70, top: -18, opacity: 0.09 }}
    >
      <g transform="rotate(-9 0 130)">
        {Array.from({ length: links }).map((_, i) => (
          <rect
            key={i}
            x={20 + i * step}
            y={90}
            width={link.w}
            height={link.h}
            rx={link.r}
            ry={link.r}
            fill="none"
            stroke={COLORS.ivoire}
            strokeWidth={link.t}
          />
        ))}
      </g>
    </svg>
  );
};

export const LinkedInBanner: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy, fontFamily: dmSans }}>
      <ChainMotif />

      {/* Message unique, sobre, aligné à droite (zone gauche libre pour l'avatar). */}
      <div
        style={{
          position: "absolute",
          right: 92,
          top: 0,
          bottom: 0,
          width: 900,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "center",
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 700,
            fontSize: 42,
            lineHeight: 1.22,
            color: COLORS.ivoire,
            letterSpacing: 0.2,
          }}
        >
          Le chaînon manquant entre
          <br />
          vos paiements et vos factures.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 22,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: 999, backgroundColor: COLORS.gold }} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(245,242,236,0.55)",
            }}
          >
            fatturi.com
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
