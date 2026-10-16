"use client";

import { useState } from "react";
import { EXPERIENCE } from "@/data/projects";
import { AsnStateMachineVisual } from "./visuals/AsnStateMachineVisual";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Network } from "lucide-react";

export function Experience() {
  const [showStateMachine, setShowStateMachine] = useState(true);

  return (
    <section id="experience" aria-label="Professional Experience" className="py-16 md:py-24 border-t border-base-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="text-cyan-neon font-semibold">// 01</span>
            <span className="uppercase tracking-[0.2em]">Engineering Experience</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Where I have shipped systems.
          </h2>
          <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
            Enterprise backend architecture, ERP integrations, and resilient client engineering.
          </p>
        </div>

        {/* Timeline Entries */}
        <div className="space-y-12">
          {EXPERIENCE.map((item, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl border border-base-border bg-base-card p-6 sm:p-8 transition-colors hover:border-base-borderLight"
            >
              {/* Role & Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between border-b border-base-border pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded bg-cyan-dim px-2.5 py-1 font-mono text-xs text-cyan-neon">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{item.role}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
                    {item.company}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 rounded-md border border-base-border bg-base-subtle px-2.5 py-1">
                    <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-md border border-base-border bg-base-subtle px-2.5 py-1 text-zinc-300">
                    <Calendar className="h-3.5 w-3.5 text-cyan-neon" />
                    <span>{item.period}</span>
                  </div>
                </div>
              </div>

              {/* Technical Accomplishments */}
              <div className="mt-6 space-y-4">
                <ul className="space-y-3">
                  {item.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-neon shrink-0" />
                      <div className="flex-1">
                        <span>{bullet}</span>

                        {/* Interactive toggle on the state machine bullet */}
                        {item.hasStateMachineVisual && bulletIdx === 1 && (
                          <div className="mt-3">
                            <button
                              onClick={() => setShowStateMachine(!showStateMachine)}
                              type="button"
                              className="inline-flex items-center gap-2 rounded-md border border-cyan-neon/40 bg-cyan-dim px-3 py-1.5 font-mono text-xs font-medium text-cyan-neon hover:bg-cyan-neon/20 transition"
                            >
                              <Network className="h-3.5 w-3.5" />
                              <span>{showStateMachine ? "Collapse ASN state machine" : "Inspect ASN state machine & rollback guard"}</span>
                              {showStateMachine ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {/* State Machine Diagram Render */}
                {item.hasStateMachineVisual && showStateMachine && (
                  <AsnStateMachineVisual />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
