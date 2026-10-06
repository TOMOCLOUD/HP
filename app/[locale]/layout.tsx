// app/[locale]/layout.tsx
import '../globals.css';
import '../wave.css';
import '../wave-chrome.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Murecho, Syne } from 'next/font/google';
import SiteHeader from '@/components/wave/SiteHeader';
import SiteFooter from '@/components/wave/SiteFooter';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { OGP_IMAGE } from '@/lib/seo';

// 本文は Murecho。英字と数字だけ Syne に振る（.wv-lat）
//
// subsets を指定しないのは意図的。Murecho の和文グリフは Google Fonts の
// css2 で subset 名の付かない unicode-range に入っていて、subsets: ['latin']
// で絞ると和文が落ちる。指定なしなら全 unicode-range を取り込める。
// preload は subsets 未指定だと使えないので切る（unicode-range ごとに
// 分かれているので、ブラウザは要る分だけ取りにいく）。
const murecho = Murecho({
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-murecho',
});

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-syne',
});

/**
 * 本番のドメイン。OGP の画像やページの URL を絶対パスに直すのに要る。
 * 環境ごとに変えられるよう env から取り、無ければ本番のものを使う。
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tomocloud.co.jp';

/**
 * このレイアウトがロケールごとのルートレイアウト。
 *
 * <html lang> は読み上げの言語判定にも検索エンジンの言語判定にも効くので、
 * URL のロケールから決める。<html> を持つのはルートレイアウトだけなので、
 * app/layout.tsx は置かず、ここを [locale] ごとのルートにしている。
 * ロケールは ja / en だけなので、両方を前もって生成し、それ以外は 404。
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * 言語ごとの題と説明。canonical・hreflang・og:url はページごとに違うので
 * ここには置かず、各ページが lib/seo.ts の pageMetadata で与える。
 * ここで与えると、自前のメタ情報を持たないページまで「ホームの重複」と
 * 申告してしまう。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const meta = (await getDictionary(locale)).meta ?? {};

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: meta.title,
      template: meta.titleTemplate ?? `%s | ${meta.title}`,
    },
    description: meta.description,
    openGraph: {
      type: 'website',
      siteName: meta.title,
      title: meta.title,
      description: meta.description,
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      images: [OGP_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  // ヘッダーとフッターの文言もここで読んで渡す。ブラウザで後から読み込むと、
  // 最初の HTML にはナビも社名も入らない
  const dict = await getDictionary(locale);

  return (
    <html lang={locale} className={`${murecho.variable} ${syne.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">
        <SiteHeader nav={dict.top?.nav} locale={locale} />
        <main className="flex-1">{children}</main>
        <SiteFooter t={dict.top?.footer} nav={dict.top?.nav} company={dict.footer} locale={locale} />
      </body>
    </html>
  );
}
