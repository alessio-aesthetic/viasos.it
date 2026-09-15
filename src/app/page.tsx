import type { Metadata } from 'next'

import { LocationFinder } from '@/components/viasos/location-finder'
import { Footer } from '@/components/viasos/footer'
import { Header } from '@/components/viasos/header'
import { TrustVisual } from '@/components/viasos/trust-visuals'
import {
  Comparison,
  Coverage,
  FaqSection,
  PartnerSection,
  ProximityBenefits,
  Services,
  SpeedSection,
  WhatsAppFlow,
} from '@/components/viasos/sections'
import { SearchVisualization } from '@/components/viasos/search-visualization'
import { faqs, services, site } from '@/data/site'

export const metadata: Metadata = {
  title: {
    absolute: site.title,
  },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
}

function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Piattaforma per carroattrezzi e soccorso stradale vicino',
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    areaServed: 'Italia',
    serviceType: services.map((item) => item.title).join(', '),
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <>
      {[organization, website, service, faq].map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

function Hero() {
  return <section className="home-hero">
    <div className="home-hero-grid">
      <div className="home-hero-copy">
        <p className="rescue-kicker"><span/> Soccorso stradale · Italia</p>
        <h1>Fermo? Riparti<br/>dalla tua <em>posizione.</em></h1>
        <p className="home-lead">Trova il carroattrezzi di riferimento vicino a te. <strong>Dal tuo comune al numero da chiamare.</strong></p>
        <div className="home-route-art" aria-hidden="true"><TrustVisual type="nearby"/><div><span>IL PERCORSO PIÙ SEMPLICE</span><strong>Tu sei qui.<br/>Il contatto è a un passo.</strong></div></div>
        <p className="home-note">Nessuna app da scaricare. Condividi la posizione e apri la pagina del comune più vicino al punto rilevato.</p>
      </div>
      <LocationFinder/>
    </div>
    <div className="home-roadline" aria-hidden="true"/>
  </section>
}

function TrustHighlights() {
  const trustItems = [
    {
      title: 'Ricerca automatica per vicinanza',
      text: 'ViaSOS individua il comune più vicino al punto rilevato dal browser.',
      visual: 'nearby' as const,
    },
    {
      title: 'Contatto diretto, subito',
      text: 'Apri la pagina della tua zona e chiama il numero già pronto.',
      visual: 'whatsapp' as const,
    },
    {
      title: 'Comuni di tutta Italia',
      text: 'Un percorso locale con contatti e alternative ordinati per vicinanza.',
      visual: 'network' as const,
    },
  ]

  return (
    <section className="relative bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className="group rounded-[2.25rem] border border-slate-200 bg-white p-6 text-center shadow-2xl shadow-slate-950/8 transition hover:-translate-y-1 hover:shadow-slate-950/14"
            >
              <TrustVisual type={item.visual} />
              <h2 className="mx-auto mt-3 max-w-sm text-xl font-black leading-tight text-[#07111f] lg:text-2xl">
                {item.title}
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-base leading-7 font-semibold text-slate-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main className="home-page">
        <Hero />
        <TrustHighlights />
        <SearchVisualization />
        <Comparison />
        <ProximityBenefits />
        <SpeedSection />
        <Services />
        <WhatsAppFlow />
        <Coverage />
        <PartnerSection />
        <FaqSection />
        <section className="bg-[#07111f] py-24 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Sei fermo per strada? Non perdere tempo chiamando un numero dopo
              l’altro.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Condividi la posizione, apri la pagina del comune e chiama il contatto di riferimento. Disponibilità, tempi e preventivo si confermano direttamente al telefono.
            </p>
            <p className="mt-8 rounded-[2rem] bg-white/10 p-5 text-2xl font-black text-[#ffd34d]">
              Una posizione. Il tuo comune. Il numero da chiamare.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#assistenza"
                className="rounded-full bg-[#25d366] px-7 py-4 text-base font-black text-[#07111f]"
              >
                Trova subito un carroattrezzi
              </a>
              <a
                href="/carroattrezzi/"
                className="rounded-full border border-white/20 px-7 py-4 text-base font-black text-white"
              >
                Scegli il comune manualmente
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
