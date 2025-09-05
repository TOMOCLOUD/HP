// app/layout.tsx
import "./globals.css";
import Header from "./Header"; // 既存のヘッダーコンポーネントを利用

export const metadata = {
  title: "My Company",
  description: "TOMOCLOUDプロジェクト",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {/* 固定ヘッダー */}
        <Header />

        {/* ヘッダー分の余白を上に確保（スマホ/PCで可変） */}
        <main className="flex-grow pt-[96px] lg:pt-[128px]">
          {children}
        </main>

        {/* フッター */}
        <footer className="bg-gray-900 text-white text-center p-4">
          © 2025 TOMOCLOUD. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
