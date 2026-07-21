import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";
import { AudioBed } from "./audioBed";

export const SECURITY_DURATION = COVER_HOLD + 396;

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
          fontSize: 84,
          lineHeight: 1.06,
          color: COLORS.ivoire,
          textAlign: "center",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        }}
      >
        Et si la plateforme se fait{" "}
        <span style={{ color: COLORS.gold }}>pirater</span> ?
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>La vraie question, c&apos;est l&apos;agrément.</Caption>
    </AbsoluteFill>
  );
};

const Beat: React.FC<{ kicker: string; title: string; body: string; caption: string }> = ({
  kicker,
  title,
  body,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = spring({ frame, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <Watermark />
      <div style={{ width: "100%", maxWidth: 920, opacity: t, transform: `translateY(${interpolate(t, [0, 1], [24, 0])}px)` }}>
        <Overline>{kicker}</Overline>
        <div style={{ fontFamily: playfair, fontWeight: 900, fontSize: 78, lineHeight: 1.05, color: COLORS.ivoire, marginTop: 28 }}>
          {title}
        </div>
        <div style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 46, lineHeight: 1.3, color: "rgba(245,242,236,0.82)", marginTop: 28 }}>
          {body}
        </div>
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>{caption}</Caption>
    </AbsoluteFill>
  );
};

export const SecurityReel: React.FC<{ withBgm?: boolean }> = ({ withBgm = true }) => (
  <AbsoluteFill>
    <AudioBed withBgm={withBgm} voFile="campaign/audio/j14-vo.mp3" />
    <ReelShell cover={{ kicker: "Sécurité", title: "Une plateforme agréée par l'État." }}>
      <Sequence durationInFrames={90}>
        <Hook />
      </Sequence>
      <Sequence from={90} durationInFrames={108}>
        <Beat
          kicker="PDP"
          title="Certifiée, pas au hasard"
          body="Les plateformes de dématérialisation partenaires sont agréées par l'État."
          caption="Exigences de sécurité et de chiffrement."
        />
      </Sequence>
      <Sequence from={198} durationInFrames={108}>
        <Beat
          kicker="Tes données"
          title="Protégées par le cadre légal"
          body="Ce n'est pas un SaaS improvisé : c'est le circuit officiel de la réforme."
          caption="Fatturi s'appuie sur une PDP agréée."
        />
      </Sequence>
      <Sequence from={306} durationInFrames={90}>
        <CtaScene />
      </Sequence>
    </ReelShell>
  </AbsoluteFill>
);
