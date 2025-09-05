'use client';

import { useState, type FormEvent, type ChangeEvent } from 'react';

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

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email: string) =>
    /^(?!.{255,})([\w.!#$%&'*+/=?^_`{|}~-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(email);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError('');

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setLoading(false);
      setOk(false);
      setError('未入力の項目があります。');
      return;
    }
    if (!isValidEmail(email)) {
      setLoading(false);
      setOk(false);
      setError('メールアドレスの形式が正しくありません。');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || '送信に失敗しました');

      setOk(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setOk(false);
      setError(err?.message || '送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex flex-col">
      <main className="flex-1">
        {/* ===== ヘッダー ===== */}
        <section className="bg-white py-10 sm:py-14 md:py-16 shadow">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
              お問い合わせ
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              ご質問やご相談は以下の連絡先をご利用ください
            </p>
          </div>
        </section>

        {/* ===== 本文 ===== */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14 md:py-16 grid gap-8 sm:gap-10 md:grid-cols-2">
          {/* 連絡先 */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">
              連絡先情報
            </h2>
            <ul className="space-y-3 sm:space-y-4 text-gray-700">
              <li className="break-words">
                <span className="font-semibold">住所：</span>
                <span className="text-gray-500">
                  千葉県千葉市中央区富士見二丁目7番9号 富士見ビル609号
                </span>
              </li>
              <li className="break-words">
                <span className="font-semibold">電話番号：</span>
                <span className="text-gray-500">043-290-2957</span>
              </li>
              <li className="break-words">
                <span className="font-semibold">メールアドレス：</span>
                <span className="text-gray-700">info@tomocloud.co.jp</span>
              </li>
            </ul>
          </div>

          {/* フォーム */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 text-center">
              お問い合わせフォーム
            </h2>
            <form className="space-y-3 sm:space-y-4" onSubmit={onSubmit} noValidate>
              <input
                type="text"
                name="name"
                placeholder="お名前"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base text-gray-700 bg-white"
                value={form.name}
                onChange={onChange}
                required
                maxLength={100}
                aria-label="お名前"
              />
              <input
                type="email"
                name="email"
                placeholder="メールアドレス"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base text-gray-700 bg-white"
                value={form.email}
                onChange={onChange}
                required
                aria-label="メールアドレス"
              />
              <textarea
                name="message"
                placeholder="メッセージ（できるだけ具体的にご記入ください）"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base text-gray-700 bg-white"
                rows={6}
                value={form.message}
                onChange={onChange}
                required
                minLength={5}
                maxLength={5000}
                aria-label="メッセージ"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  loading ? 'bg-gray-300' : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold py-2 rounded-lg`}
              >
                {loading ? '送信中…' : '送信'}
              </button>

              {/* 結果メッセージ */}
              <div aria-live="polite">
                {ok === true && (
                  <p className="mt-2 text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg">
                    お問い合わせを受け付けました。自動返信メールをご確認ください。
                  </p>
                )}
                {ok === false && (
                  <p className="mt-2 text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">
                    {error || '送信に失敗しました。時間をおいて再度お試しください。'}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* ===== Footer ===== */}
      <Footer />
    </div>
  );
}
