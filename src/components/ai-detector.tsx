import { useState } from "react";
import { ScanSearch, RotateCcw, ShieldCheck } from "lucide-react";
import { detectAiSignals, type DetectionResult } from "../lib/ai-detector";

const SAMPLE =
  "I enjoy investigating security alerts, understanding how systems behave, and documenting practical steps that help teams respond with confidence.";

export function AiDetector() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<DetectionResult | null>(null);

  const analyze = () => {
    if (text.trim()) setResult(detectAiSignals(text));
  };

  const reset = () => {
    setText("");
    setResult(null);
  };

  return (
    <section id="ai-detector" className="no-print relative bg-black px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <div
            className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-emerald-400"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> OFFLINE ANALYSIS TOOL
          </div>
          <h2
            className="mt-5 text-4xl leading-[0.95] text-white sm:text-6xl"
            style={{ fontFamily: "Instrument Serif, serif" }}
          >
            check the <span className="italic text-white/55">signal.</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-white/60">
            Paste writing to scan for a few transparent style signals commonly associated with
            AI-assisted text. Nothing leaves your device, and the score is indicative—not a verdict.
          </p>
          <button
            type="button"
            onClick={() => setText(SAMPLE)}
            className="mt-7 text-left text-[11px] tracking-[0.18em] text-white/45 underline decoration-white/20 underline-offset-4 hover:text-white"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            LOAD SAMPLE TEXT
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
          <label
            htmlFor="ai-text"
            className="text-[10px] tracking-[0.3em] text-white/45"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            TEXT TO ANALYZE
          </label>
          <textarea
            id="ai-text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Paste a paragraph here…"
            className="mt-4 min-h-44 w-full resize-y rounded-lg border border-white/10 bg-black p-4 text-sm leading-relaxed text-white outline-none placeholder:text-white/25 focus:border-emerald-400/60"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span
              className="text-[11px] text-white/35"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              {text.trim() ? `${text.trim().split(/\s+/).length} WORDS` : "0 WORDS"}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={reset}
                disabled={!text && !result}
                className="inline-flex items-center gap-2 px-3 py-2 text-[10px] tracking-[0.2em] text-white/45 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> RESET
              </button>
              <button
                type="button"
                onClick={analyze}
                disabled={!text.trim()}
                className="inline-flex items-center gap-2 rounded bg-emerald-400 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-black hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-30"
                style={{ fontFamily: "JetBrains Mono, monospace" }}
              >
                <ScanSearch className="h-3.5 w-3.5" aria-hidden="true" /> ANALYZE
              </button>
            </div>
          </div>

          {result && (
            <div aria-live="polite" className="mt-7 border-t border-white/10 pt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div
                    className="text-[10px] tracking-[0.25em] text-white/40"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    INDICATIVE AI SIGNAL
                  </div>
                  <div className="mt-2 text-2xl text-white">{result.label}</div>
                </div>
                <div className="text-4xl font-bold text-emerald-400">{result.score}%</div>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all"
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {result.signals.map((signal) => (
                  <li key={signal.label} className="border-l border-emerald-400/50 pl-3">
                    <div className="text-xs text-white/80">{signal.label}</div>
                    <div className="mt-1 text-xs leading-relaxed text-white/45">
                      {signal.detail}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
