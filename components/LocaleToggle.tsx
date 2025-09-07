'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

/** パスの先頭のロケールを入れ替えつつ残りのパスは維持する */
function switchLocalePath(pathname: string, nextLocale: 'ja' | 'en') {
  const parts = pathname.split('/');
  if (parts[1] === 'ja' || parts[1] === 'en') {
    parts[1] = nextLocale;
    return parts.join('/') || `/${nextLocale}`;
  }
  const rest = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `/${nextLocale}${rest}`;
}

export default function LocaleToggle() {
  const router = useRouter();
  const pathname = usePathname();

  const current: 'ja' | 'en' = useMemo(() => {
    if (!pathname) return 'ja';
    return pathname.startsWith('/en') ? 'en' : 'ja';
  }, [pathname]);

  const nextLocale: 'ja' | 'en' = current === 'ja' ? 'en' : 'ja';
  const label = nextLocale.toUpperCase(); // EN または JA
  const aria = current === 'ja' ? '英語に切り替え' : '日本語に切り替え';

  const onClick = () => {
    const to = switchLocalePath(pathname || '/', nextLocale);
    router.push(to);
  };

  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="
        fixed bottom-6 right-6 z-[100]
        inline-flex items-center gap-2
        px-4 py-2.5 rounded-full
        bg-white/90 text-sky-700
        ring-2 ring-sky-400 shadow-md
        hover:bg-white hover:text-sky-900 hover:ring-sky-500
        hover:shadow-lg
        active:shadow-md
        transition-colors transition-shadow duration-200 ease-out
      "
    >
      {/* 地球アイコン（文字と同じサイズ、線だけ） */}
      <svg
        width="1em" height="1em"
        viewBox="0 0 24 24" fill="none"
        className="stroke-sky-700"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
        <path
          d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9S9.5 5.7 12 3Z"
          strokeWidth="1.8"
        />
      </svg>

      {/* 切替先言語ラベル */}
      <span className="font-medium tracking-wide text-base">
        {label}
      </span>
    </button>
  );
}
