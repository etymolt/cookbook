# Watch a name for verdict drift

Sometimes a name passes today and fails tomorrow — a new USPTO filing, a
newly registered domain, a cultural-signal change. The watch loop re-runs
the verdict on a schedule and notifies you when the answer changes.

## Use it for

- A name you've already filed against and want to monitor for new collisions.
- A shortlist during a launch window when you want to know about drift before launch day.
- A test harness for the API's stability.

## Run it

```bash
node watch.mjs Inkstack --interval 24h --webhook https://your.app/etymolt-drift
```

## Files

- [`watch.mjs`](./watch.mjs) — the loop, ~50 lines.

## What "drift" means

The watch compares the current `verdict` field to the last seen one. If
either:

1. The composite verdict label changes (e.g. PROCEED → ITERATE), or
2. Any per-axis status worsens (CLEAR → CAUTION → BLOCKED),

…the webhook fires with the before/after delta.

## Production note

The watch loop is the right shape for a personal-use script. For
production-grade name monitoring (multiple names, durable queue, SLA), the
[Watch endpoint](https://etymolt.com/docs/watch) handles this for you.
