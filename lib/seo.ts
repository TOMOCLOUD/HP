// lib/seo.ts
import type { Metadata } from 'next';
import { getDictionary, locales, type Locale } from './i18n';

/** OGP の画像。全ページ共通 */
export const OGP_IMAGE = { url: '/Image/hp/ogp.jpg', width: 900, height: 472 };

const OG_LOCALE: Record<Locale, string> = { ja: 'ja_JP', en: 'en_US' };

/** 辞書の meta のうち、ページの題として引けるもの */
type TitleKey = 'news' | 'privacy';

/**
 * 一枚のページのメタ情報。canonical・hreflang・og:url はページごとに
 * 違うので、共通のレイアウトには置かず、各ページがこれで作る。
 *
 * - canonical は自分自身（日英は別のページとして扱う）
 * - hreflang は同じパスの日英を結び、x-default は既定の日本語へ
 * - openGraph は親から引き継がれず丸ごと差し替わるので、画像や種別も
 *   毎回ここで書き直す（書かないと og:image が消える）
 */
export async function pageMetadata(
  locale: Locale,
  path: '' | `/${string}`,
  titleKey?: TitleKey
): Promise<Metadata> {
  const meta = (await getDictionary(locale)).meta ?? {};
  const pageTitle: string | undefined = titleKey ? meta[titleKey] : undefined;
  const template: string = meta.titleTemplate ?? `%s | ${meta.title}`;
  const fullTitle = pageTitle ? template.replace('%s', pageTitle) : meta.title;

  return {
    ...(pageTitle ? { title: pageTitle } : {}),
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
        'x-default': `/ja${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: meta.title,
      title: fullTitle,
      description: meta.description,
      url: `/${locale}${path}`,
      locale: OG_LOCALE[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [OGP_IMAGE],
    },
  };
}
