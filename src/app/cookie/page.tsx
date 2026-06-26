import type { Metadata } from 'next'

import { LegalPage } from '@/components/viasos/legal-page'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description: 'Informativa sui cookie e sugli strumenti di tracciamento di ViaSOS.',
  robots: { index: false, follow: true },
}

export default function CookiePage() {
  return (
    <LegalPage title="Cookie policy">
      <p className="text-sm font-bold text-slate-500">
        Ultimo aggiornamento: 26 giugno 2026
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Cookie e strumenti analoghi</h2>
      <p>
        Cookie, localStorage e tecnologie simili possono essere utilizzati per
        assicurare il funzionamento del sito, ricordare preferenze e conservare
        temporaneamente parametri utili alla richiesta.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Strumenti tecnici</h2>
      <p>
        Gli strumenti strettamente necessari servono alla sicurezza, alla
        navigazione, al funzionamento dei moduli e alla conservazione delle
        preferenze. Non richiedono consenso quando sono indispensabili per il
        servizio richiesto dall’utente.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Misurazione e campagne</h2>
      <p>
        Alcune landing page possono conservare parametri come gclid e UTM per
        collegare una richiesta alla campagna di provenienza. Eventuali strumenti
        non tecnici di analytics o advertising devono essere attivati soltanto
        dopo il consenso, quando richiesto.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Durata</h2>
      <p>
        La durata varia in base alla funzione dello strumento. Le preferenze
        tecniche possono restare nel browser fino alla loro scadenza o
        cancellazione; i dati di campagna vengono conservati solo per il tempo
        necessario alla misurazione e alla gestione della richiesta.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Come gestire le preferenze</h2>
      <p>
        Puoi rifiutare gli strumenti non necessari dal banner, quando presente,
        oppure eliminare cookie e dati locali dalle impostazioni del browser. La
        disattivazione non impedisce l’utilizzo delle funzioni essenziali.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Contatti</h2>
      <p>
        Per informazioni scrivi a{' '}
        <a className="font-bold text-[#075e54] underline" href="mailto:info@viasos.it">
          info@viasos.it
        </a>.
      </p>
    </LegalPage>
  )
}
