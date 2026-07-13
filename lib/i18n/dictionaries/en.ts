import type { Dictionary } from './de'

const en: Dictionary = {
  meta: {
    title: 'Teeth Whitening at Zahnarztpraxis AVENTURIN – Brilliantly White Teeth in Vienna',
    description:
      'Professional in-office teeth whitening at our holistic dental practice on Graben, 1010 Vienna. Gentle, safe, and with visible results after just one session.',
  },
  header: {
    logoAlt: 'Zahnarztpraxis AVENTURIN – Holistic Dental Practice',
    nav: [
      { label: 'Whitening', id: 'ueber-uns' },
      { label: 'Process', id: 'leistungen' },
      { label: 'Reviews', id: 'bewertungen' },
    ],
    cta: 'Book appointment',
    openMenu: 'Open menu',
    mobileFootnote: 'No obligation · Free · Personal',
    langLabel: 'Language',
  },
  home: {
    hero: {
      alt: 'Zahnarztpraxis AVENTURIN – reception area on Graben, Vienna',
      headline: 'Brilliantly white teeth.<br />Visible after just one session.',
      cta: 'Book your whitening appointment now',
    },
    subheadline: {
      pre: 'Your specialist for gentle ',
      highlight: "teeth whitening in Vienna's 1st district.",
    },
    trust: [
      { number: '8+', label: 'shades whiter' },
      { number: '60', label: 'minutes treatment time' },
      { number: '5★', label: 'Google rating' },
      { number: '100%', label: 'Pain-free' },
    ],
    quiz: {
      badge: 'Free initial assessment',
      hint: 'Tap one of the answer options to learn more.',
    },
    reviewsHeading: 'What our patients say',
    reviews: [
      {
        text: "My family and I have been patients for years! We're really very satisfied. All the doctors are incredibly caring and take away your fear of the dentist. I can warmly recommend this practice to anyone.",
        name: 'Brigitta Gögginger',
      },
      {
        text: 'A very good dental practice. The atmosphere is excellent and you really feel at ease. Hardly any waiting times, very friendly staff, modern equipment, very clean. They take their time and respond to the needs of each patient. I can recommend it with a clear conscience.',
        name: 'Natalia Idziak',
      },
      {
        text: 'Excellent practice, competent staff and always very friendly! Top technical equipment, never any waiting times! Highly recommended, especially if you have "fear" of the dentist!',
        name: 'Andreas Honsak',
      },
      {
        text: "The dentist and the staff are very friendly and the service is outstanding. I'd happily come back again next time.",
        name: 'Masa',
      },
    ],
    whyDifferent: {
      imageAlt: 'Satisfied patient of Zahnarztpraxis AVENTURIN',
      heading: '3 reasons why Aventurin is different',
      points: [
        'Specialist care for gentle oral hygiene &amp; whitening – based on the latest scientific standards.',
        'Your smile is unique – so should your oral hygiene &amp; teeth whitening be. Especially gentle in practice.',
        'Maximum results in minimal time, without sensitivity. Fast appointments &amp; online booking.',
      ],
      cta: 'Book your whitening appointment now',
    },
    location: {
      badge: 'Right on Graben',
      heading: 'In the heart of the 1st district, easy to reach',
      text: "Our practice is located in the heart of Vienna's city centre – right on Graben, surrounded by underground connections, parking options and some of the city's most beautiful corners. Perfect for combining your whitening treatment with a stroll through the city centre.",
      address: 'Graben 31/11, 1010 Vienna, Austria',
      hours: 'Mon–Fri, 10:00 AM–6:00 PM',
      cta: 'Book your whitening appointment now',
      mapTitle: 'Location of Zahnarztpraxis AVENTURIN on Graben, 1010 Vienna',
    },
    finalCta: {
      imageAlt: 'Radiant smile after whitening treatment',
      heading: 'Start your journey to a radiant smile today',
      text: 'Our team supports you holistically and with genuine care – from the first consultation to a visible result, with absolutely no pressure.',
      cta: 'Book your whitening appointment now',
    },
  },
  quiz: {
    q1: {
      heading: 'Ready for a brighter smile with no pain and no side effects?',
      hint: 'Choose an answer.',
      options: [
        { label: 'Yes', sub: "I'm ready", value: 'ja' },
        { label: 'Not sure', sub: 'just gathering information', value: 'unsicher' },
      ],
    },
    q2: {
      heading: 'When would you like to book an appointment?',
      hint: 'Choose the option that fits best.',
      options: [
        { label: 'As soon as possible', value: 'sofort' },
        { label: 'Within the next 4 weeks', value: '4-wochen' },
        { label: 'In the next 1 to 3 months', value: '1-3-monate' },
        { label: "I don't know yet", value: 'weiss-nicht' },
      ],
    },
    loading: {
      title: 'Analyzing your answers',
      subtitle: "We're preparing your personal consultation",
    },
    form: {
      heading: 'Almost done!',
      subtitle: "You're just one step away from your personal consultation.",
      trustName: 'Ingrid Németh',
      trustRole: 'Psychologist & Life Coach',
      trustImageAlt: 'Ingrid Németh – Psychologist & Life Coach at AVENTURIN',
      trustText:
        "After your request, we'll get in touch with you personally within 24 hours. In the first conversation, we'll discuss your wishes, explain the whitening process, and put together an individual plan together – with absolutely no pressure.",
      badgeFree: 'Free initial assessment',
      badgeLocation: 'On Graben, 1010 Vienna',
      namePlaceholder: 'First and last name *',
      phonePlaceholder: 'Phone number *',
      emailPlaceholder: 'Email address *',
      submitting: 'Sending…',
      submit: 'Request your free whitening appointment',
      privacyNote: 'By submitting, you agree to our privacy policy.',
    },
  },
  footer: {
    logoAlt: 'Zahnarztpraxis AVENTURIN',
    tagline: "Holistic & aesthetic dentistry on Graben, in the heart of Vienna's city centre.",
    legalHeading: 'Legal',
    imprint: 'Legal notice',
    privacy: 'Privacy policy',
    cookieSettings: 'Cookie settings',
    addressHeading: 'Practice',
    addressLines: ['Zahnarztpraxis AVENTURIN', 'Graben 31/11', '1010 Vienna', 'Austria'],
    hours: 'Mon–Fri, 10:00 AM–6:00 PM',
    copyright: (year: number) => `© ${year} Zahnarztpraxis AVENTURIN. All rights reserved.`,
    marketingBy: 'Marketing by',
  },
  cookieBanner: {
    heading: 'Cookie settings',
    text: 'We use cookies and similar technologies to improve your experience and optimize our services. This includes marketing cookies that help us show you relevant content.',
    acceptAll: 'Accept all',
    onlyNecessary: 'Necessary only',
  },
  danke: {
    heading: 'Thank you!',
    subheading: "We've received your request.",
    text: "Our team will personally get back to you shortly. We're looking forward to accompanying you on your journey to a radiant smile.",
    team: 'The team at Zahnarztpraxis AVENTURIN',
    back: 'Back to homepage',
  },
}

export default en
