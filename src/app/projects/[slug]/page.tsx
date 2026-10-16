import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PROJECTS, Project } from "@/data/projects";
import { DocMindRetrievalVisual } from "@/components/visuals/DocMindRetrievalVisual";
import { DevAgentTerminalVisual } from "@/components/visuals/DevAgentTerminalVisual";
import { IntelStudyCircuitVisual } from "@/components/visuals/IntelStudyCircuitVisual";
import { BeautyBangsLighthouseVisual } from "@/components/visuals/BeautyBangsLighthouseVisual";
import { ArrowLeft, ExternalLink, Cpu, GitFork, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.shortTitle} Case Study | Tanmay Kotak`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Architectural Case Study`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const renderVisual = (visualName: string) => {
    switch (visualName) {
      case "DocMindRetrievalVisual":
        return <DocMindRetrievalVisual />;
      case "DevAgentTerminalVisual":
        return <DevAgentTerminalVisual />;
      case "IntelStudyCircuitVisual":
        return <IntelStudyCircuitVisual />;
      case "BeautyBangsLighthouseVisual":
        return <BeautyBangsLighthouseVisual />;
      default:
        return null;
    }
  };

  const otherProjects = PROJECTS.filter((p) => p.slug !== slug);

  return (
    <article className="min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-cyan-neon transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to selected work</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="space-y-4 border-b border-base-border pb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
            <span className="text-cyan-neon font-semibold">// ARCHITECTURAL CASE STUDY</span>
            <span>&middot;</span>
            <span className="uppercase">{project.shortTitle}</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            {project.title}
          </h1>

          <p className="text-base text-zinc-300 sm:text-lg leading-relaxed font-sans">
            {project.tagline}
          </p>

          {/* Stack Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded border border-base-border bg-base-card px-2.5 py-1 font-mono text-xs text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>

          {/* External Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-base-border bg-base-card px-3.5 py-2 font-mono text-xs font-semibold text-zinc-200 hover:border-cyan-neon hover:text-cyan-neon transition"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Source Repository</span>
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-emerald-neon/40 bg-emerald-dim px-3.5 py-2 font-mono text-xs font-semibold text-emerald-neon hover:bg-emerald-neon/20 transition"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visit Live Deployment</span>
              </a>
            )}
          </div>
        </header>

        {/* Signature Interactive Visual */}
        <div className="my-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
              Interactive System Simulator
            </span>
            <span className="font-mono text-[11px] text-cyan-neon">CODE-BUILT &middot; ZERO MOCK IMAGES</span>
          </div>
          {renderVisual(project.visual)}
        </div>

        {/* Optional Screenshot Gallery (renders ONLY when screenshots array has items) */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section className="my-12">
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              Application Gallery
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.screenshots.map((src, i) => (
                <div key={i} className="rounded-xl border border-base-border overflow-hidden bg-base-card">
                  <img
                    src={`/projects/${project.slug}/${src}`}
                    alt={`${project.shortTitle} screen ${i + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Detailed Case Study Sections */}
        {project.caseStudy && (
          <div className="mt-12 space-y-12">
            {/* Problem Section */}
            <section className="rounded-xl border border-base-border bg-base-card p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs text-rose-400 mb-3">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="uppercase tracking-widest font-semibold">01 &mdash; The Engineering Problem</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                What broke or failed with naive implementations?
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {project.caseStudy.problem}
              </p>
            </section>

            {/* Approach Section */}
            <section className="rounded-xl border border-base-border bg-base-card p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-neon mb-3">
                <span className="h-2 w-2 rounded-full bg-cyan-neon" />
                <span className="uppercase tracking-widest font-semibold">02 &mdash; Technical Approach</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-3">
                Architectural strategy & design decisions
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {project.caseStudy.approach}
              </p>
            </section>

            {/* Architecture Flow Diagram */}
            <section className="rounded-xl border border-base-border bg-base-subtle/80 p-6 sm:p-8 font-mono">
              <div className="flex items-center gap-2 text-xs text-emerald-neon mb-3">
                <Cpu className="h-4 w-4" />
                <span className="uppercase tracking-widest font-semibold">03 &mdash; System Pipeline Architecture</span>
              </div>
              <h2 className="font-display text-xl font-bold text-white mb-4">
                Dataflow & Component Interconnect
              </h2>
              <div className="rounded-lg border border-base-border bg-black/80 p-4 text-xs text-cyan-neon leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {project.caseStudy.architecture}
              </div>
            </section>

            {/* Key Decisions and Trade-offs */}
            <section className="rounded-xl border border-base-border bg-base-card p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs text-amber-neon mb-3">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="uppercase tracking-widest font-semibold">04 &mdash; Trade-offs & Engineering Decisions</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-6">
                Why this choice over the alternatives?
              </h2>
              <div className="space-y-4">
                {project.caseStudy.keyDecisions.map((decision, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-start gap-3 rounded-lg border border-base-border bg-base-subtle/50 p-4"
                  >
                    <CheckCircle2 className="h-4 w-4 text-cyan-neon shrink-0 mt-0.5" />
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {decision}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* What I'd do next */}
            <section className="rounded-xl border border-base-border bg-base-card p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-3">
                <GitFork className="h-4 w-4 text-cyan-neon" />
                <span className="uppercase tracking-widest font-semibold">05 &mdash; Future Roadmap</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-4">
                What I would improve in subsequent iterations
              </h2>
              <ul className="space-y-3">
                {project.caseStudy.whatNext.map((item, nIdx) => (
                  <li key={nIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-neon shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {/* Other Projects Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-base-border">
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500 mb-4">
            Explore other case studies
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {otherProjects.map((other) => (
              <Link
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="group flex flex-col justify-between rounded-lg border border-base-border bg-base-card p-4 transition hover:border-cyan-neon/60 hover:bg-base-subtle"
              >
                <div>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">CASE STUDY</span>
                  <p className="font-display text-sm font-semibold text-white group-hover:text-cyan-neon transition-colors mt-1">
                    {other.shortTitle}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 font-mono text-xs text-cyan-neon">
                  <span>Read</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
