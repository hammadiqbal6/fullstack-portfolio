// Only render the WebGL hero when the device can afford it and the user has not asked for less motion.
export function canRender3D() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const nav = window.navigator || {};
  if (nav.connection && nav.connection.saveData) return false;
  if (nav.hardwareConcurrency && nav.hardwareConcurrency < 4) return false;
  if (nav.deviceMemory && nav.deviceMemory < 4) return false;
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return false;
  } catch {
    return false;
  }
  return true;
}
