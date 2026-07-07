import type { Metadata } from 'next'

import {
  PartnerBadge,
  PartnerPanel,
  PartnerShell,
} from '@/components/viasos/partner-shell'

export const metadata: Metadata = {
  title: 'Area Partner Carroattrezzi',
  description:
    'Registrazione e dashboard ViaSOS per carroattrezzi partner in attesa di approvazione.',
  robots: {
    index: false,
    follow: false,
  },
}

const steps = [
  {
    title: 'Ti registri una sola volta',
    text: 'Inserisci azienda, referente, numero WhatsApp, città operativa e dati minimi di fatturazione.',
  },
  {
    title: 'Controlliamo la richiesta',
    text: 'L account rimane in attesa di approvazione. Non ricevi lead finché non viene attivato manualmente.',
  },
  {
    title: 'Ricevi richieste compatibili',
    text: 'Quando sei attivo, ViaSOS può inviarti lead nella zona in cui lavori realmente.',
  },
  {
    title: 'Gestisci tutto dalla dashboard',
    text: 'Vedi lead, pagamenti, storico, regole operative e stato del profilo partner.',
  },
]

const highlights = [
  'Lead con numero cliente e posizione quando disponibili',
  'Pagamenti e commissioni visibili in modo ordinato',
  'Regole chiare prima di ricevere richieste',
  'Account attivato solo dopo verifica manuale',
]

export default function PartnerHome() {
  return (
    <PartnerShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-18">
        <div className="flex flex-col justify-center">
          <PartnerBadge>Portale partner ViaSOS</PartnerBadge>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Ricevi richieste di soccorso stradale nella tua zona, senza perdere tempo.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 font-semibold text-slate-700">
            Il portale partner serve per registrare la tua attività, vedere le
            richieste ricevute, controllare pagamenti e avere sempre chiare le
            regole operative di ViaSOS.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/partner/registrazione"
              className="inline-flex justify-center rounded-full bg-[#25d366] px-6 py-4 text-base font-black text-[#07111f] shadow-xl shadow-emerald-950/15"
            >
              Candidati come partner
            </a>
            <a
              href="/partner/login"
              className="inline-flex justify-center rounded-full border border-slate-300 bg-white px-6 py-4 text-base font-black text-[#07111f]"
            >
              Accedi alla dashboard
            </a>
          </div>
        </div>
        <PartnerPanel className="lg:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#075e54]">
            Come funziona
          </p>
          <div className="mt-6 grid gap-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-3xl bg-slate-50 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#07111f] text-sm font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-black">{step.title}</h2>
                  <p className="mt-1 text-sm leading-6 font-semibold text-slate-600">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PartnerPanel>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-200 bg-white p-5 text-sm font-black leading-6 text-slate-800 shadow-sm"
            >
              <span className="mb-4 block size-2 rounded-full bg-[#25d366]" />
              {item}
            </div>
          ))}
        </div>
      </section>
    </PartnerShell>
  )
}
