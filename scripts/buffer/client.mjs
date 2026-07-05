import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

// Minimal .env.local loader (no dependency).
export function loadEnv() {
  const file = path.join(ROOT, ".env.local");
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

export function getToken() {
  const env = { ...loadEnv(), ...process.env };
  const token = env.BUFFER_API_KEY || env.BUFFER_ACCESS_TOKEN;
  if (!token) throw new Error("BUFFER_API_KEY manquant dans .env.local");
  return token;
}

const ENDPOINT = "https://api.buffer.com";

// Buffer GraphQL: always POST to the same endpoint, Bearer auth.
// GraphQL returns HTTP 200 even on errors — check the `errors` array.
export async function gql(query, variables = {}) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Réponse non-JSON (${res.status}): ${text.slice(0, 400)}`);
  }

  if (json.errors?.length) {
    const e = json.errors[0];
    const code = e.extensions?.code ? ` [${e.extensions.code}]` : "";
    throw new Error(`Buffer API${code}: ${e.message}`);
  }
  return json.data;
}

export async function getOrganizations() {
  const data = await gql(`
    query {
      account {
        id
        email
        organizations { id name channelCount }
      }
    }
  `);
  return data.account;
}

export async function createPost(input) {
  const data = await gql(
    `
    mutation Create($input: CreatePostInput!) {
      createPost(input: $input) {
        __typename
        ... on PostActionSuccess {
          post { id status dueAt }
        }
        ... on MutationError { message }
      }
    }
  `,
    { input }
  );
  const result = data.createPost;
  if (result.__typename !== "PostActionSuccess") {
    throw new Error(`createPost a échoué : ${result.message || JSON.stringify(result)}`);
  }
  return result.post;
}

export async function getChannels(organizationId) {
  const data = await gql(
    `
    query Channels($input: ChannelsInput!) {
      channels(input: $input) {
        id
        service
        type
        name
        displayName
        descriptor
        isDisconnected
        isLocked
        timezone
        externalLink
      }
    }
  `,
    { input: { organizationId } }
  );
  return data.channels;
}
