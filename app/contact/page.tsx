// app/contact/page.tsx
import { redirect } from 'next/navigation';

export default function ContactRootRedirect() {
  redirect('/ja/contact'); // デフォルトは日本語
}
