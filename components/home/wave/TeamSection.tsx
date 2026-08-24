import SectionHead from './WaveSource';

type Member = { role?: string; name?: string; title?: string; image?: string };

/**
 * 07 チーム。
 *
 * 一人ひとりを一滴として扱い、まわりに離れた輪を一本置く。
 * 頭の高さは、上に引いた弧に沿ってずらす。
 */
export default function TeamSection({
  t,
  head,
}: {
  t?: { members?: Member[] };
  head?: { kicker?: string; title?: string };
}) {
  return (
    <section className="wv-wrap wv-sec">
      <SectionHead kicker={head?.kicker ?? ''} title={head?.title ?? ''} />

      <div className="wv-team">
        <svg
          className="wv-team-arc"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          height={100}
          fill="none"
          aria-hidden="true"
        >
          <path d="M 0 80 Q 600 0 1200 80" stroke="#c7deec" vectorEffect="non-scaling-stroke" />
          <path d="M 0 98 Q 600 18 1200 98" stroke="#e4eff6" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="wv-team-grid">
          {(t?.members ?? []).map((m) => (
            <div key={m.name} className="wv-member">
              <div className="wv-member-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.name ?? ''} width={224} height={224} />
              </div>
              <div className="wv-lat wv-member-role">{m.role}</div>
              <div className="wv-member-name">{m.name}</div>
              {m.title ? (
                <div className="wv-note" style={{ fontSize: 13 }}>
                  {m.title}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
