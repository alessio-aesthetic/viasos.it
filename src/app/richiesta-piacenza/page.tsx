import type { Metadata } from 'next'
import PiacenzaCall from './PiacenzaCall'
import '../richiesta-brescia/brescia-call.css'

export const metadata: Metadata = {
  title: { absolute: 'Carroattrezzi Piacenza 24 ore | Chiama ora · ViaSOS' },
  description: 'Auto ferma a Piacenza? Chiama 0523 192 0069. Soccorso stradale 24 ore, contatto diretto e preventivo prima dell’uscita. Nessun modulo da compilare.',
  alternates: { canonical: '/richiesta-piacenza/' },
  openGraph: { title: 'Auto ferma a Piacenza? Chiama ViaSOS.', description: 'Contatto diretto. Preventivo prima dell’uscita. Soccorso stradale 24 ore.', url: 'https://viasos.it/richiesta-piacenza/' },
}

export default function Page() { return <PiacenzaCall /> }
