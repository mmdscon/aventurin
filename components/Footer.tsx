'use client'
import Image from 'next/image'
import { useLocale } from '@/lib/i18n/useLocale'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default function Footer() {
  const locale = useLocale()
  const t = getDictionary(locale).footer

  const openCookieBanner = () => {
    window.dispatchEvent(new CustomEvent('open-cookie-banner'))
  }

  return (
    <footer style={{ backgroundColor: '#f8f8f8' }} className="border-t border-gray-200">

      {/* Main footer area */}
      <div style={{ backgroundColor: '#f1f1f1' }} className="border-b border-gray-200">
        <div className="section-width py-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">

            {/* Left: Logo + tagline */}
            <div className="flex flex-col items-start gap-3 min-w-0">
              <Image
                src="/logo-aventurin.webp"
                alt={t.logoAlt}
                width={280}
                height={114}
                className="h-14 w-auto block"
                style={{ maxWidth: '100%' }}
              />
              <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
                {t.tagline}
              </p>
            </div>

            {/* Right: links + address */}
            <div className="flex flex-col sm:flex-row gap-10 shrink-0">

              {/* Rechtliches */}
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.legalHeading}</p>
                <a
                  href="https://www.aventurin.at/impressum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors font-semibold"
                >
                  {t.imprint}
                </a>
                <a
                  href="https://www.aventurin.at/datenschutz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors font-semibold"
                >
                  {t.privacy}
                </a>
                <button
                  onClick={openCookieBanner}
                  className="text-gray-600 hover:text-black transition-colors text-left font-semibold"
                >
                  {t.cookieSettings}
                </button>
              </div>

              {/* Adresse */}
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{t.addressHeading}</p>
                <p className="text-gray-600 font-semibold leading-relaxed">
                  {t.addressLines.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < t.addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <p className="text-gray-500 text-xs mt-1">{t.hours}</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: '#f8f8f8' }}>
        <div className="section-width py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            {t.copyright(new Date().getFullYear())}
          </p>
          <p className="text-xs text-gray-400">
            {t.marketingBy}{' '}
            <a
              href="https://digitalisierungshilfe.at"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors font-semibold underline underline-offset-2"
            >
              Digitalisierungshilfe.at
            </a>
          </p>
        </div>
      </div>

    </footer>
  )
}
