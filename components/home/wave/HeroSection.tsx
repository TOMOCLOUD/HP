'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { scrollToSectionIfHome } from '@/lib/scrollToSection';

/**
 * ヒーロー。
 *
 * 写真そのものを波源にする。輪は写真のふちから生まれて外へ広がり、
 * 落ちたもう一滴の波と、画面の中ほどで重なる。
 * そのうちの一本（wv-hp）がページの下へ向かって出発する。
 */

/** 14秒周期を10本で割って、輪が途切れず出ているように見せる */
const RIPPLE_DELAYS = [0, -1.4, -2.8, -4.2, -5.6, -7, -8.4, -9.8, -11.2, -12.6];
/** 一滴のほうは9秒周期を8本で */
const DROP_DELAYS = [0, -1.13, -2.25, -3.38, -4.5, -5.63, -6.75, -7.88];

type Hero = {
  title?: string;
  sub?: string;
  recruitCta?: string;
  photoAlt?: string;
};

/**
 * 読み込み直後に順に現れる。落ちた一滴が広げた波が届いた順、という筋なので、
 * 写真が円に開くのを合図に、見出し → 本文 → 採用への一行と続く。
 * 見出しは1行ずつずらす。
 */
const HERO_BASE_MS = 360;
const HERO_LINE_MS = 155;
/** 本文が出たあと、ひと呼吸おいて採用への一行が続く */
const HERO_CTA_MS = 180;

export default function HeroSection({ t, locale }: { t?: Hero; locale: string }) {
  const titleLines = (t?.title ?? '').split('\n');
  // 本文も見出しと同じく \n で折り返し位置を決める。
  // 幅まかせにすると語の途中で切れるため
  const subLines = (t?.sub ?? '').split('\n');
  const subDelay = HERO_BASE_MS + 180 + titleLines.length * HERO_LINE_MS + 125;
  const pathname = usePathname() || `/${locale}`;

  // 「採用」は独立ページを持たず、同じホームの #recruit セクションへ
  // その場でスクロールする（ProductSection の導線と同じ扱い）。
  const onRecruitClick = (e: React.MouseEvent) => {
    if (scrollToSectionIfHome('recruit', pathname, locale)) e.preventDefault();
  };

  return (
    <section className="wv-hero" data-wv-reveal data-wv-reveal-base={HERO_BASE_MS}>
      <div className="wv-hero-calm" />

      <div className="wv-hero-inner">
        <div className="wv-hero-text">
          <h1 className="wv-hero-title">
            {titleLines.map((line, i) => (
              <span
                key={i}
                style={{ display: 'block' }}
                data-wv-rv
                data-wv-rv-delay={HERO_BASE_MS + 180 + i * HERO_LINE_MS}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="wv-hero-sub" data-wv-rv data-wv-rv-delay={subDelay}>
            {subLines.map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
          </p>

          <Link
            href={`/${locale}#recruit`}
            className="wv-hero-more"
            onClick={onRecruitClick}
            scroll={false}
            data-wv-rv
            data-wv-rv-delay={subDelay + HERO_CTA_MS}
          >
            <span>{t?.recruitCta}</span>
            <i />
          </Link>
        </div>

        <div className="wv-hero-photo">
          {/* 波源その一。写真のふちから輪が出る */}
          <div className="wv-wf">
            {RIPPLE_DELAYS.map((d) => (
              <i key={d} style={{ animationDelay: `${d}s` }} />
            ))}
          </div>

          {/* ここから下のセクションへ、波が順に渡っていく */}
          <div className="wv-hp" data-wave-origin>
            <span />
            <span style={{ animationDelay: '-0.35s' }} />
          </div>

          <Image
            src="/Image/hp/hero.jpg"
            priority
            alt={t?.photoAlt ?? ''}
            width={900}
            height={600}
            data-wv-rv
            data-wv-rv-circle
            data-wv-rv-delay={0}
          />
        </div>
      </div>

      {/* 波源その二。落ちたばかりの一滴 */}
      <div className="wv-wf wv-drop wv-hero-drop">
        {DROP_DELAYS.map((d) => (
          <i key={d} style={{ animationDelay: `${d}s` }} />
        ))}
      </div>
      <span className="wv-hero-droplet" />
    </section>
  );
}
