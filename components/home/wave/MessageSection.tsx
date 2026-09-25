import Image from 'next/image';
import SectionHead from './WaveSource';

/**
 * 08 代表より。写真のまわりに三本の輪が、外へ向かって薄くなっていく。
 *
 * 掲げている言葉を語りの前に置く。代表の言葉としていちばん収まる場所で、
 * ヒーローに置くとページの頭にキャッチが二つ並んでしまう。
 */
export default function MessageSection({
  t,
  head,
}: {
  t?: {
    taglineJa?: string;
    taglineEn?: string;
    /** 本文から原文どおり抜き出した一節。本文とは別に大きく置く */
    pull?: string;
    quote?: string;
    role?: string;
    name?: string;
    alt?: string;
  };
  head?: { title?: string };
}) {
  return (
    <section className="wv-wrap wv-sec" data-wv-reveal>
      <SectionHead title={head?.title ?? ''} />

      <div className="wv-message">
        <div className="wv-message-photo" data-wv-rv>
          <span />
          <span />
          <span />
          <Image src="/Image/hp/ogawa.jpg" alt={t?.alt ?? ''} width={460} height={460} />
        </div>

        <div data-wv-rv>
          <div className="wv-message-tagline">
            <div className="wv-message-tagline-ja">{t?.taglineJa}</div>
            <div className="wv-lat wv-message-tagline-en">{t?.taglineEn}</div>
          </div>

          {/* 語りの芯になる患者さんの言葉だけを、先に大きく置く。
              本文は長いので太字にせず、ふつうの太さで読ませる */}
          {t?.pull ? <blockquote className="wv-message-pull">{t.pull}</blockquote> : null}
          <p className="wv-message-quote">{t?.quote}</p>
          <div className="wv-message-by">
            <span className="wv-lat wv-message-by-role">{t?.role}</span>
            <span className="wv-message-by-name">{t?.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
