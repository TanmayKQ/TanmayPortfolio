"use client";

import { useState } from "react";
import { ArrowRight, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";

const ASN_STATES = [
  { id: "created", name: "CREATED", desc: "Vendor draft & line-item allocation", tag: "DRAFT" },
  { id: "confirmed", name: "CONFIRMED", desc: "PO reconciliation against SAP S/4HANA", tag: "VALIDATED" },
  { id: "transit", name: "IN TRANSIT", desc: "Consignment dispatched with seal audit", tag: "ACTIVE" },
  { id: "gate", name: "GATE CHECK-IN", desc: "Asynchronous OCR + vehicle weight check", tag: "AUDIT" },
  { id: "received", name: "RECEIVED", desc: "Warehouse GRN posting & inventory lock", tag: "FINAL" },
];

export function AsnStateMachineVisual() {
  const [currentState, setCurrentState] = useState<number>(2); // Default 'IN TRANSIT'
  const [rollbackTriggered, setRollbackTriggered] = useState<boolean>(false);
  const [logText, setLogText] = useState<string>("Normal state machine transition flow active.");

  const handleNextState = () => {
    setRollbackTriggered(false);
    if (currentState < ASN_STATES.length - 1) {
      setCurrentState(currentState + 1);
      setLogText(`Transitioning safely to ${ASN_STATES[currentState + 1].name} · Prisma transaction locked.`);
    } else {
      setCurrentState(0);
      setLogText("Resetting ASN lifecycle demo to CREATED state.");
    }
  };

  const handleSimulateRollback = () => {
    setRollbackTriggered(true);
    setCurrentState(1); // Roll back to CONFIRMED
    setLogText("SAFETY GUARD TRIPPED: Discrepancy at Gate Check-in. Automatic transaction rollback to CONFIRMED state.");
  };

  return (
    <div className="mt-4 rounded-xl border border-base-border bg-base-subtle/80 p-4 font-mono text-xs shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-base-border pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-neon" />
          <span className="font-semibold text-white tracking-wider">
            ASN LIFECYCLE STATE MACHINE (INTERACTIVE)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleNextState}
            type="button"
            className="flex items-center gap-1.5 rounded border border-cyan-neon/40 bg-cyan-dim px-2.5 py-1 text-[11px] text-cyan-neon hover:border-cyan-neon transition"
          >
            <span>Advance Step</span>
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            onClick={handleSimulateRollback}
            type="button"
            className="flex items-center gap-1.5 rounded border border-rose-500/40 bg-rose-500/10 px-2.5 py-1 text-[11px] text-rose-400 hover:border-rose-400 transition"
          >
            <AlertTriangle className="h-3 w-3" />
            <span>Simulate Rollback Guard</span>
          </button>
        </div>
      </div>

      {/* State Machine Nodes */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {ASN_STATES.map((state, idx) => {
          const isCurrent = idx === currentState;
          const isPast = idx < currentState;

          return (
            <div
              key={state.id}
              onClick={() => {
                setCurrentState(idx);
                setRollbackTriggered(false);
                setLogText(`Direct inspection: ${state.name} node selected.`);
              }}
              className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
                isCurrent
                  ? rollbackTriggered
                    ? "border-rose-500 bg-rose-950/30 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                    : "border-cyan-neon bg-cyan-dim/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : isPast
                  ? "border-base-border bg-base-card text-zinc-300"
                  : "border-base-border/50 bg-black/20 text-zinc-500 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">0{idx + 1}</span>
                <span
                  className={`text-[9px] px-1 py-0.5 rounded font-mono ${
                    isCurrent
                      ? rollbackTriggered
                        ? "bg-rose-500/30 text-rose-200"
                        : "bg-cyan-neon/30 text-cyan-200 font-semibold"
                      : isPast
                      ? "bg-emerald-dim text-emerald-neon"
                      : "text-zinc-400 bg-white/5"
                  }`}
                >
                  {isCurrent ? "ACTIVE" : isPast ? "DONE" : "IDLE"}
                </span>
              </div>
              <p
                className={`mt-2 font-mono text-xs font-semibold ${
                  isCurrent ? "text-white" : "text-zinc-200"
                }`}
              >
                {state.name}
              </p>
              <p className="mt-1 text-[10px] text-zinc-300 leading-tight">
                {state.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Audit Log / Rollback Banner */}
      <div
        className={`mt-3 flex items-start gap-2 rounded border px-3 py-2 text-[11px] ${
          rollbackTriggered
            ? "border-rose-500/30 bg-rose-500/10 text-rose-300"
            : "border-base-border bg-base-card text-zinc-400"
        }`}
      >
        {rollbackTriggered ? (
          <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
        ) : (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-neon mt-0.5" />
        )}
        <div className="flex-1">
          <span className="font-semibold text-zinc-200">State Transition Log: </span>
          <span>{logText}</span>
        </div>
      </div>
    </div>
  );
}
