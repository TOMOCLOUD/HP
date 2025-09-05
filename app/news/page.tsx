// app/news/page.tsx
'use client';

import React, { useMemo, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

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

const PAGE_SIZE = 5;

function NewsPageInner() {
  const newsList = [
    {
      id: 7,
      title:
        'CEOの小川良磨さんが、第9回日本リンパ浮腫治療学会学術総会の優秀演題セッションにて「電気インピーダンス・トモグラフィ（EIT）によるリンパ浮腫評価のこれまでとこれから」の講演を行います。',
      date: '2025-08-23',
      image: '/Image/news_7_2.png',
      description:
        '2025年9月6日・7日　アクトシティ浜松 コングレスセンター　https://www.graffiti97.com/9jslt/index.html',
    },
    {
      id: 6,
      title:
        'CEOの小川良磨さんが、8月24日の第19回むくみゼミナール特別イベントで登壇します。',
      date: '2025-08-23',
      image: '/Image/news_6_2.png',
      description:
        '10:00~12:00 オンライン開催　https://www.mukumi-seminar.org/event/',
    },
    {
      id: 5,
      title:
        'CEOの小川良磨さんが、Beyond Japan Zero to X Programの最終採択者に決定しました！【Deep Tech – San Diegoコース】に参加します。',
      date: '2025-08-20',
      image: '/Image/news_5_2.png',
      description:
        'Beyond JAPAN Zero to Xは、次世代のイノベーションの担い手となるグローバル・リーダー・起業家を育成する現地派遣型プログラムです。　https://www.b4d-jp.com/news/2025-8',
    },
    {
      id: 4,
      title:
        'CEOの小川良磨さんが、GTIEｰGAPファンド エントリーコースに採択されました。おめでとうございます！',
      date: '2025-07-30',
      image: '/Image/news_4_2.png',
      description:
        'サルコペニア予防のための筋量・筋質イメージング・ウェアの事業化　https://gtie.jp/news/43810/',
    },
    {
      id: 3,
      title:
        'CEOの小川良磨さんが、第33回日本乳癌学会学術総会で「電気インピーダンス・トモグラフィ(EIT)による新たな乳がん評価法の検討」の発表を行いました。',
      date: '2025-08-12',
      image: '/Image/news_3_2.png',
      description:
        '2025年7月10日~12日　https://www.congre.co.jp/jbcs2025/',
    },
    {
      id: 2,
      title:
        'CEOの小川良磨さんが、日本機械学会 第37回バイオエンジニアリング講演会で研究成果発表を行いました。',
      date: '2025-05-24',
      image: '/Image/news_2_2.png',
      description:
        '2025年5月24日・25日　https://www.jsme.or.jp/conference/bioconf25/index.html',
    },
    {
      id: 1,
      title:
        'CEOの小川良磨さんが、第49回日本リンパ学会総会で講演を行いました。',
      date: '2025-05-23',
      image: '/Image/news_1_2.png',
      description:
        '2025年5月23日・24日　https://square.umin.ac.jp/jsl49/',
    },
  ];

  const total = newsList.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const router = useRouter();
  const sp = useSearchParams();
  const pageFromQuery = Number(sp.get('page') ?? '1');
  const page = Number.isFinite(pageFromQuery) && pageFromQuery >= 1 ? Math.min(pageFromQuery, totalPages) : 1;

  const start = (page - 1) * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, total);
  const pageItems = useMemo(() => newsList.slice(start, end), [newsList, start, end]);

  const goTo = useCallback(
    (p: number) => {
      const clamped = Math.min(Math.max(1, p), totalPages);
      router.push(`/news?page=${clamped}`, { scroll: false });
    },
    [router, totalPages]
  );

  useEffect(() => {
    const anchor = document.getElementById('news-top');
    (anchor ?? document.documentElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  const Pager: React.FC = () => (
    <nav className="flex items-center justify-between gap-3 text-xs sm:text-sm" aria-label="ニュースページャー">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
      >
        ‹ 新しい記事へ
      </button>
      <span className="text-gray-600 tabular-nums">Page {page} / {totalPages}</span>
      <button
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-white"
      >
        以前の記事へ ›
      </button>
    </nav>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-1 py-10 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h1 id="news-top" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8 sm:mb-10">
            ニュース
          </h1>

          <div className="mb-5 sm:mb-6">
            <Pager />
          </div>

          <ul className="space-y-6 sm:space-y-8">
            {pageItems.map((news) => {
              const urlMatch = news.description.match(/https?:\/\/\S+/);
              const text = news.description.replace(/https?:\/\/\S+/, '').trim();
              const url = urlMatch ? urlMatch[0] : null;

              return (
                <li key={news.id}>
                  <article className="relative bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200">
                    {/* 左の水色帯（確実に表示） */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1.5 bg-sky-400"
                    />

                    <div className="flex flex-col md:flex-row">
                      {/* 画像ラッパー：左余白 + 縦中央ぞろえ + より横長 */}
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
                        <p className="mt-2 text-[13.5px] sm:text-sm text-gray-700">{text}</p>

                        {url && (
                          <div className="mt-3 sm:mt-4">
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center px-3.5 sm:px-4 py-2 rounded-md
                                         text-white font-semibold text-sm
                                         btn-gradient bg-gradient-to-r from-sky-500 to-sky-600
                                         hover:from-sky-600 hover:to-sky-700
                                         focus:outline-none focus:ring-2 focus:ring-sky-300"
                              aria-label="詳しく見る（外部サイトへ）"
                            >
                              詳しく見る
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 sm:mt-10">
            <Pager />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function NewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] grid place-items-center text-gray-500">
          読み込み中…
        </div>
      }
    >
      <NewsPageInner />
    </Suspense>
  );
}
