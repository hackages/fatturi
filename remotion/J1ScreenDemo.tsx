import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, LOGO, NAVY_DEEP } from "./brand";
import { playfair, dmSans } from "./fonts";
import { DottedBackground } from "./components/DottedBackground";
import { Chain } from "./components/Chain";
import { InvoiceEmailCard, PaymentCard, StatusBadge, Subtitle } from "./components/ui";

export const VIDEO_W = 1080;
export const VIDEO_H = 1920;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION = 540; // 18s

// Fondu d'apparition/disparition d'un sous-titre sur la durée d'une scène.
const sceneFade = (frame: number, duration: number) =>
  interpolate(
    frame,
    [0, 12, duration - 14, duration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

const Backdrop: React.FC = () => (
  <>
    <DottedBackground color={COLORS.navy} opacity={0.06} />
    <AbsoluteFill
      style={{
        background: `radial-gradient(900px 900px at 50% 38%, ${NAVY_DEEP}00, ${NAVY_DEEP})`,
        opacity: 0.5,
      }}
    />
  </>
);

const Watermark: React.FC<{ height?: number }> = ({ height = 92 }) => (
  <div
    style={{
      position: "absolute",
      top: 96,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Img src={staticFile(LOGO.fullLight)} style={{ height, width: "auto", opacity: 0.95 }} />
  </div>
);

const Overline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: dmSans,
      fontWeight: 700,
      fontSize: 26,
      letterSpacing: 5,
      textTransform: "uppercase",
      color: COLORS.gold,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

const SceneVente: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, mass: 0.7 } });
  const y = interpolate(s, [0, 1], [80, 0]);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Watermark />
      <div style={{ transform: `translateY(${y}px)`, opacity: s, textAlign: "center" }}>
        <div style={{ marginBottom: 40 }}>
          <Overline>Une vente en ligne</Overline>
        </div>
        <PaymentCard processor="Stripe" />
      </div>
      <Subtitle opacity={sceneFade(frame, durationInFrames)}>
        Une vente vient de tomber.
      </Subtitle>
    </AbsoluteFill>
  );
};

const SceneAgit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const snap = spring({ frame: frame - 18, fps, config: { damping: 12, mass: 0.9 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Watermark />
      <div style={{ marginBottom: 56 }}>
        <Overline>Fatturi agit</Overline>
      </div>
      <Chain
        unit={150}
        thickness={26}
        sideColor={COLORS.ivoire}
        middleColor={COLORS.gold}
        middleProgress={snap}
        middleLabel={
          <Img
            src={staticFile(LOGO.markLight)}
            style={{ width: 120, height: "auto", opacity: snap }}
          />
        }
      />
      <div
        style={{
          display: "flex",
          gap: 120,
          marginTop: 60,
          fontFamily: dmSans,
          fontWeight: 700,
          fontSize: 30,
          color: "rgba(245,242,236,0.85)",
        }}
      >
        <span>Encaissé</span>
        <span>Facturé</span>
      </div>
      <Subtitle opacity={sceneFade(frame, durationInFrames)}>
        Fatturi prend le relais, tout seul.
      </Subtitle>
    </AbsoluteFill>
  );
};

const SceneFacture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const card = spring({ frame, fps, config: { damping: 15, mass: 0.8 } });
  const cardY = interpolate(card, [0, 1], [120, 0]);
  const badge = spring({ frame: frame - 46, fps, config: { damping: 10, mass: 0.6 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Watermark />
      <div style={{ transform: `translateY(${cardY}px)`, opacity: card }}>
        <InvoiceEmailCard />
      </div>
      <div style={{ marginTop: 48, transform: `scale(${badge})`, opacity: badge }}>
        <StatusBadge label="Facture envoyée" />
      </div>
      <Subtitle opacity={sceneFade(frame, durationInFrames)}>
        Envoyée par email à votre client.
      </Subtitle>
    </AbsoluteFill>
  );
};

const SceneEnd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, mass: 0.8 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <div style={{ opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.9, 1])})`, textAlign: "center" }}>
        <Img src={staticFile(LOGO.fullLight)} style={{ height: 92, width: "auto" }} />
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 900,
            fontSize: 74,
            color: COLORS.ivoire,
            lineHeight: 1.05,
            marginTop: 54,
          }}
        >
          Le chaînon manquant.
        </div>
        <div
          style={{
            fontFamily: dmSans,
            fontSize: 34,
            color: "rgba(245,242,236,0.8)",
            marginTop: 24,
          }}
        >
          Encaissé aujourd&apos;hui, facturé aussitôt.
        </div>
        <div style={{ marginTop: 54 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: COLORS.gold,
              color: COLORS.navy,
              fontFamily: dmSans,
              fontWeight: 700,
              fontSize: 34,
              padding: "20px 44px",
              borderRadius: 999,
            }}
          >
            Accès prioritaire → fatturi.com
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const w = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10 }}>
      <div style={{ width: `${w}%`, height: "100%", backgroundColor: COLORS.gold }} />
    </div>
  );
};

export const J1ScreenDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
      <Backdrop />
      <Sequence durationInFrames={96}>
        <SceneVente />
      </Sequence>
      <Sequence from={96} durationInFrames={150}>
        <SceneAgit />
      </Sequence>
      <Sequence from={246} durationInFrames={180}>
        <SceneFacture />
      </Sequence>
      <Sequence from={426} durationInFrames={114}>
        <SceneEnd />
      </Sequence>
      <ProgressBar />
    </AbsoluteFill>
  );
};
