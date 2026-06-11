# Verify a single name

The shortest possible path from a candidate name to a signed EVP/1 verdict.
No SDK. No build step. One `fetch` call.

## What you'll need

- Node 18+ (or any runtime with global `fetch`)
- Nothing else. The free tier requires no API key.

## Run it

```bash
node verify.mjs Inkstack
```

You'll get a JSON verdict back. The interesting fields:

- `verdict` — one of `PROCEED`, `PROCEED_STRATEGIC`, `ABANDON` (3-value canonical 2026-06-10).
- `status` — one of `complete`, `partial` (`partial` indicates engine-uncertain; verdict is best estimate).
- `reason` — one of `clean`, `famous_mark`, `high_collision`, `no_distinctiveness`, `descriptive`, `insufficient_corpus`.
- `verdict_legacy` — OPTIONAL back-compat with the pre-cutover 5-state engine vocabulary.
- `score` — 0-100 composite. Not a substitute for the verdict.
- `disclaimer` — render this verbatim per [EVP/1 §5](https://github.com/etymolt/evp-spec).
- `signature` — Ed25519 signature over the canonicalized payload.
- `valid_until` — drop the result after this timestamp.

## Files

- [`verify.mjs`](./verify.mjs) — the 18-line script.

## What this recipe doesn't do

- Verify the signature locally. For signature verification, see [`examples/react-render`](../react-render/README.md), which uses `tweetnacl` to verify the detached signature against the canonicalized payload.
- Handle rate limiting. For batch use, see [`examples/batch-csv`](../batch-csv/README.md).
