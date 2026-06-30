# Etymolt Cookbook

> Runnable recipes for verifying names at scale, wiring Etymolt into name generators, interpreting confidence, and building agent loops.

## Anchor recipes

| Recipe | What it does |
|---|---|
| [Verify a single name](./examples/verify-single-name/README.md) | 18-line script. `fetch` against `/v1/verify`. |
| [Wrap a name generator's output](./examples/namelix-postcheck/README.md) | Post-check pattern for Namelix, Brandsnap, Looka, Squadhelp, ChatGPT. |
| [Agent loop that filters names](./examples/agent-loop/README.md) | Claude generates → Etymolt verifies → keep survivors. |
| [Render an EVP/1 verdict in React](./examples/react-render/README.md) | Drop-in component. Answer-first. Disclaimer verbatim. |
| [Watch a name for verdict drift](./examples/watch-loop/README.md) | Re-verify on schedule; webhook on drift. |

## Verify a verdict in your browser

Every recipe in this cookbook returns a signed EVP/1 envelope. Paste any verdict (the full JSON, or just the `signature_b64` + canonical payload) into [`etymolt.com/verify`](https://www.etymolt.com/verify) to see the Ed25519 signature green-check against the live `/.well-known/verdict-keys.json` registry — no SDK, no install. Good for sharing a verdict with a teammate or proving freshness in a screenshot.

## Pricing

Free tier: anon calls rate-limited per IP. Authenticated standard: **$0.25 per verdict**. Volume tiers: $0.15 (1K–5K/mo), $0.10 (5K–20K/mo), $0.05 (20K+/mo). See [`etymolt.com/pricing`](https://www.etymolt.com/pricing) for the live table.

## Coming soon

- Batch-verify a CSV at scale (rate limiting + checkpoint resume)
- Drop into Claude Desktop via [`etymolt/mcp-server`](https://github.com/etymolt/mcp-server)
- Drop into Cursor via the same MCP server
- Next.js App Router integration → see [`etymolt/etymolt-nextjs-example`](https://github.com/etymolt/etymolt-nextjs-example)
- Interpreting confidence scores in the verdict envelope

## Run any recipe

Each recipe is self-contained. `cd examples/<recipe>` and follow its README.

## Contribute

PRs welcome. New recipes should:

1. Live in `examples/<slug>/` with a `README.md` and runnable script.
2. Be reachable from `registry.yaml` (the LLM-discoverable index).
3. Render the EVP/1 disclaimer verbatim if it surfaces a verdict.

## License

Apache-2.0 for code, CC-BY-4.0 for recipe prose. See [`LICENSE`](./LICENSE).
