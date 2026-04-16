'use client';

import { useDict } from '@/lib/useDict';

export default function RecruitSection() {
  const { dict } = useDict();
  const t = dict?.home?.recruit;

  return (
    <section className="reveal-on-scroll bg-sky-100 py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{t?.heading ?? 'Recruit'}</h2>
        <p className="mt-4 text-base sm:text-lg text-gray-700">{t?.p1}</p>
        <p className="mt-4 text-base sm:text-lg text-gray-700">{t?.p2}</p>
        <div className="mt-8">
          <a
            href="https://www.wantedly.com/companies/tomocloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow
                       btn-gradient transition-colors duration-300
                       hover:from-sky-600 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {t?.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
