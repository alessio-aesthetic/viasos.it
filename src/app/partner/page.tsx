import type { Metadata } from 'next'

import { PartnerBadge, PartnerPanel, PartnerShell } from '@/components/viasos/partner-shell'
import { PartnerVisual } from '@/components/viasos/partner-visual'

export const metadata: Metadata = {
  title: 'Diventa partner ViaSOS | Richieste per carroattrezzi',
  description:
    'Entra nella rete ViaSOS: ricevi richieste nella tua zona, scegli prezzo e tempi e paghi solo dopo un servizio concluso e pagato.',
  robots: { index: false, follow: false },
}

const steps = [
  {
    title: 'Registrazione o trasferimento diretto',
    visual: 'network' as const,
    text: 'Puoi compilare la candidatura oppure ricevere direttamente una chiamata trasferita dal sistema quando sei il carroattrezzi disponibile per quella richiesta.',
  },
  {
    title: 'Attivazione del profilo',
    visual: 'search' as const,
    text: 'Verifichiamo i dati operativi e la zona in cui lavori, così le richieste vengono indirizzate verso mezzi realmente adatti e disponibili.',
  },
  {
    title: 'Ricevi una richiesta',
    visual: 'whatsapp' as const,
    text: 'Quando un cliente ha bisogno nella tua area, ricevi i dettagli sul canale concordato e puoi decidere subito se prendere in carico l’intervento.',
  },
  {
    title: 'Decidi tu come intervenire',
    visual: 'position' as const,
    text: 'Se accetti, richiami il cliente e stabilisci liberamente prezzo, tempi e modalità del servizio in base al mezzo e alla situazione.',
  },
  {
    title: 'Aggiorni l’esito',
    visual: 'service' as const,
    text: 'Dopo il contatto indichi semplicemente com’è andata. In questo modo il sistema mantiene aggiornate le richieste e il tuo profilo operativo.',
  },
  {
    title: 'Paghi solo a lavoro concluso',
    visual: 'payment' as const,
    text: 'La commissione fissa di 30 euro si applica solo se hai svolto il servizio e il cliente ti ha pagato direttamente.',
  },
]

const rules = [
  'Indica quando sei realmente disponibile.',
  'Richiama il cliente appena prendi in carico la richiesta.',
  'Concorda prezzo e tempistiche direttamente con il cliente.',
  'Aggiorna l’esito dopo il contatto o dopo l’intervento.',
]

const scoreItems = [
  ['Più controllo', 'Decidi quali richieste accettare e organizzi il lavoro secondo la tua disponibilità.'],
  ['Più chiarezza', 'Il cliente arriva con posizione e dettagli già raccolti, così la prima chiamata è concreta.'],
  ['Più opportunità', 'La rete lavora per portare nuove richieste nella zona in cui operi davvero.'],
]

export default function PartnerHome() {
  return (
    <PartnerShell>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-5xl text-left sm:text-center">
          <PartnerBadge>Per carroattrezzi</PartnerBadge>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Più richieste nella tua zona. Paghi solo quando il lavoro è concluso.
          </h1>
          <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-slate-600 sm:mx-auto sm:text-xl">
            ViaSOS sostiene direttamente il rischio delle sponsorizzate: per te il servizio è totalmente gratuito fino a quando non hai svolto l’intervento e ricevuto il pagamento dal cliente. <strong className="text-slate-950">Prezzo e tempistiche li decidi tu.</strong>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <PartnerPanel key={step.title} className="p-5 sm:p-6">
              <PartnerVisual type={step.visual} />
              <div className="mt-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-[#e9fbf1] text-sm font-black text-[#075e54] ring-1 ring-emerald-200">{index + 1}</span>
                <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">{step.title}</h2>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-600">{step.text}</p>
              </div>
            </PartnerPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <PartnerPanel className="overflow-hidden !bg-white p-0 text-center">
            <div className="p-6 sm:p-8 lg:p-12">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#075e54]">Modello economico</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">30 euro solo dopo che il cliente ti ha pagato.</h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-600">Il cliente paga direttamente te. Solo dopo un intervento concluso e incassato riconosci a ViaSOS la commissione fissa prevista.</p>
              <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left">
                <CommissionStep number="1" text="Prendi in carico la richiesta." />
                <CommissionStep number="2" text="Concordi prezzo e tempi con il cliente." />
                <CommissionStep number="3" text="Concludi il servizio e ricevi il pagamento." />
                <CommissionStep number="4" text="Versi 30 euro a ViaSOS solo in quel caso." />
              </div>
            </div>
          </PartnerPanel>

          {/*

            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">Nessun abbonamento e nessun anticipo: rispondi solo alle richieste compatibili con il tuo mezzo, la tua zona e la tua disponibilità.</p>
            <div className="mt-7 grid gap-3">
              {rules.map((rule) => (
                <div key={rule} className="flex gap-4 rounded-[1.35rem] border border-slate-200 bg-[#fbfdff] p-4">
                  <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-[#e9fbf1] text-sm font-black text-[#075e54]">✓</span>
                  <p className="text-base font-bold leading-7 text-slate-700">{rule}</p>
                </div>
              ))}
            </div>
          </PartnerPanel>
          */}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <PartnerPanel className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <PartnerBadge>Il tuo vantaggio</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Un canale in più per lavorare meglio.</h2>
              <p className="mt-6 text-lg font-semibold leading-8 text-slate-600">ViaSOS raccoglie la richiesta e ti lascia la parte più importante: valutare il lavoro, parlare con il cliente e gestire l’intervento secondo il tuo metodo.</p>
              <div className="mt-7 grid gap-3">
                {scoreItems.map(([title, text]) => (
                  <div key={title} className="rounded-[1.35rem] bg-[#f8fbff] p-5">
                    <p className="text-lg font-black text-slate-950">{title}</p>
                    <p className="mt-2 text-base font-semibold leading-7 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-[#07111f] p-8 text-white shadow-xl shadow-slate-950/10">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">In sintesi</p>
              <p className="mt-5 text-4xl font-black leading-tight tracking-tight">Più richieste. Più autonomia. Nessun costo prima del lavoro.</p>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-300">Entra nella rete, indica dove operi e scegli tu come organizzare ogni intervento.</p>
              <a href="/partner/registrazione/" className="mt-8 inline-flex rounded-full bg-[#25d366] px-6 py-4 text-base font-black text-[#07111f] transition hover:bg-[#55e888]">Candidati come partner</a>
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
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#25d366] text-sm font-black text-[#07111f]">{number}</span>
      <p className="text-base font-bold leading-7 text-slate-700">{text}</p>
    </div>
  )
}
