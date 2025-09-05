'use client';

import React, { useEffect } from 'react';

/** 画像の四辺を Home と同じ方法（オーバーレイ）でフェードさせる */
function FeatherImage({
  src,
  alt,
  className = '',
  edge = '10%', // フェード幅
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
      {/* 4辺の白→透明オーバーレイ（背景白に自然に馴染む） */}
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
  return (
    <section className="reveal-on-scroll bg-gray-900 text-white py-14 md:py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-semibold">株式会社 TOMOCLOUD</p>
          <div>
            <p className="text-base md:text-lg font-semibold">260-0015</p>
            <p className="text-base md:text-lg font-semibold">
              千葉県千葉市中央区富士見二丁目7番9号 富士見ビル609号
            </p>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold">TEL　043-290-2957</h3>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold">Email　info@tomocloud.co.jp</h3>
          </div>
        </div>

        <div className="grid grid-cols-[max-content_max-content] gap-3 md:gap-5 md:justify-self-end md:mr-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">Pages</h4>
            <ul className="space-y-2 text-slate-100">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Product
                </a>
              </li>
              <li>
                <a href="/news" className="hover:underline">
                  News
                </a>
              </li>
              <li>
                <a href="/recruit" className="hover:underline">
                  Recruit
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-slate-100">
              <li>
                <a
                  href="https://tomocloud.xsrv.jp/takei-lab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  武居研究室（外部）
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
  // 画像エラーフォールバック
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

  // reveal-on-scroll
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
      {/* ===== Header（ボックスなし） ===== */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
            プロダクト
          </h1>
        </div>
      </section>

      {/* ===== 基盤技術：EIT ===== */}
      <section className="reveal-on-scroll max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-center">
          <FeatherImage
            src="/Image/Takeilab.png"
            alt="EIT（Electrical Impedance Tomography）のイメージ"
            className="order-1 w-full h-56 sm:h-64 md:h-72 bg-gray-100 rounded-xl"
            edge="7%"
            onError={onImgError}
          />
          <div className="order-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
              基盤技術：EIT
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              EIT（Electrical Impedance Tomography）は、多電極を用いて電気インピーダンス分布を画像として再構成する技術です。
            </p>
            <p className="text-base sm:text-lg text-gray-700">
              まさに「視えない」を「見える」に変える仕組みと言えます。
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              表面電極から微弱電流を印加し電位を測定することで、非侵襲的かつリアルタイムに体内を可視化します。
            </p>
            <p className="text-gray-700 mb-4">
              株式会社TOMOCLOUDは、
              <strong className="text-sky-600"> 千葉大学武居研究室</strong> におけるEITについての研究を基盤として設立されました。
            </p>
            <div className="mt-8 md:mt-12 flex justify-center">
              <a
                href="https://tomocloud.xsrv.jp/takei-lab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow transition btn-gradient hover:shadow-lg"
              >
                武居研究室サイトへ
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
              リンパ浮腫とは
            </h2>
            <p className="text-base sm:text-lg text-gray-700">
              リンパ液の流れが滞ることで四肢にむくみが生じる病気です。
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              見た目の変化だけでなく、痛みや重だるさなど身体的な不快感を伴い、日常生活や仕事の質にも大きな影響を及ぼします。
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              早期発見と継続的な観察が重要ですが、簡便かつ非侵襲に行える方法は限られていました。
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              私たちはEITによる、日常生活の中でも負担なく実施可能な新しいモニタリング手法の実現を目指しています。
            </p>
          </div>
          <FeatherImage
            src="/Image/Lymphedema.png"
            alt="リンパ浮腫のイメージ図"
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
            {/* 左カラム：縦に大きめ2枚 */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 sm:gap-6 w-full items-center">
              <FeatherImage
                src="/Image/LTmonitor_AI.png"
                alt="LT monitor 写真1"
                className="w-full max-w-[480px] h-60 sm:h-64 md:h-72 bg-gray-100 rounded-2xl"
                edge="7%"
                onError={onImgError}
              />
              <FeatherImage
                src="/Image/LTmonitor_lite.png"
                alt="LT monitor 写真2"
                className="w-full max-w-full md:max-w-[480px] h-44 xs:h-48 sm:h-56 md:h-72 bg-gray-100 rounded-2xl"
                edge="7%"
                onError={onImgError}
              />
            </div>

            {/* 右カラム（説明文） */}
            <div>
              <span className="inline-block mb-3 sm:mb-4 px-3 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-full">
                Prototype
              </span>
              <h2 className="no-underline text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-2 sm:mb-3">
                開発中の製品
              </h2>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6 text-center">
                LT monitor
              </h2>
              <p className="text-lg sm:text-lg text-gray-700 mb-5 sm:mb-2">
                EITにもとづくリンパ浮腫モニタリング装置。
              </p>
              <p className="text-lg sm:text-lg text-gray-700 mb-5 sm:mb-6">
                リアルタイムに体内の状態を画像化し、日常的かつ継続的な状態評価を可能にすることを目指しています。
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-base sm:text-lg">
                <li>体内状態をリアルタイムで可視化</li>
                <li>使用者の操作負担を軽減するシンプルで直感的なUI</li>
                <li>臨床現場での検証を進行中</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}