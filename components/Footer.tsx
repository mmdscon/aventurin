'use client'
import Image from 'next/image'

export default function Footer() {
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
                alt="Zahnarztpraxis AVENTURIN"
                width={280}
                height={114}
                className="h-14 w-auto block"
                style={{ maxWidth: '100%' }}
              />
              <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
                Ganzheitliche & ästhetische Zahnheilkunde am Graben, im Herzen der Wiener Innenstadt.
              </p>
            </div>

            {/* Right: links + address */}
            <div className="flex flex-col sm:flex-row gap-10 shrink-0">

              {/* Rechtliches */}
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Rechtliches</p>
                <a
                  href="https://www.aventurin.at/impressum/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors font-semibold"
                >
                  Impressum
                </a>
                <a
                  href="https://www.aventurin.at/datenschutz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black transition-colors font-semibold"
                >
                  Datenschutz
                </a>
                <button
                  onClick={openCookieBanner}
                  className="text-gray-600 hover:text-black transition-colors text-left font-semibold"
                >
                  Cookie-Einstellungen
                </button>
              </div>

              {/* Adresse */}
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ordination</p>
                <p className="text-gray-600 font-semibold leading-relaxed">
                  Zahnarztpraxis AVENTURIN<br />
                  Graben 31/11<br />
                  1010 Wien<br />
                  Österreich
                </p>
                <p className="text-gray-500 text-xs mt-1">Mo–Fr, 10:00–18:00 Uhr</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ backgroundColor: '#f8f8f8' }}>
        <div className="section-width py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Zahnarztpraxis AVENTURIN. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs text-gray-400">
            Marketing von{' '}
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
