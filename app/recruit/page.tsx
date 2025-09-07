// app/recruit/page.tsx
import { redirect } from 'next/navigation';

export default function RecruitRootRedirect() {
  redirect('/ja/recruit'); // デフォルトは日本語に
}
