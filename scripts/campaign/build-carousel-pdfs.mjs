import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";
import { PLAN } from "../../campaign/plan.mjs";

/*
  Assemble les slides PNG des carrousels LinkedIn en PDF (1 page = 1 slide).
  LinkedIn n'affiche un vrai carrousel swipeable que pour les documents PDF ;
  les multi-images sortent en grille.

  Usage :
    node scripts/campaign/build-carousel-pdfs.mjs
    node scripts/campaign/build-carousel-pdfs.mjs --only=j12-receive
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const only = args.only ? String(args.only).split(",").map((s) => s.trim()) : null;

function pdfFileFromSlides(images) {
  const first = images[0].file.split("/").pop();
  const base = first.replace(/-\d+\.(png|jpg|jpeg|webp)$/i, "");
  return `public/campaign/${base}.pdf`;
}

function titleFromPost(post) {
  const line = (post.text || "").split("\n")[0] || post.label || "Fatturi";
  return line
    .replace(/[🔗👇📌⚠️🤔💸🔒🤯⏱️😬👀]\s*/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);
}

// Déduplique par fichier PDF cible (J8 réutilise J5, J9→J2, J10→J4).
const decks = new Map();
for (const post of PLAN) {
  if (!post.key?.endsWith("-li-carousel") || !post.images?.length) continue;
  const file = post.document?.file || pdfFileFromSlides(post.images);
  const base = path.basename(file, ".pdf");
  if (only && !only.includes(base)) continue;
  if (decks.has(file)) continue;
  decks.set(file, {
    file,
    slides: post.images.map((img) => img.file),
    title: post.document?.title || titleFromPost(post),
    thumbnail: post.document?.thumbnail || post.images[0].file,
    keys: [post.key],
  });
}

if (!decks.size) {
  console.error("\n✗ Aucun carrousel LinkedIn à assembler.\n");
  process.exit(1);
}

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`PDF carrousels LinkedIn — ${decks.size} document(s)`);
console.log(`═══════════════════════════════════════════════════\n`);

for (const deck of decks.values()) {
  const absOut = path.join(ROOT, deck.file);
  const pdf = await PDFDocument.create();

  for (const slide of deck.slides) {
    const abs = path.join(ROOT, slide);
    if (!fs.existsSync(abs)) {
      throw new Error(`Slide manquante : ${slide}`);
    }
    const bytes = fs.readFileSync(abs);
    const png = await pdf.embedPng(bytes);
    const page = pdf.addPage([png.width, png.height]);
    page.drawImage(png, { x: 0, y: 0, width: png.width, height: png.height });
  }

  fs.mkdirSync(path.dirname(absOut), { recursive: true });
  fs.writeFileSync(absOut, await pdf.save());
  const kb = Math.round(fs.statSync(absOut).size / 1024);
  console.log(`✅ ${deck.file}  (${deck.slides.length} pages, ${kb} Ko)`);
  console.log(`   titre : ${deck.title}`);
  console.log(`   thumb : ${deck.thumbnail}\n`);
}

console.log(`Terminé. Les posts LinkedIn du plan doivent référencer document: { file, title, thumbnail }.`);
console.log(`Instagram garde images: […] (carrousel multi-images natif).\n`);
