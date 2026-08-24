'use client';

/**
 * 一瞬で飛ばず、スクロールする動きを見せる。
 * 「動きを減らす」設定の環境では、そのままジャンプに倒す。
 */
function scrollBehavior(): ScrollBehavior {
  if (typeof window === 'undefined') return 'auto';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

/**
 * 同じページ内のセクションへスクロールする。
 *
 * 呼び出し元がすでにホームにいる場合だけ処理し、true を返す
 * （呼び出し側はこれを見て、既定のページ遷移を preventDefault する）。
 * ホーム以外のページにいる場合は何もせず false を返し、
 * 通常の Link 遷移（ホームへ移動してからのハッシュ着地）に任せる。
 */
export function scrollToSectionIfHome(hash: string, pathname: string, locale: string): boolean {
  const home = `/${locale}`;
  if (pathname !== home && pathname !== `${home}/`) return false;

  const target = document.getElementById(hash);
  if (!target) return false;

  target.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
  history.replaceState(null, '', `${home}#${hash}`);
  return true;
}

/** レイアウトが変化するたびにこの時間だけ待ち直し、変化が止まったら着地とみなす */
const SETTLE_MS = 400;
/** これ以上は追いかけない上限（無限に監視し続けないための保険） */
const GIVE_UP_MS = 5000;
/**
 * body の高さは変えずに位置だけ戻される場合に備えた、時間ベースの打ち直し。
 * App Router が「新しいルートは先頭へ」という既定のスクロールリセットを
 * ページ遷移の少し後（体感で 1〜2 秒ほど）に非同期で実行することがあり、
 * ResizeObserver では検知できないその巻き戻しに対抗する。
 */
const RETRY_DELAYS_MS = [0, 50, 120, 250, 450, 700, 1000, 1400, 1900, 2500, 3200];

/**
 * マウント時に URL のハッシュへスクロールする。
 *
 * 辞書の非同期ロードやフォントの font-display: swap により、遷移直後は
 * まだページの高さが確定していない。App Router 自身が一度だけ試みる
 * scrollIntoView も、その未確定な高さに対して行われることがあり、
 * 後から高さが変わるとズレたまま置き去りになる。
 *
 * ここでは body の高さ変化を見張り、変化が SETTLE_MS の間止まった時点で
 * 改めて対象要素へ合わせ直す。加えて、高さは変わらないままスクロール位置
 * だけが後から巻き戻されるケースにも対抗できるよう、時間ベースでも
 * 何度か打ち直す。
 */
export function scrollToHashOnMount(): () => void {
  const hash = window.location.hash.slice(1);
  if (!hash) return () => {};

  const scroll = () => {
    document.getElementById(hash)?.scrollIntoView({ block: 'start', behavior: scrollBehavior() });
  };

  let settleTimer: ReturnType<typeof setTimeout>;
  const scheduleSettle = () => {
    clearTimeout(settleTimer);
    settleTimer = setTimeout(scroll, SETTLE_MS);
  };

  scroll();
  scheduleSettle();

  const observer = new ResizeObserver(scheduleSettle);
  observer.observe(document.body);

  const retryTimers = RETRY_DELAYS_MS.map((ms) => setTimeout(scroll, ms));
  const giveUp = setTimeout(() => observer.disconnect(), GIVE_UP_MS);

  return () => {
    clearTimeout(settleTimer);
    clearTimeout(giveUp);
    retryTimers.forEach(clearTimeout);
    observer.disconnect();
  };
}
