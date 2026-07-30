'use client';

import React from 'react';
import { useDict } from '@/lib/useDict';

export default function MessageSection({
  onImgError,
}: {
  onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
  const { dict } = useDict();
  const t = dict?.home?.message;
  const HEADER_PX = 128;

  return (
    <section className="reveal-on-scroll bg-sky-100 py-14 md:py-20 overflow-x-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-8 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          {t?.heading ?? 'Message'}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-0 items-start">
          {/* SP 画像 */}
          <div className="md:hidden mb-6">
            <div className="relative w-full overflow-hidden rounded-none">
              <img
                src="/Image/Message_2.png"
                alt="代表者メッセージ"
                className="block w-full h-auto object-contain max-h-[70vh] mx-auto"
                onError={onImgError}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-white to-transparent" />
            </div>
          </div>

          {/* PC 画像 sticky */}
          <div className="hidden md:block md:sticky md:self-start" style={{ top: HEADER_PX }}>
            <div className="relative" style={{ height: `calc(100svh - ${HEADER_PX}px)` }}>
              <img
                src="/Image/Message_2.png"
                alt="代表者メッセージ"
                className="absolute inset-0 w-full h-full object-cover"
                onError={onImgError}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-white to-transparent" />
            </div>
          </div>

          {/* テキスト */}
          <article className="relative bg-white/95 backdrop-blur-sm border-0 shadow-none px-4 sm:px-6 md:px-10 py-6 md:py-8 rounded-none md:rounded-none">
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[6%] bg-gradient-to-l from-white to-transparent" />
            <header className="mb-4 md:mb-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                {t?.title}
              </h3>
              <span className="mt-3 block h-1 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] bg-sky-500 rounded-full mx-auto md:mx-0" />
            </header>
            <div className="space-y-4 leading-relaxed text-gray-800 text-base sm:text-[1.02rem] md:text-base">
              <p>{t?.p1}</p>
              <p>{t?.p2}</p>
              <p>{t?.p3}</p>
              <p>{t?.p4}</p>
              <p>{t?.p5}</p>
            </div>
            <footer className="mt-6 md:mt-8 text-right">
              <p className="text-sm sm:text-base md:text-xl text-gray-700">{t?.signature}</p>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
