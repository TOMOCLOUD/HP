// app/[locale]/page.tsx
import type { Metadata } from 'next';
import HomePage from '@/components/home/HomePage';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/seo';

/**
 * ホーム。本体は 'use client' で metadata を持てないので、
 * canonical・hreflang・og:url をこの入口から与える。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, '') : {};
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  return <HomePage dict={dict} locale={locale} />;
}
