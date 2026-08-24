import SectionHead from './WaveSource';

type Stat = { label?: string; value?: string; source?: string };

/**
 * 05 リンパ浮腫とは。
 *
 * 図は既存のプロダクトページで使っているものをそのまま置く。細い青線と
 * 淡い円だけの絵なので、枠に入れず、四辺を白へ落として地に溶かす。
 *
 * 右の数値は、出典を社内で確認したうえで確定する。
 * 医学的な数値なので、確認できるまでは placeholder のまま置いておく。
 */
export default function LymphedemaSection({
  t,
  head,
}: {
  t?: { p1?: string; p2?: string; imageAlt?: string; stats?: Stat[] };
  head?: { title?: string };
}) {
  return (
    <section className="wv-wrap wv-sec">
      <SectionHead title={head?.title ?? ''} />

      <div className="wv-lymph">
        <div className="wv-lymph-text">
          <p className="wv-lead">{t?.p1}</p>
          <p className="wv-lead">{t?.p2}</p>
        </div>

        <figure className="wv-lymph-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Image/Lymphedema.png" alt={t?.imageAlt ?? ''} width={1536} height={1024} />
        </figure>
      </div>

      <div className="wv-lymph-stats">
        {(t?.stats ?? []).map((s) => (
          <div key={s.label} className="wv-stat">
            <div className="wv-note" style={{ fontSize: 14 }}>
              {s.label}
            </div>
            <div className="wv-stat-value">{s.value}</div>
            <div className="wv-note" style={{ fontSize: 13 }}>
              {s.source}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
