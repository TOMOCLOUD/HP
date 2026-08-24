import SectionHead from './WaveSource';

const SURVEY_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSfFu_lqgdpk9YYOmXUPX3wjZk-J9r7dfIeR52NSEcB0zb2oPQ/viewform?usp=dialog';

/** 06 アンケート協力のお願い。面を塗るボタンは、ページでここと送信だけ */
export default function SurveySection({
  t,
  head,
}: {
  t?: { lead?: string; cta?: string };
  head?: { kicker?: string; title?: string };
}) {
  return (
    <section className="wv-wrap wv-sec">
      <SectionHead kicker={head?.kicker ?? ''} title={head?.title ?? ''} />

      <div className="wv-survey">
        <p className="wv-survey-lead">{t?.lead}</p>
        <div>
          <a href={SURVEY_FORM} target="_blank" rel="noopener noreferrer" className="wv-btn">
            {t?.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
