// Renders only real numbers. Entries with a null value (or a null impact field) render nothing.
export function ImpactList({ items, compact = false }) {
  const real = (items || []).filter((i) => i && i.value != null);
  if (!real.length) return null;
  return (
    <ul className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
      {real.map((i) => (
        <li
          key={i.label}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5"
          title={i.source === 'VERIFIED' ? 'Counted from the public repository' : 'From my employment record'}
        >
          <span className="block text-lg font-bold text-slate-900 dark:text-white">{i.value}</span>
          <span className="block text-xs leading-snug text-slate-500 dark:text-slate-400">{i.label}</span>
        </li>
      ))}
    </ul>
  );
}
