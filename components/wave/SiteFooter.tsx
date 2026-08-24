'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDict } from '@/lib/useDict';
import { scrollToSectionIfHome } from '@/lib/scrollToSection';

const TAKEI_LAB = 'https://tomocloud.xsrv.jp/takei-lab/';

/**
 * フッター。
 *
 * 直前にひと筋だけ水面の断面を置く。ページを通してここだけ、
 * 波が横から見える。
 */
export default function SiteFooter() {
  const { dict, locale } = useDict();
  const pathname = usePathname() || `/${locale}`;
  const t = dict?.top?.footer;
  const nav = dict?.top?.nav;
  const f = dict?.footer;

  // hash を持つ項目は独立ページを持たず、ホームのセクションへの
  // アンカーリンク。ホームに既にいる場合はその場でスクロールし、
  // 他ページにいる場合は Link の既定動作（ホームへ移動）に任せる。
  type FooterLink = { label?: string; href: string; hash?: string };

  const anchor = (hash: string): string => `/${locale}#${hash}`;

  const pagesLeft: FooterLink[] = [
    { label: nav?.product, href: `/${locale}/services` },
    { label: nav?.news, href: anchor('news'), hash: 'news' },
    { label: nav?.achievements, href: `/${locale}/achievements` },
  ];

  const pagesRight: FooterLink[] = [
    { label: nav?.recruit, href: anchor('recruit'), hash: 'recruit' },
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
            <img src="/Image/logo2.png" alt="TOMOCLOUD" width={420} height={177} />
          </Link>
          <div className="wv-note wv-footer-address">
            〒{f?.zip}
            <br />
            {f?.address}
          </div>
        </div>

        <div className="wv-footer-col">
          <div className="wv-lat wv-footer-label">{t?.pages}</div>
          <ul>{renderLinks(pagesLeft)}</ul>
        </div>

        <div className="wv-footer-col">
          <div className="wv-footer-label" aria-hidden="true" />
          <ul>{renderLinks(pagesRight)}</ul>
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

        <div className="wv-lat wv-footer-copy">{t?.copyright}</div>
      </div>
    </footer>
  );
}
