import { getOrganizations, getChannels } from "./client.mjs";

const account = await getOrganizations();
console.log(`\nCompte : ${account.email}`);
console.log(`Organisation(s) : ${account.organizations.length}\n`);

for (const org of account.organizations) {
  console.log(`▍ ${org.name}  (org id: ${org.id}) — ${org.channelCount} canal/canaux`);
  const channels = await getChannels(org.id);
  if (!channels.length) {
    console.log("   (aucun canal connecté)\n");
    continue;
  }
  for (const c of channels) {
    const flags = [
      c.isDisconnected ? "DÉCONNECTÉ" : null,
      c.isLocked ? "VERROUILLÉ" : null,
    ]
      .filter(Boolean)
      .join(", ");
    console.log(
      `   • ${c.descriptor} — ${c.displayName || c.name}${flags ? `  [${flags}]` : ""}`
    );
    console.log(`     channelId: ${c.id}`);
    console.log(`     service: ${c.service} | tz: ${c.timezone}${c.externalLink ? ` | ${c.externalLink}` : ""}`);
  }
  console.log("");
}
