import Image from 'next/image';
import SectionHead from './WaveSource';

type Stat = { label?: string; value?: string; ref?: string };
type Ref = { n?: string; text?: string };

/**
 * 05 リンパ浮腫とは。
 *
 * 図は既存のプロダクトページで使っているものをそのまま置く。細い青線と
 * 淡い円だけの絵なので、枠に入れず、四辺を白へ落として地に溶かす。
 *
 * 下の数値は医学的な数字なので、典拠のあることが見て分かるようにする。
 * 値の右肩に番号を振り、出典そのものは三つの下へまとめた。同じ出典を
 * 引く数値が複数あるため、各枠に書くと同じ一行が何度も出てしまう。
 */
export default function LymphedemaSection({
  t,
  head,
}: {
  t?: {
    p1?: string;
    p2?: string;
    p3?: string;
    p4?: string;
    imageAlt?: string;
    stats?: Stat[];
    refs?: Ref[];
  };
  head?: { title?: string };
}) {
  return (
    <section className="wv-wrap wv-sec" data-wv-reveal>
      <SectionHead title={head?.title ?? ''} />

      <div className="wv-lymph">
        <div className="wv-lymph-text" data-wv-rv>
          <p className="wv-lead">{t?.p1}</p>
          <p className="wv-lead">{t?.p2}</p>
          <p className="wv-lead">{t?.p3}</p>
          <p className="wv-lead">{t?.p4}</p>
        </div>

        <figure className="wv-lymph-figure" data-wv-rv>
          <Image
            src="/Image/Lymphedema.png"
            alt={t?.imageAlt ?? ''}
            width={1536}
            height={1024}
          />
        </figure>
      </div>

      <div className="wv-lymph-stats">
        {(t?.stats ?? []).map((s) => (
          <div key={s.label} className="wv-stat" data-wv-rv>
            <div className="wv-note" style={{ fontSize: 14 }}>
              {s.label}
            </div>
            <div className="wv-stat-value">
              {s.value}
              {s.ref ? <sup className="wv-stat-ref">{s.ref}</sup> : null}
            </div>
          </div>
        ))}
      </div>

      {/* 出典。数値そのものではないので、字を落として下へ引く */}
      <div className="wv-lymph-refs" data-wv-rv>
        {(t?.refs ?? []).map((r) => (
          <p key={r.n} className="wv-lymph-ref">
            <span className="wv-lymph-ref-n">※{r.n}</span>
            {r.text}
          </p>
        ))}
      </div>
    </section>
  );
}
