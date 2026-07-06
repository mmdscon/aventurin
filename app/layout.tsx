import type { Metadata } from 'next'
import { Poppins, Fraunces, Caveat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import MetaPixel from '@/components/MetaPixel'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

// Warme Serif-Display-Schrift für Headlines – Google-Font-Pendant zu Aventurins
// Custom-Headlinefont "vanbo" (kräftig, elegant, Boutique-Charakter).
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

// Lockere Handschrift für kleine Akzente – Google-Font-Pendant zu Aventurins
// Custom-Script-Font "Despeinada" (informeller Brush-Script).
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Bleaching bei Zahnarztpraxis AVENTURIN – Strahlend weiße Zähne in Wien',
  description: 'Professionelles In-Office Bleaching in unserer ganzheitlichen Zahnpraxis am Graben, 1010 Wien. Schonend, sicher und mit sichtbarem Ergebnis nach nur einer Sitzung.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${poppins.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body className="font-poppins">
        <GoogleAnalytics />
        <MetaPixel />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
