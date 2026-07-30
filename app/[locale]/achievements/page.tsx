// app/[locale]/achievements/page.tsx
'use client';

import React from 'react';
import { useDict } from '@/lib/useDict';

// ============================
// 型
// ============================
export type Achievement = {
  id: string;
  type: 'paper' | 'presentation' | 'award' | 'comingSoon';
  title: string;
  date?: string;
  journalOrConf?: string;
  authors?: string;
  externalUrl?: string;
};

// ============================
// Hero
// ============================
function Hero() {
  const { dict } = useDict();
  const t = dict?.achievements;

  return (
    <section className="bg-white py-20 sm:py-24 shadow">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-1 sm:mb-2">
          {t?.title ?? 'Achievements'}
        </h1>
        <p className="mt-6 text-md sm:text-md leading-8 text-gray-700 text-center">
          {t?.lead ?? 'Publications, conference presentations, and awards.'}
          <br />
          {t?.lead2 ?? 'You can open the original pages/links from each item.'}
        </p>
      </div>
    </section>
  );
}

// ============================
// カード
// ============================
function AchievementCard({ item }: { item: Achievement }) {
  const { dict } = useDict();
  const t = dict?.achievements;

  const label =
    item.type === 'paper'
      ? t?.labelPaper ?? 'Publication'
      : item.type === 'presentation'
      ? t?.labelPresentation ?? 'Presentation'
      : item.type === 'award'
      ? t?.labelAward ?? 'Award'
      : t?.labelComingSoon ?? 'Coming soon';

  return (
    <article className="bg-white rounded-xl shadow-lg border-l-4 border-sky-400 p-6 transition">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-600">
        <span>{label}</span>
        {item.date ? <span className="text-gray-400">•</span> : null}
        {item.date ? <span className="text-gray-500">{item.date}</span> : null}
      </div>

      <h3 className="mt-2 text-lg md:text-xl font-semibold text-gray-900">{item.title}</h3>

      {item.journalOrConf ? (
        <p className="mt-1 text-sm md:text-base text-gray-700">{item.journalOrConf}</p>
      ) : null}

      {item.authors ? <p className="mt-1 text-sm text-gray-600">{item.authors}</p> : null}

      <div className="mt-4">
        {item.externalUrl ? (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white font-semibold px-4 py-2 rounded-lg shadow btn-gradient hover:shadow-lg"
          >
            {t?.openLink ?? 'Open link'}
          </a>
        ) : (
          <button
            disabled
            className="inline-block text-white font-semibold px-4 py-2 rounded-lg shadow btn-gradient opacity-60 cursor-not-allowed"
          >
            {t?.linkPending ?? 'Coming soon'}
          </button>
        )}
      </div>
    </article>
  );
}

// ============================
// リスト（辞書から items を取得）
// ============================
function AchievementList() {
  const { dict } = useDict();
  const items: Achievement[] = (dict?.achievements?.items as Achievement[]) ?? [];

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-6">
      {items.map((a) => (
        <AchievementCard key={a.id} item={a} />
      ))}
    </section>
  );
}

// ============================
// ページ本体
// ============================
export default function AchievementsPage() {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      <main className="flex-1">
        <Hero />
        <AchievementList />
      </main>
    </div>
  );
}
