import React from "react";
import { Composition, Still } from "remotion";
import { LinkedInBanner, BANNER_W, BANNER_H } from "./LinkedInBanner";
import {
  J1ScreenDemo,
  VIDEO_W,
  VIDEO_H,
  VIDEO_FPS,
  VIDEO_DURATION,
} from "./J1ScreenDemo";
import { CarouselSlide, CAROUSEL_W, CAROUSEL_H } from "./Carousel";
import { GenericCarousel } from "./carousels/GenericCarousel";
import { Card, CARD_W, CARD_H } from "./cards/Card";
import { CounterReel, COUNTER_DURATION } from "./reels/CounterReel";
import { MythsReel, MYTHS_DURATION } from "./reels/MythsReel";
import { BeforeAfterReel, BEFOREAFTER_DURATION } from "./reels/BeforeAfterReel";
import { ConcernedReel, CONCERNED_DURATION } from "./reels/ConcernedReel";
import { ChannelsReel, CHANNELS_DURATION } from "./reels/ChannelsReel";
import { FormatReel, FORMAT_DURATION } from "./reels/FormatReel";
import { B2cReel, B2C_DURATION } from "./reels/B2cReel";
import { REEL_W, REEL_H, REEL_FPS } from "./reels/shared";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still id="LinkedInBanner" component={LinkedInBanner} width={BANNER_W} height={BANNER_H} />

      <Composition
        id="J1-ScreenDemo"
        component={J1ScreenDemo}
        width={VIDEO_W}
        height={VIDEO_H}
        fps={VIDEO_FPS}
        durationInFrames={VIDEO_DURATION}
      />

      <Still id="J1-Carousel" component={CarouselSlide} width={CAROUSEL_W} height={CAROUSEL_H} defaultProps={{ index: 0 }} />

      {/* Carrousels data-driven (J2–J4) : deck = cost | myths | recap */}
      <Still
        id="Carousel"
        component={GenericCarousel}
        width={CAROUSEL_W}
        height={CAROUSEL_H}
        defaultProps={{ deck: "cost", index: 0 }}
      />

      {/* Cards single-image (3e slot IG) */}
      <Still id="Card" component={Card} width={CARD_W} height={CARD_H} defaultProps={{ id: "reform-2026" }} />

      {/* Reels J2–J4 */}
      <Composition
        id="J2-CounterReel"
        component={CounterReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={COUNTER_DURATION}
      />
      <Composition
        id="J3-MythsReel"
        component={MythsReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={MYTHS_DURATION}
      />
      <Composition
        id="J4-BeforeAfterReel"
        component={BeforeAfterReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={BEFOREAFTER_DURATION}
      />

      {/* Variantes LinkedIn 4:5 (1080×1350) — mêmes scènes, format qui remplit le fil */}
      <Composition
        id="J2-CounterReel-LI"
        component={CounterReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={COUNTER_DURATION}
      />
      <Composition
        id="J3-MythsReel-LI"
        component={MythsReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={MYTHS_DURATION}
      />
      <Composition
        id="J4-BeforeAfterReel-LI"
        component={BeforeAfterReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={BEFOREAFTER_DURATION}
      />

      {/* Reels J5–J7 (9:16) */}
      <Composition
        id="J5-ConcernedReel"
        component={ConcernedReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={CONCERNED_DURATION}
      />
      <Composition
        id="J6-ChannelsReel"
        component={ChannelsReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={CHANNELS_DURATION}
      />
      <Composition
        id="J7-FormatReel"
        component={FormatReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={FORMAT_DURATION}
      />

      {/* Variantes LinkedIn 4:5 (J5–J7) */}
      <Composition
        id="J5-ConcernedReel-LI"
        component={ConcernedReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={CONCERNED_DURATION}
      />
      <Composition
        id="J6-ChannelsReel-LI"
        component={ChannelsReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={CHANNELS_DURATION}
      />
      <Composition
        id="J7-FormatReel-LI"
        component={FormatReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={FORMAT_DURATION}
      />

      {/* Reel J11 · B2C / particuliers (VO + musique) */}
      <Composition
        id="J11-B2cReel"
        component={B2cReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={B2C_DURATION}
        defaultProps={{ withBgm: true }}
      />
      <Composition
        id="J11-B2cReel-LI"
        component={B2cReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={B2C_DURATION}
        defaultProps={{ withBgm: true }}
      />
      {/* Même reel, VO seule (sans BGM) — pour ajout musique tendance côté client */}
      <Composition
        id="J11-B2cReel-VoOnly"
        component={B2cReel}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={B2C_DURATION}
        defaultProps={{ withBgm: false }}
      />
      <Composition
        id="J11-B2cReel-VoOnly-LI"
        component={B2cReel}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={B2C_DURATION}
        defaultProps={{ withBgm: false }}
      />
    </>
  );
};
