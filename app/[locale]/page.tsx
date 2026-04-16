'use client';

import { useImageFallback } from '@/lib/imageUtils';
import { useRevealOnScroll } from '@/lib/useRevealOnScroll';
import Hero from '@/components/home/Hero';
import VisionSection from '@/components/home/VisionSection';
import QuestionnaireCard from '@/components/home/QuestionnaireCard';
import { ValuesSection } from '@/components/home/ValuesSection';
import TeamSection from '@/components/home/TeamSection';
import MessageSection from '@/components/home/MessageSection';
import NewsSection from '@/components/home/NewsSection';
import RecruitSection from '@/components/home/RecruitSection';
import AboutSection from '@/components/home/AboutSection';

function HomePage() {
  useRevealOnScroll();
  const onImgError = useImageFallback();

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Hero />
      <VisionSection onImgError={onImgError} />
      <QuestionnaireCard />
      <ValuesSection />
      <TeamSection onImgError={onImgError} />
      <MessageSection onImgError={onImgError} />
      <NewsSection onImgError={onImgError} />
      <RecruitSection />
      <AboutSection />
    </div>
  );
}

export default function LocaleHome() {
  return <HomePage />;
}
