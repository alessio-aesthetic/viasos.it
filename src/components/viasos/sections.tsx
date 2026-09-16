import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { MapPinIcon, PhoneIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'
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
    <section id="perché-viasos" className="rx-section rx-comparison" aria-labelledby="comparison-title">
      <div className="rx-container">
        <RescueReveal className="rx-comparison-heading">
          <div>
            <span className="rx-eyebrow">MENO TENTATIVI. UNA DIREZIONE CHIARA.</span>
            <h2 id="comparison-title">Quando sei fermo,<br /><em>ogni passaggio conta.</em></h2>
          </div>
          <p>Dal punto in cui si trova il veicolo al contatto della zona. ViaSOS accorcia la ricerca, così puoi concentrarti sulla chiamata.</p>
        </RescueReveal>
        <RescueReveal className="rx-comparison-board">
          <div className="rx-comparison-side rx-comparison-before">
            <div className="rx-comparison-label"><span>01 / LA RICERCA TRADIZIONALE</span><span aria-hidden="true">↗ ↙ ↗</span></div>
            <h3>Il vecchio modo</h3>
            <p className="rx-comparison-caption">Tanti tentativi. Nessuna direzione.</p>
            <div className="rx-route-diagram" aria-hidden="true">
              <svg viewBox="0 0 460 110" fill="none"><path className="rx-route-lost" d="M20 75H100Q120 75 120 55V35Q120 15 140 15H190Q210 15 210 35V75Q210 95 230 95H280Q300 95 300 75V45Q300 25 320 25H360Q380 25 380 45V75H435"/><circle cx="20" cy="75" r="6"/><path d="m429 69 12 12m0-12-12 12"/></svg>
              <span className="rx-route-note">CERCA · CHIAMA · RIPROVA</span>
            </div>
            <ul>{oldWay.map((item) => <li key={item}><XMarkIcon aria-hidden="true"/><span>{item}</span></li>)}</ul>
          </div>
          <div className="rx-comparison-side rx-comparison-after">
            <div className="rx-comparison-label"><span>02 / PARTI DAL PUNTO GIUSTO</span><MapPinIcon aria-hidden="true"/></div>
            <h3>Il modo <span>ViaSOS</span></h3>
            <p className="rx-comparison-caption">La tua posizione. Il contatto della zona.</p>
            <div className="rx-route-diagram rx-route-direct" aria-hidden="true">
              <svg viewBox="0 0 460 110" fill="none"><path className="rx-route-track" d="M25 55H435"/><path className="rx-route-flow" d="M25 55H435"/><circle cx="25" cy="55" r="9"/><circle cx="230" cy="55" r="9"/><circle cx="435" cy="55" r="9"/></svg>
              <div className="rx-route-stops"><span>POSIZIONE</span><span>COMUNE</span><span>CONTATTO</span></div>
            </div>
            <ul>{newWay.map((item, index) => <li key={item} style={{ transitionDelay: `${index * 70}ms` }}><CheckIcon aria-hidden="true"/><span>{item}</span></li>)}</ul>
            <span className="rx-comparison-corner" aria-hidden="true"><ArrowUpRightIcon/></span>
          </div>
        </RescueReveal>
        <RescueReveal className="rx-comparison-action">
          <div className="rx-comparison-action-icon"><PhoneIcon aria-hidden="true"/></div>
          <div><h3>Meno ricerca. Più spazio alla chiamata.</h3><p>Trova il riferimento della zona e verifica disponibilità e preventivo direttamente al telefono.</p></div>
          <RescueButton>Trova il tuo comune</RescueButton>
        </RescueReveal>
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
