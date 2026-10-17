"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Play,
  Pause,
  ShieldAlert,
  Info,
} from "lucide-react";

interface AsnStateDefinition {
  id: string;
  name: string;
  shortDesc: string;
  businessRule: string;
  sapIntegration: string;
}

const ASN_STATES: AsnStateDefinition[] = [
  {
    id: "created",
    name: "CREATED",
    shortDesc: "Vendor draft & line-item allocation",
    businessRule: "Vendor inputs PO reference and proposed delivery dates. No ERP commit yet.",
    sapIntegration: "Read-only fetch of active Purchase Order lines from SAP S/4HANA.",
  },
  {
    id: "confirmed",
    name: "CONFIRMED",
    shortDesc: "PO reconciliation against SAP S/4HANA",
    businessRule: "PO line items reconciled; quantity thresholds locked under Prisma transaction.",
    sapIntegration: "Bi-directional validation against SAP procurement schedules.",
  },
  {
    id: "transit",
    name: "IN TRANSIT",
    shortDesc: "Consignment dispatched with seal audit",
    businessRule: "Driver info, vehicle registration, and container seal IDs committed.",
    sapIntegration: "Inbound delivery document created in SAP S/4HANA staging.",
  },
  {
    id: "gate",
    name: "GATE CHECK-IN",
    shortDesc: "Asynchronous OCR & security verification",
    businessRule: "Physical gate arrival; OCR validates physical invoice against electronic ASN.",
    sapIntegration: "Discrepancy verification before warehouse GRN posting.",
  },
  {
    id: "received",
    name: "RECEIVED",
    shortDesc: "Warehouse GRN posting & inventory lock",
    businessRule: "Goods Receipt Note posted; inventory ledger incremented; ASN lifecycle closed.",
    sapIntegration: "Final GRN transaction committed to SAP S/4HANA financial & inventory books.",
  },
];

interface LogEntry {
  timestamp: string;
  type: "info" | "transition" | "rollback" | "reset";
  message: string;
}

export function AsnStateMachineVisual() {
  const [currentState, setCurrentState] = useState<number>(2); // Default 'IN TRANSIT'
  const [rollbackActive, setRollbackActive] = useState<boolean>(false);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);
  const [inspectionState, setInspectionState] = useState<number>(2);
  const [eventLogs, setEventLogs] = useState<LogEntry[]>([
    {
      timestamp: "12:00:00",
      type: "info",
      message: "ASN #8402 loaded in IN TRANSIT state · Seal audit verified.",
    },
  ]);

  const addLog = (type: LogEntry["type"], message: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setEventLogs((prev) => [{ timestamp: timeStr, type, message }, ...prev.slice(0, 5)]);
  };

  // Auto-run stepper
  useEffect(() => {
    if (!isAutoRunning) return;

    const timer = setInterval(() => {
      setCurrentState((prev) => {
        if (prev < ASN_STATES.length - 1) {
          const next = prev + 1;
          setInspectionState(next);
          addLog(
            "transition",
            `Transition: ${ASN_STATES[prev].name} -> ${ASN_STATES[next].name} · Prisma transaction verified.`
          );
          return next;
        } else {
          setIsAutoRunning(false);
          addLog("info", "Lifecycle completed at terminal state RECEIVED (GRN posted).");
          return prev;
        }
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [isAutoRunning]);

  const handleAdvanceStep = () => {
    setRollbackActive(false);
    if (currentState < ASN_STATES.length - 1) {
      const next = currentState + 1;
      setCurrentState(next);
      setInspectionState(next);
      addLog(
        "transition",
        `Transition: ${ASN_STATES[currentState].name} -> ${ASN_STATES[next].name} · Prisma transaction verified.`
      );
    }
  };

  const handleRollback = () => {
    if (currentState === 3 || currentState === 2) {
      setRollbackActive(true);
      setCurrentState(1); // Roll back to CONFIRMED
      setInspectionState(1);
      addLog(
        "rollback",
        `SAFETY GUARD TRIPPED: Discrepancy at ${ASN_STATES[currentState].name}. Automatic rollback to CONFIRMED · Prisma revision guard locked.`
      );
    }
  };

  const handleReset = () => {
    setIsAutoRunning(false);
    setRollbackActive(false);
    setCurrentState(0);
    setInspectionState(0);
    addLog("reset", "Workflow reset to initial state: CREATED (Vendor Draft).");
  };

  const isAtTerminalState = currentState === ASN_STATES.length - 1;
  const canRollback = currentState === 2 || currentState === 3;

  return (
    <div
      role="region"
      aria-label="ASN Lifecycle State Machine Debugger"
      className="mt-4 rounded-xl border border-base-border bg-base-subtle/80 p-4 font-mono text-xs shadow-sm"
    >
      {/* Title & Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-border pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-light" />
          <span className="font-semibold text-white tracking-wider text-xs">
            ASN Lifecycle State Machine
          </span>
          <span className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] text-zinc-400">
            Interactive Workflow Debugger
          </span>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Primary Action: Advance Step */}
          <button
            onClick={handleAdvanceStep}
            disabled={isAtTerminalState}
            type="button"
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-medium transition ${
              isAtTerminalState
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
                : "border border-accent/60 bg-accent text-white hover:bg-accent-light"
            }`}
          >
            <span>{isAtTerminalState ? "Lifecycle Complete" : "Advance Step"}</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          {/* Rollback Guard Simulation */}
          <button
            onClick={handleRollback}
            disabled={!canRollback}
            type="button"
            title={
              !canRollback
                ? currentState < 2
                  ? "Rollback disabled: ASN has not dispatched yet"
                  : "Rollback forbidden: GRN already posted to SAP S/4HANA"
                : "Trigger physical consignment discrepancy rollback"
            }
            className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] transition ${
              canRollback
                ? "border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20"
                : "border border-zinc-800 bg-zinc-900 text-zinc-600 cursor-not-allowed"
            }`}
          >
            <ShieldAlert className="h-3 w-3" />
            <span>Simulate Discrepancy</span>
          </button>

          {/* Auto Run */}
          <button
            onClick={() => setIsAutoRunning(!isAutoRunning)}
            type="button"
            aria-label={isAutoRunning ? "Pause auto-run" : "Auto-run lifecycle"}
            className="flex items-center gap-1 rounded border border-base-border bg-base-card px-2 py-1 text-[11px] text-zinc-300 hover:text-white transition"
          >
            {isAutoRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            <span className="hidden sm:inline">{isAutoRunning ? "Pause" : "Auto-Run"}</span>
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            type="button"
            aria-label="Reset workflow to draft state"
            className="flex items-center gap-1 rounded border border-base-border bg-base-card px-2 py-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition"
          >
            <RotateCcw className="h-3 w-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* State Machine Step Nodes */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {ASN_STATES.map((state, idx) => {
          const isCurrent = idx === currentState;
          const isPast = idx < currentState;
          const isInspected = idx === inspectionState;

          return (
            <button
              key={state.id}
              onClick={() => setInspectionState(idx)}
              type="button"
              className={`rounded-lg border p-2.5 text-left transition-all ${
                isCurrent
                  ? rollbackActive
                    ? "border-rose-500 bg-rose-950/30 text-white ring-1 ring-rose-500/50"
                    : "border-accent bg-accent-dim text-white ring-1 ring-accent/40"
                  : isPast
                  ? "border-base-border bg-base-card/80 text-zinc-300"
                  : "border-base-border/50 bg-black/20 text-zinc-500"
              } ${isInspected ? "border-dashed" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400 font-mono">0{idx + 1}</span>
                <span
                  className={`text-[9px] px-1 py-0.5 rounded font-mono ${
                    isCurrent
                      ? rollbackActive
                        ? "bg-rose-500/30 text-rose-200 font-semibold"
                        : "bg-accent/30 text-accent-light font-semibold"
                      : isPast
                      ? "bg-emerald-dim text-emerald-neon"
                      : "text-zinc-500 bg-white/5"
                  }`}
                >
                  {isCurrent ? (rollbackActive ? "ROLLED BACK" : "CURRENT") : isPast ? "COMMITTED" : "QUEUED"}
                </span>
              </div>

              <p className="mt-2 font-mono text-xs font-semibold text-white">
                {state.name}
              </p>
              <p className="mt-1 text-[10px] text-zinc-400 leading-tight">
                {state.shortDesc}
              </p>
            </button>
          );
        })}
      </div>

      {/* State Inspector Detail */}
      <div className="mt-3 rounded-lg border border-base-border bg-base-card p-3 space-y-2 text-[11px]">
        <div className="flex items-center justify-between border-b border-base-border/60 pb-1.5">
          <span className="text-zinc-300 font-semibold flex items-center gap-1.5">
            <Info className="h-3 w-3 text-accent-light" />
            <span>Node Inspector: {ASN_STATES[inspectionState].name}</span>
          </span>
          <span className="text-zinc-400 text-[10px]">
            {inspectionState === currentState ? "ACTIVE IN CURRENT WORKFLOW" : "INSPECTING SPEC"}
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 text-zinc-300">
          <div>
            <span className="text-[10px] uppercase text-zinc-400 block">Business Rule:</span>
            <span>{ASN_STATES[inspectionState].businessRule}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-zinc-400 block">SAP S/4HANA Contract:</span>
            <span>{ASN_STATES[inspectionState].sapIntegration}</span>
          </div>
        </div>
      </div>

      {/* Synchronized Event Log Feed */}
      <div className="mt-3 rounded-lg border border-base-border bg-black/60 p-2.5 font-mono text-[11px]">
        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/5 text-[10px] text-zinc-400 uppercase tracking-wider">
          <span>Prisma Transaction Audit Log</span>
          <span>Buffer: {eventLogs.length} events</span>
        </div>

        <div className="space-y-1 max-h-24 overflow-y-auto">
          {eventLogs.map((entry, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 truncate ${
                entry.type === "rollback"
                  ? "text-rose-400"
                  : entry.type === "transition"
                  ? "text-zinc-200"
                  : entry.type === "reset"
                  ? "text-amber-neon"
                  : "text-zinc-400"
              }`}
            >
              <span className="text-zinc-400 shrink-0">[{entry.timestamp}]</span>
              <span className="truncate">{entry.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
