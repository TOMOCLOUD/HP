'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDict } from '@/lib/useDict';
import { scrollToSectionIfHome } from '@/lib/scrollToSection';
import { TAKEI_LAB_URL } from '@/lib/links';

const TAKEI_LAB = TAKEI_LAB_URL;
const WANTEDLY = 'https://www.wantedly.com/companies/tomocloud';

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
 * フッター。
 *
 * 直前にひと筋だけ水面の断面を置く。ページを通してここだけ、
 * 波が横から見える。
 *
 * 中身は二層。上に社の在り処と行き先、細い罫を挟んで、下に
 * 著作の表示と決まりごとへの導線を置く。読み手が探すものと、
 * 出しておかねばならないものとを、同じ高さに混ぜない。
 */
export default function SiteFooter() {
  const { dict, locale } = useDict();
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();
  const t = dict?.top?.footer;
  const nav = dict?.top?.nav;
  const f = dict?.footer;
  const nextLocale = locale === 'ja' ? 'en' : 'ja';

  // hash を持つ項目は独立ページを持たず、ホームのセクションへの
  // アンカーリンク。ホームに既にいる場合はその場でスクロールし、
  // 他ページにいる場合は Link の既定動作（ホームへ移動）に任せる。
  type FooterLink = { label?: string; href: string; hash?: string };

  const anchor = (hash: string): string => `/${locale}#${hash}`;

  const pages: FooterLink[] = [
    { label: nav?.product, href: `/${locale}/services` },
    { label: nav?.news, href: anchor('news'), hash: 'news' },
    { label: nav?.contact, href: anchor('contact'), hash: 'contact' },
    { label: nav?.about, href: anchor('about'), hash: 'about' },
  ];

  const renderLinks = (items: FooterLink[]) =>
    items.map((p) => (
      <li key={p.href}>
        <Link
          href={p.href}
          onClick={
            p.hash
              ? (e) => {
                  if (scrollToSectionIfHome(p.hash!, pathname, locale)) e.preventDefault();
                }
              : undefined
          }
          scroll={p.hash ? false : undefined}
        >
          {p.label}
        </Link>
      </li>
    ));

  return (
    <footer className="wv-footer" role="contentinfo">
      <div className="wv-moire" />

      <div className="wv-footer-inner">
        <div className="wv-footer-brand">
          <Link href={`/${locale}`} aria-label="TOMOCLOUD">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Image/logo2.png"
              alt="TOMOCLOUD"
              width={420}
              height={177}
              loading="lazy"
              decoding="async"
            />
          </Link>

          <address className="wv-note wv-footer-address">
            {f?.company}
            <br />〒{f?.zip} {f?.address}
          </address>

          {/* 医療機器の作り手として、連絡の取りようは出しておく */}
          <div className="wv-note wv-footer-contact">
            <a href="tel:+81432903105">{f?.tel}</a>
            <a href="mailto:info@tomocloud.co.jp">{f?.email}</a>
          </div>
        </div>

        <div className="wv-footer-col">
          <div className="wv-lat wv-footer-label">{t?.pages}</div>
          <ul>{renderLinks(pages)}</ul>
        </div>

        <div className="wv-footer-col">
          <div className="wv-lat wv-footer-label">{t?.recruit}</div>
          <ul>
            <li>
              <Link
                href={anchor('recruit')}
                onClick={(e) => {
                  if (scrollToSectionIfHome('recruit', pathname, locale)) e.preventDefault();
                }}
                scroll={false}
              >
                {t?.openPositions}
              </Link>
            </li>
            <li>
              <a href={WANTEDLY} target="_blank" rel="noopener noreferrer">
                {t?.wantedly}
              </a>
            </li>
          </ul>
        </div>

        <div className="wv-footer-col">
          <div className="wv-lat wv-footer-label">{t?.links}</div>
          <ul>
            <li>
              <a href={TAKEI_LAB} target="_blank" rel="noopener noreferrer">
                {f?.externalLab}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 下の層。罫を一本挟んで、決まりごとと表示の類をまとめる */}
      <div className="wv-footer-base">
        <div className="wv-footer-base-inner">
          <span className="wv-lat wv-footer-copy">{t?.copyright}</span>

          <Link href={`/${locale}/privacy`} className="wv-footer-legal">
            {nav?.privacy}
          </Link>

          <button
            type="button"
            className="wv-lat wv-footer-lang"
            onClick={() => router.push(switchLocale(pathname, nextLocale))}
            aria-label={locale === 'ja' ? nav?.toEn : nav?.toJa}
          >
            {nextLocale.toUpperCase()}
          </button>
        </div>
      </div>
    </footer>
  );
}
