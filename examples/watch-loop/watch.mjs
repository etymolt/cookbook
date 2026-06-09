#!/usr/bin/env node
// Re-verify a name on an interval; webhook on drift.
// Usage: node watch.mjs <name> --interval 24h --webhook https://...

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const name = args[0];
const interval = parseInterval(args[args.indexOf("--interval") + 1] ?? "24h");
const webhook = args[args.indexOf("--webhook") + 1];

if (!name || !webhook) {
  console.error("usage: node watch.mjs <name> --interval 24h --webhook <url>");
  process.exit(1);
}

const stateFile = `.watch-${name}.json`;

while (true) {
  const r = await fetch("https://api.etymolt.com/v1/verify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const verdict = await r.json();

  const last = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : null;

  if (last && drifted(last, verdict)) {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, before: last, after: verdict }),
    });
    console.log(`[${new Date().toISOString()}] drift: ${last.verdict} → ${verdict.verdict}`);
  } else {
    console.log(`[${new Date().toISOString()}] stable: ${verdict.verdict}`);
  }

  writeFileSync(stateFile, JSON.stringify(verdict));
  await sleep(interval);
}

function drifted(a, b) {
  if (a.verdict !== b.verdict) return true;
  for (const axis of Object.keys(a.axes ?? {})) {
    if (a.axes[axis].status !== b.axes[axis]?.status) return true;
  }
  return false;
}

function parseInterval(s) {
  const m = s.match(/^(\d+)([hms])$/);
  if (!m) throw new Error(`bad interval: ${s}`);
  const mult = { h: 3600_000, m: 60_000, s: 1000 }[m[2]];
  return parseInt(m[1], 10) * mult;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
