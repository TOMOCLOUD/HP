// app/achievements/page.tsx
'use client';

import React from 'react';

// ============================
// 型定義 & ダミーデータ
// ============================
export type Achievement = {
  id: string;
  type: 'paper' | 'presentation' | 'award' | 'Coming soon';
  title: string;
  date?: string;
  journalOrConf?: string;
  authors?: string;
  externalUrl?: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'Coming soon',
    type: 'Coming soon',
    title: 'Coming soon',
    date: 'Coming soon',
    journalOrConf: 'Coming soon',
    authors: 'Coming soon',
  },
  {
    id: 'pres-2025-lymph',
    type: 'presentation',
    title: '電気インピーダンス・トモグラフィ（EIT）によるリンパ浮腫評価のこれまでとこれから',
    date: '2025-09-06',
    journalOrConf: '第9回 日本リンパ浮腫治療学会学術総会',
    authors: 'R. Ogawa, Y. Kinouchi, S. Akita and M. Takei',
    externalUrl: 'https://www.graffiti97.com/9jslt/index.html',
  },
];

// ============================
// Hero
// ============================
function Hero() {
  return (
    <section className="bg-white py-20 sm:py-24 shadow">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-1 sm:mb-2">
          実績
        </h1>
        <p className="mt-6 text-md sm:text-md leading-8 text-gray-700 text-center">
          論文・学会発表・受賞歴などの成果をまとめています。<br />
          各項目から論文ページや学会URLにアクセスできます。
        </p>
      </div>
    </section>
  );
}

// ============================
// カード
// ============================
function AchievementCard({ item }: { item: Achievement }) {
  const label =
    item.type === 'paper'
      ? 'Publication'
      : item.type === 'presentation'
      ? 'Presentation'
      : item.type === 'award'
      ? 'Award'
      : 'Coming soon';

  return (
    <article className="bg-white rounded-xl shadow-lg border-l-4 border-sky-400 p-6 transition">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-600">
        <span>{label}</span>
        {item.date && <span className="text-gray-400">•</span>}
        {item.date && <span className="text-gray-500">{item.date}</span>}
      </div>
      <h3 className="mt-2 text-lg md:text-xl font-semibold text-gray-900">{item.title}</h3>
      {item.journalOrConf && (
        <p className="mt-1 text-sm md:text-base text-gray-700">{item.journalOrConf}</p>
      )}
      {item.authors && <p className="mt-1 text-sm text-gray-600">{item.authors}</p>}
      <div className="mt-4">
        {item.externalUrl ? (
          <a
            href={item.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white font-semibold px-4 py-2 rounded-lg shadow btn-gradient hover:shadow-lg"
          >
            リンクを開く
          </a>
        ) : (
          <button
            disabled
            className="inline-block text-white font-semibold px-4 py-2 rounded-lg shadow btn-gradient opacity-60 cursor-not-allowed"
          >
            リンク準備中
          </button>
        )}
      </div>
    </article>
  );
}

// ============================
// リスト
// ============================
function AchievementList() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 md:py-16 space-y-6">
      {ACHIEVEMENTS.map((a) => (
        <AchievementCard key={a.id} item={a} />
      ))}
    </section>
  );
}

// ============================
// Footer（reveal-on-scroll, mt-20 削除）
// ============================
function Footer() {
  return (
    <section className="bg-gray-900 text-white py-14 md:py-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-semibold">株式会社 TOMOCLOUD</p>
          <div>
            <p className="text-base md:text-lg font-semibold">260-0015</p>
            <p className="text-base md:text-lg font-semibold">
              千葉県千葉市中央区富士見二丁目7番9号 富士見ビル609号
            </p>
          </div>
          <div><h3 className="text-base md:text-lg font-semibold">TEL　043-290-2957</h3></div>
          <div><h3 className="text-base md:text-lg font-semibold">Email　info@tomocloud.co.jp</h3></div>
        </div>

        <div className="grid grid-cols-[max-content_max-content] gap-3 md:gap-5 md:justify-self-end md:mr-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">Pages</h4>
            <ul className="space-y-2 text-slate-100">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/services" className="hover:underline">Product</a></li>
              <li><a href="/news" className="hover:underline">News</a></li>
              <li><a href="/recruit" className="hover:underline">Recruit</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-slate-100">
              <li>
                <a
                  href="https://tomocloud.xsrv.jp/takei-lab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  武居研究室（外部）
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
      <Footer />
    </div>
  );
}
