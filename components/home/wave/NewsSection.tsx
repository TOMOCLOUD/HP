import Link from 'next/link';
import SectionHead from './WaveSource';
import { tagColor } from './tagColors';
import { newsItems, toNewsRow, type LocalizedNewsRow } from '@/content/news';

/** 発表元や報道記事など、その件の一次情報を url に持つ。無い件は文字のまま置く */
export type Item = LocalizedNewsRow;

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

export function Meta({ item, lead }: { item: Item; lead?: boolean }) {
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
 * 一件ぶんの器。
 *
 * ニュース専用ページは持たないので、行を踏むと発表元や報道記事の
 * 外部ページを別タブで開く。URL が無い件はリンクにせず、同じ見た目の
 * 箱として置く（踏めることを示すカーソルや下線は出ない）。
 */
export function Row({
  item,
  className,
  pad,
  children,
}: {
  item: Item;
  className: string;
  pad: number;
  children: React.ReactNode;
}) {
  const style = { '--wv-arc-pad': `${pad}px` } as React.CSSProperties;

  if (!item.url) {
    return (
      <div className={className} style={style} data-wv-rv>
        {children}
      </div>
    );
  }

  return (
    <a
      className={className}
      style={style}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-wv-rv
    >
      {children}
    </a>
  );
}

/** トップに出す直近の件数。これを超えた分はアーカイブ（/news）にだけ出る */
const TOP_COUNT = 7;

/**
 * 01 ニュース。
 *
 * 実績はこの中に統合した。種別は点の色で見分ける。
 * 行の左端は波面に沿って動き、罫は行と行のあいだにだけ、ごく薄く引く。
 *
 * 出すのは注目の1件と直近 TOP_COUNT 件だけ。件数が増えてもこの節の丈は
 * 変わらず、全件は末尾の導線の先（/news）が受け持つ。
 */
export default function NewsSection({
  head,
  locale,
}: {
  head?: { title?: string; more?: string };
  locale: 'ja' | 'en';
}) {
  const sorted = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
  const featured = sorted.find((n) => n.featured);
  const lead = featured ? toNewsRow(featured, locale) : undefined;
  const items = sorted
    .filter((n) => !n.featured)
    .slice(0, TOP_COUNT)
    .map((n) => toNewsRow(n, locale));
  const pads = arcIndents(items.length);

  return (
    <section className="wv-wrap wv-sec" data-wv-reveal>
      <SectionHead title={head?.title ?? ''} />

      <div className="wv-news-list">
        {/* 行の左端が沿っていく波面。縦は伸ばすが、線の太さは保つ。
            pathLength="1" にしてあるのは、登場のときに上から順に引くため
            （dasharray を長さの実測に依らせないで済む） */}
        <svg
          className="wv-news-arc"
          viewBox="-96 0 190 910"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
          data-wv-rv
          data-wv-rv-draw
        >
          <path
            d="M 74.7 0 Q -74.7 455 74.7 910"
            stroke="#b6d6e9"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
          />
          <path
            d="M 96 0 Q -53 455 96 910"
            stroke="#e4eff6"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
          />
          <path
            d="M 53 0 Q -96 455 53 910"
            stroke="#e4eff6"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
          />
        </svg>

        {/* 注目の一件 */}
        {lead ? (
          <Row item={lead} className="wv-news-lead" pad={pads[0]}>
            <Meta item={lead} lead />
            <div className="wv-news-lead-title">{lead.title}</div>
            <p className="wv-note wv-news-lead-text">{lead.text}</p>
          </Row>
        ) : null}

        {items.map((n, i) => (
          <Row key={`${n.date}-${n.title}`} item={n} className="wv-news-row" pad={pads[i + 1]}>
            <Meta item={n} />
            <span className="wv-news-row-title">{n.title}</span>
            <span className="wv-news-org wv-news-org-right">{n.org}</span>
          </Row>
        ))}
      </div>

      {/* 全件は年別のアーカイブで。矢印はヒーローの採用導線と同じ山形 */}
      {head?.more ? (
        <div className="wv-news-foot" data-wv-rv>
          <Link href={`/${locale}/news`} className="wv-news-more">
            <span>{head.more}</span>
            <i />
          </Link>
        </div>
      ) : null}
    </section>
  );
}
