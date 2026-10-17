"use client";

import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { VERIFIED_LINKS } from "@/data/projects";

export function Footer() {
  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <footer className="border-t border-base-border bg-base-card py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs font-mono text-zinc-400">
          <div className="space-y-1">
            <p className="font-semibold text-zinc-200">
              Tanmay Kotak &middot; 2026
            </p>
            <p className="text-[11px] text-zinc-400">
              Built with Next.js, TypeScript and Tailwind CSS. Statically exported.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
            <a
              href={VERIFIED_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-base-border bg-base-subtle/50 text-zinc-400 hover:text-accent-light hover:border-accent transition"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={VERIFIED_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-base-border bg-base-subtle/50 text-zinc-400 hover:text-accent-light hover:border-accent transition"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${VERIFIED_LINKS.email}`}
              aria-label="Send direct email"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-base-border bg-base-subtle/50 text-zinc-400 hover:text-accent-light hover:border-accent transition"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Scroll back to top of page"
              className="flex h-9 items-center gap-1.5 rounded-md border border-base-border bg-base-subtle px-3 text-xs text-zinc-300 hover:border-accent hover:text-accent-light transition ml-auto sm:ml-0"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
