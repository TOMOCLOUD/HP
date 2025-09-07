'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useDict } from "@/lib/useDict";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, dict } = useDict();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={`/${locale}${href}`}
      className="relative inline-block px-1 text-sky-600/90 hover:text-sky-700 transition-colors duration-200 group"
    >
      <span>{children}</span>
      <span className="pointer-events-none absolute left-0 -bottom-0.5 h-0.5 w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
    </Link>
  );

  return (
    <>
      <header className={`${jakarta.className} fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.12)]`}>
        <nav className="mx-auto flex h-14 lg:h-24 max-w-7xl items-center px-4 md:px-8">
          {/* 左：ロゴ */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/Image/logo2.png"
              alt="TOMOCLOUD ロゴ"
              width={160}
              height={56}
              priority
              className="h-auto w-[140px] lg:w-[180px]"
            />
          </Link>

          {/* 右：ナビ（デスクトップ） */}
          <ul className="hidden lg:flex items-center gap-7 text-[1.05rem] lg:text-[1.15rem] font-semibold ml-auto">
            <li><NavLink href="/">{dict?.common.nav.home ?? 'Home'}</NavLink></li>
            <li><NavLink href="/services">{dict?.common.nav.product ?? 'Product'}</NavLink></li>
            <li><NavLink href="/news">{dict?.common.nav.news ?? 'News'}</NavLink></li>
            <li><NavLink href="/achievements">{dict?.common.nav.achievement ?? 'Achievements'}</NavLink></li>
            <li><NavLink href="/recruit">{dict?.common.nav.recruit ?? 'Recruit'}</NavLink></li>
            <li><NavLink href="/contact">{dict?.common.nav.contact ?? 'Contact'}</NavLink></li>
          </ul>

          {/* 右端：ハンバーガー（モバイル） */}
          <button
            aria-label="メニューを開く"
            className="lg:hidden ml-auto grid h-9 w-9 place-items-center rounded-lg border border-sky-100 hover:bg-sky-50 active:scale-95 transition"
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

      {/* モバイルメニュー */}
      <div
        role="dialog"
        aria-modal="true"
        className={`lg:hidden fixed inset-0 z-[9999] transition-[opacity,visibility] duration-300
          ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500 to-sky-700" />

        <div
          className={`absolute inset-0 flex flex-col p-6 pt-16 transition-transform duration-400
            ${menuOpen ? "translate-y-0" : "translate-y-4"}`}
          onClick={(e) => e.stopPropagation()}
        >
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
            <li><Link href={`/${locale}/`} onClick={() => setMenuOpen(false)}>{dict?.common.nav.home ?? 'Home'}</Link></li>
            <li><Link href={`/${locale}/services`} onClick={() => setMenuOpen(false)}>{dict?.common.nav.product ?? 'Product'}</Link></li>
            <li><Link href={`/${locale}/news`} onClick={() => setMenuOpen(false)}>{dict?.common.nav.news ?? 'News'}</Link></li>
            <li><Link href={`/${locale}/achievements`} onClick={() => setMenuOpen(false)}>{dict?.common.nav.achievement ?? 'Achievements'}</Link></li>
            <li><Link href={`/${locale}/recruit`} onClick={() => setMenuOpen(false)}>{dict?.common.nav.recruit ?? 'Recruit'}</Link></li>
            <li><Link href={`/${locale}/contact`} onClick={() => setMenuOpen(false)}>{dict?.common.nav.contact ?? 'Contact'}</Link></li>
          </ul>

          {/* 言語切替は非表示（要望どおり削除） */}
          {/* <div className="mt-auto pt-8 text-sm text-white/80"><LanguageSwitcher /></div> */}
        </div>
      </div>
    </>
  );
}
