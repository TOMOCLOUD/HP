// app/achievements/page.tsx
import { redirect } from 'next/navigation';

export default function AchievementsRootRedirect() {
  redirect('/ja/achievements'); // デフォルト言語は日本語
}
