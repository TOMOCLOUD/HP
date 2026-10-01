'use client';

import { useDict } from '@/lib/useDict';
import SectionHead from '@/components/home/wave/WaveSource';

type Section = { h?: string; p?: string };

/**
 * プライバシーポリシー。
 *
 * 本文は改行で段を分けるだけの素直な作り。ホームのような仕掛けは置かず、
 * 読む速さを妨げない。
 */
export default function PrivacyPage() {
  const { dict } = useDict();
  const t = dict?.privacy;

  return (
    <div className="wv">
      <section className="wv-wrap wv-sec wv-legal">
        <SectionHead title={t?.title ?? ''} />

        <p className="wv-lead wv-legal-intro">{t?.intro}</p>

        {(t?.sections ?? []).map((s: Section) => (
          <section key={s.h} className="wv-legal-block">
            <h2 className="wv-legal-h">{s.h}</h2>
            {(s.p ?? '').split('\n').map((line: string, i: number) => (
              <p key={i} className="wv-legal-p">
                {line}
              </p>
            ))}
          </section>
        ))}

        <p className="wv-note wv-legal-updated">{t?.updated}</p>
      </section>
    </div>
  );
}
