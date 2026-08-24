// app/layout.tsx
import './globals.css';
import './wave.css';
import './wave-chrome.css';
import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Murecho, Syne } from 'next/font/google';

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

export const metadata: Metadata = {
  title: '株式会社TOMOCLOUD ～新しい自分が視える世界へ～',
  description: '視える化技術により全ての人が自分らしく生きることのできる社会を創造する',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={`${murecho.variable} ${syne.variable}`}>
      <body className="min-h-screen flex flex-col bg-white">{children}</body>
    </html>
  );
}
