import SectionHead from './WaveSource';

type About = Record<string, string | undefined>;

/** 10 会社概要。既存の home.about をそのまま行に落とす */
const ROWS: { label: keyof About; value: keyof About }[] = [
  { label: 'companyLabel', value: 'company' },
  { label: 'businessLabel', value: 'business' },
  { label: 'foundedLabel', value: 'founded' },
  { label: 'repLabel', value: 'rep' },
  { label: 'addressLabel', value: 'address' },
];

export default function AboutSection({
  about,
  head,
}: {
  about?: About;
  head?: { title?: string };
}) {
  return (
    <section className="wv-wrap" style={{ paddingBottom: 'var(--wv-sec-gap)' }}>
      <SectionHead title={head?.title ?? ''} />

      <div style={{ marginTop: 40 }}>
        {ROWS.map((r) => (
          <div key={String(r.value)} className="wv-about-row">
            <div className="wv-about-key">{about?.[r.label]}</div>
            <div className="wv-about-value">{about?.[r.value]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
