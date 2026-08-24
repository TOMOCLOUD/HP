import SectionHead from './WaveSource';

type Stat = { label?: string; value?: string; source?: string };

/**
 * 05 リンパ浮腫とは。
 *
 * 右の数値は、出典を社内で確認したうえで確定する。
 * 医学的な数値なので、確認できるまでは placeholder のまま置いておく。
 */
export default function LymphedemaSection({
  t,
  head,
}: {
  t?: { p1?: string; p2?: string; stats?: Stat[] };
  head?: { kicker?: string; title?: string };
}) {
  return (
    <section className="wv-wrap wv-sec">
      <SectionHead kicker={head?.kicker ?? ''} title={head?.title ?? ''} />

      <div className="wv-two-col">
        <div style={{ maxWidth: 640 }}>
          <p className="wv-lead" style={{ margin: '0 0 24px' }}>
            {t?.p1}
          </p>
          <p className="wv-lead" style={{ margin: 0 }}>
            {t?.p2}
          </p>
        </div>

        <div>
          {(t?.stats ?? []).map((s) => (
            <div key={s.label} className="wv-stat">
              <div className="wv-note" style={{ fontSize: 13 }}>
                {s.label}
              </div>
              <div className="wv-stat-value">{s.value}</div>
              <div className="wv-note" style={{ fontSize: 12 }}>
                {s.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
