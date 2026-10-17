import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ArrowDownToLine, ExternalLink, FileText } from "lucide-react";
import { VERIFIED_LINKS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Resume Preview",
  description: "View and preview Tanmay Kotak's software engineering resume.",
  alternates: {
    canonical: `${VERIFIED_LINKS.portfolio}/resume/`,
  },
};

export default function ResumePage() {
  return (
    <div className="flex flex-col min-h-screen bg-base-dark font-mono">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-base-border bg-base-dark/90 backdrop-blur px-4 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-card px-3 py-1.5 text-xs text-zinc-300 hover:border-accent hover:text-accent-light transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to portfolio</span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 border-l border-base-border pl-3">
            <FileText className="h-3.5 w-3.5 text-accent-light" />
            <span className="text-white font-medium">TanmayKotakResume.pdf</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={VERIFIED_LINKS.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-card px-3 py-1.5 text-xs text-zinc-300 hover:border-accent hover:text-accent-light transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Open Raw PDF</span>
          </a>

          <a
            href={VERIFIED_LINKS.resumePdf}
            download="TanmayKotakResume.pdf"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-accent-light transition shadow-sm"
          >
            <ArrowDownToLine className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* Mobile helper notice */}
      <div className="flex sm:hidden items-center justify-between px-4 py-2 bg-base-card border-b border-base-border text-[11px] text-zinc-400">
        <span>Viewing on mobile?</span>
        <a
          href={VERIFIED_LINKS.resumePdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-light underline font-medium"
        >
          Open in native viewer &rarr;
        </a>
      </div>

      {/* Main Preview Container */}
      <main className="flex-1 w-full bg-zinc-950 flex flex-col">
        <iframe
          src={`${VERIFIED_LINKS.resumePdf}#view=FitH`}
          title="Tanmay Kotak Resume Document Preview"
          className="w-full flex-1 border-0 min-h-[calc(100vh-57px)]"
        />
      </main>
    </div>
  );
}
