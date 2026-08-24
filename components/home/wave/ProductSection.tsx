'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SectionHead from './WaveSource';
import EitDiagram from './EitDiagram';
import { scrollToSectionIfHome } from '@/lib/scrollToSection';

type Step = { n?: string; name?: string; text?: string };

/**
 * 03 製品と技術。
 *
 * 1. LT monitor。試作機の写真と、開発段階の注記。
 * 2. EIT のリアルタイム再構成。
 * 3. 1フレームができるまでの3段。
 * 4. 実機の写真。どこが中核かは名指しせず、手を動かす範囲の広さで引く。
 */
export default function ProductSection({
  t,
  head,
  locale,
}: {
  t?: {
    eyebrow?: string;
    name?: string;
    lead?: string;
    note?: string;
    disclaimerLabel?: string;
    disclaimer?: string;
    archAlt?: string;
    techEyebrow?: string;
    techTitle?: string;
    techLead?: string;
    techNote?: string;
    eitAria?: string;
    measureLabel?: string;
    reconstructLabel?: string;
    realtimeLabel?: string;
    pipeline?: Step[];
    craftQuote?: string;
    craftNote?: string;
    craftCta?: string;
    probeAlt?: string;
    circuitAlt?: string;
  };
  head?: { kicker?: string; title?: string };
  locale: string;
}) {
  const pathname = usePathname() || `/${locale}`;

  // 「採用」は独立ページを持たず、直後に続くホームの #recruit セクションへ
  // その場でスクロールする。
  const onRecruitClick = (e: React.MouseEvent) => {
    if (scrollToSectionIfHome('recruit', pathname, locale)) e.preventDefault();
  };

  return (
    <section className="wv-wrap wv-sec">
      <SectionHead kicker={head?.kicker ?? ''} title={head?.title ?? ''} />

      <div className="wv-product-lead">
        <div className="wv-arch">
          {/* アーチの半円と同じ中心から、外へ向かって輪を重ねる */}
          <svg className="wv-arch-rings" viewBox="0 0 800 800" fill="none" aria-hidden="true">
            <circle cx="400" cy="400" r="272" stroke="#d2e5f0" strokeWidth="1" />
            <circle cx="400" cy="400" r="330" stroke="#e4eff6" strokeWidth="1" />
            <circle cx="400" cy="400" r="392" stroke="#f0f6fa" strokeWidth="1" />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Image/hp/ltmonitor.png" alt={t?.archAlt ?? ''} width={428} height={303} />
        </div>

        <div className="wv-product-body">
          <div className="wv-eyebrow">{t?.eyebrow}</div>
          <div className="wv-lat wv-product-name">{t?.name}</div>
          <p className="wv-lead">{t?.lead}</p>
          <p className="wv-note" style={{ marginTop: 20 }}>
            {t?.note}
          </p>

          <div className="wv-disclaimer">
            <div className="wv-disclaimer-label">{t?.disclaimerLabel}</div>
            <div className="wv-note" style={{ color: 'var(--wv-body)' }}>
              {t?.disclaimer}
            </div>
          </div>
        </div>
      </div>

      <div className="wv-tech">
        <div className="wv-tech-text">
          <div className="wv-eyebrow">{t?.techEyebrow}</div>
          <div className="wv-tech-title">
            {(t?.techTitle ?? '').split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
          </div>
          <p className="wv-lead">{t?.techLead}</p>
          <p className="wv-note" style={{ marginTop: 18 }}>
            {t?.techNote}
          </p>
        </div>

        <div>
          <EitDiagram
            ariaLabel={t?.eitAria}
            measureLabel={t?.measureLabel}
            reconstructLabel={t?.reconstructLabel}
          />
          <div className="wv-eit-caption">
            <i className="wv-live" />
            <span className="wv-lat">{t?.realtimeLabel}</span>
          </div>
        </div>
      </div>

      {/* 1フレームができるまで */}
      <div className="wv-pipeline">
        {(t?.pipeline ?? []).map((s) => (
          <div key={s.n} className="wv-pipeline-step">
            <span className="wv-lat wv-pipeline-n">{s.n}</span>
            <div>
              <div className="wv-pipeline-name">{s.name}</div>
              <div className="wv-note">{s.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 技術の話を、机の上の実物で受ける。
          写真は大小2枚。比率はおよそ 1 : 0.35、上端をずらして段差をつける */}
      <div className="wv-craft">
        <div>
          <p className="wv-craft-quote">{t?.craftQuote}</p>
          <p className="wv-note" style={{ margin: '0 0 26px' }}>
            {t?.craftNote}
          </p>
          <Link href={`/${locale}#recruit`} className="wv-more" onClick={onRecruitClick} scroll={false}>
            {t?.craftCta}
          </Link>
        </div>

        <div className="wv-craft-photos">
          <div className="wv-craft-photo-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Image/hp/lab-probe.jpg" alt={t?.probeAlt ?? ''} width={780} height={520} />
          </div>
          <div className="wv-craft-photo-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Image/hp/lab-circuit.jpg" alt={t?.circuitAlt ?? ''} width={460} height={345} />
          </div>
        </div>
      </div>
    </section>
  );
}
