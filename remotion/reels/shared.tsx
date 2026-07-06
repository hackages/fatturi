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
import { COLORS, LOGO, NAVY_DEEP } from "../brand";
import { playfair, dmSans } from "../fonts";
import { DottedBackground } from "../components/DottedBackground";

export const REEL_W = 1080;
export const REEL_H = 1920;
export const REEL_FPS = 30;
// Playbook §2 : maintenir une couverture de marque ~0.6s en frame 0 pour la
// miniature du grid Instagram (IG ignore cover_url et prend la 1re frame).
export const COVER_HOLD = 18;

export const Backdrop: React.FC = () => (
  <>
    <DottedBackground color={COLORS.navy} opacity={0.06} />
    <AbsoluteFill
      style={{
        background: `radial-gradient(900px 900px at 50% 40%, ${NAVY_DEEP}00, ${NAVY_DEEP})`,
        opacity: 0.5,
      }}
    />
  </>
);

export const Watermark: React.FC<{ height?: number }> = ({ height = 78 }) => (
  <div style={{ position: "absolute", top: 96, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
    <Img src={staticFile(LOGO.fullLight)} style={{ height, width: "auto", opacity: 0.95 }} />
  </div>
);

export const Overline: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = COLORS.gold,
}) => (
  <div
    style={{
      fontFamily: dmSans,
      fontWeight: 700,
      fontSize: 30,
      letterSpacing: 5,
      textTransform: "uppercase",
      color,
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const w = interpolate(frame, [0, durationInFrames], [0, 100], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10 }}>
      <div style={{ width: `${w}%`, height: "100%", backgroundColor: COLORS.gold }} />
    </div>
  );
};

// Couverture de marque tenue en frame 0 (grid IG).
export const Cover: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
    <Backdrop />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 110 }}>
      <Img src={staticFile(LOGO.fullLight)} style={{ height: 78, width: "auto" }} />
      <div style={{ marginTop: 60 }}>
        <Overline>{kicker}</Overline>
      </div>
      <div
        style={{
          fontFamily: playfair,
          fontWeight: 900,
          fontSize: 96,
          lineHeight: 1.04,
          color: COLORS.ivoire,
          textAlign: "center",
          marginTop: 30,
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// Sous-titre burn-in (feed muet).
export const Caption: React.FC<{ children: React.ReactNode; opacity?: number }> = ({
  children,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: 90,
      right: 90,
      bottom: 250,
      textAlign: "center",
      opacity,
      fontFamily: dmSans,
      fontWeight: 700,
      fontSize: 46,
      lineHeight: 1.24,
      color: COLORS.ivoire,
      textShadow: "0 4px 20px rgba(0,0,0,0.5)",
    }}
  >
    {children}
  </div>
);

// Scène de clôture commune (marque + CTA), identique sur tous les reels.
export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 16, mass: 0.8 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <div style={{ opacity: s, transform: `scale(${interpolate(s, [0, 1], [0.92, 1])})`, textAlign: "center" }}>
        <Img src={staticFile(LOGO.fullLight)} style={{ height: 88, width: "auto" }} />
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 900,
            fontSize: 72,
            color: COLORS.ivoire,
            marginTop: 48,
            lineHeight: 1.05,
          }}
        >
          Encaissé aujourd&apos;hui,
          <br />
          facturé aussitôt.
        </div>
        <div style={{ marginTop: 46 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: COLORS.gold,
              color: COLORS.navy,
              fontFamily: dmSans,
              fontWeight: 700,
              fontSize: 36,
              padding: "22px 48px",
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

// Enveloppe reel : couverture tenue en frame 0, puis contenu.
export const ReelShell: React.FC<{
  cover: { kicker: string; title: string };
  children: React.ReactNode;
}> = ({ cover, children }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.navy }}>
    <Backdrop />
    <Sequence durationInFrames={COVER_HOLD}>
      <Cover kicker={cover.kicker} title={cover.title} />
    </Sequence>
    <Sequence from={COVER_HOLD}>{children}</Sequence>
    <ProgressBar />
  </AbsoluteFill>
);

// Helper de fondu de scène.
export const fadeScene = (frame: number, duration: number) =>
  interpolate(frame, [0, 12, duration - 14, duration], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
