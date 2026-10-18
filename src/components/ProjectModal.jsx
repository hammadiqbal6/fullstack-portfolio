import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { ImpactList } from './Impact.jsx';

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!project) return undefined;
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll('a[href],button:not([disabled])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
  }, [project, onClose]);

  if (!project) return null;
  const p = project;
  const titleId = 'project-modal-title';

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation">
      <button type="button" aria-label="Close case study" tabIndex={-1} className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#0f1528] sm:rounded-2xl sm:p-8 ${reduced ? '' : 'modal-in'}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow !mb-1">{p.category}</p>
            <h3 id={titleId} className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{p.title}</h3>
            {p.context && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.context}</p>}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 flex-none place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
            aria-label="Close case study"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <dl className="mt-6 space-y-6 text-slate-600 dark:text-slate-300">
          {p.role && (
            <div>
              <dt className="case-label">Role</dt>
              <dd className="mt-1">{p.role}</dd>
            </div>
          )}
          {p.problem && (
            <div>
              <dt className="case-label">Problem</dt>
              <dd className="mt-1 leading-relaxed">{p.problem}</dd>
            </div>
          )}
          {(p.architecture || p.built) && (
            <div>
              <dt className="case-label">Architecture and what I built</dt>
              <dd>
                <ul className="mt-2 space-y-1.5">
                  {[...(p.architecture || []), ...(p.built || [])].map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="text-brand-500" aria-hidden="true">▹</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          {p.impact && p.impact.length > 0 && (
            <div>
              <dt className="case-label">Impact</dt>
              <dd className="mt-2">
                <ImpactList items={p.impact} />
              </dd>
            </div>
          )}
          <div>
            <dt className="case-label">Stack</dt>
            <dd>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s} className="chip">{s}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="btn-primary mt-8">
            View source on GitHub
          </a>
        )}
      </div>
    </div>
  );
}
