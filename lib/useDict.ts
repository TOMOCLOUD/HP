// lib/useDict.ts
'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type Dict = Record<string, any>;

const COMMON: Record<'ja'|'en', () => Promise<Dict>> = {
  ja: () => import('@/dictionaries/common/ja.json').then(m => m.default),
  en: () => import('@/dictionaries/common/en.json').then(m => m.default),
};

// ★ ここに home を追加（トップページ本文は home/ 配下）
const PAGE_MAP: Record<string, Record<'ja'|'en', () => Promise<Dict>>> = {
  home: {
    ja: () => import('@/dictionaries/home/ja.json').then(m => m.default),
    en: () => import('@/dictionaries/home/en.json').then(m => m.default),
  },
  services: {
    ja: () => import('@/dictionaries/services/ja.json').then(m => m.default),
    en: () => import('@/dictionaries/services/en.json').then(m => m.default),
  },
  news: {
    ja: () => import('@/dictionaries/news/ja.json').then(m => m.default),
    en: () => import('@/dictionaries/news/en.json').then(m => m.default),
  },
  achievements: {
    ja: () => import('@/dictionaries/achievements/ja.json').then(m => m.default),
    en: () => import('@/dictionaries/achievements/en.json').then(m => m.default),
  },
  recruit: {
    ja: () => import('@/dictionaries/recruit/ja.json').then(m => m.default),
    en: () => import('@/dictionaries/recruit/en.json').then(m => m.default),
  },
  contact: {
    ja: () => import('@/dictionaries/contact/ja.json').then(m => m.default),
    en: () => import('@/dictionaries/contact/en.json').then(m => m.default),
  },
};

function deepMerge(a: Dict, b: Dict): Dict {
  const out: Dict = { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && typeof out[k] === 'object') {
      out[k] = deepMerge(out[k], v as Dict);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export function useDict() {
  const pathname = usePathname() || '/ja';
  const [, loc, seg] = pathname.split('/');
  const locale: 'ja'|'en' = loc === 'en' ? 'en' : 'ja';
  const page = (seg || 'home') as keyof typeof PAGE_MAP;

  if (typeof window !== 'undefined') {
    const key = `__dict_${locale}_${page}`;
    if (!(window as any)[key]) {
      (async () => {
        const common = await COMMON[locale]();
        const pageDict = PAGE_MAP[page]?.[locale] ? await PAGE_MAP[page][locale]() : {};
        (window as any)[key] = deepMerge(common, pageDict);
        window.dispatchEvent(new Event('dict:ready'));
      })();
    }
  }

  let dict: Dict | undefined;
  if (typeof window !== 'undefined') {
    const key = `__dict_${locale}_${page}`;
    dict = (window as any)[key];
  }

  return { dict, locale };
}
