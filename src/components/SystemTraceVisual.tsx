"use client";

import { useState } from "react";
import {
  Activity,
  ShieldCheck,
  Layers,
  Database,
  Cpu,
  Radio,
  ChevronRight,
  Info,
  CheckCircle2,
} from "lucide-react";

interface PipelineStage {
  id: string;
  stepNumber: string;
  name: string;
  subsystem: string;
  icon: typeof Activity;
  latencyBudget: string;
  description: string;
  dataIn: string;
  dataOut: string;
  resilienceMechanism: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "ingress",
    stepNumber: "01",
    name: "Inbound Ingestion",
    subsystem: "FastAPI / Nginx Ingress",
    icon: Activity,
    latencyBudget: "< 1.0ms",
    description:
      "Accepts multi-tenant document upload payloads. Validates MIME type and structural boundaries, returning HTTP 202 Accepted immediately to prevent client-side worker timeouts.",
    dataIn: "POST /v1/ingest/stream (Multipart PDF payload)",
    dataOut: "HTTP 202 Accepted { task_id, status: 'enqueued' }",
    resilienceMechanism: "Async acknowledgment prevents client connection timeouts on large uploads.",
  },
  {
    id: "auth",
    stepNumber: "02",
    name: "JWT & Rate Guard",
    subsystem: "Auth Middleware & Token Bucket",
    icon: ShieldCheck,
    latencyBudget: "1.2ms",
    description:
      "Validates RS256 JWT claims and tenant isolation. Evaluates per-tenant token-bucket quota to prevent noisy-neighbor database thrashing.",
    dataIn: "Bearer Authorization header + Tenant Context",
    dataOut: "Claims verified, token bucket consumed (-1 unit)",
    resilienceMechanism: "4,000 req/min token bucket with burst absorption protects database pools.",
  },
  {
    id: "queue",
    stepNumber: "03",
    name: "Async Task Worker",
    subsystem: "Decoupled Job Queue",
    icon: Layers,
    latencyBudget: "3.5ms (enqueue)",
    description:
      "Dispatches document chunking (500 tokens, 10% overlap) and batch vectorization to background worker threads, freeing synchronous API threads.",
    dataIn: "Raw document buffer & metadata",
    dataOut: "Normalized chunks (batch size: 20 chunks/call)",
    resilienceMechanism: "Decouples resource-heavy PDF parsing from client request-response cycle.",
  },
  {
    id: "hybrid",
    stepNumber: "04",
    name: "70/30 Hybrid Retrieval",
    subsystem: "PostgreSQL (pgvector + tsvector)",
    icon: Database,
    latencyBudget: "24.5ms",
    description:
      "Executes a single Common Table Expression (CTE) query fusing 70% dense cosine similarity (pgvector) with 30% sparse BM25 lexical ranking (tsvector).",
    dataIn: "Query embedding [768 dimensions] + Query text tokens",
    dataOut: "Top-8 candidate chunks with fused reciprocal rank scores",
    resilienceMechanism: "Captures both conceptual semantics and exact alphanumeric contract IDs without Elasticsearch.",
  },
  {
    id: "inference",
    stepNumber: "05",
    name: "Model Reasoning",
    subsystem: "Gemini 2.5 Flash / LangGraph",
    icon: Cpu,
    latencyBudget: "88.0ms (TTFT)",
    description:
      "Injects top-8 retrieved passages into an audited prompt harness. Employs async generators to stream tokens with time-to-first-token optimization.",
    dataIn: "Fused Top-8 Context + System Prompt + User Query",
    dataOut: "Asynchronous token stream generator",
    resilienceMechanism: "Schema-constrained generation; fallback cache on upstream timeout.",
  },
  {
    id: "egress",
    stepNumber: "06",
    name: "SSE Token Pipe",
    subsystem: "Server-Sent Events (HTTP/2)",
    icon: Radio,
    latencyBudget: "112ms total RTT",
    description:
      "Transmits incremental tokens over an active HTTP/2 SSE channel to the client interface with auto-reconnection and low framing overhead.",
    dataIn: "Chunked string buffer chunks from LLM generator",
    dataOut: "data: { token, finish_reason } (Content-Type: text/event-stream)",
    resilienceMechanism: "Unidirectional SSE survives transient network blips with Last-Event-ID.",
  },
];

export function SystemTraceVisual() {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(3); // Default to 70/30 Hybrid Retrieval

  const currentStage = PIPELINE_STAGES[selectedStageIndex];
  const Icon = currentStage.icon;

  const handleNextStage = () => {
    setSelectedStageIndex((prev) => (prev + 1) % PIPELINE_STAGES.length);
  };

  const handlePrevStage = () => {
    setSelectedStageIndex((prev) => (prev - 1 + PIPELINE_STAGES.length) % PIPELINE_STAGES.length);
  };

  return (
    <div
      role="region"
      aria-label="Interactive Architecture Pipeline"
      className="relative flex flex-col rounded-xl border border-base-border bg-base-card shadow-lg"
    >
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/70 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-accent-light" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
            System Pipeline Architecture
          </span>
        </div>
        <span className="font-mono text-[11px] text-zinc-400">
          Stage {currentStage.stepNumber} of 06
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Helper Note */}
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-mono text-[11px]">
            Select a stage below to inspect its dataflow and failure guard:
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handlePrevStage}
              type="button"
              aria-label="Previous pipeline stage"
              className="rounded border border-base-border bg-base-subtle px-2 py-0.5 font-mono text-[10px] text-zinc-300 hover:border-accent hover:text-accent-light transition"
            >
              Prev
            </button>
            <button
              onClick={handleNextStage}
              type="button"
              aria-label="Next pipeline stage"
              className="rounded border border-base-border bg-base-subtle px-2 py-0.5 font-mono text-[10px] text-zinc-300 hover:border-accent hover:text-accent-light transition"
            >
              Next
            </button>
          </div>
        </div>

        {/* Pipeline Stage Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PIPELINE_STAGES.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isSelected = idx === selectedStageIndex;

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageIndex(idx)}
                type="button"
                aria-pressed={isSelected}
                className={`flex flex-col items-start rounded-lg border p-2.5 text-left transition-all ${
                  isSelected
                    ? "border-accent bg-accent-dim text-white ring-1 ring-accent/30"
                    : "border-base-border bg-base-subtle/50 text-zinc-300 hover:border-zinc-500 hover:bg-base-subtle"
                }`}
              >
                <div className="flex w-full items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">{stage.stepNumber}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                      isSelected
                        ? "bg-accent/20 text-accent-light font-semibold"
                        : "text-zinc-500 bg-black/20"
                    }`}
                  >
                    {stage.latencyBudget}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 w-full">
                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                      isSelected ? "bg-accent text-white" : "bg-black/30 text-zinc-400"
                    }`}
                  >
                    <StageIcon className="h-3 w-3" />
                  </div>
                  <span className="truncate font-mono text-xs font-medium">
                    {stage.name}
                  </span>
                </div>

                <p className="mt-1 w-full truncate font-mono text-[10px] text-zinc-400">
                  {stage.subsystem}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Inspector Panel */}
        <div className="rounded-lg border border-base-border bg-base-subtle/80 p-4 font-mono text-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-border/70 pb-2.5">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-accent-light shrink-0" />
              <div>
                <span className="font-bold text-white text-sm">
                  {currentStage.name}
                </span>
                <span className="text-zinc-400 text-[11px] ml-2">
                  ({currentStage.subsystem})
                </span>
              </div>
            </div>
            <span className="rounded bg-accent-dim px-2 py-0.5 text-[10px] text-accent-light font-semibold">
              Latency Budget: {currentStage.latencyBudget}
            </span>
          </div>

          <p className="font-sans text-xs leading-relaxed text-zinc-300">
            {currentStage.description}
          </p>

          <div className="grid gap-2 sm:grid-cols-2 pt-1 text-[11px]">
            <div className="rounded border border-base-border/80 bg-black/40 p-2.5">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                Data Input
              </span>
              <span className="text-zinc-200 block truncate">
                {currentStage.dataIn}
              </span>
            </div>

            <div className="rounded border border-base-border/80 bg-black/40 p-2.5">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                Data Output
              </span>
              <span className="text-zinc-200 block truncate">
                {currentStage.dataOut}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1 border-t border-base-border/50 text-[11px]">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-neon shrink-0 mt-0.5" />
            <div className="text-zinc-300 leading-snug">
              <span className="font-semibold text-zinc-200">Resilience Guard: </span>
              <span>{currentStage.resilienceMechanism}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Screen-reader live region */}
      <div className="sr-only" aria-live="polite">
        Selected stage {currentStage.stepNumber}: {currentStage.name}. {currentStage.description}
      </div>
    </div>
  );
}
