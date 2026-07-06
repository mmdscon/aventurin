/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

function gtag(...args: any[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

export function trackCtaClick(label: string, position: string) {
  gtag('event', 'cta_click', { event_label: label, position })
}

export function trackNavClick(label: string, target: string) {
  gtag('event', 'nav_click', { event_label: label, target })
}

export function trackMobileMenuOpen() {
  gtag('event', 'mobile_menu_open')
}

export function trackSectionView(section: string) {
  gtag('event', 'section_view', { section })
}

export function trackQuizStart(variant: string) {
  gtag('event', 'quiz_start', { variant })
}

export function trackQuizQ1(value: string) {
  gtag('event', 'quiz_q1', { answer: value })
}

export function trackQuizQ2(value: string) {
  gtag('event', 'quiz_q2', { answer: value })
}

export function trackQuizFormView() {
  gtag('event', 'quiz_form_view')
}

export function trackQuizSubmit(q1: string, q2: string) {
  gtag('event', 'quiz_submit', { q1, q2 })
}

export function trackThankYouPageView() {
  gtag('event', 'thank_you_page_view')
}

export function trackThankYouBackClick() {
  gtag('event', 'thank_you_back_click')
}
