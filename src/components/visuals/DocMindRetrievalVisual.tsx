"use client";

import { useState } from "react";
import { Database, Search, Cpu, Terminal, Play, RotateCcw, CheckCircle2, Layers } from "lucide-react";

interface PipelineStep {
  id: string;
  number: string;
  title: string;
  sub: string;
  details: string;
  codeOrData: string;
}

const RETRIEVAL_STAGES: PipelineStep[] = [
  {
    id: "query",
    number: "01",
    title: "Inbound Query",
    sub: "Text Normalization",
    details: "Incoming question is sanitized and evaluated against tenant authorization scopes.",
    codeOrData: "Q: 'What is the indemnification clause liability limit under Section 8.2?'",
  },
  {
    id: "embed",
    number: "02",
    title: "Dense Vectorization",
    sub: "768-dim Embeddings",
    details: "Generates normalized dense embedding vector for semantic cosine similarity comparison.",
    codeOrData: "vector_embedding: [0.0418, -0.0921, 0.1284, ... 768 dimensions]",
  },
  {
    id: "cte",
    number: "03",
    title: "Fused SQL CTE",
    sub: "70/30 Hybrid Ranking",
    details:
      "Executes single PostgreSQL CTE combining pgvector cosine distance (70%) with tsvector BM25 match (30%).",
    codeOrData:
      "WITH ranked_docs AS (\n  SELECT id, content,\n    (0.70 * (1 - (embedding <=> $1))) +\n    (0.30 * ts_rank(textsearch, plainto_tsquery($2))) AS fused_score\n  FROM document_chunks WHERE tenant_id = $3\n  ORDER BY fused_score DESC LIMIT 8\n)",
  },
  {
    id: "context",
    number: "04",
    title: "Context Window",
    sub: "Top-8 Deduplication",
    details: "Top-ranked chunks injected into system prompt template with strict boundary guards.",
    codeOrData: "Top match: Section 8.2 MSA Contract (Score: 0.884, Source: chunk_9182)",
  },
  {
    id: "stream",
    number: "05",
    title: "Token Stream",
    sub: "Deterministic SSE",
    details: "Gemini 2.5 Flash yields tokens through an asynchronous generator to the client.",
    codeOrData:
      "\"According to Section 8.2 of the Master Services Agreement, indemnification liability is strictly capped at twelve (12) months of aggregate service fees paid preceding the incident.\"",
  },
];

export function DocMindRetrievalVisual({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const [activeStep, setActiveStep] = useState<number>(2); // Default to Fused SQL CTE
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [streamProgress, setStreamProgress] = useState<number>(100);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStep(0);
    setStreamProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < RETRIEVAL_STAGES.length) {
        setActiveStep(current);
        if (current === 4) {
          setStreamProgress(100);
          clearInterval(interval);
          setIsSimulating(false);
        }
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 800);
  };

  const handleReset = () => {
    setActiveStep(2);
    setStreamProgress(100);
    setIsSimulating(false);
  };

  const currentStage = RETRIEVAL_STAGES[activeStep];

  return (
    <div
      role="region"
      aria-label="DocMind Hybrid Retrieval Pipeline Simulator"
      className="rounded-xl border border-base-border bg-base-card overflow-hidden shadow-sm"
    >
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-accent-light" />
          <span className="font-mono text-xs font-semibold text-zinc-200">
            docmind_hybrid_retrieval.sql // 70/30 FUSED CTE
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span className="text-zinc-400 hidden sm:inline">
            Deterministic Simulation
          </span>
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            type="button"
            className={`flex items-center gap-1 rounded px-2 py-1 transition ${
              isSimulating
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "border border-accent/60 bg-accent text-white hover:bg-accent-light"
            }`}
          >
            <Play className="h-3 w-3" />
            <span>{isSimulating ? "Running..." : "Run Pipeline"}</span>
          </button>
          <button
            onClick={handleReset}
            type="button"
            aria-label="Reset retrieval pipeline"
            className="flex items-center gap-1 rounded border border-base-border bg-base-card px-2 py-1 text-zinc-400 hover:text-zinc-200 transition"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4 font-mono text-xs">
        {/* Step Progression Selector */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {RETRIEVAL_STAGES.map((stage, idx) => {
            const isSelected = idx === activeStep;
            const isPast = idx < activeStep;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStep(idx)}
                type="button"
                className={`flex flex-col text-left p-2.5 rounded-lg border transition-all ${
                  isSelected
                    ? "border-accent bg-accent-dim text-white ring-1 ring-accent/30"
                    : isPast
                    ? "border-base-border bg-base-subtle/60 text-zinc-300"
                    : "border-base-border/50 bg-black/20 text-zinc-500"
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-zinc-400">{stage.number}</span>
                  <span
                    className={`px-1 rounded text-[9px] ${
                      isSelected
                        ? "bg-accent/20 text-accent-light font-semibold"
                        : isPast
                        ? "text-emerald-neon bg-emerald-dim"
                        : "text-zinc-500"
                    }`}
                  >
                    {isSelected ? "ACTIVE" : isPast ? "RESOLVED" : "QUEUED"}
                  </span>
                </div>
                <p className="mt-1 font-semibold text-white truncate text-xs">
                  {stage.title}
                </p>
                <p className="text-[10px] text-zinc-400 truncate">
                  {stage.sub}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail & Code/Data Inspection */}
        <div className="rounded-lg border border-base-border bg-base-subtle/70 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between border-b border-base-border/70 pb-2 text-[11px]">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent-light" />
              <span>
                Stage {currentStage.number}: {currentStage.title} ({currentStage.sub})
              </span>
            </span>
            <span className="text-zinc-400 text-[10px]">
              Select any stage to inspect
            </span>
          </div>

          <p className="font-sans text-xs text-zinc-300 leading-relaxed">
            {currentStage.details}
          </p>

          <div className="rounded border border-base-border bg-black/60 p-2.5 text-[11px] overflow-x-auto">
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
              Payload / Logic Contract:
            </span>
            <pre className="text-zinc-200 whitespace-pre-wrap font-mono leading-relaxed">
              {currentStage.codeOrData}
            </pre>
          </div>
        </div>

        {/* Streamed Output Card */}
        <div className="rounded-lg border border-base-border bg-black/80 p-3 text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[10px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-accent-light" />
              <span>Simulated SSE Response Output</span>
            </span>
            <span className="text-emerald-neon font-medium">Deterministic Sample</span>
          </div>

          <p className="font-sans text-xs text-zinc-200 leading-relaxed">
            &ldquo;According to Section 8.2 of the Master Services Agreement, the indemnification
            liability for either party is strictly capped at twelve (12) months of aggregate service
            fees paid preceding the incident. Specific carve-outs apply solely to gross negligence and
            willful misconduct.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
