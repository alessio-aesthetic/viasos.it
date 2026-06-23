import type { Metadata } from 'next'

import { BresciaRequestClient } from './BresciaRequestClient'

export const metadata: Metadata = {
  title: 'Richiesta Carroattrezzi Brescia | ViaSOS',
  description:
    'Richiedi un carroattrezzi a Brescia con un form guidato: problema, veicolo, posizione e telefono per essere ricontattato rapidamente.',
  alternates: {
    canonical: '/carroattrezzi-brescia/richiesta',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RichiestaCarroattrezziBresciaPage() {
  return <BresciaRequestClient />
}
