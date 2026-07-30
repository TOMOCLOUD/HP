'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDict } from '@/lib/useDict';

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
    title: '千葉大学 学術研究・イノベーション推進機構（IMO）客員准教授',
    subtitle: '千葉大学大学院融合理工学府博士後期課程修了(工学博士)',
    positionNote: '千葉大学 学術研究・イノベーション推進機構（IMO）客員准教授',
    bio: 'トビタテ！留学JAPAN日本代表としてエジンバラ大学再生医療研究所に1年間研究留学（博士前期課程時）。『医療×工学』をキーワードに社会実装を推進し、婦人科系がん治療後のリンパ浮腫課題解決に向け、電気インピーダンス・トモグラフィー（EIT）を用いた医療機器を開発中。「新しい自分が視える世界」を目指し、医療・介護・ヘルスケア領域での事業化に邁進。所属研究室の武居教授らと共に2022年度JST START「プロジェクト推進型起業実証支援」に採択。',
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
    bio: 'H7〜H23 日本大学機械工学科 助手・専任講師・准教授・教授。この間、混相流の電気計測と力学研究に従事し、JST独創的研究成果育成事業、科研費基盤C（2回）、JST地域イノベーション創出総合支援事業、科研費基盤Bの研究代表者として、EIT法の基礎開発と産業・バイオメディカル分野への応用を推進。H23〜現在は千葉大学大学院工学研究院教授として、生体・混相流の電気計測と力学研究を継続。JST A-STEP（FS含む）をはじめ複数プロジェクトでプラント／生体計測へ展開し、科研費基盤Aでは血流内の血栓可視化へ発展。H30にはNEDO先進的IoTプロジェクトに採択され、「IoTリンパ浮腫トモグラフィク・モニタによるAI早期発見診断」に従事。',
    achievements: [
      'JST A-STEP（FS含む）・科研費 基盤A/B/Cの研究代表者',
      'H30 NEDO 先進的IoTプロジェクト採択（AI×リンパ浮腫）',
      '第4回リンパ浮腫学会総会／第84回日本循環器学会学術集会 招待講演',
      'NEDO審査員特別賞、NEDO TCP2017ファイナリスト賞 ほか受賞多数',
    ],
  },
  {
    id: 'kinouchi',
    name: '木内 悠太',
    nameEn: 'Yuta Kinouchi',
    role: 'Co-Founder',
    image: '/Image/Kinouchi_image.jpg',
  },
];

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-500 ease-out
                    ${entered ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={`relative transition-all duration-500 ease-out w-full max-w-3xl
                    ${entered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
      >
        <div
          ref={dialogRef}
          className="w-full rounded-2xl bg-white shadow-2xl outline-none max-h-[90vh] flex flex-col overflow-hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="flex-shrink-0 bg-white p-6 border-b border-zinc-200 flex items-start gap-4">
            <h2 className="text-xl font-semibold leading-tight">{title}</h2>
            <button
              onClick={handleClose}
              className="ml-auto flex-shrink-0 rounded-lg px-3 py-2 text-sm ring-1 ring-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2"
            >
              {closeLabel}
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function TeamSection({
  onImgError,
}: {
  onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
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
                  className="block w-36 h-36 md:w-48 md:h-48 object-cover mb-4 border border-gray-300 bg-gray-100 rounded"
                  loading="lazy"
                />
              ) : (
                <div className="w-36 h-36 md:w-48 md:h-48 mb-4 grid place-items-center bg-gray-100 border border-gray-300 rounded">
                  <span className="text-gray-500">{m.name}</span>
                </div>
              )}
              <h3 className="text-xl md:text-2xl font-semibold mb-1 text-gray-900 leading-snug">
                {locale === 'en' ? m.nameEn || m.name : m.name}
              </h3>
              {m.nameEn && locale === 'ja' && <p className="text-gray-500 italic mb-1 md:mb-2">{m.nameEn}</p>}
              <p className="text-base md:text-lg text-sky-700 font-medium">{m.role}</p>
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
