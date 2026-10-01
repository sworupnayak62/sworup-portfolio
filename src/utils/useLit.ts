import { useEffect, useRef, useState } from 'react';

// Flips true once when the element first scrolls into view (signs swing in, bulbs light).
export function useLit<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setLit(true);
        io.disconnect();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, lit] as const;
}
