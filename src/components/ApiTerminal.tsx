"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Copy, Check, Terminal } from "lucide-react";
import {
  PROFILE_ME,
  PROFILE_PROJECTS,
  PROFILE_EXPERIENCE,
  PROFILE_CONTACT,
} from "@/data/profile";

type ApiTab = "me" | "projects" | "experience" | "contact";

const TAB_DATA: Record<ApiTab, { file: string; data: unknown }> = {
  me: {
    file: "me.json",
    data: PROFILE_ME,
  },
  projects: {
    file: "projects.json",
    data: PROFILE_PROJECTS,
  },
  experience: {
    file: "experience.json",
    data: PROFILE_EXPERIENCE,
  },
  contact: {
    file: "contact.json",
    data: PROFILE_CONTACT,
  },
};

const BASE_URL = "https://tanmay-devprofile.vercel.app";

function formatJsonLines(data: unknown): string[] {
  const jsonStr = JSON.stringify(data, null, 2);
  return jsonStr.split("\n");
}

function renderHighlightedLine(line: string, lineKey: string | number) {
  // Regex to extract indent, key, and value
  const match = line.match(/^(\s*)("[\w\-_]+"):\s*(.*)$/);

  if (match) {
    const [, indent, key, rawVal] = match;

    // Check if rawVal ends with comma
    const hasComma = rawVal.endsWith(",");
    const valWithoutComma = hasComma ? rawVal.slice(0, -1).trim() : rawVal.trim();

    return (
      <div key={lineKey} className="leading-relaxed">
        <span>{indent}</span>
        <span className="text-accent-light font-medium">{key}</span>
        <span className="text-zinc-500">: </span>
        {renderJsonValue(valWithoutComma)}
        {hasComma && <span className="text-zinc-500">,</span>}
      </div>
    );
  }

  // Handle array of strings or simple values e.g. "SDE", or structural brackets
  const arrayStringMatch = line.match(/^(\s*)("(?:[^"\\]|\\.)*")(,?)$/);
  if (arrayStringMatch) {
    const [, indent, strVal, comma] = arrayStringMatch;
    return (
      <div key={lineKey} className="leading-relaxed">
        <span>{indent}</span>
        {renderJsonValue(strVal)}
        {comma && <span className="text-zinc-500">{comma}</span>}
      </div>
    );
  }

  // Bracket or structural line (e.g. { or } or [ or ])
  return (
    <div key={lineKey} className="text-zinc-500 leading-relaxed">
      {line}
    </div>
  );
}

function renderJsonValue(rawVal: string) {
  // String check
  if (rawVal.startsWith('"') && rawVal.endsWith('"')) {
    const text = rawVal.slice(1, -1);
    if (text.startsWith("http://") || text.startsWith("https://") || text.startsWith("mailto:")) {
      return (
        <span>
          <span className="text-zinc-400">&quot;</span>
          <a
            href={text}
            target={text.startsWith("mailto:") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            className="text-accent-light underline underline-offset-2 hover:text-white transition-colors"
          >
            {text}
          </a>
          <span className="text-zinc-400">&quot;</span>
        </span>
      );
    }
    return <span className="text-zinc-300">&quot;{text}&quot;</span>;
  }

  // Number check
  if (/^-?\d+(\.\d+)?$/.test(rawVal)) {
    return <span className="text-amber-400">{rawVal}</span>;
  }

  // Boolean or null
  if (rawVal === "true" || rawVal === "false") {
    return <span className="text-emerald-neon">{rawVal}</span>;
  }
  if (rawVal === "null") {
    return <span className="text-rose-400">{rawVal}</span>;
  }

  return <span className="text-zinc-400">{rawVal}</span>;
}

export function ApiTerminal() {
  const [activeTab, setActiveTab] = useState<ApiTab>("me");
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLineCount, setVisibleLineCount] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const animationRef = useRef<{
    charTimer?: NodeJS.Timeout;
    lineTimer?: NodeJS.Timeout;
  }>({});

  const currentCommand = `curl -s ${BASE_URL}/api/${TAB_DATA[activeTab].file} | jq`;
  const currentLines = formatJsonLines(TAB_DATA[activeTab].data);

  // Clear running timers
  const clearTimers = () => {
    if (animationRef.current.charTimer) clearTimeout(animationRef.current.charTimer);
    if (animationRef.current.lineTimer) clearInterval(animationRef.current.lineTimer);
  };

  useEffect(() => {
    setIsMounted(true);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTypedCommand(currentCommand);
      setVisibleLineCount(currentLines.length);
      setIsTyping(false);
      return;
    }

    clearTimers();
    setTypedCommand("");
    setVisibleLineCount(0);
    setIsTyping(true);

    // Initial load speed vs subsequent tab switch speed
    const isInitial = !isMounted;
    const charSpeed = isInitial ? 28 : 12;
    const lineSpeed = isInitial ? 35 : 18;

    let charIdx = 0;
    const targetCmd = currentCommand;

    const typeNextChar = () => {
      if (charIdx < targetCmd.length) {
        charIdx++;
        setTypedCommand(targetCmd.slice(0, charIdx));
        animationRef.current.charTimer = setTimeout(typeNextChar, charSpeed);
      } else {
        // Command finished typing -> reveal lines
        let lineIdx = 0;
        animationRef.current.lineTimer = setInterval(() => {
          lineIdx++;
          setVisibleLineCount(lineIdx);
          if (lineIdx >= currentLines.length) {
            clearInterval(animationRef.current.lineTimer);
            setIsTyping(false);
          }
        }, lineSpeed);
      }
    };

    typeNextChar();

    return () => clearTimers();
  }, [activeTab, isMounted]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`$ ${currentCommand}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = `$ ${currentCommand}`;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  const handleKeyDownTab = (e: React.KeyboardEvent, tab: ApiTab) => {
    const tabs: ApiTab[] = ["me", "projects", "experience", "contact"];
    const idx = tabs.indexOf(tab);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextTab = tabs[(idx + 1) % tabs.length];
      setActiveTab(nextTab);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevTab = tabs[(idx - 1 + tabs.length) % tabs.length];
      setActiveTab(prevTab);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Top Profile Status Chip */}
      <div className="inline-flex items-center gap-2.5 sm:gap-3 rounded-2xl sm:rounded-full border border-base-border bg-base-card/90 px-3 py-2 sm:px-3.5 sm:py-1.5 shadow-sm max-w-full">
        <div className="relative h-8 w-8 sm:h-9 sm:w-9 shrink-0 overflow-hidden rounded-full border border-accent/40 bg-base-subtle">
          <Image
            src="/IMG-20251114-WA0081.jpg"
            alt="Tanmay Kotak"
            width={36}
            height={36}
            className="h-full w-full object-cover grayscale contrast-110"
            priority
          />
        </div>
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2 w-2 rounded-full bg-emerald-neon animate-pulse shrink-0" />
          <span className="font-mono text-[11px] sm:text-xs text-zinc-200 leading-snug">
            Open to SDE / Backend / AI Engineer internships and full-time roles
          </span>
        </div>
      </div>

      {/* ApiTerminal Window */}
      <div
        role="region"
        aria-label="Portfolio API Terminal"
        className="rounded-xl border border-base-border bg-base-card shadow-2xl overflow-hidden font-mono text-xs"
      >
        {/* Terminal Chrome Bar */}
        <div className="flex items-center justify-between border-b border-base-border bg-base-subtle/80 px-3 sm:px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-neon/80 inline-block" />
            </div>
            <span className="ml-1 sm:ml-2 font-mono text-[10px] sm:text-[11px] text-zinc-400">
              tanmay@portfolio &mdash; zsh
            </span>
          </div>

          <button
            onClick={handleCopy}
            type="button"
            aria-label="Copy curl command to clipboard"
            className="flex items-center gap-1.5 rounded border border-base-border bg-base-card px-2 py-1 text-[10px] sm:text-[11px] text-zinc-300 hover:border-accent hover:text-accent-light transition"
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3 text-emerald-neon" />
                <span className="text-emerald-neon font-medium">copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>copy curl</span>
              </>
            )}
          </button>
        </div>

        {/* Tab Navigation List */}
        <div
          role="tablist"
          aria-label="API Endpoints"
          className="flex items-center gap-1 border-b border-base-border bg-black/40 px-2 sm:px-3 py-1.5 overflow-x-auto no-scrollbar touch-scroll"
        >
          {(["me", "projects", "experience", "contact"] as ApiTab[]).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                id={`tab-${tab}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`panel-${tab}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={(e) => handleKeyDownTab(e, tab)}
                className={`rounded px-2.5 sm:px-3 py-1 font-mono text-[11px] sm:text-xs transition-colors shrink-0 ${
                  isSelected
                    ? "bg-accent text-white font-medium shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                }`}
              >
                /api/{tab}.json
              </button>
            );
          })}
        </div>

        {/* Terminal Screen Body */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          aria-label={`API response for ${activeTab}`}
          tabIndex={0}
          className="p-3.5 sm:p-5 max-h-[420px] min-h-[280px] sm:min-h-[340px] overflow-y-auto bg-black/90 focus:outline-none touch-scroll"
        >
          {/* Shell Command Prompt Line */}
          <div className="flex items-start gap-2 text-zinc-300 pb-3 border-b border-white/5 break-all sm:break-normal text-[11px] sm:text-xs">
            <span className="text-emerald-neon font-bold shrink-0">$</span>
            <span className="text-white select-all">
              {isMounted ? typedCommand : `$ ${currentCommand}`}
            </span>
            {isTyping && (
              <span className="inline-block w-2 h-3.5 sm:h-4 bg-accent-light animate-pulse align-middle shrink-0" />
            )}
          </div>

          {/* JSON Body (SSR & Hydration safe) */}
          <div className="pt-3 font-mono text-[11px] sm:text-xs leading-relaxed">
            {!isMounted ? (
              // Pre-rendered HTML for search crawlers and non-JS clients
              <pre className="text-zinc-300 whitespace-pre-wrap">
                {JSON.stringify(TAB_DATA.me.data, null, 2)}
              </pre>
            ) : (
              currentLines
                .slice(0, visibleLineCount)
                .map((line, idx) => renderHighlightedLine(line, idx))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
