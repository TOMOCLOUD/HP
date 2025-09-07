'use client';

import Link, { type LinkProps } from 'next/link';
import { useLocale } from '../lib/useLocale';

type Props = Omit<React.ComponentProps<typeof Link>, 'href'> & {
  href: LinkProps['href'];
};

/** 受け取った href にロケールを付与する Link ラッパー */
export default function LocaleLink({ href, ...rest }: Props) {
  const { locale } = useLocale();

  // 外部リンクはそのまま通す
  if (typeof href === 'string' && /^https?:\/\//i.test(href)) {
    return <Link href={href} {...rest} />;
  }
  if (href instanceof URL) {
    if (/^https?:\/\//i.test(href.href)) {
      return <Link href={href} {...rest} />;
    }
  }

  // 先頭セグメントにロケールを入れる関数
  const withLocale = (path: string) => {
    const clean = path.startsWith('/') ? path : `/${path}`;
    const segs = clean.split('/').filter(Boolean);

    // すでに /ja or /en で始まっていたら置き換え
    if (segs[0] === 'ja' || segs[0] === 'en') {
      segs[0] = locale;
      return `/${segs.join('/')}` || `/${locale}`;
    }
    // 先頭にロケールを付与
    if (segs.length === 0) return `/${locale}`;
    return `/${locale}/${segs.join('/')}`;
  };

  // 文字列 href の場合
  if (typeof href === 'string') {
    const path = href === '/' ? '/' : href;
    return <Link href={withLocale(path)} {...rest} />;
  }

  // URL オブジェクトの場合
  if (href instanceof URL) {
    const next = new URL(href.toString());
    next.pathname = withLocale(next.pathname || '/');
    return <Link href={next} {...rest} />;
  }

  // { pathname, query, hash } 形式の場合
  const obj = href as Exclude<LinkProps['href'], string | URL>;
  const pathname = typeof obj.pathname === 'string' ? obj.pathname : '/';
  const localizedPath = withLocale(pathname);

  return <Link href={{ ...obj, pathname: localizedPath }} {...rest} />;
}
