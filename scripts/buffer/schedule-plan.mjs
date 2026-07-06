import { getOrganizations, getChannels, createPost, loadEnv } from "./client.mjs";
import { PLAN } from "../../campaign/plan.mjs";

/*
  Programme le plan J2–J4 (campaign/plan.mjs) sur Buffer (LinkedIn Page + Instagram).

  Exemples :
    # Aperçu complet (n'envoie rien) — défaut
    node scripts/buffer/schedule-plan.mjs

    # Programmer tout
    node scripts/buffer/schedule-plan.mjs --send

    # Filtrer
    node scripts/buffer/schedule-plan.mjs --send --channel=instagram
    node scripts/buffer/schedule-plan.mjs --send --day=2026-07-07
    node scripts/buffer/schedule-plan.mjs --send --only=j2-li-video

  Options :
    --send            exécute réellement (sinon dry-run)
    --channel=page|instagram
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

if (!env.MEDIA_BASE_URL) {
  console.error("\n✗ MEDIA_BASE_URL manquant dans .env.local (URL publique des médias).\n");
  process.exit(1);
}
const MEDIA_BASE = env.MEDIA_BASE_URL.replace(/\/$/, "");
const fileToUrl = (file) => `${MEDIA_BASE}/${file.split("/").pop()}`;

// Résolution des canaux.
const account = await getOrganizations();
const org = account.organizations[0];
const channels = await getChannels(org.id);

const resolveChannel = (kind) => {
  if (kind === "page") return channels.find((c) => c.service === "linkedin" && c.type === "page");
  if (kind === "instagram") return channels.find((c) => c.service === "instagram");
  return null;
};

// Filtres.
let posts = PLAN;
if (args.channel) posts = posts.filter((p) => p.channel === args.channel);
if (args.day) posts = posts.filter((p) => p.day === args.day);
if (args.only) posts = posts.filter((p) => p.key === args.only);

if (!posts.length) {
  console.error("\n✗ Aucun post ne correspond aux filtres.\n");
  process.exit(1);
}

const buildAssets = (post) => {
  if (post.video) {
    return [
      {
        video: {
          url: fileToUrl(post.video.file),
          ...(post.video.thumbnail ? { thumbnailUrl: fileToUrl(post.video.thumbnail) } : {}),
        },
      },
    ];
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
    mode: "customScheduled",
    dueAt,
    assets: buildAssets(post),
  };
  if (post.channel === "instagram") {
    input.metadata = {
      instagram: {
        type: post.igType === "reel" ? "reel" : "post",
        ...(post.igType === "reel" ? { shouldShareToFeed: true } : {}),
      },
    };
  }
  return { channel, dueAt, input };
};

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Plan Fatturi — ${posts.length} post(s) ${willSend ? "→ ENVOI" : "(dry-run)"}`);
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
  console.log(`  Quand   : ${dueAt}`);
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
  console.log(`Terminé : ${ok} programmé(s), ${ko} échec(s).`);
} else {
  console.log(`🟡 DRY-RUN — rien envoyé. Ajoute --send pour programmer.`);
}
console.log(`═══════════════════════════════════════════════════\n`);
