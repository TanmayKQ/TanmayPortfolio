"use client";

import { useEffect, useState, useRef } from "react";
import { PROOF_STATS } from "@/data/projects";

function StatCounter({
  target,
  suffix,
  duration = 1000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(target);
  const [isClient, setIsClient] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(target);
      return;
    }

    let start = 0;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, stepTime);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={elementRef} className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
      <span className="text-accent-light">{isClient ? count : target}</span>
      <span className="text-zinc-400">{suffix}</span>
    </div>
  );
}

export function ProofStrip() {
  return (
    <div className="w-full border-y border-base-border bg-base-card/70">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Verified Project Milestones &middot; Shipped &amp; Defensible
            </span>
          </div>
          <span className="hidden font-mono text-[11px] text-zinc-400 sm:inline">
            Recorded Data
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {PROOF_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border-l border-base-border pl-4 transition-colors hover:border-accent/50"
            >
              <StatCounter target={stat.value} suffix={stat.suffix} />
              <div className="mt-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-zinc-400">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
