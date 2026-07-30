// app/[locale]/layout.tsx
import Header from '@/app/Header';
import Footer from '@/components/Footer';
import LocaleToggle from '@/components/LocaleToggle';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <LocaleToggle />
    </>
  );
}
