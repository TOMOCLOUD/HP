'use client';

import { useDict } from '@/lib/useDict';

export function ValuesSection() {
  const { dict, locale } = useDict();
  const values: { title: string; text: string }[] = dict?.home?.values || [];

  if (!values || !values.length) {
    return (
      <section className="reveal-on-scroll bg-sky-100 py-16 md:py-5">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-700">Loading values...</div>
      </section>
    );
  }

  return (
    <section className="reveal-on-scroll bg-sky-100 py-16 md:py-5">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-gray-900">
          {locale === 'en' ? 'Values' : '価値観'}
        </h2>
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="w-full max-w-[560px] mx-auto p-5 md:p-6 bg-white rounded-xl shadow-lg border-l-4 border-sky-400 transition-none"
            >
              <h3 className="font-semibold text-xl md:text-2xl mb-2 text-gray-900">{v.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
