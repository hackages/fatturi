import fs from "node:fs";
import path from "node:path";
import { getDrive, localPathOf } from "./client.mjs";
import { PLAN, VIDEO_LABELS } from "../../campaign/plan.mjs";

/*
  Organise les médias de campagne dans Google Drive en arborescence :

    <Drive partagé>/
      Instagram/
        J5 · 2026-07-13 · Suis-je concerné/
          MÉMO — J5 · Suis-je concerné   (thème du jour + posts)
          <carrousel, reel, card…>
      TikTok/
        …
      LinkedIn/
        …

  L'arborescence (dossiers + mémos) est créée pour TOUS les jours J5–J7.
  Les médias ne sont poussés que pour le(s) jour(s) --push (défaut : jour 1).

  Exemples :
    node scripts/drive/organize-campaign.mjs                 # dry-run (aperçu)
    node scripts/drive/organize-campaign.mjs --send          # structure + mémos + médias jour 1
    node scripts/drive/organize-campaign.mjs --send --push=all
    node scripts/drive/organize-campaign.mjs --send --push=2026-07-14
*/

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);
const willSend = Boolean(args.send);

const CHANNELS = [
  { key: "page", folder: "LinkedIn" },
  { key: "instagram", folder: "Instagram" },
  { key: "tiktok", folder: "TikTok" },
];

// Thème + résumé + questions clients visées, par jour.
const THEMES = {
  "2026-07-13": {
    jour: "J5",
    label: "Lundi 13 juillet 2026",
    theme: "Suis-je concerné ?",
    summary:
      "Beaucoup d'indépendants (micro-entreprise, franchise en base de TVA, auto-entrepreneurs) pensent ne pas être concernés. C'est faux : la RÉCEPTION de factures électroniques est obligatoire pour toutes les entreprises dès le 1er sept. 2026, et l'ÉMISSION (B2B) dès le 1er sept. 2027. Le niveau de chiffre d'affaires n'exonère de rien.",
    questions: [
      "« Je ne suis pas à la TVA, ça me concerne ? »",
      "« Auto-entrepreneur / micro : à partir de quand ? »",
      "« J'ai déclaré 0 € depuis le début, suis-je soumis à ça ? »",
    ],
  },
  "2026-07-14": {
    jour: "J6",
    label: "Mardi 14 juillet 2026",
    theme: "Vendre en ligne / plateformes",
    summary:
      "Trois situations, trois réponses. Clients particuliers (B2C) : pas de facture électronique mais e-reporting des encaissements. Marketplaces (Amazon, Uber, Vinted…) : la plateforme peut facturer, mais le e-reporting et les ventes hors plateforme restent à votre charge. Vente directe (Stripe, PayPal, Shopify) : chaque encaissement doit devenir une facture conforme. Fatturi centralise tout.",
    questions: [
      "« Je vends sur Amazon / Vinted / Shopify, comment ça se passe ? »",
      "« Je ne facture que des particuliers, suis-je concerné ? »",
      "« Rémunération YouTube / TikTok : que faire ? »",
    ],
  },
  "2026-07-15": {
    jour: "J7",
    label: "Mercredi 15 juillet 2026",
    theme: "Objections : format, sécurité, coût",
    summary:
      "Une facture par email n'est pas une facture électronique : il faut un format structuré (Factur-X = PDF lisible + données XML), transmis via une plateforme agréée (PA). Les PA sont certifiées par l'État (sécurité, chiffrement). Le portail public couvre le minimum gratuitement ; Fatturi automatise pour supprimer le temps de saisie.",
    questions: [
      "« Ma facture, je l'envoie par mail, c'est électronique ? »",
      "« Ces plateformes vont se faire pirater… »",
      "« Encore un abonnement, je ne paierai pas. »",
    ],
  },
};

// Jour(s) dont on pousse les médias. Défaut : jour 1 (le plus proche).
const PUSH_DAYS =
  args.push === "all"
    ? Object.keys(THEMES)
    : [typeof args.push === "string" ? args.push : Object.keys(THEMES).sort()[0]];

// ─────────────────────────── Helpers Drive ───────────────────────────
const esc = (s) => String(s).replace(/'/g, "\\'");

async function findOrCreateFolder(drive, parentId, name) {
  const q = `mimeType='application/vnd.google-apps.folder' and name='${esc(
    name
  )}' and '${parentId}' in parents and trashed=false`;
  const res = await drive.files.list({
    q,
    fields: "files(id,name)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  if (res.data.files?.length) return { id: res.data.files[0].id, created: false };
  const created = await drive.files.create({
    requestBody: { name, mimeType: "application/vnd.google-apps.folder", parents: [parentId] },
    fields: "id",
    supportsAllDrives: true,
  });
  return { id: created.data.id, created: true };
}

const MIME = { ".mp4": "video/mp4", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg" };
const mimeOf = (f) => MIME[path.extname(f).toLowerCase()] || "application/octet-stream";

// Upload/maj idempotent d'un média dans un dossier (clé = nom de fichier source).
async function upsertMedia(drive, folderId, file, displayName) {
  const local = localPathOf(file);
  if (!fs.existsSync(local)) throw new Error(`Média introuvable : ${local}`);
  const sourceKey = file.split("/").pop();
  const media = { mimeType: mimeOf(file), body: fs.createReadStream(local) };
  const existing = await drive.files.list({
    q: `appProperties has { key='fatturiSource' and value='${esc(
      sourceKey
    )}' } and '${folderId}' in parents and trashed=false`,
    fields: "files(id)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  if (existing.data.files?.length) {
    const id = existing.data.files[0].id;
    await drive.files.update({ fileId: id, requestBody: { name: displayName }, media, supportsAllDrives: true });
    return { updated: true };
  }
  await drive.files.create({
    requestBody: { name: displayName, parents: [folderId], appProperties: { fatturiSource: sourceKey } },
    media,
    supportsAllDrives: true,
  });
  return { updated: false };
}

// Crée/maj le mémo (Google Doc converti depuis du texte ; repli .txt si besoin).
async function upsertMemo(drive, folderId, title, text, memoKey) {
  const existing = await drive.files.list({
    q: `appProperties has { key='fatturiMemo' and value='${esc(
      memoKey
    )}' } and '${folderId}' in parents and trashed=false`,
    fields: "files(id)",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  const media = { mimeType: "text/plain", body: text };
  if (existing.data.files?.length) {
    const id = existing.data.files[0].id;
    await drive.files.update({ fileId: id, requestBody: { name: title }, media, supportsAllDrives: true });
    return { updated: true };
  }
  const tryCreate = (docMime) =>
    drive.files.create({
      requestBody: {
        name: title,
        ...(docMime ? { mimeType: docMime } : {}),
        parents: [folderId],
        appProperties: { fatturiMemo: memoKey },
      },
      media,
      supportsAllDrives: true,
    });
  try {
    await tryCreate("application/vnd.google-apps.document");
  } catch {
    await tryCreate(null); // repli : fichier texte brut
  }
  return { updated: false };
}

// ─────────────────────── Contenu par canal / jour ───────────────────────
const captionBody = (text) => text.split("\n.\n")[0].trim();

// Médias d'un canal pour un jour, avec nom d'affichage lisible.
function mediaFor(channelKey, day) {
  const posts = PLAN.filter((p) => p.channel === channelKey && p.day === day);
  const out = [];
  const seen = new Set();
  const push = (file, displayName) => {
    const base = file.split("/").pop();
    if (seen.has(base)) return;
    seen.add(base);
    out.push({ file, displayName });
  };
  for (const p of posts) {
    if (p.video?.file) {
      const base = p.video.file.split("/").pop();
      const lbl = VIDEO_LABELS[base];
      push(p.video.file, lbl ? `${lbl}${path.extname(base)}` : base);
    }
    if (p.images) p.images.forEach((img, i) => push(img.file, `Carrousel — ${i + 1}.png`));
    if (p.image) push(p.image.file, p.image.file.split("/").pop());
  }
  return { posts, media: out };
}

function memoText(channelFolder, day, posts) {
  const t = THEMES[day];
  const lines = [];
  lines.push(`FATTURI — MÉMO CONTENU`);
  lines.push(`Jour   : ${t.jour} · ${t.label}`);
  lines.push(`Canal  : ${channelFolder}`);
  lines.push(`Thème  : ${t.theme}`);
  lines.push("");
  lines.push(`RÉSUMÉ`);
  lines.push(t.summary);
  lines.push("");
  lines.push(`QUESTIONS CLIENTS VISÉES`);
  for (const q of t.questions) lines.push(`  - ${q}`);
  lines.push("");
  lines.push(`POSTS DU JOUR (${channelFolder})`);
  for (const p of posts) {
    lines.push("");
    lines.push(`• ${p.time} — ${p.label}`);
    for (const l of captionBody(p.text).split("\n")) lines.push(`    ${l}`);
  }
  lines.push("");
  lines.push(`RAPPEL PRODUCTION`);
  lines.push(`  - Les reels (fichiers vidéo de ce dossier) doivent recevoir musique + voix avant publication.`);
  lines.push(`  - Les brouillons correspondants sont déjà dans Buffer (Instagram + TikTok à valider ; LinkedIn programmé).`);
  return lines.join("\n");
}

// ─────────────────────────────── Run ───────────────────────────────
console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Drive — Organisation campagne ${willSend ? "→ ENVOI" : "(dry-run)"}`);
console.log(`Structure : Canal › Jour › (mémo + médias)`);
console.log(`Médias poussés pour : ${PUSH_DAYS.join(", ")}`);
console.log(`═══════════════════════════════════════════════════\n`);

const allDays = Object.keys(THEMES).sort();
let drive, folderId;
if (willSend) {
  ({ drive, folderId } = await getDrive());
}

for (const ch of CHANNELS) {
  console.log(`━━ ${ch.folder} ━━`);
  let channelId;
  if (willSend) {
    const f = await findOrCreateFolder(drive, folderId, ch.folder);
    channelId = f.id;
    console.log(`  dossier canal : ${ch.folder} ${f.created ? "(créé)" : "(existant)"}`);
  }
  for (const day of allDays) {
    const t = THEMES[day];
    const dayName = `${t.jour} · ${day} · ${t.theme}`.replace(/[\\/]/g, "-");
    const { posts, media } = mediaFor(ch.key, day);
    const doPush = PUSH_DAYS.includes(day);
    console.log(`  └ ${dayName}`);
    if (!willSend) {
      console.log(`      mémo : MÉMO — ${t.jour} · ${t.theme}`);
      if (doPush) media.forEach((m) => console.log(`      + ${m.displayName}`));
      else console.log(`      (médias non poussés)`);
      continue;
    }
    const dayFolder = await findOrCreateFolder(drive, channelId, dayName);
    const memo = await upsertMemo(
      drive,
      dayFolder.id,
      `MÉMO — ${t.jour} · ${t.theme}`,
      memoText(ch.folder, day, posts),
      `${ch.key}/${day}`
    );
    console.log(`      mémo ${memo.updated ? "mis à jour" : "créé"}`);
    if (doPush) {
      for (const m of media) {
        try {
          const r = await upsertMedia(drive, dayFolder.id, m.file, m.displayName);
          console.log(`      ${r.updated ? "↻" : "+"} ${m.displayName}`);
        } catch (e) {
          console.log(`      ✗ ${m.displayName} — ${e.message}`);
        }
      }
    }
  }
  console.log("");
}

console.log(`═══════════════════════════════════════════════════`);
console.log(willSend ? `Terminé.` : `🟡 DRY-RUN — rien créé. Ajoute --send.`);
console.log(`═══════════════════════════════════════════════════\n`);
