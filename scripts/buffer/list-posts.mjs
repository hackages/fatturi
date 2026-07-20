import { gql, getOrganizations, getChannels } from "./client.mjs";

/*
  Inventaire du contenu social restant sur Buffer, par canal.

  Exemples :
    # Ce qui reste à publier (programmés + brouillons + à valider)
    node scripts/buffer/list-posts.mjs

    # Inclure aussi l'historique envoyé
    node scripts/buffer/list-posts.mjs --status=scheduled,draft,needs_approval,sent

    # Un seul canal
    node scripts/buffer/list-posts.mjs --channel=instagram

  Options :
    --status=a,b,c   statuts à inclure (défaut: scheduled,draft,needs_approval)
    --channel=page|instagram|tiktok
    --all            tous les canaux (défaut)
*/

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...rest] = a.replace(/^--/, "").split("=");
    return [k, rest.length ? rest.join("=") : true];
  })
);

const STATUSES = String(args.status || "scheduled,draft,needs_approval")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const account = await getOrganizations();
const org = account.organizations[0];
const channels = await getChannels(org.id);

const wanted = (c) => {
  if (!args.channel) return true;
  if (args.channel === "page") return c.service === "linkedin" && c.type === "page";
  return c.service === args.channel;
};
const channelIds = channels.filter(wanted).map((c) => c.id);
const channelById = new Map(channels.map((c) => [c.id, c]));

const POSTS_QUERY = `
  query Posts($input: PostsInput!, $first: Int, $after: String) {
    posts(input: $input, first: $first, after: $after) {
      edges {
        node {
          id
          status
          dueAt
          sentAt
          text
          channelId
          channelService
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

async function fetchAll() {
  const out = [];
  let after = null;
  for (;;) {
    const data = await gql(POSTS_QUERY, {
      input: {
        organizationId: org.id,
        filter: { channelIds, status: STATUSES },
      },
      first: 100,
      after,
    });
    const res = data.posts;
    for (const e of res.edges) out.push(e.node);
    if (!res.pageInfo?.hasNextPage) break;
    after = res.pageInfo.endCursor;
  }
  return out;
}

const posts = await fetchAll();

const fmt = (iso) =>
  iso
    ? new Date(iso).toLocaleString("fr-FR", {
        weekday: "short",
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const STATUS_LABEL = {
  scheduled: "programmé",
  draft: "brouillon",
  needs_approval: "à valider",
  sent: "envoyé",
  sending: "en cours",
  error: "erreur",
};

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Inventaire Buffer — ${org.name}`);
console.log(`Statuts : ${STATUSES.join(", ")}`);
console.log(`Aujourd'hui : ${new Date().toLocaleString("fr-FR")}`);
console.log(`═══════════════════════════════════════════════════`);

const now = Date.now();
let grandTotal = 0;

for (const c of channels.filter(wanted)) {
  const mine = posts
    .filter((p) => p.channelId === c.id)
    .sort((a, b) => (a.dueAt || a.sentAt || "").localeCompare(b.dueAt || b.sentAt || ""));

  console.log(`\n▍ ${c.descriptor} — ${c.displayName || c.name} (${c.service})`);
  if (!mine.length) {
    console.log("   ⚠️  aucun contenu (file vide)");
    continue;
  }

  const byStatus = mine.reduce((m, p) => ((m[p.status] = (m[p.status] || 0) + 1), m), {});
  const summary = Object.entries(byStatus)
    .map(([s, n]) => `${n} ${STATUS_LABEL[s] || s}`)
    .join(" · ");
  console.log(`   ${mine.length} post(s) — ${summary}`);

  const future = mine.filter((p) => p.dueAt && new Date(p.dueAt).getTime() >= now);
  if (future.length) {
    const last = future[future.length - 1];
    console.log(`   Couverture programmée jusqu'au : ${fmt(last.dueAt)}`);
  }

  for (const p of mine) {
    const when = p.status === "sent" ? fmt(p.sentAt) : fmt(p.dueAt);
    const firstLine = (p.text || "").split("\n")[0].slice(0, 70);
    console.log(`   • [${STATUS_LABEL[p.status] || p.status}] ${when} — ${firstLine}${firstLine.length >= 70 ? "…" : ""}`);
  }
  grandTotal += mine.length;
}

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`Total : ${grandTotal} post(s) sur ${channels.filter(wanted).length} canal/canaux`);
console.log(`═══════════════════════════════════════════════════\n`);
