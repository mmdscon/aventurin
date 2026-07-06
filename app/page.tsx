'use client'
import { useEffect } from 'react'
import { ArrowRight, Star, MapPin, Phone, Mail, Clock } from 'lucide-react'
import Image from 'next/image'
import Quiz from '@/components/Quiz'
import { trackCtaClick, trackSectionView } from '@/lib/useAnalytics'

const reviews = [
  { text: 'Ich und meine Familie sind seit Jahren Patienten! Wir sind wirklich sehr zufrieden. Alle Ärzte/innen sind sehr, sehr einfühlsam. Sie nehmen einem die Angst vom Zahnarzt. Die Zahnarztpraxis kann ich nur wärmstens weiterempfehlen.', name: 'Brigitta Gögginger' },
  { text: 'Sehr gute Zahnarztpraxis. Ambiente ist sehr gut und man fühlt sich dementsprechend sehr wohl. Kaum Wartezeiten – sehr freundliches Personal – moderne Geräte – sehr sauber. Es wird für einen Zeit genommen und auf die Bedürfnisse des Patienten eingegangen. Kann man mit gutem Gewissen weiterempfehlen.', name: 'Natalia Idziak' },
  { text: 'Ausgezeichnete Praxis, kompetente Mitarbeiter und immer sehr freundlich! Technisch top ausgestattet, nie Wartezeiten! Kann man nur empfehlen, vor allem bei „Angst" vor dem Zahnarzt!', name: 'Andreas Honsak' },
  { text: 'Die Zahnärztin und das Personal sind sehr freundlich und der Service ist hervorragend. Ich würde auch beim nächsten Mal gerne wieder hierher kommen.', name: 'Masa' },
]

export default function HomePage() {
  const scrollToQuiz = (position: string) => {
    trackCtaClick('Termin buchen', position)
    document.getElementById('quiz')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const sections: { id: string; label: string }[] = [
      { id: 'quiz', label: 'Quiz' },
      { id: 'bewertungen', label: 'Bewertungen' },
    ]
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id, label }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { trackSectionView(label); obs.disconnect() } },
        { threshold: 0.2 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="py-8 md:py-12">
        <div className="section-width">
          <div className="relative w-full rounded-3xl overflow-hidden aspect-square md:aspect-[21/9]">
            <Image
              src="/images/bleaching-hero.webp"
              alt="Zahnarztpraxis AVENTURIN – Empfangsbereich am Graben, Wien"
              fill
              className="object-cover object-center"
              priority
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.65) 100%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8 md:pb-12 px-6 text-center">
              <h1 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight drop-shadow-md">
                Strahlend weiße Zähne.<br />Sichtbar nach nur einer Sitzung.
              </h1>
              <button
                onClick={() => scrollToQuiz('Hero')}
                className="mt-6 btn-primary animate-cta-pulse"
              >
                Jetzt Bleaching-Termin buchen <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBHEADLINE ── */}
      <section className="pt-2 pb-6">
        <div className="section-width text-center">
          <p className="font-display text-xl md:text-3xl font-semibold text-black">
            Ihr Spezialist für schonendes{' '}
            <span
              className="underline decoration-2 underline-offset-4"
              style={{ textDecorationColor: '#00B893' }}
            >
              In-Office Bleaching
            </span>
            .
          </p>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-6 border-y border-gray-100">
        <div className="section-width">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '8+', label: 'Zahntöne heller' },
              { number: '60', label: 'Minuten Behandlungszeit' },
              { number: '5★', label: 'Google Bewertung' },
              { number: '100%', label: 'Schmerzfrei' },
            ].map(({ number, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="font-display text-2xl md:text-3xl font-semibold" style={{ color: '#BC9159' }}>{number}</span>
                <span className="text-sm text-gray-500 font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section id="quiz" className="py-16 md:py-20 section-pop-shadow" style={{ backgroundColor: '#f9f9f9' }}>
        <div className="section-width">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <span
                className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-wider text-white"
                style={{ backgroundColor: '#00B893' }}
              >
                Kostenlose Ersteinschätzung
              </span>
              <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-gray-500 text-sm">Tippen Sie auf eine der Antwortoptionen, um mehr zu erfahren.</p>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="#00B893" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </div>
            <Quiz variant="light" />
          </div>
        </div>
      </section>

      {/* ── BEWERTUNGEN ── */}
      <section id="bewertungen" className="py-16 md:py-24 bg-white">
        <div className="section-width mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-4">
            Was unsere Patienten sagen
          </h2>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />)}
            <span className="text-gray-600 font-bold ml-2">5.0 / 5</span>
          </div>
        </div>
        <div className="section-width overflow-hidden">
          <div className="relative fade-mask">
            <div className="flex gap-5 animate-marquee w-max">
              {[...reviews, ...reviews].map((r, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 w-72 flex-shrink-0 shadow-sm">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f59e0b" color="#f59e0b" />)}
                    <span className="ml-2 text-xs text-gray-400 font-semibold flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      Google
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">„{r.text}"</p>
                  <p className="font-bold text-sm text-black">{r.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STANDORT ── */}
      <section id="standort" className="py-16 md:py-24 bg-white">
        <div className="section-width">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
            {/* Links (Desktop): Adresse & Text */}
            <div className="flex flex-col justify-center">
              <span
                className="inline-block text-xs font-bold px-4 py-1.5 mb-4 uppercase tracking-wider text-white w-fit"
                style={{ backgroundColor: '#00B893' }}
              >
                Zentral am Graben
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
                Mitten im 1. Bezirk, einfach zu erreichen
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Unsere Praxis liegt im Herzen der Wiener Innenstadt – direkt am Graben, umgeben von
                U-Bahn-Anbindungen, Parkmöglichkeiten und den schönsten Ecken der Stadt. Ideal, um
                Ihr Bleaching mit einem Spaziergang durch die Innenstadt zu verbinden.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-9 h-9 flex-shrink-0" style={{ backgroundColor: '#E3F7F2' }}>
                    <MapPin size={16} style={{ color: '#00B893' }} />
                  </span>
                  <p className="text-gray-700 font-semibold pt-1.5">
                    Graben 31/11, 1010 Wien, Österreich
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-9 h-9 flex-shrink-0" style={{ backgroundColor: '#E3F7F2' }}>
                    <Phone size={16} style={{ color: '#00B893' }} />
                  </span>
                  <a href="tel:+4315330303" className="text-gray-700 font-semibold pt-1.5 hover:text-black transition-colors">
                    +43 1 533 03 03
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-9 h-9 flex-shrink-0" style={{ backgroundColor: '#E3F7F2' }}>
                    <Mail size={16} style={{ color: '#00B893' }} />
                  </span>
                  <a href="mailto:hallo@aventurin.at" className="text-gray-700 font-semibold pt-1.5 hover:text-black transition-colors">
                    hallo@aventurin.at
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-9 h-9 flex-shrink-0" style={{ backgroundColor: '#E3F7F2' }}>
                    <Clock size={16} style={{ color: '#00B893' }} />
                  </span>
                  <p className="text-gray-700 font-semibold pt-1.5">
                    Mo–Fr, 10:00–18:00 Uhr
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => scrollToQuiz('Standort')} className="btn-primary w-fit">
                  Jetzt Bleaching-Termin buchen <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Rechts (Desktop): Google Maps */}
            <div className="overflow-hidden min-h-[320px] md:min-h-[420px] border border-gray-100 shadow-sm">
              <iframe
                title="Standort Zahnarztpraxis AVENTURIN am Graben, 1010 Wien"
                src="https://www.google.com/maps?q=Graben+31,+1010+Wien,+Austria&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-8 md:py-12">
        <div className="section-width">
          <div className="rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-3">
              {/* Bild */}
              <div className="relative min-h-[220px] md:min-h-0">
                <Image
                  src="/images/ctabild.jpg"
                  alt="Strahlendes Lächeln nach Bleaching"
                  fill
                  className="object-cover object-center"
                />
              </div>
              {/* Text – brand turquoise bg, weißer Text, weißer Button */}
              <div
                className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center"
                style={{ backgroundColor: '#00B893' }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                  Starten Sie heute Ihren Weg zu einem strahlenden Lächeln
                </h2>
                <p className="text-white/85 mb-8 font-semibold leading-relaxed max-w-lg">
                  Unser Team begleitet Sie ganzheitlich und einfühlsam – von der Erstberatung bis zum sichtbaren Ergebnis, ganz ohne Druck.
                </p>
                <button
                  onClick={() => scrollToQuiz('Final CTA')}
                  className="self-start inline-flex items-center gap-2 px-8 py-3.5 font-bold text-base transition-all hover:scale-[1.03]"
                  style={{ background: 'linear-gradient(135deg, #BC9159 0%, #F0D093 100%)', color: '#2B2C2D' }}
                >
                  Jetzt Bleaching-Termin buchen <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
