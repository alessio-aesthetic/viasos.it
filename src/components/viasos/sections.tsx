import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'

import {
  ArrowUpRightIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'

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
    <section
      id="perché-viasos"
      className="rx-section rx-comparison"
      aria-labelledby="comparison-title"
    >
      <div className="rx-container">
        <RescueReveal className="rx-comparison-heading">
          <div>
            <span className="rx-eyebrow">
              MENO TENTATIVI. UNA DIREZIONE CHIARA.
            </span>

            <h2 id="comparison-title">
              Quando sei fermo,
              <br />
              <em>ogni passaggio conta.</em>
            </h2>
          </div>

          <p>
            Dal punto in cui si trova il veicolo al contatto della zona. ViaSOS
            accorcia la ricerca, così puoi concentrarti sulla chiamata.
          </p>
        </RescueReveal>

        <RescueReveal className="rx-comparison-board">
          <div className="rx-comparison-side rx-comparison-before">
            <div className="rx-comparison-label">
              <span>01 / LA RICERCA TRADIZIONALE</span>

              <span aria-hidden="true">↗ ↙ ↗</span>
            </div>

            <h3>Il vecchio modo</h3>

            <p className="rx-comparison-caption">
              Tanti tentativi. Nessuna direzione.
            </p>

            <div className="rx-route-diagram" aria-hidden="true">
              <svg viewBox="0 0 460 110" fill="none">
                <path
                  className="rx-route-lost"
                  d="M20 75H100Q120 75 120 55V35Q120 15 140 15H190Q210 15 210 35V75Q210 95 230 95H280Q300 95 300 75V45Q300 25 320 25H360Q380 25 380 45V75H435"
                />

                <circle cx="20" cy="75" r="6" />

                <path d="m429 69 12 12m0-12-12 12" />
              </svg>

              <span className="rx-route-note">CERCA · CHIAMA · RIPROVA</span>
            </div>

            <ul>
              {oldWay.map((item) => (
                <li key={item}>
                  <XMarkIcon aria-hidden="true" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rx-comparison-side rx-comparison-after">
            <div className="rx-comparison-label">
              <span>02 / PARTI DAL PUNTO GIUSTO</span>

              <MapPinIcon aria-hidden="true" />
            </div>

            <h3>
              Il modo <span>ViaSOS</span>
            </h3>

            <p className="rx-comparison-caption">
              La tua posizione. Il contatto della zona.
            </p>

            <div
              className="rx-route-diagram rx-route-direct"
              aria-hidden="true"
            >
              <svg viewBox="0 0 460 110" fill="none">
                <path className="rx-route-track" d="M25 55H435" />

                <path className="rx-route-flow" d="M25 55H435" />

                <circle cx="25" cy="55" r="9" />

                <circle cx="230" cy="55" r="9" />

                <circle cx="435" cy="55" r="9" />
              </svg>

              <div className="rx-route-stops">
                <span>POSIZIONE</span>

                <span>COMUNE</span>

                <span>CONTATTO</span>
              </div>
            </div>

            <ul>
              {newWay.map((item, index) => (
                <li key={item} style={{ transitionDelay: `${index * 70}ms` }}>
                  <CheckIcon aria-hidden="true" />

                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <span className="rx-comparison-corner" aria-hidden="true">
              <ArrowUpRightIcon />
            </span>
          </div>
        </RescueReveal>

        <RescueReveal className="rx-comparison-action">
          <div className="rx-comparison-action-icon">
            <PhoneIcon aria-hidden="true" />
          </div>

          <div>
            <h3>Meno ricerca. Più spazio alla chiamata.</h3>

            <p>
              Trova il riferimento della zona e verifica disponibilità e
              preventivo direttamente al telefono.
            </p>
          </div>

          <RescueButton>Trova il tuo comune</RescueButton>
        </RescueReveal>
      </div>
    </section>
  )
}

export function ProximityBenefits() {
  const benefits = [
    {
      number: '01',

      title: 'Meno attesa',

      label: 'IL TEMPO',

      image: '/images/realistic/benefit-waiting.webp',

      text: 'Un carroattrezzi più vicino percorre meno strada per raggiungerti. Il tempo di arrivo effettivo va confermato direttamente con il professionista.',
    },

    {
      number: '02',

      title: 'Meno chilometri',

      label: 'LA DISTANZA',

      image: '/images/realistic/benefit-km.webp',

      text: 'Una trasferta più corta può incidere sul costo di uscita. Concorda il preventivo prima dell’intervento, in base al veicolo e al recupero necessario.',
    },

    {
      number: '03',

      title: 'Più possibilità di intervento',

      label: 'LE ALTERNATIVE',

      image: '/images/realistic/benefit-continuity.webp',

      text: 'Se il primo contatto è impegnato, nella pagina del comune trovi anche riferimenti alternativi. Un altro numero da chiamare, senza ricominciare la ricerca.',
    },
  ]

  return (
    <section
      id="vicinanza"
      className="rx-section rx-proximity"
      aria-labelledby="proximity-title"
    >
      <div className="rx-container">
        <RescueReveal className="rx-proximity-heading">
          <div>
            <span className="rx-eyebrow">
              IL SOCCORSO PARTE DALLA VICINANZA
            </span>

            <h2 id="proximity-title">
              Il carroattrezzi più vicino.
              <br />
              <em>La distanza conta.</em>
            </h2>
          </div>

          <p>
            Perché il carroattrezzi più vicino può farti risparmiare tempo e
            denaro? La ricerca del comune parte dalla posizione del veicolo.
            Disponibilità, tempi e prezzo li confermi al telefono.
          </p>
        </RescueReveal>

        <div className="rx-benefit-grid">
          {benefits.map((item) => (
            <RescueReveal key={item.number} className="rx-benefit">
              <div className="rx-benefit-top">
                <span>{item.number}</span>

                <span>{item.label}</span>
              </div>

              <div className="rx-benefit-art">
                <div className="rx-benefit-orbit" aria-hidden="true" />

                <Image
                  src={item.image}
                  width={960}
                  height={960}
                  sizes="(max-width: 700px) 90vw, 33vw"
                  alt=""
                  loading="lazy"
                />
              </div>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

              <span className="rx-benefit-marker" aria-hidden="true">
                <i />
                PARTI DALLA TUA ZONA
              </span>
            </RescueReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SpeedSection() {
  return (
    <section
      id="contatto-diretto"
      className="rx-section rx-direct-contact"
      aria-labelledby="direct-title"
    >
      <RescueReveal className="rx-container rx-direct-grid">
        <div className="rx-direct-visual" aria-hidden="true">
          <div className="rx-direct-ring" />

          <div className="rx-direct-route">
            <span>
              <MapPinIcon />
            </span>

            <i />

            <span>
              <PhoneIcon />
            </span>
          </div>

          <span className="rx-direct-visual-label">
            IL TUO PUNTO → IL TUO CONTATTO
          </span>
        </div>

        <div className="rx-direct-copy">
          <span className="rx-eyebrow">DIRETTAMENTE AL CONTATTO</span>

          <h2 id="direct-title">
            Nessun modulo.
            <br />
            <em>La strada più diretta.</em>
          </h2>

          <p>
            Condividi la posizione, apri il comune, chiama il riferimento della
            zona. Se non puoi usare la posizione, scegli il comune a mano.
          </p>

          <div className="rx-direct-actions">
            <RescueButton>Trova la mia zona</RescueButton>

            <span>
              La posizione resta nel browser.
              <br />
              Il contatto è nella pagina del comune.
            </span>
          </div>
        </div>
      </RescueReveal>
    </section>
  )
}

export function Services() {
  const descriptions = [
    'Auto ferme su strada, in parcheggio o in aree extraurbane. Comunica il punto esatto e il problema al professionista.',

    'Un veicolo che non può proseguire dopo un sinistro richiede un recupero adatto. Descrivi danni, accessibilità e condizioni del mezzo.',

    'Il motore non si avvia? Chiedi al professionista se è possibile intervenire sul posto o se occorre trasportare il veicolo.',

    'Gomma forata o danneggiata, senza possibilità di ripartire in sicurezza. Concorda assistenza sul posto o recupero.',

    'Accessi difficili, cortili, garage e strade secondarie. Specifica spazio disponibile, pendenza e condizioni delle ruote.',

    'Verso officina, carrozzeria, deposito o altra destinazione. Concorda tratta, modalità di carico e costo del trasporto.',

    'Moto e scooter non marcianti o danneggiati. Chiedi un recupero con attrezzatura adatta al trasporto delle due ruote.',

    'Furgoni leggeri e veicoli commerciali in panne. Comunica dimensioni, peso e carico per verificare il mezzo necessario.',

    'Camper e veicoli ricreazionali. Dimensioni, peso e posizione sono essenziali per verificare la compatibilità del carroattrezzi.',
  ]

  return (
    <section
      id="servizi"
      className="rx-section rx-service-catalogue"
      aria-labelledby="services-title"
    >
      <div className="rx-container">
        <RescueReveal className="rx-service-heading">
          <div>
            <span className="rx-eyebrow">OGNI FERMO HA IL SUO RECUPERO</span>

            <h2 id="services-title">
              Soccorso stradale.
              <br />
              <em>Per il tuo veicolo.</em>
            </h2>
          </div>

          <p>
            Dall’auto che non parte al trasporto di un camper: trova il contatto
            della zona e descrivi cosa serve. Il professionista verifica
            disponibilità e attrezzatura.
          </p>
        </RescueReveal>

        <div className="rx-service-grid">
          {services.map((service, index) => (
            <RescueReveal
              key={service.title}
              className="rx-service-reveal rx-service-featured"
            >
              <article className="rx-service-card">
                <a
                  href="#assistenza"
                  aria-label={`${service.title}: trova il contatto della tua zona`}
                >
                  <div className="rx-service-card-top">
                    <span>
                      {String(index + 1).padStart(2, '0')} / SOCCORSO STRADALE
                    </span>

                    <ArrowUpRightIcon aria-hidden="true" />
                  </div>

                  <div className="rx-service-art">
                    <span aria-hidden="true" />

                    <Image
                      src={service.image}
                      width={960}
                      height={960}
                      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
                      alt=""
                      loading="lazy"
                    />
                  </div>

                  <div className="rx-service-copy">
                    <h3>{service.title}</h3>

                    <p>{descriptions[index]}</p>
                  </div>

                  <div className="rx-service-card-bottom">
                    <span>Trova il contatto</span>

                    <ArrowUpRightIcon aria-hidden="true" />
                  </div>
                </a>
              </article>
            </RescueReveal>
          ))}
        </div>

        <RescueReveal className="rx-service-bottom">
          <span>
            Il mezzo giusto dipende dal veicolo e dalle condizioni di recupero.
          </span>

          <RescueButton>Parti dalla tua posizione</RescueButton>
        </RescueReveal>
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
