'use client';

import React, { useEffect } from 'react';
import { useDict } from '@/lib/useDict';

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
// Footer セクション
// ==========================================
function Footer() {
  const { dict, locale } = useDict();
  const f = dict?.footer;
  const nav = dict?.common?.nav;

  return (
    <section className="reveal-on-scroll bg-gray-900 text-white py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-semibold">{f?.company}</p>
          <div>
            <p className="text-base md:text-lg font-semibold">{f?.zip}</p>
            <p className="text-base md:text-lg font-semibold">{f?.address}</p>
          </div>
          <div><h3 className="text-base md:text-lg font-semibold">{f?.tel}</h3></div>
          <div><h3 className="text-base md:text-lg font-semibold">{f?.email}</h3></div>
        </div>

        <div className="grid grid-cols-[max-content_max-content] gap-3 md:gap-5 md:justify-self-end md:mr-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">{f?.pages}</h4>
            <ul className="space-y-2 text-slate-100">
              <li><a href={`/${locale}/`} className="hover:underline">{nav?.home}</a></li>
              <li><a href={`/${locale}/services`} className="hover:underline">{nav?.product}</a></li>
              <li><a href={`/${locale}/news`} className="hover:underline">{nav?.news}</a></li>
              <li><a href={`/${locale}/recruit`} className="hover:underline">{nav?.recruit}</a></li>
              <li><a href={`/${locale}/contact`} className="hover:underline">{nav?.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">{f?.links}</h4>
            <ul className="space-y-2 text-slate-100">
              <li>
                <a
                  href="https://tomocloud.xsrv.jp/takei-lab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {f?.externalLab}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// Services ページ
// ==========================================
export default function ServicesPage() {
  const { dict } = useDict();

  const fallbackDataUrl =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192">
         <rect width="100%" height="100%" fill="#e5e7eb"/>
         <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
               font-family="Arial, sans-serif" font-size="14" fill="#6b7280">No Image</text>
       </svg>`
    );

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    if (img.src !== fallbackDataUrl) img.src = fallbackDataUrl;
  };

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('reveal-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) =>
          en.isIntersecting
            ? en.target.classList.add('reveal-visible')
            : en.target.classList.remove('reveal-visible')
        );
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

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

      <Footer />
    </div>
  );
}
