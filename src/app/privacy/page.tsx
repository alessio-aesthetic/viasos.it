import { LegalPage } from '@/components/viasos/legal-page'

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <p>
        Questa pagina descrive in modo sintetico come ViaSOS utilizza i dati
        inseriti dall’utente per preparare e inoltrare una richiesta di soccorso
        stradale. I dati possono includere telefono, tipo di veicolo, problema e
        posizione condivisa.
      </p>
      <p>
        I dati sono usati per consentire il contatto con carroattrezzi
        indipendenti compatibili con la richiesta. Per informazioni specifiche o
        aggiornamenti della policy puoi contattare ViaSOS.
      </p>
      <h2 className="text-2xl font-black text-[#07111f]">Ruolo di ViaSOS</h2>
      <p>
        ViaSOS opera esclusivamente come piattaforma di intermediazione: mette
        l’utente in contatto con diversi carroattrezzi indipendenti presenti
        nella rete e non esegue direttamente gli interventi di soccorso
        stradale.
      </p>
      <p>
        I dati necessari alla richiesta possono essere comunicati ai
        professionisti contattati per verificare disponibilità e compatibilità.
        Il carroattrezzi che accetta l’incarico agisce in autonomia ed è
        responsabile delle attività operative di propria competenza.
      </p>
    </LegalPage>
  )
}
