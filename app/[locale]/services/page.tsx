'use client';

import React from 'react';
import { useDict } from '@/lib/useDict';
import { useImageFallback } from '@/lib/imageUtils';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';

/** 画像の四辺を Home と同じ方法（オーバーレイ）でフェードさせる */
function FeatherImage({
  src,
  alt,
  className = '',
  edge = '10%',
  onError,
  loading = 'lazy',
}: {
  src: string;
  alt?: string;
  className?: string;
  edge?: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  loading?: 'lazy' | 'eager';
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt ?? ''}
        className="w-full h-full object-cover"
        loading={loading}
        onError={onError}
      />
      {/* 4辺の白→透明オーバーレイ */}
      <div className="pointer-events-none absolute inset-x-0 top-0" style={{ height: edge }}>
        <div className="w-full h-full bg-gradient-to-b from-white to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0" style={{ height: edge }}>
        <div className="w-full h-full bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0" style={{ width: edge }}>
        <div className="w-full h-full bg-gradient-to-r from-white to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0" style={{ width: edge }}>
        <div className="w-full h-full bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}

// ==========================================
// Services ページ
// ==========================================
export default function ServicesPage() {
  const { dict } = useDict();
  const onImgError = useImageFallback();
  useRevealOnScroll();

  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* ===== Header ===== */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
            {dict?.services?.title}
          </h1>
        </div>
      </section>

      {/* ===== 基盤技術：EIT ===== */}
      <section className="reveal-on-scroll max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-center">
          <FeatherImage
            src="/Image/Takeilab.png"
            alt={dict?.services?.eit?.imageAlt}
            className="order-1 w-full h-56 sm:h-64 md:h-72 bg-gray-100 rounded-xl"
            edge="7%"
            onError={onImgError}
          />
          <div className="order-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
              {dict?.services?.eit?.heading}
            </h2>
            <p className="text-base sm:text-lg text-gray-700">{dict?.services?.eit?.p1}</p>
            <p className="text-base sm:text-lg text-gray-700">{dict?.services?.eit?.p2}</p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">{dict?.services?.eit?.p3}</p>
            <p className="text-gray-700 mb-4">
              {dict?.services?.eit?.p4_prefix}
              <strong className="text-sky-600">{dict?.services?.eit?.p4_bold}</strong>
              {dict?.services?.eit?.p4_suffix}
            </p>
            <div className="mt-8 md:mt-12 flex justify-center">
              <a
                href="https://tomocloud.xsrv.jp/takei-lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow transition btn-gradient hover:shadow-lg"
              >
                {dict?.services?.eit?.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== リンパ浮腫とは ===== */}
      <section className="reveal-on-scroll max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
              {dict?.services?.lymphedema?.heading}
            </h2>
            <p className="text-base sm:text-lg text-gray-700">{dict?.services?.lymphedema?.p1}</p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">{dict?.services?.lymphedema?.p2}</p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">{dict?.services?.lymphedema?.p3}</p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">{dict?.services?.lymphedema?.p4}</p>
          </div>
          <FeatherImage
            src="/Image/Lymphedema.png"
            alt={dict?.services?.lymphedema?.imageAlt}
            className="order-1 md:order-2 w-full h-56 sm:h-64 md:h-72 bg-gray-100 rounded-xl"
            edge="7%"
            onError={onImgError}
          />
        </div>
      </section>

      {/* ===== 開発中の製品：LT monitor ===== */}
      <section className="reveal-on-scroll bg-white from-sky-100 to-white py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid gap-10 lg:gap-12 lg:grid-cols-2 items-start justify-items-center">
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6 w-full items-center">
              <FeatherImage
                src="/Image/LTmonitor_AI.png"
                alt={dict?.services?.product?.image1Alt}
                className="w-full max-w-[480px] h-60 sm:h-64 md:h-72 bg-gray-100 rounded-2xl"
                edge="7%"
                onError={onImgError}
              />
              <FeatherImage
                src="/Image/LTmonitor_lite.png"
                alt={dict?.services?.product?.image2Alt}
                className="w-full max-w-full md:max-w-[480px] h-44 xs:h-48 sm:h-56 md:h-72 bg-gray-100 rounded-2xl"
                edge="7%"
                onError={onImgError}
              />
            </div>

            <div>
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-full">
                {dict?.services?.product?.badge}
              </span>
              <h2 className="no-underline text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-2 sm:mb-3">
                {dict?.services?.product?.subheading}
              </h2>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 text-center">
                {dict?.services?.product?.title}
              </h2>
              <p className="text-lg text-gray-700 mb-5 sm:mb-2">{dict?.services?.product?.lead1}</p>
              <p className="text-lg text-gray-700 mb-5 sm:mb-6">{dict?.services?.product?.lead2}</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-base sm:text-lg">
                <li>{dict?.services?.product?.b1}</li>
                <li>{dict?.services?.product?.b2}</li>
                <li>{dict?.services?.product?.b3}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== アンケートご協力のお願い ===== */}
      <section className="reveal-on-scroll bg-gradient-to-br from-sky-50 to-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border-t-4 border-sky-500">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-sky-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {dict?.services?.questionnaire?.heading}
              </h2>
            </div>

            <div className="space-y-4 text-gray-700 text-base sm:text-lg leading-relaxed mb-8">
              <p>{dict?.services?.questionnaire?.p1}</p>
              <p className="font-semibold text-gray-900">{dict?.services?.questionnaire?.p2}</p>
              <p>{dict?.services?.questionnaire?.p3}</p>
              <p className="text-sm sm:text-base text-gray-600 italic">
                {dict?.services?.questionnaire?.p4}
              </p>
              <p>{dict?.services?.questionnaire?.p5}</p>
            </div>

            <div className="text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfFu_lqgdpk9YYOmXUPX3wjZk-J9r7dfIeR52NSEcB0zb2oPQ/viewform?usp=dialog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-sky-500 to-sky-600 text-white font-semibold
                           px-8 md:px-12 py-4 md:py-5 rounded-xl shadow-lg
                           hover:from-sky-600 hover:to-sky-700 hover:shadow-xl
                           transform hover:-translate-y-0.5 transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2"
              >
                {dict?.services?.questionnaire?.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
