import type { Metadata } from 'next'

import {
  PartnerBadge,
  PartnerPanel,
  PartnerShell,
  StatusPill,
} from '@/components/viasos/partner-shell'
import { PartnerVisual } from '@/components/viasos/partner-visual'

export const metadata: Metadata = {
  title: 'Area Partner Carroattrezzi',
  description:
    'Registrazione e dashboard ViaSOS per carroattrezzi partner: lead, regole operative, commissione fissa e pagamenti.',
  robots: {
    index: false,
    follow: false,
  },
}

const operatingSteps = [
  {
    title: 'Registrazione e verifica',
    visual: 'network' as const,
    text: 'Compili i dati essenziali della tua attività: referente, WhatsApp operativo, città, base di partenza, raggio di copertura e dati fiscali. Il profilo resta in verifica finché non viene controllato manualmente.',
  },
  {
    title: 'Attivazione nella rete',
    visual: 'search' as const,
    text: 'Quando il profilo viene approvato e attivato, ViaSOS può proporti richieste compatibili con la tua zona. Se non sei attivo, non ricevi lead.',
  },
  {
    title: 'Lead su WhatsApp',
    visual: 'whatsapp' as const,
    text: 'Quando arriva una richiesta, ricevi un messaggio WhatsApp con i dati disponibili e i pulsanti per rispondere rapidamente. Se sei disponibile, il lead viene assegnato a te.',
  },
  {
    title: 'Posizione e cliente',
    visual: 'position' as const,
    text: 'Il cliente può condividere posizione, zona e informazioni utili. Dopo l’assegnazione ricevi i dettagli necessari per richiamarlo subito dal tuo telefono.',
  },
  {
    title: 'Esito del servizio',
    visual: 'service' as const,
    text: 'Dopo aver parlato con il cliente indichi l’esito: accettato, non accettato, cliente già sistemato o richiesta non pertinente. Questa risposta mantiene il lead ordinato e protegge la qualità della rete.',
  },
  {
    title: 'Commissione e pagamento',
    visual: 'payment' as const,
    text: 'La commissione ViaSOS è fissa: 30 euro. Si paga solo dopo aver svolto il servizio e solo dopo che il cliente ha pagato direttamente te. Mai prima.',
  },
]

const qualityRules = [
  'Rispondi velocemente quando ricevi un lead: nelle emergenze anche pochi secondi fanno differenza.',
  'Accetta solo se puoi richiamare subito il cliente e gestire davvero la richiesta.',
  'Se non puoi intervenire, rifiuta subito: il sistema può cercare un altro carroattrezzi disponibile.',
  'Dopo la chiamata aggiorna sempre l’esito, così non partono solleciti inutili.',
  'Pagamenti puntuali, disponibilità reale e servizi chiusi correttamente migliorano il punteggio partner.',
  'Il profilo può essere sospeso se accetta lead senza richiamare i clienti o senza aggiornare l’esito.',
]

const scoreItems = [
  ['Disponibilità', 'quante volte rispondi “Sono disponibile” quando ricevi un lead compatibile.'],
  ['Completamento', 'quanti lead accettati vengono davvero gestiti fino all’esito finale.'],
  ['Pagamenti', 'quanto velocemente saldi le commissioni dovute dopo i servizi fatti.'],
]

export default function PartnerHome() {
  return (
    <PartnerShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center rounded-[2rem] bg-[#07111f] p-7 text-white shadow-2xl shadow-slate-950/15 sm:p-9 lg:p-10">
          <PartnerBadge>Portale partner ViaSOS</PartnerBadge>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Entra nella rete nazionale ViaSOS e ricevi richieste nella tua zona.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 font-semibold text-slate-300">
            ViaSOS collega clienti che hanno bisogno di soccorso stradale con
            carroattrezzi disponibili. Tu ricevi richieste operative, decidi se
            accettarle e paghi una commissione fissa solo sui servizi realmente
            svolti e incassati.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <HeroStat label="Commissione" value="30€" />
            <HeroStat label="Pagamento" value="solo dopo incasso" />
            <HeroStat label="Attivazione" value="manuale" />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/partner/registrazione/"
              className="inline-flex justify-center rounded-full bg-[#25d366] px-6 py-4 text-base font-black text-[#07111f] shadow-xl shadow-emerald-950/15"
            >
              Candidati come partner
            </a>
            <a
              href="/partner/login/"
              className="inline-flex justify-center rounded-full border border-white/15 bg-white/10 px-6 py-4 text-base font-black text-white"
            >
              Accedi alla dashboard
            </a>
          </div>
        </div>

        <PartnerPanel className="p-6 lg:p-8">
          <PartnerVisual type="network" size="large" />
          <p className="mt-6 text-sm font-black uppercase tracking-[0.18em] text-[#075e54]">
            modello operativo
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Una piattaforma chiara, controllata e misurabile.
          </h2>
          <p className="mt-4 text-base leading-7 font-semibold text-slate-600">
            Ogni partner ha una dashboard con stato profilo, lead ricevuti,
            pagamenti, punteggio e regole operative. L’obiettivo è lavorare con
            carroattrezzi rapidi, affidabili e trasparenti.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <StatusPill tone="green">lead qualificati</StatusPill>
            <StatusPill tone="neutral">dashboard partner</StatusPill>
            <StatusPill tone="yellow">approvazione manuale</StatusPill>
          </div>
        </PartnerPanel>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <PartnerBadge>Come funziona</PartnerBadge>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">
            Dal profilo partner al servizio concluso: tutto è tracciato.
          </h2>
          <p className="mt-5 text-lg leading-8 font-semibold text-slate-600">
            La procedura è pensata per evitare confusione: pochi passaggi,
            decisioni rapide e commissione chiara.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {operatingSteps.map((step, index) => (
            <PartnerPanel key={step.title} className="p-5">
              <PartnerVisual type={step.visual} />
              <div className="mt-5 flex items-start gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#07111f] text-sm font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 font-semibold text-slate-600">
                    {step.text}
                  </p>
                </div>
              </div>
            </PartnerPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <PartnerPanel className="overflow-hidden !border-[#132235] !bg-[#07111f] text-white shadow-2xl shadow-slate-950/15">
            <div className="grid min-h-full gap-0 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="p-7 lg:p-8">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#25d366]">
                  commissione trasparente
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">
                  Paghi 30 euro solo quando hai già incassato dal cliente.
                </h2>
                <p className="mt-5 text-lg leading-8 font-semibold text-slate-300">
                  ViaSOS non chiede anticipi, non trattiene percentuali e non ti
                  fa pagare prima di sapere com’è andato il servizio. La
                  commissione nasce solo dopo tre condizioni semplici.
                </p>
                <div className="mt-7 grid gap-3">
                  <CommissionPoint number="01" text="Hai accettato il lead." />
                  <CommissionPoint number="02" text="Hai svolto il servizio." />
                  <CommissionPoint
                    number="03"
                    text="Il cliente ha pagato direttamente te."
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between border-t border-white/10 bg-white/[0.04] p-7 lg:border-l lg:border-t-0 lg:p-8">
                <PartnerVisual type="payment" size="large" />
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-white/10 p-5">
                  <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-300">
                    importo fisso
                  </p>
                  <p className="mt-2 text-6xl font-black text-[#25d366]">30€</p>
                  <p className="mt-3 text-sm leading-6 font-semibold text-slate-300">
                    Nessuna percentuale sul lavoro. Nessun costo se il servizio
                    non viene fatto o se il cliente non ti paga.
                  </p>
                </div>
              </div>
            </div>
          </PartnerPanel>

          <PartnerPanel className="p-7 lg:p-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#075e54]">
              regole operative
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Poche regole, pensate per proteggere clienti e partner seri.
            </h2>
            <p className="mt-4 text-base leading-7 font-semibold text-slate-600">
              Il sistema premia chi risponde davvero, chi richiama subito e chi
              chiude correttamente l’esito del lead. Così i clienti ricevono un
              servizio rapido e i partner affidabili hanno più valore nella rete.
            </p>
            <div className="mt-6 grid gap-3">
              {qualityRules.map((rule) => (
                <div
                  key={rule}
                  className="group flex gap-4 rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/[0.03]"
                >
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-[#e9fbf1] text-sm font-black text-[#075e54]">
                    ✓
                  </span>
                  <p className="text-sm font-bold leading-6 text-slate-700">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </PartnerPanel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <PartnerPanel className="overflow-hidden p-0">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="p-7 lg:p-8">
              <PartnerBadge>Punteggio partner</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                La priorità cresce con affidabilità, velocità e pagamenti puntuali.
              </h2>
              <p className="mt-5 text-base leading-7 font-semibold text-slate-600">
                La dashboard mostra un punteggio indicativo da 1 a 100. Serve a
                capire quanto il partner è allineato agli standard ViaSOS e può
                influenzare la priorità di invio nel tempo.
              </p>
              <div className="mt-6 grid gap-3">
                {scoreItems.map(([title, text]) => (
                  <div key={title} className="rounded-[1.25rem] bg-slate-50 p-4">
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-sm leading-6 font-semibold text-slate-600">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#07111f] p-7 text-white lg:p-8">
              <PartnerVisual type="search" size="large" />
              <div className="mt-6 rounded-[1.5rem] bg-white/10 p-5">
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#25d366]">
                  dashboard
                </p>
                <p className="mt-3 text-5xl font-black">87/100</p>
                <p className="mt-3 text-sm leading-6 font-semibold text-slate-300">
                  Esempio di punteggio alto: risposte rapide, pochi lead lasciati
                  senza esito e pagamenti saldati senza reminder.
                </p>
              </div>
            </div>
          </div>
        </PartnerPanel>
      </section>
    </PartnerShell>
  )
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] bg-white/10 p-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </div>
  )
}

function CommissionPoint({ number, text }: { number: string; text: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[1.35rem] border border-white/10 bg-white/10 p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#25d366] text-sm font-black text-[#07111f]">
        {number}
      </span>
      <p className="text-sm font-bold leading-6 text-slate-200">{text}</p>
    </div>
  )
}
