'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import SectionHead from './WaveSource';

const EMAIL_RE = /^(?!.{255,})([\w.!#$%&'*+/=?^_`{|}~-]+)@([A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;

type Fields = { name?: string; org?: string; email?: string; phone?: string; body?: string };

type Dict = {
  lead?: string;
  tel?: string;
  email?: string;
  fields?: Fields;
  optional?: string;
  submit?: string;
  sending?: string;
  privacyPrefix?: string;
  privacyLink?: string;
  privacySuffix?: string;
  done?: string;
  errors?: { missing?: string; invalidEmail?: string; sendFail?: string };
};

const EMPTY = { name: '', org: '', email: '', phone: '', body: '', company: '' };

/**
 * 09 お問い合わせ。
 *
 * 入力欄も一本の線で、面は塗らない。送信先は既存の /api/contact。
 * API が受けるのは name / email / message だけなので、会社名と電話番号は
 * 本文の先頭に畳んで送る。company は API 側の honeypot なので、
 * 人が触る欄には使わない。
 */
export default function ContactSection({
  t,
  head,
}: {
  t?: Dict;
  head?: { title?: string };
}) {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const f = t?.fields;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);

    const name = form.name.trim();
    const email = form.email.trim();
    const body = form.body.trim();

    if (!name || !email || !body) {
      setStatus({ ok: false, text: t?.errors?.missing ?? '' });
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setStatus({ ok: false, text: t?.errors?.invalidEmail ?? '' });
      return;
    }

    const message = [
      form.org.trim() ? `${f?.org ?? ''}: ${form.org.trim()}` : null,
      form.phone.trim() ? `${f?.phone ?? ''}: ${form.phone.trim()}` : null,
      form.org.trim() || form.phone.trim() ? '' : null,
      body,
    ]
      .filter((line) => line !== null)
      .join('\n');

    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company: form.company }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || t?.errors?.sendFail);

      setForm(EMPTY);
      setStatus({ ok: true, text: t?.done ?? '' });
    } catch (err) {
      setStatus({
        ok: false,
        text: err instanceof Error && err.message ? err.message : (t?.errors?.sendFail ?? ''),
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="wv-wrap wv-sec">
      <SectionHead title={head?.title ?? ''} />

      <div className="wv-contact">
        <div>
          <p className="wv-lead" style={{ margin: '0 0 28px' }}>
            {t?.lead}
          </p>
          <div className="wv-lat wv-contact-tel">
            <a href={`tel:${(t?.tel ?? '').replace(/[^\d+]/g, '')}`}>{t?.tel}</a>
            <br />
            <a href={`mailto:${t?.email}`}>{t?.email}</a>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate>
          {/* honeypot: 人間には見えない。bot がこの欄を埋めると送信をブロックする */}
          <div aria-hidden="true" style={{ display: 'none' }}>
            <label htmlFor="wv-company">Company</label>
            <input
              id="wv-company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.company}
              onChange={onChange}
            />
          </div>

          <div className="wv-fields">
            <div className="wv-field">
              <label htmlFor="wv-name">{f?.name}</label>
              <input
                id="wv-name"
                name="name"
                type="text"
                required
                maxLength={100}
                autoComplete="name"
                value={form.name}
                onChange={onChange}
              />
            </div>

            <div className="wv-field">
              <label htmlFor="wv-org">
                {f?.org}
                {t?.optional ? <span className="wv-field-optional">（{t.optional}）</span> : null}
              </label>
              <input
                id="wv-org"
                name="org"
                type="text"
                maxLength={100}
                autoComplete="organization"
                value={form.org}
                onChange={onChange}
              />
            </div>

            <div className="wv-field">
              <label htmlFor="wv-email">{f?.email}</label>
              <input
                id="wv-email"
                name="email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={form.email}
                onChange={onChange}
              />
            </div>

            <div className="wv-field">
              <label htmlFor="wv-phone">
                {f?.phone}
                {t?.optional ? <span className="wv-field-optional">（{t.optional}）</span> : null}
              </label>
              <input
                id="wv-phone"
                name="phone"
                type="tel"
                maxLength={40}
                autoComplete="tel"
                value={form.phone}
                onChange={onChange}
              />
            </div>

            <div className="wv-field wv-field-wide">
              <label htmlFor="wv-body">{f?.body}</label>
              <textarea
                id="wv-body"
                name="body"
                required
                maxLength={4000}
                value={form.body}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="wv-contact-submit">
            <button type="submit" className="wv-btn" disabled={sending}>
              {sending ? t?.sending : t?.submit}
            </button>
            <div className="wv-note wv-contact-privacy">
              {t?.privacyPrefix}
              {t?.privacyLink}
              {t?.privacySuffix}
            </div>
          </div>

          {status ? (
            <p className="wv-form-status" data-ok={status.ok} role="status" style={{ marginTop: 20 }}>
              {status.text}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
