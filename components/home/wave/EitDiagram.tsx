/**
 * EIT のリアルタイム再構成。
 *
 * 左は計測。電流を流す電極ペアが1ステップずつ隣へ移り、16回で一周する。
 * 右は再構成。推定されたインピーダンス分布が揺れ、走査線が3.6秒で
 * 上から下へ抜け、縁の16電極が順に点る。橙色は周囲と導電率が違う領域。
 *
 * 右だけ地を暗く塗っているのは、ここが装置の画面だから。
 * 面を塗るのはページでここと、ボタンと、写真だけ。
 */

/** 円周16等分。r=124 の円周上と、r=66 のモバイル用は使い回せないので実数で持つ */
const ELECTRODES = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
  return { x: 490 + 124 * Math.cos(a), y: 170 + 124 * Math.sin(a), delay: -(i * 2.6) / 16 };
});

const BODY_ELECTRODES = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 - Math.PI / 2;
  return { x: 150 + 124 * Math.cos(a), y: 170 + 124 * Math.sin(a) };
});

export default function EitDiagram({
  ariaLabel,
  measureLabel,
  reconstructLabel,
}: {
  ariaLabel?: string;
  measureLabel?: string;
  reconstructLabel?: string;
}) {
  return (
    <svg className="wv-eit" viewBox="0 0 640 360" fill="none" role="img" aria-label={ariaLabel}>
      <defs>
        <clipPath id="wv-eit-body">
          <circle cx="150" cy="170" r="124" />
        </clipPath>
        <clipPath id="wv-eit-screen">
          <circle cx="490" cy="170" r="124" />
        </clipPath>
        <radialGradient id="wv-eit-a">
          <stop offset="0" stopColor="#1296db" stopOpacity="0.78" />
          <stop offset="1" stopColor="#1296db" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wv-eit-b">
          <stop offset="0" stopColor="#38e1ff" stopOpacity="0.58" />
          <stop offset="1" stopColor="#38e1ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wv-eit-c">
          <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.46" />
          <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="wv-eit-hot">
          <stop offset="0" stopColor="#e8834a" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e8834a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wv-eit-scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38e1ff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#38e1ff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#38e1ff" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* 左：計測。線だけで描く */}
      <g clipPath="url(#wv-eit-body)">
        <g className="wv-eit-iso">
          <circle cx="146" cy="162" r="44" stroke="#1296db" strokeWidth="1" opacity="0.3" />
          <circle cx="146" cy="162" r="74" stroke="#1296db" strokeWidth="1" opacity="0.22" />
          <circle cx="146" cy="162" r="106" stroke="#1296db" strokeWidth="1" opacity="0.14" />
        </g>
        <g className="wv-eit-pair">
          <path d="M 274 170 Q 150 120 26 170" stroke="#1296db" strokeWidth="1.4" opacity="0.5" />
          <path d="M 274 170 Q 150 170 26 170" stroke="#1296db" strokeWidth="1.4" opacity="0.36" />
          <path d="M 274 170 Q 150 220 26 170" stroke="#1296db" strokeWidth="1.4" opacity="0.5" />
        </g>
      </g>
      <circle cx="150" cy="170" r="124" stroke="#0f1e28" strokeWidth="1" />
      <g fill="#1296db" opacity="0.55">
        {BODY_ELECTRODES.map((e, i) => (
          <circle key={i} cx={e.x.toFixed(1)} cy={e.y.toFixed(1)} r="4" />
        ))}
      </g>
      {/* いま通電している2極。上の電流路と同じ速さで回る */}
      <g className="wv-eit-pair" fill="#0d71a4">
        <circle cx="274" cy="170" r="7" />
        <circle cx="26" cy="170" r="7" />
      </g>
      <text x="150" y="342" textAnchor="middle" className="wv-eit-label">
        {measureLabel}
      </text>

      <path d="M300 170 L 338 170 M332 165 L 338 170 L 332 175" stroke="#58666f" strokeWidth="1" />

      {/* 右：再構成。ここだけは装置の画面なので暗い */}
      <g clipPath="url(#wv-eit-screen)">
        <rect x="366" y="46" width="248" height="248" fill="#06101a" />
        {/* 表示器の目盛り */}
        <circle cx="490" cy="170" r="41" stroke="#153b55" strokeWidth="1" />
        <circle cx="490" cy="170" r="82" stroke="#123048" strokeWidth="1" />
        <path d="M366 170 H614 M490 46 V294" stroke="#102a40" strokeWidth="1" />
        <circle className="wv-eit-ba" cx="466" cy="146" r="98" fill="url(#wv-eit-a)" />
        <circle className="wv-eit-bb" cx="530" cy="206" r="70" fill="url(#wv-eit-b)" />
        <circle className="wv-eit-bc" cx="448" cy="218" r="56" fill="url(#wv-eit-c)" />
        <circle className="wv-eit-ba" cx="466" cy="146" r="46" fill="url(#wv-eit-a)" />
        <circle className="wv-eit-ba" cx="466" cy="146" r="24" fill="url(#wv-eit-hot)" />
        <g className="wv-eit-scan">
          <rect x="366" y="-24" width="248" height="70" fill="url(#wv-eit-scan)" />
          <rect x="366" y="46" width="248" height="1.2" fill="#38e1ff" opacity="0.7" />
        </g>
      </g>
      <circle cx="490" cy="170" r="124" stroke="#1e3a5f" strokeWidth="1" />
      <g fill="#38e1ff">
        {ELECTRODES.map((e, i) => (
          <circle
            key={i}
            className="wv-eit-el"
            cx={e.x.toFixed(1)}
            cy={e.y.toFixed(1)}
            r="4.5"
            style={{ animationDelay: `${e.delay.toFixed(4)}s` }}
          />
        ))}
      </g>
      <text x="490" y="342" textAnchor="middle" className="wv-eit-label">
        {reconstructLabel}
      </text>
    </svg>
  );
}
