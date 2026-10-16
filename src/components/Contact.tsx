"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowDownToLine, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { VERIFIED_LINKS } from "@/data/projects";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(VERIFIED_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${VERIFIED_LINKS.email}?subject=${encodeURIComponent(
      subject || "Engineering Opportunity / Discussion"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" aria-label="Contact Information" className="py-16 md:py-24 border-t border-base-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Narrative & Direct Contact Info (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="text-cyan-neon font-semibold">// 05</span>
              <span className="uppercase tracking-[0.2em]">Initiate Ingress</span>
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
              Let&apos;s build something that doesn&apos;t break.
            </h2>

            <p className="text-base text-zinc-300 sm:text-lg leading-relaxed max-w-xl">
              I am actively looking for SDE, Backend, and AI Engineer internships and full-time engineering roles. Whether you have an open team position, a hard backend problem, or want to discuss RAG architectures, I&apos;d love to connect.
            </p>

            {/* Email Copy Card */}
            <div className="rounded-xl border border-base-border bg-base-card p-4 sm:p-5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                Direct Email (Click to copy)
              </span>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${VERIFIED_LINKS.email}`}
                  className="font-mono text-sm sm:text-base font-semibold text-white hover:text-cyan-neon transition-colors"
                >
                  {VERIFIED_LINKS.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-md border border-cyan-neon/40 bg-cyan-dim px-3 py-1.5 font-mono text-xs font-semibold text-cyan-neon hover:bg-cyan-neon/20 transition"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-neon" />
                      <span className="text-emerald-neon">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Links Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={VERIFIED_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-4 py-2.5 font-mono text-xs font-medium text-zinc-200 hover:border-cyan-neon hover:text-cyan-neon transition"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub (TanmayKQ)</span>
              </a>

              <a
                href={VERIFIED_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-4 py-2.5 font-mono text-xs font-medium text-zinc-200 hover:border-cyan-neon hover:text-cyan-neon transition"
              >
                <LinkedinIcon className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={VERIFIED_LINKS.resumePdf}
                download
                className="inline-flex items-center gap-2 rounded-md border border-cyan-neon/40 bg-cyan-dim px-4 py-2.5 font-mono text-xs font-semibold text-cyan-neon hover:bg-cyan-neon/20 transition"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span>Download Resume PDF</span>
              </a>
            </div>
          </div>

          {/* Quick Message Composer (5 cols) */}
          <div className="rounded-2xl border border-base-border bg-base-card p-6 sm:p-8 lg:col-span-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-base-border pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-neon" />
                <span className="font-semibold text-white">DISPATCH MESSAGE</span>
              </div>
              <span className="text-[10px] text-zinc-500">SMTP / MAILTO</span>
            </div>

            <form onSubmit={handleSendMail} className="space-y-4">
              <div>
                <label htmlFor="contact-subject" className="block text-zinc-400 mb-1">
                  Subject / Topic
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Internship opportunity / Backend discussion"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-md border border-base-border bg-base-subtle px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-neon focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="contact-body" className="block text-zinc-400 mb-1">
                  Message
                </label>
                <textarea
                  id="contact-body"
                  rows={4}
                  placeholder="Hi Tanmay, saw your Krios experience and DocMind project..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full rounded-md border border-base-border bg-base-subtle px-3 py-2 text-zinc-200 placeholder:text-zinc-600 focus:border-cyan-neon focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-cyan-neon py-2.5 font-bold uppercase tracking-wider text-black hover:bg-cyan-300 transition shadow-[0_0_15px_rgba(0,240,255,0.25)]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Launch Mail Client</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
