# An agent loop that filters generated names

A Claude (or GPT) agent loop that generates candidate names, verifies each
through Etymolt, and returns only the survivors. This is the pattern most
naming agents will adopt.

## The flow

```
prompt  →  LLM generates 20 candidates  →  Etymolt verifies each
                                       ↓
                                  drop ABANDON
                                       ↓
                          rank survivors by score
                                       ↓
                              return top N
```

## Why a loop and not a single call

LLMs hallucinate names. Etymolt fact-checks them. One pass isn't always
enough — if too few candidates survive, the loop asks the model for more.

## Run it

```bash
export ANTHROPIC_API_KEY=sk-ant-...
node agent.mjs "fintech for freelancers, 1-2 syllables, evocative"
```

## Files

- [`agent.mjs`](./agent.mjs) — the loop, ~60 lines.

## The pattern, in code

```js
let survivors = [];
let attempts = 0;
while (survivors.length < 5 && attempts < 3) {
  const candidates = await generateNames(brief, 20);
  const verdicts = await Promise.all(candidates.map(verifyEtymolt));
  survivors.push(...verdicts.filter((v) => v.verdict !== "ABANDON"));
  attempts++;
}
return survivors.sort((a, b) => b.score - a.score).slice(0, 5);
```

Render the disclaimer verbatim on whatever surface you show the result on,
per [EVP/1 §5](https://github.com/etymolt/evp-spec).
