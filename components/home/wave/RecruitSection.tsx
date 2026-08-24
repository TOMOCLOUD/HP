import SectionHead from './WaveSource';

const WANTEDLY = 'https://www.wantedly.com/companies/tomocloud';

type Job = { type?: string; title?: string; detail?: string; source?: string; url?: string };

/**
 * 04 採用。
 *
 * 製品と技術の直後に置いた。技術を読んだ直後に募集が目に入る。
 */
export default function RecruitSection({
  t,
  head,
}: {
  t?: { lead?: string; jobs?: Job[] };
  head?: { title?: string; more?: string };
}) {
  return (
    <section className="wv-wrap wv-sec">
      <SectionHead
        title={head?.title ?? ''}
        aside={
          <a href={WANTEDLY} target="_blank" rel="noopener noreferrer" className="wv-more">
            {head?.more}
          </a>
        }
      />

      <p className="wv-lead" style={{ margin: '32px 0 0', maxWidth: 800 }}>
        {t?.lead}
      </p>

      <div className="wv-jobs">
        {(t?.jobs ?? []).map((j) => (
          <div key={j.title} className="wv-job">
            <div className="wv-job-type">{j.type}</div>
            <div className="wv-job-title">
              {j.url ? (
                <a href={j.url} target="_blank" rel="noopener noreferrer">
                  {j.title}
                </a>
              ) : (
                j.title
              )}
            </div>
            <div className="wv-note">{j.detail}</div>
            {j.source ? (
              <div className="wv-note" style={{ fontSize: 12, marginTop: 10 }}>
                {j.source}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
