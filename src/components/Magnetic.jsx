import { useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

export default function Magnetic({ children, className = '', strength = 0.35, as = 'div', ...props }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const Tag = as;

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <Tag
      ref={ref}
      data-magnetic
      className={className}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
