"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Activity, ShieldCheck, Layers, Cpu, Database, Radio } from "lucide-react";

interface TraceNode {
  id: string;
  label: string;
  sub: string;
  icon: typeof Activity;
  latency: string;
  status: string;
}

const TRACE_NODES: TraceNode[] = [
  { id: "client", label: "Inbound Request", sub: "POST /v1/ingest/stream", icon: Activity, latency: "0.2ms", status: "202 ACCEPTED" },
  { id: "auth", label: "JWT & Rate Guard", sub: "Token Bucket (4k req/m)", icon: ShieldCheck, latency: "1.4ms", status: "PASS" },
  { id: "queue", label: "Async Task Queue", sub: "Decoupled Event Queue", icon: Layers, latency: "3.1ms", status: "ENQUEUED" },
  { id: "hybrid", label: "Hybrid CTE Search", sub: "pgvector 70% + tsvector 30%", icon: Database, latency: "24.8ms", status: "TOP_K=8" },
  { id: "engine", label: "Model Reasoning", sub: "Gemini 2.5 Flash / LangGraph", icon: Cpu, latency: "89.2ms", status: "STREAMING" },
  { id: "stream", label: "SSE Token Pipe", sub: "HTTP/2 Chunked Stream", icon: Radio, latency: "128ms", status: "200 OK" },
];

const LOG_MESSAGES = [
  "[00:00.002] INGRESS: Client connected from edge region ap-south-1",
  "[00:00.005] AUTH: Bearer JWT verified · tenant_id=org_prod_89 · scope=write",
  "[00:00.009] RATE_LIMIT: Token bucket status 3842/4000 · window=60s OK",
  "[00:00.014] DISPATCH: Worker allocated task_id=tk_7f82c · concurrency=32",
  "[00:00.038] DB: Executing fused CTE query · cosine_sim(70%) + bm25_lex(30%)",
  "[00:00.063] DB_RESULT: 8 relevant chunks retrieved in 24.8ms · threshold=0.82",
  "[00:00.098] INFERENCE: Streaming tokens initialized via async generator",
  "[00:00.184] EGRESS: Stream completed · 428 tokens transmitted · RTT: 184ms",
];

export function SystemTraceVisual() {
  const [activeNode, setActiveNode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState<string[]>(LOG_MESSAGES.slice(0, 3));

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => {
        const next = (prev + 1) % TRACE_NODES.length;
        const logIndex = Math.min(next + 2, LOG_MESSAGES.length);
        setVisibleLogs(LOG_MESSAGES.slice(0, logIndex));
        return next;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setActiveNode(0);
    setVisibleLogs(LOG_MESSAGES.slice(0, 2));
  };

  return (
    <div
      role="region"
      aria-label="Interactive System Architecture Trace"
      className="relative flex flex-col rounded-xl border border-base-border bg-base-card/90 shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-neon/80 inline-block" />
          </div>
          <span className="ml-2 font-mono text-[11px] text-zinc-400">
            system_trace_v2.telemetry // LIVE PIPELINE
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-zinc-400">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            type="button"
            aria-label={isPlaying ? "Pause trace animation" : "Play trace animation"}
            className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/5 hover:text-cyan-neon transition"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button
            onClick={handleReset}
            type="button"
            aria-label="Reset trace animation"
            className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/5 hover:text-cyan-neon transition"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Main Architecture Flow Grid */}
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            Trace Nodes &middot; Round-Trip Latency: 184ms
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-dim px-2 py-0.5 font-mono text-[10px] text-emerald-neon">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-neon animate-pulse" />
            SYSTEM STABLE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {TRACE_NODES.map((node, index) => {
            const Icon = node.icon;
            const isActive = index === activeNode;
            const isCompleted = index < activeNode;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(index)}
                type="button"
                className={`relative flex flex-col items-start rounded-lg border p-3 text-left transition-all ${
                  isActive
                    ? "border-cyan-neon bg-cyan-dim/40 shadow-[0_0_20px_rgba(0,240,255,0.18)]"
                    : isCompleted
                    ? "border-base-border bg-base-subtle/50 text-zinc-200"
                    : "border-base-border/60 bg-base-subtle/20 text-zinc-400"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded ${
                      isActive
                        ? "bg-cyan-neon/20 text-cyan-neon"
                        : isCompleted
                        ? "bg-emerald-dim text-emerald-neon"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span
                    className={`font-mono text-[10px] ${
                      isActive ? "text-cyan-neon font-semibold" : "text-zinc-400"
                    }`}
                  >
                    {node.latency}
                  </span>
                </div>

                <div className="mt-2 w-full">
                  <p
                    className={`font-mono text-xs font-medium ${
                      isActive ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {node.label}
                  </p>
                  <p className="truncate font-mono text-[10px] text-zinc-300">
                    {node.sub}
                  </p>
                </div>

                <div className="mt-2 flex w-full items-center justify-between border-t border-white/5 pt-1.5">
                  <span className="font-mono text-[9px] text-zinc-400">
                    STEP 0{index + 1}
                  </span>
                  <span
                    className={`font-mono text-[9px] px-1 rounded ${
                      isActive
                        ? "bg-cyan-neon/30 text-cyan-200 font-medium"
                        : isCompleted
                        ? "bg-emerald-neon/15 text-emerald-300"
                        : "text-zinc-400"
                    }`}
                  >
                    {isActive ? "ACTIVE" : isCompleted ? "OK" : "QUEUED"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live Scrolling Log Lines Panel */}
        <div className="mt-4 rounded-lg border border-base-border bg-black/60 p-3 font-mono text-[11px] leading-relaxed">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-base-border/70 text-[10px] text-zinc-500 uppercase tracking-wider">
            <span>Live Kernel Telemetry</span>
            <span className="text-cyan-neon">PID 41920 // ASYNC STREAM</span>
          </div>

          <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
            {visibleLogs.map((log, i) => (
              <div
                key={i}
                className={`truncate ${
                  i === visibleLogs.length - 1
                    ? "text-cyan-neon font-medium animate-pulse"
                    : "text-zinc-400"
                }`}
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Screen-reader accessible summary */}
      <div className="sr-only" aria-live="polite">
        Current system pipeline step: {TRACE_NODES[activeNode].label} - Status: {TRACE_NODES[activeNode].status} with latency {TRACE_NODES[activeNode].latency}.
      </div>
    </div>
  );
}
