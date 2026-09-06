import SectionHead from './WaveSource';

type Value = { title?: string; text?: string };

/**
 * 四つの柱を出す間隔。
 *
 * ページ全体の既定（110ms）より広く取る。ここは 01 から順に
 * 一枚ずつ立っていくところを見せたい場所なので、隣と重なりすぎない
 * ところまで開ける。
 */
const VALUE_STAGGER_MS = 240;

function Lines({ text }: { text?: string }) {
  return (
    <>
      {(text ?? '').split('\n').map((line, i) => (
        <span key={i} style={{ display: 'block' }}>
          {line}
        </span>
      ))}
    </>
  );
}

/**
 * 02 目指すもの。
 *
 * 弧をひとつ引いて、その下にミッションの一文だけを置く。
 * Values は弧を下にふくらませ、四つの柱の頭をそれに沿ってずらす。
 */
export default function MissionSection({
  t,
  head,
  values,
}: {
  t?: {
    statement?: string;
    emphasis?: string;
  };
  head?: { title?: string };
  values?: Value[];
}) {
  return (
    <section className="wv-wrap wv-sec" data-wv-reveal>
      <SectionHead title={head?.title ?? ''} />

      <div className="wv-mission">
        <svg
          className="wv-mission-arc"
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          height={180}
          fill="none"
          aria-hidden="true"
        >
          <path d="M 0 160 Q 600 -140 1200 160" stroke="#b6d6e9" vectorEffect="non-scaling-stroke" />
          <path d="M 0 178 Q 600 -122 1200 178" stroke="#e4eff6" vectorEffect="non-scaling-stroke" />
          <path d="M 0 138 Q 600 -162 1200 138" stroke="#e4eff6" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="wv-mission-inner">
          <div className="wv-mission-statement" data-wv-rv>
            <div className="wv-mission-statement-ja">
              <Lines text={t?.statement} />
            </div>
            <div className="wv-mission-statement-em">{t?.emphasis}</div>
          </div>
        </div>
      </div>

      {/* セクションの下の方にあるので、ここだけ別の発火のまとまりにする。
          読み手が Values まで来てから、01 → 04 と順に立ち上がる */}
      <div className="wv-values" data-wv-reveal>
        <svg
          className="wv-values-arc"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          height={80}
          fill="none"
          aria-hidden="true"
        >
          <path d="M 0 20 Q 600 80 1200 20" stroke="#c7deec" vectorEffect="non-scaling-stroke" />
          <path d="M 0 0 Q 600 60 1200 0" stroke="#e4eff6" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="wv-values-grid">
          {(values ?? []).map((v, i) => (
            <div key={v.title ?? i} data-wv-rv data-wv-rv-delay={i * VALUE_STAGGER_MS}>
              <div className="wv-lat wv-value-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="wv-lat wv-value-title">{v.title}</div>
              <div className="wv-note">
                <Lines text={v.text} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
