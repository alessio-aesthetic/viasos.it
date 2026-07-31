import type { Metadata } from 'next'
import { BresciaRequestClient } from '@/app/carroattrezzi-brescia/richiesta/BresciaRequestClient'

export const metadata: Metadata = {
  title: 'Richiesta Carroattrezzi Bergamo | ViaSOS',
  description: 'Richiedi un carroattrezzi a Bergamo con form guidato, posizione GPS e ricontatto rapido.',
  alternates: { canonical: '/carroattrezzi-bergamo/richiesta3' },
  robots: { index: true, follow: true },
}

export default function RichiestaBergamoTre() {
  return <BresciaRequestClient city="Bergamo" phone="035 068 3881" tel="+390350683881" pagePath="/carroattrezzi-bergamo/richiesta3" backHref="/" />
}
