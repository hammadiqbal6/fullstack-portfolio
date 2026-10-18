import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (reduced || !els.length) {
      els.forEach((el) => el.classList.add('revealed'));
      return undefined;
    }

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [reduced]);
}
