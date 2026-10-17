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

          <div className="flex items-center gap-4">
            <a
              href={VERIFIED_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-zinc-400 hover:text-accent-light transition"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={VERIFIED_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-zinc-400 hover:text-accent-light transition"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${VERIFIED_LINKS.email}`}
              aria-label="Send direct email"
              className="text-zinc-400 hover:text-accent-light transition"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              type="button"
              aria-label="Scroll back to top of page"
              className="flex items-center gap-1 rounded border border-base-border bg-base-subtle px-2.5 py-1 text-[11px] text-zinc-300 hover:border-accent hover:text-accent-light transition"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
