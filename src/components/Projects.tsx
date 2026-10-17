"use client";

import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { DocMindRetrievalVisual } from "./visuals/DocMindRetrievalVisual";
import { DevAgentTerminalVisual } from "./visuals/DevAgentTerminalVisual";
import { IntelStudyCircuitVisual } from "./visuals/IntelStudyCircuitVisual";
import { BeautyBangsLighthouseVisual } from "./visuals/BeautyBangsLighthouseVisual";
import { ExternalLink, ArrowRight, BookOpen } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

export function Projects() {
  const renderVisual = (visualName: string) => {
    switch (visualName) {
      case "DocMindRetrievalVisual":
        return <DocMindRetrievalVisual variant="compact" />;
      case "DevAgentTerminalVisual":
        return <DevAgentTerminalVisual />;
      case "IntelStudyCircuitVisual":
        return <IntelStudyCircuitVisual />;
      case "BeautyBangsLighthouseVisual":
        return <BeautyBangsLighthouseVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="work" aria-label="Selected Engineering Work" className="py-16 md:py-24 border-t border-base-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="text-accent-light font-semibold">// 02</span>
            <span className="uppercase tracking-[0.2em]">Selected Engineering Systems</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Production backends & applied AI tools.
          </h2>
          <p className="max-w-2xl text-sm text-zinc-400 sm:text-base font-sans">
            Engineered with schema constraints, defensive recovery loops, and verified test benchmarks.
          </p>
        </div>

        {/* Editorial Project Rows */}
        <div className="space-y-16">
          {PROJECTS.map((project, idx) => (
            <article
              key={project.slug}
              className="relative rounded-2xl border border-base-border bg-base-card p-6 sm:p-8 lg:p-10 transition-colors hover:border-base-borderLight"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                {/* Information / Narrative Column (5 cols) */}
                <div className="space-y-5 lg:col-span-5">
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                    <span className="text-accent-light font-bold">PROJECT 0{idx + 1}</span>
                    <span>&mdash;</span>
                    <span className="uppercase">{project.shortTitle}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-white sm:text-3xl leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300 leading-relaxed font-sans">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-base-border bg-base-subtle px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Sharp Bullets */}
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-zinc-300">
                    {project.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-light shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Action CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-base-border">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-accent-dim border border-accent/40 px-3.5 py-2 font-mono text-xs font-semibold text-accent-light hover:bg-accent/20 hover:border-accent transition"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Read case study</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-subtle px-3 py-2 font-mono text-xs text-zinc-300 hover:border-accent hover:text-accent-light transition"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        <span>Repository</span>
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-emerald-neon/40 bg-emerald-dim px-3 py-2 font-mono text-xs text-emerald-neon hover:bg-emerald-neon/20 transition"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Live Site</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Signature Code-built Visual Column (7 cols) */}
                <div className="w-full lg:col-span-7">
                  {renderVisual(project.visual)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
