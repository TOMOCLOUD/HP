'use client';

import { useDict } from '@/lib/useDict';

export default function Hero() {
  const { dict } = useDict();

  return (
    <section
      className="relative w-full h-[420px] sm:h-[520px] md:h-[600px]
                 bg-white overflow-hidden [isolation:isolate]"
    >
      <img
        src="/Image/HeroImage.png"
        alt="TOMOCLOUD Hero"
        className="absolute inset-0 w-full h-full object-cover bg-white"
        loading="eager"
        fetchPriority="high"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[3%] bg-gradient-to-b from-white to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3%] bg-gradient-to-t from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[3%] bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[3%] bg-gradient-to-l from-white to-transparent" />

      <div className="relative z-10 h-full flex items-center">
        <div className="pl-10 sm:pl-16 md:pl-24 lg:pl-32 max-w-[95%]">
          <h1
            className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold
                       mb-4 md:mb-8 drop-shadow-[0_3px_14px_rgba(0,0,0,0.45)]
                       whitespace-nowrap"
          >
            {dict?.home?.hero?.title ?? 'TOMOCLOUD'}
          </h1>
          <p
            className="text-white text-2xl sm:text-3xl md:text-6xl mb-2 md:mb-4
                       drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] whitespace-nowrap"
          >
            {dict?.home?.hero?.leadJa ?? '新しい自分が視える世界へ'}
          </p>
          <p
            className="text-white text-lg sm:text-xl md:text-4xl
                       drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] whitespace-nowrap"
          >
            {dict?.home?.hero?.leadEn ?? 'Visualize the New Self'}
          </p>
        </div>
      </div>
    </section>
  );
}
