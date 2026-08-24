import type { Metadata } from 'next'

import { BresciaRequestClient } from '@/app/carroattrezzi-brescia/richiesta/BresciaRequestClient'

const phone = '0523 192 0069'
const tel = '+3905231920069'
const title = 'Carroattrezzi Piacenza 24H | Soccorso Stradale Rapido'
const description =
  'Auto ferma a Piacenza? Compila il form guidato, invia la posizione e ricevi rapidamente il contatto del carroattrezzi disponibile.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/carroattrezzi-piacenza',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title,
    description,
    url: 'https://viasos.it/carroattrezzi-piacenza',
    siteName: 'ViaSOS',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function CarroattrezziPiacenzaPage() {
  return (
    <BresciaRequestClient
      city="Piacenza"
      phone={phone}
      tel={tel}
      pagePath="/carroattrezzi-piacenza"
      backHref="/"
      premiumLogo
    />
  )
}
