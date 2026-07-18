'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

import {
  PartnerBadge,
  PartnerPanel,
  PartnerShell,
  StatusPill,
} from '@/components/viasos/partner-shell'
import { partnerRequest } from '@/lib/partner-api'

type FormState = {
  businessName: string
  contactName: string
  phone: string
  email: string
  password: string
  passwordConfirm: string
  city: string
  address: string
  coverageKm: string
  highwayEnabled: boolean
  vatNumber: string
  taxCode: string
  sdi: string
  pec: string
  accepted: boolean
}

const initialState: FormState = {
  businessName: '',
  contactName: '',
  phone: '',
  email: '',
  password: '',
  passwordConfirm: '',
  city: '',
  address: '',
  coverageKm: '30',
  highwayEnabled: false,
  vatNumber: '',
  taxCode: '',
  sdi: '',
  pec: '',
  accepted: false,
}

export default function PartnerRegistration() {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>(
    'idle',
  )
  const [message, setMessage] = useState('')
  const [conditionsOpen, setConditionsOpen] = useState(false)
  const [conditionsViewed, setConditionsViewed] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    if (!form.accepted) {
      setStatus('error')
      setMessage('Accetta le condizioni partner per inviare la candidatura.')
      return
    }

    if (form.password.length < 8) {
      setStatus('error')
      setMessage('La password deve contenere almeno 8 caratteri.')
      return
    }

    if (form.password !== form.passwordConfirm) {
      setStatus('error')
      setMessage('Le due password non coincidono.')
      return
    }

    try {
      await partnerRequest('viasos-partner-register', form)
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Non è stato possibile inviare la richiesta.',
      )
      return
    }

    setStatus('success')
    setMessage(
      'Registrazione ricevuta. Ti contatteremo per completare l’attivazione del profilo partner.',
    )
    setForm(initialState)
    setConditionsViewed(false)
  }

  return (
    <PartnerShell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-14">
        <div>
          <PartnerBadge>Registrazione partner</PartnerBadge>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
            Candidatura carroattrezzi ViaSOS
          </h1>
          <p className="mt-5 text-lg leading-8 font-semibold text-slate-700">
            Raccontaci dove lavori e quali interventi puoi gestire. Dopo l’invio
            ti ricontatteremo per completare l’attivazione in modo chiaro e ordinato.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              'Richieste coerenti con la tua zona operativa',
              'Numero WhatsApp usato per il contatto di lavoro',
              'Password personale per proteggere l’accesso',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/80 bg-white/90 p-4 font-bold text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
        <PartnerPanel>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-black">Dati partner</h2>
            {status === 'success' ? <StatusPill tone="green">Richiesta inviata</StatusPill> : null}
          </div>
          <form className="grid gap-5" onSubmit={submit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nome attività" required>
                <input
                  value={form.businessName}
                  onChange={(event) => update('businessName', event.target.value)}
                  className="partner-input"
                  required
                />
              </Field>
              <Field label="Nome referente" required>
                <input
                  value={form.contactName}
                  onChange={(event) => update('contactName', event.target.value)}
                  className="partner-input"
                  required
                />
              </Field>
              <Field label="WhatsApp operativo" required>
                <input
                  value={form.phone}
                  onChange={(event) => update('phone', event.target.value)}
                  className="partner-input"
                  inputMode="tel"
                  placeholder="+39"
                  required
                />
              </Field>
              <Field label="Email" required>
                <input
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  className="partner-input"
                  type="email"
                  required
                />
              </Field>
              <Field label="Password" required>
                <input
                  value={form.password}
                  onChange={(event) => update('password', event.target.value)}
                  className="partner-input"
                  type="password"
                  minLength={8}
                  required
                />
              </Field>
              <Field label="Conferma password" required>
                <input
                  value={form.passwordConfirm}
                  onChange={(event) => update('passwordConfirm', event.target.value)}
                  className="partner-input"
                  type="password"
                  minLength={8}
                  required
                />
              </Field>
              <Field label="Città principale" required>
                <input
                  value={form.city}
                  onChange={(event) => update('city', event.target.value)}
                  className="partner-input"
                  required
                />
              </Field>
              <Field label="Indirizzo/base operativa" required>
                <input
                  value={form.address}
                  onChange={(event) => update('address', event.target.value)}
                  className="partner-input"
                  required
                />
              </Field>
              <Field label="Raggio operativo indicativo">
                <select
                  value={form.coverageKm}
                  onChange={(event) => update('coverageKm', event.target.value)}
                  className="partner-input"
                >
                  <option value="20">20 km</option>
                  <option value="30">30 km</option>
                  <option value="50">50 km</option>
                  <option value="80">80 km</option>
                </select>
              </Field>
              <Field label="Interventi in autostrada">
                <label className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.highwayEnabled}
                    onChange={(event) =>
                      update('highwayEnabled', event.target.checked)
                    }
                    className="size-5"
                  />
                  Sì, posso intervenire
                </label>
              </Field>
            </div>
            <div className="border-t border-slate-200 pt-5">
              <h3 className="font-black">Dati fiscali</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Puoi completarli anche dopo, ma se li inserisci ora la gestione è
                più ordinata.
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Partita IVA">
                  <input
                    value={form.vatNumber}
                    onChange={(event) => update('vatNumber', event.target.value)}
                    className="partner-input"
                  />
                </Field>
                <Field label="Codice fiscale">
                  <input
                    value={form.taxCode}
                    onChange={(event) => update('taxCode', event.target.value)}
                    className="partner-input"
                  />
                </Field>
                <Field label="Codice SDI">
                  <input
                    value={form.sdi}
                    onChange={(event) => update('sdi', event.target.value)}
                    className="partner-input"
                  />
                </Field>
                <Field label="PEC">
                  <input
                    value={form.pec}
                    onChange={(event) => update('pec', event.target.value)}
                    className="partner-input"
                    type="email"
                  />
                </Field>
              </div>
            </div>
            <fieldset className="rounded-[1.75rem] border border-slate-200 bg-[#f8fbff] p-5 sm:p-6">
              <legend className="px-2 text-lg font-black text-slate-950">
                Condizioni per entrare nella rete ViaSOS
              </legend>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
                Prima di inviare la candidatura devi leggere e accettare le condizioni che regolano il rapporto tra ViaSOS, il partner e il cliente.
              </p>
              <button
                type="button"
                onClick={() => setConditionsOpen(true)}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#07111f] px-5 py-3 text-sm font-black text-white transition hover:bg-[#123456]"
              >
                {conditionsViewed ? 'Condizioni già consultate' : 'Apri e leggi le condizioni'}
              </button>
              {conditionsViewed ? (
                <p className="mt-3 text-sm font-black text-[#075e54]">✓ Puoi procedere con l’accettazione.</p>
              ) : null}
              <label className="mt-6 flex cursor-pointer gap-3 rounded-2xl border border-emerald-200 bg-white p-4 text-sm font-black leading-6 text-slate-800 shadow-sm">
                <input
                  type="checkbox"
                  checked={form.accepted}
                  onChange={(event) => update('accepted', event.target.checked)}
                  className="mt-1 size-5 shrink-0 accent-[#075e54]"
                  disabled={!conditionsViewed}
                  required
                />
                <span>
                  Ho letto e accetto le condizioni partner. Confermo inoltre che i dati inseriti sono corretti e autorizzo ViaSOS a contattarmi per la verifica e l’attivazione del profilo.
                </span>
              </label>
            </fieldset>
            {conditionsOpen ? (
              <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07111f]/70 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="partner-conditions-title">
                <div className="relative my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/30 sm:max-h-[calc(100dvh-3rem)] sm:p-9">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Lettura obbligatoria</p>
                      <h3 id="partner-conditions-title" className="mt-2 text-3xl font-black leading-tight text-slate-950">Condizioni partner ViaSOS</h3>
                    </div>
                    <button type="button" onClick={() => setConditionsOpen(false)} className="rounded-full px-3 py-2 text-sm font-black text-slate-500 hover:bg-slate-100 hover:text-slate-950" aria-label="Chiudi condizioni">Chiudi</button>
                  </div>
                  <div className="mt-7 grid gap-5 text-base font-semibold leading-7 text-slate-600">
                    <p><strong className="text-slate-950">ViaSOS opera esclusivamente come generatore e smistatore di richieste.</strong> Non esegue il soccorso stradale e non diventa parte del rapporto tra il cliente e il carroattrezzi.</p>
                    <p>Dal momento in cui accetti una richiesta, <strong className="text-slate-950">sei tu il responsabile dell’intervento assegnato</strong>: contatto con il cliente, prezzo, tempi, mezzo utilizzato, modalità operative, sicurezza, autorizzazioni, assicurazioni e corretta esecuzione del servizio.</p>
                    <p>ViaSOS non risponde di danni, ritardi, mancati interventi, disservizi, contestazioni, costi, incidenti o qualsiasi altra conseguenza relativa al servizio svolto dal carroattrezzi. <strong className="text-slate-950">Ogni responsabilità resta a carico dell’operatore che prende in carico il cliente.</strong></p>
                    <p>I dati e le dichiarazioni forniti devono essere completi e veritieri. In caso di informazioni false, disponibilità dichiarate senza fondamento o comportamenti scorretti, ViaSOS potrà sospendere il profilo, interrompere l’invio delle richieste e <strong className="text-slate-950">valutare le opportune azioni legali</strong> a tutela del cliente e della rete.</p>
                  </div>
                  <button type="button" onClick={() => { setConditionsViewed(true); setConditionsOpen(false) }} className="mt-8 w-full rounded-full bg-[#075e54] px-6 py-4 text-base font-black text-white transition hover:bg-[#06483f]">Ho letto le condizioni e voglio accettarle</button>
                </div>
              </div>
            ) : null}
            {message ? (
              <p
                className={
                  status === 'success'
                    ? 'rounded-2xl bg-emerald-50 p-4 font-bold text-emerald-800'
                    : 'rounded-2xl bg-red-50 p-4 font-bold text-red-800'
                }
              >
                {message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-full bg-[#07111f] px-6 py-4 text-base font-black text-white transition hover:bg-[#123456] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'loading'
                ? 'Invio in corso'
                : 'Invia candidatura partner'}
            </button>
          </form>
        </PartnerPanel>
      </section>
    </PartnerShell>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      <span>
        {label}
        {required ? <span className="text-[#075e54]"> *</span> : null}
      </span>
      {children}
    </label>
  )
}

