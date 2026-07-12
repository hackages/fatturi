import { PLAN, VIDEO_LABELS } from "../../campaign/plan.mjs";
import { getDrive, upsertFile, collectVideos, localPathOf } from "./client.mjs";

/*
  Publie les vidéos/reels du plan sur Google Drive (dossier partagé avec la
  manager) pour qu'elle y ajoute musique + voix avant validation dans Buffer.

  Exemples :
    # Aperçu (n'upload rien) — défaut
    node scripts/drive/upload-reels.mjs --day=2026-07-07

    # Upload réel
    node scripts/drive/upload-reels.mjs --day=2026-07-07 --send

    # Filtres
    node scripts/drive/upload-reels.mjs --only=j2-ig-reel --send
    node scripts/drive/upload-reels.mjs --channel=tiktok --send

  Options :
    --send            exécute réellement (sinon dry-run)
    --day=YYYY-MM-DD  filtre par jour
    --only=<key>[,..] filtre par clé(s) de post
    --channel=page|instagram|tiktok

  Requiert dans .env.local :
    DRIVE_FOLDER_ID                    id du dossier Drive (Shared Drive)
    GOOGLE_SERVICE_ACCOUNT_KEY_FILE    chemin du JSON de clé  (ou)
    GOOGLE_SERVICE_ACCOUNT_JSON        JSON de clé inline
*/

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const willSend = Boolean(args.send);

let posts = PLAN.filter((p) => p.video);
if (args.channel) posts = posts.filter((p) => p.channel === args.channel);
if (args.day) posts = posts.filter((p) => p.day === args.day);
if (args.only) {
  const keys = String(args.only).split(",").map((s) => s.trim());
  posts = posts.filter((p) => keys.includes(p.key));
}

const videos = collectVideos(posts, VIDEO_LABELS);

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Drive Fatturi — ${videos.length} vidéo(s) ${willSend ? "→ UPLOAD" : "(dry-run)"}`);
console.log(`═══════════════════════════════════════════════════\n`);

if (!videos.length) {
  console.log("Aucune vidéo ne correspond aux filtres.\n");
  process.exit(0);
}

for (const v of videos) {
  console.log(`─── ${v.displayName} ───`);
  console.log(`  Posts   : ${v.keys.join(", ")}`);
  console.log(`  Source  : ${v.file}`);
}
console.log("");

if (!willSend) {
  console.log("🟡 DRY-RUN — rien uploadé. Ajoute --send pour publier sur Drive.\n");
  process.exit(0);
}

let drive, folderId;
try {
  ({ drive, folderId } = await getDrive());
} catch (e) {
  console.error(`✗ Configuration Drive : ${e.message}\n`);
  process.exit(1);
}

let ok = 0;
let ko = 0;
for (const v of videos) {
  try {
    const res = await upsertFile(drive, folderId, localPathOf(v.file), {
      sourceKey: v.name,
      displayName: v.displayName,
    });
    console.log(`✅ ${v.displayName} — ${res.updated ? "mis à jour" : "uploadé"} — ${res.link}`);
    ok++;
  } catch (e) {
    console.log(`✗ ${v.displayName} — ${e.message}`);
    ko++;
  }
}

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Terminé : ${ok} vidéo(s), ${ko} échec(s).`);
console.log(`═══════════════════════════════════════════════════\n`);
