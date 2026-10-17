"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Terminal,
  GitCommit,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

interface ScriptFrame {
  id: number;
  stepNumber: string;
  activeNode: "PLANNER" | "TOOL_CALL" | "EVALUATOR" | "RECOVERY" | "DONE";
  phaseTitle: string;
  terminalLines: string[];
  explanation: string;
  isApprovalStage?: boolean;
}

const REPLAY_FRAMES: ScriptFrame[] = [
  {
    id: 0,
    stepNumber: "01",
    activeNode: "PLANNER",
    phaseTitle: "Task Analysis & Decomposition",
    terminalLines: [
      "$ devagent task 'fix pool exhaustion under burst concurrency'",
      ">> [IPC:Node->Python] Stdin JSONL payload dispatched",
      ">> [LangGraph:PlannerNode] Analyzing repo AST and call graph...",
      ">> Plan generated: 1. Add connection timeout guard  2. Drain idle sockets  3. Run suite",
    ],
    explanation:
      "Python LangGraph analyzes the codebase call graph and produces a structured multi-step execution plan over JSONL IPC.",
  },
  {
    id: 1,
    stepNumber: "02",
    activeNode: "TOOL_CALL",
    phaseTitle: "Two-Phase Diff & Human Approval Gate",
    terminalLines: [
      ">> [LangGraph:ToolCallNode] Generating two-phase unified diff:",
      "--- a/src/db/pool.ts",
      "+++ b/src/db/pool.ts",
      "@@ -42,3 +42,7 @@ async function acquire() {",
      "+  const timeout = setTimeout(() => { throw new TimeoutError(); }, 2500);",
      "+  try { return await pool.connect(); } finally { clearTimeout(timeout); }",
      ">> Human Approval Gate [y/N]: y (Authorized by user)",
    ],
    explanation:
      "File modifications are rendered as unified diffs in memory. No disk mutation occurs until explicit human authorization.",
    isApprovalStage: true,
  },
  {
    id: 2,
    stepNumber: "03",
    activeNode: "EVALUATOR",
    phaseTitle: "Shell-less Subprocess Test Evaluation",
    terminalLines: [
      ">> [Node:Harness] Shell-less subprocess invoked: npm test -- --runInBand",
      ">> RUNS test/concurrency.test.ts",
      "   FAIL: BurstRequestTest > SocketTimeout not caught in nested transaction",
      ">> [LangGraph:EvaluatorNode] Exit code 1 detected. Initiating recovery loop...",
    ],
    explanation:
      "Execution harness invokes tests with explicit argument arrays (mitigating shell injection) and routes test failures to the recovery node.",
  },
  {
    id: 3,
    stepNumber: "04",
    activeNode: "RECOVERY",
    phaseTitle: "Autonomous Recovery & Patch Iteration",
    terminalLines: [
      ">> [LangGraph:RecoveryNode] Parsing error stack trace & AST diff...",
      ">> Root cause: Transaction wrapper suppresses custom TimeoutError.",
      ">> Patching transaction cleanup handler in src/db/pool.ts...",
      ">> [Node:Harness] Re-invoking deterministic test suite...",
    ],
    explanation:
      "Recovery node diagnoses the nested transaction failure and safely updates the diff without resetting global state.",
  },
  {
    id: 4,
    stepNumber: "05",
    activeNode: "DONE",
    phaseTitle: "Deterministic Benchmark Verification",
    terminalLines: [
      ">> RUNS test/concurrency.test.ts",
      "   PASS: BurstRequestTest (140ms)",
      ">> Deterministic Benchmark: 17/17 automated test suites PASSED",
      ">> Session completed with zero LLM API leaks. Exit code 0.",
    ],
    explanation:
      "All 17 mock-injected CI benchmark suites pass, verifying end-to-end task completion deterministically.",
  },
];

const LANGGRAPH_NODES = [
  { id: "PLANNER", label: "01 Planner" },
  { id: "TOOL_CALL", label: "02 Two-Phase Diff" },
  { id: "EVALUATOR", label: "03 Evaluator" },
  { id: "RECOVERY", label: "04 Recovery Loop" },
  { id: "DONE", label: "05 Validated End" },
];

export function DevAgentTerminalVisual() {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1); // Default to frame 2 (Diff & Approval gate)
  const [isPlaying, setIsPlaying] = useState(false); // Paused by default

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentFrameIndex((prev) => {
        if (prev < REPLAY_FRAMES.length - 1) {
          return prev + 1;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, 2400);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const frame = REPLAY_FRAMES[currentFrameIndex];

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentFrameIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentFrameIndex((prev) => Math.min(REPLAY_FRAMES.length - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
  };

  return (
    <div
      role="region"
      aria-label="DevAgent Replay Interface"
      className="rounded-xl border border-base-border bg-base-card overflow-hidden shadow-sm font-mono text-xs"
    >
      {/* Top Header & Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5 gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-accent-light" />
          <span className="font-semibold text-zinc-200">
            devagent_replay
          </span>
          <span className="rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-300 font-semibold">
            ILLUSTRATIVE REPLAY
          </span>
        </div>

        {/* Playback Controls & Frame Badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-400">
            Step {frame.stepNumber} of 05
          </span>

          <button
            onClick={handlePrev}
            disabled={currentFrameIndex === 0}
            type="button"
            aria-label="Previous step"
            className="rounded p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            type="button"
            aria-label={isPlaying ? "Pause replay" : "Play replay"}
            className="rounded p-1.5 text-zinc-300 hover:text-white transition"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={handleNext}
            disabled={currentFrameIndex === REPLAY_FRAMES.length - 1}
            type="button"
            aria-label="Next step"
            className="rounded p-1.5 text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={handleReset}
            type="button"
            aria-label="Reset replay to step 1"
            className="rounded p-1.5 text-zinc-400 hover:text-white transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 p-3 sm:p-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Terminal Screen Column */}
        <div className="flex flex-col rounded-lg border border-base-border bg-black/90 p-3.5 sm:p-4 shadow-inner">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-[10px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-neon" />
              <span>IPC BUFFER: STDIN / STDOUT</span>
            </span>
            <span className="text-accent-light font-medium truncate max-w-[150px] sm:max-w-none">{frame.phaseTitle}</span>
          </div>

          <div className="min-h-[140px] sm:min-h-[160px] space-y-1.5 overflow-x-auto touch-scroll text-[11px] leading-relaxed break-words">
            {frame.terminalLines.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith("+")
                    ? "text-emerald-400 bg-emerald-950/20 px-1 rounded"
                    : line.startsWith("-")
                    ? "text-rose-400 bg-rose-950/20 px-1 rounded"
                    : line.includes("FAIL")
                    ? "text-rose-400 font-semibold"
                    : line.includes("PASS")
                    ? "text-emerald-neon font-semibold"
                    : line.startsWith("$")
                    ? "text-white font-semibold"
                    : line.includes("Human Approval")
                    ? "text-accent-light font-bold bg-accent-dim px-1 rounded"
                    : "text-zinc-300"
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Interactive Range Slider */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1.5">
              <span>Interactive Step Track</span>
              <span>Step {frame.stepNumber} of 05</span>
            </div>
            <input
              type="range"
              aria-label="Replay step timeline"
              min="0"
              max={REPLAY_FRAMES.length - 1}
              value={currentFrameIndex}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentFrameIndex(Number(e.target.value));
              }}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-zinc-800 rounded"
            />
          </div>
        </div>

        {/* Synchronized State Graph & Rationale Column */}
        <div className="flex flex-col justify-between rounded-lg border border-base-border bg-base-subtle/50 p-3.5">
          <div>
            <div className="flex items-center justify-between border-b border-base-border pb-2 text-[10px] uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1">
                <GitCommit className="h-3.5 w-3.5 text-accent-light" />
                <span>LangGraph State Graph</span>
              </span>
              <span className="text-emerald-neon">SYNCHRONIZED</span>
            </div>

            <div className="mt-3 space-y-2">
              {LANGGRAPH_NODES.map((node) => {
                const isActive = node.id === frame.activeNode;
                return (
                  <div
                    key={node.id}
                    className={`flex items-center justify-between rounded-md border p-2 transition-all ${
                      isActive
                        ? "border-accent bg-accent-dim text-white font-bold ring-1 ring-accent/30"
                        : "border-base-border/50 bg-black/30 text-zinc-500"
                    }`}
                  >
                    <span className="text-[11px]">{node.label}</span>
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-accent-light" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Explanation Card */}
          <div className="mt-4 rounded border border-base-border bg-black/40 p-2.5 text-[11px] space-y-1">
            <span className="text-accent-light font-semibold block text-[10px] uppercase tracking-wider">
              Engineering Rationale:
            </span>
            <p className="font-sans text-xs text-zinc-300 leading-relaxed">
              {frame.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
