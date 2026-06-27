import type { Metadata } from 'next'

import { BresciaRequestClient } from '@/app/carroattrezzi-brescia/richiesta/BresciaRequestClient'

export const metadata: Metadata = {
  title: 'Richiesta Carroattrezzi Bologna | ViaSOS',
  description:
    'Richiedi un carroattrezzi a Bologna con un form rapido: condividi problema, veicolo, posizione GPS e telefono per essere ricontattato.',
  alternates: {
    canonical: '/richiesta-bologna',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RichiestaCarroattrezziBolognaPage() {
  return (
    <BresciaRequestClient
      city="Bologna"
      phone="051 091 3172"
      tel="+390510913172"
      pagePath="/richiesta-bologna"
      backHref="/"
      premiumLogo
    />
  )
}
