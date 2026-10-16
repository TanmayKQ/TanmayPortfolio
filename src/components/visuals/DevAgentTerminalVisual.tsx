"use client";

import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Terminal, GitCommit, CheckCircle2, AlertCircle } from "lucide-react";

interface ScriptFrame {
  id: number;
  activeNode: "PLANNER" | "TOOL_CALL" | "EVALUATOR" | "RECOVERY" | "DONE";
  terminalLines: string[];
  statusText: string;
}

const REPLAY_FRAMES: ScriptFrame[] = [
  {
    id: 0,
    activeNode: "PLANNER",
    terminalLines: [
      "$ devagent task 'fix pool exhaustion under burst concurrency'",
      ">> [IPC:Node->Python] Stdin JSONL payload dispatched",
      ">> [LangGraph:PlannerNode] Analyzing repo AST and call graph...",
      ">> Plan generated: 1. Add connection timeout guard  2. Drain idle sockets  3. Run suite",
    ],
    statusText: "Planner Node: Generating task decomposition",
  },
  {
    id: 1,
    activeNode: "TOOL_CALL",
    terminalLines: [
      ">> [LangGraph:ToolCallNode] Generating two-phase unified diff:",
      "--- a/src/db/pool.ts",
      "+++ b/src/db/pool.ts",
      "@@ -42,3 +42,7 @@ async function acquire() {",
      "+  const timeout = setTimeout(() => { throw new TimeoutError(); }, 2500);",
      "+  try { return await pool.connect(); } finally { clearTimeout(timeout); }",
      ">> Awaiting human approval [y/N]: y (Confirmed)",
    ],
    statusText: "Tool Call Node: Two-phase plan-then-commit staged",
  },
  {
    id: 2,
    activeNode: "EVALUATOR",
    terminalLines: [
      ">> [Node:Harness] Shell-less subprocess invoked: npm test -- --runInBand",
      ">> RUNS test/concurrency.test.ts",
      "   FAIL: BurstRequestTest > SocketTimeout not caught in nested transaction",
      ">> [LangGraph:EvaluatorNode] Exit code 1 detected. Initiating recovery loop...",
    ],
    statusText: "Evaluator Node: Test failure caught; routing to recovery node",
  },
  {
    id: 3,
    activeNode: "RECOVERY",
    terminalLines: [
      ">> [LangGraph:RecoveryNode] Parsing error stack trace & AST diff...",
      ">> Root cause identified: Transaction wrapper overrides error handler.",
      ">> Patching transaction cleanup handler in src/db/pool.ts...",
      ">> [Node:Harness] Re-running deterministic test benchmark...",
    ],
    statusText: "Recovery Node: Autonomous diagnostic & patch iteration",
  },
  {
    id: 4,
    activeNode: "DONE",
    terminalLines: [
      ">> RUNS test/concurrency.test.ts",
      "   PASS: BurstRequestTest (140ms)",
      ">> Deterministic Benchmark: 17/17 automated test suites PASSED",
      ">> Session completed with zero LLM API leaks. Exit code 0.",
    ],
    statusText: "Evaluation Finished: 17/17 Benchmarks Passed",
  },
];

const LANGGRAPH_NODES = [
  { id: "PLANNER", label: "01 Planner" },
  { id: "TOOL_CALL", label: "02 Two-Phase Diff" },
  { id: "EVALUATOR", label: "03 Test Evaluator" },
  { id: "RECOVERY", label: "04 Recovery Loop" },
  { id: "DONE", label: "05 Validated / End" },
];

export function DevAgentTerminalVisual() {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % REPLAY_FRAMES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const frame = REPLAY_FRAMES[currentFrameIndex];

  return (
    <div className="rounded-xl border border-base-border bg-base-card overflow-hidden shadow-2xl">
      {/* Top Window Header */}
      <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-cyan-neon" />
          <span className="font-mono text-xs font-semibold text-zinc-200">
            devagent_session_replay.json // LANGGRAPH + IPC
          </span>
        </div>

        {/* Playback & Scrub Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentFrameIndex((prev) => Math.max(0, prev - 1))}
            type="button"
            aria-label="Previous frame"
            className="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-cyan-neon transition"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            type="button"
            aria-label={isPlaying ? "Pause replay" : "Play replay"}
            className="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-cyan-neon transition"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => setCurrentFrameIndex((prev) => (prev + 1) % REPLAY_FRAMES.length)}
            type="button"
            aria-label="Next frame"
            className="rounded p-1 text-zinc-400 hover:bg-white/5 hover:text-cyan-neon transition"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[1.5fr_1fr] sm:p-5">
        {/* Terminal Screen (Asciinema style) */}
        <div className="flex flex-col rounded-lg border border-base-border bg-black/90 p-4 font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-[10px] text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-neon inline-block" />
              <span>IPC BUFFER: STDIN / STDOUT (JSONL)</span>
            </span>
            <span className="text-cyan-neon">FRAME {currentFrameIndex + 1}/5</span>
          </div>

          <div className="min-h-[160px] space-y-1.5 overflow-x-auto text-[11px] leading-relaxed">
            {frame.terminalLines.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.startsWith("+")
                    ? "text-emerald-400 bg-emerald-950/20 px-1 rounded"
                    : line.startsWith("-")
                    ? "text-rose-400 bg-rose-950/20 px-1 rounded"
                    : line.includes("FAIL")
                    ? "text-rose-400 font-bold"
                    : line.includes("PASS")
                    ? "text-emerald-neon font-bold"
                    : line.startsWith("$")
                    ? "text-white font-semibold"
                    : "text-zinc-300"
                }
              >
                {line}
              </div>
            ))}
          </div>

          {/* Scrub Slider */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-1">
              <span>SCRUB TIMELINE</span>
              <span>{Math.round(((currentFrameIndex + 1) / REPLAY_FRAMES.length) * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max={REPLAY_FRAMES.length - 1}
              value={currentFrameIndex}
              onChange={(e) => {
                setIsPlaying(false);
                setCurrentFrameIndex(Number(e.target.value));
              }}
              className="w-full accent-cyan-neon cursor-pointer h-1 bg-zinc-800 rounded"
            />
          </div>
        </div>

        {/* Side Panel: Synced LangGraph State Machine */}
        <div className="flex flex-col justify-between rounded-lg border border-base-border bg-base-subtle/50 p-3.5 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between border-b border-base-border pb-2 text-[10px] uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-1">
                <GitCommit className="h-3.5 w-3.5 text-cyan-neon" />
                <span>LangGraph State Graph</span>
              </span>
              <span className="text-cyan-neon">SYNCED</span>
            </div>

            <div className="mt-3 space-y-2">
              {LANGGRAPH_NODES.map((node) => {
                const isActive = node.id === frame.activeNode;
                return (
                  <div
                    key={node.id}
                    className={`flex items-center justify-between rounded-md border p-2 transition-all ${
                      isActive
                        ? "border-cyan-neon bg-cyan-dim text-white font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                        : "border-base-border/50 bg-black/30 text-zinc-500"
                    }`}
                  >
                    <span className="text-[11px]">{node.label}</span>
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-cyan-neon animate-ping" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 rounded border border-base-border bg-black/40 p-2 text-[10px] text-zinc-400">
            <span className="text-cyan-neon font-semibold">Active: </span>
            <span>{frame.statusText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
