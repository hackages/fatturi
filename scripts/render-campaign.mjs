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
};

const CARDS = {
  "card-reform-2026": "reform-2026",
  "card-morning-invoiced": "morning-invoiced",
};

function renderReels() {
  // 9:16 pour Instagram (Reels)
  video("J2-CounterReel", "j2-counter-reel.mp4");
  video("J3-MythsReel", "j3-myths-reel.mp4");
  video("J4-BeforeAfterReel", "j4-beforeafter-reel.mp4");
  still("J2-CounterReel", "j2-counter-thumb.png", undefined);
  still("J3-MythsReel", "j3-myths-thumb.png", undefined);
  still("J4-BeforeAfterReel", "j4-beforeafter-thumb.png", undefined);
  // 4:5 pour LinkedIn (remplit le fil)
  video("J2-CounterReel-LI", "j2-counter-reel-li.mp4");
  video("J3-MythsReel-LI", "j3-myths-reel-li.mp4");
  video("J4-BeforeAfterReel-LI", "j4-beforeafter-reel-li.mp4");
  still("J2-CounterReel-LI", "j2-counter-thumb-li.png", undefined);
  still("J3-MythsReel-LI", "j3-myths-thumb-li.png", undefined);
  still("J4-BeforeAfterReel-LI", "j4-beforeafter-thumb-li.png", undefined);
}

function renderCarousels() {
  for (const [prefix, deck] of Object.entries(CAROUSELS)) {
    for (let i = 0; i < 5; i++) {
      still("Carousel", `${prefix}-${i + 1}.png`, { deck, index: i });
    }
  }
}

function renderCards() {
  for (const [file, id] of Object.entries(CARDS)) {
    still("Card", `${file}.png`, { id });
  }
}

const what = process.argv[2] || "all";
if (what === "reels" || what === "all") renderReels();
if (what === "carousels" || what === "all") renderCarousels();
if (what === "cards" || what === "all") renderCards();
console.log("✅ Rendu terminé →", OUT);
