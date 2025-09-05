"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className="relative inline-block px-1 text-sky-600/90 hover:text-sky-700 transition-colors duration-200 group"
    >
      <span>{children}</span>
      <span className="pointer-events-none absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  return (
    <>
      {/* === ヘッダー（白ベースのまま） === */}
      <header className={`${jakarta.className} fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.12)]`}>
        <nav className="mx-auto flex h-14 lg:h-24 max-w-7xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center">
            <Image src="/Image/logo2.png" alt="TOMOCLOUD ロゴ" width={160} height={56} priority
              className="h-auto w-[140px] lg:w-[180px]" />
          </Link>

          <ul className="hidden lg:flex items-center gap-7 text-[1.15rem] lg:text-[1.25rem] font-semibold">
            <li><NavLink href="/">Home</NavLink></li>
            <li><NavLink href="/services">Product</NavLink></li>
            <li><NavLink href="/news">News</NavLink></li>
            <li><NavLink href="/achievement">Achievement</NavLink></li>
            <li><NavLink href="/recruit">Recruit</NavLink></li>
            <li><NavLink href="/contact">Contact</NavLink></li>
          </ul>

          <button
            aria-label="メニューを開く"
            className="lg:hidden grid h-9 w-9 place-items-center rounded-lg border border-sky-100 hover:bg-sky-50 active:scale-95 transition"
            onClick={() => setMenuOpen(true)}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-sky-600 rounded" />
              <span className="block h-0.5 w-6 bg-sky-600 rounded" />
              <span className="block h-0.5 w-6 bg-sky-600 rounded" />
            </div>
          </button>
        </nav>
      </header>

      {/* === モバイル全画面メニュー（ヘッダーの“外”に配置）=== */}
      <div
        role="dialog"
        aria-modal="true"
        className={`lg:hidden fixed inset-0 z-[9999] transition-[opacity,visibility] duration-300
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        {/* 背景：水色グラデ */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500 to-sky-700" />

        {/* パネル本体：クリックバブリング止める */}
        <div
          className={`absolute inset-0 flex flex-col p-6 pt-16 transition-transform duration-400
            ${menuOpen ? "translate-y-0" : "translate-y-4"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ×ボタン */}
          <button
            aria-label="メニューを閉じる"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 active:scale-95 transition"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-white" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <ul className="mt-4 flex flex-col gap-5 text-2xl font-semibold text-white">
            <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link href="/services" onClick={() => setMenuOpen(false)}>Product</Link></li>
            <li><Link href="/news" onClick={() => setMenuOpen(false)}>News</Link></li>
            <li><Link href="/achievement" onClick={() => setMenuOpen(false)}>Achievement</Link></li>
            <li><Link href="/recruit" onClick={() => setMenuOpen(false)}>Recruit</Link></li>
            <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          </ul>

          <div className="mt-auto pt-8 text-sm text-white/80">
            © {new Date().getFullYear()} TOMOCLOUD
          </div>
        </div>
      </div>
    </>
  );
}
