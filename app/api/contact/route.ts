// app/api/contact/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/* ===== バリデーション ===== */
function isValidEmail(e: string) {
  return /^(?!.{255,})([\w.!#$%&'*+/=?^_`{|}~-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(e);
}

const ALLOWED_ORIGINS = [process.env.CONTACT_FROM_ORIGIN, process.env.NEXT_PUBLIC_SITE_URL].filter(
  (v): v is string => !!v
);

function isAllowedOrigin(req: Request) {
  if (ALLOWED_ORIGINS.length === 0) return true; // 未設定時はチェックをスキップ
  const origin = req.headers.get('origin') ?? req.headers.get('referer');
  if (!origin) return false;
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
}

// プロセス内メモリでの簡易レートリミット（同一IPからの連投を抑制する用途。プロセス再起動でリセットされる）
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitHits = new Map<string, { count: number; resetAt: number }>();

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

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: 'しばらく時間をおいて再度お試しください。' }, { status: 429 });
    }

    const { name, email, message, company } = await req.json();

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
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'メールアドレスの形式が正しくありません。' }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: 'RESEND_API_KEY が未設定です。' }, { status: 500 });
    }

    // キー確認後に初期化（モジュール読み込み時にキーを要求しないことで、ビルドや未設定環境での失敗を防ぐ）
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 送信元／送信先の設定（ダブルクォートを除去）
    const FROM = process.env.CONTACT_FROM?.replace(/^"|"$/g, '');
    const TO = process.env.CONTACT_TO?.replace(/^"|"$/g, '');
    
    if (!FROM) {
      return NextResponse.json({ ok: false, error: 'CONTACT_FROM が未設定です。' }, { status: 500 });
    }
    if (!TO) {
      return NextResponse.json({ ok: false, error: 'CONTACT_TO が未設定です。' }, { status: 500 });
    }
    
    // メールアドレス形式の検証
    if (!isValidEmail(FROM.includes('<') ? FROM.split('<')[1].split('>')[0] : FROM)) {
      return NextResponse.json({ ok: false, error: 'CONTACT_FROM の形式が正しくありません。' }, { status: 500 });
    }

    // 会社宛て
    const ownerRes = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `【お問い合わせ】${safeName} さんより`,
      replyTo: email, // ← ここが正しいキー名
      text: `お名前: ${safeName}\nメール: ${email}\n\n${message}`,
    });

    // 自動返信（ユーザー宛て）
    const userRes = await resend.emails.send({
      from: FROM,
      to: email,
      subject: '【自動返信】お問い合わせを受け付けました',
      text:
        `${safeName} 様\n\nこの度はお問い合わせありがとうございます。以下の内容で受け付けました。\n\n` +
        `---\n${message}\n---\n\n※本メールは送信専用です。`,
    });

    // 失敗時の詳細（デバッグ情報を追加）
    if (ownerRes.error) {
      console.error('Resend error (owner):', ownerRes.error);
      return NextResponse.json({
        ok: false,
        error: '送信に失敗しました。時間をおいて再度お試しください。',
        debug: process.env.NODE_ENV === 'development' ? ownerRes.error : undefined
      }, { status: 500 });
    }
    if (userRes.error) {
      console.error('Resend error (user):', userRes.error);
      return NextResponse.json({
        ok: false,
        error: '送信に失敗しました。時間をおいて再度お試しください。',
        debug: process.env.NODE_ENV === 'development' ? userRes.error : undefined
      }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      ownerId: ownerRes.data?.id ?? null,
      userId: userRes.data?.id ?? null,
    });
  } catch (e: unknown) {
    console.error('Contact API error:', e);
    return NextResponse.json(
      {
        ok: false,
        error: '処理中にエラーが発生しました。',
        debug: process.env.NODE_ENV === 'development'
          ? (e instanceof Error ? e.message : 'Unknown error')
          : undefined,
      },
      { status: 500 }
    );
  }
}
