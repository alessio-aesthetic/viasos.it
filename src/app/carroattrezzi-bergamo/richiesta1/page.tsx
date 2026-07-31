import type { Metadata } from 'next'
import { BresciaRequestClient } from '@/app/carroattrezzi-brescia/richiesta/BresciaRequestClient'

export const metadata: Metadata = {
  title: 'Richiesta Carroattrezzi Bergamo | ViaSOS',
  description: 'Richiedi un carroattrezzi a Bergamo con form guidato, posizione GPS e ricontatto rapido.',
  alternates: { canonical: '/carroattrezzi-bergamo/richiesta1' },
  robots: { index: true, follow: true },
}

export default function RichiestaBergamoUno() {
  return <BresciaRequestClient city="Bergamo" phone="035 068 3872" tel="+390350683872" pagePath="/carroattrezzi-bergamo/richiesta1" backHref="/" />
}
