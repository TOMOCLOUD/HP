'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDict } from '@/lib/useDict';
import { scrollToSectionIfHome } from '@/lib/scrollToSection';

/**
 * ホームの該当セクションへのアンカーリンク。他ページから踏むと、ホームへ
 * 移動したうえでそのセクションまでスクロールする（scrollToSection まかせ）。
 *
 * 「プロダクト」の行き先はホームの #product（プロダクト&テクノロジー）。
 * 別ページの /services ではない。
 *
 * 並びはホームの縦の順（ニュース → プロダクト → 採用 → お問い合わせ）に
 * 合わせる。全部がホーム内のアンカーなので、ヘッダーは実質ホームの目次。
 */
const NAV = [
  { key: 'home', kind: 'page', path: '' },
  { key: 'news', kind: 'anchor', hash: 'news' },
  { key: 'product', kind: 'anchor', hash: 'product' },
  { key: 'recruit', kind: 'anchor', hash: 'recruit' },
  { key: 'contact', kind: 'anchor', hash: 'contact' },
] as const;

/** パスの先頭のロケールだけを入れ替える */
function switchLocale(pathname: string, next: 'ja' | 'en') {
  const parts = pathname.split('/');
  if (parts[1] === 'ja' || parts[1] === 'en') {
    parts[1] = next;
    return parts.join('/') || `/${next}`;
  }
  return `/${next}${pathname === '/' ? '' : pathname}`;
}

/**
 * ヘッダー。
 *
 * 干渉案のヘッダーは、ロゴと項目名だけ。地は白のままで、
 * 下端に髪の毛ほどの罫を一本だけ引く。
 */
export default function SiteHeader() {
  const { dict, locale } = useDict();
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const t = dict?.top?.nav;
  const nextLocale = locale === 'ja' ? 'en' : 'ja';

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // ページを移ったらメニューは閉じる
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isCurrent = (path: string) => {
    const href = `/${locale}${path}`;
    return path === '' ? pathname === href || pathname === `${href}/` : pathname.startsWith(href);
  };

  const hrefFor = (item: (typeof NAV)[number]) =>
    item.kind === 'anchor' ? `/${locale}#${item.hash}` : `/${locale}${item.path}`;

  // ホームに既にいる場合は、ページ遷移を挟まずその場でスクロールする。
  // 他ページにいる場合は Link の既定動作（ホームへ移動）に任せる。
  const onAnchorClick = (hash: string) => (e: React.MouseEvent) => {
    if (scrollToSectionIfHome(hash, pathname, locale)) e.preventDefault();
  };

  return (
    <header className="wv-header">
      <div className="wv-header-bar">
        <Link href={`/${locale}`} className="wv-header-logo" aria-label="TOMOCLOUD">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Image/logo2.png" alt="TOMOCLOUD" width={420} height={177} decoding="async" />
        </Link>

        <nav className="wv-header-nav" aria-label="TOMOCLOUD">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={hrefFor(item)}
              className="wv-header-link"
              aria-current={item.kind === 'page' && isCurrent(item.path) ? 'page' : undefined}
              onClick={item.kind === 'anchor' ? onAnchorClick(item.hash) : undefined}
              scroll={item.kind === 'anchor' ? false : undefined}
            >
              {t?.[item.key]}
            </Link>
          ))}
          <button
            type="button"
            className="wv-lat wv-header-locale"
            onClick={() => router.push(switchLocale(pathname, nextLocale))}
            aria-label={locale === 'ja' ? t?.toEn : t?.toJa}
          >
            {nextLocale.toUpperCase()}
          </button>
        </nav>

        <button
          type="button"
          className="wv-header-burger"
          aria-label={t?.openMenu ?? 'Menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* モバイルの引き出し。地は白のまま、項目は罫で区切る */}
      <div className="wv-drawer" data-open={menuOpen} role="dialog" aria-modal="true" aria-hidden={!menuOpen}>
        <button
          type="button"
          className="wv-drawer-close"
          aria-label={t?.closeMenu ?? 'Close'}
          onClick={() => setMenuOpen(false)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <nav className="wv-drawer-nav">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={hrefFor(item)}
              onClick={(e) => {
                if (item.kind === 'anchor') onAnchorClick(item.hash)(e);
                setMenuOpen(false);
              }}
              scroll={item.kind === 'anchor' ? false : undefined}
            >
              {t?.[item.key]}
            </Link>
          ))}
          <button
            type="button"
            className="wv-lat"
            onClick={() => {
              setMenuOpen(false);
              router.push(switchLocale(pathname, nextLocale));
            }}
          >
            {nextLocale.toUpperCase()}
          </button>
        </nav>
      </div>
    </header>
  );
}
