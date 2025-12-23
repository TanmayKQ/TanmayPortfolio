const ABOUT_TEXT =
  "I'm Tanmay, a third-year Computer Engineering student and full-stack developer focused on building real-world, impact-driven software. I specialize in clean UI, optimized backend systems, and practical AI applications. Currently open for SDE / Full-Stack internship opportunities.";

const HIGHLIGHTS = [
  "Design-first mindset with obsessive attention to detail and motion.",
  "Backend craft anchored in performance, security, and cloud-native reliability.",
  "Hands-on experience developing practical AI features within modern web applications."
];

const METRICS = [
  { label: "Focus", value: "Full-Stack + AI" },
  { label: "Location", value: "Pune, Maharashtra, India" },
  { label: "Availability", value: "SDE / Full-Stack Internships" }
];

export function About() {
  return (
    <section
      id="about"
      className="border-b border-white/5 bg-gradient-to-b from-black via-[#050505] to-black py-16 md:py-24"
    >
      <div className="section-container space-y-10">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">About</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Who I Am
          </h2>
          <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
            {ABOUT_TEXT}
          </p>
        </div>

        <div className="grid gap-6 rounded-3xl border border-white/5 bg-[#0A0A0A]/90 p-6 sm:grid-cols-[1.2fr_minmax(0,0.8fr)] sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
          <div className="space-y-4">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-white/5 bg-black/40 p-4 text-sm text-zinc-200"
              >
                <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-br from-[#A970FF] to-[#5F9FFF]" />
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/5 bg-black/50 p-5">
            {METRICS.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                  {metric.label}
                </p>
                <p className="text-lg font-medium text-white">{metric.value}</p>
              </div>
            ))}

            <a
              href="mailto:tanmaykotak22@gmail.com"
              className="mt-2 inline-flex items-center justify-center rounded-full border border-[#A970FF]/70 bg-[#A970FF]/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.3em] text-[#A970FF] transition hover:bg-[#A970FF]/20"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


