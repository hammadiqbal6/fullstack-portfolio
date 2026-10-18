import { useCallback, useEffect, useState } from 'react';

function applyTheme(value) {
  document.documentElement.classList.toggle('dark', value);
  try {
    localStorage.setItem('theme', value ? 'dark' : 'light');
  } catch {
    /* storage unavailable */
  }
}

export function useTheme() {
  const [dark, setDarkState] = useState(() => document.documentElement.classList.contains('dark'));

  const setDark = useCallback((next) => {
    setDarkState((prev) => {
      const value = typeof next === 'function' ? next(prev) : next;
      const run = () => applyTheme(value);
      if (typeof document.startViewTransition === 'function') {
        document.startViewTransition(run);
      } else {
        run();
      }
      return value;
    });
  }, []);

  useEffect(() => {
    applyTheme(dark);
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), [setDark]);

  return { dark, setDark, toggle };
}
