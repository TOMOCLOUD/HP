// app/[locale]/privacy/layout.tsx
import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/**
 * ページ本体は 'use client' で metadata を持てないので、
 * 題と canonical・hreflang・og:url をこのレイアウトから与える。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, '/privacy', 'privacy') : {};
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
