#!/usr/bin/env node
// Example glue: scrape candidate names from Namelix and pipe into postcheck.
//
// This is a sketch. Adjust the selector to whatever the generator surface uses.
// The shape that matters: produce a JSON array of strings, hand to postcheck.

import { spawn } from "node:child_process";

// In production you'd use puppeteer / playwright here. For the recipe we just
// hard-code the input shape so the pattern is legible.
const candidates = [
  "Inkstack",
  "Sigil",
  "Stratagem",
  "Aiyana",
  "Forgent",
];

const child = spawn("node", ["postcheck.mjs"], {
  stdio: ["pipe", "inherit", "inherit"],
});
child.stdin.write(JSON.stringify(candidates));
child.stdin.end();
