// app/api/contact/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/* ===== バリデーション ===== */
function isValidEmail(e: string) {
  return /^(?!.{255,})([\w.!#$%&'*+/=?^_`{|}~-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(e);
}

/* ===== 送信元の検証 =====
   ブラウザのフォームから送られたことを Origin で確かめる。
   前方一致だと tomocloud.co.jp.evil.example のような別ドメインが通るので、
   URL として解釈した origin 同士を完全一致で比べる。
   env が無くてもチェックが飛ばないよう、本番ドメインは既定値として持つ。 */
const SITE_ORIGINS = ['https://www.tomocloud.co.jp', 'https://tomocloud.co.jp'];

function toOrigin(v: string | undefined | null): string | null {
  if (!v) return null;
  try {
    return new URL(v).origin;
  } catch {
    return null;
  }
}

const ALLOWED_ORIGINS = new Set(
  [
    ...SITE_ORIGINS,
    process.env.CONTACT_FROM_ORIGIN,
    process.env.NEXT_PUBLIC_SITE_URL,
    // Vercel のプレビュー環境。フォームの確認はそこで行うので通す
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
  ]
    .map(toOrigin)
    .filter((v): v is string => !!v)
);

function isAllowedOrigin(req: Request) {
  // Origin が無いブラウザ（古い Referer だけの環境）のために Referer にも倒す。
  // どちらも無い、つまりブラウザ以外からの直接送信は通さない
  const origin = toOrigin(req.headers.get('origin')) ?? toOrigin(req.headers.get('referer'));
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  // 開発時だけ localhost を通す（ポートは問わない）
  if (process.env.NODE_ENV !== 'production') {
    const { hostname } = new URL(origin);
    return hostname === 'localhost' || hostname === '127.0.0.1';
  }
  return false;
}

/* ===== 本文の大きさ =====
   受け付ける項目は name 100 字・email 254 字・message 5000 字まで。
   UTF-8 と JSON のエスケープを見込んでも 32KB あれば足りる。
   これより大きい本文は、JSON として読む前に断る */
const MAX_BODY_BYTES = 32 * 1024;

/* ===== 連投の制限 =====
   プロセス内メモリでの簡易レートリミット（同一IPからの連投を抑制する用途。
   プロセス再起動でリセットされる） */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

/**
 * 接続元の IP。Vercel は x-real-ip と x-forwarded-for を実際の接続元で
 * 上書きするので、そのどちらかを使う。他のホスティングに移すときは、
 * 前段のプロキシがこれらを上書きしていることを確かめること
 * （上書きしない環境では、送る側が自由に書けるので制限が効かない）。
 */
function clientIp(req: Request) {
  return (
    req.headers.get('x-real-ip')?.trim() ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitHits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

/* ===== 自動返信の文面（送信元のサイトの言葉で返す） =====
   利用者の入力は一切入れない。宛先はフォームに入れたアドレスなので、
   名前や本文を引用すると、第三者が任意の文面を会社名義で任意の宛先へ
   送れる（フィッシングの中継）ことになる。受け付けた通知だけを返す */
const AUTO_REPLY = {
  ja: {
    subject: '【自動返信】お問い合わせを受け付けました',
    text:
      'お問い合わせありがとうございます。\n' +
      '内容を確認のうえ、担当者より折り返しご連絡いたします。\n\n' +
      '株式会社TOMOCLOUD\n\n' +
      '※本メールは送信専用です。このメールに返信いただいてもお答えできません。\n' +
      '※お心当たりのない場合は、どなたかが誤ってこのアドレスを入力した可能性があります。本メールは破棄してください。',
  },
  en: {
    subject: '[Auto-reply] We have received your inquiry',
    text:
      'Thank you for contacting TOMOCLOUD.\n' +
      'We have received your inquiry and will get back to you shortly.\n\n' +
      'TOMOCLOUD Inc.\n\n' +
      '* This is a send-only address. Replies to this email are not monitored.\n' +
      '* If you did not contact us, someone may have entered your address by mistake. Please disregard this email.',
  },
} as const;

/* ===== 応答 =====
   失敗の理由は外に出さない。設定の不備（キー未設定など）は内部構成の
   手がかりになるのでログにだけ残す */
const SEND_FAILED = '送信に失敗しました。時間をおいて再度お試しください。';

/* ===== 動作確認用 ===== */
export async function GET() {
  return NextResponse.json({ ok: true, message: 'Contact API is up.' });
}

/* ===== 本体 ===== */
export async function POST(req: Request) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ ok: false, error: '不正なリクエストです。' }, { status: 403 });
    }

    if (isRateLimited(clientIp(req))) {
      return NextResponse.json({ ok: false, error: 'しばらく時間をおいて再度お試しください。' }, { status: 429 });
    }

    // 大きすぎる本文は、メモリに展開する前に断る。Content-Length が無い
    // （chunked の）場合に備えて、読んだ後の長さでも確かめる
    const declared = Number(req.headers.get('content-length') ?? 0);
    if (declared > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: '入力内容が長すぎます。' }, { status: 413 });
    }
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: '入力内容が長すぎます。' }, { status: 413 });
    }
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ ok: false, error: '不正なリクエストです。' }, { status: 400 });
    }

    const { name, email, message, company, locale: rawLocale } = body;
    // 想定外の値は日本語として扱う
    const locale: 'ja' | 'en' = rawLocale === 'en' ? 'en' : 'ja';

    // honeypot: 通常のユーザーには見えない company フィールドに値が入っていれば bot とみなす。
    // 成功レスポンスを返して bot に検知させない。
    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: '必須項目が不足しています。' }, { status: 400 });
    }
    if (String(name).length > 100 || String(email).length > 254 || String(message).length > 5000) {
      return NextResponse.json({ ok: false, error: '入力内容が長すぎます。' }, { status: 400 });
    }

    // 件名・本文に入る name から改行を除去し、メールヘッダ injection を防ぐ。
    const safeName = String(name).replace(/[\r\n]+/g, ' ').trim();
    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'メールアドレスの形式が正しくありません。' }, { status: 400 });
    }

    // 送信元／送信先の設定（ダブルクォートを除去）
    const FROM = process.env.CONTACT_FROM?.replace(/^"|"$/g, '');
    const TO = process.env.CONTACT_TO?.replace(/^"|"$/g, '');
    const fromAddress = FROM && (FROM.includes('<') ? FROM.split('<')[1].split('>')[0] : FROM);

    if (!process.env.RESEND_API_KEY || !FROM || !TO || !fromAddress || !isValidEmail(fromAddress)) {
      console.error('Contact API misconfigured:', {
        RESEND_API_KEY: !!process.env.RESEND_API_KEY,
        CONTACT_FROM: !!FROM,
        CONTACT_TO: !!TO,
        fromAddressValid: !!fromAddress && isValidEmail(fromAddress),
      });
      return NextResponse.json({ ok: false, error: SEND_FAILED }, { status: 500 });
    }

    // キー確認後に初期化（モジュール読み込み時にキーを要求しないことで、ビルドや未設定環境での失敗を防ぐ）
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 会社宛て
    const ownerRes = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `【お問い合わせ】${safeName} さんより`,
      replyTo: email,
      text: `お名前: ${safeName}\nメール: ${email}\n送信元: ${locale === 'en' ? '英語版サイト' : '日本語版サイト'}\n\n${message}`,
    });

    // 会社宛てが届かなければ失敗。自動返信はまだ送っていないので送り直して構わない
    if (ownerRes.error) {
      console.error('Resend error (owner):', ownerRes.error);
      return NextResponse.json({ ok: false, error: SEND_FAILED }, { status: 500 });
    }

    // 自動返信（ユーザー宛て）。ここで失敗しても問い合わせ自体は届いているので
    // 成功として返す。失敗を返すと送り直され、会社宛てに同じ内容が重複する
    const userRes = await resend.emails.send({
      from: FROM,
      to: email,
      subject: AUTO_REPLY[locale].subject,
      text: AUTO_REPLY[locale].text,
    });
    if (userRes.error) {
      console.error('Resend error (auto-reply, inquiry already delivered):', userRes.error);
    }

    // 返すのは成否だけ。メッセージ ID や自動返信の受理可否は、宛先の
    // 有効性を探る手がかりになるので出さない
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    console.error('Contact API error:', e);
    return NextResponse.json({ ok: false, error: '処理中にエラーが発生しました。' }, { status: 500 });
  }
}
