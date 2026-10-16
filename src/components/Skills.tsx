"use client";

import { useState } from "react";
import { SKILL_GROUPS, SKILL_PROJECT_MAP } from "@/data/projects";
import { Code2, Server, Brain, Database, Layout, Cloud, GitMerge, Info } from "lucide-react";

export function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

  return (
    <section id="skills" aria-label="Technical Skills and Architecture" className="py-16 md:py-24 border-t border-base-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="text-cyan-neon font-semibold">// 03</span>
            <span className="uppercase tracking-[0.2em]">Verified Technical Proficiencies</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineering stack & system patterns.
          </h2>
          <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">
            Hover over skills to inspect active implementations across production codebases and architectures.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, idx) => {
            const Icon = getCategoryIcon(group.category);
            const isFeatured = group.category === "Backend" || group.category === "AI / LLM";

            return (
              <div
                key={group.category}
                className={`relative flex flex-col justify-between rounded-xl border border-base-border bg-base-card p-6 transition-all hover:border-base-borderLight ${
                  isFeatured ? "lg:col-span-1 border-cyan-neon/30 bg-base-card/90" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-base-border pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-cyan-dim text-cyan-neon">
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

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                    {group.description}
                  </p>

                  {/* Skills Chip List */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => {
                      const associatedProject = SKILL_PROJECT_MAP[skill];
                      const isHovered = hoveredSkill === skill;

                      return (
                        <div
                          key={skill}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`relative cursor-default rounded-md border px-3 py-1.5 font-mono text-xs transition-all ${
                            isHovered
                              ? "border-cyan-neon bg-cyan-dim text-white shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                              : "border-base-border bg-base-subtle/70 text-zinc-200 hover:border-zinc-500"
                          }`}
                        >
                          <span>{skill}</span>

                          {/* Hover Tooltip / Hint */}
                          {isHovered && associatedProject && (
                            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 whitespace-nowrap rounded border border-cyan-neon/60 bg-black/95 px-2.5 py-1 text-[10px] font-mono text-cyan-neon shadow-xl backdrop-blur-md">
                              <span className="text-zinc-400">Shipped in: </span>
                              <span className="font-semibold">{associatedProject}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-base-border/50 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                  <span>{group.skills.length} verified technologies</span>
                  <span className="text-cyan-neon font-mono">Defensible</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
