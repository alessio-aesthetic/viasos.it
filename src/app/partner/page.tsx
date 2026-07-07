import type { Metadata } from 'next'

import { PartnerBadge, PartnerPanel, PartnerShell } from '@/components/viasos/partner-shell'
import { PartnerVisual } from '@/components/viasos/partner-visual'

export const metadata: Metadata = {
  title: 'Area Partner Carroattrezzi',
  description:
    'Registrazione ViaSOS per carroattrezzi: richieste, regole semplici, commissione fissa e pagamenti.',
  robots: {
    index: false,
    follow: false,
  },
}

const steps = [
  {
    title: 'Ti registri',
    visual: 'network' as const,
    text: 'Inserisci i dati principali: nome, numero WhatsApp, città, zona di partenza e raggio in cui puoi lavorare.',
  },
  {
    title: 'Ti attiviamo noi',
    visual: 'search' as const,
    text: 'Controlliamo la richiesta e, se va bene, ti attiviamo. Da quel momento puoi ricevere richieste nella tua zona.',
  },
  {
    title: 'Ricevi la richiesta',
    visual: 'whatsapp' as const,
    text: 'Quando arriva un cliente vicino a te, ricevi un messaggio WhatsApp. Puoi dire subito se sei disponibile oppure no.',
  },
  {
    title: 'Richiami il cliente',
    visual: 'position' as const,
    text: 'Se accetti, ricevi il numero del cliente e le informazioni disponibili. Lo richiami dal tuo telefono e gestisci tu il servizio.',
  },
  {
    title: 'Segni com’è andata',
    visual: 'service' as const,
    text: 'Dopo aver parlato con il cliente scegli una risposta: accettato, non accettato, ha trovato altro o cercava un altro servizio.',
  },
  {
    title: 'Paghi solo se lavori',
    visual: 'payment' as const,
    text: 'La commissione è sempre 30 euro. La paghi solo se hai fatto il servizio e il cliente ha pagato direttamente te.',
  },
]

const rules = [
  'Rispondi subito quando ricevi una richiesta.',
  'Accetta solo se puoi chiamare il cliente in quel momento.',
  'Se non puoi andare, rifiuta subito. Così il cliente non aspetta inutilmente.',
  'Dopo la chiamata scegli sempre una risposta, anche se il cliente non accetta.',
  'Se il lavoro non viene fatto, non devi pagare la commissione.',
  'Se fai il servizio e il cliente ti paga, la commissione ViaSOS è di 30 euro.',
]

const scoreItems = [
  ['Risposte rapide', 'più rispondi velocemente, meglio lavori nel sistema.'],
  ['Lavori conclusi', 'se accetti e poi gestisci bene il cliente, il tuo profilo migliora.'],
  ['Pagamenti puntuali', 'pagare le commissioni dovute aiuta a mantenere alta la priorità.'],
]

export default function PartnerHome() {
  return (
    <PartnerShell>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-5xl text-left sm:text-center">
          <PartnerBadge>Per carroattrezzi</PartnerBadge>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Ricevi richieste nella tua zona. Paghi solo a lavoro fatto.
          </h1>
          <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-slate-600 sm:mx-auto sm:text-xl">
            ViaSOS ti manda clienti che cercano un carroattrezzi. Se sei libero
            accetti, richiami il cliente e gestisci il servizio. La commissione
            è chiara: 30 euro, solo dopo che hai lavorato e hai incassato.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <PartnerPanel key={step.title} className="p-5 sm:p-6">
              <PartnerVisual type={step.visual} />
              <div className="mt-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-[#e9fbf1] text-sm font-black text-[#075e54] ring-1 ring-emerald-200">
                  {index + 1}
                </span>
                <div className="mt-4">
                  <h2 className="text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                    {step.text}
                  </p>
                </div>
              </div>
            </PartnerPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <PartnerPanel className="overflow-hidden !bg-white p-0">
            <div className="grid gap-0 lg:grid-cols-[1fr_0.9fr]">
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">
                  Commissione chiara
                </p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                  30 euro solo dopo che il cliente ti ha pagato.
                </h2>
                <p className="mt-6 text-lg font-semibold leading-8 text-slate-600">
                  Non paghi prima. Non paghi per ricevere la richiesta. Non
                  paghi se il cliente non fa il servizio. La commissione parte
                  solo quando il lavoro è stato fatto e il cliente ha pagato te.
                </p>

                <div className="mt-8 grid gap-3">
                  <CommissionStep number="1" text="Accetti la richiesta." />
                  <CommissionStep number="2" text="Fai il servizio al cliente." />
                  <CommissionStep number="3" text="Il cliente paga direttamente te." />
                  <CommissionStep number="4" text="Solo a quel punto paghi 30 euro a ViaSOS." />
                </div>
              </div>
              <div className="border-t border-slate-200 bg-[#f8fbff] p-6 sm:p-8 lg:border-l lg:border-t-0">
                <PartnerVisual type="payment" size="large" />
                <div className="mt-6 rounded-[1.75rem] border border-emerald-200 bg-white p-6 shadow-sm shadow-emerald-950/5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">
                    Importo fisso
                  </p>
                  <p className="mt-2 text-6xl font-black tracking-tight text-slate-950">
                    30€
                  </p>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
                    Nessuna percentuale sul lavoro. Nessun anticipo. Nessun costo
                    se il servizio non viene fatto.
                  </p>
                </div>
              </div>
            </div>
          </PartnerPanel>

          <PartnerPanel className="p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">
              Regole semplici
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Cosa devi fare quando ricevi una richiesta.
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              Le regole servono solo a non far aspettare il cliente e a mandare
              le richieste ai carroattrezzi che rispondono davvero.
            </p>
            <div className="mt-7 grid gap-3">
              {rules.map((rule) => (
                <div
                  key={rule}
                  className="flex gap-4 rounded-[1.35rem] border border-slate-200 bg-[#fbfdff] p-4"
                >
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-[#e9fbf1] text-sm font-black text-[#075e54]">
                    ✓
                  </span>
                  <p className="text-base font-bold leading-7 text-slate-700">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </PartnerPanel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <PartnerPanel className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <PartnerBadge>Priorità richieste</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Chi lavora bene riceve più fiducia nel tempo.
              </h2>
              <p className="mt-6 text-lg font-semibold leading-8 text-slate-600">
                Nell’area personale vedi un punteggio indicativo. Serve a capire
                se stai rispondendo bene alle richieste e se il profilo è in
                ordine.
              </p>
              <div className="mt-7 grid gap-3">
                {scoreItems.map(([title, text]) => (
                  <div key={title} className="rounded-[1.35rem] bg-[#f8fbff] p-5">
                    <p className="text-lg font-black text-slate-950">{title}</p>
                    <p className="mt-2 text-base font-semibold leading-7 text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5">
              <PartnerVisual type="search" size="large" />
              <div className="mt-6 rounded-[1.5rem] bg-[#f8fbff] p-6">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">
                  Esempio
                </p>
                <p className="mt-3 text-5xl font-black tracking-tight text-slate-950">
                  87/100
                </p>
                <p className="mt-4 text-base font-semibold leading-7 text-slate-600">
                  Un punteggio alto significa: rispondi in fretta, richiami i
                  clienti, aggiorni l’esito e paghi le commissioni dovute.
                </p>
              </div>
            </div>
          </div>
        </PartnerPanel>
      </section>
    </PartnerShell>
  )
}

function CommissionStep({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/[0.03]">
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#25d366] text-sm font-black text-[#07111f]">
        {number}
      </span>
      <p className="text-base font-bold leading-7 text-slate-700">{text}</p>
    </div>
  )
}
