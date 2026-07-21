import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";
import { AudioBed } from "./audioBed";

export const CHANNELS_DURATION = COVER_HOLD + 444;

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
          fontSize: 94,
          lineHeight: 1.06,
          color: COLORS.ivoire,
          textAlign: "center",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        }}
      >
        Tu vends en ligne ?{" "}
        <span style={{ color: COLORS.gold }}>Qui fait tes factures ?</span>
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>B2C, marketplace, vente directe : 3 cas.</Caption>
    </AbsoluteFill>
  );
};

const ChannelScene: React.FC<{ n: number; kicker: string; title: string; body: string; caption: string }> = ({
  n,
  kicker,
  title,
  body,
  caption,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const badge = spring({ frame, fps, config: { damping: 12, mass: 0.7 } });
  const t = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <Watermark />
      <div style={{ width: "100%", maxWidth: 900 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 34 }}>
          <div
            style={{
              flex: "0 0 auto",
              width: 92,
              height: 92,
              borderRadius: 999,
              backgroundColor: COLORS.gold,
              color: COLORS.navy,
              fontFamily: playfair,
              fontWeight: 900,
              fontSize: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${badge})`,
            }}
          >
            {n}
          </div>
          <div style={{ opacity: t }}>
            <Overline>{kicker}</Overline>
          </div>
        </div>
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 900,
            fontSize: 88,
            lineHeight: 1.05,
            color: COLORS.ivoire,
            opacity: t,
            transform: `translateY(${interpolate(t, [0, 1], [24, 0])}px)`,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 50,
            lineHeight: 1.3,
            color: "rgba(245,242,236,0.82)",
            marginTop: 30,
            opacity: t,
          }}
        >
          {body}
        </div>
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>{caption}</Caption>
    </AbsoluteFill>
  );
};

export const ChannelsReel: React.FC<{ withBgm?: boolean }> = ({ withBgm = true }) => (
  <AbsoluteFill>
    <AudioBed withBgm={withBgm} voFile="campaign/audio/j6-vo.mp3" />
    <ReelShell cover={{ kicker: "Vendre en ligne", title: "Qui facture, selon ton canal ?" }}>
      <Sequence durationInFrames={72}>
        <Hook />
      </Sequence>
      <Sequence from={72} durationInFrames={96}>
        <ChannelScene
          n={1}
          kicker="Clients particuliers"
          title="B2C = e-reporting"
          body="Pas de facture électronique, mais les données de tes encaissements sont transmises."
          caption="Vendre à des particuliers reste concerné."
        />
      </Sequence>
      <Sequence from={168} durationInFrames={96}>
        <ChannelScene
          n={2}
          kicker="Marketplaces"
          title="Amazon, Uber, Vinted…"
          body="La plateforme peut facturer, mais ton e-reporting et tes ventes hors plateforme restent à toi."
          caption="La plateforme ne fait pas tout."
        />
      </Sequence>
      <Sequence from={264} durationInFrames={96}>
        <ChannelScene
          n={3}
          kicker="Vente directe"
          title="Stripe · PayPal · Shopify"
          body="Chaque encaissement devient une facture conforme, prête pour le e-reporting."
          caption="C'est là que Fatturi automatise tout."
        />
      </Sequence>
      <Sequence from={360} durationInFrames={84}>
        <CtaScene />
      </Sequence>
    </ReelShell>
  </AbsoluteFill>
);
