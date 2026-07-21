import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { COVER_HOLD } from "./shared";

/** Shared warm acoustic bed + VO track for campaign reels. */
export const DEFAULT_BGM = "campaign/audio/bgm-warm-acoustic.mp3";

export const AudioBed: React.FC<{
  withBgm?: boolean;
  /** Path under `public/`, e.g. `campaign/audio/j2-vo.mp3` */
  voFile: string;
  bgmFile?: string;
  /** Frame where VO starts (default: after brand cover). */
  voFrom?: number;
  bgmVolume?: number;
}> = ({
  withBgm = true,
  voFile,
  bgmFile = DEFAULT_BGM,
  voFrom = COVER_HOLD,
  bgmVolume = 0.14,
}) => (
  <>
    {withBgm ? <Audio src={staticFile(bgmFile)} volume={bgmVolume} /> : null}
    <Sequence from={voFrom}>
      <Audio src={staticFile(voFile)} volume={1} />
    </Sequence>
  </>
);
