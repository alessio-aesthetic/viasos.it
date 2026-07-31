import type { Metadata } from 'next'
import { BresciaRequestClient } from '@/app/carroattrezzi-brescia/richiesta/BresciaRequestClient'

export const metadata: Metadata = {
  title: 'Richiesta Carroattrezzi Bergamo | ViaSOS',
  description: 'Richiedi un carroattrezzi a Bergamo con form guidato, posizione GPS e ricontatto rapido.',
  alternates: { canonical: '/carroattrezzi-bergamo/richiesta2' },
  robots: { index: true, follow: true },
}

export default function RichiestaBergamoDue() {
  return <BresciaRequestClient city="Bergamo" phone="035 068 3877" tel="+390350683877" pagePath="/carroattrezzi-bergamo/richiesta2" backHref="/" />
}
