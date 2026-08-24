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

/**
 * 見出しの左に置く波源の点 + 見出し。
 *
 * 「01 · NEWS」のような英字ラベルは冗長なので置かない。波が届いて打ち返す
 * 一滴だけを、セクション名のすぐ横に残す。
 */
export default function SectionHead({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className="wv-title-row">
      <h2 className="wv-h2">
        <WaveSource />
        <span>{title}</span>
      </h2>
      {aside}
    </div>
  );
}
