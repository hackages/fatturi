import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { google } from "googleapis";
import { loadEnv } from "../buffer/client.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

// Résout un chemin de média du plan (« public/campaign/x.mp4 ») en absolu.
export function localPathOf(file) {
  return path.isAbsolute(file) ? file : path.join(ROOT, file);
}

const MIME = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};
const mimeOf = (file) => MIME[path.extname(file).toLowerCase()] || "application/octet-stream";

export function getConfig() {
  const env = { ...loadEnv(), ...process.env };
  const folderId = env.DRIVE_FOLDER_ID;
  if (!folderId) {
    throw new Error("DRIVE_FOLDER_ID manquant dans .env.local (id du dossier Drive partagé).");
  }
  return { env, folderId };
}

// Auth service account : soit un JSON inline (GOOGLE_SERVICE_ACCOUNT_JSON),
// soit un chemin de fichier clé (GOOGLE_SERVICE_ACCOUNT_KEY_FILE ou
// GOOGLE_APPLICATION_CREDENTIALS).
function buildAuth(env) {
  const inline = env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (inline) {
    let credentials;
    try {
      credentials = JSON.parse(inline);
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON n'est pas un JSON valide.");
    }
    return new google.auth.GoogleAuth({ credentials, scopes: SCOPES });
  }
  const keyFile = env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE || env.GOOGLE_APPLICATION_CREDENTIALS;
  if (keyFile) {
    const resolved = localPathOf(keyFile);
    if (!fs.existsSync(resolved)) throw new Error(`Fichier de clé service account introuvable : ${resolved}`);
    return new google.auth.GoogleAuth({ keyFile: resolved, scopes: SCOPES });
  }
  throw new Error(
    "Auth Google manquante : définis GOOGLE_SERVICE_ACCOUNT_KEY_FILE (chemin du JSON) " +
      "ou GOOGLE_SERVICE_ACCOUNT_JSON (JSON inline) dans .env.local."
  );
}

export async function getDrive() {
  const { env, folderId } = getConfig();
  const auth = buildAuth(env);
  const drive = google.drive({ version: "v3", auth });
  return { drive, folderId };
}

// Crée le fichier s'il n'existe pas dans le dossier, sinon met à jour son
// contenu (nouvelle révision) — idempotent, pas de doublon en cas de re-run.
export async function upsertFile(drive, folderId, localPath, name) {
  if (!fs.existsSync(localPath)) throw new Error(`Média local introuvable : ${localPath}`);
  const mimeType = mimeOf(localPath);
  const media = { mimeType, body: fs.createReadStream(localPath) };

  const existing = await drive.files.list({
    q: `name = '${name.replace(/'/g, "\\'")}' and '${folderId}' in parents and trashed = false`,
    fields: "files(id, name)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  try {
    if (existing.data.files?.length) {
      const fileId = existing.data.files[0].id;
      const res = await drive.files.update({
        fileId,
        media,
        fields: "id, webViewLink",
        supportsAllDrives: true,
      });
      return { id: res.data.id, link: res.data.webViewLink, updated: true };
    }
    const res = await drive.files.create({
      requestBody: { name, parents: [folderId] },
      media,
      fields: "id, webViewLink",
      supportsAllDrives: true,
    });
    return { id: res.data.id, link: res.data.webViewLink, updated: false };
  } catch (e) {
    const msg = String(e?.message || e);
    if (/storage quota|quotaExceeded|storageQuotaExceeded/i.test(msg)) {
      throw new Error(
        "Échec Drive : un compte de service n'a pas de quota de stockage. " +
          "Le dossier cible (DRIVE_FOLDER_ID) doit être dans un Drive partagé (Shared Drive) " +
          "dont le compte de service est membre. " +
          `(${msg})`
      );
    }
    throw e;
  }
}

// Dédoublonne les vidéos référencées par une liste de posts du plan.
export function collectVideos(posts) {
  const byName = new Map();
  for (const p of posts) {
    if (!p.video?.file) continue;
    const name = p.video.file.split("/").pop();
    if (!byName.has(name)) byName.set(name, { name, file: p.video.file, keys: [] });
    byName.get(name).keys.push(p.key);
  }
  return [...byName.values()];
}
