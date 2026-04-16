'use client';

import React from 'react';
import { useDict } from '@/lib/useDict';
import { featherRectMask } from '@/lib/imageUtils';

export default function VisionSection({
  onImgError,
}: {
  onImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}) {
  const { dict, locale } = useDict();
  const t = dict?.home?.vision;

  return (
    <section className="reveal-on-scroll max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-3">
      <div className="w-full bg-gray-50 rounded-xl overflow-hidden flex justify-center items-center">
        <img
          src="/Image/LTmonitor_AI.png"
          alt="Vision image"
          className="max-h-80 md:max-h-96 w-auto h-auto object-contain"
          onError={onImgError}
          style={featherRectMask('6%')}
        />
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
          {t?.heading ?? 'Our Vision'}
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-sky-600">{t?.subtitleJa}</p>
        <p className="text-base md:text-lg italic mb-6 text-sky-600">{t?.subtitleEn}</p>
        <p className="text-gray-700 text-base sm:text-lg">{t?.p1}</p>
        <p className="text-gray-700 mb-2 text-base sm:text-lg">{t?.p2}</p>
        <p className="text-gray-700 mb-2 font-bold text-base md:text-xl">{t?.p3Strong}</p>
        <p className="text-gray-700 mb-5 text-base md:text-lg">{t?.p4}</p>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <a
            href={`/${locale}/services`}
            className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow
                       btn-gradient transition-colors duration-300
                       hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
            aria-label="to product"
          >
            {t?.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
