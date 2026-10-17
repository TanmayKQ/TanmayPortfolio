"use client";

import { useState } from "react";
import {
  ShieldAlert,
  CheckCircle,
  RefreshCw,
  Zap,
  Activity,
  RotateCcw,
  Info,
  Clock,
  ArrowRight,
} from "lucide-react";

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

interface CircuitLog {
  timestamp: string;
  type: "normal" | "failure" | "trip" | "probe" | "recovery" | "reset";
  message: string;
}

export function IntelStudyCircuitVisual() {
  const [state, setState] = useState<CircuitState>("CLOSED");
  const [failures, setFailures] = useState(0);
  const [logs, setLogs] = useState<CircuitLog[]>([
    {
      timestamp: "12:00:00",
      type: "normal",
      message: "Circuit initialized in CLOSED state · 100% traffic routed to HuggingFace API.",
    },
  ]);

  const addLog = (type: CircuitLog["type"], message: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setLogs((prev) => [{ timestamp: timeStr, type, message }, ...prev.slice(0, 4)]);
  };

  const simulateFailure = () => {
    if (state !== "CLOSED") return;

    const nextFailures = failures + 1;
    setFailures(nextFailures);

    if (nextFailures >= 3) {
      setState("OPEN");
      addLog(
        "trip",
        "CIRCUIT TRIPPED (OPEN): 3 consecutive HTTP 503 timeouts. Traffic to HuggingFace halted. Serving structured JSON schema fallbacks."
      );
    } else {
      addLog(
        "failure",
        `Inference timeout ${nextFailures}/3 (HTTP 503). Retrying with exponential backoff (2^${nextFailures}s)...`
      );
    }
  };

  const simulateCooldown = () => {
    if (state !== "OPEN") return;
    setState("HALF_OPEN");
    addLog(
      "probe",
      "COOLDOWN EXPIRED: Circuit transitioned to HALF-OPEN. Releasing single trial probe to test HuggingFace health."
    );
  };

  const simulateProbeSuccess = () => {
    if (state !== "HALF_OPEN") return;
    setState("CLOSED");
    setFailures(0);
    addLog(
      "recovery",
      "PROBE SUCCEEDED: HuggingFace endpoint responded 200 OK. Circuit restored to CLOSED state."
    );
  };

  const simulateProbeFailure = () => {
    if (state !== "HALF_OPEN") return;
    setState("OPEN");
    addLog(
      "trip",
      "PROBE FAILED: HuggingFace endpoint still unavailable (HTTP 503). Circuit re-tripped to OPEN state."
    );
  };

  const handleReset = () => {
    setState("CLOSED");
    setFailures(0);
    addLog("reset", "Circuit manually reset to healthy CLOSED state.");
  };

  return (
    <div
      role="region"
      aria-label="IntelStudy Circuit Breaker Simulation"
      className="rounded-xl border border-base-border bg-base-card overflow-hidden shadow-sm font-mono text-xs"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent-light" />
          <span className="font-semibold text-zinc-200">
            intelstudy_circuit_breaker
          </span>
          <span className="rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-amber-300 font-semibold">
            ILLUSTRATIVE SIMULATION
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
              state === "CLOSED"
                ? "bg-emerald-dim text-emerald-neon border border-emerald-neon/30"
                : state === "OPEN"
                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                : "bg-amber-dim text-amber-neon border border-amber-neon/30"
            }`}
          >
            CIRCUIT: {state}
          </span>

          <button
            onClick={handleReset}
            type="button"
            aria-label="Reset circuit breaker"
            className="flex items-center gap-1 rounded border border-base-border bg-base-card px-2 py-0.5 text-zinc-400 hover:text-zinc-200 transition text-[11px]"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* State Representation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* CLOSED Card */}
          <div
            className={`p-2.5 sm:p-3 rounded-lg border text-left transition-all ${
              state === "CLOSED"
                ? "border-emerald-neon bg-emerald-dim ring-1 ring-emerald-neon/30 text-white"
                : "border-base-border bg-base-subtle/40 text-zinc-500"
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span>STATE 01</span>
              <CheckCircle className={`h-3 w-3 ${state === "CLOSED" ? "text-emerald-neon" : "text-zinc-600"}`} />
            </div>
            <p className={`mt-1 font-bold ${state === "CLOSED" ? "text-emerald-neon" : "text-zinc-400"}`}>
              CLOSED
            </p>
            <p className="mt-1 text-[10px] text-zinc-400 leading-tight">
              Normal routing ({failures}/3 failures)
            </p>
          </div>

          {/* OPEN Card */}
          <div
            className={`p-2.5 sm:p-3 rounded-lg border text-left transition-all ${
              state === "OPEN"
                ? "border-rose-500 bg-rose-950/30 ring-1 ring-rose-500/40 text-white"
                : "border-base-border bg-base-subtle/40 text-zinc-500"
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span>STATE 02</span>
              <ShieldAlert className={`h-3 w-3 ${state === "OPEN" ? "text-rose-400" : "text-zinc-600"}`} />
            </div>
            <p className={`mt-1 font-bold ${state === "OPEN" ? "text-rose-400" : "text-zinc-400"}`}>
              OPEN
            </p>
            <p className="mt-1 text-[10px] text-zinc-400 leading-tight">
              Calls halted; Fallback cache active
            </p>
          </div>

          {/* HALF-OPEN Card */}
          <div
            className={`p-2.5 sm:p-3 rounded-lg border text-left transition-all ${
              state === "HALF_OPEN"
                ? "border-amber-neon bg-amber-dim ring-1 ring-amber-neon/30 text-white"
                : "border-base-border bg-base-subtle/40 text-zinc-500"
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span>STATE 03</span>
              <RefreshCw className={`h-3 w-3 ${state === "HALF_OPEN" ? "text-amber-neon" : "text-zinc-600"}`} />
            </div>
            <p className={`mt-1 font-bold ${state === "HALF_OPEN" ? "text-amber-neon" : "text-zinc-400"}`}>
              HALF-OPEN
            </p>
            <p className="mt-1 text-[10px] text-zinc-400 leading-tight">
              Single trial probe in flight
            </p>
          </div>
        </div>

        {/* Action Controls Toolbar - Strictly state-dependent */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {state === "CLOSED" && (
            <button
              onClick={simulateFailure}
              type="button"
              className="w-full sm:w-auto justify-center flex items-center gap-1.5 rounded border border-rose-500/40 bg-rose-500/10 px-3.5 py-2 text-rose-300 hover:bg-rose-500/20 transition font-medium"
            >
              <Zap className="h-3.5 w-3.5 text-rose-400" />
              <span>Simulate API Timeout ({failures}/3)</span>
            </button>
          )}

          {state === "OPEN" && (
            <button
              onClick={simulateCooldown}
              type="button"
              className="w-full sm:w-auto justify-center flex items-center gap-1.5 rounded border border-amber-neon/40 bg-amber-dim px-3.5 py-2 text-amber-neon hover:bg-amber-neon/20 transition font-medium"
            >
              <Clock className="h-3.5 w-3.5 text-amber-neon" />
              <span>Simulate Cooldown (Trip to Half-Open)</span>
            </button>
          )}

          {state === "HALF_OPEN" && (
            <>
              <button
                onClick={simulateProbeSuccess}
                type="button"
                className="w-full sm:w-auto justify-center flex items-center gap-1.5 rounded border border-emerald-neon/40 bg-emerald-dim px-3.5 py-2 text-emerald-neon hover:bg-emerald-neon/20 transition font-medium"
              >
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Simulate Probe Success (Close Circuit)</span>
              </button>

              <button
                onClick={simulateProbeFailure}
                type="button"
                className="w-full sm:w-auto justify-center flex items-center gap-1.5 rounded border border-rose-500/40 bg-rose-500/10 px-3.5 py-2 text-rose-300 hover:bg-rose-500/20 transition font-medium"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                <span>Simulate Probe Failure (Re-Open)</span>
              </button>
            </>
          )}
        </div>

        {/* State Explanation / Status Banner */}
        <div className="rounded-lg border border-base-border bg-base-subtle/50 p-3 text-[11px] space-y-1">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 uppercase tracking-wider pb-1 border-b border-base-border/50">
            <span>Pattern Specification</span>
            <span className="text-accent-light">Threshold: 3 failures &middot; Fallback: Structured JSON</span>
          </div>
          <p className="font-sans text-xs text-zinc-300 leading-relaxed pt-1">
            {state === "CLOSED" &&
              "Circuit is healthy. All student document chunking queries route to HuggingFace. Consecutive timeouts trigger exponential backoff before tripping open."}
            {state === "OPEN" &&
              "Circuit is tripped open. Calls are halted at the Express gateway to prevent server thread exhaustion. The system immediately delivers pre-structured JSON question fallbacks."}
            {state === "HALF_OPEN" &&
              "Cooldown period expired. A single probe request is released to test upstream service health before opening normal traffic gates."}
          </p>
        </div>

        {/* Synchronized Event Log Feed */}
        <div className="rounded-lg border border-base-border bg-black/70 p-2.5 font-mono text-[11px]">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/5 text-[10px] text-zinc-400 uppercase tracking-wider">
            <span>Resilience Event Log</span>
            <span>{logs.length} logged entries</span>
          </div>

          <div className="space-y-1 max-h-20 overflow-y-auto">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`truncate ${
                  log.type === "trip"
                    ? "text-rose-400"
                    : log.type === "probe"
                    ? "text-amber-neon"
                    : log.type === "recovery"
                    ? "text-emerald-neon font-medium"
                    : "text-zinc-300"
                }`}
              >
                <span className="text-zinc-500">[{log.timestamp}]</span> {log.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
