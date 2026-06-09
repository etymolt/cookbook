# Render an EVP/1 verdict in a React app

A drop-in React component that takes an EVP/1 verdict and renders it the
way Etymolt's own surface does — answer-first, per-axis breakdown, the
required disclaimer rendered verbatim.

## The component

[`Verdict.jsx`](./Verdict.jsx) is the whole component. Copy it.

```jsx
import { Verdict } from "./Verdict";

<Verdict verdict={verdictFromApi} />
```

## What the component handles for you

- **Answer-first headline.** "Yes / Fix these / Workable / Don't use / Not enough signal" — never a bare score.
- **Per-axis breakdown.** One human-readable line per axis (trademark, domain, cultural, sound, pronunciation).
- **Disclaimer rendered verbatim** per [EVP/1 §5](https://github.com/etymolt/evp-spec).
- **Temporal validity check.** If the verdict is past its `valid_until`, the component renders a stale-state banner instead.
- **Signature display.** The `verdict_id` and signing key id are shown so the result is auditable.

## What this recipe doesn't do

- **Verify the signature** in the browser. If you need that, see [`verify-signature.mjs`](./verify-signature.mjs) for the server-side pattern using `tweetnacl`.

## Files

- [`Verdict.jsx`](./Verdict.jsx) — the component (~120 lines).
- [`verify-signature.mjs`](./verify-signature.mjs) — Ed25519 verification helper.
