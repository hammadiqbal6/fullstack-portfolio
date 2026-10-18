import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { canRender3D } from '../lib/canRender3D.js';

const Hero3D = lazy(() => import('../Hero3D.jsx'));

function StaticOrb() {
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden="true">
      <div className="absolute h-56 w-56 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 opacity-70 blur-2xl sm:h-72 sm:w-72" />
      <div className="relative h-40 w-40 rounded-full border border-white/30 bg-gradient-to-br from-brand-400/80 to-accent-500/80 shadow-2xl sm:h-56 sm:w-56" />
      <div className="absolute h-64 w-64 rounded-full border border-brand-400/40 sm:h-80 sm:w-80" />
    </div>
  );
}

export default function HeroVisual() {
  const ref = useRef(null);
  const scrollRef = useRef(0);
  const [enabled] = useState(canRender3D);
  const [visible, setVisible] = useState(true);
  const [mobile] = useState(() => window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    if (!enabled || !ref.current || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(ref.current);
    const onVis = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [enabled]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollRef.current = Math.min(1, y / 600);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {enabled ? (
        <Suspense fallback={<StaticOrb />}>
          <Hero3D active={visible} mobile={mobile} scrollRef={scrollRef} />
        </Suspense>
      ) : (
        <StaticOrb />
      )}
    </div>
  );
}
