import React from "react";
import { COLORS } from "../brand";

// Un maillon de chaîne (anneau arrondi), horizontal ou vertical.
const Link: React.FC<{
  w: number;
  h: number;
  thickness: number;
  color: string;
  opacity?: number;
}> = ({ w, h, thickness, color, opacity = 1 }) => {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ opacity }}>
      <rect
        x={thickness / 2}
        y={thickness / 2}
        width={w - thickness}
        height={h - thickness}
        rx={(Math.min(w, h) - thickness) / 2}
        ry={(Math.min(w, h) - thickness) / 2}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  );
};

// Chaîne à 3 maillons. Le maillon central (Fatturi) peut être mis en avant
// et animé (progress 0 -> 1) pour l'effet "chaînon qui se clipse".
export const Chain: React.FC<{
  unit?: number;
  thickness?: number;
  sideColor?: string;
  middleColor?: string;
  middleProgress?: number; // 0 = absent, 1 = en place
  middleLabel?: React.ReactNode;
}> = ({
  unit = 120,
  thickness = 20,
  sideColor = COLORS.ivoire,
  middleColor = COLORS.gold,
  middleProgress = 1,
  middleLabel,
}) => {
  const linkW = unit * 1.5;
  const linkH = unit;
  const overlap = thickness * 1.6;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Link w={linkW} h={linkH} thickness={thickness} color={sideColor} opacity={0.85} />
      <div
        style={{
          marginLeft: -overlap,
          marginRight: -overlap,
          position: "relative",
          transform: `scale(${0.6 + 0.4 * middleProgress})`,
          opacity: middleProgress,
          filter: `drop-shadow(0 0 ${18 * middleProgress}px rgba(200,149,42,0.6))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Link w={linkW} h={linkH} thickness={thickness + 4} color={middleColor} />
        {middleLabel ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {middleLabel}
          </div>
        ) : null}
      </div>
      <Link w={linkW} h={linkH} thickness={thickness} color={sideColor} opacity={0.85} />
    </div>
  );
};
