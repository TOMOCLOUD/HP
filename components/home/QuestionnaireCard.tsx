'use client';

import { useDict } from '@/lib/useDict';

export default function QuestionnaireCard() {
  const { dict } = useDict();
  const t = dict?.home?.questionnaire;

  return (
    <section className="reveal-on-scroll max-w-5xl mx-auto px-6 py-8 md:py-12">
      <div className="bg-gradient-to-br from-sky-50 to-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border-l-4 border-sky-500">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-shrink-0 flex justify-center md:justify-start">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-sky-100 rounded-full">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {t?.heading ?? 'アンケートご協力のお願い'}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-3">{t?.p1}</p>
            <p className="text-base sm:text-lg text-gray-700 mb-5">{t?.p2}</p>
            <div className="flex justify-center md:justify-start">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfFu_lqgdpk9YYOmXUPX3wjZk-J9r7dfIeR52NSEcB0zb2oPQ/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold
                           px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg
                           hover:from-sky-600 hover:to-sky-700 hover:shadow-xl
                           transform hover:-translate-y-0.5 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
              >
                {t?.cta ?? 'アンケートに回答する'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
