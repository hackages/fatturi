/*
  Range le Drive partagé :
  - Déplace les vieux reels à la racine (sans audio) vers
    « Archive · reels muets (avant VO) »
  - Ne touche pas aux dossiers J11+ ni LinkedIn/Instagram/TikTok

  Usage :
    node scripts/drive/cleanup-root.mjs
    node scripts/drive/cleanup-root.mjs --send
*/
import { getDrive } from "./client.mjs";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);
const willSend = Boolean(args.send);

const ARCHIVE = "Archive · reels muets (avant VO)";
const KEEP_FOLDERS = new Set([
  "Instagram",
  "LinkedIn",
  "TikTok",
  "J11 · 2026-07-20 · Clients particuliers (B2C)",
  ARCHIVE,
]);

const { drive, folderId } = await getDrive();

async function findOrCreateFolder(name) {
  const q = `mimeType='application/vnd.google-apps.folder' and name='${name.replace(/'/g, "\\'")}' and '${folderId}' in parents and trashed=false`;
  const found = await drive.files.list({
    q,
    fields: "files(id, webViewLink)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  if (found.data.files?.length) return found.data.files[0];
  if (!willSend) return { id: "dry-run", webViewLink: "(dry-run)" };
  const created = await drive.files.create({
    requestBody: { name, mimeType: "application/vnd.google-apps.folder", parents: [folderId] },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });
  return created.data;
}

const root = await drive.files.list({
  q: `'${folderId}' in parents and trashed=false`,
  fields: "files(id, name, mimeType, parents)",
  supportsAllDrives: true,
  includeItemsFromAllDrives: true,
  pageSize: 200,
});

const orphans = (root.data.files || []).filter(
  (f) => !f.mimeType.includes("folder") && /\.(mp4|mov)$/i.test(f.name)
);

console.log(`\nOrphelins racine (vidéos) : ${orphans.length}`);
for (const f of orphans) console.log(`  • ${f.name}`);

const archive = await findOrCreateFolder(ARCHIVE);
console.log(`\nArchive → ${archive.webViewLink || archive.id}`);

if (!willSend) {
  console.log("\n🟡 DRY-RUN — ajoute --send pour déplacer.\n");
  process.exit(0);
}

for (const f of orphans) {
  await drive.files.update({
    fileId: f.id,
    addParents: archive.id,
    removeParents: folderId,
    supportsAllDrives: true,
    fields: "id, name, parents",
  });
  console.log(`✅ déplacé → ${f.name}`);
}
console.log("\nCleanup terminé.\n");
