import { useRef } from 'react';
import clsx from 'clsx';
import { GitHubIcon, LockIcon } from './icons.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const SPAN_PATTERN = [
  'md:col-span-2 md:row-span-2',
  '',
  '',
  'md:col-span-2',
  '',
  'md:row-span-2',
  '',
  '',
  'md:col-span-2',
  '',
  '',
  '',
  'md:col-span-2 md:row-span-2',
  '',
  '',
  'md:col-span-2',
  '',
  '',
];

export default function BentoCard({ p, index, onOpen }) {
  const card = useRef(null);
  const reduced = useReducedMotion();

  const onMove = (e) => {
    if (reduced || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.current.style.setProperty('--spot-x', `${x * 100}%`);
    card.current.style.setProperty('--spot-y', `${y * 100}%`);
    const rotY = (x - 0.5) * 8;
    const rotX = (0.5 - y) * 8;
    card.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    if (!card.current) return;
    card.current.style.transform = '';
  };

  const span = SPAN_PATTERN[index % SPAN_PATTERN.length];

  return (
    <article
      ref={card}
      data-reveal
      className={clsx(
        'bento-card group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white/40 p-6 shadow-sm backdrop-blur-md transition dark:border-white/10 dark:bg-white/[0.04]',
        span,
      )}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="bento-spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <div className="relative z-[1] flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="chip !border-brand-500/30 !bg-brand-500/10 !text-brand-700 dark:!text-brand-300">{p.category}</span>
          {p.repo ? (
            <span className="chip">Open source</span>
          ) : (
            <span className="chip gap-1" title="Client or company work; source is private">
              <LockIcon className="h-3 w-3" /> Case study
            </span>
          )}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{p.title}</h3>
        {p.context && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{p.context}</p>}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">{p.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.stack.slice(0, 4).map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
          {p.stack.length > 4 && <li className="chip">+{p.stack.length - 4}</li>}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={() => onOpen(p)} className="text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300" data-cursor-grow>
            View case study
          </button>
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-300" data-cursor-grow>
              <GitHubIcon className="h-3.5 w-3.5" /> Source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
