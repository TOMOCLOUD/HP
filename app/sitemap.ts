import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tomocloud.co.jp';

/** ロケールを持つページ。ホームは節をまとめた一枚なので、これで全部 */
const paths = ['', '/news', '/services', '/achievements', '/privacy'];

/**
 * 日英の同じページを alternates で結びつけ、どちらも同じ内容の別言語版だと
 * 申告する。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${path}`])
        ),
      },
    }))
  );
}
