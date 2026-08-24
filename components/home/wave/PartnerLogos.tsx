/**
 * 採択・支援の機関。
 *
 * ホーム直下は、機関のロゴだけを静かに並べる。見出しも説明文も置かない。
 * JST・AMED・NEDO は公式サイトの配布物を公式色のまま使っている。
 * GTIE は白一色の公式アートワークしか公開されていないため、
 * 明るい地に載るよう濃色へ置き換えたものを使う。
 *
 * 高さは見た目でそろえているので、数値としてはばらつく。
 */
const LOGOS = [
  { key: 'jst', src: '/Image/hp/logo-jst.svg', h: 34, hSm: 26 },
  { key: 'gtie', src: '/Image/hp/logo-gtie.svg', h: 48, hSm: 38 },
  { key: 'amed', src: '/Image/hp/logo-amed.png', h: 30, hSm: 23 },
  { key: 'nedo', src: '/Image/hp/logo-nedo.svg', h: 29, hSm: 21 },
] as const;

export default function PartnerLogos({ t }: { t?: Record<string, string> }) {
  return (
    <div className="wv-wrap">
      <div className="wv-partners">
        {LOGOS.map((logo) => (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={logo.key}
            src={logo.src}
            alt={t?.[logo.key] ?? logo.key}
            style={{ height: `clamp(${logo.hSm}px, ${logo.hSm / 3.9}vw, ${logo.h}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
