import type { Metadata } from 'next'

import { PartnerBadge, PartnerPanel, PartnerShell } from '@/components/viasos/partner-shell'
import { PartnerVisual } from '@/components/viasos/partner-visual'

export const metadata: Metadata = {
  title: 'Diventa partner ViaSOS | Richieste per carroattrezzi',
  description:
    'Entra nella rete ViaSOS: ricevi richieste nella tua zona e paghi solo dopo un servizio concluso e incassato.',
  robots: { index: false, follow: false },
}

const steps = [
  {
    title: 'Ti registri e indichi dove lavori',
    highlight: 'Servono pochi dati essenziali.',
    text: 'Inserisci i dati della tua attività, il numero WhatsApp e la zona in cui puoi intervenire. Dopo il controllo del profilo puoi iniziare a ricevere richieste.',
    visual: 'network' as const,
  },
  {
    title: 'Ricevi una chiamata o un avviso',
    highlight: 'Tieni il telefono raggiungibile.',
    text: 'Quando arriva una richiesta nella tua zona, il sistema può collegarti direttamente al cliente oppure avvisarti di controllare WhatsApp.',
    visual: 'search' as const,
  },
  {
    title: 'Parli direttamente con il cliente',
    highlight: 'Non riattaccare quando rispondi.',
    text: 'Se la chiamata viene collegata, puoi capire subito il problema, la distanza, il tipo di mezzo e concordare prezzo e tempo di arrivo.',
    visual: 'whatsapp' as const,
  },
  {
    title: 'Comunichi com’è andata',
    highlight: 'Dopo la chiamata scegli una risposta.',
    text: 'Indichi se hai preso il servizio, se sei ancora in trattativa oppure se non lo hai preso. La risposta permette al sistema di proseguire correttamente.',
    visual: 'position' as const,
  },
  {
    title: 'Puoi inviare un preventivo',
    highlight: 'Prezzo e tempo di arrivo arrivano su WhatsApp.',
    text: 'Se il cliente chiede altre disponibilità, ricevi il suo vocale e un riepilogo. Inserisci il tuo prezzo e il tempo di arrivo: il numero viene condiviso solo se il cliente accetta.',
    visual: 'service' as const,
  },
  {
    title: 'Paghi solo dopo il lavoro',
    highlight: 'Nessun anticipo e nessun abbonamento.',
    text: 'La commissione fissa di 30 euro si applica soltanto quando hai svolto il servizio e hai ricevuto il pagamento dal cliente.',
    visual: 'payment' as const,
  },
]

const outcomes = [
  {
    title: 'Sì, preso',
    text: 'Hai concordato il servizio con il cliente. Il numero viene condiviso e la richiesta resta affidata a te.',
  },
  {
    title: 'In trattativa',
    text: 'State ancora decidendo prezzo o dettagli. Potrete contattarvi direttamente e, se concludi il lavoro, confermerai il servizio fatto.',
  },
  {
    title: 'Non preso',
    text: 'Non hai preso il servizio. Il cliente può chiedere altri preventivi senza dover chiamare uno per uno gli operatori della zona.',
  },
]

const benefits = [
  ['Richieste nella tua zona', 'Ricevi richieste collegate alla città e alla zona in cui operi.'],
  ['Decidi prima di accettare', 'Parli con il cliente e valuti liberamente se il lavoro è adatto a te.'],
  ['Nessun costo anticipato', 'Non paghi per ricevere la chiamata, per rispondere o per inviare un preventivo.'],
]

export default function PartnerHome() {
  return (
    <PartnerShell>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-5xl text-left sm:text-center">
          <PartnerBadge>Per carroattrezzi</PartnerBadge>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Ricevi richieste nella tua zona. Paghi solo sui lavori conclusi.
          </h1>
          <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-slate-600 sm:mx-auto sm:text-xl">
            ViaSOS trova clienti che hanno bisogno di soccorso stradale e li mette in contatto con i carroattrezzi disponibili. <strong className="text-slate-950">Non ci sono abbonamenti e non paghi prima di lavorare.</strong>
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
                <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-base font-semibold leading-7 text-slate-600">
                  <strong className="font-black text-slate-950">{step.highlight}</strong>{' '}
                  {step.text}
                </p>
              </div>
            </PartnerPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 lg:p-14">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Dopo aver parlato con il cliente</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
            Tre risposte semplici. Scegli quella vera.
          </h2>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
            La risposta serve a non creare doppioni e a non far contattare lo stesso cliente da più carroattrezzi.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {outcomes.map((outcome, index) => (
              <div key={outcome.title} className="rounded-[1.35rem] border border-slate-200 bg-[#f8fbff] p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#25d366] text-sm font-black text-[#07111f]">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-black text-slate-950">{outcome.title}</h3>
                </div>
                <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{outcome.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PartnerPanel className="overflow-hidden !bg-white p-0 text-left">
          <div className="p-6 sm:p-10 lg:p-14">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#075e54]">Come funziona il pagamento</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              30 euro soltanto dopo che hai svolto e incassato il servizio.
            </h2>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-600">
              <strong className="text-slate-950">Il cliente paga direttamente te.</strong> Quando il lavoro è terminato, confermi “Servizio fatto” e ricevi il collegamento per versare la commissione. Se il servizio non è stato svolto, non è dovuta.
            </p>
            <div className="mt-8 grid max-w-3xl gap-3">
              <CommissionStep number="1" text="Parli con il cliente e concordi il servizio." />
              <CommissionStep number="2" text="Svolgi l’intervento e il cliente paga direttamente te." />
              <CommissionStep number="3" text="Confermi su WhatsApp che il servizio è stato fatto." />
              <CommissionStep number="4" text="Ricevi il collegamento e versi la commissione fissa di 30 euro." />
            </div>
          </div>
        </PartnerPanel>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 pb-16 sm:px-6 lg:px-8">
        <PartnerPanel className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <PartnerBadge>In poche parole</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
                Più possibilità di lavoro, senza costi anticipati.
              </h2>
              <div className="mt-7 grid gap-3">
                {benefits.map(([title, text]) => (
                  <div key={title} className="rounded-[1.35rem] bg-[#f8fbff] p-5">
                    <p className="text-lg font-black text-slate-950">{title}</p>
                    <p className="mt-2 text-base font-semibold leading-7 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-[#07111f] p-8 text-white shadow-xl shadow-slate-950/10">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-emerald-300">Candidatura partner</p>
              <p className="mt-5 text-4xl font-black leading-tight tracking-tight">Indica la tua zona e renditi disponibile.</p>
              <p className="mt-5 text-base font-semibold leading-7 text-slate-300">
                La candidatura viene controllata prima dell’attivazione. Dopo l’approvazione potrai accedere alla tua area personale.
              </p>
              <a href="/partner/registrazione/" className="mt-8 inline-flex rounded-full bg-[#25d366] px-6 py-4 text-base font-black text-[#07111f] transition hover:bg-[#55e888]">
                Candidati come partner
              </a>
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
