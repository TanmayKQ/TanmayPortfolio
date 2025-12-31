const PROJECTS = [
  {
    title: "IntelStudy — AI-Powered Study Assistant",
    stack: ["Next.js", "Tailwind", "FastAPI", "HuggingFace", "Firebase", "MongoDB"],
    description:
      "AI-driven study assistant that converts PDFs into summaries, MCQs, flashcards, and audio notes.",
    highlights: [
      "FastAPI backend for transformer NLP tasks",
      "Secure authentication and cloud storage",
      "Clean and efficient UI"
    ],
    underDevelopment: true, 
    live: null,
    github: "https://github.com/TanmayKQ/IntelStudy.git",
  },
  {
    title: "FantasyBoost — Fantasy Football Recommendation Engine",
    stack: ["Next.js", "FastAPI", "Scikit-learn", "Pandas"],
    description:
      "Machine learning engine for forecasting player performance and generating optimized fantasy squads.",
    highlights: [
      "ML prediction models",
      "Optimization logic following league rules",
      "Real-time dashboard"
    ],
    underDevelopment: true, 
    live: null,
    github: null,
  },
  {
    title: "NutriScan — Smart Food Ingredient Analyzer",
    stack: ["Next.js", "FastAPI", "Nutrition API", "MongoDB"],
    description:
      "Nutrition analyzer for meals and packaged foods with macro/micro breakdown.",
    highlights: [
      "Nutrition API integration",
      "Food scoring model",
      "Clean real-time UI"
    ],
    underDevelopment: true, 
    live: null,
    github: null,
  },
  {
    title: "Beauty & Bangs — Salon Website",
    stack: ["React.js", "TailwindCSS", "Node.js", "Express.js"],
    description: "Modern salon website with clean service browsing UI.",
    highlights: [
      "Minimal UI",
      "React + Tailwind frontend",
      "Node + Express backend structure",
      "Fully responsive"
    ],
    live: "https://beautyandbangs.vercel.app/",
    github: "https://github.com/TanmayKQ/Beauty_N_Bangs"
  }
];

export function Projects() {
  return (
    <section id="projects" className="border-b border-white/5 bg-black py-16 md:py-20">
      <div className="section-container space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Work
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Projects
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="card-surface flex flex-col overflow-hidden"
            >
              <div className="h-28 bg-gradient-to-tr from-purple-500/35 via-black to-sky-500/30" />
              <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
                <div>
                  <h3 className="text-sm font-medium text-white sm:text-base">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-100">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-zinc-950/70 px-2.5 py-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-[7px] h-[2px] w-4 rounded-full bg-purple-400/90" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-2 flex gap-3 text-[11px]">
                  {project.live && (
                    <a
                      href={project.live}
                      className="inline-flex items-center rounded-full border border-sky-400/70 bg-sky-400/10 px-3 py-1.5 uppercase tracking-[0.2em] text-sky-300 transition hover:bg-sky-400/20"
                    >
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      className="inline-flex items-center rounded-full border border-white/10 bg-zinc-950 px-3 py-1.5 uppercase tracking-[0.2em] text-zinc-100 transition hover:border-purple-400/80 hover:bg-purple-500/10"
                    >
                      GitHub
                    </a>
                  )}
                  {project.underDevelopment && (
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-zinc-950 px-3 py-1.5 uppercase tracking-[0.2em] text-zinc-100 transition hover:border-purple-400/80 hover:bg-purple-500/10">
                      Under Development
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


