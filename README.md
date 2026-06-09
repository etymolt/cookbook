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
