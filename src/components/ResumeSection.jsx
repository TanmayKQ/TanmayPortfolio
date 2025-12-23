export function ResumeSection() {
  return (
    <section id="resume" className="border-b border-white/5 bg-black py-16 md:py-20">
      <div className="section-container">
        <div className="card-surface flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Resume
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Resume
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              I specialize in clean UI, optimized backend systems, and practical AI applications.
            </p>
          </div>
          <div>
            <a
              href="/Tanmay_Kotak_Resume.pdf"
              download
              className="inline-flex items-center rounded-full border border-[#A970FF]/90 bg-[#A970FF]/15 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[#A970FF] transition hover:bg-[#A970FF]/25"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}


