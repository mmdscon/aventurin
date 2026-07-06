'use client'
import { usePathname } from 'next/navigation'
import { defaultLocale, isLocale, type Locale } from './config'

/** Reads the active locale from the first URL segment, e.g. /en/danke -> 'en'. */
export function useLocale(): Locale {
  const pathname = usePathname() || '/'
  const segment = pathname.split('/')[1] || ''
  return isLocale(segment) ? segment : defaultLocale
}
