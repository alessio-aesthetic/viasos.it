'use client'

import {
  ArrowRightIcon,
  MapIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Script from 'next/script'
import { RescueButton, RescueReveal } from './rescue-experience'

const journey = [
  {
    title: 'La tua posizione',
    text: 'Condividi il punto in cui è fermo il veicolo.',
    icon: MapPinIcon,
  },
  {
    title: 'Il tuo comune',
    text: 'Apri la pagina locale della zona rilevata.',
    icon: MapIcon,
  },
  {
    title: 'Il contatto',
    text: 'Trovi il numero. Chiami il professionista.',
    icon: PhoneIcon,
  },
]

export function SearchVisualization() {
  return (
    <section id="come-funziona" className="rx-section rx-journey">
      <RescueReveal className="rx-container">
        <div className="rx-journey-head">
          <div>
            <p className="rx-eyebrow">DOVE SEI → CHI CHIAMI</p>
            <h2>
              Il soccorso comincia
              <br />
              <em>dal tuo punto sulla mappa.</em>
            </h2>
          </div>
          <p>
            ViaSOS individua il comune più vicino alla posizione rilevata e apre
            la pagina con il numero di riferimento. Un percorso diretto, dal
            veicolo fermo alla chiamata.
          </p>
        </div>
        <div className="rx-journey-grid">
          <div className="rx-journey-stage">
            <div className="rx-stage-label">
              <span>
                <i /> IL PERCORSO VIASOS
              </span>
              <span>POSIZIONE / COMUNE / CONTATTO</span>
            </div>
            <div className="rx-stage-grid" aria-hidden="true" />
            <div className="rx-radar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <Script
              src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
              type="module"
              strategy="afterInteractive"
            />
            <dotlottie-player
              src="/lottie/search-flow-large.lottie"
              background="transparent"
              speed="1"
              loop
              autoplay
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: 2,
              }}
            />
            <div className="rx-stage-footer">
              <MapPinIcon aria-hidden="true" />
              <span>La tua posizione è il punto di partenza.</span>
              <ArrowRightIcon aria-hidden="true" />
            </div>
          </div>
          <div className="rx-journey-steps">
            {journey.map((step, index) => (
              <div key={step.title} className="rx-journey-step">
                <div className="rx-journey-rail">
                  <span>0{index + 1}</span>
                  {index < 2 && <i />}
                </div>
                <div className="rx-step-content">
                  <step.icon aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
            <RescueButton>Trova il carroattrezzi vicino</RescueButton>
            <span className="rx-journey-note">
              Disponibilità e tempi si confermano al telefono.
            </span>
          </div>
        </div>
      </RescueReveal>
    </section>
  )
}
