import { GraduationCap } from "lucide-react";

export function Education() {
  const coursework = [
    "Data Structures & Algorithms",
    "Operating Systems",
    "DBMS",
    "Computer Networks",
    "Theory of Computation",
  ];

  return (
    <div className="rounded-2xl border border-base-border bg-base-card p-4 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-base-border pb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-dim text-accent-light shrink-0">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              B.E. in Computer Engineering
            </h3>
            <p className="font-mono text-xs text-zinc-300">
              D.Y. Patil College of Engineering, Akurdi, Pune
            </p>
          </div>
        </div>

        <div className="font-mono text-xs text-zinc-400 rounded-md border border-base-border bg-base-subtle px-2.5 py-1 self-start">
          Aug 2023 &ndash; Jun 2027
        </div>
      </div>

      <div className="mt-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 mb-2">
          Relevant Core Coursework
        </p>
        <div className="flex flex-wrap gap-2">
          {coursework.map((course) => (
            <span
              key={course}
              className="rounded-md border border-base-border bg-base-subtle px-2.5 py-1 font-mono text-xs text-zinc-300"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
