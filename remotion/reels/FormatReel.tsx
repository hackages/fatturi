import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";

export const FORMAT_DURATION = COVER_HOLD + 348;

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
          fontSize: 90,
          lineHeight: 1.07,
          color: COLORS.ivoire,
          textAlign: "center",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        }}
      >
        « Ma facture, je l&apos;envoie{" "}
        <span style={{ color: COLORS.gold }}>par mail.</span> »
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>Ça, ce n&apos;est pas une facture électronique.</Caption>
    </AbsoluteFill>
  );
};

const DocCard: React.FC<{
  ok: boolean;
  tag: string;
  title: string;
  lines: string[];
  progress: number;
}> = ({ ok, tag, title, lines, progress }) => (
  <div
    style={{
      flex: 1,
      opacity: progress,
      transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
      backgroundColor: "rgba(245,242,236,0.05)",
      border: `2px solid ${ok ? COLORS.sage : "rgba(245,242,236,0.18)"}`,
      borderRadius: 28,
      padding: 44,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          backgroundColor: ok ? COLORS.sage : "rgba(245,242,236,0.25)",
          color: COLORS.white,
          fontSize: 34,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {ok ? "✓" : "✗"}
      </div>
      <div style={{ fontFamily: dmSans, fontWeight: 700, fontSize: 34, letterSpacing: 2, textTransform: "uppercase", color: ok ? COLORS.gold : "rgba(245,242,236,0.55)" }}>
        {tag}
      </div>
    </div>
    <div style={{ fontFamily: playfair, fontWeight: 700, fontSize: 52, lineHeight: 1.1, color: COLORS.ivoire, marginBottom: 24 }}>
      {title}
    </div>
    {lines.map((l, i) => (
      <div
        key={i}
        style={{ fontFamily: dmSans, fontWeight: 500, fontSize: 38, lineHeight: 1.3, color: "rgba(245,242,236,0.78)", marginTop: 10 }}
      >
        {l}
      </div>
    ))}
  </div>
);

const Compare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const left = spring({ frame, fps, config: { damping: 16 } });
  const right = spring({ frame: frame - 26, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 80 }}>
      <Watermark />
      <div style={{ width: "100%", maxWidth: 940 }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <Overline>PDF vs Factur-X</Overline>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "stretch" }}>
          <DocCard
            ok={false}
            tag="PDF par email"
            title="Une image de facture"
            lines={["Illisible par les logiciels", "Pas transmis à l'administration"]}
            progress={left}
          />
          <DocCard
            ok={true}
            tag="Factur-X"
            title="PDF + données XML"
            lines={["Lu automatiquement", "Transmis via une plateforme agréée"]}
            progress={right}
          />
        </div>
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>
        Une e-facture a un format structuré. Pas un simple PDF.
      </Caption>
    </AbsoluteFill>
  );
};

export const FormatReel: React.FC = () => (
  <ReelShell cover={{ kicker: "PDF ≠ e-facture", title: "Un PDF par email n'est pas une facture électronique." }}>
    <Sequence durationInFrames={84}>
      <Hook />
    </Sequence>
    <Sequence from={84} durationInFrames={180}>
      <Compare />
    </Sequence>
    <Sequence from={264} durationInFrames={84}>
      <CtaScene />
    </Sequence>
  </ReelShell>
);
