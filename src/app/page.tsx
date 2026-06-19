import type { Metadata } from 'next'

import { EmergencyForm } from '@/components/viasos/emergency-form'
import { Footer } from '@/components/viasos/footer'
import { Header } from '@/components/viasos/header'
import { TrustVisual } from '@/components/viasos/trust-visuals'
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
    <section className="relative min-h-screen overflow-hidden bg-[#f7fbff] pt-24 lg:flex lg:items-center lg:pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(37,211,102,0.18),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(255,211,77,0.22),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef7ff_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-white to-transparent" />
      <div className="relative mx-auto grid w-full max-w-[1580px] gap-8 px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-5rem)] lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch lg:px-8 lg:py-12">
        <div className="flex h-full flex-col justify-start rounded-[2.5rem] border border-white/70 bg-white/45 p-5 pt-7 shadow-2xl shadow-slate-950/5 backdrop-blur-sm sm:p-8 lg:p-10">
          <p className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] text-[#075e54] shadow-sm">
            Soccorso stradale in tutta Italia
          </p>
            <h1 className="mt-7 max-w-6xl text-4xl font-black tracking-tight text-[#07111f] sm:text-5xl lg:text-6xl xl:text-[5rem] xl:leading-[0.95]">
              Il carroattrezzi più vicino a te, trovato in pochi secondi
            </h1>
          <div className="mt-8 max-w-4xl space-y-5 text-xl leading-8 text-slate-700 lg:text-[1.38rem] lg:leading-9">
            <p>
              <strong className="font-black text-[#07111f]">
                Invia la tua posizione
              </strong>{' '}
              e ViaSOS cercherà automaticamente il carroattrezzi disponibile
              più vicino.
            </p>
            <p>
              Se il primo carroattrezzi non può intervenire, il sistema contatterà
              progressivamente quelli successivi fino a trovare una
              disponibilità.
            </p>
          </div>
          <p className="mt-7 max-w-3xl rounded-3xl border border-[#ffd34d]/60 bg-[#fff7d6] p-5 text-lg leading-7 font-black text-[#07111f] shadow-lg shadow-amber-950/5">
            Una sola richiesta può attivare la ricerca tra{' '}
            <span className="whitespace-nowrap">oltre 15 carroattrezzi</span>{' '}
            presenti nella zona.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#assistenza"
              className="inline-flex justify-center rounded-full bg-[#07111f] px-6 py-4 text-base font-black text-white shadow-xl shadow-slate-950/15 transition hover:bg-[#123456]"
            >
              Trova il carroattrezzi più vicino
            </a>
            <a
              href="#assistenza"
              className="inline-flex justify-center rounded-full border border-emerald-200 bg-white px-6 py-4 text-base font-black text-[#075e54] transition hover:border-[#25d366]"
            >
              Invia la posizione su WhatsApp
            </a>
          </div>
          <p className="mt-5 text-base leading-7 font-semibold text-slate-600">
            <strong className="text-[#07111f]">Nessuna app da scaricare.</strong>{' '}
            Bastano telefono, veicolo e posizione.
          </p>
        </div>
        <div className="flex h-full items-stretch">
          <EmergencyForm />
        </div>
      </div>
    </section>
  )
}

function TrustHighlights() {
  const trustItems = [
    {
      title: 'Ricerca automatica per vicinanza',
      text: 'ViaSOS parte dalla tua posizione e verifica i carroattrezzi più vicini.',
      visual: 'nearby' as const,
    },
    {
      title: 'Risposta tramite WhatsApp',
      text: 'Invii una sola richiesta e ricevi il riscontro nel canale più comodo.',
      visual: 'whatsapp' as const,
    },
    {
      title: 'Centinaia di partner in Italia',
      text: 'Una rete nazionale pensata per trovare disponibilità nella zona.',
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
      <main>
        <Hero />
        <TrustHighlights />
        <SearchVisualization />
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
            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              Sei fermo per strada? Non perdere tempo chiamando un numero dopo
              l’altro.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Invia la posizione. ViaSOS cercherà automaticamente i carroattrezzi
              presenti nelle vicinanze, partendo da quelli più vicini e
              continuando fino a trovare una disponibilità.
            </p>
            <p className="mt-8 rounded-[2rem] bg-white/10 p-5 text-2xl font-black text-[#ffd34d]">
              Una richiesta. Oltre 15 possibili carroattrezzi. Il carroattrezzi
              disponibile più vicino.
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
