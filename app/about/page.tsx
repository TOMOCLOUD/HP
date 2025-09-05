export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* ヘッダー部分keep */}
      <section className="bg-white py-16 shadow">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            会社概要
          </h1>
        </div>
      </section>

      {/* 本文 */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* 会社名 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-400 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">会社名</h2>
          <p className="text-lg text-gray-700">株式会社 TOMOCLOUD</p>
        </div>

        {/* 事業内容 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-400 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">事業内容</h2>
          <p className="text-lg text-gray-700 mb-2">非侵襲生体イメージング機器の開発・製造販売</p>
        </div>

        {/* 設立年 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-400 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">設立年</h2>
          <p className="text-lg text-gray-700 mb-2">2025年8月18日</p>
        </div>

        {/* 所在地 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-400 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">所在地</h2>
          <p className="text-lg text-gray-700 mb-2">260-0015</p>
          <p className="text-lg text-gray-700 mb-2">千葉県千葉市中央区富士見二丁目7番9号 富士見ビル609号</p>
        </div>

        {/* 代表者 */}
        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-sky-400 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">代表者</h2>
          <p className="text-lg text-gray-700 mb-2">小川　良磨</p>
        </div>
      </section>

      {/* フッターkeep */}
    </div>
  );
}
