import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

import { faqs, services } from '@/data/site'
import { FaqAccordion } from './faq-accordion'

const steps = [
  {
    title: 'Invia la posizione',
    image: '/images/micro/step-position.webp',
    text: 'Compila il breve modulo e condividi la posizione del veicolo, anche senza conoscere l’indirizzo esatto.',
  },
  {
    title: 'Avviamo la ricerca',
    image: '/images/micro/step-search.webp',
    text: 'Il sistema individua i partner presenti nei dintorni e parte dal carroattrezzi potenzialmente più vicino.',
  },
  {
    title: 'Verifichiamo la disponibilità',
    image: '/images/micro/step-availability.webp',
    text: 'Se il primo carroattrezzi non risponde o non può intervenire, la richiesta passa automaticamente al successivo.',
  },
  {
    title: 'Ricevi la conferma',
    image: '/images/micro/step-confirm.webp',
    text: 'Il carroattrezzi disponibile riceve i dati e può contattarti direttamente tramite telefono o WhatsApp.',
  },
]

const oldWay = [
  'Cerchi diversi numeri su Google',
  'Chiami un carroattrezzi alla volta',
  'Ripeti ogni volta posizione e problema',
  'Molti non rispondono o sono già impegnati',
  'Non sai quale sia realmente il più vicino',
]

const newWay = [
  'Inoltri una sola richiesta',
  'Condividi una volta sola la posizione',
  'Il sistema parte dai carroattrezzi più vicini',
  'La ricerca continua fino a trovare disponibilità',
  'Ricevi il riscontro direttamente su WhatsApp',
]

export function ImpactBand() {
  return (
    <section className="bg-[#07111f] py-14 text-white">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-2xl font-black tracking-tight sm:text-4xl">
          Non cercare il carroattrezzi. Lascia che sia il carroattrezzi più
          vicino a trovare te.
        </p>
        <p className="mt-5 text-lg font-semibold text-slate-300">
          ViaSOS sostituisce numerose telefonate con una sola richiesta.
        </p>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section id="come-funziona" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#075e54]">
          come funziona
        </p>
        <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
          Dalla posizione al soccorso in quattro semplici passaggi
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <Image
                  src={step.image}
                  alt=""
                  width={160}
                  height={160}
                  className="size-24 object-contain"
                  loading="lazy"
                />
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#07111f] text-base font-black text-white">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-black text-[#07111f]">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-700">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Comparison() {
  return (
    <section id="perché-viasos" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#075e54]">
            perché funziona meglio
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
            Una richiesta fatta bene vale più di dieci telefonate a vuoto
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            ViaSOS nasce per ridurre confusione, attesa e tentativi inutili:
            raccoglie i dati essenziali una sola volta e li prepara in modo
            chiaro per i carroattrezzi compatibili.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative flex h-full flex-col rounded-[2.5rem] border border-white bg-white p-8 shadow-[0_34px_90px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-slate-200/70">
            <div className="absolute inset-x-8 -bottom-5 -z-10 h-10 rounded-full bg-slate-950/12 blur-2xl" />
            <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent" />
            <h3 className="text-2xl font-black text-[#07111f]">
              Il vecchio modo
            </h3>
            <ul className="mt-8 grid gap-4">
              {oldWay.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl bg-slate-50 p-4 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-100"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-red-50">
                    <XMarkIcon className="size-5 text-red-500" />
                  </span>
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex h-full flex-col rounded-[2.5rem] border border-white bg-white p-8 shadow-[0_34px_90px_rgba(6,95,70,0.18),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-emerald-200/80">
            <div className="absolute inset-x-8 -bottom-5 -z-10 h-10 rounded-full bg-emerald-950/16 blur-2xl" />
            <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#25d366]/70 to-transparent" />
            <h3 className="text-2xl font-black text-[#07111f]">
              Il modo ViaSOS
            </h3>
            <ul className="mt-8 grid gap-4">
              {newWay.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl bg-[#f3fff7] p-4 text-slate-800 shadow-[0_10px_24px_rgba(6,95,70,0.08)] ring-1 ring-emerald-100"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#25d366]">
                    <CheckIcon className="size-5 text-[#07111f]" />
                  </span>
                  <span className="font-black">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-8 rounded-[2rem] bg-[#fff7d6] p-6 text-center text-2xl font-black text-[#07111f]">
          Una sola richiesta può sostituire numerose telefonate.
        </p>
      </div>
    </section>
  )
}

export function ProximityBenefits() {
  const cards = [
    [
      'Meno attesa',
      '/images/micro/benefit-waiting.webp',
      'Un carroattrezzi più vicino deve percorrere una distanza inferiore per raggiungere il veicolo.',
    ],
    [
      'Meno chilometri',
      '/images/micro/benefit-km.webp',
      'Ridurre il tragitto del carroattrezzi significa evitare trasferte inutilmente lunghe.',
    ],
    [
      'Maggiore possibilità di intervento',
      '/images/micro/benefit-continuity.webp',
      'Se un carroattrezzi è impegnato, il sistema continua automaticamente con quelli successivi.',
    ],
  ]
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
            Perché il carroattrezzi più vicino può farti risparmiare tempo e
            denaro
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            La distanza incide sul tempo necessario per raggiungerti e può
            incidere sul costo di uscita. Per questo ViaSOS non assegna la
            richiesta casualmente: la ricerca parte dai carroattrezzi più vicini
            alla posizione condivisa.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cards.map(([title, image, text]) => (
            <div
              key={title}
              className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7"
            >
              <Image
                src={image}
                alt=""
                width={160}
                height={160}
                className="mb-4 size-24 object-contain"
                loading="lazy"
              />
              <h3 className="text-xl font-black text-[#07111f]">{title}</h3>
              <p className="mt-3 leading-7 text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SpeedSection() {
  return (
    <section className="bg-[#07111f] py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#25d366]">
            ricerca progressiva
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Oltre 15 possibilità con una sola richiesta
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            La velocità di ViaSOS non dipende dalla risposta di un solo
            carroattrezzi. In base alla copertura della zona, il sistema può
            verificare progressivamente la disponibilità di oltre 15 carroattrezzi,
            partendo da quelli più vicini.
          </p>
          <p className="mt-6 rounded-2xl bg-white/10 p-5 text-xl font-black">
            Tu invii la posizione una sola volta. Il sistema continua a cercare.
          </p>
        </div>
        <div className="grid gap-3">
          {Array.from({ length: 9 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3"
            >
              <span className="font-bold">Carroattrezzi {index + 1}</span>
              <span
                className={
                  index === 5
                    ? 'rounded-full bg-[#25d366] px-3 py-1 text-xs font-black text-[#07111f]'
                    : 'rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-300'
                }
              >
                {index < 5 ? 'verifica' : index === 5 ? 'disponibile' : 'in coda'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Services() {
  return (
    <section id="servizi" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
          Soccorso stradale per ogni esigenza
        </h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10"
            >
              <Image
                src={service.image}
                alt=""
                width={160}
                height={160}
                className="size-24 object-contain"
                loading="lazy"
              />
              <h3 className="mt-5 text-xl font-black text-[#07111f]">
                {service.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-700">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function WhatsAppFlow() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#075e54]">
            risposta semplice
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
            Tutto direttamente su WhatsApp
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            Nessuna applicazione da scaricare e nessuna registrazione
            complicata. Tramite WhatsApp puoi condividere la posizione, ricevere
            la conferma, inviare fotografie e parlare direttamente con
            il carroattrezzi.
          </p>
          <a
            href="#assistenza"
            className="mt-8 inline-flex rounded-full bg-[#25d366] px-6 py-3.5 text-base font-black text-[#07111f] shadow-xl shadow-emerald-950/15"
          >
            Richiedi assistenza su WhatsApp
          </a>
        </div>
        <div className="rounded-[2rem] bg-[#e9fff2] p-5">
          <div className="rounded-[1.5rem] bg-white p-5 shadow-xl">
            {[
              'Posizione ricevuta',
              'Ricerca dei carroattrezzi più vicini avviata',
              'Carroattrezzi disponibile trovato',
              'Il carroattrezzi ti contatterà a breve',
            ].map((message) => (
              <div
                key={message}
                className="mb-3 ml-auto max-w-[82%] rounded-2xl bg-[#dcf8c6] px-4 py-3 text-sm font-bold text-[#07111f]"
              >
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Coverage() {
  return (
    <section id="copertura" className="bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
            Una rete di carroattrezzi in tutta Italia
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-700">
            ViaSOS collabora con una rete in continua crescita composta da
            centinaia di partner distribuiti sul territorio nazionale. La
            ricerca viene effettuata partendo dalla posizione reale del veicolo,
            nelle grandi città, nei comuni e nelle aree extraurbane coperte.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {['Nord Italia', 'Centro Italia', 'Sud Italia', 'Isole'].map(
              (area) => (
                <div
                  key={area}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black text-[#07111f]"
                >
                  {area}
                </div>
              ),
            )}
          </div>
        </div>
        <div className="relative h-[430px] rounded-[2rem] bg-white p-6 shadow-xl">
          <div className="absolute inset-8 rounded-[45%_55%_50%_50%] border-2 border-dashed border-[#25d366]/50 bg-[#e9fff2]" />
          {[
            'left-[42%] top-[17%]',
            'left-[36%] top-[30%]',
            'left-[48%] top-[43%]',
            'left-[54%] top-[58%]',
            'left-[43%] top-[73%]',
            'left-[63%] top-[80%]',
            'left-[28%] top-[79%]',
          ].map((position) => (
            <span
              key={position}
              className={`absolute ${position} size-4 rounded-full bg-[#25d366] shadow-lg shadow-[#25d366]/40`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Reliability() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-[#07111f] p-8 text-center text-white sm:p-12">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
            Una tecnologia semplice per un momento complicato
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-300">
            Quando sei fermo per strada non vuoi confrontare decine di siti o
            ripetere il problema a più carroattrezzi. ViaSOS riduce tutto a quattro
            elementi: posizione, richiesta, ricerca automatica e risposta.
          </p>
          <p className="mt-10 text-2xl font-black text-[#ffd34d] sm:text-4xl">
            La strada più breve tra te e il soccorso di cui hai bisogno.
          </p>
        </div>
      </div>
    </section>
  )
}

export function PartnerSection() {
  return (
    <section id="partner" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5 sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#075e54]">
            rete professionale
          </p>
          <h2 className="mx-auto mt-3 max-w-4xl text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
            Sei un carroattrezzi? Entra nella rete ViaSOS
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-700">
            Ricevi richieste relative alle zone in cui operi realmente, complete
            di posizione, numero del cliente, tipo di veicolo e problema
            segnalato.
          </p>
          <a
            href="mailto:partner@viasos.it?subject=Diventare%20partner%20ViaSOS"
            className="mt-8 inline-flex rounded-full bg-[#07111f] px-6 py-3.5 text-base font-black text-white"
          >
            Diventa partner ViaSOS
          </a>
        </div>
      </div>
    </section>
  )
}

export function FaqSection() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-tight text-[#07111f] sm:text-4xl">
          Domande frequenti
        </h2>
        <FaqAccordion items={faqs} />
      </div>
    </section>
  )
}
