// Drop-in EVP/1 verdict component. Tailwind classes; replace with your tokens.
//
// Renders answer-first headline, per-axis breakdown, and the required
// disclaimer verbatim. Handles stale verdicts with a banner.

import { useMemo } from "react";

const HEADLINE = {
  // 3-value canonical verdict labels (2026-06-10). The engine's
  // pre-cutover 5-state labels (DUE_DILIGENCE/ITERATE/INSUFFICIENT_SIGNAL)
  // are preserved on `verdict_legacy` for back-compat; consumers built
  // before the cutover may read either field.
  PROCEED: { verb: "Yes", tone: "good" },
  PROCEED_STRATEGIC: { verb: "Workable", tone: "warn" },
  ABANDON: { verb: "Don't use", tone: "bad" },
  // Status:partial signals engine-uncertain — the verdict is the best
  // estimate and the consumer should treat it as advisory.
};

const AXIS_LABEL = {
  trademark: "Trademark",
  domain: "Domain",
  cultural: "Cultural signal",
  sound: "Sound",
  pronunciation: "Pronunciation",
};

const STATUS_LINE = (axis, status) => {
  if (status === "CLEAR") return `${AXIS_LABEL[axis]}: clear.`;
  if (status === "CAUTION") return `${AXIS_LABEL[axis]}: worth a closer look.`;
  if (status === "BLOCKED") return `${AXIS_LABEL[axis]}: blocked. Pick another name.`;
  if (status === "INSUFFICIENT_SIGNAL") return `${AXIS_LABEL[axis]}: not enough signal.`;
  return `${AXIS_LABEL[axis]}: ${status}.`;
};

export function Verdict({ verdict }) {
  const stale = useMemo(() => {
    if (!verdict?.valid_until) return false;
    return new Date() > new Date(verdict.valid_until);
  }, [verdict]);

  if (!verdict) return null;
  const head = HEADLINE[verdict.verdict] ?? { verb: verdict.verdict, tone: "muted" };

  return (
    <div className="rounded-xl border border-neutral-200 p-6 max-w-xl">
      {stale && (
        <div className="mb-4 rounded bg-amber-50 border border-amber-200 px-3 py-2 text-sm text-amber-900">
          This verdict is past its validity window. Re-run before relying on it.
        </div>
      )}

      <div className="text-sm text-neutral-500">{verdict.name}</div>
      <div className={`text-2xl font-semibold mt-1 ${tone(head.tone)}`}>
        {head.verb}
      </div>

      <div className="mt-4 space-y-1 text-sm text-neutral-700">
        {verdict.axes && Object.entries(verdict.axes).map(([axis, a]) => (
          <div key={axis}>{STATUS_LINE(axis, a.status)}</div>
        ))}
      </div>

      <div className="mt-4 text-xs text-neutral-500 leading-relaxed">
        {verdict.disclaimer}
      </div>

      <div className="mt-3 flex items-center gap-3 text-[10px] text-neutral-400">
        <span>id: {verdict.verdict_id?.slice(0, 12)}…</span>
        <span>key: {verdict.signature_key_id}</span>
        {verdict.permalink && (
          <a href={verdict.permalink} className="underline">permalink</a>
        )}
      </div>
    </div>
  );
}

function tone(t) {
  if (t === "good") return "text-emerald-700";
  if (t === "warn") return "text-amber-700";
  if (t === "bad") return "text-rose-700";
  return "text-neutral-700";
}
