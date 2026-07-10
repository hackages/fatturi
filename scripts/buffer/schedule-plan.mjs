import { getOrganizations, getChannels, createPost, editPost, loadEnv } from "./client.mjs";
import { PLAN } from "../../campaign/plan.mjs";
import { getDrive, upsertFile, collectVideos, localPathOf } from "../drive/client.mjs";

/*
  Programme le plan J2–J4 (campaign/plan.mjs) sur Buffer
  (LinkedIn Page + Instagram + TikTok).

  Exemples :
    # Aperçu complet (n'envoie rien) — défaut
    node scripts/buffer/schedule-plan.mjs

    # Programmer tout
    node scripts/buffer/schedule-plan.mjs --send

    # Créer des BROUILLONS d'une journée (la manager valide dans Buffer)
    node scripts/buffer/schedule-plan.mjs --mode=draft --day=2026-07-07 --send

    # Brouillons Buffer + upload des vidéos sur Google Drive en une commande
    node scripts/buffer/schedule-plan.mjs --mode=draft --day=2026-07-07 --drive --send

    # Filtrer
    node scripts/buffer/schedule-plan.mjs --send --channel=instagram
    node scripts/buffer/schedule-plan.mjs --send --channel=tiktok
    node scripts/buffer/schedule-plan.mjs --send --day=2026-07-07
    node scripts/buffer/schedule-plan.mjs --send --only=j2-li-video

  Options :
    --send            exécute réellement (sinon dry-run)
    --mode=schedule|draft   schedule = date fixe (défaut) ; draft = brouillon
    --drive           publie aussi les vidéos sur Google Drive (voir scripts/drive)
    --channel=page|instagram|tiktok
    --day=YYYY-MM-DD
    --only=<key>
    --tz=+02:00       offset horaire (défaut +02:00, Europe/Paris été)
*/

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const env = loadEnv();
const TZ = args.tz || "+02:00";
const willSend = Boolean(args.send);
// --mode=schedule (défaut) programme à date fixe ; --mode=draft crée des
// brouillons (saveToDraft) que la manager valide elle-même dans Buffer.
const MODE = args.mode || "schedule";
if (!["schedule", "draft"].includes(MODE)) {
  console.error(`\n✗ --mode inconnu : ${MODE} (attendu: schedule | draft)\n`);
  process.exit(1);
}

if (!env.MEDIA_BASE_URL) {
  console.error("\n✗ MEDIA_BASE_URL manquant dans .env.local (URL publique des médias).\n");
  process.exit(1);
}
const MEDIA_BASE = env.MEDIA_BASE_URL.replace(/\/$/, "");
// --bust=N ajoute ?v=N pour forcer Buffer à re-télécharger un média modifié
// (Buffer met en cache par URL — cf. playbook).
const BUST = args.bust ? `?v=${args.bust}` : "";
const fileToUrl = (file) => `${MEDIA_BASE}/${file.split("/").pop()}${BUST}`;

// Résolution des canaux.
const account = await getOrganizations();
const org = account.organizations[0];
const channels = await getChannels(org.id);

const resolveChannel = (kind) => {
  if (kind === "page") return channels.find((c) => c.service === "linkedin" && c.type === "page");
  if (kind === "instagram") return channels.find((c) => c.service === "instagram");
  if (kind === "tiktok") return channels.find((c) => c.service === "tiktok");
  return null;
};

// Filtres.
let posts = PLAN;
if (args.channel) posts = posts.filter((p) => p.channel === args.channel);
if (args.day) posts = posts.filter((p) => p.day === args.day);
if (args.only) {
  const keys = String(args.only).split(",").map((s) => s.trim());
  posts = posts.filter((p) => keys.includes(p.key));
}

if (!posts.length) {
  console.error("\n✗ Aucun post ne correspond aux filtres.\n");
  process.exit(1);
}

const buildAssets = (post) => {
  if (post.video) {
    // Buffer refuse les miniatures vidéo personnalisées (thumbnailUrl) : le réseau
    // utilise la 1re image de la vidéo. Nos reels portent leur cover en frame 0,
    // donc la miniature du grid reste correcte sans thumbnailUrl.
    return [{ video: { url: fileToUrl(post.video.file) } }];
  }
  if (post.images) return post.images.map((img) => ({ image: { url: fileToUrl(img.file) } }));
  if (post.image) return [{ image: { url: fileToUrl(post.image.file) } }];
  return [];
};

const buildInput = (post) => {
  const channel = resolveChannel(post.channel);
  if (!channel) throw new Error(`Canal introuvable pour "${post.channel}"`);
  const dueAt = `${post.day}T${post.time}:00${TZ}`;
  const input = {
    channelId: channel.id,
    text: post.text,
    schedulingType: "automatic",
    assets: buildAssets(post),
  };
  if (MODE === "draft") {
    // Brouillon Buffer : la manager valide/planifie ensuite dans l'app.
    input.saveToDraft = true;
    input.mode = "addToQueue";
  } else {
    input.mode = "customScheduled";
    input.dueAt = dueAt;
  }
  if (post.channel === "instagram") {
    // shouldShareToFeed est requis (Boolean!) pour reel ET post côté Buffer.
    input.metadata = {
      instagram: {
        type: post.igType === "reel" ? "reel" : "post",
        shouldShareToFeed: true,
      },
    };
  } else if (post.channel === "tiktok" && post.ttTitle) {
    // TikTokPostMetadataInput : title/isAiGenerated, tous optionnels.
    input.metadata = { tiktok: { title: post.ttTitle } };
  }
  return { channel, dueAt, input };
};

// Mode édition : --edit=key=postId[,key=postId] met à jour des posts existants
// (média + texte + horaire) sans en recréer. Utiliser --bust=N pour re-fetch média.
if (args.edit) {
  const pairs = String(args.edit)
    .split(",")
    .map((s) => s.trim())
    .map((s) => s.split("="));
  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`Édition Fatturi — ${pairs.length} post(s) ${willSend ? "→ ENVOI" : "(dry-run)"}  bust=${args.bust || "—"}`);
  console.log(`═══════════════════════════════════════════════════\n`);
  for (const [key, postId] of pairs) {
    const post = PLAN.find((p) => p.key === key);
    if (!post) {
      console.log(`✗ ${key} — introuvable dans le plan\n`);
      continue;
    }
    const { input } = buildInput(post);
    delete input.channelId; // EditPostInput n'accepte pas channelId
    const editInput = { id: postId, ...input };
    const media = editInput.assets.map((a) => (a.video ? `🎬 ${a.video.url}` : `🖼️  ${a.image.url}`)).join("\n              ");
    console.log(`─── ${key} → ${postId} ───`);
    console.log(`  Média : ${media}`);
    if (!willSend) {
      console.log("  (dry-run)\n");
      continue;
    }
    try {
      const updated = await editPost(editInput);
      console.log(`  ✅ Mis à jour — ${updated.status} | ${updated.dueAt}\n`);
    } catch (e) {
      console.log(`  ✗ Échec : ${e.message}\n`);
    }
  }
  process.exit(0);
}

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Plan Fatturi — ${posts.length} post(s) · mode=${MODE} ${willSend ? "→ ENVOI" : "(dry-run)"}`);
console.log(`Organisation : ${org.name} (${org.id})`);
console.log(`═══════════════════════════════════════════════════\n`);

let ok = 0;
let ko = 0;

for (const post of posts) {
  let built;
  try {
    built = buildInput(post);
  } catch (e) {
    console.log(`✗ ${post.key} — ${e.message}\n`);
    ko++;
    continue;
  }
  const { channel, dueAt, input } = built;
  const media = input.assets.length
    ? input.assets.map((a) => (a.video ? `🎬 ${a.video.url}` : `🖼️  ${a.image.url}`)).join("\n              ")
    : "aucun (texte seul)";

  console.log(`─── ${post.key} ───────────────────────────────`);
  console.log(`  ${post.label}`);
  console.log(`  Canal   : ${channel.descriptor} (${channel.service}/${channel.type || channel.service})`);
  console.log(`  Quand   : ${MODE === "draft" ? "brouillon (à valider dans Buffer)" : dueAt}`);
  if (input.metadata) console.log(`  IG type : ${input.metadata.instagram.type}`);
  console.log(`  Média   : ${media}`);
  console.log(`  Texte   : ${post.text.split("\n")[0]} …`);

  if (!willSend) {
    console.log("");
    continue;
  }

  try {
    const created = await createPost(input);
    console.log(`  ✅ Programmé — id ${created.id} | ${created.status} | ${created.dueAt || dueAt}\n`);
    ok++;
  } catch (e) {
    console.log(`  ✗ Échec : ${e.message}\n`);
    ko++;
  }
}

console.log(`═══════════════════════════════════════════════════`);
if (willSend) {
  const verbe = MODE === "draft" ? "brouillon(s) créé(s)" : "programmé(s)";
  console.log(`Terminé : ${ok} ${verbe}, ${ko} échec(s).`);
} else {
  const suite = MODE === "draft" ? "créer les brouillons" : "programmer";
  console.log(`🟡 DRY-RUN — rien envoyé. Ajoute --send pour ${suite}.`);
}
console.log(`═══════════════════════════════════════════════════\n`);

// --drive : publie aussi les vidéos des posts filtrés sur Google Drive
// (dossier partagé) pour l'ajout manuel de musique + voix par la manager.
if (args.drive) {
  const videos = collectVideos(posts);
  console.log(`─── Google Drive — ${videos.length} vidéo(s) ${willSend ? "→ UPLOAD" : "(dry-run)"} ───`);
  if (!videos.length) {
    console.log("  Aucune vidéo dans la sélection.\n");
  } else if (!willSend) {
    for (const v of videos) console.log(`  • ${v.name} (${v.keys.join(", ")})`);
    console.log("");
  } else {
    try {
      const { drive, folderId } = await getDrive();
      for (const v of videos) {
        try {
          const res = await upsertFile(drive, folderId, localPathOf(v.file), v.name);
          console.log(`  ✅ ${v.name} — ${res.updated ? "mis à jour" : "uploadé"} — ${res.link}`);
        } catch (e) {
          console.log(`  ✗ ${v.name} — ${e.message}`);
        }
      }
    } catch (e) {
      console.log(`  ✗ Drive indisponible : ${e.message}`);
    }
    console.log("");
  }
}
