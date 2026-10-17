"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { X, ExternalLink, ArrowDownToLine, FileText, Maximize2 } from "lucide-react";
import { VERIFIED_LINKS } from "@/data/projects";

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType>({
  isOpen: false,
  openResumeModal: () => {},
  closeResumeModal: () => {},
});

export function useResumeModal() {
  return useContext(ResumeModalContext);
}

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = () => setIsOpen(true);
  const closeResumeModal = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeResumeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResumeModal, closeResumeModal }}>
      {children}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Resume Preview Modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={closeResumeModal}
        >
          <div
            className="flex flex-col w-full max-w-5xl h-[92vh] rounded-2xl border border-base-border bg-base-dark shadow-2xl overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-base-border bg-base-card px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-accent-dim text-accent-light">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-white leading-tight">
                    Tanmay Kotak &mdash; Resume
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    PDF Document Preview
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={VERIFIED_LINKS.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-subtle px-3 py-1.5 text-xs text-zinc-300 hover:border-accent hover:text-accent-light transition"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open in Tab</span>
                </a>

                <a
                  href={VERIFIED_LINKS.resumePdf}
                  download="TanmayKotakResume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-light transition"
                >
                  <ArrowDownToLine className="h-3.5 w-3.5" />
                  <span className="hidden xs:inline">Download</span>
                </a>

                <button
                  onClick={closeResumeModal}
                  type="button"
                  aria-label="Close resume preview"
                  className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition ml-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="relative flex-1 bg-zinc-950 overflow-hidden">
              <iframe
                src={`${VERIFIED_LINKS.resumePdf}#view=FitH`}
                title="Tanmay Kotak Resume Preview"
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer with hint */}
            <div className="flex items-center justify-between border-t border-base-border bg-base-card/80 px-4 py-2 text-[11px] text-zinc-400">
              <span>Tanmay Kotak &middot; Computer Engineering &middot; D.Y. Patil CoE Pune</span>
              <span className="hidden sm:inline">Press ESC to exit preview</span>
            </div>
          </div>
        </div>
      )}
    </ResumeModalContext.Provider>
  );
}
