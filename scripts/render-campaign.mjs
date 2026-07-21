// Rendu des assets campagne → public/campaign/
// Usage: node scripts/render-campaign.mjs [reels|carousels|cards|all] [j12 j13…]
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const OUT = "public/campaign";
mkdirSync(OUT, { recursive: true });

const ENTRY = "remotion/index.ts";
const run = (args) => {
  console.log("▶", ["remotion", ...args].join(" "));
  execFileSync("npx", ["remotion", ...args], { stdio: "inherit" });
};

const still = (comp, file, props) =>
  run([
    "still",
    ENTRY,
    comp,
    `${OUT}/${file}`,
    "--image-format=png",
    ...(props ? [`--props=${JSON.stringify(props)}`] : []),
  ]);

const video = (comp, file) => run(["render", ENTRY, comp, `${OUT}/${file}`]);

const CAROUSELS = {
  "j2-cost": "cost",
  "j3-myths": "myths",
  "j4-recap": "recap",
  "j5-concerned": "concerned",
  "j6-channels": "channels",
  "j7-objections": "objections",
  "j11-b2c": "b2c",
  "j12-receive": "receive",
  "j13-cost": "cost-v2",
  "j14-security": "security",
};

const CARDS = {
  "card-reform-2026": "reform-2026",
  "card-morning-invoiced": "morning-invoiced",
  "card-autoentrepreneur": "autoentrepreneur",
  "card-pdp-security": "pdp-security",
  "card-b2c-ereporting": "b2c-ereporting",
  "card-receive-2026": "receive-2026",
  "card-cost-truth": "cost-truth",
  "card-pdp-trust": "pdp-trust",
};

// [composition id, output base] — renders 9:16 + 4:5 + VO-only twins
const REELS = [
  ["J2-CounterReel", "j2-counter"],
  ["J3-MythsReel", "j3-myths"],
  ["J4-BeforeAfterReel", "j4-beforeafter"],
  ["J5-ConcernedReel", "j5-concerned"],
  ["J6-ChannelsReel", "j6-channels"],
  ["J7-FormatReel", "j7-format"],
  ["J11-B2cReel", "j11-b2c"],
  ["J12-ReceiveReel", "j12-receive"],
  ["J13-CostReel", "j13-cost"],
  ["J14-SecurityReel", "j14-security"],
];

const DAY_FILTERS = process.argv.slice(3).map((s) => s.toLowerCase());
const keep = (base) =>
  DAY_FILTERS.length === 0 || DAY_FILTERS.some((d) => base.toLowerCase().includes(d));

function renderReels() {
  for (const [comp, base] of REELS) {
    if (!keep(base)) continue;
    video(comp, `${base}-reel.mp4`);
    still(comp, `${base}-thumb.png`, undefined);
    video(`${comp}-LI`, `${base}-reel-li.mp4`);
    still(`${comp}-LI`, `${base}-thumb-li.png`, undefined);
    // VO seule (client ajoute musique tendance) — Drive obligatoire
    video(`${comp}-VoOnly`, `${base}-reel-vo.mp4`);
    video(`${comp}-VoOnly-LI`, `${base}-reel-vo-li.mp4`);
  }
}

function renderCarousels() {
  for (const [prefix, deck] of Object.entries(CAROUSELS)) {
    if (!keep(prefix)) continue;
    for (let i = 0; i < 5; i++) {
      still("Carousel", `${prefix}-${i + 1}.png`, { deck, index: i });
    }
  }
}

function renderCards() {
  const dayCards = {
    j12: ["card-receive-2026"],
    j13: ["card-cost-truth"],
    j14: ["card-pdp-trust"],
  };
  const wanted = DAY_FILTERS.flatMap((d) => dayCards[d] || []);
  for (const [file, id] of Object.entries(CARDS)) {
    if (wanted.length && !wanted.includes(file)) continue;
    still("Card", `${file}.png`, { id });
  }
}

const what = process.argv[2] || "all";
if (what === "reels" || what === "all") renderReels();
if (what === "carousels" || what === "all") renderCarousels();
if (what === "cards" || what === "all") renderCards();
console.log("✅ Rendu terminé →", OUT);
