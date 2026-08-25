// app/[locale]/layout.tsx
import type { Metadata } from 'next';
import SiteHeader from '@/components/wave/SiteHeader';
import SiteFooter from '@/components/wave/SiteFooter';
import { defaultLocale, getDictionary, isLocale, locales } from '@/lib/i18n';

/**
 * 言語ごとの題と説明、それに canonical と hreflang。
 *
 * 同じ内容を二つの言語で出しているので、両方の在り処を申告しておかないと
 * 検索側で重複と見なされることがある。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);
  const meta = dict.meta ?? {};

  return {
    title: {
      default: meta.title,
      template: meta.titleTemplate ?? `%s | ${meta.title}`,
    },
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    // openGraph は親から引き継がれず丸ごと差し替わるので、
    // 画像や種別もここで書き直す（書かないと og:image が消える）
    openGraph: {
      type: 'website',
      siteName: meta.title,
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      images: [{ url: '/Image/hp/ogp.jpg', width: 900, height: 472 }],
    },
  };
}

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
