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

const q1Options = [
  { label: 'Kaffee',   sub: '& Tee',      value: 'kaffee-tee' },
  { label: 'Rotwein',  sub: '& Rauchen',  value: 'rotwein-rauchen' },
  { label: 'Anlass',   sub: 'z. B. Hochzeit', value: 'anlass' },
  { label: 'Generell', sub: 'weißer lächeln', value: 'generell-weisser' },
]

const q2Options = [
  { label: 'So',   sub: 'bald wie möglich', value: 'sofort' },
  { label: '2–4',  sub: 'Wochen',  value: '2-4-wochen' },
  { label: '1–3',  sub: 'Monate',  value: '1-3-monate' },
  { label: 'Nur',  sub: 'informieren', value: 'nur-informieren' },
]

type Step = 'q1' | 'q2' | 'loading' | 'form'

interface QuizProps {
  variant?: 'dark' | 'light'
}

export default function Quiz({ variant = 'light' }: QuizProps) {
  const router = useRouter()
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
        body: JSON.stringify({ q1, q2, name, phone, email }),
      })
      router.push('/danke')
    } catch {
      setSubmitting(false)
    }
  }

  const textClass = isDark ? 'text-white' : 'text-gray-900'
  const subTextClass = isDark ? 'text-white/70' : 'text-gray-500'
  const accentColor = '#00B893'

  // Shared gradient card – used for both Q1 and Q2
  const GradientCard = ({
    label, sub, onClick,
  }: { label: string; sub: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all hover:scale-105 hover:shadow-lg"
      style={{ background: 'linear-gradient(135deg, #049174 0%, #00B893 100%)' }}
    >
      <span className="text-3xl md:text-4xl font-extrabold text-white leading-none">{label}</span>
      <span className="text-sm font-semibold text-white/80">{sub}</span>
    </button>
  )

  return (
    <div className="w-full">

      {/* ── Frage 1 ── */}
      {step === 'q1' && (
        <div className="text-center">
          <h3 className={`font-display text-2xl md:text-3xl font-semibold mb-2 ${textClass}`}>
            Was ist Ihnen bei Ihren Zähnen am wichtigsten?
          </h3>
          <p className={`mb-8 ${subTextClass}`}>Wählen Sie die zutreffendste Option.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {q1Options.map(({ label, sub, value }) => (
              <GradientCard key={value} label={label} sub={sub} onClick={() => selectQ1(value)} />
            ))}
          </div>
        </div>
      )}

      {/* ── Frage 2 – gleicher Gradient-Stil ── */}
      {step === 'q2' && (
        <div className="text-center">
          <h3 className={`font-display text-2xl md:text-3xl font-semibold mb-2 ${textClass}`}>
            Wann möchten Sie strahlend weiße Zähne haben?
          </h3>
          <p className={`mb-8 ${subTextClass}`}>Wählen Sie die zutreffendste Option.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {q2Options.map(({ label, sub, value }) => (
              <GradientCard key={value} label={label} sub={sub} onClick={() => selectQ2(value)} />
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
          <p className={`text-xl font-bold mb-2 ${textClass}`}>Ihre Angaben werden ausgewertet</p>
          <p className={`text-sm ${subTextClass}`}>
            Wir bereiten Ihre persönliche Beratung vor{'·'.repeat(loadingDots + 1)}
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
            Fast geschafft!
          </h3>
          <p className={`mb-8 ${subTextClass}`}>
            Sie sind einen Schritt von Ihrem persönlichen Beratungsgespräch entfernt.
          </p>

          {/* Trust-Block mit Portrait */}
          <div className="flex flex-col items-center gap-3 mb-8 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image src="/images/ingrid-nemeth.webp" alt="Ingrid Németh – Psychologin & Life Coach bei AVENTURIN" fill className="object-contain" />
            </div>
            <div className="text-center">
              <p className="font-bold text-sm text-gray-900">Ingrid Németh</p>
              <p className="text-xs text-gray-500">Psychologin &amp; Life Coach</p>
            </div>
            <p className="text-sm text-gray-600 font-semibold leading-relaxed text-center">
              Nach Ihrer Anfrage melden wir uns innerhalb von 24 Stunden persönlich bei Ihnen.
              Im Erstgespräch besprechen wir Ihre Wünsche, klären den Ablauf des Bleachings
              und erstellen gemeinsam einen individuellen Plan – ganz ohne Druck.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-1">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full"
                style={{ backgroundColor: 'rgba(188,145,89,0.15)', color: '#8a6a3f' }}
              >
                <Gift size={13} />
                Kostenlose Ersteinschätzung
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-bold px-4 py-2 rounded-full">
                <MapPin size={13} />
                Am Graben, 1010 Wien
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <div className="relative">
              <User size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-white/50' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Vor- und Nachname *"
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
                placeholder="Telefonnummer *"
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
                placeholder="E-Mail-Adresse *"
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
              className="mt-2 flex items-center justify-center gap-2 py-4 rounded-full font-extrabold text-base transition-all hover:scale-[1.02] disabled:opacity-60"
              style={{ backgroundColor: '#00B893', color: '#fff' }}
            >
              {submitting ? 'Wird gesendet…' : 'Bleaching-Termin kostenlos anfragen'}
              {!submitting && <ArrowRight size={18} />}
            </button>
            <p className={`text-xs text-center ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
              Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.
            </p>
          </form>
        </div>
      )}
    </div>
  )
}
