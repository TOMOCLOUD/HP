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
  badge?: string;
  title?: string;
  sub?: string;
  taglineJa?: string;
  taglineEn?: string;
  photoAlt?: string;
};

export default function HeroSection({ t }: { t?: Hero }) {
  return (
    <section className="wv-hero">
      <div className="wv-hero-calm" />

      <div className="wv-hero-inner">
        <div className="wv-hero-text">
          <div className="wv-hero-badge">
            <i />
            <span>{t?.badge}</span>
          </div>

          <h1 className="wv-hero-title">
            {(t?.title ?? '').split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>
                {line}
              </span>
            ))}
          </h1>

          <p className="wv-hero-sub">{t?.sub}</p>
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

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Image/hp/hero.jpg" alt={t?.photoAlt ?? ''} width={900} height={600} />
        </div>

        <div className="wv-hero-tagline">
          <div className="wv-hero-tagline-ja">{t?.taglineJa}</div>
          <div className="wv-lat wv-hero-tagline-en">{t?.taglineEn}</div>
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
