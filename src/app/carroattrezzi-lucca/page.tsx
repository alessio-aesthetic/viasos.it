import type { Metadata } from 'next'

import { BresciaRequestClient } from '@/app/carroattrezzi-brescia/richiesta/BresciaRequestClient'

const phone = '035 068 3881'
const tel = '+390350683881'
const title = 'Carroattrezzi Lucca 24H | Soccorso Stradale Rapido'
const description =
  'Auto ferma a Lucca? Compila il form guidato, invia la posizione e ricevi rapidamente il contatto del carroattrezzi disponibile.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/carroattrezzi-lucca' },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: 'https://viasos.it/carroattrezzi-lucca',
    siteName: 'ViaSOS',
    locale: 'it_IT',
    type: 'website',
  },
}

export default function CarroattrezziLuccaPage() {
  return (
    <BresciaRequestClient
      city="Lucca"
      phone={phone}
      tel={tel}
      pagePath="/carroattrezzi-lucca"
      backHref="/"
      premiumLogo
    />
  )
}
