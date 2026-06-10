#!/usr/bin/env node
// Verify a single candidate name against Etymolt. EVP/1 verdict in <20 lines.
// Usage: node verify.mjs <name>

const name = process.argv[2];
if (!name) {
  console.error("usage: node verify.mjs <name>");
  process.exit(1);
}

const BASE = process.env.ETYMOLT_BASE_URL || "https://api.etymolt.com";
const response = await fetch(`${BASE}/v1/verify`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name }),
});

if (!response.ok) {
  console.error(`etymolt: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const verdict = await response.json();

console.log(`Name:        ${verdict.name}`);
console.log(`Verdict:     ${verdict.verdict}`);
console.log(`Score:       ${verdict.score}`);
console.log(`Valid until: ${verdict.valid_until ?? "(default 24h)"}`);
console.log("");
console.log(verdict.disclaimer);
