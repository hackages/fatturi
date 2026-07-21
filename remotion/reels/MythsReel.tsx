import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";
import { AudioBed } from "./audioBed";

export const MYTHS_DURATION = COVER_HOLD + 456;

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
          fontSize: 100,
          lineHeight: 1.05,
          color: COLORS.ivoire,
          textAlign: "center",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        }}
      >
        3 <span style={{ color: COLORS.gold }}>idées reçues</span> sur vos factures.
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>On remet les choses au clair.</Caption>
    </AbsoluteFill>
  );
};

const MythFlip: React.FC<{ n: number; myth: string; reality: string }> = ({ n, myth, reality }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mIn = spring({ frame, fps, config: { damping: 16 } });
  const strike = interpolate(frame, [34, 52], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rIn = spring({ frame: frame - 44, fps, config: { damping: 15 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <Watermark />
      <div style={{ width: "100%", maxWidth: 900 }}>
        <div style={{ marginBottom: 26, opacity: mIn }}>
          <Overline>Idée reçue #{n}</Overline>
        </div>

        <div style={{ position: "relative", opacity: mIn, transform: `translateY(${interpolate(mIn, [0, 1], [24, 0])}px)` }}>
          <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 62, lineHeight: 1.15, color: "rgba(245,242,236,0.75)" }}>
            {myth}
          </div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: `${strike}%`,
              height: 5,
              backgroundColor: COLORS.gold,
              borderRadius: 999,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 22,
            marginTop: 54,
            opacity: rIn,
            transform: `translateY(${interpolate(rIn, [0, 1], [30, 0])}px)`,
          }}
        >
          <div
            style={{
              flex: "0 0 auto",
              width: 60,
              height: 60,
              borderRadius: 999,
              backgroundColor: COLORS.sage,
              color: COLORS.white,
              fontSize: 38,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✓
          </div>
          <div style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 52, lineHeight: 1.25, color: COLORS.ivoire }}>
            {reality}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MythsReel: React.FC<{ withBgm?: boolean }> = ({ withBgm = true }) => (
  <AbsoluteFill>
    <AudioBed withBgm={withBgm} voFile="campaign/audio/j3-vo.mp3" />
    <ReelShell cover={{ kicker: "Idées reçues", title: "Ce qu'on croit (à tort) sur la facturation." }}>
      <Sequence durationInFrames={66}>
        <Hook />
      </Sequence>
      <Sequence from={66} durationInFrames={102}>
        <MythFlip n={1} myth="« Facturer, ça prend 2 minutes. »" reality="× 300 ventes = 20 h par mois, à la main." />
      </Sequence>
      <Sequence from={168} durationInFrames={102}>
        <MythFlip n={2} myth="« La réforme 2026, c'est pour les grandes entreprises. »" reality="Toutes les entreprises à la TVA sont concernées." />
      </Sequence>
      <Sequence from={270} durationInFrames={102}>
        <MythFlip n={3} myth="« Automatiser sa facturation, c'est compliqué. »" reality="Stripe, PayPal, Shopify : branchés en quelques clics." />
      </Sequence>
      <Sequence from={372} durationInFrames={84}>
        <CtaScene />
      </Sequence>
    </ReelShell>
  </AbsoluteFill>
);
