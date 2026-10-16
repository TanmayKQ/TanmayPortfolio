"use client";

import { useState, useEffect } from "react";
import { Database, Search, Cpu, Terminal, Play, Pause, RefreshCw, Zap, Layers } from "lucide-react";

const RETRIEVAL_STEPS = [
  { id: "query", title: "User Query", detail: "Query: 'What is the indemnification clause limit under Section 8?'", icon: Search },
  { id: "embed", title: "Dense Embedder", detail: "text-embedding-004 · 768-dim vector generated in 18ms", icon: Cpu },
  { id: "branch", title: "Dual Branch Execution", detail: "pgvector Cosine (Dense 70%) || tsvector BM25 (Sparse 30%)", icon: Layers },
  { id: "cte", title: "PostgreSQL CTE Merge", detail: "Fused reciprocal rank in single SQL query: score = (0.7*cos) + (0.3*lex)", icon: Database },
  { id: "stream", title: "Gemini 2.5 Flash SSE", detail: "Streaming 428 tokens over Server-Sent Events async generator", icon: Zap },
];

const STREAMING_SNIPPET = [
  "According to Section 8.2 of the Master Services Agreement,",
  " the indemnification liability for either party is strictly capped",
  " at twelve (12) months of aggregate service fees paid preceding the incident.",
  " Specific carve-outs apply solely to gross negligence and willful misconduct.",
];

export function DocMindRetrievalVisual() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [streamedText, setStreamedText] = useState("");
  const [tokenCount, setTokenCount] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % RETRIEVAL_STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    if (activeStep === 4) {
      setStreamedText("");
      setTokenCount(0);
      let chunkIdx = 0;
      const streamTimer = setInterval(() => {
        if (chunkIdx < STREAMING_SNIPPET.length) {
          setStreamedText((prev) => prev + STREAMING_SNIPPET[chunkIdx]);
          setTokenCount((prev) => prev + 18);
          chunkIdx++;
        } else {
          clearInterval(streamTimer);
        }
      }, 260);
      return () => clearInterval(streamTimer);
    }
  }, [activeStep]);

  return (
    <div className="rounded-xl border border-base-border bg-base-card overflow-hidden shadow-xl">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-neon" />
          <span className="font-mono text-xs font-semibold text-zinc-200">
            docmind_hybrid_engine // 70-30 CTE RETRIEVAL
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            type="button"
            aria-label={isPlaying ? "Pause visual" : "Play visual"}
            className="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-cyan-neon transition"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => {
              setActiveStep(0);
              setStreamedText("");
            }}
            type="button"
            aria-label="Restart flow"
            className="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-cyan-neon transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Step Progression Badges */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {RETRIEVAL_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                type="button"
                className={`flex flex-col text-left p-2.5 rounded-lg border transition-all ${
                  isCurrent
                    ? "border-cyan-neon bg-cyan-dim/40 shadow-[0_0_15px_rgba(0,240,255,0.18)]"
                    : isCompleted
                    ? "border-base-border bg-base-subtle/60 text-zinc-300"
                    : "border-base-border/50 bg-black/20 text-zinc-500 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span>0{idx + 1}</span>
                  <span className={isCurrent ? "text-cyan-neon font-bold" : "text-zinc-500"}>
                    {isCurrent ? "ACTIVE" : isCompleted ? "PASS" : "WAIT"}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs font-semibold text-white truncate">
                  {step.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Panel */}
        <div className="rounded-lg border border-base-border bg-base-subtle/60 p-3 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest pb-1.5 border-b border-base-border">
            <span>Stage Inspector</span>
            <span className="text-cyan-neon">Latency: 28.4ms</span>
          </div>
          <p className="mt-2 text-zinc-300">
            {RETRIEVAL_STEPS[activeStep].detail}
          </p>
        </div>

        {/* Code / Stream Output Preview */}
        <div className="rounded-lg border border-base-border bg-black/70 p-3 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-cyan-neon" />
              <span>REACT SSE TYPING INTERFACE (ZERO-BACKEND MOCK)</span>
            </span>
            <span className="text-emerald-neon">{tokenCount} tokens streamed</span>
          </div>

          <div className="min-h-[56px] text-zinc-300 leading-relaxed">
            {activeStep === 4 ? (
              <span>
                {streamedText}
                <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-neon animate-pulse align-middle" />
              </span>
            ) : (
              <span className="text-zinc-500 italic">
                Awaiting stage 05: Token stream initializes once PostgreSQL CTE merge resolves candidate chunks...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
