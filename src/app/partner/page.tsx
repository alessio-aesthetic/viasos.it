import { PartnerBadge, PartnerShell } from '@/components/viasos/partner-shell'
import { RescueReveal } from '@/components/viasos/rescue-experience'
import {
  ArrowUpRightIcon,
  MapPinIcon,
  PhoneIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'ViaSOS per carroattrezzi | Entra nella rete partner',
  description:
    'Gestisci disponibilità, chiamate e servizi nella tua zona. Nessun abbonamento: commissione solo per i servizi presi.',
  robots: { index: false, follow: false },
}
const steps = [
  [
    '01',
    'Ricevi la chiamata',
    'Un cliente ha bisogno di soccorso nella tua zona. Ricevi il contatto secondo disponibilità e priorità operative.',
  ],
  [
    '02',
    'Concordi il recupero',
    'Parli con il cliente, verifichi la posizione e concordi preventivo, tempi e destinazione.',
  ],
  [
    '03',
    'Confermi l’esito',
    'Comunichi Sì, preso, In trattativa oppure Non preso. Trovi l’attività e le commissioni nella dashboard.',
  ],
]
export default function PartnerHome() {
  return (
    <PartnerShell>
      <main>
        <section className="vp-home-hero">
          <div className="vp-container vp-hero-grid">
            <RescueReveal>
              <PartnerBadge>PER CHI IL SOCCORSO LO FA DAVVERO</PartnerBadge>
              <h1>
                La tua zona.
                <br />
                Il tuo mezzo.
                <br />
                <em>Il prossimo intervento.</em>
              </h1>
              <p>
                Tu pensi al recupero. ViaSOS mette in contatto la tua attività
                con chi è fermo sulla strada.
              </p>
              <div className="vp-actions">
                <a className="vp-button" href="/partner/registrazione/">
                  Entra nella rete <ArrowUpRightIcon />
                </a>
                <a className="vp-text-link" href="/partner/login/">
                  Sono già partner →
                </a>
              </div>
              <div className="vp-hero-facts">
                <span>Nessun abbonamento</span>
                <span>Preventivo concordato da te</span>
              </div>
            </RescueReveal>
            <RescueReveal className="vp-operations-art">
              <div className="vp-art-top">
                <span>IL PERCORSO DI UN INTERVENTO</span>
                <span className="vp-signal" />
              </div>
              <div className="vp-art-road" aria-hidden="true">
                <div className="vp-road-track" />
                <span>
                  <MapPinIcon />
                </span>
                <span>
                  <PhoneIcon />
                </span>
                <span>
                  <TruckIcon />
                </span>
              </div>
              <div className="vp-art-labels">
                <span>IL CLIENTE</span>
                <span>LA CHIAMATA</span>
                <span>IL RECUPERO</span>
              </div>
              <div className="vp-art-message">
                <TruckIcon />
                <div>
                  <strong>Il tuo lavoro, al centro.</strong>
                  <p>
                    Disponibilità, esiti e pagamenti.
                    <br />
                    Tutto nella tua area operativa.
                  </p>
                </div>
              </div>
              <div className="vp-art-bottom">
                <span>CONNESSI AL TERRITORIO</span>
                <span>ViaSOS ↗</span>
              </div>
            </RescueReveal>
          </div>
        </section>
        <section className="vp-container vp-home-steps">
          <RescueReveal>
            <PartnerBadge>DALLA CHIAMATA ALL’ESITO</PartnerBadge>
            <h2>
              Un flusso chiaro.
              <br />
              <em>Il controllo resta tuo.</em>
            </h2>
          </RescueReveal>
          <div className="vp-step-grid">
            {steps.map(([n, title, text]) => (
              <RescueReveal className="vp-step" key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </RescueReveal>
            ))}
          </div>
        </section>
        <section className="vp-value-section">
          <div className="vp-container vp-value-grid">
            <RescueReveal>
              <PartnerBadge>UN RAPPORTO TRASPARENTE</PartnerBadge>
              <h2>
                Entri gratis.
                <br />
                <em>Paghi quando prendi il servizio.</em>
              </h2>
              <p>
                Il cliente paga direttamente la tua attività. La commissione
                ViaSOS viene associata all’esito del servizio e resta
                consultabile nel tuo storico.
              </p>
              <a className="vp-button" href="/partner/registrazione/">
                Candidati come partner ↗
              </a>
            </RescueReveal>
            <RescueReveal className="vp-value-cards">
              <div>
                <span>01 / OPERATIVITÀ</span>
                <h3>Disponibile quando lo sei.</h3>
                <p>Aggiorna il tuo stato per le chiamate dalla dashboard.</p>
              </div>
              <div>
                <span>02 / PRIORITÀ</span>
                <h3>Ogni esito conta.</h3>
                <p>
                  I servizi presi e non presi contribuiscono alla priorità del
                  profilo. Consulta i tuoi dati di prima chiamata.
                </p>
              </div>
              <div>
                <span>03 / CONTABILITÀ</span>
                <h3>Ogni servizio, uno stato.</h3>
                <p>
                  Consulta servizi, commissioni pagate e importi ancora da
                  pagare.
                </p>
              </div>
            </RescueReveal>
          </div>
        </section>
        <section className="vp-container vp-home-final">
          <h2>Pronto per il prossimo recupero?</h2>
          <a className="vp-button" href="/partner/registrazione/">
            Registrati gratis ↗
          </a>
        </section>
      </main>
    </PartnerShell>
  )
}
