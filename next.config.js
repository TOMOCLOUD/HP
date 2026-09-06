/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  /**
   * 旧ページの行き先。
   *
   * 採用・お問い合わせ・会社概要は独立ページをやめ、ホームの節に統合した。
   * 名刺や求人票、報道記事、検索結果から旧 URL を踏んだ人が 404 に落ちない
   * よう、対応する節へ恒久リダイレクトする。着地してからのスクロールは
   * scrollToHashOnMount が受け持つ。ニュースは /news を年別アーカイブ
   * として持つため、リダイレクトしない。
   */
  async redirects() {
    const gone = ['recruit', 'contact', 'about'];
    return [
      ...gone.map((name) => ({
        source: `/:locale(ja|en)/${name}`,
        destination: `/:locale#${name}`,
        permanent: true,
      })),
      // 実績ページは廃止した。対応する節がホームに無いので、ホームへ返す
      {
        source: '/:locale(ja|en)/achievements',
        destination: '/:locale',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
