'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function CursorAtmosphere() {
  const pathname = usePathname();
  const layer = useRef<HTMLDivElement>(null);
  if (pathname !== '/') return null;

  useEffect(() => {
    const current = layer.current;
    if (!current) return;
    const move = (event: globalThis.PointerEvent) => {
      if (event.pointerType === 'touch') return;
      current.style.setProperty('--cursor-x', `${event.clientX}px`);
      current.style.setProperty('--cursor-y', `${event.clientY}px`);
      current.style.setProperty('--cursor-rx', `${(event.clientX / window.innerWidth - 0.5) * 12}deg`);
      current.style.setProperty('--cursor-ry', `${(event.clientY / window.innerHeight - 0.5) * -8}deg`);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return <div ref={layer} className="cursor-atmosphere is-active" aria-hidden="true" />;
}
