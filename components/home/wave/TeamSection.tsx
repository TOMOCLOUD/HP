'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionHead from './WaveSource';

type Member = { key?: string; role?: string; name?: string; title?: string; image?: string };

/** home.team.members に入っている紹介文。日英で同じ形 */
type Detail = {
  title?: string;
  subtitle?: string;
  bio?: string;
  achievements?: string[];
};

type Details = Record<string, Detail | undefined>;

/**
 * 開いている間、後ろのページが動かないようにする。
 *
 * モバイルで position: fixed を使うとアドレスバーの伸縮と喧嘩して中身が
 * 飛ぶので、スクロールバーの幅がある環境（= デスクトップ）だけ body を
 * 留め、そのぶんの余白を右に足して横ずれを防ぐ。
 */
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const gap = window.innerWidth - html.clientWidth;
    const pinBody = gap > 0;
    const before = {
      htmlOverflow: html.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    };

    html.style.overflow = 'hidden';
    document.body.style.paddingRight = `${gap}px`;
    if (pinBody) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    return () => {
      html.style.overflow = before.htmlOverflow;
      document.body.style.position = before.position;
      document.body.style.top = before.top;
      document.body.style.width = before.width;
      document.body.style.paddingRight = before.paddingRight;
      if (pinBody) window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

/**
 * 紹介文の窓。
 *
 * 地は白のまま、罫を一本引くだけ。後ろのページは薄い白で覆って引かせる。
 * ページ側の transform を containing block にしてしまわないよう、
 * body へ portal で出す。
 */
function MemberModal({
  member,
  detail,
  achievementsTitle,
  closeLabel,
  onClose,
}: {
  member: Member;
  detail?: Detail;
  achievementsTitle: string;
  closeLabel: string;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useBodyScrollLock(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!mounted) return null;

  const title = detail?.title || member.title;
  const achievements = detail?.achievements ?? [];

  return createPortal(
    <div className="wv-modal" role="dialog" aria-modal="true" aria-label={member.name}>
      <div className="wv-modal-veil" onClick={onClose} aria-hidden="true" />

      <div className="wv-modal-card">
        <div className="wv-modal-head">
          <div>
            <div className="wv-lat wv-member-role">{member.role}</div>
            <div className="wv-modal-name">{member.name}</div>
          </div>
          <button type="button" className="wv-modal-close" onClick={onClose}>
            {closeLabel}
          </button>
        </div>

        <div className="wv-modal-body">
          {title ? <p className="wv-modal-title">{title}</p> : null}
          {detail?.subtitle ? <p className="wv-note wv-modal-sub">{detail.subtitle}</p> : null}
          {detail?.bio ? <p className="wv-lead wv-modal-bio">{detail.bio}</p> : null}

          {achievements.length > 0 ? (
            <div className="wv-modal-achievements">
              <div className="wv-modal-achievements-label">{achievementsTitle}</div>
              <ul>
                {achievements.map((a) => (
                  <li key={a} className="wv-note">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}

/**
 * 07 チーム。
 *
 * 一人ひとりを一滴として扱い、まわりに離れた輪を一本置く。
 * 頭の高さは、上に引いた弧に沿ってずらす。
 * 押すと、その人の紹介文が窓で開く。
 */
export default function TeamSection({
  t,
  head,
  details,
  achievementsTitle,
  closeLabel,
}: {
  t?: { members?: Member[] };
  head?: { title?: string };
  details?: Details;
  achievementsTitle?: string;
  closeLabel?: string;
}) {
  const [active, setActive] = useState<Member | null>(null);
  const close = useCallback(() => setActive(null), []);

  const detailFor = (m: Member) => (m.key ? details?.[m.key] : undefined);

  return (
    <section className="wv-wrap wv-sec">
      <SectionHead title={head?.title ?? ''} />

      <div className="wv-team">
        <svg
          className="wv-team-arc"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          height={100}
          fill="none"
          aria-hidden="true"
        >
          <path d="M 0 80 Q 600 0 1200 80" stroke="#c7deec" vectorEffect="non-scaling-stroke" />
          <path d="M 0 98 Q 600 18 1200 98" stroke="#e4eff6" vectorEffect="non-scaling-stroke" />
        </svg>

        <div className="wv-team-grid">
          {(t?.members ?? []).map((m) => (
            <button key={m.name} type="button" className="wv-member" onClick={() => setActive(m)}>
              <div className="wv-member-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.image} alt={m.name ?? ''} width={224} height={224} />
              </div>
              <div className="wv-lat wv-member-role">{m.role}</div>
              <div className="wv-member-name">{m.name}</div>
              {m.title ? (
                <div className="wv-note" style={{ fontSize: 14 }}>
                  {m.title}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <MemberModal
          member={active}
          detail={detailFor(active)}
          achievementsTitle={achievementsTitle ?? ''}
          closeLabel={closeLabel ?? ''}
          onClose={close}
        />
      ) : null}
    </section>
  );
}
