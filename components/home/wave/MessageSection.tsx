import SectionHead from './WaveSource';

/** 08 代表より。写真のまわりに三本の輪が、外へ向かって薄くなっていく */
export default function MessageSection({
  t,
  head,
}: {
  t?: { quote?: string; role?: string; name?: string; alt?: string };
  head?: { kicker?: string; title?: string };
}) {
  return (
    <section className="wv-wrap wv-sec">
      <SectionHead kicker={head?.kicker ?? ''} title={head?.title ?? ''} />

      <div className="wv-message">
        <div className="wv-message-photo">
          <span />
          <span />
          <span />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Image/hp/ogawa.jpg" alt={t?.alt ?? ''} width={460} height={460} />
        </div>

        <div>
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
