export function Contact() {
  return (
    <section id="contact" className="border-b border-white/5 bg-black py-16 md:py-20">
      <div className="section-container">
        <div className="card-surface flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Contact
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Get In Touch
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-zinc-300 sm:text-[15px]">
              Currently open for SDE / Full-Stack internship opportunities.
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <a
              href="mailto:tanmaykotak22@gmail.com"
              className="block text-zinc-100 underline-offset-4 hover:text-sky-300 hover:underline"
            >
              tanmaykotak22@gmail.com
            </a>
            <p className="text-xs text-zinc-400">Pune, Maharashtra, India</p>
            <div className="flex gap-3 text-[11px]">
              <a
                href="https://github.com/TanmayKQ"
                className="rounded-full border border-white/10 bg-zinc-950 px-3 py-1.5 uppercase tracking-[0.2em] text-zinc-100 transition hover:border-purple-400/80 hover:bg-purple-500/10"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/tanmay-kotak-b3840b282"
                className="rounded-full border border-white/10 bg-zinc-950 px-3 py-1.5 uppercase tracking-[0.2em] text-zinc-100 transition hover:border-sky-400/80 hover:bg-sky-500/10"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


