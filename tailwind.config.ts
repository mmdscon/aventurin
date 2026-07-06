import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Aventurin brand palette
        accent: '#00B893',        // Türkis-Grün – Primärfarbe
        'accent-dark': '#049174', // dunkleres Türkis für Hover/Kontrast
        'accent-light': '#E3F7F2',// heller Türkis-Tint für Flächen/Badges
        gold: '#BC9159',          // Gold/Bronze – Sekundärakzent
        'gold-light': '#F0D093',  // Champagner – Gradient-Ende / Hover
        ink: '#2B2C2D',           // Fast-Schwarz für Headlines
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        display: ['var(--font-fraunces)', 'serif'],
        script: ['var(--font-caveat)', 'cursive'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ctaPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,184,147,0.5)' },
          '50%': { boxShadow: '0 0 0 14px rgba(0,184,147,0)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        fadeIn: 'fadeIn 0.5s ease forwards',
        ctaPulse: 'ctaPulse 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
