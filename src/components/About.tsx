import Image from "next/image";
import { Education } from "./Education";
import { MapPin, Target, GraduationCap, Clock, Terminal } from "lucide-react";

export function About() {
  const metadata = [
    { label: "Based in", value: "Pune, India", icon: MapPin },
    { label: "Focus", value: "Backend + Applied AI", icon: Target },
    { label: "Graduating", value: "June 2027", icon: GraduationCap },
    { label: "Looking for", value: "SDE / Backend / AI Engineer internships", icon: Clock },
  ];

  return (
    <section id="about" aria-label="About Tanmay Kotak" className="py-16 md:py-24 border-t border-base-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="text-accent-light font-semibold">// 04</span>
            <span className="uppercase tracking-[0.2em]">Background &amp; Principles</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineering for failure modes first.
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Main Narrative Column (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-2xl border border-base-border bg-base-card p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 pb-2 border-b border-base-border">
                <Terminal className="h-3.5 w-3.5 text-accent-light" />
                <span>ENGINEERING PHILOSOPHY</span>
              </div>

              <blockquote className="text-base text-zinc-200 sm:text-lg leading-relaxed font-sans">
                &ldquo;I&apos;m a fourth-year Computer Engineering student in Pune who likes the parts of software people don&apos;t see: state machines, queues, schemas, retries. This year I built an enterprise supply-chain backend with SAP integrations at Krios, and on my own I build RAG platforms and agentic coding tools. I care about systems that fail safely and can be explained clearly.&rdquo;
              </blockquote>

              <div className="pt-2 text-sm text-zinc-300 leading-relaxed space-y-3 font-sans">
                <p>
                  Most distributed bugs occur at boundaries: between synchronous clients and long-running workers, between LLM completions and execution environments, or during ERP inventory updates.
                </p>
                <p>
                  My goal is building deterministic, defensive software: transactional database migrations, strictly typed schemas, automated recovery loops, and graceful degradations.
                </p>
              </div>
            </div>

            {/* Compact Education Section Embedded Under Narrative */}
            <Education />
          </div>

          {/* Right Column: Photo & Key/Value Side Card (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Real Photo Card */}
            <div className="relative overflow-hidden rounded-2xl border border-base-border bg-base-card p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-base-border bg-base-subtle">
                <img
                  src="/IMG-20251114-WA0081.jpg"
                  alt="Tanmay Kotak"
                  className="h-full w-full object-cover object-center grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[11px] text-zinc-300 flex justify-between items-center">
                  <span className="font-semibold text-white">Tanmay Kotak</span>
                  <span className="text-accent-light">D.Y. Patil CoE, Pune</span>
                </div>
              </div>
            </div>

            {/* Mono Key/Value Side Card */}
            <div className="rounded-2xl border border-base-border bg-base-card p-6 font-mono text-xs">
              <div className="text-[10px] text-zinc-400 uppercase tracking-widest pb-3 border-b border-base-border mb-4">
                Core Profile Metadata
              </div>

              <div className="space-y-3.5">
                {metadata.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-start justify-between gap-4 border-b border-base-border/40 pb-2.5 last:border-b-0 last:pb-0"
                    >
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <Icon className="h-3.5 w-3.5 text-accent-light" />
                        <span>{item.label}:</span>
                      </span>
                      <span className="font-semibold text-right text-zinc-200">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
