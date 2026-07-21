import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";
import { AudioBed } from "./audioBed";

export const COUNTER_DURATION = COVER_HOLD + 432;

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
        Combien d&apos;heures vos factures vous{" "}
        <span style={{ color: COLORS.gold }}>coûtent</span> ?
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>Faisons le calcul.</Caption>
    </AbsoluteFill>
  );
};

const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const hours = interpolate(frame, [20, 120], [0, 20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line1 = spring({ frame: frame - 6, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Watermark />
      <div style={{ marginBottom: 34, opacity: line1 }}>
        <Overline>300 ventes / mois × 4 min de saisie</Overline>
      </div>
      <div
        style={{
          fontFamily: dmSans,
          fontWeight: 700,
          fontSize: 320,
          lineHeight: 1,
          letterSpacing: -2,
          color: COLORS.ivoire,
        }}
      >
        {Math.round(hours)}
      </div>
      <div style={{ fontFamily: dmSans, fontWeight: 700, fontSize: 56, color: COLORS.gold, marginTop: -10 }}>
        heures / mois
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>
        20 heures perdues à recopier. Chaque mois.
      </Caption>
    </AbsoluteFill>
  );
};

const Turn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const pop = spring({ frame, fps, config: { damping: 11, mass: 0.7 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Watermark />
      <div style={{ marginBottom: 30, opacity: pop }}>
        <Overline color={COLORS.sage}>Avec Fatturi</Overline>
      </div>
      <div
        style={{
          fontFamily: dmSans,
          fontWeight: 700,
          fontSize: 340,
          lineHeight: 1,
          letterSpacing: -2,
          color: COLORS.gold,
          transform: `scale(${pop})`,
        }}
      >
        0
      </div>
      <div style={{ fontFamily: dmSans, fontWeight: 700, fontSize: 56, color: COLORS.ivoire, marginTop: -6 }}>
        heure / mois
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>
        Fatturi facture à votre place, automatiquement.
      </Caption>
    </AbsoluteFill>
  );
};

export const CounterReel: React.FC<{ withBgm?: boolean; voFile?: string }> = ({
  withBgm = true,
  voFile = "campaign/audio/j2-vo.mp3",
}) => (
  <AbsoluteFill>
    <AudioBed withBgm={withBgm} voFile={voFile} />
    <ReelShell cover={{ kicker: "Le coût caché", title: "Le temps que vos factures vous coûtent." }}>
      <Sequence durationInFrames={84}>
        <Hook />
      </Sequence>
      <Sequence from={84} durationInFrames={186}>
        <Counter />
      </Sequence>
      <Sequence from={270} durationInFrames={78}>
        <Turn />
      </Sequence>
      <Sequence from={348} durationInFrames={84}>
        <CtaScene />
      </Sequence>
    </ReelShell>
  </AbsoluteFill>
);
