import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tomocloud.co.jp';

/**
 * /api はクロールさせない。それ以外は開ける。
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
