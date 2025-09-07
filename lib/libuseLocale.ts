'use client';

import { usePathname } from 'next/navigation';

// URLの先頭セグメントから 'ja' | 'en' を推定（不明なら 'ja'）
export function useLocale(): 'ja' | 'en' {
  const pathname = usePathname() || '/ja';
  const seg = pathname.split('/').filter(Boolean)[0] || 'ja';
  return (seg === 'en' ? 'en' : 'ja');
}
