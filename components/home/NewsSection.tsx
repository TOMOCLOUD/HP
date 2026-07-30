'use client';

import React from 'react';
import { useDict } from '@/lib/useDict';

export default function NewsSection({
  onImgError,
}: {
  onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
  const { dict, locale } = useDict();
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const t = dict?.home?.news;
  const newsItems = dict?.news?.items || [];

  const NEWS_BASE = newsItems.slice(0, 10).map((item: any) => ({
    id: `n${item.id}`,
    date: item.date,
    img: item.image,
    title: item.title,
  }));

  const titles: Record<string, string> = t?.items || {};
  const getTitle = (id: string) => {
    if (titles?.[id]) return titles[id];
    const item = NEWS_BASE.find((n: { id: string; title?: string }) => n.id === id);
    return item?.title ?? '';
  };

  const getStep = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 320;
    return Math.max(280, Math.round(el.clientWidth * 0.9));
  }, []);

  const scrollByStep = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = getStep() * (dir === 'left' ? -1 : 1);
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollByStep('left');
      if (e.key === 'ArrowRight') scrollByStep('right');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [getStep]);

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          {t?.heading ?? 'Recent News'}
        </h2>

        <div className="w-full relative">
          <button
            onClick={() => scrollByStep('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-gray-300/90 text-gray-700 flex items-center justify-center shadow"
            aria-label={locale === 'en' ? 'Previous' : '前へ（横スクロール）'}
          >
            ‹
          </button>
          <button
            onClick={() => scrollByStep('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-gray-300/90 text-gray-700 flex items-center justify-center shadow"
            aria-label={locale === 'en' ? 'Next' : '次へ（横スクロール）'}
          >
            ›
          </button>

          <div
            ref={scrollerRef}
            id="news-hscroll"
            className="overflow-x-auto px-2 snap-x snap-mandatory scroll-px-2"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="flex gap-4">
              {NEWS_BASE.map((item: { id: string; date: string; img: string; title?: string }) => (
                <article
                  key={item.id}
                  className="shrink-0 w-[260px] sm:w-[280px] md:w-[320px] lg:w-[360px] snap-start bg-white shadow rounded overflow-hidden border border-gray-200"
                >
                  <img
                    src={item.img}
                    alt={getTitle(item.id)}
                    className="w-full h-40 md:h-44 lg:h-48 object-contain bg-gray-50"
                    onError={onImgError}
                    loading="lazy"
                  />
                  <div className="p-3 md:p-4">
                    <h3 className="font-semibold text-base md:text-lg line-clamp-3 mb-1 md:mb-2">
                      {getTitle(item.id)}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">{item.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={`/${locale}/news`}
            className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow
                       btn-gradient transition-colors duration-300
                       hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {t?.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
