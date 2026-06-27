import { site } from '@/data/site'
import { Brand } from './brand'

export function Footer() {
  return (
    <footer className="bg-[#07111f] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
          <div>
            <Brand className="[&_*]:text-white" />
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              ViaSOS mette in contatto chi necessita di assistenza con diversi
              carroattrezzi indipendenti presenti nella rete. Opera come
              intermediario e non come singolo carroattrezzi.
            </p>
            <p className="mt-4 text-sm font-bold text-white">
              P. IVA {site.vatNumber}
            </p>
          </div>
          <FooterGroup
            title="Navigazione"
            links={[
              ['Come funziona', '#come-funziona'],
              ['Servizi', '#servizi'],
              ['Copertura', '#copertura'],
              ['FAQ', '#faq'],
            ]}
          />
          <FooterGroup
            title="Piattaforma"
            links={[
              ['Diventa partner', '#partner'],
              ['Contatti', 'mailto:info@viasos.it'],
              ['Privacy policy', '/privacy'],
              ['Cookie policy', '/cookie'],
            ]}
          />
          <FooterGroup
            title="Servizi"
            links={[
              ['Soccorso auto', '#servizi'],
              ['Soccorso moto', '#servizi'],
              ['Soccorso furgoni', '#servizi'],
              ['Termini e condizioni', '/termini'],
            ]}
          />
        </div>
        <p className="mt-12 border-t border-white/10 pt-8 text-xs leading-6 text-slate-400">
          ViaSOS è una piattaforma di collegamento tra utenti e carroattrezzi
          indipendenti del soccorso stradale. Disponibilità, tempistiche,
          preventivi e svolgimento dell’intervento sono comunicati e gestiti dal
          professionista incaricato. La vicinanza viene determinata in base alla
          posizione condivisa e ai carroattrezzi disponibili e compatibili
          presenti nella rete al momento della richiesta.
        </p>
        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {site.name}. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  )
}

function FooterGroup({
  title,
  links,
}: {
  title: string
  links: [string, string][]
}) {
  return (
    <div>
      <p className="font-black">{title}</p>
      <div className="mt-4 grid gap-3 text-sm text-slate-300">
        {links.map(([label, href]) => (
          <a key={label} href={href} className="hover:text-white">
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}
