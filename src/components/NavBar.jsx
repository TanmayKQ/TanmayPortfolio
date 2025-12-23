import avatarImage from "/IMG-20251114-WA0081.jpg";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" }
];

export function NavBar() {
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/85 backdrop-blur">
      <nav className="section-container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <img
            src={avatarImage}
            alt="Tanmay Kotak portrait"
            className="h-8 w-8 rounded-full object-cover object-center shadow-[0_0_18px_rgba(169,112,255,0.35)]"
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">Tanmay Kotak</p>
            <p className="text-[11px] text-zinc-400 tracking-[0.2em] uppercase">
            Delivering Full-Stack Solutions Backed by Intelligent Systems
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[11px] font-medium text-zinc-300">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className="uppercase tracking-[0.2em] hover:text-[#5F9FFF] transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}


