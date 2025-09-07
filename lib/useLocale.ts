// lib/useLocale.ts
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { isLocale, defaultLocale, type Locale, locales } from './i18n';

/**
 * 現在のロケールをパスから取得し、ロケール切替を行うフック
 * 例: /ja/services -> locale='ja'
 *     /services    -> locale=defaultLocale ('ja')
 */
export function useLocale() {
  const pathname = usePathname() || '/';
  const router = useRouter();

  // 先頭セグメントを見てロケール判定
  const seg = pathname.split('/').filter(Boolean)[0];
  const currentLocale: Locale = isLocale(seg) ? (seg as Locale) : defaultLocale;

  /**
   * 今のパス構造を保ったまま、先頭のロケールを置換 or 付与して返す
   */
  function pathWithLocale(next: Locale) {
    const parts = pathname.split('/').filter(Boolean);
    if (isLocale(parts[0])) {
      parts[0] = next;                 // /ja/xxx → /en/xxx
      return '/' + parts.join('/');
    }
    // /xxx → /en/xxx （デフォルト言語でも常に /<locale>/ を付ける運用）
    return `/${next}${pathname === '/' ? '' : pathname}`;
  }

  /**
   * ロケール切替（push 遷移）
   */
  function setLocale(next: Locale) {
    router.push(pathWithLocale(next));
  }

  return {
    locale: currentLocale,
    locales,          // ['ja', 'en']
    defaultLocale,    // 'ja'
    setLocale,
    pathWithLocale,
  };
}
