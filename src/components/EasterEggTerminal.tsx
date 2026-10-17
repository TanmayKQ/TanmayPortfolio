"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { PROJECTS, EXPERIENCE, VERIFIED_LINKS } from "@/data/projects";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export function EasterEggTerminal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "init",
      output: (
        <div className="text-zinc-400 space-y-1">
          <p className="text-accent-light font-semibold">Tanmay Kotak Interactive Console</p>
          <p className="text-zinc-300">Open to SDE / Backend / AI Engineer internships and full-time roles.</p>
          <p>Type <span className="text-accent-light font-bold">help</span> to view available commands.</p>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [...prev, raw]);
    setCmdHistoryIdx(-1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-accent-light font-bold">Available Commands:</p>
            <p><span className="text-accent-light font-mono w-24 inline-block">whoami</span> &mdash; Profile, education, and availability</p>
            <p><span className="text-accent-light font-mono w-24 inline-block">projects</span> &mdash; List active engineering projects &amp; stack</p>
            <p><span className="text-accent-light font-mono w-24 inline-block">experience</span> &mdash; View Krios Info Solutions internship summary</p>
            <p><span className="text-accent-light font-mono w-24 inline-block">contact</span> &mdash; Output verified contact endpoints</p>
            <p><span className="text-accent-light font-mono w-24 inline-block">resume</span> &mdash; Trigger direct download of TanmayKotakResume.pdf</p>
            <p><span className="text-accent-light font-mono w-24 inline-block">clear</span> &mdash; Clear current terminal buffer</p>
            <p><span className="text-accent-light font-mono w-24 inline-block">exit</span> &mdash; Close this terminal window</p>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-accent-light font-semibold">Tanmay Kotak</p>
            <p>Role: Backend &amp; Applied AI Engineer</p>
            <p>Education: B.E. Computer Engineering, D.Y. Patil College of Engineering, Akurdi, Pune (Graduating June 2027)</p>
            <p>Status: Open to SDE / Backend / AI Engineer internships and full-time roles</p>
            <p>Location: Pune, Maharashtra, India</p>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-accent-light font-semibold">Active Engineered Projects:</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.slug} className="border-l-2 border-base-border pl-2 py-0.5">
                <p className="text-white font-bold">0{idx + 1}. {p.title}</p>
                <p className="text-xs text-zinc-400">{p.tagline}</p>
                <p className="text-[11px] text-accent-light font-mono">[{p.stack.join(" · ")}]</p>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        output = (
          <div className="space-y-2 text-zinc-300">
            <p className="text-accent-light font-semibold">Professional Engineering Experience:</p>
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-accent/60 pl-2 py-1">
                <p className="text-white font-bold">{exp.role} &middot; {exp.company}</p>
                <p className="text-xs text-zinc-400">{exp.location} ({exp.period})</p>
                <p className="text-xs text-zinc-300 mt-1">{exp.bullets[0]}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-zinc-300">
            <p className="text-accent-light font-semibold">Verified Contact Endpoints:</p>
            <p>Email: <a href={`mailto:${VERIFIED_LINKS.email}`} className="text-accent-light underline">{VERIFIED_LINKS.email}</a></p>
            <p>GitHub: <a href={VERIFIED_LINKS.github} target="_blank" rel="noreferrer" className="text-accent-light underline">{VERIFIED_LINKS.github}</a></p>
            <p>LinkedIn: <a href={VERIFIED_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-accent-light underline">{VERIFIED_LINKS.linkedin}</a></p>
          </div>
        );
        break;

      case "resume":
        window.open(VERIFIED_LINKS.resumePdf, "_blank");
        output = <p className="text-accent-light">Initiating download of TanmayKotakResume.pdf...</p>;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        output = (
          <p className="text-rose-400">
            Command not recognized: &apos;{raw}&apos;. Type <span className="text-accent-light">help</span> for command directory.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: raw, output }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdHistoryIdx === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIdx - 1);
        setCmdHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdHistoryIdx !== -1) {
        const nextIdx = cmdHistoryIdx + 1;
        if (nextIdx < cmdHistory.length) {
          setCmdHistoryIdx(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setCmdHistoryIdx(-1);
          setInputVal("");
        }
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Terminal Console"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-accent/40 bg-black/95 shadow-2xl overflow-hidden font-mono text-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-base-border bg-base-card px-4 py-2.5">
          <div className="flex items-center gap-2">
            <TerminalIcon className="h-4 w-4 text-accent-light" />
            <span className="font-semibold text-zinc-200">
              tanmay@portfolio:~$ (interactive)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 hidden sm:inline">Press ESC to exit</span>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close terminal"
              className="rounded p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Console Body */}
        <div className="p-4 max-h-[380px] min-h-[260px] overflow-y-auto space-y-3">
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-accent-light">
                <span>tanmay@portfolio:~$</span>
                <span className="text-white">{entry.command}</span>
              </div>
              <div className="pl-4">{entry.output}</div>
            </div>
          ))}

          {/* Prompt line */}
          <div className="flex items-center gap-2 text-accent-light pt-1">
            <span>tanmay@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              aria-label="Terminal command prompt"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white focus:outline-none"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-base-border bg-base-card/50 px-4 py-1.5 text-[10px] text-zinc-500">
          <span>PORTFOLIO CLI SHELL</span>
          <span>Type &apos;help&apos; &middot; Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
