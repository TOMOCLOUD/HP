// app/[locale]/recruit/page.tsx
'use client';

import { useDict } from "@/lib/useDict";

const FALLBACK = {
  ja: {
    title: "採用について",
    vision: "「見えない」を「視える」に。",
    paragraphs: [
      "TOMOCLOUDは、国際色・学際色豊かな研究室から生まれたスタートアップです。",
      "互いの文化と専門性を尊重し、切磋琢磨するカルチャーが根づいています。",
      "変化を生み出してきたのは、いつの時代も多様なカルチャーを持つプロフェッショナルの力です。",
      "だからこそ、私たちは非侵襲の“可視化”を核に、基盤技術と新技術の融合を通して革新的な技術を創出し、医療・介護・ヘルスケアの現場へ価値を届けます。",
      "可能性を感じ、その可能性を具体化すべく前に突き進んでいける仲間をお待ちしています。"
    ],
    contactBtn: "お問い合わせへ",
    contactAria: "お問い合わせページへ",
    note: "※ 募集要項は順次公開予定です。"
  },
  en: {
    title: "Careers",
    vision: "From “invisible” to “visible”.",
    paragraphs: [
      "TOMOCLOUD is a startup spun out of a diverse, interdisciplinary research lab.",
      "We value each other's cultures and expertise, and challenge one another to grow.",
      "Breakthroughs are created by professionals with diverse backgrounds.",
      "By fusing foundational and new technologies around noninvasive “visualization,” we deliver value to medical, nursing, and healthcare settings.",
      "If you see the potential and are eager to turn it into reality, we'd love to work with you."
    ],
    contactBtn: "Contact us",
    contactAria: "Go to contact page",
    note: "Job descriptions will be published in due course."
  }
};

function FullBleedImageStrip({ images, colsClass="grid-cols-4", itemHeights="h-40 md:h-56 lg:h-64 xl:h-72" }:{
  images:string[]; colsClass?:string; itemHeights?:string;
}) {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]" aria-label="Recruit photos">
      <div className={`grid ${colsClass}`}>
        {images.map((src,i)=>(
          <div key={i} className={`relative ${itemHeights}`}>
            <img src={src} alt="Recruit photo" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-sky-500/45 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-600/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer(){
  const { dict, locale } = useDict();
  const f = dict?.footer;
  const nav = dict?.common?.nav;
  if(!f || !nav) return null;
  return (
    <section className="bg-gray-900 text-white py-14 md:py-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-semibold">{f.company}</p>
          <div>
            <p className="text-base md:text-lg font-semibold">{f.zip}</p>
            <p className="text-base md:text-lg font-semibold">{f.address}</p>
          </div>
          <div><h3 className="text-base md:text-lg font-semibold">{f.tel}</h3></div>
          <div><h3 className="text-base md:text-lg font-semibold">{f.email}</h3></div>
        </div>
        <div className="grid grid-cols-[max-content_max-content] gap-3 md:gap-5 md:justify-self-end md:mr-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">{f.pages}</h4>
            <ul className="space-y-2 text-slate-100">
              <li><a href={`/${locale}/`} className="hover:underline">{nav.home}</a></li>
              <li><a href={`/${locale}/services`} className="hover:underline">{nav.product}</a></li>
              <li><a href={`/${locale}/news`} className="hover:underline">{nav.news}</a></li>
              <li><a href={`/${locale}/achievements`} className="hover:underline">{nav.achievement}</a></li>
              <li><a href={`/${locale}/recruit`} className="hover:underline">{nav.recruit}</a></li>
              <li><a href={`/${locale}/contact`} className="hover:underline">{nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3">{f.links}</h4>
            <ul className="space-y-2 text-slate-100">
              <li><a href="https://tomocloud.xsrv.jp/takei-lab/" target="_blank" rel="noopener noreferrer" className="hover:underline">{f.externalLab}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RecruitPage(){
  const { dict, locale } = useDict();
  // ← ここで必ずオブジェクトになるようにフォールバック
  const t = (dict?.recruit ?? FALLBACK[locale]) as typeof FALLBACK['ja'];

  const desktopImages = ["/Image/Recruit_1.png","/Image/Recruit_2.png","/Image/Recruit_3.png","/Image/Recruit_4.png"];
  const mobileImages   = ["/Image/Recruit_mobile_1.png","/Image/Recruit_mobile_2.png","/Image/Recruit_mobile_3.png","/Image/Recruit_mobile_4.png"];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      <main className="flex-1">
        <section className="bg-white py-20 sm:py-24 shadow">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 text-left">{t.title}</h1>

            <div className="mt-8 hidden sm:block">
              <FullBleedImageStrip images={desktopImages} colsClass="grid-cols-4" itemHeights="h-40 md:h-56 lg:h-64 xl:h-72" />
            </div>
            <div className="mt-8 sm:hidden">
              <FullBleedImageStrip images={mobileImages.slice(0,2)} colsClass="grid-cols-2" itemHeights="h-32 xs:h-36" />
            </div>

            <p className="mt-15 text-lg sm:text-2xl leading-8 text-gray-800 font-bold text-left">{t.vision}</p>
            <span className="mt-3 block h-1 w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] bg-sky-500 rounded-full" />

            {Array.isArray(t.paragraphs) && t.paragraphs.map((p,i)=>(
              <p key={i} className="mt-2 text-lg sm:text-lg leading-8 text-gray-700 text-left">{p}</p>
            ))}

            <div className="mt-8 md:mt-12 text-left">
              <a
                href="https://www.wantedly.com/companies/tomocloud"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow transition btn-gradient hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/40"
                aria-label={t.contactAria}
              >
                {t.contactBtn}
              </a>
            </div>

            <div className="mt-8 sm:hidden">
              <FullBleedImageStrip images={mobileImages.slice(2,4)} colsClass="grid-cols-2" itemHeights="h-32 xs:h-36" />
            </div>

            <p className="mt-4 text-sm text-gray-500 text-left">{t.note}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
