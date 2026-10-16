"use client";

import { useEffect, useState, useRef } from "react";
import { PROOF_STATS } from "@/data/projects";

function StatCounter({
  target,
  suffix,
  duration = 1400,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setCount(target);
      return;
    }

    let start = 0;
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  return (
    <div ref={elementRef} className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">
      <span className="text-cyan-neon">{count}</span>
      <span className="text-zinc-400">{suffix}</span>
    </div>
  );
}

export function ProofStrip() {
  return (
    <div className="w-full border-y border-base-border bg-base-card/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-neon" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">
            Verified Engineering Metrics
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {PROOF_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border-l border-base-border pl-4 transition-colors hover:border-cyan-neon/60"
            >
              <StatCounter target={stat.value} suffix={stat.suffix} />
              <div className="mt-2">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-200">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-zinc-300">
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
