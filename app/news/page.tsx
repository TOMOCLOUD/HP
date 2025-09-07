// app/news/page.tsx
import { redirect } from 'next/navigation';

export default function NewsRootRedirect() {
  redirect('/ja/news'); // デフォルト言語を日本語に
}
