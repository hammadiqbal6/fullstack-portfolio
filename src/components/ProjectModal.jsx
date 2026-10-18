import { useEffect, useRef } from 'react';
import { GitHubIcon, LockIcon } from './icons.jsx';

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;
    const prev = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      if (prev && typeof prev.focus === 'function') prev.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const p = project;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4" role="presentation">
      <button type="button" className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm dark:bg-black/60" aria-label="Close dialog" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-slate-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#12182b]/98 sm:rounded-3xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="chip !border-brand-500/30 !bg-brand-500/10 !text-brand-700 dark:!text-brand-300">{p.category}</span>
              {p.repo ? (
                <span className="chip">Open source</span>
              ) : (
                <span className="chip gap-1">
                  <LockIcon className="h-3 w-3" /> Case study
                </span>
              )}
            </div>
            <h2 id="project-modal-title" className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{p.title}</h2>
            {p.context && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.context}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{p.summary}</p>
        {p.points && (
          <ul className="mt-6 space-y-2 text-slate-600 dark:text-slate-300">
            {p.points.map((x) => (
              <li key={x} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500" aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
        )}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
          {p.stack.map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
        </ul>
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn-primary mt-8 inline-flex">
            <GitHubIcon className="h-4 w-4" /> View source
          </a>
        )}
      </div>
    </div>
  );
}
