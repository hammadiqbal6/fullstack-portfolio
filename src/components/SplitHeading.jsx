import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export default function SplitHeading({ text, className = '', as = 'span', delay = 0 }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;
    const chars = el.querySelectorAll('.split-char');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 24, rotateX: -40 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.018,
          ease: 'power3.out',
          delay,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [text, reduced, delay]);

  const words = text.split(' ');
  return (
    <Tag ref={ref} className={`split-heading inline ${className}`} style={{ perspective: '600px' }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-pre">
          {word.split('').map((ch, ci) => (
            <span key={ci} className="split-char inline-block origin-bottom" style={{ transformStyle: 'preserve-3d' }}>
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}
