'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useLocale } from '@/lib/i18n/useLocale'
import { getDictionary } from '@/lib/i18n/dictionaries'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const locale = useLocale()
  const t = getDictionary(locale).cookieBanner

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setTimeout(() => setVisible(true), 800)
    }
    const handler = () => setVisible(true)
    window.addEventListener('open-cookie-banner', handler)
    return () => window.removeEventListener('open-cookie-banner', handler)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'accepted' }))
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: 'declined' }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fade-in-up">
        <button
          onClick={decline}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="mb-1">
          <span className="text-2xl">🍪</span>
        </div>
        <h3 className="text-lg font-extrabold text-gray-900 mb-2">
          {t.heading}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          {t.text}
        </p>
        <div className="flex gap-3 flex-col sm:flex-row">
          <button
            onClick={accept}
            className="btn-primary flex-1 justify-center"
          >
            {t.acceptAll}
          </button>
          <button
            onClick={decline}
            className="btn-outline flex-1 justify-center"
          >
            {t.onlyNecessary}
          </button>
        </div>
      </div>
    </div>
  )
}
