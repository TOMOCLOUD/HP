import Image from 'next/image';
import SectionHead from './WaveSource';

/**
 * 08 代表より。写真のまわりに三本の輪が、外へ向かって薄くなっていく。
 *
 * メッセージの題を語りの前に置き、本文は一文ごとの段落で読ませる。
 * 「新しい自分が視える世界へ」は目指すものの節に移した。
 */
export default function MessageSection({
  t,
  head,
}: {
  t?: {
    /** メッセージの題。本文とは字の大きさで差をつける */
    title?: string;
    paragraphs?: string[];
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
          {/* 題だけを太く置き、本文はふつうの太さで読ませる */}
          {t?.title ? <h3 className="wv-message-title">{t.title}</h3> : null}
          <div className="wv-message-quote">
            {(t?.paragraphs ?? []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="wv-message-by">
            <span className="wv-lat wv-message-by-role">{t?.role}</span>
            <span className="wv-message-by-name">{t?.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
