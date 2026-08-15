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
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'none';
            // transform / will-change make the element a containing block for
            // position: fixed descendants. Clear them once the reveal is done
            // so modals inside the section still anchor to the viewport.
            (el.style as any).willChange = 'auto';
            el.addEventListener(
              'transitionend',
              () => {
                el.style.transform = '';
                el.style.transition = '';
              },
              { once: true }
            );
            io.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
