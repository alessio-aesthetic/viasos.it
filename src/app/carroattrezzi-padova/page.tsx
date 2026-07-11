import type { Metadata } from 'next'

import { BresciaLandingClient } from '../carroattrezzi-brescia/BresciaLandingClient'

const phone = '041 253 0637'
const tel = '+390412530637'
const title = 'Carroattrezzi Padova 24H | Soccorso Stradale Rapido'
const description =
  'Auto ferma a Padova? Chiama subito o invia la posizione: ViaSOS cerca rapidamente il carroattrezzi disponibile più vicino.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/carroattrezzi-padova',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: 'https://viasos.it/carroattrezzi-padova',
    siteName: 'ViaSOS',
    locale: 'it_IT',
    type: 'website',
  },
}

function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    name: 'ViaSOS Carroattrezzi Padova',
    url: 'https://viasos.it/carroattrezzi-padova',
    telephone: tel,
    areaServed: ['Padova', 'Padova e provincia'],
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$',
    description,
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Come richiedo un carroattrezzi a Padova?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puoi chiamare direttamente il numero indicato oppure compilare il form e condividere la posizione del veicolo.',
        },
      },
      {
        '@type': 'Question',
        name: 'Posso inviare la posizione GPS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì, il form usa la geolocalizzazione del browser per generare un link Google Maps utile al carroattrezzi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Il servizio copre Padova e provincia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La richiesta può essere gestita su Padova e nelle zone vicine, in base alla disponibilità operativa.',
        },
      },
    ],
  }

  return (
    <>
      {[localBusiness, faq].map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

export default function CarroattrezziPadovaPage() {
  return (
    <>
      <JsonLd />
      <BresciaLandingClient
        phone={phone}
        tel={tel}
        city="Padova"
        pagePath="/carroattrezzi-padova"
      />
    </>
  )
}
