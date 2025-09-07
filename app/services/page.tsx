import { redirect } from 'next/navigation';

export default function RootRedirect() {
  redirect('/ja/services'); // デフォルト言語を日本語に
}
