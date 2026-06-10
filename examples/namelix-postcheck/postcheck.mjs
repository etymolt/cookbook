#!/usr/bin/env node
// Post-check candidate names produced by any generator.
// Usage: echo '["Inkstack","Sigil"]' | node postcheck.mjs

import { readFileSync } from "node:fs";

const stdin = readFileSync(0, "utf8").trim();
const candidates = JSON.parse(stdin);

if (!Array.isArray(candidates)) {
  console.error("postcheck: stdin must be a JSON array of names");
  process.exit(1);
}

const verdicts = await Promise.all(
  candidates.map(async (name) => {
    const BASE = process.env.ETYMOLT_BASE_URL || "https://api.etymolt.com";
    const r = await fetch(`${BASE}/v1/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return r.json();
  })
);

const MARK = {
  PROCEED: "✓",
  ITERATE: "~",
  DECIDE: "?",
  ABANDON: "✗",
  INSUFFICIENT_SIGNAL: "?",
};

for (const v of verdicts) {
  if (v.verdict === "ABANDON") continue; // drop silently
  const flags = Object.entries(v.axes ?? {})
    .filter(([, a]) => a.status !== "CLEAR")
    .map(([k, a]) => `${k}=${a.status}`)
    .join(" ");
  console.log(
    `${MARK[v.verdict] ?? "?"} ${v.verdict.padEnd(20)} ${v.name.padEnd(16)} score=${v.score} ${flags}`
  );
}
