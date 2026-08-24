// app/[locale]/layout.tsx
import SiteHeader from '@/components/wave/SiteHeader';
import SiteFooter from '@/components/wave/SiteFooter';

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
