import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

import { faqs, services } from '@/data/site'
import { FaqAccordion } from './faq-accordion'
import {
  CallPreparation,
  NationalCoverage,
  RescueButton,
  RescueReveal,
} from './rescue-experience'

const oldWay = [
  'Cerchi diversi numeri su Google',
  'Chiami un carroattrezzi alla volta',
  'Ripeti ogni volta posizione e problema',
  'Molti non rispondono o sono già impegnati',
  'Non sai quale sia realmente il più vicino',
]

const newWay = [
  'Parti dalla posizione del veicolo',
  'Apri subito la pagina del comune',
  'Trovi il numero di riferimento già pronto',
  'Hai a disposizione anche contatti alternativi',
  'Confermi disponibilità e costo al telefono',
]

export function Comparison() {
  return (
    <section id="perché-viasos" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-4xl text-center">
          <p className="text-sm font-black tracking-[0.22em] text-[#075e54] uppercase">
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
          <div className="relative flex h-full flex-col rounded-[2.5rem] border border-white bg-white p-8 ring-1 shadow-[0_34px_90px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,1)] ring-slate-200/70">
            <div className="absolute inset-x-8 -bottom-5 -z-10 h-10 rounded-full bg-slate-950/12 blur-2xl" />
            <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent" />
            <h3 className="text-2xl font-black text-[#07111f]">
              Il vecchio modo
            </h3>
            <ul className="mt-8 grid gap-4">
              {oldWay.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl bg-slate-50 p-4 text-slate-700 ring-1 shadow-[0_10px_24px_rgba(15,23,42,0.06)] ring-slate-100"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-red-50">
                    <XMarkIcon className="size-5 text-red-500" />
                  </span>
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative flex h-full flex-col rounded-[2.5rem] border border-white bg-white p-8 ring-1 shadow-[0_34px_90px_rgba(6,95,70,0.18),inset_0_1px_0_rgba(255,255,255,1)] ring-emerald-200/80">
            <div className="absolute inset-x-8 -bottom-5 -z-10 h-10 rounded-full bg-emerald-950/16 blur-2xl" />
            <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#25d366]/70 to-transparent" />
            <h3 className="text-2xl font-black text-[#07111f]">
              Il modo ViaSOS
            </h3>
            <ul className="mt-8 grid gap-4">
              {newWay.map((item) => (
                <li
                  key={item}
                  className="flex gap-4 rounded-2xl bg-[#f3fff7] p-4 text-slate-800 ring-1 shadow-[0_10px_24px_rgba(6,95,70,0.08)] ring-emerald-100"
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
      '/images/realistic/benefit-waiting.webp',
      'Un carroattrezzi più vicino deve percorrere una distanza inferiore per raggiungere il veicolo.',
    ],
    [
      'Meno chilometri',
      '/images/realistic/benefit-km.webp',
      'Ridurre il tragitto del carroattrezzi significa evitare trasferte inutilmente lunghe.',
    ],
    [
      'Maggiore possibilità di intervento',
      '/images/realistic/benefit-continuity.webp',
      'Se il primo contatto non può intervenire, nella pagina della zona trovi anche numeri alternativi.',
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
                width={960}
                height={960}
                className="mb-5 h-44 w-full object-contain sm:h-48"
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
    <section className="rx-speed-strip">
      <div className="rx-container">
        <span className="rx-speed-symbol" aria-hidden="true">
          ↗
        </span>
        <div>
          <span className="rx-eyebrow">DIRETTAMENTE AL CONTATTO</span>
          <h2>Nessun modulo tra te e il soccorso.</h2>
          <p>
            La posizione resta nel browser. Se non puoi condividerla, scegli il
            comune a mano.
          </p>
        </div>
        <RescueButton>Trova la mia zona</RescueButton>
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
                width={960}
                height={960}
                className="h-44 w-full object-contain sm:h-48"
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
  return <CallPreparation />
}

export function Coverage() {
  return <NationalCoverage />
}

export function PartnerSection() {
  return (
    <section id="partner" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-950/5 sm:p-12">
          <p className="text-sm font-black tracking-[0.22em] text-[#075e54] uppercase">
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
            href="/partner"
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
    <section id="faq" className="rx-section rx-faq">
      <RescueReveal className="rx-container">
        <div className="rx-faq-heading">
          <div>
            <p className="rx-eyebrow">RISPOSTE UTILI, PRIMA DI RIPARTIRE</p>
            <h2>
              Domande frequenti.
              <br />
              <em>Facciamo chiarezza.</em>
            </h2>
          </div>
          <p>
            Posizione, recupero e costi: trova la risposta che ti serve, poi
            parla con il professionista della tua zona.
          </p>
        </div>
        <FaqAccordion items={faqs} />
        <div className="rx-faq-bottom">
          <span>Hai bisogno del carroattrezzi?</span>
          <RescueButton>Vai al contatto della tua zona</RescueButton>
        </div>
      </RescueReveal>
    </section>
  )
}
