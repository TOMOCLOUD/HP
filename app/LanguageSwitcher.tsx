// app/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

type Locale = 'ja' | 'en';

/** 先頭セグメントのロケールを置き換え、残りのパスは維持 */
function switchLocalePath(pathname: string, nextLocale: Locale) {
  const parts = (pathname || '/').split('/'); // ["", "ja", ...] / ["", "en", ...] / ["", ...]
  if (parts[1] === 'ja' || parts[1] === 'en') {
    parts[1] = nextLocale;
    return parts.join('/') || `/${nextLocale}`;
  }
  // ロケールが付いてないパスの場合は先頭に付与
  const rest = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `/${nextLocale}${rest}`;
}

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() ?? '/ja';

  // 現在のロケール（文字列のみ）を算出
  const current: Locale = useMemo(
    () => (pathname.startsWith('/en') ? 'en' : 'ja'),
    [pathname]
  );

  const nextLocale: Locale = current === 'ja' ? 'en' : 'ja';
  const label = nextLocale.toUpperCase();
  const aria = current === 'ja' ? '英語に切り替え' : 'Switch to Japanese';

  const onClick = () => {
    router.push(switchLocalePath(pathname, nextLocale));
  };

  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="
        inline-flex items-center gap-2
        px-3.5 py-2 rounded-full
        bg-white/95 backdrop-blur-md
        text-sky-800
        shadow-sm ring-1 ring-sky-200/60
        hover:ring-sky-300 hover:shadow
        transition-colors
      "
    >
      {/* 地球アイコン：塗りなし・文字と同サイズ */}
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9S9.5 5.7 12 3Z"
          stroke="currentColor" strokeWidth="1.5" fill="none"
        />
      </svg>
      <span className="font-semibold tracking-wide">{label}</span>
    </button>
  );
}

