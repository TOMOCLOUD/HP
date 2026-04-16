'use client';

import { useDict } from '@/lib/useDict';

export default function AboutSection() {
  const { dict } = useDict();
  const t = dict?.home?.about;

  return (
    <section id="about" className="reveal-on-scroll scroll-mt-24 bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-10 text-gray-900 text-center">
          {t?.heading ?? 'About us'}
        </h2>

        <dl className="divide-y divide-slate-300">
          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.companyLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.company}</dd>
          </div>
          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.businessLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.business}</dd>
          </div>
          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.foundedLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.founded}</dd>
          </div>
          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.addressLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl" style={{ whiteSpace: 'pre-line' }}>
              {t?.address}
            </dd>
          </div>
          <div className="grid grid-cols-12 gap-4 py-5">
            <dt className="col-span-12 md:col-span-3 text-gray-700 text-lg font-semibold">{t?.repLabel}</dt>
            <dd className="col-span-12 md:col-span-9 text-gray-900 text-xl">{t?.rep}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
