"use client";

import { useState } from "react";
import { ShieldAlert, CheckCircle, RefreshCw, Zap, Server, Activity } from "lucide-react";

type CircuitState = "CLOSED" | "OPEN" | "HALF_OPEN";

export function IntelStudyCircuitVisual() {
  const [state, setState] = useState<CircuitState>("CLOSED");
  const [failures, setFailures] = useState(0);
  const [log, setLog] = useState("Circuit CLOSED: Normal traffic routed to HuggingFace Inference.");

  const simulateFailure = () => {
    const nextFailures = failures + 1;
    setFailures(nextFailures);

    if (nextFailures >= 3) {
      setState("OPEN");
      setLog("CIRCUIT TRIPPED (OPEN): 3 consecutive timeouts. Downstream traffic halted. Serving instant JSON fallbacks.");
    } else {
      setLog(`Inference error ${nextFailures}/3 (HTTP 503). Retrying with exponential backoff 2^${nextFailures}...`);
    }
  };

  const simulateCooldown = () => {
    setState("HALF_OPEN");
    setLog("COOLDOWN COMPLETE (HALF-OPEN): Sending single probe trial request to verify HuggingFace API availability.");
  };

  const simulateSuccess = () => {
    setState("CLOSED");
    setFailures(0);
    setLog("PROBE SUCCEEDED: Downstream HuggingFace inference healthy. Circuit restored to CLOSED state.");
  };

  return (
    <div className="rounded-xl border border-base-border bg-base-card overflow-hidden shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-cyan-neon" />
          <span className="font-mono text-xs font-semibold text-zinc-200">
            intelstudy_circuit_breaker.sys // RESILIENT INFERENCE
          </span>
        </div>
        <span
          className={`font-mono text-[10px] px-2 py-0.5 rounded font-bold ${
            state === "CLOSED"
              ? "bg-emerald-dim text-emerald-neon"
              : state === "OPEN"
              ? "bg-rose-500/20 text-rose-400"
              : "bg-amber-dim text-amber-neon"
          }`}
        >
          CIRCUIT: {state}
        </span>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* State Visualizer Cards */}
        <div className="grid grid-cols-3 gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={simulateSuccess}
            className={`p-3 rounded-lg border text-left transition-all ${
              state === "CLOSED"
                ? "border-emerald-neon bg-emerald-dim shadow-[0_0_15px_rgba(16,185,129,0.2)] text-white"
                : "border-base-border bg-base-subtle/40 text-zinc-500"
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span>STATE 01</span>
              <CheckCircle className="h-3 w-3 text-emerald-neon" />
            </div>
            <p className="mt-1 font-bold text-emerald-neon">CLOSED</p>
            <p className="mt-1 text-[10px] text-zinc-400">Normal traffic; 0 failures</p>
          </button>

          <button
            type="button"
            onClick={simulateFailure}
            className={`p-3 rounded-lg border text-left transition-all ${
              state === "OPEN"
                ? "border-rose-500 bg-rose-950/40 shadow-[0_0_15px_rgba(244,63,94,0.3)] text-white"
                : "border-base-border bg-base-subtle/40 text-zinc-500"
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span>STATE 02</span>
              <ShieldAlert className="h-3 w-3 text-rose-400" />
            </div>
            <p className="mt-1 font-bold text-rose-400">OPEN</p>
            <p className="mt-1 text-[10px] text-zinc-400">Calls blocked; Fallbacks active</p>
          </button>

          <button
            type="button"
            onClick={simulateCooldown}
            className={`p-3 rounded-lg border text-left transition-all ${
              state === "HALF_OPEN"
                ? "border-amber-neon bg-amber-dim shadow-[0_0_15px_rgba(245,158,11,0.2)] text-white"
                : "border-base-border bg-base-subtle/40 text-zinc-500"
            }`}
          >
            <div className="flex items-center justify-between text-[10px]">
              <span>STATE 03</span>
              <RefreshCw className="h-3 w-3 text-amber-neon" />
            </div>
            <p className="mt-1 font-bold text-amber-neon">HALF-OPEN</p>
            <p className="mt-1 text-[10px] text-zinc-400">Single trial probe in flight</p>
          </button>
        </div>

        {/* Interactive Simulation Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <button
            onClick={simulateFailure}
            type="button"
            className="flex items-center gap-1.5 rounded border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-rose-400 hover:border-rose-400 transition"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Simulate HF 503 Timeout ({failures}/3)</span>
          </button>

          <button
            onClick={simulateCooldown}
            type="button"
            className="flex items-center gap-1.5 rounded border border-amber-neon/40 bg-amber-dim px-3 py-1.5 text-amber-neon hover:border-amber-neon transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Simulate Cooldown (Trip to Half-Open)</span>
          </button>

          <button
            onClick={simulateSuccess}
            type="button"
            className="flex items-center gap-1.5 rounded border border-emerald-neon/40 bg-emerald-dim px-3 py-1.5 text-emerald-neon hover:border-emerald-neon transition"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Restore Health (Closed)</span>
          </button>
        </div>

        {/* Real-time Status Console */}
        <div className="rounded-lg border border-base-border bg-black/80 p-3 font-mono text-xs leading-relaxed">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-1.5 mb-1.5 border-b border-white/5">
            <span>RESILIENCE LOG</span>
            <span className="text-cyan-neon">RETRY EXPONENT: 2^{failures}</span>
          </div>
          <p className="text-zinc-300">{log}</p>
        </div>
      </div>
    </div>
  );
}
