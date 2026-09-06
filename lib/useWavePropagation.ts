'use client';

import { useEffect } from 'react';

/** 波の周期。CSS 側の wv-prop / wv-srcwave と揃えること */
const PERIOD_S = 14;

/**
 * 最後の波源に波が届く時刻を、周期のどこに置くか。
 * デザイン（1440px 実寸）で最下段の「会社概要」が 12.84 秒に発火していたので、
 * その比率をそのまま使う。
 */
const LAST_ARRIVAL_RATIO = 0.917;

/**
 * ホームの波源から出た波が、ページの下まで降りていくまでの遅延を測って配る。
 *
 * デザインでは「波源からの距離 ÷ 638px/秒」で出した実測値を各セクションに
 * 直接書いていたが、レスポンシブだとセクションの位置が画面幅で変わる。
 * そこで距離は実測し、速度は「最下段の波源に LAST_ARRIVAL_RATIO の時点で
 * 届く」ように決めて、負の animation-delay として --wv-d に入れる。
 */
export function useWavePropagation() {
  useEffect(() => {
    const origin = document.querySelector<HTMLElement>('[data-wave-origin]');
    if (!origin) return;

    const sources = Array.from(document.querySelectorAll<HTMLElement>('[data-wave-src]'));
    if (!sources.length) return;

    const absoluteTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

    const apply = () => {
      const originY = absoluteTop(origin);
      const distances = sources.map((el) => Math.max(0, absoluteTop(el) - originY));
      const farthest = Math.max(...distances);
      if (farthest <= 0) return;

      const speed = farthest / (PERIOD_S * LAST_ARRIVAL_RATIO);

      sources.forEach((el, i) => {
        // 周期をまたぐ距離があっても、位相だけ見れば同じところに落ちる
        const arrival = (distances[i] / speed) % PERIOD_S;
        const delay = arrival - PERIOD_S;
        el.style.setProperty('--wv-d', `${delay.toFixed(2)}s`);
      });
    };

    // 測り直しは次のフレームにまとめる（ResizeObserver の連鎖通知を避ける）
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();

    // 画像やフォントが載って高さが変わったら測り直す
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);
}
