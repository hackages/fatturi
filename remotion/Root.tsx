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

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="LinkedInBanner"
        component={LinkedInBanner}
        width={BANNER_W}
        height={BANNER_H}
      />
      <Composition
        id="J1-ScreenDemo"
        component={J1ScreenDemo}
        width={VIDEO_W}
        height={VIDEO_H}
        fps={VIDEO_FPS}
        durationInFrames={VIDEO_DURATION}
      />
    </>
  );
};
