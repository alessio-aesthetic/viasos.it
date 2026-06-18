import type { Metadata } from 'next'

import { EmergencyForm } from '@/components/viasos/emergency-form'
import { Footer } from '@/components/viasos/footer'
import { Header } from '@/components/viasos/header'
import {
  Comparison,
  Coverage,
  FaqSection,
  HowItWorks,
  ImpactBand,
  PartnerSection,
  ProximityBenefits,
  Reliability,
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
  return (
    <section className="relative overflow-hidden bg-[#f7fbff] pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,211,102,0.16),transparent_34%),radial-gradient(circle_at_top_right,rgba(255,211,77,0.18),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:pb-28">
        <div>
          <p className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#075e54] shadow-sm">
            Soccorso stradale in tutta Italia
          </p>
          <h1 className="mt-7 max-w-5xl text-5xl font-black tracking-tight text-[#07111f] sm:text-6xl lg:text-7xl">
            Il carroattrezzi piu vicino a te, trovato in pochi secondi
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-semibold leading-8 text-slate-700">
            Invia la tua posizione e ViaSOS cerchera automaticamente il
            carroattrezzi disponibile piu vicino. Se il primo operatore non puo
            intervenire, il sistema contattera progressivamente quelli
            successivi fino a trovare una disponibilita.
          </p>
          <p className="mt-5 max-w-2xl rounded-2xl border border-[#ffd34d]/60 bg-[#fff7d6] p-4 text-base font-black text-[#07111f]">
            Una sola richiesta puo attivare la ricerca tra oltre 15
            carroattrezzi presenti nella zona.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#assistenza"
              className="inline-flex justify-center rounded-full bg-[#07111f] px-6 py-4 text-base font-black text-white shadow-xl shadow-slate-950/15 transition hover:bg-[#123456]"
            >
              Trova il carroattrezzi piu vicino
            </a>
            <a
              href="#assistenza"
              className="inline-flex justify-center rounded-full border border-emerald-200 bg-white px-6 py-4 text-base font-black text-[#075e54] transition hover:border-[#25d366]"
            >
              Invia la posizione su WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-600">
            Nessuna app da scaricare. Bastano telefono, veicolo e posizione.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              'Ricerca automatica per vicinanza',
              'Risposta tramite WhatsApp',
              'Centinaia di partner in Italia',
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-black text-[#07111f] shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-5">
          <EmergencyForm />
          <SearchVisualization />
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
      <main>
        <Hero />
        <ImpactBand />
        <HowItWorks />
        <Comparison />
        <ProximityBenefits />
        <SpeedSection />
        <Services />
        <WhatsAppFlow />
        <Coverage />
        <Reliability />
        <PartnerSection />
        <FaqSection />
        <section className="bg-[#07111f] py-24 text-white">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-4xl font-black tracking-tight sm:text-6xl">
              Sei fermo per strada? Non perdere tempo chiamando un numero dopo
              l’altro.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Invia la posizione. ViaSOS cerchera automaticamente gli operatori
              presenti nelle vicinanze, partendo da quelli piu vicini e
              continuando fino a trovare una disponibilita.
            </p>
            <p className="mt-8 rounded-[2rem] bg-white/10 p-5 text-2xl font-black text-[#ffd34d]">
              Una richiesta. Oltre 15 possibili operatori. Il carroattrezzi
              disponibile piu vicino.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#assistenza"
                className="rounded-full bg-[#25d366] px-7 py-4 text-base font-black text-[#07111f]"
              >
                Trova subito un carroattrezzi
              </a>
              <a
                href="#assistenza"
                className="rounded-full border border-white/20 px-7 py-4 text-base font-black text-white"
              >
                Condividi la posizione su WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

