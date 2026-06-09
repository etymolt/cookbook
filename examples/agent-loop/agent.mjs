#!/usr/bin/env node
// Generate-and-filter agent loop. Claude generates 20 names per pass,
// Etymolt verifies each, keep going until we have ≥5 survivors.

import Anthropic from "@anthropic-ai/sdk";

const brief = process.argv[2];
if (!brief) {
  console.error("usage: node agent.mjs '<brand brief>'");
  process.exit(1);
}

const client = new Anthropic();

async function generateNames(brief, count) {
  const r = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `Generate ${count} candidate brand names for: ${brief}\n\nReturn a JSON array of strings only. No prose.`,
      },
    ],
  });
  const text = r.content[0].text;
  return JSON.parse(text.match(/\[[\s\S]*\]/)[0]);
}

async function verifyEtymolt(name) {
  const r = await fetch("https://api.etymolt.com/v1/verify", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return r.json();
}

let survivors = [];
let attempts = 0;
const TARGET = 5;
const MAX_ATTEMPTS = 3;

while (survivors.length < TARGET && attempts < MAX_ATTEMPTS) {
  const candidates = await generateNames(brief, 20);
  const verdicts = await Promise.all(candidates.map(verifyEtymolt));
  const new_survivors = verdicts.filter((v) => v.verdict !== "ABANDON");
  survivors.push(...new_survivors);
  attempts++;
  console.error(`attempt ${attempts}: ${new_survivors.length}/${candidates.length} survived`);
}

const ranked = survivors.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, TARGET);

for (const v of ranked) {
  console.log(`${v.verdict.padEnd(10)} ${v.name.padEnd(16)} score=${v.score}`);
}

console.log("");
console.log(ranked[0]?.disclaimer ?? "");
