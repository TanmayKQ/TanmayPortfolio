const SKILL_CATEGORIES = {
  Languages: ["Java", "C++", "Python"],
  Frontend: ["React.js", "TailwindCSS", "HTML", "CSS"],
  Backend: ["Node.js", "Express.js", "FastAPI"],
  Databases: ["MongoDB", "Firebase", "MySQL"],
  "AI/ML": ["HuggingFace Transformers", "Scikit-learn", "Pandas"],
  Tools: ["Git", "Vercel", "Netlify", "Render", "Heroku"]
};

export function Skills() {
  return (
    <section id="skills" className="border-b border-white/5 bg-black py-16 md:py-20">
      <div className="section-container space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Skills
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Skills &amp; Tools
            </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(SKILL_CATEGORIES).map(([category, items]) => (
            <article
              key={category}
              className="card-surface flex flex-col gap-3 p-5 sm:p-6"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-zinc-400">
                {category}
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-zinc-100">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-zinc-950/70 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


