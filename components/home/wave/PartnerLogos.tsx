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
  { key: 'jst', src: '/Image/hp/logo-jst.svg', h: 43, hSm: 32 },
  { key: 'gtie', src: '/Image/hp/logo-gtie.svg', h: 60, hSm: 47 },
  { key: 'amed', src: '/Image/hp/logo-amed.png', h: 38, hSm: 29 },
  { key: 'nedo', src: '/Image/hp/logo-nedo.svg', h: 36, hSm: 26 },
] as const;

/**
 * 上限の高さに届く画面幅。
 *
 * 4つを横一列に並べると、上限の高さでは合計 869px になる。中身の幅は
 * 1200px - 左右の余白で 1080px までしか使えないので、幅の狭い画面では
 * 上限まで伸ばさず、画面幅に比例して縮める。
 */
const FULL_AT_PX = 1500;

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
            style={{
              height: `clamp(${logo.hSm}px, ${((logo.h / FULL_AT_PX) * 100).toFixed(2)}vw, ${logo.h}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
