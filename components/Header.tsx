'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, X, Menu } from 'lucide-react'
import { trackNavClick, trackMobileMenuOpen, trackCtaClick } from '@/lib/useAnalytics'

const navLinks = [
  { label: 'Bleaching', id: 'ueber-uns' },
  { label: 'Ablauf', id: 'leistungen' },
  { label: 'Bewertungen', id: 'bewertungen' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string, label: string) => {
    trackNavClick(label, id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const openMenu = () => {
    trackMobileMenuOpen()
    setMenuOpen(true)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="bg-white border-b border-gray-100 relative z-40">
        <div className="section-width py-4 flex items-center justify-between">
          <Image
            src="/logo-aventurin.webp"
            alt="Zahnarztpraxis AVENTURIN – Ganzheitliche Zahnpraxis"
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
            <button
              onClick={() => {
                trackCtaClick('Termin buchen', 'Header')
                scrollTo('quiz', 'Quiz')
              }}
              className="btn-primary text-sm"
            >
              Termin buchen <ArrowRight size={16} />
            </button>
          </nav>
          <button
            onClick={openMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Menü öffnen"
          >
            <Menu size={22} color="#111" />
          </button>
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
            <Image src="/logo-aventurin.webp" alt="Zahnarztpraxis AVENTURIN" width={280} height={114} className="h-12 w-auto" />
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <X size={20} color="#111" />
            </button>
          </div>
          <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id, label)}
                className="flex items-center gap-3 px-4 py-4 rounded-xl text-left text-gray-800 font-bold text-lg hover:bg-accent/10 transition-all group"
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
              Termin buchen <ArrowRight size={18} />
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">Unverbindlich · Kostenlos · Persönlich</p>
          </div>
        </div>
      </div>
    </>
  )
}
