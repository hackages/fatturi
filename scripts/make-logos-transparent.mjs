import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "..", "public");

// White -> transparent with a soft edge so anti-aliased pixels don't leave a halo.
// fully transparent above HI, fully opaque below LO, linear ramp in between.
const HI = 248;
const LO = 205;

// Ivoire Chaud — used to recolor navy parts for dark backgrounds.
const IVOIRE = [245, 242, 236];

async function keyOut(input, output, { recolorNavy = false } = {}) {
  const src = sharp(path.join(publicDir, input));
  const { data, info } = await src
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const whiteness = Math.min(r, g, b);

    let alpha;
    if (whiteness >= HI) alpha = 0;
    else if (whiteness <= LO) alpha = 255;
    else alpha = Math.round((1 - (whiteness - LO) / (HI - LO)) * 255);

    // keep existing alpha as an upper bound
    data[i + 3] = Math.min(data[i + 3], alpha);

    // For dark backgrounds: turn navy ink (blue-dominant, dark) into ivoire,
    // leave the gold "7" untouched.
    if (recolorNavy && data[i + 3] > 0 && b >= r && r < 140) {
      data[i] = IVOIRE[0];
      data[i + 1] = IVOIRE[1];
      data[i + 2] = IVOIRE[2];
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ threshold: 1 })
    .png()
    .toFile(path.join(publicDir, output));

  const meta = await sharp(path.join(publicDir, output)).metadata();
  console.log(`✓ ${output} (${meta.width}x${meta.height})`);
}

await keyOut("1.png", "logo-mark.png");
await keyOut("2.png", "logo-full.png");
await keyOut("1.png", "logo-mark-light.png", { recolorNavy: true });
await keyOut("2.png", "logo-full-light.png", { recolorNavy: true });
