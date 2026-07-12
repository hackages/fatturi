// Rendu de tous les assets J2–J4 vers public/campaign/.
// Usage: node scripts/render-campaign.mjs [reels|carousels|cards|all]
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
  run(["still", ENTRY, comp, `${OUT}/${file}`, "--image-format=png", ...(props ? [`--props=${JSON.stringify(props)}`] : [])]);

const video = (comp, file) => run(["render", ENTRY, comp, `${OUT}/${file}`]);

const CAROUSELS = {
  "j2-cost": "cost",
  "j3-myths": "myths",
  "j4-recap": "recap",
  "j5-concerned": "concerned",
  "j6-channels": "channels",
  "j7-objections": "objections",
};

const CARDS = {
  "card-reform-2026": "reform-2026",
  "card-morning-invoiced": "morning-invoiced",
  "card-autoentrepreneur": "autoentrepreneur",
  "card-pdp-security": "pdp-security",
};

// [id de composition, base du fichier de sortie] — 9:16 (IG/TikTok) + 4:5 (LinkedIn).
const REELS = [
  ["J2-CounterReel", "j2-counter"],
  ["J3-MythsReel", "j3-myths"],
  ["J4-BeforeAfterReel", "j4-beforeafter"],
  ["J5-ConcernedReel", "j5-concerned"],
  ["J6-ChannelsReel", "j6-channels"],
  ["J7-FormatReel", "j7-format"],
];

// Filtre optionnel par jour(s) : `... reels j5 j6` ne rend que ce qui commence
// par « j5 »/« j6 ». Sans filtre, tout est rendu.
const DAY_FILTERS = process.argv.slice(3).map((s) => s.toLowerCase());
const keep = (base) =>
  DAY_FILTERS.length === 0 || DAY_FILTERS.some((d) => base.toLowerCase().includes(d));

function renderReels() {
  for (const [comp, base] of REELS) {
    if (!keep(base)) continue;
    // 9:16 pour Instagram (Reels) + TikTok
    video(comp, `${base}-reel.mp4`);
    still(comp, `${base}-thumb.png`, undefined);
    // 4:5 pour LinkedIn (remplit le fil)
    video(`${comp}-LI`, `${base}-reel-li.mp4`);
    still(`${comp}-LI`, `${base}-thumb-li.png`, undefined);
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
  // Cartes = stills rapides ; on les rend toutes (noms non préfixés par jour).
  for (const [file, id] of Object.entries(CARDS)) {
    still("Card", `${file}.png`, { id });
  }
}

const what = process.argv[2] || "all";
if (what === "reels" || what === "all") renderReels();
if (what === "carousels" || what === "all") renderCarousels();
if (what === "cards" || what === "all") renderCards();
console.log("✅ Rendu terminé →", OUT);
