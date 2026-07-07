'use client'

import { useEffect, useState } from 'react'

import {
  PartnerBadge,
  PartnerPanel,
  PartnerShell,
  StatusPill,
} from '@/components/viasos/partner-shell'
import { partnerRequest } from '@/lib/partner-api'

type PartnerFields = {
  'Nome Ditta'?: string
  'Nome Referente'?: string
  Citta?: string
  WhatsApp?: string
  Attivo?: boolean
  'Email Fatturazione'?: string
  'Indirizzo Fatturazione'?: string
  'Copertura KM'?: number
  'Abilitato Autostrada'?: boolean
  'Commissioni Dovute'?: number
  'Commissioni Pagate'?: number
  'Commissioni Non Pagate'?: number
  'Reminder Pagamento Totali'?: number
  'Sono Disponibile Totali'?: number
  'Disponibili Non Conclusi'?: number
  'Stato Registrazione'?: string
}

type LeadFields = {
  id: string
  Nome?: string
  'Telefono Cliente'?: string
  Citta?: string
  Servizio?: string
  Descrizione?: string
  stato_lead?: string
  'Commissione Pagata'?: boolean
}

type DashboardData = {
  ok: boolean
  partner: PartnerFields
  leads: LeadFields[]
}

export default function PartnerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token') || ''

    if (!token) {
      setError('Accedi con email e numero WhatsApp per aprire la dashboard.')
      setLoading(false)
      return
    }

    partnerRequest<DashboardData>('viasos-partner-dashboard', { token })
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((currentError) => {
        setError(
          currentError instanceof Error
            ? currentError.message
            : 'Dashboard non disponibile.',
        )
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <PartnerShell>
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <PartnerPanel>
            <PartnerBadge>Dashboard partner</PartnerBadge>
            <h1 className="mt-5 text-3xl font-black">
              Caricamento dashboard
            </h1>
            <p className="mt-4 font-semibold text-slate-600">
              Sto recuperando i dati del profilo partner.
            </p>
          </PartnerPanel>
        </section>
      </PartnerShell>
    )
  }

  if (error || !data) {
    return (
      <PartnerShell>
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <PartnerPanel>
            <PartnerBadge>Dashboard partner</PartnerBadge>
            <h1 className="mt-5 text-3xl font-black">
              Accesso non disponibile
            </h1>
            <p className="mt-4 leading-7 font-semibold text-slate-700">
              Accedi con email e numero WhatsApp per aprire la dashboard.
            </p>
            <p className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-amber-800">
              {error}
            </p>
            <a
              href="/partner/login"
              className="mt-6 inline-flex rounded-full bg-[#07111f] px-6 py-3.5 font-black text-white"
            >
              Vai al login
            </a>
          </PartnerPanel>
        </section>
      </PartnerShell>
    )
  }

  const partner = data.partner
  const status = partner['Stato Registrazione'] || 'In attesa approvazione'
  const active = Boolean(partner.Attivo)

  return (
    <PartnerShell>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <PartnerBadge>Dashboard partner</PartnerBadge>
            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              {partner['Nome Ditta'] || 'Profilo partner'}
            </h1>
            <p className="mt-3 text-lg font-semibold text-slate-600">
              {partner.Citta || 'Città non indicata'} ·{' '}
              {partner.WhatsApp || 'WhatsApp non indicato'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusPill tone={active ? 'green' : 'yellow'}>
              {active ? 'Attivo per i lead' : 'Non attivo'}
            </StatusPill>
            <StatusPill tone={status === 'Approvato' ? 'green' : 'yellow'}>
              {status}
            </StatusPill>
          </div>
        </div>

        {!active ? (
          <div className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-xl font-black text-amber-950">
              Profilo in verifica
            </h2>
            <p className="mt-2 max-w-4xl leading-7 font-semibold text-amber-900">
              Il profilo è presente in Airtable ma non riceve lead finché non
              viene approvato e attivato manualmente.
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Metric label="Lead collegati" value={data.leads.length} />
          <Metric
            label="Sono disponibile"
            value={partner['Sono Disponibile Totali'] || 0}
          />
          <Metric
            label="Non conclusi"
            value={partner['Disponibili Non Conclusi'] || 0}
          />
          <Metric
            label="Reminder pagamento"
            value={partner['Reminder Pagamento Totali'] || 0}
          />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Metric
            label="Commissioni dovute"
            value={partner['Commissioni Dovute'] || 0}
            suffix="€"
          />
          <Metric
            label="Commissioni pagate"
            value={partner['Commissioni Pagate'] || 0}
            suffix="€"
          />
          <Metric
            label="Commissioni aperte"
            value={partner['Commissioni Non Pagate'] || 0}
            suffix="€"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <PartnerPanel>
            <h2 className="text-2xl font-black">Ultimi lead</h2>
            <div className="mt-5 grid gap-3">
              {data.leads.length ? (
                data.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-black">
                          {lead.Servizio || 'Servizio non indicato'}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-600">
                          {lead.Citta || 'Zona non indicata'} ·{' '}
                          {lead['Telefono Cliente'] || 'telefono non visibile'}
                        </p>
                      </div>
                      <StatusPill tone={lead['Commissione Pagata'] ? 'green' : 'neutral'}>
                        {lead.stato_lead || 'Stato non indicato'}
                      </StatusPill>
                    </div>
                    {lead.Descrizione ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {lead.Descrizione}
                      </p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="rounded-3xl bg-slate-50 p-5 font-semibold text-slate-600">
                  Nessun lead collegato a questo profilo.
                </p>
              )}
            </div>
          </PartnerPanel>

          <div className="grid gap-6">
            <PartnerPanel>
              <h2 className="text-2xl font-black">Profilo operativo</h2>
              <dl className="mt-5 grid gap-3 text-sm">
                <Info label="Referente" value={partner['Nome Referente']} />
                <Info label="Email" value={partner['Email Fatturazione']} />
                <Info
                  label="Base operativa"
                  value={partner['Indirizzo Fatturazione']}
                />
                <Info
                  label="Copertura"
                  value={
                    partner['Copertura KM']
                      ? `${partner['Copertura KM']} km`
                      : undefined
                  }
                />
                <Info
                  label="Autostrada"
                  value={
                    partner['Abilitato Autostrada']
                      ? 'Abilitato'
                      : 'Non abilitato'
                  }
                />
              </dl>
            </PartnerPanel>
            <PartnerPanel>
              <h2 className="text-2xl font-black">Regole rapide</h2>
              <ul className="mt-5 grid gap-3 text-sm font-bold leading-6 text-slate-700">
                <li>Rispondi ai pulsanti WhatsApp il più velocemente possibile.</li>
                <li>Se accetti un lead, chiama subito il cliente dal tuo telefono.</li>
                <li>La commissione viene richiesta solo sui servizi confermati.</li>
                <li>Se non puoi intervenire, rifiuta subito per liberare il lead.</li>
              </ul>
            </PartnerPanel>
          </div>
        </div>
      </section>
    </PartnerShell>
  )
}

function Metric({
  label,
  value,
  suffix,
}: {
  label: string
  value: string | number
  suffix?: string
}) {
  return (
    <PartnerPanel className="p-5">
      <p className="text-sm font-black text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black">
        {value}
        {suffix ? <span className="text-xl">{suffix}</span> : null}
      </p>
    </PartnerPanel>
  )
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
      <dt className="font-black text-slate-500">{label}</dt>
      <dd className="text-right font-bold text-slate-800">
        {value || 'Non indicato'}
      </dd>
    </div>
  )
}
