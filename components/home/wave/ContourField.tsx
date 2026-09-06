/**
 * 等高線の地。
 *
 * 体液は途切れずにつながっている。その連続性を、地形図の等高線で静かに敷く。
 * 3本ごとに少しだけ濃い線を引くのは地形図の作法（計曲線）で、
 * それは contour.svg のほうに入っている。
 */
const BLOBS = [
  { left: '17%', top: '14%', rot: '12deg', scale: 1.05 },
  { left: '83%', top: '37%', rot: '-20deg', scale: 0.86 },
  { left: '14%', top: '64%', rot: '30deg', scale: 1.15 },
  { left: '90%', top: '92%', rot: '-8deg', scale: 0.95 },
];

export default function ContourField() {
  return (
    <div className="wv-contours" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          style={
            {
              left: b.left,
              top: b.top,
              '--wv-rot': b.rot,
              '--wv-scale': b.scale,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
