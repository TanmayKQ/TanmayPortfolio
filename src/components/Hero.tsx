import Link from "next/link";
import { SystemTraceVisual } from "./SystemTraceVisual";
import { ArrowDown, ArrowDownToLine, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { VERIFIED_LINKS } from "@/data/projects";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction and Overview"
      className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24"
    >
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[480px] w-[600px] rounded-full bg-cyan-neon/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Narrative & Clear Positioning */}
          <div className="space-y-6">
            {/* Eyebrow & Status */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-3 py-1 font-mono text-xs text-zinc-400">
                <span className="text-cyan-neon font-semibold">// 00</span>
                <span>TANMAY KOTAK &mdash; PUNE, IN</span>
              </div>

              {/* Status Chip */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-neon/30 bg-emerald-dim px-3 py-1 text-xs font-mono text-emerald-neon">
                <span className="h-2 w-2 rounded-full bg-emerald-neon animate-pulse" />
                <span>Open to SDE / Backend / AI Engineer internships &middot; Graduating June 2027</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-[1.08]">
              I build backends that hold up, and AI systems that do real work.
            </h1>

            {/* Subline */}
            <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              Fourth-year Computer Engineering student building production APIs, SAP-integrated enterprise systems, RAG pipelines, and agentic AI tooling with Python, TypeScript, and Node.js.
            </p>

            {/* CTAs and Social Handles */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-md bg-cyan-neon px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                <span>View work</span>
                <ArrowDown className="h-4 w-4" />
              </Link>

              <a
                href={VERIFIED_LINKS.resumePdf}
                download
                className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200 transition hover:border-cyan-neon hover:text-cyan-neon"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span>Download resume</span>
              </a>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href={VERIFIED_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-base-border bg-base-card text-zinc-400 transition hover:border-cyan-neon hover:text-cyan-neon"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>

                <a
                  href={VERIFIED_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-base-border bg-base-card text-zinc-400 transition hover:border-cyan-neon hover:text-cyan-neon"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Signature System Trace Visual */}
          <div className="w-full">
            <SystemTraceVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
