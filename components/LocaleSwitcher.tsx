'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const isEnglish = pathname.startsWith('/en');

  const switchLocale = () => {
    if (isEnglish) {
      router.push(pathname.replace(/^\/en/, '/ja'));
    } else {
      router.push(pathname.replace(/^\/ja/, '/en'));
    }
  };

  return (
    <button
      onClick={switchLocale}
      className="fixed bottom-6 right-6 z-[100] flex items-center justify-center
                 w-14 h-14 rounded-full bg-sky-600 text-white shadow-lg
                 hover:bg-sky-700 transition-colors"
      aria-label="Switch language"
    >
      <span className="text-xl">
        {isEnglish ? '🇯🇵' : '🇺🇸'}
      </span>
    </button>
  );
}
