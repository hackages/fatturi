/*
  Publie les médias d'un jour de campagne dans un dossier Drive clair.

  Usage :
    node scripts/drive/publish-day.mjs --day=j12 --send
    node scripts/drive/publish-day.mjs --day=j11 --send
    node scripts/drive/publish-day.mjs --manifest=scripts/drive/manifests/j12.json --send

  Structure :
    <DRIVE_FOLDER_ID>/
      J12 · 2026-07-21 · Recevoir dès 2026/
        Reel 9:16 (VO + musique)…
        Reel 9:16 (VO seule)…
        …

  Obligatoire après toute création/regénération de médias campagne
  (voir .cursor/rules/campaign-drive-publish.mdc).
*/
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDrive, upsertFile, localPathOf } from "./client.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);
const willSend = Boolean(args.send);

/** Catalog of day folders + files to upload. */
const DAYS = {
  j11: {
    folder: "J11 · 2026-07-20 · Clients particuliers (B2C)",
    files: [
      ["public/campaign/j11-b2c-reel.mp4", "j11-b2c-reel-with-music.mp4", "J11 · B2C — Reel 9:16 (VO + musique acoustique)"],
      ["public/campaign/j11-b2c-reel-vo.mp4", "j11-b2c-reel-vo-only.mp4", "J11 · B2C — Reel 9:16 (VO seule · musique tendance)"],
      ["public/campaign/j11-b2c-reel-li.mp4", "j11-b2c-reel-li-with-music.mp4", "J11 · B2C — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j11-b2c-reel-vo-li.mp4", "j11-b2c-reel-vo-li-only.mp4", "J11 · B2C — LinkedIn 4:5 (VO seule · musique tendance)"],
    ],
  },
  j12: {
    folder: "J12 · 2026-07-21 · Recevoir dès 2026",
    files: [
      ["public/campaign/j12-receive-reel.mp4", "j12-receive-reel-with-music.mp4", "J12 · Recevoir — Reel 9:16 (VO + musique)"],
      ["public/campaign/j12-receive-reel-vo.mp4", "j12-receive-reel-vo-only.mp4", "J12 · Recevoir — Reel 9:16 (VO seule · musique tendance)"],
      ["public/campaign/j12-receive-reel-li.mp4", "j12-receive-reel-li-with-music.mp4", "J12 · Recevoir — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j12-receive-reel-vo-li.mp4", "j12-receive-reel-vo-li-only.mp4", "J12 · Recevoir — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j12-receive-1.png", "j12-receive-1.png", "J12 · Carrousel — 1"],
      ["public/campaign/j12-receive-2.png", "j12-receive-2.png", "J12 · Carrousel — 2"],
      ["public/campaign/j12-receive-3.png", "j12-receive-3.png", "J12 · Carrousel — 3"],
      ["public/campaign/j12-receive-4.png", "j12-receive-4.png", "J12 · Carrousel — 4"],
      ["public/campaign/j12-receive-5.png", "j12-receive-5.png", "J12 · Carrousel — 5"],
      ["public/campaign/card-receive-2026.png", "card-receive-2026.png", "J12 · Card réception 2026"],
    ],
  },
  j13: {
    folder: "J13 · 2026-07-22 · Combien ça coûte",
    files: [
      ["public/campaign/j13-cost-reel.mp4", "j13-cost-reel-with-music.mp4", "J13 · Coût — Reel 9:16 (VO + musique)"],
      ["public/campaign/j13-cost-reel-vo.mp4", "j13-cost-reel-vo-only.mp4", "J13 · Coût — Reel 9:16 (VO seule · musique tendance)"],
      ["public/campaign/j13-cost-reel-li.mp4", "j13-cost-reel-li-with-music.mp4", "J13 · Coût — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j13-cost-reel-vo-li.mp4", "j13-cost-reel-vo-li-only.mp4", "J13 · Coût — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j13-cost-1.png", "j13-cost-1.png", "J13 · Carrousel — 1"],
      ["public/campaign/j13-cost-2.png", "j13-cost-2.png", "J13 · Carrousel — 2"],
      ["public/campaign/j13-cost-3.png", "j13-cost-3.png", "J13 · Carrousel — 3"],
      ["public/campaign/j13-cost-4.png", "j13-cost-4.png", "J13 · Carrousel — 4"],
      ["public/campaign/j13-cost-5.png", "j13-cost-5.png", "J13 · Carrousel — 5"],
      ["public/campaign/card-cost-truth.png", "card-cost-truth.png", "J13 · Card coût"],
    ],
  },
  j14: {
    folder: "J14 · 2026-07-23 · Sécurité PDP",
    files: [
      ["public/campaign/j14-security-reel.mp4", "j14-security-reel-with-music.mp4", "J14 · Sécurité — Reel 9:16 (VO + musique)"],
      ["public/campaign/j14-security-reel-vo.mp4", "j14-security-reel-vo-only.mp4", "J14 · Sécurité — Reel 9:16 (VO seule · musique tendance)"],
      ["public/campaign/j14-security-reel-li.mp4", "j14-security-reel-li-with-music.mp4", "J14 · Sécurité — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j14-security-reel-vo-li.mp4", "j14-security-reel-vo-li-only.mp4", "J14 · Sécurité — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j14-security-1.png", "j14-security-1.png", "J14 · Carrousel — 1"],
      ["public/campaign/j14-security-2.png", "j14-security-2.png", "J14 · Carrousel — 2"],
      ["public/campaign/j14-security-3.png", "j14-security-3.png", "J14 · Carrousel — 3"],
      ["public/campaign/j14-security-4.png", "j14-security-4.png", "J14 · Carrousel — 4"],
      ["public/campaign/j14-security-5.png", "j14-security-5.png", "J14 · Carrousel — 5"],
      ["public/campaign/card-pdp-trust.png", "card-pdp-trust.png", "J14 · Card confiance PDP"],
    ],
  },
  // Legacy reels re-voiced (archive folder per day key)
  legacy: {
    folder: "Reels archivés · VO + musique (J2–J7)",
    files: [
      ["public/campaign/j2-counter-reel.mp4", "j2-counter-reel-with-music.mp4", "J2 · Coût — Reel 9:16 (VO + musique)"],
      ["public/campaign/j2-counter-reel-vo.mp4", "j2-counter-reel-vo-only.mp4", "J2 · Coût — Reel 9:16 (VO seule)"],
      ["public/campaign/j2-counter-reel-li.mp4", "j2-counter-reel-li-with-music.mp4", "J2 · Coût — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j2-counter-reel-vo-li.mp4", "j2-counter-reel-vo-li-only.mp4", "J2 · Coût — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j3-myths-reel.mp4", "j3-myths-reel-with-music.mp4", "J3 · Mythes — Reel 9:16 (VO + musique)"],
      ["public/campaign/j3-myths-reel-vo.mp4", "j3-myths-reel-vo-only.mp4", "J3 · Mythes — Reel 9:16 (VO seule)"],
      ["public/campaign/j3-myths-reel-li.mp4", "j3-myths-reel-li-with-music.mp4", "J3 · Mythes — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j3-myths-reel-vo-li.mp4", "j3-myths-reel-vo-li-only.mp4", "J3 · Mythes — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j4-beforeafter-reel.mp4", "j4-beforeafter-reel-with-music.mp4", "J4 · Avant/Après — Reel 9:16 (VO + musique)"],
      ["public/campaign/j4-beforeafter-reel-vo.mp4", "j4-beforeafter-reel-vo-only.mp4", "J4 · Avant/Après — Reel 9:16 (VO seule)"],
      ["public/campaign/j4-beforeafter-reel-li.mp4", "j4-beforeafter-reel-li-with-music.mp4", "J4 · Avant/Après — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j4-beforeafter-reel-vo-li.mp4", "j4-beforeafter-reel-vo-li-only.mp4", "J4 · Avant/Après — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j5-concerned-reel.mp4", "j5-concerned-reel-with-music.mp4", "J5 · Concerné — Reel 9:16 (VO + musique)"],
      ["public/campaign/j5-concerned-reel-vo.mp4", "j5-concerned-reel-vo-only.mp4", "J5 · Concerné — Reel 9:16 (VO seule)"],
      ["public/campaign/j5-concerned-reel-li.mp4", "j5-concerned-reel-li-with-music.mp4", "J5 · Concerné — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j5-concerned-reel-vo-li.mp4", "j5-concerned-reel-vo-li-only.mp4", "J5 · Concerné — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j6-channels-reel.mp4", "j6-channels-reel-with-music.mp4", "J6 · Canaux — Reel 9:16 (VO + musique)"],
      ["public/campaign/j6-channels-reel-vo.mp4", "j6-channels-reel-vo-only.mp4", "J6 · Canaux — Reel 9:16 (VO seule)"],
      ["public/campaign/j6-channels-reel-li.mp4", "j6-channels-reel-li-with-music.mp4", "J6 · Canaux — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j6-channels-reel-vo-li.mp4", "j6-channels-reel-vo-li-only.mp4", "J6 · Canaux — LinkedIn 4:5 (VO seule)"],
      ["public/campaign/j7-format-reel.mp4", "j7-format-reel-with-music.mp4", "J7 · Format — Reel 9:16 (VO + musique)"],
      ["public/campaign/j7-format-reel-vo.mp4", "j7-format-reel-vo-only.mp4", "J7 · Format — Reel 9:16 (VO seule)"],
      ["public/campaign/j7-format-reel-li.mp4", "j7-format-reel-li-with-music.mp4", "J7 · Format — LinkedIn 4:5 (VO + musique)"],
      ["public/campaign/j7-format-reel-vo-li.mp4", "j7-format-reel-vo-li-only.mp4", "J7 · Format — LinkedIn 4:5 (VO seule)"],
    ],
  },
};

async function findOrCreateFolder(drive, parentId, name) {
  const q = `mimeType='application/vnd.google-apps.folder' and name='${name.replace(/'/g, "\\'")}' and '${parentId}' in parents and trashed=false`;
  const found = await drive.files.list({
    q,
    fields: "files(id, name, webViewLink)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  if (found.data.files?.length) return found.data.files[0];
  const created = await drive.files.create({
    requestBody: {
      name,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentId],
    },
    fields: "id, name, webViewLink",
    supportsAllDrives: true,
  });
  return created.data;
}

const dayKey = String(args.day || "").toLowerCase();
const day = DAYS[dayKey];
if (!day) {
  console.error(`\n✗ --day requis (clés: ${Object.keys(DAYS).join(", ")})\n`);
  process.exit(1);
}

const existing = day.files.filter(([file]) => fs.existsSync(path.join(ROOT, file)));
const missing = day.files.filter(([file]) => !fs.existsSync(path.join(ROOT, file)));

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Drive publish — ${day.folder}`);
console.log(`${existing.length} fichier(s) prêts · ${missing.length} manquant(s) · ${willSend ? "ENVOI" : "dry-run"}`);
console.log(`═══════════════════════════════════════════════════\n`);
for (const [, , label] of existing) console.log(`  • ${label}`);
if (missing.length) {
  console.log("\nManquants (ignorés) :");
  for (const [file] of missing) console.log(`  ✗ ${file}`);
}

if (!willSend) {
  console.log("\n🟡 DRY-RUN — ajoute --send pour uploader.\n");
  process.exit(0);
}

const { drive, folderId } = await getDrive();
const folder = await findOrCreateFolder(drive, folderId, day.folder);
console.log(`\n📁 ${folder.webViewLink || folder.id}\n`);

let ok = 0;
let ko = 0;
for (const [file, sourceKey, displayName] of existing) {
  try {
    const res = await upsertFile(drive, folder.id, localPathOf(file), { sourceKey, displayName });
    console.log(`✅ ${displayName} — ${res.updated ? "MAJ" : "nouveau"}`);
    ok++;
  } catch (e) {
    console.log(`✗ ${displayName} — ${e.message}`);
    ko++;
  }
}
console.log(`\nTerminé : ${ok} ok, ${ko} échec(s).\n`);
