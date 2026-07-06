'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowRight, X, Menu } from 'lucide-react'
import { trackNavClick, trackMobileMenuOpen, trackCtaClick } from '@/lib/useAnalytics'
import { useLocale } from '@/lib/i18n/useLocale'
import { getDictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const locale = useLocale()
  const t = getDictionary(locale).header
  const pathname = usePathname() || '/'
  const router = useRouter()

  const navLinks = t.nav

  const scrollTo = (id: string, label: string) => {
    trackNavClick(label, id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const openMenu = () => {
    trackMobileMenuOpen()
    setMenuOpen(true)
  }

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
    const segments = pathname.split('/')
    segments[1] = nextLocale
    router.push(segments.join('/') || `/${nextLocale}`)
    setMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const LanguageSwitcher = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-1 text-sm font-bold ${className}`} aria-label={t.langLabel}>
      <button
        onClick={() => switchLocale('de')}
        className={`px-2 py-1 rounded-md transition-colors ${locale === 'de' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
        aria-current={locale === 'de'}
      >
        DE
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 rounded-md transition-colors ${locale === 'en' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
        aria-current={locale === 'en'}
      >
        EN
      </button>
    </div>
  )

  return (
    <>
      <header className="bg-white border-b border-gray-100 relative z-40">
        <div className="section-width py-4 flex items-center justify-between">
          <Image
            src="/logo-aventurin.webp"
            alt={t.logoAlt}
            width={280}
            height={114}
            className="h-14 w-auto"
          />
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id, label)}
                className="text-gray-700 hover:text-black transition-colors text-sm font-semibold"
              >
                {label}
              </button>
            ))}
            <LanguageSwitcher />
            <button
              onClick={() => {
                trackCtaClick('Termin buchen', 'Header')
                scrollTo('quiz', 'Quiz')
              }}
              className="btn-primary text-sm"
            >
              {t.cta} <ArrowRight size={16} />
            </button>
          </nav>
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={openMenu}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-100 transition-colors"
              aria-label={t.openMenu}
            >
              <Menu size={22} color="#111" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className={`absolute top-0 right-0 h-full w-[80%] max-w-xs bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <Image src="/logo-aventurin.webp" alt={t.logoAlt} width={280} height={114} className="h-12 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-9 h-9 hover:bg-gray-100 transition-colors"
            >
              <X size={20} color="#111" />
            </button>
          </div>
          <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id, label)}
                className="flex items-center gap-3 px-4 py-4 text-left text-gray-800 font-bold text-lg hover:bg-accent/10 transition-all group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: '#00B893' }} />
                {label}
              </button>
            ))}
          </nav>
          <div className="px-4 pb-8 pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                trackCtaClick('Termin buchen', 'Mobile Menü')
                scrollTo('quiz', 'Quiz')
              }}
              className="btn-primary w-full justify-center text-base py-4"
            >
              {t.cta} <ArrowRight size={18} />
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">{t.mobileFootnote}</p>
          </div>
        </div>
      </div>
    </>
  )
}
