import type { Metadata } from 'next'

import { BresciaLandingClient } from './BresciaLandingClient'

const phone = '030 204 1794'
const tel = '+390302041794'
const title = 'Carroattrezzi Brescia 24H | Soccorso Stradale Rapido'
const description =
  'Auto ferma a Brescia? Chiama subito o invia la posizione: ViaSOS cerca rapidamente il carroattrezzi disponibile più vicino.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/carroattrezzi-brescia',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: 'https://viasos.it/carroattrezzi-brescia',
    siteName: 'ViaSOS',
    locale: 'it_IT',
    type: 'website',
  },
}

function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    name: 'ViaSOS Carroattrezzi Brescia',
    url: 'https://viasos.it/carroattrezzi-brescia',
    telephone: tel,
    areaServed: ['Brescia', 'Brescia e provincia'],
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
        name: 'Come richiedo un carroattrezzi a Brescia?',
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
        name: 'Il servizio copre anche la provincia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La richiesta può essere gestita su Brescia e nelle zone vicine, in base alla disponibilità operativa.',
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

export default function CarroattrezziBresciaPage() {
  return (
    <>
      <JsonLd />
      <BresciaLandingClient phone={phone} tel={tel} />
    </>
  )
}
