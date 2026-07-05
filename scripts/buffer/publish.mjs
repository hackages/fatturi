import { getOrganizations, getChannels, createPost } from "./client.mjs";
import { J1 } from "../../campaign/j1.mjs";
import { loadEnv } from "./client.mjs";

/*
  Publication d'un contenu de campagne sur Buffer (API GraphQL).

  Exemples :
    # Aperçu (n'envoie rien) — par défaut
    node scripts/buffer/publish.mjs --content=video-demo --channel=page

    # Créer un brouillon dans Buffer (à valider dans l'app)
    node scripts/buffer/publish.mjs --content=video-demo --channel=page --mode=draft --send

    # Programmer à une date précise
    node scripts/buffer/publish.mjs --content=post-accroche --channel=page \
      --mode=schedule --due="2026-07-06T08:00:00+02:00" --send

  Options :
    --content=<clé>     clé dans campaign/j1.mjs (post-accroche | video-demo)
    --channel=page|profile   canal LinkedIn cible (raccourci) OU --channel-id=<id>
    --mode=draft|queue|now|schedule   (défaut: draft)
    --due=<ISO8601>     requis si --mode=schedule
    --media-url=<url>   URL publique du média (sinon MEDIA_BASE_URL + fichier)
    --thumb-url=<url>   URL publique de la miniature (vidéo)
    --send              exécute réellement (sans lui: dry-run)
*/

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const env = loadEnv();
const CONTENT = { ...J1 };

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

const key = args.content;
if (!key || !CONTENT[key]) {
  fail(`--content invalide. Choix : ${Object.keys(CONTENT).join(", ")}`);
}
const content = CONTENT[key];

// Résolution du canal cible.
const account = await getOrganizations();
const org = account.organizations[0];
const channels = await getChannels(org.id);

let channel;
if (args["channel-id"]) {
  channel = channels.find((c) => c.id === args["channel-id"]);
} else if (args.channel === "page") {
  channel = channels.find((c) => c.service === "linkedin" && c.type === "page");
} else if (args.channel === "profile") {
  channel = channels.find((c) => c.service === "linkedin" && c.type === "profile");
}
if (!channel) {
  fail(
    `Canal introuvable. Utilise --channel=page|profile ou --channel-id=<id>.\n` +
      channels.map((c) => `   ${c.descriptor} → ${c.id}`).join("\n")
  );
}

// Construction des assets (média via URL publique).
const assets = [];
const mediaBase = args["media-url"] ? null : env.MEDIA_BASE_URL;
const fileToUrl = (file) => {
  if (!mediaBase) return null;
  const name = file.split("/").pop();
  return `${mediaBase.replace(/\/$/, "")}/${name}`;
};

const willSend = Boolean(args.send);
const requireUrl = (url, what) => {
  if (url) return url;
  if (willSend) {
    fail(
      `${what} nécessite une URL publique. Fournis --media-url=<url> ` +
        `ou définis MEDIA_BASE_URL dans .env.local.`
    );
  }
  return "<URL_PUBLIQUE_MANQUANTE>";
};

if (content.video) {
  const url = requireUrl(args["media-url"] || fileToUrl(content.video.file), "Cette vidéo");
  const thumbnailUrl = args["thumb-url"] || fileToUrl(content.video.thumbnail);
  assets.push({ video: { url, ...(thumbnailUrl ? { thumbnailUrl } : {}) } });
} else if (content.images) {
  content.images.forEach((img, i) => {
    const url = requireUrl(fileToUrl(img.file), `L'image ${i + 1}`);
    assets.push({ image: { url } });
  });
} else if (content.image) {
  const url = requireUrl(args["media-url"] || fileToUrl(content.image.file), "Cette image");
  assets.push({ image: { url } });
}

// Mode de planification.
const mode = args.mode || "draft";
const input = {
  channelId: channel.id,
  text: content.text,
  schedulingType: "automatic",
  assets,
};

if (mode === "draft") {
  input.saveToDraft = true;
  input.mode = "addToQueue";
} else if (mode === "queue") {
  input.mode = "addToQueue";
} else if (mode === "now") {
  input.mode = "shareNow";
} else if (mode === "schedule") {
  if (!args.due) fail("--mode=schedule requiert --due=<ISO8601>");
  input.mode = "customScheduled";
  input.dueAt = args.due;
} else {
  fail(`--mode inconnu : ${mode}`);
}

// Récap.
console.log(`\n─────────────────────────────────────────`);
console.log(`Contenu   : ${content.label}`);
console.log(`Canal     : ${channel.descriptor} — ${channel.displayName || channel.name}`);
console.log(`Mode      : ${mode}${input.dueAt ? ` @ ${input.dueAt}` : ""}`);
console.log(`Média     : ${assets.length ? JSON.stringify(assets) : "aucun (texte seul)"}`);
console.log(`─────────────────────────────────────────`);
console.log(content.text);
console.log(`─────────────────────────────────────────\n`);

if (!args.send) {
  console.log("🟡 DRY-RUN — rien n'a été envoyé. Ajoute --send pour publier/programmer.\n");
  process.exit(0);
}

const post = await createPost(input);
console.log(`✅ Créé sur Buffer — post id: ${post.id} | statut: ${post.status}${post.dueAt ? ` | ${post.dueAt}` : ""}\n`);
