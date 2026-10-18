import content from '../content.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const allSkills = content.skills.flatMap((g) => g.items);

export default function SkillsMarquee() {
  const reduced = useReducedMotion();
  const row = [...allSkills, ...allSkills];

  return (
    <div className="relative mt-14 overflow-hidden" data-reveal aria-hidden={reduced ? undefined : true}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50/90 to-transparent dark:from-[#0b1020]/90" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50/90 to-transparent dark:from-[#0b1020]/90" />
      <div className={reduced ? 'flex flex-wrap justify-center gap-2 px-4' : 'marquee-track flex w-max gap-3'}>
        {row.map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="shrink-0 rounded-full border border-slate-200/80 bg-white/60 px-4 py-2 font-mono text-sm text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            {s}
          </span>
        ))}
      </div>
      <p className="sr-only">Skills: {allSkills.join(', ')}</p>
    </div>
  );
}
