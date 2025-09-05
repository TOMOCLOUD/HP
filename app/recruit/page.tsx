// app/recruit/page.tsx
import Link from "next/link";

// ▼ フルブリード（画面幅いっぱい）写真帯
//   - images: 表示する画像配列
//   - colsClass: グリッド列数（例："grid-cols-4" / "grid-cols-2"）
//   - itemHeights: 各アイテムの高さ（例："h-40 md:h-56"）
function FullBleedImageStrip({
  images,
  colsClass = "grid-cols-4",
  itemHeights = "h-40 md:h-56 lg:h-64 xl:h-72",
}: {
  images: string[];
  colsClass?: string;
  itemHeights?: string;
}) {
  return (
    <div
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      aria-label="Recruit photos"
    >
      <div className={`grid ${colsClass}`}>
        {images.map((src, i) => (
          <div key={i} className={`relative ${itemHeights}`}>
            <img
              src={src}
              alt="Recruit photo"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            {/* 水色トーンのオーバーレイ */}
            <div className="absolute inset-0 bg-sky-500/45 mix-blend-multiply" />
            {/* ほんのりグラデで奥行き */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-600/10 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <section className="bg-gray-900 text-white py-14 md:py-16" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="space-y-3 md:space-y-4">
          <p className="text-2xl md:text-3xl font-semibold">株式会社 TOMOCLOUD</p>
          <div>
            <p className="text-base md:text-lg font-semibold">260-0015</p>
            <p className="text-base md:text-lg font-semibold">
              千葉県千葉市中央区富士見二丁目7番9号 富士見ビル609号
            </p>
          </div>
          <div><h3 className="text-base md:text-lg font-semibold">TEL　043-290-2957</h3></div>
          <div><h3 className="text-base md:text-lg font-semibold">Email　info@tomocloud.co.jp</h3></div>
        </div>

        <div className="grid grid-cols-[max-content_max-content] gap-3 md:gap-5 md:justify-self-end md:mr-6">
          <div>
            <h4 className="text-xl font-semibold mb-3">Pages</h4>
            <ul className="space-y-2 text-slate-100">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/services" className="hover:underline">Product</a></li>
              <li><a href="/news" className="hover:underline">News</a></li>
              <li><a href="/recruit" className="hover:underline">Recruit</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
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

export default function RecruitPage() {
  // 4種類の写真（PC用）
  const desktopImages = [
    "/Image/Recruit_1.png",
    "/Image/Recruit_2.png",
    "/Image/Recruit_3.png",
    "/Image/Recruit_4.png",
  ];
  // 同じ4種類の“モバイル用トリミング版”（横長）
  const mobileImages = [
    "/Image/Recruit_mobile_1.png",
    "/Image/Recruit_mobile_2.png",
    "/Image/Recruit_mobile_3.png",
    "/Image/Recruit_mobile_4.png",
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      <main className="flex-1">
        {/* ヒーロー（メッセージのみ） */}
        <section className="bg-white py-20 sm:py-24 shadow">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 text-left">
              採用について
            </h1>

            {/* ▼ PC：タイトル直下に4枚帯（正方形寄り） */}
            <div className="mt-8 hidden sm:block">
              <FullBleedImageStrip images={desktopImages} colsClass="grid-cols-4" itemHeights="h-40 md:h-56 lg:h-64 xl:h-72" />
            </div>

            {/* ▼ モバイル：上 2枚（横長の別ファイル） */}
            <div className="mt-8 sm:hidden">
              <FullBleedImageStrip images={mobileImages.slice(0, 2)} colsClass="grid-cols-2" itemHeights="h-32 xs:h-36" />
            </div>

            {/* ===== 本文（共通表示） ===== */}
            <p className="mt-15 text-lg sm:text-2xl leading-8 text-gray-800 font-bold text-left">
              「見えない」を「視える」に。
            </p>
            <span className="mt-3 block h-1 w-90 bg-sky-500 rounded-full" />
            <p className="mt-5 text-lg sm:text-lg leading-8 text-gray-700 text-left">
              TOMOCLOUDは、国際色・学際色豊かな研究室から生まれたスタートアップです。
            </p>
            <p className="mt-2 text-lg sm:text-lg leading-8 text-gray-700 text-left">
              互いの文化と専門性を尊重し、切磋琢磨するカルチャーが根づいています。
            </p>
            <p className="mt-2 text-lg sm:text-lg leading-8 text-gray-700 text-left">
              変化を生み出してきたのは、いつの時代も多様なカルチャーを持つプロフェッショナルの力です。
            </p>
            <p className="mt-2 text-lg sm:text-lg leading-8 text-gray-700 text-left">
              だからこそ、私たちは非侵襲の“可視化”を核に、基盤技術と新技術の融合を通して革新的な技術を創出し、医療・介護・ヘルスケアの現場へ価値を届けます。
            </p>
            <p className="mt-2 text-lg sm:text-lg leading-8 text-gray-700 text-left">
              可能性を感じ、その可能性を具体化すべく前に突き進んでいける仲間をお待ちしています。
            </p>

            {/* お問い合わせボタン */}
            <div className="mt-8 md:mt-12 text-left">
              <Link
                href="/contact"
                className="inline-block text-white font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg shadow transition btn-gradient
                           hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/40"
                aria-label="お問い合わせページへ"
              >
                お問い合わせへ
              </Link>
            </div>

            {/* ▼ モバイル：下 2枚（横長の別ファイル） */}
            <div className="mt-8 sm:hidden">
              <FullBleedImageStrip images={mobileImages.slice(2, 4)} colsClass="grid-cols-2" itemHeights="h-32 xs:h-36" />
            </div>

            <p className="mt-4 text-sm text-gray-500 text-left">
              ※ 募集要項は順次公開予定です。
            </p>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
