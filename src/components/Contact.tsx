"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowDownToLine, ExternalLink, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { VERIFIED_LINKS } from "@/data/projects";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(VERIFIED_LINKS.email);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement("textarea");
        textArea.value = VERIFIED_LINKS.email;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setValidationError("Failed to copy automatically. Please copy the address manually.");
    }
  };

  const handleLaunchMailClient = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const trimmedSubject = subject.trim();
    const trimmedBody = body.trim();

    if (!trimmedSubject && !trimmedBody) {
      setValidationError("Please enter a subject or message to compose your email.");
      return;
    }

    const finalSubject = trimmedSubject || "Engineering Opportunity / Discussion";
    const mailtoUrl = `mailto:${VERIFIED_LINKS.email}?subject=${encodeURIComponent(
      finalSubject
    )}&body=${encodeURIComponent(trimmedBody)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <section
      id="contact"
      aria-label="Contact Information"
      className="py-16 md:py-24 border-t border-base-border"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Narrative & Direct Contact Info (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="text-accent-light font-semibold">// 05</span>
              <span className="uppercase tracking-[0.2em]">Contact &amp; Ingress</span>
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Let&apos;s build systems that hold up.
            </h2>

            <p className="text-base text-zinc-300 sm:text-lg leading-relaxed max-w-xl font-sans">
              I am actively seeking SDE, Backend, and AI Engineer internships and full-time engineering roles. Whether you have an open position, an architectural challenge, or want to discuss enterprise systems and RAG pipelines, I would be glad to connect.
            </p>

            {/* Email Address Card with Copy Action */}
            <div className="rounded-xl border border-base-border bg-base-card p-5 space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                Direct Email Endpoint
              </span>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${VERIFIED_LINKS.email}`}
                  className="font-mono text-base font-semibold text-white hover:text-accent-light transition-colors"
                >
                  {VERIFIED_LINKS.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  aria-label="Copy email address to clipboard"
                  className="inline-flex items-center gap-1.5 rounded-md border border-base-border bg-base-subtle px-3 py-1.5 font-mono text-xs font-medium text-zinc-200 hover:border-accent hover:text-accent-light transition min-h-[36px]"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-neon" />
                      <span className="text-emerald-neon font-semibold">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Accessible Announcement for copy action */}
              <div aria-live="polite" className="sr-only">
                {copied && "Email address tanmaykotak22@gmail.com copied to clipboard."}
              </div>
            </div>

            {/* Social and Resume Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={VERIFIED_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-4 py-2.5 font-mono text-xs font-medium text-zinc-200 hover:border-accent hover:text-accent-light transition"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub (TanmayKQ)</span>
              </a>

              <a
                href={VERIFIED_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-4 py-2.5 font-mono text-xs font-medium text-zinc-200 hover:border-accent hover:text-accent-light transition"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={VERIFIED_LINKS.resumePdf}
                download
                className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent-dim px-4 py-2.5 font-mono text-xs font-semibold text-accent-light hover:bg-accent/20 transition"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Mail Client Composer Form (5 cols) */}
          <div className="rounded-2xl border border-base-border bg-base-card p-6 sm:p-7 lg:col-span-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-base-border pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-light" />
                <span className="font-semibold text-white">COMPOSE VIA MAIL CLIENT</span>
              </div>
              <span className="text-[10px] text-zinc-400">NATIVE MAILTO</span>
            </div>

            <p className="font-sans text-xs text-zinc-400 mb-4 leading-relaxed">
              Fill in your topic to open a pre-addressed draft in your default email client (Gmail, Apple Mail, Outlook).
            </p>

            <form onSubmit={handleLaunchMailClient} className="space-y-4">
              <div>
                <label htmlFor="contact-subject" className="block text-zinc-300 mb-1 font-mono text-[11px]">
                  Subject / Role
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="e.g. SDE Internship Opportunity"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  className="w-full rounded-md border border-base-border bg-base-subtle px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-body" className="block text-zinc-300 mb-1 font-mono text-[11px]">
                  Message Body
                </label>
                <textarea
                  id="contact-body"
                  rows={4}
                  placeholder="Hi Tanmay, saw your Krios supply-chain work and DocMind architecture..."
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  className="w-full rounded-md border border-base-border bg-base-subtle px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:border-accent focus:outline-none resize-none font-sans text-xs"
                />
              </div>

              {validationError && (
                <div className="flex items-center gap-2 rounded border border-rose-500/40 bg-rose-500/10 p-2 text-rose-300 text-[11px]">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-400" />
                  <span>{validationError}</span>
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-accent py-2.5 font-bold uppercase tracking-wider text-white hover:bg-accent-light transition"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open in Mail Client</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
