import type { Metadata } from 'next'
import BergamoCall from './BergamoCall'
import '../richiesta-brescia/brescia-call.css'
import './bergamo-call.css'

export const metadata: Metadata = {
  title: { absolute: 'Carroattrezzi Bergamo H24 | Chiama ViaSOS' },
  description: 'Soccorso stradale a Bergamo e provincia. Chiama 035 068 3839 per organizzare il recupero.',
  alternates: { canonical: 'https://viasos.it/richiesta-bergamo/' },
  robots: { index: false, follow: true },
}

export default function Page() {
  return <BergamoCall />
}
