import type { Metadata } from 'next'
import PratoCall from './PratoCall'
import '../richiesta-brescia/brescia-call.css'

export const metadata: Metadata = {
  title: { absolute: 'Carroattrezzi Prato 24 ore | Chiama ora · ViaSOS' },
  description: 'Auto ferma a Prato? Chiama 0574 198 0036. Soccorso stradale 24 ore, contatto diretto e preventivo prima dell’uscita. Nessun modulo da compilare.',
  alternates: { canonical: '/richiesta-prato/' },
  openGraph: { title: 'Auto ferma a Prato? Chiama ViaSOS.', description: 'Contatto diretto. Preventivo prima dell’uscita. Soccorso stradale 24 ore.', url: 'https://viasos.it/richiesta-prato/' },
}

export default function Page() { return <PratoCall /> }
