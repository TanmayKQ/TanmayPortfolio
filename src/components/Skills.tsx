"use client";

import { useState } from "react";
import { SKILL_GROUPS, SKILL_PROJECT_MAP } from "@/data/projects";
import { Code2, Server, Brain, Database, Layout, Cloud, GitMerge, CheckCircle2 } from "lucide-react";

export function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<string>("pgvector");

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages":
        return Code2;
      case "Backend":
        return Server;
      case "AI / LLM":
        return Brain;
      case "Databases":
        return Database;
      case "Frontend":
        return Layout;
      case "Cloud & Tools":
        return Cloud;
      case "Integrations & Patterns":
        return GitMerge;
      default:
        return Code2;
    }
  };

  const activeProject = SKILL_PROJECT_MAP[selectedSkill];

  return (
    <section
      id="skills"
      aria-label="Technical Skills and Architecture"
      className="py-16 md:py-24 border-t border-base-border"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="text-accent-light font-semibold">// 03</span>
            <span className="uppercase tracking-[0.2em]">Technical Stack & Architecture</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineering stack & system patterns.
          </h2>
          <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
            Select or hover any skill below to inspect which project it was shipped in.
          </p>
        </div>

        {/* Global Context Inspector Strip */}
        <div className="mb-8 rounded-xl border border-base-border bg-base-card p-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent-light" />
              <span className="text-zinc-400">Selected Technology:</span>
              <span className="font-bold text-white text-sm bg-base-subtle px-2 py-0.5 rounded border border-base-border">
                {selectedSkill}
              </span>
            </div>

            <div className="flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-neon shrink-0" />
              <span>
                {activeProject ? (
                  <>
                    Shipped in: <strong className="text-white font-semibold">{activeProject}</strong>
                  </>
                ) : (
                  <span className="text-zinc-400">Core engineering skill used across multiple projects</span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Bento Grid of Grouped Categories */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, idx) => {
            const Icon = getCategoryIcon(group.category);

            return (
              <div
                key={group.category}
                className="flex flex-col justify-between rounded-xl border border-base-border bg-base-card p-5 transition-colors hover:border-base-borderLight"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-base-border pb-3 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-accent-dim text-accent-light">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="font-display text-base font-bold text-white">
                        {group.category}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4 font-sans">
                    {group.description}
                  </p>

                  {/* Skills Chip List - Accessible Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const isSelected = selectedSkill === skill;
                      const hasProject = Boolean(SKILL_PROJECT_MAP[skill]);

                      return (
                        <button
                          key={skill}
                          onClick={() => setSelectedSkill(skill)}
                          onMouseEnter={() => setSelectedSkill(skill)}
                          type="button"
                          className={`rounded-md border px-2.5 py-1 font-mono text-xs transition-all text-left ${
                            isSelected
                              ? "border-accent bg-accent-dim text-white ring-1 ring-accent/30 font-semibold"
                              : "border-base-border bg-base-subtle/70 text-zinc-300 hover:border-zinc-500 hover:text-white"
                          }`}
                        >
                          <span>{skill}</span>
                          {hasProject && (
                            <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-light/70" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
