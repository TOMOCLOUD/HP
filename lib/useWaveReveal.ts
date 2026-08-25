'use client';

import { useEffect } from 'react';

/**
 * 波が届いた順に中身を現す。
 *
 * このページは、ホームの写真から出た波が下へ降りていき、通り過ぎた
 * セクションの波源が順に発火する、という筋で組んである（useWavePropagation）。
 * 登場のアニメーションもその筋に乗せる。セクションが視界に入ったら、
 * そのセクションの中身を上から順に、少しずつ遅らせて浮かび上がらせる。
 *
 * 使い方はマークアップ側の目印だけ。
 *
 *   data-wv-reveal        … 発火のまとまり（ふつうは <section>）
 *   data-wv-rv            … 順に現れる要素。深さは問わない
 *   data-wv-reveal-base   … そのまとまりの開始を遅らせる ms
 *   data-wv-rv-delay      … その要素だけ開始を明示する ms（順番の計算を無視）
 *
 * 初期の非表示は CSS 側に直接書かず、このフックが <html> に
 * data-wv-rv-on を立てて初めて効くようにしている。JS が動かない環境で
 * 本文が永久に消えるのを避けるため。
 *
 * 動かすのは opacity と transform だけに限る。高さを動かすと、
 * ハッシュ遷移（scrollToHashOnMount）の着地位置が狂う。
 */

/** 隣り合う要素をずらす間隔 */
const STAGGER_MS = 110;
/** これ以上ずらすと、最後の要素を待たされる感じが出る */
const MAX_STAGGER_MS = 880;
/** 下端からこの割合だけ内側に入ってから発火する */
const ROOT_MARGIN = '0px 0px -12% 0px';

const REDUCED = '(prefers-reduced-motion: reduce)';

export function useWaveReveal(ready: boolean) {
  // 隠す指定は、観測を張るより先に立てておく。
  // 辞書が届いてから立てると、本文が入った直後の1フレームだけ見えてしまい、
  // そこから opacity 0 に落ちるので、ちらついて見える。
  useEffect(() => {
    if (window.matchMedia(REDUCED).matches) return;
    const root = document.documentElement;
    root.setAttribute('data-wv-rv-on', '');
    return () => root.removeAttribute('data-wv-rv-on');
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia(REDUCED).matches) return;

    const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-wv-reveal]'));
    if (!groups.length) return;

    // まとまりごとに、中の要素へ順番を振る
    const itemsOf = new Map<HTMLElement, HTMLElement[]>();
    for (const group of groups) {
      const items = Array.from(group.querySelectorAll<HTMLElement>('[data-wv-rv]'));
      const base = Number(group.dataset.wvRevealBase ?? 0);
      items.forEach((el, i) => {
        const own = el.dataset.wvRvDelay;
        const delay = own !== undefined ? Number(own) : base + Math.min(i * STAGGER_MS, MAX_STAGGER_MS);
        el.style.transitionDelay = `${delay}ms`;
      });
      itemsOf.set(group, items);
    }

    /**
     * 出し終わったら、付けておいた遅延を外す。
     * この要素に後から別の transition が掛かったとき、登場用の遅延を
     * 引きずらないようにするため。
     */
    const settle = (el: HTMLElement) => {
      el.addEventListener(
        'transitionend',
        (e) => {
          if (e.propertyName !== 'opacity') return;
          el.style.transitionDelay = '';
        },
        { once: true }
      );
    };

    const show = (group: HTMLElement) => {
      group.setAttribute('data-wv-shown', '');
      for (const el of itemsOf.get(group) ?? []) {
        el.setAttribute('data-wv-shown', '');
        settle(el);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN, threshold: 0.06 }
    );

    for (const group of groups) io.observe(group);

    return () => io.disconnect();
  }, [ready]);
}
