import SectionHead from './WaveSource';

type Value = { title?: string; text?: string };

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
 * 弧をひとつ引いて、その下に三つの文をぶら下げる。
 * Values は弧を下にふくらませ、四つの柱の頭をそれに沿ってずらす。
 */
export default function MissionSection({
  t,
  head,
  values,
}: {
  t?: {
    left?: string;
    statement?: string;
    emphasis?: string;
    right?: string;
    en?: string;
  };
  head?: { kicker?: string; title?: string };
  values?: Value[];
}) {
  return (
    <section className="wv-wrap wv-sec">
      <SectionHead kicker={head?.kicker ?? ''} title={head?.title ?? ''} />

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
          <div className="wv-mission-cols">
            <p className="wv-lead wv-mission-col-left">{t?.left}</p>

            <div className="wv-mission-col-right">
              <p className="wv-lead">{t?.right}</p>
              <div className="wv-lat wv-mission-en">
                <Lines text={t?.en} />
              </div>
            </div>
          </div>

          <div className="wv-mission-statement">
            <div className="wv-mission-statement-ja">
              <Lines text={t?.statement} />
            </div>
            <div className="wv-mission-statement-em">{t?.emphasis}</div>
          </div>
        </div>
      </div>

      <div className="wv-values">
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
            <div key={v.title ?? i}>
              <div className="wv-lat wv-value-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="wv-lat wv-value-title">{v.title}</div>
              <div className="wv-note">{v.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
