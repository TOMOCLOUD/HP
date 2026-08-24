import type { ReactNode } from 'react';

/**
 * セクションの波源。
 *
 * ホームの写真から出た波が届いた瞬間に、その場で小さく打ち返す一滴。
 * 発火の遅延は useWavePropagation が距離を測って --wv-d に入れるので、
 * ここでは data-wave-src の目印だけを付けておく。
 */
export function WaveSource() {
  return (
    <span className="wv-src" data-wave-src aria-hidden="true">
      <span className="wv-p" />
      <span className="wv-p wv-p2" />
      <span className="wv-w" />
      <span className="wv-w wv-w2" />
      <span className="wv-dot" />
    </span>
  );
}

/** 波源の点 + 番号つきの英字ラベル + 見出し */
export default function SectionHead({
  kicker,
  title,
  aside,
}: {
  kicker: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <>
      <div className="wv-head">
        <WaveSource />
        <span className="wv-lat wv-kicker">{kicker}</span>
      </div>
      <div className="wv-title-row">
        <h2 className="wv-h2">{title}</h2>
        {aside}
      </div>
    </>
  );
}
