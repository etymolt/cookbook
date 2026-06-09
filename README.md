# Etymolt Cookbook

> Runnable recipes for verifying names at scale, wiring Etymolt into name generators, interpreting verdict confidence, and building agent loops that consume EVP/1.

[![License: CC-BY-4.0](https://img.shields.io/badge/license-CC--BY--4.0-blue.svg)](./LICENSE)

## How to use this cookbook

Each recipe is a self-contained, runnable example. Notebooks (Python) live in `notebooks/`. TypeScript / Node examples live in `examples/`. Each recipe answers a specific question with the minimum code needed.

Browse by topic:

- **`examples/`** — runnable starters, one per surface (Claude Desktop, Cursor, Next.js, batch CSV, agent loop)
- **`notebooks/`** — Jupyter notebooks for one-shot exploration
- **`articles/`** — long-form pieces on methodology, calibration, and patterns

## The 10 anchor recipes (v1)

1. **Verify a single name** — `examples/verify-single-name/`
2. **Batch-verify a CSV of candidates** — `examples/batch-csv/`
3. **Wire Etymolt into Namelix output** — `examples/namelix-postcheck/`
4. **Build an agent loop that filters generated names** — `examples/agent-loop/`
5. **Render an EVP/1 verdict in a React app** — `examples/react-render/`
6. **Verify in Claude Desktop via MCP** — `examples/claude-desktop-mcp/`
7. **Verify in Cursor via MCP** — `examples/cursor-mcp/`
8. **Verify in Next.js with the official SDK** — `examples/nextjs-app-router/`
9. **Watch a name over time (continuous monitoring)** — `examples/watch-loop/`
10. **Interpret confidence + temporal validity** — `notebooks/interpret-confidence.ipynb`

## What this is NOT

- NOT a docs site (use [etymolt.com/docs](https://etymolt.com/docs)).
- NOT the protocol spec (use [github.com/etymolt/evp-spec](https://github.com/etymolt/evp-spec)).
- NOT the SDK source (use [github.com/etymolt/etymolt-node](https://github.com/etymolt/etymolt-node) when shipped).

A cookbook is a working example you copy-paste and modify. Nothing more, nothing less.

## Contributing recipes

The `registry.yaml` is the index. Every recipe has an entry with title, slug, date, authors, tags, description. See [CONTRIBUTING.md](./CONTRIBUTING.md) and [AGENTS.md](./AGENTS.md) for the voice and structure conventions.

To propose a new recipe, open an issue describing the use case it covers, then open a PR with the recipe + an entry in `registry.yaml`.

## License

[CC-BY-4.0](./LICENSE) for the recipes and articles. The "Etymolt" name and logo are trademarks of Etymolt Inc. and are not licensed under CC-BY-4.0.

## Contact

`hello@etymolt.com`

## Naming, attested.
