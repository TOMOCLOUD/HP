'use client';

import { useEffect } from 'react';
import { useDict } from '@/lib/useDict';
import { useWavePropagation } from '@/lib/useWavePropagation';
import { scrollToHashOnMount } from '@/lib/scrollToSection';
import ContourField from '@/components/home/wave/ContourField';
import HeroSection from '@/components/home/wave/HeroSection';
import PartnerLogos from '@/components/home/wave/PartnerLogos';
import NewsSection from '@/components/home/wave/NewsSection';
import MissionSection from '@/components/home/wave/MissionSection';
import ProductSection from '@/components/home/wave/ProductSection';
import RecruitSection from '@/components/home/wave/RecruitSection';
import LymphedemaSection from '@/components/home/wave/LymphedemaSection';
import SurveySection from '@/components/home/wave/SurveySection';
import TeamSection from '@/components/home/wave/TeamSection';
import MessageSection from '@/components/home/wave/MessageSection';
import ContactSection from '@/components/home/wave/ContactSection';
import AboutSection from '@/components/home/wave/AboutSection';

/**
 * トップページ。干渉（白）案。
 *
 * ページ全体を線と余白だけで組む。塗った面はアンケートと送信のボタン、
 * EIT の再構成画面、それに写真だけ。
 *
 * ホームの写真のふちから生まれた波が外へ広がり、そのうちの一本が
 * ページの下へ向かって出発する。14秒かけて下まで降りきり、
 * 通り過ぎたセクションの波源が順に発火する。
 */
export default function LocaleHome() {
  const { dict, locale } = useDict();
  useWavePropagation();

  // 辞書ロード前は各セクションが空で、まだページの高さが確定していない。
  // 実データが入って高さが確定してから、URL のハッシュへ合わせる。
  useEffect(() => {
    if (!dict) return;
    return scrollToHashOnMount();
  }, [dict]);

  const t = dict?.top;
  const s = t?.sections;

  return (
    <div className="wv">
      <ContourField />

      <HeroSection t={t?.hero} />
      <PartnerLogos t={t?.partners} />

      <div id="news" className="wv-anchor">
        <NewsSection t={t?.news} head={s?.news} locale={locale} />
      </div>

      <MissionSection t={t?.mission} head={s?.mission} values={dict?.home?.values} />

      <div id="product" className="wv-anchor">
        <ProductSection t={t?.product} head={s?.product} locale={locale} />
      </div>

      <div id="recruit" className="wv-anchor">
        <RecruitSection t={t?.recruit} head={s?.recruit} />
      </div>

      <LymphedemaSection t={t?.lymphedema} head={s?.lymphedema} />
      <SurveySection t={t?.survey} head={s?.survey} />
      <TeamSection t={t?.team} head={s?.team} />
      <MessageSection t={t?.message} head={s?.message} />

      <div id="contact" className="wv-anchor">
        <ContactSection t={t?.contact} head={s?.contact} />
      </div>

      <div id="about" className="wv-anchor">
        <AboutSection about={dict?.home?.about} head={s?.about} />
      </div>
    </div>
  );
}
