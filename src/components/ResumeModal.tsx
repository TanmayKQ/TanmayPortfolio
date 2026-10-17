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
            className="flex flex-col w-full max-w-5xl h-[94dvh] sm:h-[90vh] rounded-2xl border border-base-border bg-base-dark shadow-2xl overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-base-border bg-base-card px-3 py-2.5 sm:px-6 sm:py-3">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-accent-dim text-accent-light shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-sans text-xs sm:text-sm font-semibold text-white leading-tight truncate">
                    Tanmay Kotak &mdash; Resume
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 truncate">
                    PDF Document Preview
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <a
                  href={VERIFIED_LINKS.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-subtle px-2.5 sm:px-3 py-1.5 text-xs text-zinc-300 hover:border-accent hover:text-accent-light transition"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Open in Tab</span>
                </a>

                <a
                  href={VERIFIED_LINKS.resumePdf}
                  download="TanmayKotakResume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent-light transition"
                >
                  <ArrowDownToLine className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                <button
                  onClick={closeResumeModal}
                  type="button"
                  aria-label="Close resume preview"
                  className="rounded-md p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="relative flex-1 bg-zinc-950 overflow-hidden touch-scroll">
              <iframe
                src={`${VERIFIED_LINKS.resumePdf}#view=FitH`}
                title="Tanmay Kotak Resume Preview"
                className="w-full h-full border-0"
              />
            </div>

            {/* Footer with hint */}
            <div className="flex items-center justify-between border-t border-base-border bg-base-card/80 px-4 py-2 text-[11px] text-zinc-400 gap-2">
              <span className="truncate">
                Tanmay Kotak <span className="hidden sm:inline">&middot; Computer Engineering &middot; D.Y. Patil CoE Pune</span>
              </span>
              <span className="hidden sm:inline shrink-0">Press ESC to exit preview</span>
            </div>
          </div>
        </div>
      )}
    </ResumeModalContext.Provider>
  );
}
