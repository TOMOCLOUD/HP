// lib/useDict.ts
'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Dictionary } from '@/lib/i18n';

type Dict = Dictionary;
type DictCache = Record<string, Dict | undefined>;

const DICT_MAP: Record<'ja'|'en', () => Promise<Dict>> = {
  ja: () => import('@/dictionaries/ja.json').then(m => m.default),
  en: () => import('@/dictionaries/en.json').then(m => m.default),
};

export function useDict() {
  const pathname = usePathname() || '/ja';
  const [, loc] = pathname.split('/');
  const locale: 'ja'|'en' = loc === 'en' ? 'en' : 'ja';

  const [dict, setDict] = useState<Dict | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadDict = async () => {
      const key = `__dict_${locale}`;

      // キャッシュから読み込み
      if (typeof window !== 'undefined' && (window as unknown as DictCache)[key]) {
        if (!isCancelled) {
          setDict((window as unknown as DictCache)[key]);
          setIsLoading(false);
        }
        return;
      }

      // 辞書データを非同期で読み込み
      try {
        const loadedDict = await DICT_MAP[locale]();

        if (!isCancelled) {
          // ウィンドウにキャッシュ
          if (typeof window !== 'undefined') {
            (window as unknown as DictCache)[key] = loadedDict;
          }
          setDict(loadedDict);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load dictionary:', error);
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDict();

    return () => {
      isCancelled = true;
    };
  }, [locale]);

  return { dict, locale, isLoading };
}