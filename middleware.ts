import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isLocale } from '@/lib/i18n/config'

const LOCALE_COOKIE = 'NEXT_LOCALE'

/**
 * Picks the best matching locale from the browser's Accept-Language header,
 * which reflects the system/device language of the visitor.
 */
function getLocaleFromAcceptLanguage(header: string | null): string {
  if (!header) return defaultLocale

  const preferred = header
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase())

  for (const lang of preferred) {
    if (lang.startsWith('en')) return 'en'
    if (lang.startsWith('de')) return 'de'
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const firstSegment = pathname.split('/')[1] || ''
  if (isLocale(firstSegment)) {
    // Already locale-prefixed — nothing to do.
    return NextResponse.next()
  }

  // A previous explicit choice (via the language switcher) always wins.
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : getLocaleFromAcceptLanguage(request.headers.get('accept-language'))

  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
