import type { Metadata } from 'next'

import { LegalPage } from '@/components/viasos/legal-page'
import { site } from '@/data/site'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Informativa sul trattamento dei dati personali raccolti da ViaSOS.',
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy">
      <p className="text-sm font-bold text-slate-500">
        Ultimo aggiornamento: 26 giugno 2026
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Titolare del trattamento</h2>
      <p>
        Il titolare del trattamento è il gestore di {site.domain}, P. IVA{' '}
        {site.vatNumber}. Le richieste relative ai dati personali possono essere
        inviate a{' '}
        <a className="font-bold text-[#075e54] underline" href="mailto:info@viasos.it">
          info@viasos.it
        </a>.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Dati raccolti</h2>
      <p>
        Per gestire una richiesta di assistenza possiamo raccogliere numero di
        telefono, tipologia del veicolo, problema, carburante, eventuale presenza
        in autostrada, posizione GPS, link Google Maps e risposte fornite nel
        modulo. La geolocalizzazione viene acquisita soltanto dopo l’autorizzazione
        espressa nel browser.
      </p>
      <p>
        Il sito può inoltre trattare dati tecnici di navigazione, indirizzo IP,
        log di sicurezza, pagina di provenienza, gclid e parametri UTM.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Finalità del trattamento</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Ricevere, organizzare e inoltrare la richiesta di soccorso.</li>
        <li>Individuare i carroattrezzi indipendenti compatibili e disponibili.</li>
        <li>Consentire il contatto telefonico o tramite messaggistica.</li>
        <li>Proteggere la piattaforma, prevenire abusi e risolvere errori.</li>
        <li>Misurare le campagne solo quando ricorrono i presupposti richiesti.</li>
      </ul>
      <p>
        Le basi giuridiche sono le misure precontrattuali richieste dall’utente,
        il consenso quando necessario, gli obblighi di legge e il legittimo
        interesse alla sicurezza e al corretto funzionamento del servizio.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Ruolo di ViaSOS</h2>
      <p>
        ViaSOS è una piattaforma di intermediazione e non un singolo
        carroattrezzi. Le informazioni essenziali possono essere trasmesse a più
        professionisti indipendenti per verificare disponibilità, distanza e
        compatibilità. Il professionista che accetta l’incarico tratta i dati
        ricevuti sotto la propria responsabilità.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Fornitori e trasferimenti</h2>
      <p>
        I dati possono essere trattati da fornitori di hosting, automazione,
        database, telefonia e messaggistica strettamente necessari. Se un
        fornitore tratta dati fuori dallo Spazio Economico Europeo, vengono
        applicate le garanzie previste dalla normativa vigente.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Conservazione</h2>
      <p>
        I dati vengono conservati per il tempo necessario alla gestione della
        richiesta, agli obblighi applicabili e alla tutela in caso di
        contestazioni. I dati non necessari vengono eliminati o anonimizzati
        secondo tempi proporzionati alla finalità.
      </p>

      <h2 className="text-2xl font-black text-[#07111f]">Diritti</h2>
      <p>
        Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità
        e opposizione, nonché revocare il consenso. Resta possibile presentare
        reclamo al Garante per la protezione dei dati personali.
      </p>
    </LegalPage>
  )
}
