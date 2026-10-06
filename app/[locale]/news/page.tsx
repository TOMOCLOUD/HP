'use client';

import { useDict } from '@/lib/useDict';
import SectionHead from '@/components/home/wave/WaveSource';
import { Meta, Row } from '@/components/home/wave/NewsSection';
import { newsItems, toNewsRow } from '@/content/news';

/**
 * ニュースのアーカイブ。全件を年ごとにまとめる。
 *
 * 行の語彙（日付・色点タグ・タイトル・出どころ・外部リンク）はトップと
 * 同じものを使い回す。弧は「直近の動き」を見せるトップの演出なので
 * 持ち込まず、年見出しと行のリズムだけで組む。注目枠だった件も
 * ここではふつうの一行になる。
 */
export default function NewsArchivePage() {
  const { dict, locale } = useDict();
  const title = dict?.top?.sections?.news?.title ?? '';

  const sorted = [...newsItems].sort((a, b) => b.date.localeCompare(a.date));
  const years: string[] = [];
  const byYear = new Map<string, typeof sorted>();
  for (const item of sorted) {
    const y = item.date.slice(0, 4);
    if (!byYear.has(y)) {
      byYear.set(y, []);
      years.push(y);
    }
    byYear.get(y)!.push(item);
  }

  return (
    <div className="wv">
      <section className="wv-wrap wv-sec wv-news-archive">
        <SectionHead title={title} />

        {years.map((y) => (
          <section key={y} className="wv-news-yeargroup">
            <h2 className="wv-lat wv-news-year">{y}</h2>
            {byYear.get(y)!.map((n) => {
              const row = toNewsRow(n, locale);
              return (
                <Row key={`${row.date}-${row.title}`} item={row} className="wv-news-row" pad={0}>
                  <Meta item={row} />
                  <span className="wv-news-row-title">{row.title}</span>
                  <span className="wv-news-org wv-news-org-right">{row.org}</span>
                </Row>
              );
            })}
          </section>
        ))}
      </section>
    </div>
  );
}
