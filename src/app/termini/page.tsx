import type { Metadata } from 'next'

import { LegalPage } from '@/components/viasos/legal-page'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Termini e condizioni',
  description: 'Termini di utilizzo del servizio di intermediazione ViaSOS.',
  robots: { index: false, follow: true },
}

export default function TermsPage() {
  return (
    <LegalPage title="Termini e condizioni">
      <p className="text-sm font-bold text-slate-500">
        Ultimo aggiornamento: 26 giugno 2026
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Oggetto del servizio</h2>
      <p>
        {site.name} consente all’utente di inviare una richiesta e la inoltra a
        uno o più carroattrezzi indipendenti potenzialmente disponibili. ViaSOS
        non esegue direttamente attività di traino, recupero, riparazione,
        custodia o trasporto.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Funzionamento della ricerca</h2>
      <p>
        La piattaforma utilizza posizione e dettagli inseriti per contattare
        professionisti compatibili. Distanza, disponibilità e tempi sono
        indicativi e possono cambiare per traffico, condizioni della strada,
        caratteristiche del mezzo o risposta dei partner.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Dati forniti dall’utente</h2>
      <p>
        L’utente deve comunicare informazioni corrette e disporre del diritto di
        richiedere assistenza per il veicolo indicato. Richieste false, abusive o
        riferite a terzi senza autorizzazione possono essere rifiutate.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Preventivo e accettazione</h2>
      <p>
        L’invio del modulo non equivale a un contratto di soccorso e non obbliga
        l’utente ad accettare. Prezzo, diritto di chiamata, destinazione,
        eventuali supplementi e modalità del servizio devono essere concordati
        direttamente con il carroattrezzi prima dell’intervento.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Responsabilità del carroattrezzi</h2>
      <p>
        Il professionista incaricato è responsabile del mezzo utilizzato, della
        valutazione tecnica, della sicurezza, dei tempi comunicati, del recupero,
        della custodia, del trasporto e della corretta esecuzione. Reclami relativi
        all’intervento o al pagamento devono essere rivolti al professionista.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Limiti di responsabilità</h2>
      <p>
        Nei limiti consentiti dalla legge, ViaSOS non risponde di indisponibilità,
        ritardi, preventivi, condotte, danni o inadempimenti direttamente
        imputabili ai professionisti indipendenti. ViaSOS resta responsabile delle
        sole attività di intermediazione e trattamento dei dati di propria
        competenza.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Emergenze e legge applicabile</h2>
      <p>
        In presenza di feriti, pericoli immediati o ostacoli alla circolazione è
        necessario contattare i servizi pubblici di emergenza. I presenti termini
        sono regolati dalla legge italiana, fatti salvi i diritti inderogabili dei
        consumatori.
      </p>
    </LegalPage>
  )
}
