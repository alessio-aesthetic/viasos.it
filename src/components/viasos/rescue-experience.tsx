'use client'

import italy from '@/data/italy-outline.json'
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'

export function RescueReveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('rescue-entered')
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    node.classList.add('rescue-observed')
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} className={`rescue-reveal ${className}`}>
      {children}
    </div>
  )
}

export function RescueButton({
  href = '#assistenza',
  children,
}: {
  href?: string
  children: React.ReactNode
}) {
  return (
    <a href={href} className="rx-button">
      <span>{children}</span>
      <ArrowUpRightIcon aria-hidden="true" />
    </a>
  )
}

const preparation = [
  {
    title: 'Il punto esatto',
    label: 'Posizione',
    icon: MapPinIcon,
    text: 'Indica strada, direzione di marcia e un riferimento visibile. Se puoi, condividi il punto sulla mappa con il professionista.',
    example:
      '«Sono sulla SP35, in direzione Bergamo, vicino alla prossima uscita.»',
  },
  {
    title: 'Il mezzo e il problema',
    label: 'Veicolo',
    icon: TruckIcon,
    text: 'Comunica modello del veicolo e cosa è successo. Specifica se le ruote girano e se l’auto si trova in un garage o in un accesso difficile.',
    example:
      '«Ho un’auto che non si avvia. È in un parcheggio, facilmente accessibile.»',
  },
  {
    title: 'Tempi e preventivo',
    label: 'Intervento',
    icon: WrenchScrewdriverIcon,
    text: 'Chiedi disponibilità, tempo di arrivo previsto e costo del soccorso. Concorda dove portare il veicolo prima di confermare.',
    example:
      '«Può intervenire? Qual è il costo per portare l’auto alla mia officina?»',
  },
]

export function CallPreparation() {
  const [active, setActive] = useState(0)
  return (
    <section className="rx-section rx-preparation">
      <RescueReveal className="rx-container rx-two-col">
        <div className="rx-copy">
          <p className="rx-eyebrow">PRIMA DEL RECUPERO</p>
          <h2>
            Una chiamata chiara.
            <br />
            <em>Un soccorso organizzato.</em>
          </h2>
          <p>
            Hai trovato il contatto. Bastano pochi dettagli per aiutare il
            carroattrezzi a preparare il mezzo adatto al tuo recupero.
          </p>
          <RescueButton>Trova il numero della tua zona</RescueButton>
          <div className="rx-contact-note">
            <PhoneIcon aria-hidden="true" />
            <span>
              Parla direttamente con il professionista.
              <br />
              Posizione e foto anche via WhatsApp, se disponibile.
            </span>
          </div>
        </div>
        <div className="rx-callboard">
          <div className="rx-board-heading">
            <span className="rx-square-icon">
              <PhoneIcon />
            </span>
            <div>
              <small>PREPARA LA CHIAMATA</small>
              <strong>I dettagli che contano</strong>
            </div>
            <span className="rx-board-counter">
              0{active + 1}
              <small>/ 03</small>
            </span>
          </div>
          <div
            className="rx-prep-tabs"
            role="tablist"
            aria-label="Dettagli per il soccorso"
          >
            {preparation.map((step, index) => (
              <button
                key={step.label}
                id={`prep-tab-${index}`}
                role="tab"
                aria-selected={active === index}
                aria-controls={`prep-panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                    event.preventDefault()
                    const next =
                      (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3
                    setActive(next)
                    document.getElementById(`prep-tab-${next}`)?.focus()
                  }
                }}
              >
                <step.icon aria-hidden="true" />
                <span>{step.label}</span>
                <b>0{index + 1}</b>
              </button>
            ))}
          </div>
          {preparation.map((step, index) => (
            <div
              key={step.title}
              id={`prep-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`prep-tab-${index}`}
              hidden={active !== index}
              className="rx-prep-panel"
            >
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <div className="rx-speech">
                <span>AD ESEMPIO</span>
                <p>{step.example}</p>
              </div>
            </div>
          ))}
          <div className="rx-board-footer">
            <CheckIcon aria-hidden="true" />
            <span>Concorda il recupero e la destinazione.</span>
            <ArrowRightIcon aria-hidden="true" />
          </div>
        </div>
      </RescueReveal>
    </section>
  )
}

const regions = [
  {
    title: 'Nord Italia',
    description: 'Dalle città alpine alla Pianura Padana.',
    points: [
      [9.2, 45.46],
      [7.68, 45.07],
      [12.33, 45.44],
      [13.77, 45.65],
    ],
  },
  {
    title: 'Centro Italia',
    description: 'Città, collegamenti e strade dell’Appennino.',
    points: [
      [11.25, 43.77],
      [12.5, 41.9],
      [13.52, 43.62],
    ],
  },
  {
    title: 'Sud Italia',
    description: 'Dal Tirreno all’Adriatico, fino alla Calabria.',
    points: [
      [14.27, 40.85],
      [16.87, 41.12],
      [16.59, 38.91],
    ],
  },
  {
    title: 'Isole',
    description: 'Le pagine locali di Sicilia e Sardegna.',
    points: [
      [13.36, 38.12],
      [15.09, 37.5],
      [9.12, 39.22],
    ],
  },
]
function project(lon: number, lat: number) {
  return [(lon - 6.5) * 28 + 25, (47.2 - lat) * 36 + 25]
}

export function NationalCoverage() {
  const [active, setActive] = useState(0)
  return (
    <section id="copertura" className="rx-section rx-coverage">
      <RescueReveal className="rx-container rx-coverage-grid">
        <div className="rx-copy">
          <p className="rx-eyebrow">LA TUA ZONA, IL TUO RIFERIMENTO</p>
          <h2>
            L’Italia è grande.
            <br />
            <em>Partiamo da dove sei.</em>
          </h2>
          <p>
            Una rete di carroattrezzi in tutta Italia e pagine dedicate ai
            comuni. La ricerca parte dalla tua posizione per avvicinarti al
            contatto di riferimento.
          </p>
          <div
            className="rx-area-list"
            role="tablist"
            aria-label="Esplora le aree d’Italia"
          >
            {regions.map((region, index) => (
              <button
                key={region.title}
                id={`area-tab-${index}`}
                role="tab"
                aria-selected={active === index}
                aria-controls="italy-map-panel"
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault()
                    const next =
                      (index + (event.key === 'ArrowDown' ? 1 : 3)) % 4
                    setActive(next)
                    document.getElementById(`area-tab-${next}`)?.focus()
                  }
                }}
              >
                <span className="rx-area-number">0{index + 1}</span>
                <span>
                  <strong>{region.title}</strong>
                  <small>{region.description}</small>
                </span>
                <ArrowUpRightIcon aria-hidden="true" />
              </button>
            ))}
          </div>
          <RescueButton href="/carroattrezzi/">
            Trova il carroattrezzi per il tuo comune
          </RescueButton>
        </div>
        <div
          id="italy-map-panel"
          className="rx-map-board"
          role="tabpanel"
          aria-labelledby={`area-tab-${active}`}
        >
          <div className="rx-map-meta">
            <span>V I A S O S / ITALIA</span>
            <span>
              <i /> Ricerca per vicinanza
            </span>
          </div>
          <svg
            viewBox="0 0 350 435"
            className="rx-italy"
            role="img"
            aria-label={`Mappa dell’Italia: ${regions[active].title}. Punti geografici illustrativi.`}
          >
            <defs>
              <linearGradient id="italy-fill" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#35455d" />
                <stop offset="1" stopColor="#142338" />
              </linearGradient>
              <filter id="map-glow">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>
            <path
              d={italy.path}
              fill="url(#italy-fill)"
              stroke="#6c7b91"
              strokeWidth="1"
            />
            {regions.map((region, index) => (
              <g
                key={region.title}
                className={
                  index === active ? 'rx-map-area selected' : 'rx-map-area'
                }
              >
                {region.points.map(([lon, lat], p) => {
                  const [x, y] = project(lon, lat)
                  return (
                    <g key={p} transform={`translate(${x} ${y})`}>
                      <circle
                        className="rx-map-pulse"
                        r="12"
                        fill="none"
                        stroke="#ffbd16"
                        style={{ animationDelay: `${p * 0.5}s` }}
                      />
                      <circle
                        r="7"
                        fill="#ffbd16"
                        opacity=".24"
                        filter="url(#map-glow)"
                      />
                      <circle r="3" fill="#ffcd4d" />
                    </g>
                  )
                })}
              </g>
            ))}
          </svg>
          <div className="rx-map-caption" key={active}>
            <MapPinIcon aria-hidden="true" />
            <div>
              <small>ESPLORA IL TERRITORIO</small>
              <strong>{regions[active].title}</strong>
            </div>
            <span>0{active + 1} / 04</span>
          </div>
          <p className="rx-map-disclaimer">
            Mappa illustrativa. Disponibilità e tempi si confermano con il
            professionista della zona.
          </p>
        </div>
      </RescueReveal>
    </section>
  )
}
