/*
  Régénère la VO + musique du reel J11 (B2C) via ElevenLabs.
  Usage : node scripts/audio/generate-j11-audio.mjs

  Voix : Perle (FR female corporate) — UaGvaD7NWzU5mJNoUqoY
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "../buffer/client.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(ROOT, "public/campaign/audio");
const VOICE_ID = "UaGvaD7NWzU5mJNoUqoY"; // Perle · Premium French Corporate Voice

const CLIPS = [
  ["j11-vo-hook", "Tu ne factures que des particuliers ? Tu penses que la réforme, c'est pas pour toi."],
  ["j11-vo-b2c", "En B2C, tu n'envoies pas de facture électronique à ton client."],
  ["j11-vo-ereporting", "En revanche, tu dois transmettre tes encaissements à l'administration. C'est le e-reporting."],
  ["j11-vo-metiers", "Coiffeuse, taxi, thérapeute, aide à domicile : même règle."],
  ["j11-vo-cta", "Fatturi centralise tes paiements et prépare tes données. Sans y passer tes soirées."],
];

const env = { ...loadEnv(), ...process.env };
const key = env.ELEVENLABS_API_KEY;
if (!key) {
  console.error("ELEVENLABS_API_KEY manquant dans .env.local");
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });

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
  const file = path.join(OUT, `${name}.mp3`);
  fs.writeFileSync(file, buf);
  console.log(`✅ ${name}.mp3 (${buf.length} bytes)`);
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
      prompt:
        "warm acoustic guitar soft fingerpicking, gentle warm pad, calm intimate indie folk instrumental bed for a short explainer video, no vocals, no drums, cozy and reassuring, low energy",
      music_length_ms: 32000,
      force_instrumental: true,
      model_id: "music_v1",
    }),
  });
  if (!res.ok) throw new Error(`Music: ${res.status} ${await res.text()}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const file = path.join(OUT, "j11-bgm-warm-acoustic.mp3");
  fs.writeFileSync(file, buf);
  console.log(`✅ j11-bgm-warm-acoustic.mp3 (${buf.length} bytes)`);
}

for (const [name, text] of CLIPS) await tts(name, text);
await music();
console.log(`\nAudio prêt → ${OUT}`);
