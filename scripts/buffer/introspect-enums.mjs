import { gql } from "./client.mjs";

const names = ["SchedulingType", "ShareMode", "Service", "ChannelType"];
for (const name of names) {
  const data = await gql(
    `query E($n: String!) { __type(name: $n) { name kind enumValues { name description } } }`,
    { n: name }
  );
  const t = data.__type;
  console.log(`\n${t.name} (${t.kind}):`);
  for (const v of t.enumValues || []) {
    console.log(`  - ${v.name}${v.description ? ` — ${v.description}` : ""}`);
  }
}
