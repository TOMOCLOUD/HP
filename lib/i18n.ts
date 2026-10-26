export const locales = ['ja', 'en'] as const;
export type Locale = typeof locales[number];
export const defaultLocale: Locale = 'ja';

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

// ja と en は同じキー構成なので、ja.json の型を辞書の型とする
export type Dictionary = typeof import('../dictionaries/ja.json');

export async function getDictionary(locale: Locale) {
  const dict = await import(`../dictionaries/${locale}.json`);
  return dict.default as Dictionary;
}
