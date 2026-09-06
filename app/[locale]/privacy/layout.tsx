// app/[locale]/privacy/layout.tsx
import type { Metadata } from 'next';
import { defaultLocale, getDictionary, isLocale } from '@/lib/i18n';

/**
 * ページ本体は 'use client' で metadata を持てないので、
 * 題だけをこのレイアウトから与える。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    title: dict.meta?.privacy,
    alternates: { canonical: `/${locale}/privacy` },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
