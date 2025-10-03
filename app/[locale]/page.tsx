'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useDict } from '@/lib/useDict';

/* =========================================
   0) 共通ユーティリティ
========================================= */
const fallbackDataUrl =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192">
       <rect width="100%" height="100%" fill="#e5e7eb"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             font-family="Arial, sans-serif" font-size="14" fill="#6b7280">
         No Image
       </text>
     </svg>`
  );

function useImageFallback() {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    if (img.src !== fallbackDataUrl) img.src = fallbackDataUrl;
  };
}

function featherRectMask(edge: string = '6%') {
  const horiz = `linear-gradient(to right,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.2) calc(${edge} * 0.5),
    rgba(0,0,0,1) ${edge},
    rgba(0,0,0,1) calc(100% - ${edge}),
    rgba(0,0,0,0.2) calc(100% - (${edge} * 0.5)),
    rgba(0,0,0,0) 100%)`;
  const vert = `linear-gradient(to bottom,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.2) calc(${edge} * 0.5),
    rgba(0,0,0,1) ${edge},
    rgba(0,0,0,1) calc(100% - ${edge}),
    rgba(0,0,0,0.2) calc(100% - (${edge} * 0.5)),
    rgba(0,0,0,0) 100%)`;
  return {
    WebkitMaskImage: `${horiz}, ${vert}`,
    maskImage: `${horiz}, ${vert}`,
    WebkitMaskComposite: 'source-in',
    // @ts-expect-error: maskComposite 型回避
    maskComposite: 'intersect',
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
  } as React.CSSProperties;
}

/* =========================================
   0.5) スクロールで可視化（今回の修正ポイント）
========================================= */
function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal-on-scroll'));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('ros-visible');
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

/* =========================================
   1) Hero
========================================= */
function Hero() {
  const { dict } = useDict();

  return (
    <section
      className="relative w-full h-[420px] sm:h-[520px] md:h-[600px]
                 bg-white overflow-hidden [isolation:isolate]"
    >
      <img
        src="/Image/HeroImage.png"
        alt="TOMOCLOUD Hero"
        className="absolute inset-0 w-full h-full object-cover bg-white"
        loading="eager"
        fetchPriority="high"
      />

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3%] bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3%] bg-gradient-to-t from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3%] bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[3%] bg-gradient-to-l from-white to-transparent" />

      <div className="relative z-10 h-full flex items-center">
        <div className="pl-10 sm:pl-16 md:pl-24 lg:pl-32 max-w-[95%]">
          <h1
            className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold
                       mb-4 md:mb-8 drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)]
                       whitespace-nowrap"
          >
            {dict?.home?.hero?.title ?? 'TOMOCLOUD'}
          </h1>
          <p
            className="text-white text-2xl sm:text-3xl md:text-6xl mb-2 md:mb-4
                       drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] whitespace-nowrap"
          >
            {dict?.home?.hero?.leadJa ?? '新しい自分が視える世界へ'}
          </p>
          <p
            className="text-white text-lg sm:text-xl md:text-4xl
                       drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] whitespace-nowrap"
          >
            {dict?.home?.hero?.leadEn ?? 'Visualize the New Self'}
          </p>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   2) Vision
========================================= */
function VisionSection({ onImgError }: { onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void }) {
  const { dict, locale } = useDict();
  const t = dict?.home?.vision;

  return (
    <section className="reveal-on-scroll max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-3">
      <div className="w-full bg-gray-50 rounded-xl overflow-hidden flex justify-center items-center">
        <img
          src="/Image/LTmonitor_AI.png"
          alt="Vision image"
          className="max-h-80 md:max-h-96 w-auto h-auto object-contain"
          onError={onImgError}
          style={featherRectMask('6%')}
        />
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
          {t?.heading ?? 'Our Vision'}
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-sky-600">
          {t?.subtitleJa}
        </p>
        <p className="text-base md:text-lg italic mb-6 text-sky-600">
          {t?.subtitleEn}
        </p>

        <p className="text-gray-700 text-base sm:text-lg">{t?.p1}</p>
        <p className="text-gray-700 mb-2 text-base sm:text-lg">{t?.p2}</p>
        <p className="text-gray-700 mb-2 font-bold text-base md:text-xl">{t?.p3Strong}</p>
        <p className="text-gray-700 mb-5 text-base md:text-lg">{t?.p4}</p>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <a
            href={`/${locale}/services`}
            className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow
                       btn-gradient transition-colors duration-300
                       hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="to product"
          >
            {t?.cta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   3) Values
========================================= */
export function ValuesSection() {
  const { dict, locale } = useDict();
  const values: { title: string; text: string }[] = dict?.home?.values || [];

  if (!values || !values.length) {
    return (
      <section className="reveal-on-scroll bg-sky-100 py-16 md:py-5">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-700">
          Loading values...
        </div>
      </section>
    );
  }

  return (
    <section className="reveal-on-scroll bg-sky-100 py-16 md:py-5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-900">
          {locale === 'en' ? 'Values' : '価値観'}
        </h2>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="w-full max-w-[560px] mx-auto p-5 md:p-6 bg-white rounded-xl shadow-lg border-l-4 border-sky-400 transition-none"
            >
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-gray-900">{v.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================
   4) Team（モーダルあり）
========================================= */
type Member = {
  id: string;
  name: string;
  nameEn?: string;
  role: string;
  image?: string;
  title?: string;
  subtitle?: string;
  bio?: string;
  achievements?: string[];
  positionNote?: string;
};

const MEMBERS: Member[] = [
  {
    id: 'ogawa',
    name: '小川 良磨',
    nameEn: 'Ryoma Ogawa',
    role: 'CEO / Founder',
    image: '/Image/Ogawa_image.png',
    title:
      '千葉大学 大学院工学研究院 武居研究室 特任助教\n兼）千葉大学 学術研究・イノベーション推進機構（IMO）客員起業家（EIR）',
    subtitle: '千葉大学大学院融合理工学府博士後期課程修了(工学博士)',
    positionNote:
      '千葉大学 大学院工学研究院 武居研究室 特任助教\n千葉大学 学術研究・イノベーション推進機構（IMO） 客員起業家（EIR）',
    bio:
      'トビタテ！留学JAPAN日本代表としてエジンバラ大学再生医療研究所に1年間研究留学（博士前期課程時）。『医療×工学』をキーワードに社会実装を推進し、婦人科系がん治療後のリンパ浮腫課題解決に向け、電気インピーダンス・トモグラフィー（EIT）を用いた医療機器を開発中。「新しい自分が視える世界」を目指し、医療・介護・ヘルスケア領域での事業化に邁進。所属研究室の武居教授らと共に2022年度JST START「プロジェクト推進型起業実証支援」に採択。',
    achievements: [
      '2019：国際連合管轄 World Youth Forum 日本代表採択',
      '2021：経産省ジャパン・ヘルスケアビジネスコンテスト優秀賞 ほか多数',
      '2022：NEDO TCP 最優秀賞、学振DC1、千葉大学 学長賞・学府長賞・学科長賞',
      '2023：1年次早期学位取得（論文5報）、第7回リンパ浮腫治療学会学術集会 最優秀演題賞、Research Studio進出、学振PD',
      '2024：科研費 若手採択',
      '2025：AMED橋渡し（筑波大拠点）S0採択、GAPファンド2025エントリーコース採択、Beyond Japan Zero to X Program採択',
    ],
  },
  {
    id: 'takei',
    name: '武居 昌宏',
    nameEn: 'Masahiro Takei',
    role: 'Technical Adviser',
    image: '/Image/Takei_image.jpg',
    title: '千葉大学大学院工学研究院（フロンティア医工学センター兼務）教授',
    subtitle: 'H7 早稲田大学大学院理工学研究科 博士後期課程修了、博士（工学）',
    positionNote: '千葉大学 大学院工学研究院（フロンティア医工学センター兼務）教授',
    bio:
      'H7〜H23 日本大学機械工学科 助手・専任講師・准教授・教授。この間、混相流の電気計測と力学研究に従事し、JST独創的研究成果育成事業、科研費基盤C（2回）、JST地域イノベーション創出総合支援事業、科研費基盤Bの研究代表者として、EIT法の基礎開発と産業・バイオメディカル分野への応用を推進。H23〜現在は千葉大学大学院工学研究院教授として、生体・混相流の電気計測と力学研究を継続。JST A-STEP（FS含む）をはじめ複数プロジェクトでプラント／生体計測へ展開し、科研費基盤Aでは血流内の血栓可視化へ発展。H30にはNEDO先進的IoTプロジェクトに採択され、「IoTリンパ浮腫トモグラフィク・モニタによるAI早期発見診断」に従事。',
    achievements: [
      'JST A-STEP（FS含む）・科研費 基盤A/B/Cの研究代表者',
      'H30 NEDO 先進的IoTプロジェクト採択（AI×リンパ浮腫）',
      '第4回リンパ浮腫学会総会／第84回日本循環器学会学術集会 招待講演',
      'NEDO審査員特別賞、NEDO TCP2017ファイナリスト賞 ほか受賞多数',
    ],
  },
];

/* Body スクロールロック（モーダル用） */
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const html = document.documentElement;
    const original = {
      htmlOverflow: html.style.overflow,
      bodyPosition: document.body.style.position,
      bodyTop: document.body.style.top,
      bodyWidth: document.body.style.width,
      bodyOverflow: document.body.style.overflow,
      bodyPaddingRight: document.body.style.paddingRight,
    };
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarGap}px`;
    html.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = original.htmlOverflow;
      document.body.style.position = original.bodyPosition;
      document.body.style.top = original.bodyTop;
      document.body.style.width = original.bodyWidth;
      document.body.style.overflow = original.bodyOverflow;
      document.body.style.paddingRight = original.bodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

/* モーダル */
function Modal({
  open,
  onClose,
  title,
  closeLabel,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel: string;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (open) requestAnimationFrame(() => setEntered(true));
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setEntered(false);
    setTimeout(onClose, 500);
  };

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ease-out
                    ${entered ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 grid place-items-center p-4
                    transition-all duration-500 ease-out
                    ${entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
      >
        <div
          ref={dialogRef}
          className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl outline-none
                     max-h-[90vh] overflow-y-auto overscroll-contain"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 bg-white p-6 border-b border-zinc-200 flex items-start gap-4">
            <h2 className="text-xl font-semibold leading-tight">{title}</h2>
            <button
              onClick={handleClose}
              className="ml-auto rounded-lg px-3 py-2 text-sm ring-1 ring-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2"
            >
              {closeLabel}
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* Team Section */
function TeamSection({ onImgError }: { onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void }) {
  const [active, setActive] = useState<Member | null>(null);
  const { dict, locale } = useDict();
  const closeLabel = dict?.common?.actions?.close ?? (locale === 'en' ? 'Close' : '閉じる');
  const t = dict?.home?.team;

  const members = MEMBERS.map((m) => {
    const patch = dict?.home?.team?.members?.[m.id] || {};
    return { ...m, ...patch };
  });

  return (
    <section className="reveal-on-scroll py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-900">
          {t?.heading ?? 'Our Team'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
          {members.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className="group relative flex flex-col items-center text-center rounded-2xl border border-slate-200 bg-white p-5 md:p-6
                         hover:border-sky-400 hover:shadow-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 ring-sky-200"
              aria-label={`${m.name} の詳細`}
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl
                               bg-gradient-to-br from-sky-50/0 to-sky-100/0
                               group-hover:from-sky-50/60 group-hover:to-sky-100/20
                               transition-colors duration-300" />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5
                               bg-gradient-to-r from-sky-300/0 via-sky-400/60 to-sky-300/0
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  width={192}
                  height={192}
                  onError={onImgError}
                  className="block w-48 h-48 md:w-72 md:h-72 object-cover mb-6 border border-gray-300 bg-gray-100 rounded"
                  loading="lazy"
                />
              ) : (
                <div className="w-48 h-48 md:w-72 md:h-72 mb-6 grid place-items-center bg-gray-100 border border-gray-300 rounded">
                  <span className="text-gray-500">{m.name}</span>
                </div>
              )}
              <h3 className="text-2xl md:text-3xl font-semibold mb-1 text-gray-900 leading-snug">
                {locale === 'en' ? m.nameEn || m.name : m.name}
              </h3>
              {m.nameEn && locale === 'ja' && <p className="text-gray-500 italic mb-1 md:mb-2">{m.nameEn}</p>}
              <p className="text-lg md:text-xl text-sky-700 font-medium">{m.role}</p>
              {m.positionNote && (
                <p className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-line line-clamp-3">
                  {m.positionNote}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active ? (locale === 'en' ? active.nameEn || active.name : active.name) : ''}
        closeLabel={closeLabel}
      >
        {active && (
          <div className="space-y-4 text-gray-800">
            {active.title && <p className="whitespace-pre-line">{active.title}</p>}
            {active.subtitle && <p className="text-sm text-gray-600">{active.subtitle}</p>}
            {active.bio && <p className="leading-relaxed whitespace-pre-wrap">{active.bio}</p>}
            {active.achievements && active.achievements.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold">{t?.modal?.achievementsTitle ?? '主な実績'}</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {active.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

/* =========================================
   5) 代表メッセージ
========================================= */
function MessageSection({ onImgError }: { onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void }) {
  const { dict } = useDict();
  const t = dict?.home?.message;
  const HEADER_PX = 128;

  return (
    <section className="reveal-on-scroll bg-sky-100 py-14 md:py-20 overflow-x-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {t?.heading ?? 'Message'}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-0 items-start">
          {/* SP 画像 */}
          <div className="md:hidden mb-6">
            <div className="relative w-full overflow-hidden rounded-none">
              <img
                src="/Image/Message_2.png"
                alt="代表者メッセージ"
                className="block w-full h-auto object-contain max-h-[70vh] mx-auto"
                onError={onImgError}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-white to-transparent" />
            </div>
          </div>

          {/* PC 画像 sticky */}
          <div className="hidden md:block md:sticky md:self-start" style={{ top: HEADER_PX }}>
            <div className="relative" style={{ height: `calc(100svh - ${HEADER_PX}px)` }}>
              <img
                src="/Image/Message_2.png"
                alt="代表者メッセージ"
                className="absolute inset-0 w-full h-full object-cover"
                onError={onImgError}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-white to-transparent" />
            </div>
          </div>

          {/* テキスト */}
          <article className="relative bg-white/95 backdrop-blur-sm border-0 shadow-none px-4 sm:px-6 md:px-10 py-6 md:py-8 rounded-none md:rounded-none">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[6%] bg-gradient-to-l from-white to-transparent" />

            <header className="mb-4 md:mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {t?.title}
              </h3>
              <span className="mt-3 block h-1 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] bg-sky-500 rounded-full mx-auto md:mx-0" />
            </header>

            <div className="space-y-4 leading-relaxed text-gray-800 text-base sm:text-[1.02rem] md:text-base">
              <p>{t?.p1}</p>
              <p>{t?.p2}</p>
              <p>{t?.p3}</p>
              <p>{t?.p4}</p>
              <p>{t?.p5}</p>
            </div>

            <footer className="mt-6 md:mt-8 text-right">
              <p className="text-sm sm:text-base md:text-xl text-gray-700">
                {t?.signature}
              </p>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   6) News
========================================= */
const NEWS_BASE = [
  { id: 'n9', date: '2025-09-08', img: '/Image/news_5.png' },
  { id: 'n8', date: '2025-09-06', img: '/Image/news_7.png' },
  { id: 'n7', date: '2025-08-23', img: '/Image/news_7.png' },
  { id: 'n6', date: '2025-08-23', img: '/Image/news_6.png' },
  { id: 'n5', date: '2025-08-20', img: '/Image/news_5.png' },
  { id: 'n4', date: '2025-07-30', img: '/Image/news_4.png' },
  { id: 'n3', date: '2025-07-12', img: '/Image/news_3.png' },
  { id: 'n2', date: '2025-05-24', img: '/Image/news_2.png' },
  { id: 'n1', date: '2025-05-23', img: '/Image/news_1.png' },
];

function NewsSection({ onImgError }: { onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void }) {
  const { dict, locale } = useDict();
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const t = dict?.home?.news;

  const titles: Record<string, string> = t?.items || {};
  const getTitle = (id: string) => titles?.[id] ?? '';

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
              {NEWS_BASE.map((item) => (
                <article
                  key={item.id}
                  className="shrink-0 w-[260px] sm:w-[280px] md:w-[320px] lg:w-[360px] snap-start bg-white shadow rounded overflow-hidden border border-gray-200"
                >
                  <img
                    src={item.img}
                    alt={getTitle(item.id)}
                    className="w-full h-40 md:h-44 lg:h-48 object-cover"
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

/* =========================================
   7) Recruit
========================================= */
function RecruitSection() {
  const { dict, locale } = useDict();
  const t = dict?.home?.recruit;

  return (
    <section className="reveal-on-scroll bg-sky-100 py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{t?.heading ?? 'Recruit'}</h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700">{t?.p1}</p>
        <p className="mt-4 text-base sm:text-lg text-gray-700">{t?.p2}</p>
        <div className="mt-8">
          <a
            href={`/${locale}/contact`}
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

/* =========================================
   8) About
========================================= */
function AboutSection() {
  const { dict } = useDict();
  const t = dict?.home?.about;

  return (
    <section id="about" className="reveal-on-scroll scroll-mt-24 bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-gray-900 text-center">
          {t?.heading ?? 'About us'}
        </h2>

        <dl className="divide-y divide-slate-300">
          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.companyLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.company}</dd>
          </div>

          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.businessLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.business}</dd>
          </div>

          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.foundedLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.founded}</dd>
          </div>

          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.addressLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl" style={{ whiteSpace: 'pre-line' }}>
              {t?.address}
            </dd>
          </div>

          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.repLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.rep}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

/* =========================================
   9) Footer
========================================= */
function Footer() {
  const { dict, locale } = useDict();
  const f = dict?.footer;
  const nav = dict?.common?.nav;

  return (
    <section className="reveal-on-scroll bg-gray-900 text-white py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-semibold">{f?.company}</p>
          <div>
            <p className="text-base md:text-lg font-semibold">{f?.zip}</p>
            <p className="text-base md:text-lg font-semibold">{f?.address}</p>
          </div>
          <div><h3 className="text-base md:text-lg font-semibold">{f?.tel}</h3></div>
          <div><h3 className="text-base md:text-lg font-semibold">{f?.email}</h3></div>
        </div>

        <div className="grid grid-cols-[max-content_max-content] gap-3 md:gap-5 md:justify-self-end md:mr-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">{f?.pages}</h4>
            <ul className="space-y-2 text-slate-100">
              <li><a href={`/${locale}/`} className="hover:underline">{nav?.home}</a></li>
              <li><a href={`/${locale}/services`} className="hover:underline">{nav?.product}</a></li>
              <li><a href={`/${locale}/news`} className="hover:underline">{nav?.news}</a></li>
              <li><a href={`/${locale}/recruit`} className="hover:underline">{nav?.recruit}</a></li>
              <li><a href={`/${locale}/contact`} className="hover:underline">{nav?.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">{f?.links}</h4>
            <ul className="space-y-2 text-slate-100">
              <li>
                <a
                  href="https://tomocloud.xsrv.jp/takei-lab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {f?.externalLab}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   10) HomePage
========================================= */
function HomePage() {
  useRevealOnScroll(); // ← これを有効化（今回の修正ポイント）
  const onImgError = useImageFallback();

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Hero />
      <VisionSection onImgError={onImgError} />
      <ValuesSection />
      <TeamSection onImgError={onImgError} />
      <MessageSection onImgError={onImgError} />
      <NewsSection onImgError={onImgError} />
      <RecruitSection />
      <AboutSection />
      <Footer />

      {/* reveal-on-scroll 用の軽量CSS（ここに入れておくと単体で動きます） */}
      <style jsx global>{`
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 600ms ease, transform 600ms ease;
        }
        .reveal-on-scroll.ros-visible {
          opacity: 1;
          transform: none;
        }
      `}</style>
    </div>
  );
}

/* /[locale] ラッパー */
export default function LocaleHome() {
  return <HomePage />;
}
