import type { Metadata } from 'next'

import { PartnerBadge, PartnerPanel, PartnerShell } from '@/components/viasos/partner-shell'
import { PartnerVisual } from '@/components/viasos/partner-visual'

export const metadata: Metadata = {
  title: 'Come funziona ViaSOS per i carroattrezzi',
  description:
    'Scopri come ricevere richieste di soccorso stradale con ViaSOS: nessun abbonamento e 30 euro solo dopo un servizio svolto e incassato.',
  robots: { index: false, follow: false },
}

const flow = [
  {
    number: '01',
    title: 'Ti registri gratuitamente',
    text: 'Indichi il numero di telefono, la zona in cui lavori e pochi dati della tua attività. Controlliamo la richiesta e, dopo l’approvazione, il tuo profilo può iniziare a ricevere clienti.',
    note: 'Non devi installare programmi: utilizzi il telefono e WhatsApp che hai già.',
    visual: 'network' as const,
  },
  {
    number: '02',
    title: 'Arriva una richiesta nella tua zona',
    text: 'Il sistema seleziona i carroattrezzi adatti alla città e alla zona del cliente. In base alla configurazione del profilo, puoi ricevere direttamente la chiamata del cliente oppure una chiamata che ti avvisa di controllare WhatsApp.',
    note: 'Rispondi senza riattaccare: la chiamata può collegarti direttamente al cliente.',
    visual: 'search' as const,
  },
  {
    number: '03',
    title: 'Parli con il cliente e valuti il lavoro',
    text: 'Chiedi ciò che ti serve, controlli distanza e problema, comunichi il prezzo e il tempo di arrivo. Sei tu a decidere se il servizio è adatto e sei sempre tu a concordare il lavoro con il cliente.',
    note: 'Il cliente paga il servizio direttamente a te, con il metodo che concordate.',
    visual: 'whatsapp' as const,
  },
  {
    number: '04',
    title: 'Comunichi l’esito con una scelta',
    text: 'Dopo la conversazione indichi “Sì, preso”, “In trattativa” oppure “Non preso”. Puoi rispondere dalla chiamata guidata o dal messaggio WhatsApp ricevuto.',
    note: 'La risposta corretta evita doppioni e impedisce che lo stesso cliente venga affidato a più operatori.',
    visual: 'position' as const,
  },
  {
    number: '05',
    title: 'Svolgi il servizio',
    text: 'Se il lavoro è preso, il numero viene condiviso tra te e il cliente. Potete richiamarvi direttamente, concordare gli ultimi dettagli e gestire l’intervento senza passaggi inutili.',
    note: 'Quando hai concluso, confermi semplicemente se il servizio è stato fatto oppure no.',
    visual: 'service' as const,
  },
  {
    number: '06',
    title: 'Paghi soltanto dopo aver incassato',
    text: 'Solo se hai realmente svolto il servizio e il cliente ha pagato te, ricevi la richiesta per la commissione fissa di 30 euro. Il pagamento è semplice e ricevi la relativa fattura.',
    note: 'Se non svolgi il lavoro, la commissione non è dovuta.',
    visual: 'payment' as const,
  },
]

const outcomes = [
  {
    title: 'Sì, preso',
    text: 'Il cliente ha accettato. Il servizio viene affidato a te e i numeri di telefono vengono condivisi per permettervi di gestire direttamente l’intervento.',
  },
  {
    title: 'In trattativa',
    text: 'State ancora valutando prezzo o dettagli. Potete continuare a sentirvi; se il lavoro viene confermato, indicherai successivamente che il servizio è stato preso o svolto.',
  },
  {
    title: 'Non preso',
    text: 'Non hai concluso il servizio. Non paghi nulla e la richiesta può proseguire verso un’altra soluzione per il cliente.',
  },
]

const quoteSteps = [
  'Il cliente invia un breve vocale con la posizione e le informazioni disponibili.',
  'Ricevi l’avviso, il vocale e un riepilogo della richiesta.',
  'Decidi se vuoi ricevere il numero del cliente e provare a concludere il lavoro.',
  'Il numero viene condiviso solo quando accetti di occuparti della richiesta.',
]

const assurances = [
  ['Nessun abbonamento', 'Non esiste un costo mensile per restare nella rete.'],
  ['Nessun costo per rispondere', 'La chiamata, la valutazione e una richiesta non conclusa non generano commissioni.'],
  ['Cliente pagato direttamente a te', 'ViaSOS non incassa il prezzo del soccorso al posto tuo.'],
  ['30 euro fissi', 'La commissione non è una percentuale e nasce solo sul servizio realmente svolto e incassato.'],
]

export default function PartnerHome() {
  return (
    <PartnerShell>
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-5xl text-left sm:text-center">
            <PartnerBadge>Come funziona per il carroattrezzi</PartnerBadge>
            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Ricevi il cliente, decidi tu se prenderlo e paghi solo dopo il lavoro.
            </h1>
            <p className="mt-6 max-w-4xl text-lg font-semibold leading-8 text-slate-600 sm:mx-auto sm:text-xl">
              ViaSOS porta richieste di soccorso stradale ai carroattrezzi disponibili nella zona. Il funzionamento è semplice: <strong className="text-slate-950">parli con il cliente, scegli se accettare e gestisci direttamente il servizio.</strong>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a href="/partner/registrazione/" className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#25d366] px-7 py-4 text-base font-black text-[#07111f] transition hover:bg-[#55e888]">
                Candidati come partner
              </a>
              <a href="/partner/login/" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-4 text-base font-black text-slate-900 transition hover:border-slate-400">
                Accedi alla tua area
              </a>
            </div>
            <p className="mt-5 text-sm font-bold text-slate-500">Registrazione gratuita · Approvazione del profilo · Nessun abbonamento</p>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-px px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
            <Fact value="0 €" label="per registrarti e ricevere richieste" />
            <Fact value="30 €" label="solo sul servizio svolto e incassato" />
            <Fact value="Tu" label="decidi prezzo, disponibilità e intervento" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Il percorso completo</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">
              Dalla registrazione al pagamento, senza passaggi nascosti.
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">
              Ecco esattamente cosa succede quando entri nella rete e arriva una richiesta.
            </p>
          </div>

          <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {flow.map((step) => (
              <article key={step.number} className="grid gap-7 py-9 sm:py-12 lg:grid-cols-[100px_220px_1fr] lg:items-center lg:gap-10">
                <p className="text-3xl font-black text-[#075e54]">{step.number}</p>
                <PartnerVisual type={step.visual} />
                <div>
                  <h3 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">{step.title}</h3>
                  <p className="mt-4 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-lg sm:leading-8">{step.text}</p>
                  <p className="mt-4 border-l-4 border-[#25d366] pl-4 text-base font-black leading-7 text-slate-900">{step.note}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f3f8fb] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Dopo la conversazione</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Tre risposte, tre significati molto chiari.</h2>
              <p className="mt-5 text-lg font-semibold leading-8 text-slate-600">Rispondere richiede pochi secondi e permette al sistema di sapere cosa è successo davvero.</p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {outcomes.map((outcome, index) => (
                <div key={outcome.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
                  <span className="grid size-11 place-items-center rounded-2xl bg-[#e9fbf1] text-sm font-black text-[#075e54]">{index + 1}</span>
                  <h3 className="mt-5 text-2xl font-black text-slate-950">{outcome.title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-600">{outcome.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <PartnerBadge>Altre richieste disponibili</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Puoi ricevere anche clienti che stanno cercando un’altra soluzione.</h2>
              <p className="mt-6 text-lg font-semibold leading-8 text-slate-600">
                Quando una prima trattativa non si chiude, il cliente può chiedere disponibilità agli altri carroattrezzi della zona. Tu ricevi le informazioni e <strong className="text-slate-950">decidi liberamente se provare a prendere il servizio.</strong>
              </p>
            </div>
            <PartnerPanel className="p-6 sm:p-8">
              <div className="grid gap-5">
                {quoteSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 border-b border-slate-200 pb-5 last:border-0 last:pb-0">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#25d366] text-sm font-black text-[#07111f]">{index + 1}</span>
                    <p className="text-base font-bold leading-7 text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </PartnerPanel>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Commissione semplice</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Prima lavori e incassi. Solo dopo paghi 30 euro.</h2>
              <p className="mt-6 text-lg font-semibold leading-8 text-slate-600">
                Il cliente paga direttamente il carroattrezzi. ViaSOS non chiede anticipi e non trattiene percentuali sul prezzo del servizio.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {assurances.map(([title, text]) => (
                <div key={title} className="border-l-4 border-[#25d366] py-2 pl-5">
                  <h3 className="text-xl font-black text-slate-950">{title}</h3>
                  <p className="mt-2 text-base font-semibold leading-7 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 rounded-[1.5rem] bg-[#e9fbf1] p-6 sm:p-8">
              <p className="text-lg font-black text-[#075e54]">Esempio semplice</p>
              <p className="mt-3 max-w-4xl text-lg font-bold leading-8 text-slate-800">
                Ricevi una richiesta, concordi il lavoro, svolgi il soccorso e il cliente paga te. Confermi “Servizio fatto” e versi 30 euro. Se il cliente non accetta o il servizio non viene svolto, non devi pagare la commissione.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <PartnerBadge>La tua area personale</PartnerBadge>
              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Controlli tutto senza aprire fogli o programmi complicati.</h2>
              <p className="mt-6 text-lg font-semibold leading-8 text-slate-600">
                Dopo l’approvazione accedi alla dashboard partner per vedere lo stato del profilo, le richieste ricevute, gli esiti comunicati, i pagamenti e il tuo andamento.
              </p>
            </div>
            <div className="grid gap-4">
              <SimpleRow title="Richieste ricevute" text="Vedi i contatti e lo stato dei servizi gestiti." />
              <SimpleRow title="Pagamenti" text="Controlli quali commissioni risultano dovute o già pagate." />
              <SimpleRow title="Punteggio operativo" text="Vedi la qualità delle risposte e dei servizi conclusi nel tempo." />
              <SimpleRow title="Dati del profilo" text="Mantieni aggiornate zona, disponibilità e informazioni dell’attività." />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-emerald-200 bg-[#e9fbf1] px-6 py-10 text-center sm:px-10 sm:py-14">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Inizia dalla tua zona</p>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl">Registrati, fatti approvare e ricevi le richieste adatte alla tua attività.</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-600">Compili la candidatura una volta sola. Dopo il controllo del profilo potrai accedere alla tua area personale e iniziare a lavorare con il sistema.</p>
            <a href="/partner/registrazione/" className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[#075e54] px-8 py-4 text-base font-black text-white transition hover:bg-[#064e46]">Candidati come partner</a>
          </div>
        </section>
      </main>
    </PartnerShell>
  )
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 py-5 text-center sm:border-r sm:border-slate-200 sm:last:border-0">
      <p className="text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{label}</p>
    </div>
  )
}

function SimpleRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-b border-slate-200 pb-5 last:border-0">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-base font-semibold leading-7 text-slate-600">{text}</p>
    </div>
  )
}
