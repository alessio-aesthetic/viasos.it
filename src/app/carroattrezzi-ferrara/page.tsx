import type { Metadata } from 'next'

import { BresciaRequestClient } from '../carroattrezzi-brescia/richiesta/BresciaRequestClient'

const phone = '0532 080 206'
const tel = '+390532080206'
const title = 'Carroattrezzi Ferrara 24H | Soccorso Stradale Rapido'
const description =
  'Auto ferma a Ferrara? Chiama subito o invia la posizione: ViaSOS individua rapidamente il carroattrezzi disponibile più vicino.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/carroattrezzi-ferrara' },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: 'https://viasos.it/carroattrezzi-ferrara',
    siteName: 'ViaSOS',
    locale: 'it_IT',
    type: 'website',
  },
}

function JsonLd() {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'AutomotiveBusiness'],
    name: 'ViaSOS Carroattrezzi Ferrara',
    url: 'https://viasos.it/carroattrezzi-ferrara',
    telephone: tel,
    areaServed: ['Ferrara', 'Ferrara e provincia'],
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$',
    description,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  )
}

export default function CarroattrezziFerraraPage() {
  return (
    <>
      <JsonLd />
      <BresciaRequestClient
        phone={phone}
        tel={tel}
        city="Ferrara"
        pagePath="/carroattrezzi-ferrara"
        backHref="/"
        premiumLogo
        proximityCopy="Con noi hai meno attesa e costi inferiori rispetto agli altri carroattrezzi. Ci troviamo attualmente a meno di 7 km da te."
      />
    </>
  )
}
