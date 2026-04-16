'use client';

import { useEffect } from 'react';

export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    if (!els.length) return;

    els.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 600ms ease, transform 600ms ease';
      (el.style as any).willChange = 'opacity, transform';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'none';
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
