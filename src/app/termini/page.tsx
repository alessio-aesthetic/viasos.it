import { LegalPage } from '@/components/viasos/legal-page'

export default function TermsPage() {
  return (
    <LegalPage title="Termini e condizioni">
      <h2 className="text-2xl font-black text-[#07111f]">
        Servizio di intermediazione
      </h2>
      <p>
        ViaSOS è una piattaforma di collegamento tra utenti e diversi
        carroattrezzi indipendenti. Non opera come singolo carroattrezzi e non
        esegue direttamente traino, recupero, riparazione o trasporto.
      </p>
      <h2 className="text-2xl font-black text-[#07111f]">
        Responsabilità dell’intervento
      </h2>
      <p>
        L’intervento, i tempi, il preventivo e le condizioni operative sono
        comunicati e gestiti dal professionista incaricato.
      </p>
      <p>
        L’uso del sito non garantisce disponibilità immediata in ogni area o in
        ogni momento. La ricerca dipende dalla copertura e dai carroattrezzi
        compatibili presenti nella rete.
      </p>
      <p>
        Preventivo, accettazione, custodia del veicolo, modalità di recupero,
        trasporto ed esecuzione del servizio restano sotto la responsabilità
        professionale del carroattrezzi incaricato. Nei limiti consentiti dalla
        legge, ViaSOS non risponde di ritardi, danni o inadempimenti direttamente
        riconducibili al professionista indipendente che svolge l’intervento.
      </p>
    </LegalPage>
  )
}
