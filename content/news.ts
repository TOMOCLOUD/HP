/**
 * ニュースの唯一のデータ源。トップの「ニュース」節とアーカイブ（/news）は
 * どちらもここから読む。辞書（dictionaries/*.json）にはニュースを置かない。
 *
 * 追加するときの決めごと:
 * - 新しい件はこの配列に1件足すだけでよい。トップは新しい順に
 *   TOP_COUNT 件だけを表示し、残りはアーカイブにだけ出る
 * - date はイベントの当日（開催が複数日なら初日）。YYYY-MM-DD で書く
 * - タイトルは日英とも「〜しました。」の言い切りで揃える。開催前に載せる
 *   場合も、終わったら過去形へ直す
 * - featured はトップの注目枠に出す1件。常にちょうど1件だけ true にし、
 *   新しい節目（採択・受賞・資金調達・薬事マイルストーン）が来たら移す。
 *   注目枠を退いた件は、text を残したままふつうの行として並ぶ
 */

export type NewsTagKey = 'adoption' | 'award' | 'media' | 'plain';

export type NewsItem = {
  /** イベントの当日（YYYY-MM-DD）。表示では YYYY.MM.DD になる */
  date: string;
  /** 行頭の点の色（components/home/wave/tagColors.ts） */
  tagKey: NewsTagKey;
  tag: { ja: string; en: string };
  /** 出どころ。デスクトップでは行の右端に出る */
  org?: { ja: string; en: string };
  title: { ja: string; en: string };
  /** 注目枠でだけ出す本文 */
  text?: { ja: string; en: string };
  url?: string;
  /** トップの注目枠。常にちょうど1件 */
  featured?: boolean;
};

/** 表示用に片方の言語へ倒した行 */
export type LocalizedNewsRow = {
  date: string;
  tag: string;
  tagKey: NewsTagKey;
  org: string;
  title: string;
  text?: string;
  url?: string;
};

export function toNewsRow(item: NewsItem, locale: 'ja' | 'en'): LocalizedNewsRow {
  return {
    date: item.date.split('-').join('.'),
    tag: item.tag[locale],
    tagKey: item.tagKey,
    org: item.org?.[locale] ?? '',
    title: item.title[locale],
    text: item.text?.[locale],
    url: item.url,
  };
}

const TAG = {
  talk: { ja: '登壇', en: 'Talk' },
  exhibit: { ja: '出展', en: 'Exhibit' },
  press: { ja: '媒体掲載', en: 'In the press' },
  selected: { ja: '採択', en: 'Selected' },
  award: { ja: '受賞', en: 'Award' },
  funding: { ja: '資金調達', en: 'Funding' },
  update: { ja: 'お知らせ', en: 'Update' },
} as const;

const RESEARCH = { ja: '研究実績', en: 'Research record' };

/** 新しい順。並びが崩れても表示側で date 降順に直す */
export const newsItems: NewsItem[] = [
  {
    date: '2026-08-24',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: 'NEDO主催「NEP Pitch -2025躍進ファイナル-」に小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa pitched at NEP Pitch 2025 Final, hosted by NEDO.',
    },
    url: 'https://prtimes.jp/main/html/rd/p/000000005.000157480.html',
  },
  {
    date: '2026-07-30',
    tagKey: 'adoption',
    tag: TAG.selected,
    org: { ja: 'AMED', en: 'AMED' },
    title: {
      ja: 'AMED橋渡し研究プログラム 筑波大学拠点「大学発医療系スタートアップ支援プログラム【S2】」に採択されました',
      en: 'Selected for the Medical Startup Support Program [S2] under the AMED Translational Research Program (University of Tsukuba hub)',
    },
    text: {
      ja: '課題名「リンパ浮腫早期診断装置の薬事承認・上市に向けた研究開発」（代表者：小川良磨）が採択されました。',
      en: 'The project "R&D toward regulatory approval and market launch of an early-diagnosis device for lymphedema" (PI: Ryoma Ogawa) was selected.',
    },
    url: 'https://www.hosp.tsukuba.ac.jp/t-credo/1428',
    featured: true,
  },
  {
    date: '2026-07-14',
    tagKey: 'award',
    tag: TAG.award,
    title: {
      ja: 'HVC KYOTOにて、O-Nexus AwardおよびTokyu Land Awardを受賞しました。',
      en: 'TOMOCLOUD received the O-Nexus Award and the Tokyu Land Award at HVC KYOTO.',
    },
    url: 'https://hvckyoto.com/',
  },
  {
    date: '2026-07-09',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: 'GTIE DEMO DAY 2026 に小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa spoke at GTIE DEMO DAY 2026.',
    },
    url: 'https://gtie.jp/news/45471/',
  },
  {
    date: '2026-04-21',
    tagKey: 'plain',
    tag: TAG.exhibit,
    title: {
      ja: '株式会社TOMOCLOUDが、メドテックジャパン2026に出展しました。',
      en: 'TOMOCLOUD exhibited at Medtec Japan 2026.',
    },
    url: 'https://medtecjapan.com/',
  },
  {
    date: '2026-04-04',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '「Chiba Global Entrepreneur Salon」（東葛から世界へ ～未来を創るスタートアップ拠点～）に小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa spoke at the "Chiba Global Entrepreneur Salon" (From Tokatsu to the World: A Startup Hub Creating the Future).',
    },
    url: 'https://startup-lab.chiba-u.jp/p/7916/',
  },
  {
    date: '2026-04-01',
    tagKey: 'plain',
    tag: TAG.update,
    title: {
      ja: '【April Dream Project】TOMOCLOUDの夢を発信しました。',
      en: 'TOMOCLOUD shared its dream as part of the April Dream Project.',
    },
    url: 'https://prtimes.jp/main/html/rd/p/000000003.000175448.html',
  },
  {
    date: '2026-03-10',
    tagKey: 'plain',
    tag: TAG.exhibit,
    title: {
      ja: 'NEDO主催「NEP-Lab 2026」に株式会社TOMOCLOUDが出展しました。',
      en: 'TOMOCLOUD exhibited at NEDO NEP-Lab 2026.',
    },
    url: 'https://prtimes.jp/main/html/rd/p/000000004.000157480.html',
  },
  {
    date: '2026-03-09',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: 'キャンサーフィットネス主催セミナー「知っておきたい『むくみの構造』 工学の力で支える、これからのセルフモニタリング」に小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa spoke at a Cancer Fitness seminar, "Understanding the Structure of Edema: Self-Monitoring Supported by Engineering."',
    },
    url: 'https://cancerfit0309.peatix.com/view',
  },
  {
    date: '2026-03-02',
    tagKey: 'media',
    tag: TAG.press,
    org: { ja: 'Forbes Japan', en: 'Forbes Japan' },
    title: {
      ja: 'Forbes Japan「30 EMERGING DEEPTECH」に掲載されました。',
      en: 'TOMOCLOUD was featured in Forbes Japan\'s "30 EMERGING DEEPTECH".',
    },
    url: 'https://prtimes.jp/main/html/rd/p/000000002.000175448.html',
  },
  {
    date: '2026-02-10',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '関東リンパ浮腫研究会にて小川良磨CEOが特別講演を行いました。',
      en: 'CEO Ryoma Ogawa delivered a special lecture at the Kanto Lymphedema Research Society.',
    },
    url: 'http://kanto-lymph.kenkyuukai.jp/special/?id=40074',
  },
  {
    date: '2026-01-22',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '千葉大学IMOランチセミナー「博士号取得から起業へ ～千葉大学発医療機器スタートアップの『品質・仕組みづくり』のリアル～」に小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa spoke at the Chiba University IMO Lunch Seminar, "From Ph.D. to Entrepreneurship: The Reality of Building Quality and Systems at a Chiba University Medical Device Startup."',
    },
    url: 'https://startup-lab.chiba-u.jp/p/7704/',
  },
  {
    date: '2026-01-21',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '第45回日本医工ものづくりコモンズシンポジウム「日本発の医療機器創出を目指して」に小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa spoke at the 45th Symposium of the Japan Medical-Engineering Monozukuri Commons, "Toward the Creation of Medical Devices from Japan."',
    },
    url: 'https://www.ikou-commons.com/t_info/sympo/comcymp45/',
  },
  {
    date: '2025-12-26',
    tagKey: 'adoption',
    tag: TAG.funding,
    title: {
      ja: 'シードラウンドにて5000万円の資金調達を実施しました。',
      en: 'TOMOCLOUD closed a seed round of 50 million yen.',
    },
    url: 'https://prtimes.jp/main/html/rd/p/000000001.000175448.html',
  },
  {
    date: '2025-11-25',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '第23回千葉大学医工学シンポジウムに小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa spoke at the 23rd Chiba University Biomedical Engineering Symposium.',
    },
    url: 'https://www.cfme.chiba-u.jp/event/symposium2025/',
  },
  {
    date: '2025-10-31',
    tagKey: 'media',
    tag: TAG.press,
    org: { ja: '日刊工業新聞', en: 'Nikkan Kogyo Shimbun' },
    title: {
      ja: '日刊工業新聞に株式会社TOMOCLOUDが掲載されました。',
      en: 'TOMOCLOUD was covered by Nikkan Kogyo Shimbun.',
    },
    url: 'https://www.nikkan.co.jp/articles/view/00764749',
  },
  {
    date: '2025-10-29',
    tagKey: 'plain',
    tag: TAG.update,
    title: {
      ja: '米国FDA医療機器・放射線保健センターが千葉大学IMOを訪問し、小川良磨CEOが面談しました。',
      en: 'The US FDA Center for Devices and Radiological Health visited Chiba University IMO, and CEO Ryoma Ogawa met with the delegation.',
    },
    url: 'https://imo.chiba-u.jp/news/news/1029FDA_jetro.html',
  },
  {
    date: '2025-10-03',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '小川良磨CEOが、SPARK-BIH VC Dayに参加しピッチ登壇しました。',
      en: 'CEO Ryoma Ogawa delivered a pitch at SPARK-BIH VC Day.',
    },
    url: 'https://www.spark-bih.de/news-events/venture-capital-day',
  },
  {
    date: '2025-09-08',
    tagKey: 'plain',
    tag: TAG.update,
    title: {
      ja: '小川良磨CEOが、Beyond Japan Zero to X Programに参加しました。',
      en: 'CEO Ryoma Ogawa took part in the Beyond Japan Zero to X Program.',
    },
    url: 'https://www.b4d-jp.com/news/2025-8',
  },
  {
    date: '2025-09-06',
    tagKey: 'award',
    tag: TAG.award,
    org: RESEARCH,
    title: {
      ja: '第9回日本リンパ浮腫治療学会学術総会で最優秀演題賞を受賞しました。',
      en: 'CEO Ryoma Ogawa received the Best Presentation Award at the 9th Annual Meeting of the Japanese Society of Lymphedema Treatment.',
    },
    url: 'https://www.graffiti97.com/9jslt/index.html',
  },
  {
    date: '2025-08-24',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '第19回むくみゼミナール特別イベントに小川良磨CEOが登壇しました。',
      en: 'CEO Ryoma Ogawa spoke at the special event of the 19th Lymphedema Seminar.',
    },
    url: 'https://www.mukumi-seminar.org/event/',
  },
  {
    date: '2025-08-23',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '小川良磨CEOが、第9回日本リンパ浮腫治療学会学術総会の優秀演題セッションにて「電気インピーダンス・トモグラフィ（EIT）によるリンパ浮腫評価のこれまでとこれから」の講演を行いました。',
      en: 'CEO Ryoma Ogawa presented "EIT for Lymphedema Evaluation: Past and Future" in the Excellent Presentation session at the 9th Annual Meeting of the Japanese Society of Lymphedema Treatment.',
    },
    url: 'https://www.graffiti97.com/9jslt/index.html',
  },
  {
    date: '2025-08-20',
    tagKey: 'adoption',
    tag: TAG.selected,
    org: RESEARCH,
    title: {
      ja: 'Beyond Japan Zero to X Programに最終採択されました。',
      en: 'TOMOCLOUD was selected in the final round of the Beyond Japan Zero to X Program.',
    },
    url: 'https://www.b4d-jp.com/news/2025-8',
  },
  {
    date: '2025-08-12',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '小川良磨CEOが、第33回日本乳癌学会学術総会で「電気インピーダンス・トモグラフィ（EIT）による新たな乳がん評価法の検討」を発表しました。',
      en: 'CEO Ryoma Ogawa presented "A New Breast Cancer Evaluation Method Using EIT" at the 33rd Annual Meeting of the Japanese Breast Cancer Society.',
    },
    url: 'https://www.congre.co.jp/jbcs2025/',
  },
  {
    date: '2025-07-30',
    tagKey: 'adoption',
    tag: TAG.selected,
    org: RESEARCH,
    title: {
      ja: 'GTIE-GAPファンド エントリーコースに採択されました。',
      en: 'TOMOCLOUD was selected for the GTIE-GAP Fund entry course.',
    },
    url: 'https://gtie.jp/news/43810/',
  },
  {
    date: '2025-05-24',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '小川良磨CEOが、日本機械学会 第37回バイオエンジニアリング講演会で研究成果発表を行いました。',
      en: 'CEO Ryoma Ogawa presented research results at the 37th JSME Bioengineering Conference.',
    },
    url: 'https://www.jsme.or.jp/conference/bioconf25/index.html',
  },
  {
    date: '2025-05-23',
    tagKey: 'plain',
    tag: TAG.talk,
    title: {
      ja: '小川良磨CEOが、第49回日本リンパ学会総会で講演を行いました。',
      en: 'CEO Ryoma Ogawa gave a talk at the 49th Annual Meeting of the Japanese Society of Lymphology.',
    },
    url: 'https://square.umin.ac.jp/jsl49/',
  },
];
