"use client";

import { useState } from "react";
import { ExternalLink, CheckCircle, Eye, Sparkles, Loader2, Globe, Shield } from "lucide-react";
import { VERIFIED_LINKS } from "@/data/projects";

const LIGHTHOUSE_METRICS = [
  { label: "Performance", score: 100 },
  { label: "Accessibility", score: 98 },
  { label: "Best Practices", score: 100 },
  { label: "SEO", score: 100 },
];

export function BeautyBangsLighthouseVisual() {
  const [loadIframe, setLoadIframe] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <div
      role="region"
      aria-label="Beauty & Bangs Performance Audit and Live Preview"
      className="rounded-xl border border-base-border bg-base-card overflow-hidden shadow-sm font-mono text-xs"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/80 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-emerald-neon" />
          <span className="font-semibold text-zinc-200">
            lighthouse_audit // PRODUCTION VERIFIED: 100/98/100/100
          </span>
        </div>
        <a
          href={VERIFIED_LINKS.beautyandbangsLive}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-accent-light hover:underline font-semibold"
        >
          <span>Visit live site</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Left Column: Lighthouse Score Rings & Checklist */}
        <div className="space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Google Lighthouse Mobile Audit
            </span>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {LIGHTHOUSE_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col items-center justify-center rounded-lg border border-base-border bg-base-subtle/60 p-3 text-center"
                >
                  <div className="relative flex h-14 w-14 items-center justify-center">
                    <svg className="h-14 w-14 -rotate-90 transform" viewBox="0 0 36 36">
                      <path
                        className="text-zinc-800"
                        strokeWidth="3.2"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        stroke="#10b981"
                        strokeDasharray={`${metric.score}, 100`}
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-mono text-sm font-bold text-white">
                      {metric.score}
                    </span>
                  </div>
                  <span className="mt-2 text-[11px] text-zinc-300">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Architecture Checklist */}
          <div className="rounded-lg border border-base-border bg-base-subtle/40 p-4 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">
              Engineering Architecture Checklist
            </span>
            <ul className="mt-3 space-y-2 text-zinc-300 text-[11px]">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-neon shrink-0" />
                <span>Next.js static generation (SSG) with zero runtime server latency</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-neon shrink-0" />
                <span>Zero render-blocking scripts; inlined critical styling</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-neon shrink-0" />
                <span>Modern WebP image assets with explicit dimensions</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-neon shrink-0" />
                <span>Cumulative Layout Shift (CLS) = 0.000 across mobile viewports</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Stylized Browser Frame */}
        <div className="flex flex-col rounded-lg border border-base-border bg-black/90 overflow-hidden shadow-inner min-h-[300px]">
          {/* Browser Address Bar */}
          <div className="flex items-center justify-between border-b border-base-border bg-base-subtle px-3 py-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-600 inline-block" />
              <span className="h-2 w-2 rounded-full bg-zinc-600 inline-block" />
              <span className="h-2 w-2 rounded-full bg-zinc-600 inline-block" />
            </div>
            <div className="flex items-center gap-1 truncate rounded bg-black/60 px-2.5 py-0.5 text-zinc-300 max-w-[240px]">
              <span className="text-emerald-neon">https://</span>
              <span>beautyandbangs.vercel.app</span>
            </div>
            {loadIframe ? (
              <button
                onClick={() => {
                  setLoadIframe(false);
                  setIframeLoading(true);
                }}
                className="text-[10px] text-zinc-400 hover:text-white"
              >
                Close Embed
              </button>
            ) : (
              <span className="text-[10px] text-zinc-500">Static Preview</span>
            )}
          </div>

          {/* Browser Body */}
          <div className="relative flex-1 flex items-center justify-center p-4">
            {loadIframe ? (
              <div className="relative w-full h-full min-h-[280px]">
                {iframeLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/90 z-10">
                    <Loader2 className="h-6 w-6 animate-spin text-accent-light" />
                    <span className="text-xs text-zinc-400">Loading live site from edge CDN...</span>
                  </div>
                )}
                <iframe
                  src={VERIFIED_LINKS.beautyandbangsLive}
                  title="Beauty & Bangs Live Client Preview"
                  onLoad={() => setIframeLoading(false)}
                  className="h-full w-full min-h-[280px] rounded border-0"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-dim border border-accent/30 text-accent-light">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-base">
                    Beauty &amp; Bangs Salon Website
                  </p>
                  <p className="mt-1 text-xs text-zinc-400 max-w-xs font-sans">
                    Production client site built for high-conversion local discovery and sub-second mobile page loads.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={VERIFIED_LINKS.beautyandbangsLive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-accent-light transition"
                  >
                    <span>Open live site</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      setLoadIframe(true);
                      setIframeLoading(true);
                    }}
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-card px-3.5 py-2 text-xs text-zinc-300 hover:border-accent hover:text-accent-light transition"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Load embed preview</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
