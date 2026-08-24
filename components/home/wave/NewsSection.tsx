import Link from 'next/link';
import SectionHead from './WaveSource';
import { tagColor } from './tagColors';

type Item = {
  date: string;
  tag: string;
  tagKey: string;
  org: string;
  title: string;
  text?: string;
};

/**
 * 行の左端が乗る波面の位置。
 *
 * 左に引いた弧は 2次ベジエ Q で、両端が +A、真ん中が -A。
 * 展開すると x(t) = A · (1 - 2t)^2 になるので、行の縦位置 t から
 * そのまま出せる。弧と行の食い違いが起きないよう、同じ式を使う。
 */
const ARC_AMPLITUDE = 74.7;
const ARC_MARGIN = 20;

/** 見出しの一件は本文つきなので、ふつうの行2つ分の高さとして数える */
function arcIndents(rowCount: number) {
  const weights = [2, ...Array(rowCount).fill(1)];
  const total = weights.reduce((a, b) => a + b, 0);
  let acc = 0;
  return weights.map((w) => {
    const t = acc / total;
    acc += w;
    return Math.round(ARC_MARGIN + ARC_AMPLITUDE * (1 - 2 * t) ** 2);
  });
}

function Meta({ item, lead }: { item: Item; lead?: boolean }) {
  const color = tagColor(item.tagKey);
  return (
    <div className="wv-news-meta">
      <span className={`wv-lat wv-news-date${lead ? ' wv-news-date-lead' : ''}`}>{item.date}</span>
      <span className="wv-news-tag" style={{ color }}>
        <i style={{ background: color }} />
        {item.tag}
      </span>
      {/* 見出しの一件だけ、出どころをその場に添える。
          ふつうの行では行の右端に回す */}
      {lead && item.org ? <span className="wv-news-org">{item.org}</span> : null}
    </div>
  );
}

/**
 * 01 ニュース。
 *
 * 実績はこの中に統合した。採択・受賞・媒体掲載は点の色で見分ける。
 * 行の左端は波面に沿って動き、罫は行と行のあいだにだけ、ごく薄く引く。
 */
export default function NewsSection({
  t,
  head,
  locale,
}: {
  t?: {
    legend?: { key: string; label: string }[];
    note?: string;
    featured?: Item;
    items?: Item[];
  };
  head?: { kicker?: string; title?: string; more?: string };
  locale: string;
}) {
  const items = t?.items ?? [];
  const pads = arcIndents(items.length);
  const newsHref = `/${locale}/news`;

  return (
    <section className="wv-wrap wv-sec">
      <SectionHead
        kicker={head?.kicker ?? ''}
        title={head?.title ?? ''}
        aside={
          <Link href={newsHref} className="wv-more">
            {head?.more}
          </Link>
        }
      />

      {/* 実績の種別はここで凡例として示す */}
      <div className="wv-legend">
        {(t?.legend ?? []).map((g) => (
          <span key={g.key} className="wv-legend-item" style={{ color: tagColor(g.key) }}>
            <i style={{ background: tagColor(g.key) }} />
            {g.label}
          </span>
        ))}
        <span className="wv-note wv-legend-note">{t?.note}</span>
      </div>

      <div className="wv-news-list">
        {/* 行の左端が沿っていく波面。縦は伸ばすが、線の太さは保つ */}
        <svg
          className="wv-news-arc"
          viewBox="-96 0 190 910"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path d="M 74.7 0 Q -74.7 455 74.7 910" stroke="#b6d6e9" vectorEffect="non-scaling-stroke" />
          <path d="M 96 0 Q -53 455 96 910" stroke="#e4eff6" vectorEffect="non-scaling-stroke" />
          <path d="M 53 0 Q -96 455 53 910" stroke="#e4eff6" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* 最新の一件 */}
        {t?.featured ? (
          <Link
            href={newsHref}
            className="wv-news-lead"
            style={{ '--wv-arc-pad': `${pads[0]}px` } as React.CSSProperties}
          >
            <Meta item={t.featured} lead />
            <div className="wv-news-lead-title">{t.featured.title}</div>
            <p className="wv-note wv-news-lead-text">{t.featured.text}</p>
          </Link>
        ) : null}

        {items.map((n, i) => (
          <Link
            key={`${n.date}-${n.title}`}
            href={newsHref}
            className="wv-news-row"
            style={{ '--wv-arc-pad': `${pads[i + 1]}px` } as React.CSSProperties}
          >
            <Meta item={n} />
            <span className="wv-news-row-title">{n.title}</span>
            <span className="wv-news-org wv-news-org-right">{n.org}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
