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
import { ReceiveReel, RECEIVE_DURATION } from "./reels/ReceiveReel";
import { SecurityReel, SECURITY_DURATION } from "./reels/SecurityReel";
import { REEL_W, REEL_H, REEL_FPS } from "./reels/shared";

type ReelReg = {
  id: string;
  component: React.FC<{ withBgm?: boolean; voFile?: string }>;
  duration: number;
  defaultProps?: { withBgm?: boolean; voFile?: string };
};

function reelPair(r: ReelReg) {
  const props = { withBgm: true, ...r.defaultProps };
  const voProps = { ...props, withBgm: false };
  return (
    <>
      <Composition
        id={r.id}
        component={r.component}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={r.duration}
        defaultProps={props}
      />
      <Composition
        id={`${r.id}-LI`}
        component={r.component}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={r.duration}
        defaultProps={props}
      />
      <Composition
        id={`${r.id}-VoOnly`}
        component={r.component}
        width={REEL_W}
        height={REEL_H}
        fps={REEL_FPS}
        durationInFrames={r.duration}
        defaultProps={voProps}
      />
      <Composition
        id={`${r.id}-VoOnly-LI`}
        component={r.component}
        width={1080}
        height={1350}
        fps={REEL_FPS}
        durationInFrames={r.duration}
        defaultProps={voProps}
      />
    </>
  );
}

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

      <Still
        id="Carousel"
        component={GenericCarousel}
        width={CAROUSEL_W}
        height={CAROUSEL_H}
        defaultProps={{ deck: "cost", index: 0 }}
      />

      <Still id="Card" component={Card} width={CARD_W} height={CARD_H} defaultProps={{ id: "reform-2026" }} />

      {reelPair({ id: "J2-CounterReel", component: CounterReel, duration: COUNTER_DURATION })}
      {reelPair({ id: "J3-MythsReel", component: MythsReel, duration: MYTHS_DURATION })}
      {reelPair({ id: "J4-BeforeAfterReel", component: BeforeAfterReel, duration: BEFOREAFTER_DURATION })}
      {reelPair({ id: "J5-ConcernedReel", component: ConcernedReel, duration: CONCERNED_DURATION })}
      {reelPair({ id: "J6-ChannelsReel", component: ChannelsReel, duration: CHANNELS_DURATION })}
      {reelPair({ id: "J7-FormatReel", component: FormatReel, duration: FORMAT_DURATION })}
      {reelPair({ id: "J11-B2cReel", component: B2cReel, duration: B2C_DURATION })}
      {reelPair({ id: "J12-ReceiveReel", component: ReceiveReel, duration: RECEIVE_DURATION })}
      {reelPair({
        id: "J13-CostReel",
        component: CounterReel,
        duration: COUNTER_DURATION,
        defaultProps: { voFile: "campaign/audio/j13-vo.mp3" },
      })}
      {reelPair({ id: "J14-SecurityReel", component: SecurityReel, duration: SECURITY_DURATION })}
    </>
  );
};
