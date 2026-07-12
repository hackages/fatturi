import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";

export const CONCERNED_DURATION = COVER_HOLD + 378;

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 100 }}>
      <Watermark />
      <div
        style={{
          fontFamily: playfair,
          fontWeight: 900,
          fontSize: 92,
          lineHeight: 1.06,
          color: COLORS.ivoire,
          textAlign: "center",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        }}
      >
        Pas à la TVA ? Auto-entrepreneur ?{" "}
        <span style={{ color: COLORS.gold }}>Concerné quand même.</span>
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>La réforme 2026, en 15 secondes.</Caption>
    </AbsoluteFill>
  );
};

const Milestone: React.FC<{ year: string; label: string; title: string; caption: string; who: string }> = ({
  year,
  label,
  title,
  caption,
  who,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const y = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const t = spring({ frame: frame - 14, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <Watermark />
      <div style={{ marginBottom: 10, opacity: y }}>
        <Overline>{label}</Overline>
      </div>
      <div
        style={{
          fontFamily: playfair,
          fontWeight: 900,
          fontSize: 260,
          lineHeight: 1,
          letterSpacing: -2,
          color: COLORS.gold,
          transform: `scale(${interpolate(y, [0, 1], [0.9, 1])})`,
        }}
      >
        {year}
      </div>
      <div
        style={{
          fontFamily: dmSans,
          fontWeight: 700,
          fontSize: 60,
          color: COLORS.ivoire,
          textAlign: "center",
          marginTop: 6,
          opacity: t,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginTop: 40,
          opacity: t,
          transform: `translateY(${interpolate(t, [0, 1], [24, 0])}px)`,
        }}
      >
        <div
          style={{
            flex: "0 0 auto",
            width: 56,
            height: 56,
            borderRadius: 999,
            backgroundColor: COLORS.sage,
            color: COLORS.white,
            fontSize: 34,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✓
        </div>
        <div style={{ fontFamily: dmSans, fontWeight: 600, fontSize: 46, color: COLORS.ivoire }}>{who}</div>
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>{caption}</Caption>
    </AbsoluteFill>
  );
};

export const ConcernedReel: React.FC = () => (
  <ReelShell cover={{ kicker: "Suis-je concerné ?", title: "La réforme 2026 vous concerne aussi." }}>
    <Sequence durationInFrames={78}>
      <Hook />
    </Sequence>
    <Sequence from={78} durationInFrames={108}>
      <Milestone
        year="2026"
        label="Réception"
        title="Recevoir en électronique"
        who="Toutes les entreprises, dès le 1er sept."
        caption="Même micro, même sans TVA : obligatoire pour tous."
      />
    </Sequence>
    <Sequence from={186} durationInFrames={108}>
      <Milestone
        year="2027"
        label="Émission"
        title="Émettre vos factures B2B"
        who="TPE, micro & auto-entrepreneurs, dès le 1er sept."
        caption="Le montant de votre CA n'y change rien."
      />
    </Sequence>
    <Sequence from={294} durationInFrames={84}>
      <CtaScene />
    </Sequence>
  </ReelShell>
);
