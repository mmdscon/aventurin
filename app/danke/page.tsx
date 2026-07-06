'use client'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'
import { trackThankYouPageView, trackThankYouBackClick } from '@/lib/useAnalytics'

export default function DankePage() {
  useEffect(() => {
    trackThankYouPageView()
  }, [])

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="section-width text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#E3F7F2' }}
          >
            <CheckCircle size={40} style={{ color: '#00B893' }} />
          </div>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
          Vielen Dank!
        </h1>
        <p className="text-xl text-gray-600 mb-4 font-semibold leading-relaxed">
          Ihre Anfrage ist bei uns eingegangen.
        </p>
        <p className="text-gray-500 mb-10 leading-relaxed">
          Unser Team meldet sich in Kürze persönlich bei Ihnen. Wir freuen uns darauf, Sie auf Ihrem Weg zu einem strahlenden Lächeln zu begleiten.
        </p>
        <p className="font-bold mb-8 text-black">
          Das Team der Zahnarztpraxis AVENTURIN
        </p>
        <Link href="/" onClick={trackThankYouBackClick} className="btn-primary inline-flex">
          Zurück zur Startseite <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
