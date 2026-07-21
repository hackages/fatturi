import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";
import { AudioBed } from "./audioBed";

export const BEFOREAFTER_DURATION = COVER_HOLD + 414;

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
          fontSize: 96,
          lineHeight: 1.05,
          color: COLORS.ivoire,
          textAlign: "center",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        }}
      >
        Votre facturation : <span style={{ color: COLORS.gold }}>avant / après</span>.
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>Le même mois, deux réalités.</Caption>
    </AbsoluteFill>
  );
};

const Before: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tasks = [
    "Exporter les ventes Stripe / PayPal",
    "Recopier chaque client à la main",
    "Générer chaque PDF, un par un",
    "N'oublier aucune vente",
    "Renvoyer les factures manquantes",
  ];
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <Watermark />
      <div style={{ width: "100%", maxWidth: 880 }}>
        <Overline color="rgba(245,242,236,0.55)">Avant</Overline>
        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 26 }}>
          {tasks.map((t, i) => {
            const a = spring({ frame: frame - i * 10, fps, config: { damping: 18 } });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 22, opacity: a }}>
                <span style={{ fontSize: 44, color: "rgba(245,242,236,0.4)" }}>✗</span>
                <span style={{ fontFamily: dmSans, fontSize: 46, color: "rgba(245,242,236,0.7)" }}>{t}</span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 54, fontFamily: dmSans, fontWeight: 800, fontSize: 72, letterSpacing: 1, color: "rgba(245,242,236,0.85)" }}>
          ≈ 3 h / mois
        </div>
      </div>
    </AbsoluteFill>
  );
};

const After: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 15 } });
  const stamp = spring({ frame: frame - 30, fps, config: { damping: 12, mass: 0.7 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <Watermark />
      <div style={{ width: "100%", maxWidth: 880, opacity: s, transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)` }}>
        <Overline color={COLORS.sage}>Après</Overline>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 44 }}>
          <div
            style={{
              flex: "0 0 auto",
              width: 68,
              height: 68,
              borderRadius: 999,
              backgroundColor: COLORS.sage,
              color: COLORS.white,
              fontSize: 40,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✓
          </div>
          <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 66, lineHeight: 1.15, color: COLORS.ivoire }}>
            Vous branchez une fois.
          </div>
        </div>
        <div style={{ fontFamily: dmSans, fontSize: 48, color: "rgba(245,242,236,0.8)", marginTop: 28, marginLeft: 92 }}>
          Chaque vente devient une facture envoyée par email, automatiquement.
        </div>
        <div style={{ marginTop: 50, marginLeft: 92, fontFamily: dmSans, fontWeight: 800, fontSize: 92, letterSpacing: 1, color: COLORS.gold, transform: `scale(${stamp})`, transformOrigin: "left center" }}>
          0 h / mois
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const BeforeAfterReel: React.FC<{ withBgm?: boolean }> = ({ withBgm = true }) => (
  <AbsoluteFill>
    <AudioBed withBgm={withBgm} voFile="campaign/audio/j4-vo.mp3" />
    <ReelShell cover={{ kicker: "Avant / Après", title: "Votre facturation, avant et après Fatturi." }}>
      <Sequence durationInFrames={72}>
        <Hook />
      </Sequence>
      <Sequence from={72} durationInFrames={138}>
        <Before />
      </Sequence>
      <Sequence from={210} durationInFrames={120}>
        <After />
      </Sequence>
      <Sequence from={330} durationInFrames={84}>
        <CtaScene />
      </Sequence>
    </ReelShell>
  </AbsoluteFill>
);
