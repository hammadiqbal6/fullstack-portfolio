import { useEffect, useRef } from 'react';
import { useFinePointer } from '../hooks/useReducedMotion.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export default function CustomCursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!fine || reduced) {
      document.body.classList.remove('custom-cursor');
      return undefined;
    }
    document.body.classList.add('custom-cursor');
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    const onOver = (e) => {
      const t = e.target.closest('a, button, [data-magnetic], [data-cursor-grow]');
      document.body.classList.toggle('cursor-grow', Boolean(t));
    };
    document.addEventListener('mouseover', onOver);

    return () => {
      document.body.classList.remove('custom-cursor', 'cursor-grow');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
