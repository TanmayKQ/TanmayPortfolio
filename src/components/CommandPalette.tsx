"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  BookOpen,
  Briefcase,
  Layers,
  User,
  Mail,
  ArrowDownToLine,
  Sun,
  Moon,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { PROJECTS, VERIFIED_LINKS } from "@/data/projects";

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Case Studies" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.contains("light");
    if (isLight) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("tk_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("tk_theme", "light");
    }
    onClose();
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(VERIFIED_LINKS.email);
    onClose();
  };

  const items: CommandItem[] = [
    // Navigation
    {
      id: "nav-work",
      title: "Jump to Selected Work",
      subtitle: "Production backends & applied AI tools",
      category: "Navigation",
      icon: Layers,
      action: () => {
        router.push("/#work");
        onClose();
      },
    },
    {
      id: "nav-exp",
      title: "Jump to Experience",
      subtitle: "Krios enterprise supply-chain internship & freelance",
      category: "Navigation",
      icon: Briefcase,
      action: () => {
        router.push("/#experience");
        onClose();
      },
    },
    {
      id: "nav-skills",
      title: "Jump to Skills",
      subtitle: "Grouped bento grid with verified implementations",
      category: "Navigation",
      icon: Layers,
      action: () => {
        router.push("/#skills");
        onClose();
      },
    },
    {
      id: "nav-about",
      title: "Jump to About & Education",
      subtitle: "Engineering philosophy and coursework",
      category: "Navigation",
      icon: User,
      action: () => {
        router.push("/#about");
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "Jump to Contact",
      subtitle: "Initiate ingress, copy email or mailto",
      category: "Navigation",
      icon: Mail,
      action: () => {
        router.push("/#contact");
        onClose();
      },
    },

    // Case studies
    ...PROJECTS.map(
      (p): CommandItem => ({
        id: `cs-${p.slug}`,
        title: `${p.shortTitle} Case Study`,
        subtitle: p.tagline,
        category: "Case Studies",
        icon: BookOpen,
        action: () => {
          router.push(`/projects/${p.slug}`);
          onClose();
        },
      })
    ),

    // Actions
    {
      id: "act-copy-email",
      title: "Copy Email Address",
      subtitle: VERIFIED_LINKS.email,
      category: "Actions",
      icon: Mail,
      action: copyEmail,
    },
    {
      id: "act-resume",
      title: "Download Resume (PDF)",
      subtitle: "Direct download of Tanmay Kotak's resume",
      category: "Actions",
      icon: ArrowDownToLine,
      action: () => {
        window.open(VERIFIED_LINKS.resumePdf, "_blank");
        onClose();
      },
    },
    {
      id: "act-github",
      title: "Open GitHub Profile",
      subtitle: VERIFIED_LINKS.github,
      category: "Actions",
      icon: GithubIcon,
      action: () => {
        window.open(VERIFIED_LINKS.github, "_blank");
        onClose();
      },
    },
    {
      id: "act-linkedin",
      title: "Open LinkedIn Profile",
      subtitle: VERIFIED_LINKS.linkedin,
      category: "Actions",
      icon: LinkedinIcon,
      action: () => {
        window.open(VERIFIED_LINKS.linkedin, "_blank");
        onClose();
      },
    },
    {
      id: "act-theme",
      title: "Toggle Light / Dark Theme",
      subtitle: "Switch appearance mode",
      category: "Actions",
      icon: Sun,
      action: toggleTheme,
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl border border-base-border bg-base-card shadow-2xl overflow-hidden font-mono text-xs animate-in fade-in-50 zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-base-border px-4 py-3 bg-base-subtle/80">
          <Search className="h-4 w-4 text-accent-light shrink-0" />
          <input
            ref={inputRef}
            type="text"
            aria-label="Search commands, sections, or case studies"
            placeholder="Type a command, section, or case study..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block rounded border border-base-border px-1.5 py-0.5 text-[10px] text-zinc-500">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-6 text-center text-zinc-500">
              No matching commands or case studies found.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex w-full items-center justify-between rounded-lg p-2.5 text-left transition ${
                    isSelected
                      ? "bg-accent-dim text-white border border-accent/40 shadow-sm"
                      : "text-zinc-300 hover:bg-base-subtle border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded ${
                        isSelected ? "bg-accent/20 text-accent-light" : "bg-base-subtle text-zinc-400"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-[11px] text-zinc-400 truncate max-w-sm">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-base-border bg-base-subtle/50 px-4 py-2 text-[10px] text-zinc-500">
          <div className="flex items-center gap-3">
            <span>&uarr;&darr; Navigate</span>
            <span>&crarr; Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-accent-light">Tanmay Kotak CLI</span>
        </div>
      </div>
    </div>
  );
}
