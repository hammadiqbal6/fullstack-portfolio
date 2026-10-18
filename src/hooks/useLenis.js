import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

export function useLenis(enabled = true) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
    };
  }, [enabled, reduced]);
}
