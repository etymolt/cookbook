# Wrap a name generator's output with Etymolt

AI name generators (Namelix, Brandsnap, Looka, Squadhelp, ChatGPT) produce
candidate names by the dozen. Most of them never check whether the name is
actually usable — collides with a USPTO mark, has a taken domain, carries
cultural risk in a market you serve.

This recipe is the post-check: feed any generator's output through Etymolt,
drop the failures, surface the verdict alongside the survivors.

## The pattern

```
candidates  →  /v1/verify  →  {PROCEED, ITERATE, DECIDE}  →  show to user
                          ↓
                       ABANDON  →  drop silently
```

## Run it

```bash
# Reads a JSON array of candidate names from stdin.
echo '["Inkstack", "Sigil", "Stratagem", "Aiyana"]' | node postcheck.mjs
```

Output (one row per name):

```
✓ PROCEED   Inkstack    score=82
✗ ABANDON   Sigil       score=12   trademark=BLOCKED
~ ITERATE   Stratagem   score=60   trademark=CAUTION
? INSUFFICIENT_SIGNAL  Aiyana    score=null  cultural=INSUFFICIENT_SIGNAL
```

## Files

- [`postcheck.mjs`](./postcheck.mjs) — the post-check script.
- [`namelix-glue.mjs`](./namelix-glue.mjs) — example glue that scrapes Namelix output (Puppeteer) and pipes into postcheck.

## Why this matters

A name generator without a clearance layer is a confident hallucination
machine — it will happily suggest names that resolve to active USPTO
trademarks or taken `.com` domains. The fact-check layer is the difference
between "100 names" and "100 usable names".

See the [LLM hallucination benchmark](https://github.com/etymolt/llm-hallucination-benchmark) for the underlying data.
