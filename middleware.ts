// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isLocale } from './lib/i18n'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 除外: /api, /_next, /favicon.ico などのファイルパス
  const isFile = pathname.includes('.') || pathname.startsWith('/_next') || pathname.startsWith('/api')
  if (isFile) return

  // 先頭セグメントがロケールならそのまま。
  // ただし <html lang> をロケールに合わせたいので、パスだけ下へ渡す。
  // App Router では <html> をルートのレイアウトにしか置けず、
  // [locale] のレイアウトからは書き換えられないため。
  const seg = pathname.split('/')[1]
  if (isLocale(seg)) {
    const res = NextResponse.next()
    res.headers.set('x-pathname', pathname)
    return res
  }

  // それ以外は /ja を先頭に付けてリダイレクト
  const url = req.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // 静的ファイル /api /_next を除外
  matcher: '/((?!_next|api|.*\\..*).*)',
}
