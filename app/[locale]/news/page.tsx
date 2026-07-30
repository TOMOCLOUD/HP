// app/[locale]/news/page.tsx
'use client';

import React, { useMemo, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDict } from '@/lib/useDict';

const PAGE_SIZE = 5;

function NewsPageInner() {
  const { dict } = useDict();
  const t = dict?.news;

  const newsList: Array<{
    id: number;
    title: string;
    date: string;
    image: string;
    text: string;
    url?: string;
  }> = t?.items ?? [];

  const total = newsList.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const router = useRouter();
  const sp = useSearchParams();
  const pageFromQuery = Number(sp.get('page') ?? '1');
  const page = Number.isFinite(pageFromQuery) && pageFromQuery >= 1
    ? Math.min(pageFromQuery, totalPages)
    : 1;

  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const pageItems = useMemo(() => newsList.slice(start, end), [newsList, start, end]);

  const goTo = useCallback(
    (p: number) => {
      const clamped = Math.min(Math.max(1, p), totalPages);
      router.push(`?page=${clamped}`, { scroll: false });
    },
    [router, totalPages]
  );

  useEffect(() => {
    const anchor = document.getElementById('news-top');
    (anchor ?? document.documentElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  const Pager: React.FC = () => (
    <nav
      className="flex items-center justify-between gap-3 text-xs sm:text-sm"
      aria-label={t?.pagerAria ?? 'News pager'}
    >
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
      >
        {t?.newer ?? '‹ Newer'}
      </button>
      <span className="text-gray-600 tabular-nums">
        {(t?.pageXofY ?? 'Page {x} / {y}')
          .replace('{x}', String(page))
          .replace('{y}', String(totalPages))}
      </span>
      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
      >
        {t?.older ?? 'Older ›'}
      </button>
    </nav>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-1 py-10 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1
            id="news-top"
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8 sm:mb-10"
          >
            {t?.title ?? 'News'}
          </h1>

          <div className="mb-5 sm:mb-6">
            <Pager />
          </div>

          <ul className="space-y-6 sm:space-y-8">
            {pageItems.map((news) => (
              <li key={news.id}>
                <article className="relative bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200">
                  {/* 左帯 */}
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-sky-400" />

                  <div className="flex flex-col md:flex-row">
                    {/* 画像 */}
                    <div
                      className="md:w-[22rem] lg:w-[26rem] shrink-0 pl-4 sm:pl-5 md:pl-6
                                 h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56
                                 flex items-center"
                    >
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full max-h-full object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>

                    {/* テキスト */}
                    <div className="p-4 sm:p-5 md:p-6 flex-1">
                      <p className="text-gray-500 text-[11px] sm:text-xs mb-1.5">{news.date}</p>
                      <h2 className="text-[15px] sm:text-base md:text-lg font-semibold text-gray-900 leading-snug">
                        {news.title}
                      </h2>
                      <p className="mt-2 text-[13.5px] sm:text-sm text-gray-700">{news.text}</p>

                      {news.url && news.url.trim() !== '' && (
                        <div className="mt-3 sm:mt-4">
                          <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-3.5 sm:px-4 py-2 rounded-md
                                       text-white font-semibold text-sm
                                       btn-gradient bg-gradient-to-r from-sky-500 to-sky-600
                                       hover:from-sky-600 hover:to-sky-700
                                       focus:outline-none focus:ring-2 focus:ring-sky-300"
                            aria-label={t?.moreAria ?? 'Open external link'}
                          >
                            {t?.more ?? 'Read more'}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-8 sm:mt-10">
            <Pager />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] grid place-items-center text-gray-500">Loading…</div>}>
      <NewsPageInner />
    </Suspense>
  );
}
