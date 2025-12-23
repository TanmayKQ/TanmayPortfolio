const FRONTEND_STACK = ["React.js", "TailwindCSS", "HTML", "CSS", "Node.js", "Express.js"];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-white/5 bg-gradient-to-b from-black via-[#050508] to-black"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 right-[-10%] h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div className="section-container relative flex flex-col items-center gap-10 py-20 md:flex-row md:py-24">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 sm:text-[20px]">
            Tanmay Kotak
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Turning Ideas Into Software
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            I build clean, scalable, and efficient digital products — from full-stack apps to AI-driven tools.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full border border-[#5F9FFF]/70 bg-[#5F9FFF]/10 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[#5F9FFF] transition hover:bg-[#5F9FFF]/20"
            >
              View Projects
            </a>
            <a
              href="/Tanmay_Kotak_Resume.pdf"
              className="inline-flex items-center rounded-full border border-white/10 bg-[#0A0A0A] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:border-[#A970FF]/70 hover:bg-[#A970FF]/10"
              download
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="flex-1">
          <div className="card-surface relative overflow-hidden">
            <div className="relative flex h-full flex-col justify-between gap-6 p-6 sm:p-8">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Featured Stack
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-zinc-200">
                  {FRONTEND_STACK.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-zinc-900/60 px-3 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-xs text-zinc-400">
                <p>{aboutLineOne}</p>
                <p>{aboutLineTwo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const aboutLineOne =
  "Third-year Computer Engineering student and full-stack developer focused on impact-driven software.";

const aboutLineTwo =
  "Specialized in clean interfaces, efficient backends, and practical AI workflows.";


