'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, User, Phone, Mail, CheckCircle, MapPin, Gift } from 'lucide-react'
import Image from 'next/image'
import {
  trackQuizStart,
  trackQuizQ1,
  trackQuizQ2,
  trackQuizFormView,
  trackQuizSubmit,
} from '@/lib/useAnalytics'
import { useLocale } from '@/lib/i18n/useLocale'
import { getDictionary } from '@/lib/i18n/dictionaries'

type Step = 'q1' | 'q2' | 'loading' | 'form'

interface QuizProps {
  variant?: 'dark' | 'light'
}

export default function Quiz({ variant = 'light' }: QuizProps) {
  const router = useRouter()
  const locale = useLocale()
  const t = getDictionary(locale).quiz
  const [step, setStep] = useState<Step>('q1')
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loadingDots, setLoadingDots] = useState(0)

  const isDark = variant === 'dark'

  const selectQ1 = (val: string) => {
    if (!q1) trackQuizStart(variant)
    trackQuizQ1(val)
    setQ1(val)
    setStep('q2')
  }

  const selectQ2 = (val: string) => {
    trackQuizQ2(val)
    setQ2(val)
    setStep('loading')
    let count = 0
    const interval = setInterval(() => {
      count++
      setLoadingDots(count % 4)
      if (count >= 8) {
        clearInterval(interval)
        trackQuizFormView()
        setStep('form')
      }
    }, 250)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      trackQuizSubmit(q1, q2)
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q1, q2, name, phone, email, locale }),
      })
      router.push(`/${locale}/danke`)
    } catch {
      setSubmitting(false)
    }
  }

  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subTextClass = isDark ? 'text-white/70' : 'text-gray-500'
  const accentColor = '#00B893'

  // Shared gradient card – used for Q1
  const GradientCard = ({
    label, sub, onClick,
  }: { label: string; sub: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="aspect-square flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
      style={{ background: 'linear-gradient(135deg, #049174 0%, #00B893 100%)' }}
    >
      <span className="text-xl md:text-2xl font-extrabold text-white leading-tight text-center px-2">{label}</span>
      <span className="text-xs font-semibold text-white/80 text-center px-2">{sub}</span>
    </button>
  )

  // Längliche, gestapelte Antwort-Buttons – für Q2 (Terminwunsch)
  const ListOption = ({
    label, onClick,
  }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-white cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
      style={{ background: 'linear-gradient(135deg, #049174 0%, #00B893 100%)' }}
    >
      <span>{label}</span>
      <ArrowRight size={18} className="flex-shrink-0" />
    </button>
  )

  return (
    <div className="w-full">

      {/* ── Frage 1 ── */}
      {step === 'q1' && (
        <div className="text-center">
          <h3 className={`font-display text-2xl md:text-3xl font-semibold mb-2 ${textClass}`}>
            {t.q1.heading}
          </h3>
          <p className={`mb-8 ${subTextClass}`}>{t.q1.hint}</p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {t.q1.options.map(({ label, sub, value }) => (
              <GradientCard key={value} label={label} sub={sub} onClick={() => selectQ1(value)} />
            ))}
          </div>
        </div>
      )}

      {/* ── Frage 2 – längliche, gestapelte Optionen ── */}
      {step === 'q2' && (
        <div className="text-center">
          <h3 className={`font-display text-2xl md:text-3xl font-semibold mb-2 ${textClass}`}>
            {t.q2.heading}
          </h3>
          <p className={`mb-8 ${subTextClass}`}>{t.q2.hint}</p>
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            {t.q2.options.map(({ label, value }) => (
              <ListOption key={value} label={label} onClick={() => selectQ2(value)} />
            ))}
          </div>
        </div>
      )}

      {/* ── Ladeanimation ── */}
      {step === 'loading' && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative w-24 h-24 mb-8">
            <svg viewBox="0 0 96 96" className="w-full h-full animate-[spin_2s_linear_infinite]">
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(0,184,147,0.2)" strokeWidth="6" />
              <circle cx="48" cy="48" r="40" fill="none"
                stroke={accentColor} strokeWidth="6"
                strokeDasharray="251" strokeDashoffset="63" strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle size={28} style={{ color: accentColor }} />
            </div>
          </div>
          <p className={`text-xl font-bold mb-2 ${textClass}`}>{t.loading.title}</p>
          <p className={`text-sm ${subTextClass}`}>
            {t.loading.subtitle}{'·'.repeat(loadingDots + 1)}
          </p>
          <div className="mt-6 flex gap-2 justify-center">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i <= loadingDots ? accentColor : '#e5e7eb',
                  transform: i <= loadingDots ? 'scale(1.25)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Formular ── */}
      {step === 'form' && (
        <div className="text-center max-w-md mx-auto">
          <h3 className={`font-display text-2xl md:text-3xl font-semibold mb-2 ${textClass}`}>
            {t.form.heading}
          </h3>
          <p className={`mb-8 ${subTextClass}`}>
            {t.form.subtitle}
          </p>

          {/* Trust-Block mit Portrait */}
          <div className="flex flex-col items-center gap-3 mb-8 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image src="/images/ingrid-nemeth.webp" alt={t.form.trustImageAlt} fill className="object-contain" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm text-gray-900">{t.form.trustName}</p>
              <p className="text-xs text-gray-500">{t.form.trustRole}</p>
            </div>
            <p className="text-sm text-gray-600 font-semibold leading-relaxed text-center">
              {t.form.trustText}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: 'rgba(188,145,89,0.15)', color: '#8a6a3f' }}
              >
                <Gift size={13} />
                {t.form.badgeFree}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-full">
                <MapPin size={13} />
                {t.form.badgeLocation}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="relative">
              <User size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder={t.form.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-colors
                  ${isDark
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#00B893]'
                  }`}
              />
            </div>
            <div className="relative">
              <Phone size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
              <input
                type="tel"
                placeholder={t.form.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-colors
                  ${isDark
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#00B893]'
                  }`}
              />
            </div>
            <div className="relative">
              <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
              <input
                type="email"
                placeholder={t.form.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-colors
                  ${isDark
                    ? 'bg-white/10 border-white/20 text-white placeholder-white/40 focus:border-white'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#00B893]'
                  }`}
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 py-4 font-extrabold text-base transition-all hover:scale-[1.02] disabled:opacity-60"
              style={{ backgroundColor: '#00B893', color: '#fff' }}
            >
              {submitting ? t.form.submitting : t.form.submit}
              {!submitting && <ArrowRight size={18} />}
            </button>
            <p className={`text-xs text-center ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
              {t.form.privacyNote}
            </p>
          </form>
        </div>
      )}
    </div>
  )
}
