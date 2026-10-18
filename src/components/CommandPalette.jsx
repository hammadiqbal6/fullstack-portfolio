import { useCallback, useEffect, useState } from 'react';
import { Command } from 'cmdk';
import content from '../content.js';

const { nav, projects, site } = content;

export default function CommandPalette({ onNavigate }) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  const go = (href) => {
    setOpen(false);
    if (onNavigate) onNavigate(href);
    else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-slate-200/80 bg-white/50 px-2.5 py-1.5 text-xs text-slate-500 backdrop-blur transition hover:border-brand-500/40 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-brand-300 lg:inline-flex"
        aria-label="Open command palette"
      >
        <kbd className="font-mono text-[10px]">⌘K</kbd>
      </button>
      {open && (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-900/40 p-4 pt-[12vh] backdrop-blur-sm dark:bg-black/50" role="presentation" onClick={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#12182b]/95"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Command menu" className="cmdk-root">
          <div className="flex items-center gap-2 border-b border-slate-200/80 px-4 dark:border-white/10">
            <Command.Input placeholder="Jump to section or project…" className="cmdk-input" autoFocus />
          </div>
          <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-slate-500">No results.</Command.Empty>
            <Command.Group heading="Navigate" className="cmdk-group">
              {nav.map((n) => (
                <Command.Item key={n.href} value={n.label} onSelect={() => go(n.href)} className="cmdk-item">
                  {n.label}
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group heading="Projects" className="cmdk-group">
              {projects.map((p) => (
                <Command.Item
                  key={p.title}
                  value={`${p.title} ${p.category}`}
                  onSelect={() => {
                    go('#projects');
                    window.dispatchEvent(new CustomEvent('open-project', { detail: p.title }));
                  }}
                  className="cmdk-item"
                >
                  <span className="truncate">{p.title}</span>
                  <span className="ml-auto shrink-0 font-mono text-[10px] text-slate-400">{p.category}</span>
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group heading="External" className="cmdk-group">
              <Command.Item value="GitHub" onSelect={() => { setOpen(false); window.open(site.github, '_blank', 'noreferrer'); }} className="cmdk-item">
                GitHub profile
              </Command.Item>
              <Command.Item value="CRM portfolio" onSelect={() => { setOpen(false); window.location.href = site.other.url; }} className="cmdk-item">
                {site.other.label}
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
      )}
    </>
  );
}
