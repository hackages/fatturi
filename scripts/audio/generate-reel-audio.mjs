/*
  Génère VO (Perle) + BGM acoustique pour les reels campagne.
  Usage :
    node scripts/audio/generate-reel-audio.mjs           # tout
    node scripts/audio/generate-reel-audio.mjs j12 j13   # sélection
    node scripts/audio/generate-reel-audio.mjs --bgm-only
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "../buffer/client.mjs";
import { VOICE_ID, REEL_VO, BGM_PROMPT } from "./reel-vo-scripts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../public/campaign/audio");
const env = { ...loadEnv(), ...process.env };
const key = env.ELEVENLABS_API_KEY;
if (!key) {
  console.error("ELEVENLABS_API_KEY manquant");
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const bgmOnly = process.argv.includes("--bgm-only");
const keys = args.length ? args : Object.keys(REEL_VO);

async function tts(name, text) {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        language_code: "fr",
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.75,
          style: 0.25,
          use_speaker_boost: true,
        },
      }),
    }
  );
  if (!res.ok) throw new Error(`TTS ${name}: ${res.status} ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(OUT, `${name}.mp3`), buf);
  console.log(`✅ ${name}.mp3 (${buf.length} B)`);
}

async function music() {
  const res = await fetch("https://api.elevenlabs.io/v1/music", {
    method: "POST",
    headers: {
      "xi-api-key": key,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      prompt: BGM_PROMPT,
      music_length_ms: 45000,
      force_instrumental: true,
      model_id: "music_v1",
    }),
  });
  if (!res.ok) throw new Error(`Music: ${res.status} ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const dest = path.join(OUT, "bgm-warm-acoustic.mp3");
  fs.writeFileSync(dest, buf);
  // Keep J11 alias in sync
  fs.copyFileSync(dest, path.join(OUT, "j11-bgm-warm-acoustic.mp3"));
  console.log(`✅ bgm-warm-acoustic.mp3 (${buf.length} B)`);
}

if (!bgmOnly) {
  for (const k of keys) {
    const clip = REEL_VO[k];
    if (!clip) {
      console.warn(`skip unknown key: ${k}`);
      continue;
    }
    await tts(clip.file, clip.text);
  }
}
const needBgm =
  bgmOnly ||
  !fs.existsSync(path.join(OUT, "bgm-warm-acoustic.mp3")) ||
  process.argv.includes("--bgm");
if (needBgm || bgmOnly) await music();
else if (!fs.existsSync(path.join(OUT, "bgm-warm-acoustic.mp3")) && fs.existsSync(path.join(OUT, "j11-bgm-warm-acoustic.mp3"))) {
  fs.copyFileSync(path.join(OUT, "j11-bgm-warm-acoustic.mp3"), path.join(OUT, "bgm-warm-acoustic.mp3"));
  console.log("✅ bgm-warm-acoustic.mp3 (copie depuis j11)");
}

console.log(`\nAudio → ${OUT}`);
