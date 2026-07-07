'use client'

import { useEffect, useMemo, useState } from 'react'

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
  'Latitudine Zona'?: number
  'Longitudine Zona'?: number
  'Commissioni Dovute'?: number
  'Commissioni Pagate'?: number
  'Commissioni Non Pagate'?: number
  'Reminder Pagamento Totali'?: number
  'Sono Disponibile Totali'?: number
  'Disponibili Non Conclusi'?: number
  'Percentuale Pagamenti'?: number
  'Priorita Invio'?: number
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
  'Feedback Carroattrezzi'?: string
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
              Recupero i dati operativi del profilo partner.
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
              href="/partner/login/"
              className="mt-6 inline-flex rounded-full bg-[#07111f] px-6 py-3.5 font-black text-white"
            >
              Vai al login
            </a>
          </PartnerPanel>
        </section>
      </PartnerShell>
    )
  }

  return <DashboardContent data={data} />
}

function DashboardContent({ data }: { data: DashboardData }) {
  const partner = data.partner
  const status = partner['Stato Registrazione'] || 'In attesa approvazione'
  const approved = status === 'Approvato'
  const active = Boolean(partner.Attivo)
  const score = useMemo(() => calculatePartnerScore(partner), [partner])

  return (
    <PartnerShell>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[2rem] bg-[#07111f] p-6 text-white shadow-2xl shadow-slate-950/15 sm:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <PartnerBadge>ViaSOS Partner Command Center</PartnerBadge>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                {partner['Nome Ditta'] || 'Profilo partner'}
              </h1>
              <p className="mt-4 text-lg font-semibold text-slate-300">
                {partner.Citta || 'Città non indicata'} ·{' '}
                {partner.WhatsApp || 'WhatsApp non indicato'}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill tone={approved ? 'green' : 'yellow'}>
                {status}
              </StatusPill>
              <StatusPill tone={active ? 'green' : 'yellow'}>
                {active ? 'Attivo per i lead' : 'Lead non abilitati'}
              </StatusPill>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-6">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#25d366]">
                Punteggio partner
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-6xl font-black">{score.total}</span>
                <span className="pb-2 text-xl font-black text-slate-300">
                  /100
                </span>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
                <div
                  className="h-full rounded-full bg-[#25d366]"
                  style={{ width: `${score.total}%` }}
                />
              </div>
              <p className="mt-4 text-sm leading-6 font-semibold text-slate-300">
                Più il punteggio è alto, più il partner è affidabile: disponibilità,
                conclusione dei servizi e pagamenti incidono sulla priorità.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <ScoreTile label="Disponibilità" value={score.availability} />
              <ScoreTile label="Completamento" value={score.completion} />
              <ScoreTile label="Pagamenti" value={score.payment} />
            </div>
          </div>
        </div>

        {approved && !active ? (
          <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-lg font-black text-amber-950">
              Profilo approvato, ma non ancora attivo per i lead
            </h2>
            <p className="mt-2 leading-7 font-semibold text-amber-900">
              La registrazione è approvata. Per farlo entrare davvero nel
              dispatcher devi spuntare anche il campo Attivo in Airtable.
            </p>
          </div>
        ) : null}

        {!approved ? (
          <div className="mt-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 p-5">
            <h2 className="text-lg font-black text-amber-950">
              Profilo in verifica
            </h2>
            <p className="mt-2 leading-7 font-semibold text-amber-900">
              Il profilo è stato ricevuto, ma non è ancora approvato. Non riceve
              lead finché non viene controllato manualmente.
            </p>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            label="Priorità manuale"
            value={partner['Priorita Invio'] || 'Auto'}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
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

        <div className="mt-8">
          <PartnerMap partner={partner} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <PartnerPanel>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">
                  storico operativo
                </p>
                <h2 className="mt-2 text-2xl font-black">Ultimi lead</h2>
              </div>
              <StatusPill tone="neutral">ultimi 20 collegati</StatusPill>
            </div>
            <div className="mt-5 grid gap-3">
              {data.leads.length ? (
                data.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4"
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
                      <StatusPill
                        tone={lead['Commissione Pagata'] ? 'green' : 'neutral'}
                      >
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
                <p className="rounded-[1.25rem] bg-slate-50 p-5 font-semibold text-slate-600">
                  Nessun lead collegato a questo profilo.
                </p>
              )}
            </div>
          </PartnerPanel>

          <div className="grid gap-6">
            <PartnerPanel>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">
                profilo
              </p>
              <h2 className="mt-2 text-2xl font-black">Operatività</h2>
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
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">
                standard ViaSOS
              </p>
              <h2 className="mt-2 text-2xl font-black">Regole rapide</h2>
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

function PartnerMap({ partner }: { partner: PartnerFields }) {
  const lat = partner['Latitudine Zona']
  const lng = partner['Longitudine Zona']
  const address = [
    partner['Indirizzo Fatturazione'],
    partner.Citta,
  ]
    .filter(Boolean)
    .join(', ')
  const query =
    typeof lat === 'number' && typeof lng === 'number'
      ? `${lat},${lng}`
      : address
  const mapUrl = query
    ? `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=13&output=embed`
    : ''

  return (
    <PartnerPanel className="overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="bg-[#07111f] p-6 text-white sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#25d366]">
            base operativa
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Posizione del carroattrezzi
          </h2>
          <p className="mt-4 text-base leading-7 font-semibold text-slate-300">
            La base operativa serve per calcolare copertura, distanza indicativa
            e compatibilità con i lead ricevuti nella zona.
          </p>
          <div className="mt-6 grid gap-3 text-sm">
            <div className="rounded-[1.25rem] bg-white/10 p-4">
              <p className="font-black text-slate-400">Indirizzo</p>
              <p className="mt-1 font-black">{address || 'Non indicato'}</p>
            </div>
            <div className="rounded-[1.25rem] bg-white/10 p-4">
              <p className="font-black text-slate-400">Copertura</p>
              <p className="mt-1 font-black">
                {partner['Copertura KM']
                  ? `${partner['Copertura KM']} km`
                  : 'Non indicata'}
              </p>
            </div>
          </div>
        </div>
        <div className="relative min-h-[360px] bg-slate-100 lg:min-h-[430px]">
          {mapUrl ? (
            <iframe
              title="Mappa base operativa carroattrezzi"
              src={mapUrl}
              className="absolute inset-0 size-full border-0 grayscale-[10%] saturate-[1.08]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,#e8f2fb,#f8fbff)] p-8 text-center">
              <p className="max-w-md text-lg font-black text-slate-700">
                Inserisci indirizzo o coordinate su Airtable per vedere la mappa
                operativa.
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0,transparent_110px,rgba(7,17,31,0.12)_111px,rgba(7,17,31,0.2)_100%)]" />
          {mapUrl ? (
            <div className="pointer-events-none absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center">
              <span className="absolute size-24 rounded-full border-2 border-[#25d366]/55 animate-[viasos-scan_2.6s_ease-out_infinite]" />
              <span className="absolute size-16 rounded-full bg-[#25d366]/20 blur-md" />
              <span className="relative grid size-11 place-items-center rounded-full bg-[#25d366] shadow-2xl shadow-emerald-950/35 ring-8 ring-white/80">
                <span className="size-3 rounded-full bg-[#07111f]" />
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </PartnerPanel>
  )
}

function calculatePartnerScore(partner: PartnerFields) {
  const available = partner['Sono Disponibile Totali'] || 0
  const notClosed = partner['Disponibili Non Conclusi'] || 0
  const paid = partner['Commissioni Pagate'] || 0
  const unpaid = partner['Commissioni Non Pagate'] || 0
  const reminders = partner['Reminder Pagamento Totali'] || 0
  const manualPriority = partner['Priorita Invio']

  const availability = Math.min(100, 55 + available * 6)
  const completion =
    available === 0 ? 70 : Math.max(15, Math.round(100 - (notClosed / available) * 100))
  const paymentBase =
    paid + unpaid === 0 ? 82 : Math.round((paid / Math.max(1, paid + unpaid)) * 100)
  const reminderPenalty = Math.min(45, reminders * 5)
  const payment = Math.max(20, paymentBase - reminderPenalty)
  const priorityBonus =
    typeof manualPriority === 'number' && manualPriority > 0
      ? Math.max(0, 12 - manualPriority * 2)
      : 0

  const total = Math.max(
    1,
    Math.min(
      100,
      Math.round(
        availability * 0.28 +
          completion * 0.32 +
          payment * 0.34 +
          priorityBonus,
      ),
    ),
  )

  return { total, availability: Math.round(availability), completion, payment }
}

function ScoreTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 text-white">
      <p className="text-sm font-black text-slate-300">{label}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-[#25d366]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
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
