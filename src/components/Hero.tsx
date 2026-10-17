"use client";

import Link from "next/link";
import { ApiTerminal } from "./ApiTerminal";
import { ArrowDown, ArrowDownToLine, Eye } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { VERIFIED_LINKS } from "@/data/projects";
import { useResumeModal } from "./ResumeModal";

export function Hero() {
  const { openResumeModal } = useResumeModal();
  return (
    <section
      id="hero"
      aria-label="Introduction and Overview"
      className="relative overflow-hidden pt-6 pb-14 md:pt-12 md:pb-20"
    >
      {/* Subtle depth accent */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[420px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.06)_0%,_transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left Column: Narrative & Clear Positioning */}
          <div className="space-y-6">
            {/* Eyebrow */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-3 py-1 font-mono text-xs text-zinc-300">
                <span className="text-accent-light font-semibold">// 00</span>
                <span>TANMAY KOTAK &mdash; PUNE, IN</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-[1.08]">
              I build backends that hold up, and AI systems that do real work.
            </h1>

            {/* Subline */}
            <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg font-sans">
              Fourth-year Computer Engineering student building production APIs, SAP-integrated enterprise systems, RAG pipelines, and agentic AI tooling with Python, TypeScript, and Node.js.
            </p>

            {/* CTAs and Social Handles */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-accent-light"
              >
                <span>View work</span>
                <ArrowDown className="h-4 w-4" />
              </Link>

              <button
                onClick={openResumeModal}
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent-dim px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-accent-light transition hover:border-accent hover:bg-accent/20"
              >
                <Eye className="h-4 w-4" />
                <span>Preview resume</span>
              </button>

              <a
                href={VERIFIED_LINKS.resumePdf}
                download="TanmayKotakResume.pdf"
                className="inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-card px-3.5 py-3 font-mono text-xs font-semibold text-zinc-300 transition hover:border-accent hover:text-accent-light"
                title="Download TanmayKotakResume.pdf directly"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span className="hidden sm:inline">PDF</span>
              </a>

              <div className="flex items-center gap-2 pl-1">
                <a
                  href={VERIFIED_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile (TanmayKQ)"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-base-border bg-base-card text-zinc-400 transition hover:border-accent hover:text-accent-light"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>

                <a
                  href={VERIFIED_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-base-border bg-base-card text-zinc-400 transition hover:border-accent hover:text-accent-light"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Portfolio as an API Terminal */}
          <div className="w-full">
            <ApiTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
