import { useReducedMotion } from '../hooks/useReducedMotion.js';

export default function GrainOverlay() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <div className="grain pointer-events-none fixed inset-0 z-[100] opacity-[0.045] mix-blend-overlay dark:opacity-[0.06]" aria-hidden="true" />
  );
}
