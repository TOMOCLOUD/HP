// app/api/contact/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/* ===== バリデーション ===== */
function isValidEmail(e: string) {
  return /^(?!.{255,})([\w.!#$%&'*+/=?^_`{|}~-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/.test(e);
}

/* ===== 動作確認用 ===== */
export async function GET() {
  return NextResponse.json({ ok: true, message: 'Contact API is up.' });
}

/* ===== 本体 ===== */
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: '必須項目が不足しています。' }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: 'メールアドレスの形式が正しくありません。' }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ ok: false, error: 'RESEND_API_KEY が未設定です。' }, { status: 500 });
    }

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
      subject: `【お問い合わせ】${name} さんより`,
      replyTo: email, // ← ここが正しいキー名
      text: `お名前: ${name}\nメール: ${email}\n\n${message}`,
    });

    // 自動返信（ユーザー宛て）
    const userRes = await resend.emails.send({
      from: FROM,
      to: email,
      subject: '【自動返信】お問い合わせを受け付けました',
      text:
        `${name} 様\n\nこの度はお問い合わせありがとうございます。以下の内容で受け付けました。\n\n` +
        `---\n${message}\n---\n\n※本メールは送信専用です。`,
    });

    // 失敗時の詳細
    if (ownerRes.error) {
      return NextResponse.json({ ok: false, error: ownerRes.error.message || '送信に失敗しました（会社宛）。' }, { status: 500 });
    }
    if (userRes.error) {
      return NextResponse.json({ ok: false, error: userRes.error.message || '送信に失敗しました（自動返信）。' }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      ownerId: ownerRes.data?.id ?? null,
      userId: userRes.data?.id ?? null,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: '処理中にエラーが発生しました。', details: e?.message },
      { status: 500 }
    );
  }
}
