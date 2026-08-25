// app/layout.tsx
import './globals.css';
import './wave.css';
import './wave-chrome.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Murecho, Syne } from 'next/font/google';
import { headers } from 'next/headers';
import { defaultLocale, isLocale } from '@/lib/i18n';

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
 * ここはサイト共通の既定値。言語ごとの題と説明は app/[locale]/layout.tsx が
 * 上書きする（このレイアウトはロケールを持たないため）。
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '株式会社TOMOCLOUD ～新しい自分が視える世界へ～',
  description: '視える化技術により全ての人が自分らしく生きることのできる社会を創造する',
  openGraph: {
    type: 'website',
    siteName: '株式会社TOMOCLOUD',
    images: [{ url: '/Image/hp/ogp.jpg', width: 900, height: 472 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * 表示中のロケールを、middleware が渡すパスから拾う。
 *
 * <html lang> は読み上げの言語判定にも検索エンジンの言語判定にも効く。
 * ja 固定のままだと、英語のページを日本語として読み上げてしまう。
 */
async function currentLocale() {
  const pathname = (await headers()).get('x-pathname') ?? '';
  const seg = pathname.split('/')[1];
  return isLocale(seg) ? seg : defaultLocale;
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const lang = await currentLocale();

  return (
    <html lang={lang} className={`${murecho.variable} ${syne.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">{children}</body>
    </html>
  );
}
