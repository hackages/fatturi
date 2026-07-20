import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../brand";
import { playfair, dmSans } from "../fonts";
import { CtaScene, Caption, Overline, ReelShell, Watermark, COVER_HOLD, fadeScene } from "./shared";

// Durées calées sur les VO ElevenLabs (30 fps) + respiration courte.
// hook 4.0s · b2c 3.4s · e-reporting 4.8s · métiers 3.2s · cta 4.2s
const HOOK = 132;
const BEAT1 = 114;
const BEAT2 = 156;
const BEAT3 = 108;
const CTA = 138;

export const B2C_DURATION = COVER_HOLD + HOOK + BEAT1 + BEAT2 + BEAT3 + CTA;

const AUDIO = {
  bgm: "campaign/audio/j11-bgm-warm-acoustic.mp3",
  hook: "campaign/audio/j11-vo-hook.mp3",
  b2c: "campaign/audio/j11-vo-b2c.mp3",
  ereporting: "campaign/audio/j11-vo-ereporting.mp3",
  metiers: "campaign/audio/j11-vo-metiers.mp3",
  cta: "campaign/audio/j11-vo-cta.mp3",
};

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
          lineHeight: 1.06,
          color: COLORS.ivoire,
          textAlign: "center",
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
        }}
      >
        Tu ne factures que des{" "}
        <span style={{ color: COLORS.gold }}>particuliers</span> ?
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>
        La réforme te concerne quand même.
      </Caption>
    </AbsoluteFill>
  );
};

const Beat: React.FC<{
  kicker: string;
  title: string;
  body: string;
  caption: string;
}> = ({ kicker, title, body, caption }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = spring({ frame, fps, config: { damping: 16 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", padding: 90 }}>
      <Watermark />
      <div style={{ width: "100%", maxWidth: 920, opacity: t, transform: `translateY(${interpolate(t, [0, 1], [24, 0])}px)` }}>
        <Overline>{kicker}</Overline>
        <div
          style={{
            fontFamily: playfair,
            fontWeight: 900,
            fontSize: 82,
            lineHeight: 1.05,
            color: COLORS.ivoire,
            marginTop: 28,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: dmSans,
            fontWeight: 500,
            fontSize: 46,
            lineHeight: 1.3,
            color: "rgba(245,242,236,0.82)",
            marginTop: 28,
          }}
        >
          {body}
        </div>
      </div>
      <Caption opacity={fadeScene(frame, durationInFrames)}>{caption}</Caption>
    </AbsoluteFill>
  );
};

export const B2cReel: React.FC<{ withBgm?: boolean }> = ({ withBgm = true }) => {
  const t1 = HOOK;
  const t2 = t1 + BEAT1;
  const t3 = t2 + BEAT2;
  const t4 = t3 + BEAT3;

  return (
    <AbsoluteFill>
      {/* Warm acoustic bed from frame 0, ducked under VO. Omit for the
          « VO seule » export — the client adds trendy music on Drive. */}
      {withBgm ? <Audio src={staticFile(AUDIO.bgm)} volume={0.14} /> : null}

      <ReelShell cover={{ kicker: "Clients particuliers", title: "B2C ≠ hors réforme." }}>
        <Sequence durationInFrames={HOOK}>
          <Hook />
          <Audio src={staticFile(AUDIO.hook)} volume={1} />
        </Sequence>
        <Sequence from={t1} durationInFrames={BEAT1}>
          <Beat
            kicker="B2C"
            title="Pas de facture électronique"
            body="Tu n'as pas à envoyer une e-facture à ton client particulier."
            caption="Mais ce n'est pas la fin de l'histoire."
          />
          <Audio src={staticFile(AUDIO.b2c)} volume={1} />
        </Sequence>
        <Sequence from={t2} durationInFrames={BEAT2}>
          <Beat
            kicker="E-reporting"
            title="Tes encaissements, déclarés"
            body="Les données de tes ventes aux particuliers doivent être transmises à l'administration."
            caption="C'est ça, le e-reporting."
          />
          <Audio src={staticFile(AUDIO.ereporting)} volume={1} />
        </Sequence>
        <Sequence from={t3} durationInFrames={BEAT3}>
          <Beat
            kicker="Même métiers"
            title="Coiffeuse · taxi · thérapeute…"
            body="Aide à domicile, prestation de service : la même règle s'applique."
            caption="Le statut micro n'y change rien."
          />
          <Audio src={staticFile(AUDIO.metiers)} volume={1} />
        </Sequence>
        <Sequence from={t4} durationInFrames={CTA}>
          <CtaScene />
          <Audio src={staticFile(AUDIO.cta)} volume={1} />
        </Sequence>
      </ReelShell>
    </AbsoluteFill>
  );
};
