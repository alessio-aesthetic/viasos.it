import type { Metadata } from 'next'
import BresciaCall from './BresciaCall'
import './brescia-call.css'

export const metadata: Metadata = {
  title: { absolute: 'Carroattrezzi Brescia 24 ore | Chiama ora · ViaSOS' },
  description: 'Auto ferma a Brescia? Chiama 030 204 1794. Soccorso stradale 24 ore, contatto diretto e preventivo prima dell’uscita. Nessun modulo da compilare.',
  alternates: { canonical: '/richiesta-brescia/' },
  openGraph: { title: 'Auto ferma a Brescia? Chiama ViaSOS.', description: 'Contatto diretto. Preventivo prima dell’uscita. Soccorso stradale 24 ore.', url: 'https://viasos.it/richiesta-brescia/' },
}

export default function Page() { return <BresciaCall /> }
