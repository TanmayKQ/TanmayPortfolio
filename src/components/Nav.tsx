"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Terminal, Command, Menu, X, ArrowDownToLine } from "lucide-react";
import { VERIFIED_LINKS } from "@/data/projects";

interface NavProps {
  onOpenCommandPalette?: () => void;
  onOpenTerminal?: () => void;
}

export function Nav({ onOpenCommandPalette, onOpenTerminal }: NavProps) {
  const [logoClicks, setLogoClicks] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    if (newCount >= 3) {
      setLogoClicks(0);
      onOpenTerminal?.();
    } else {
      setLogoClicks(newCount);
      setTimeout(() => setLogoClicks(0), 1200);
    }
  };

  const navLinks = [
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "Skills", href: "/#skills" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "border-b border-base-border bg-base-dark/90 backdrop-blur-md py-3 shadow-md shadow-black/20"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo with Easter Egg Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogoClick}
            type="button"
            title="Click 3x or press ~ to open system console"
            className="group flex items-center gap-2 text-left font-mono text-sm tracking-tight text-zinc-100 transition focus-visible:outline-none"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded border border-base-border bg-base-card font-mono text-xs font-semibold text-cyan-neon shadow-sm transition group-hover:border-cyan-neon group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)]">
              TK
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="font-display font-medium text-white group-hover:text-cyan-neon transition-colors">
                  Tanmay Kotak
                </span>
                <span className="rounded bg-cyan-dim px-1.5 py-0.5 text-[10px] font-mono text-cyan-neon">
                  v2.0
                </span>
              </div>
            </div>
          </button>

          {/* Availability Status Dot */}
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-base-border bg-base-card/80 px-2.5 py-1 text-[11px] font-mono text-zinc-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-neon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-neon" />
            </span>
            <span>Open to internships</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-cyan-neon"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            type="button"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
            className="hidden sm:flex items-center gap-1.5 rounded-md border border-base-border bg-base-card px-2.5 py-1.5 text-xs font-mono text-zinc-400 transition hover:border-cyan-neon hover:text-cyan-neon"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="text-[10px] tracking-widest text-zinc-500">⌘K</span>
          </button>

          {/* Hidden Terminal Trigger Icon */}
          <button
            onClick={onOpenTerminal}
            type="button"
            title="Open Interactive Terminal (~)"
            aria-label="Open Interactive Terminal"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-base-border bg-base-card text-zinc-400 transition hover:border-cyan-neon hover:text-cyan-neon"
          >
            <Terminal className="h-4 w-4" />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Resume Download CTA */}
          <a
            href={VERIFIED_LINKS.resumePdf}
            download
            className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-cyan-neon/40 bg-cyan-dim px-3 py-1.5 text-xs font-mono font-medium text-cyan-neon transition hover:border-cyan-neon hover:bg-cyan-neon/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]"
          >
            <ArrowDownToLine className="h-3.5 w-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-base-border bg-base-card text-zinc-300 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-base-border bg-base-dark/95 px-4 py-4 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-2 border-b border-base-border text-xs font-mono text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-neon" />
              <span>Open to SDE / Backend internships</span>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-sm font-mono tracking-wider text-zinc-200 hover:text-cyan-neon"
              >
                // {link.label}
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={VERIFIED_LINKS.resumePdf}
                download
                className="flex items-center justify-center gap-2 rounded border border-cyan-neon/50 bg-cyan-dim py-2 font-mono text-xs text-cyan-neon"
              >
                <ArrowDownToLine className="h-3.5 w-3.5" />
                Download Resume (PDF)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette?.();
                }}
                className="flex items-center justify-center gap-2 rounded border border-base-border bg-base-card py-2 font-mono text-xs text-zinc-300"
              >
                <Command className="h-3.5 w-3.5" />
                Open Command Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
