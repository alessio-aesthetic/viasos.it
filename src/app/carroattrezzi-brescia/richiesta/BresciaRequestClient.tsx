'use client'

import { useEffect, useMemo, useState } from 'react'
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

const phone = '030 204 1794'
const tel = '+390302041794'
const webhookFallback =
  'https://alessiothrasos.app.n8n.cloud/webhook/viasos-brescia'

const trackingKeys = [
  'gclid',
  'utm_source',
  'utm_campaign',
  'utm_term',
  'utm_medium',
] as const

type TrackingKey = (typeof trackingKeys)[number]
type TrackingData = Record<TrackingKey, string>
type Step = 0 | 1 | 2 | 3
type Status = 'idle' | 'loading' | 'success' | 'error'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string
        background?: string
        speed?: string
        loop?: boolean
        autoplay?: boolean
      }
    }
  }
}

const problems = [
  {
    value: 'Batteria scarica',
    title: 'Batteria scarica',
    lottie: '/lottie/brescia-request/batteria.json',
  },
  {
    value: 'Gomma forata',
    title: 'Gomma danneggiata',
    lottie: '/lottie/brescia-request/gomme.json',
  },
  {
    value: 'Guasto meccanico',
    title: 'Auto in panne',
    lottie: '/lottie/brescia-request/auto-rotta.json',
  },
  {
    value: 'Incidente',
    title: 'Incidente',
    lottie: '/lottie/brescia-request/incidente.json',
  },
  {
    value: 'Veicolo bloccato',
    title: 'Auto bloccata',
    lottie: '/lottie/brescia-request/auto-bloccata.json',
  },
  {
    value: 'Carburante esaurito',
    title: 'Senza benzina',
    lottie: '/lottie/brescia-request/senza-benzina.json',
  },
]

const vehicles = ['Auto', 'Moto o scooter', 'Furgone', 'SUV o 4x4', 'Camper', 'Altro']
const fuels = ['Benzina', 'Diesel', 'GPL', 'Metano', 'Elettrica', 'Ibrida', 'Non lo so']

const assistantMessages = [
  'Scegli il problema: preparo il percorso più rapido.',
  'Aggiungi mezzo e carburante: evitiamo domande inutili.',
  'Con il GPS il carroattrezzi capisce subito dove sei.',
  'Lascia il telefono: inviamo una richiesta completa e chiara.',
]

const stepCopy = [
  { eyebrow: 'diagnosi iniziale', title: 'Cosa è successo al veicolo?' },
  { eyebrow: 'mezzo', title: 'Che veicolo dobbiamo recuperare?' },
  { eyebrow: 'posizione', title: 'Rileviamo la posizione.' },
  { eyebrow: 'contatto', title: 'Dove ti richiamiamo?' },
] as const

function emptyTracking(): TrackingData {
  return trackingKeys.reduce((acc, key) => {
    acc[key] = ''
    return acc
  }, {} as TrackingData)
}

function trackCall() {
  console.log('conversione_click_telefono_brescia_richiesta')
}

function trackLead() {
  console.log('conversione_invio_richiesta_brescia')
}

function LottieAsset({
  src,
  className = '',
}: {
  src: string
  className?: string
}) {
  useEffect(() => {
    void import('@lottiefiles/lottie-player')
  }, [])

  return (
    <lottie-player
      src={src}
      background="transparent"
      speed="1"
      loop
      autoplay
      className={`block ${className}`}
      aria-hidden="true"
    />
  )
}

export function BresciaRequestClient() {
  const [step, setStep] = useState<Step>(0)
  const [problem, setProblem] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [fuel, setFuel] = useState('')
  const [highway, setHighway] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [tracking, setTracking] = useState<TrackingData>(emptyTracking)
  const [assistantIndex, setAssistantIndex] = useState(0)
  const [typedAssistant, setTypedAssistant] = useState('')

  const cleanPhone = useMemo(
    () => customerPhone.replace(/[^\d+]/g, ''),
    [customerPhone],
  )
  const mapsLink = coordinates
    ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
    : ''

  useEffect(() => {
    const interval = window.setInterval(() => {
      setAssistantIndex((current) => (current + 1) % assistantMessages.length)
    }, 4200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const fullText = assistantMessages[assistantIndex]
    setTypedAssistant('')
    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setTypedAssistant(fullText.slice(0, index))
      if (index >= fullText.length) window.clearInterval(interval)
    }, 24)

    return () => window.clearInterval(interval)
  }, [assistantIndex])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const saved = emptyTracking()

    trackingKeys.forEach((key) => {
      const value = params.get(key) || window.localStorage.getItem(`ads_${key}`)
      if (value) {
        saved[key] = value
        window.localStorage.setItem(`ads_${key}`, value)
      }
    })

    setTracking(saved)
  }, [])

  function goBack() {
    setStatus('idle')
    setMessage('')
    setStep((current) => Math.max(0, current - 1) as Step)
  }

  function selectProblem(value: string) {
    setProblem(value)
    setStatus('idle')
    setMessage('')
    setStep(1)
  }

  function continueFromVehicle() {
    if (!vehicle || !fuel) {
      setStatus('error')
      setMessage('Seleziona tipo di veicolo e carburante.')
      return
    }

    setStatus('idle')
    setMessage('')
    setStep(2)
  }

  function detectPosition() {
    if (!navigator.geolocation) {
      setStatus('error')
      setMessage('Il browser non supporta la posizione. Puoi chiamare subito.')
      return
    }

    setStatus('loading')
    setMessage('Rilevamento posizione in corso...')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setStatus('success')
        setMessage('Posizione rilevata. Puoi continuare.')
      },
      () => {
        setStatus('error')
        setMessage('Posizione non concessa. Riprova o chiama direttamente.')
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  function continueFromLocation() {
    if (!highway) {
      setStatus('error')
      setMessage('Indica se ti trovi in autostrada.')
      return
    }

    if (!coordinates) {
      setStatus('error')
      setMessage('Usa il pulsante posizione prima di continuare.')
      return
    }

    setStatus('idle')
    setMessage('')
    setStep(3)
  }

  async function submitRequest() {
    if (cleanPhone.replace(/[^\d]/g, '').length < 8) {
      setStatus('error')
      setMessage('Inserisci un numero di telefono valido.')
      return
    }

    if (!coordinates) {
      setStatus('error')
      setMessage('Manca la posizione del veicolo.')
      setStep(2)
      return
    }

    setStatus('loading')
    setMessage('Invio richiesta in corso...')

    const payload = {
      telefono_cliente: cleanPhone,
      telefono_centrale: phone,
      latitudine: coordinates.latitude,
      longitudine: coordinates.longitude,
      google_maps_link: mapsLink,
      citta: 'Brescia',
      mezzo: vehicle,
      carburante: fuel,
      problema: problem,
      autostrada: highway,
      note: notes,
      sorgente: 'google_ads_landing_step_form',
      pagina: '/carroattrezzi-brescia/richiesta',
      timestamp: new Date().toISOString(),
      ...tracking,
    }

    try {
      const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || webhookFallback
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      trackLead()
      setStatus('success')
      setMessage(
        'Richiesta inviata. Tieni il telefono libero: ti ricontatteremo rapidamente.',
      )
    } catch {
      setStatus('error')
      setMessage('Invio non riuscito. Chiama ora il numero indicato.')
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-slate-950">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(245,158,11,0.20),transparent_28%),linear-gradient(135deg,#07111f_0%,#0f2742_44%,#042f2e_100%)]" />
      <div className="fixed inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1800px] items-stretch px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <section className="mx-auto grid min-h-[calc(100vh-1rem)] w-full overflow-hidden rounded-[1.4rem] border border-white/25 bg-white/94 shadow-[0_34px_120px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl sm:rounded-[2rem] lg:min-h-[calc(100vh-3rem)] lg:grid-cols-[0.34fr_0.66fr]">
          <aside className="relative overflow-hidden bg-[#07111f] p-2 text-white sm:p-6 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(45,212,191,0.32),transparent_32%),radial-gradient(circle_at_100%_22%,rgba(255,204,0,0.20),transparent_28%)]" />
            <div className="relative flex h-full flex-col">
              <a
                href="/carroattrezzi-brescia"
                className="text-xl font-black tracking-tight sm:text-3xl"
              >
                Via<span className="text-[#2dd4bf]">SOS</span>
              </a>

              <div className="mt-2 rounded-[1rem] border border-white/15 bg-white/10 p-2 shadow-2xl shadow-black/20 sm:mt-8 sm:rounded-[1.6rem] sm:p-5">
                <div className="flex items-center gap-2 sm:items-start sm:gap-4">
                  <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/8 sm:size-28 sm:rounded-2xl lg:size-36">
                    <LottieAsset
                      src="/lottie/brescia-request/uomo-sopra.json"
                      className="h-14 w-14 sm:h-28 sm:w-28 lg:h-36 lg:w-36"
                    />
                  </div>
                  <div>
                    <p className="min-h-10 text-[13px] font-black leading-tight text-white sm:min-h-20 sm:text-xl">
                      <span className="typing-text">
                        {typedAssistant}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 sm:mt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-teal-100 sm:text-xs">
                  avanzamento
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1.5 sm:mt-3 sm:block sm:space-y-2">
                  {['Problema', 'Veicolo', 'Posizione', 'Telefono'].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`flex flex-col items-center gap-1 rounded-xl border p-1.5 text-center transition sm:flex-row sm:gap-2 sm:p-2 sm:text-left ${
                          index <= step
                            ? 'border-[#2dd4bf]/50 bg-[#2dd4bf]/12'
                            : 'border-white/10 bg-white/[0.04]'
                        }`}
                      >
                        <span
                          className={`flex size-6 items-center justify-center rounded-lg text-[11px] font-black sm:size-7 sm:text-xs ${
                            index <= step
                              ? 'bg-[#2dd4bf] text-[#07111f]'
                              : 'bg-white/10 text-white/60'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-[10px] font-bold leading-tight sm:text-sm">{item}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-auto hidden pt-8 sm:block">
                <p className="text-sm font-semibold leading-6 text-slate-300">
                  Se preferisci parlare subito con una persona, chiama la
                  centrale Brescia.
                </p>
                <a
                  href={`tel:${tel}`}
                  onClick={trackCall}
                  className="mt-4 inline-flex w-full justify-center rounded-2xl bg-[#facc15] px-5 py-4 text-base font-black text-[#07111f] shadow-[0_20px_50px_rgba(250,204,21,0.26)]"
                >
                  Chiama ora {phone}
                </a>
              </div>
            </div>
          </aside>

          <div className="p-2 sm:p-7 lg:flex lg:min-h-full lg:flex-col lg:p-10">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0f766e] sm:text-sm">
                {stepCopy[step].eyebrow}
              </p>
              <h1 className="mt-1 text-xl font-black tracking-tight text-[#07111f] sm:mt-3 sm:text-5xl">
                {stepCopy[step].title}
              </h1>
            </div>

            <div className="mt-2 lg:flex-1 sm:mt-8">
              {step === 0 && (
                <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-3">
                  {problems.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => selectProblem(item.value)}
                      className="group relative min-h-28 overflow-hidden rounded-[0.9rem] border border-slate-200 bg-white p-1.5 text-left shadow-[0_14px_34px_rgba(15,23,42,0.10)] transition hover:-translate-y-1 hover:border-[#0f766e] hover:shadow-[0_28px_76px_rgba(15,118,110,0.18)] sm:min-h-64 sm:rounded-[1.6rem] sm:p-4"
                    >
                      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-teal-50 to-transparent" />
                      <div className="relative flex h-14 items-center justify-center rounded-[0.7rem] bg-[#f8fafc] sm:h-32 sm:rounded-[1.2rem]">
                        <LottieAsset
                          src={item.lottie}
                          className="h-14 w-14 sm:h-32 sm:w-32"
                        />
                      </div>
                      <h2 className="relative mt-1 text-xs font-black leading-tight text-[#07111f] sm:mt-4 sm:text-xl">
                        {item.title}
                      </h2>
                      <span className="relative mt-1 inline-flex text-[10px] font-black text-[#0f766e] sm:mt-4 sm:text-sm">
                        Continua
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="mx-auto grid max-w-4xl gap-5">
                  <PremiumSelect
                    label="Tipo di veicolo"
                    value={vehicle}
                    onChange={setVehicle}
                    options={vehicles}
                  />
                  <PremiumSelect
                    label="Tipo di carburante"
                    value={fuel}
                    onChange={setFuel}
                    options={fuels}
                  />
                  <div className="rounded-[1.2rem] border border-teal-100 bg-teal-50 p-4 text-sm font-bold leading-6 text-[#134e4a] sm:rounded-[1.4rem] sm:p-5">
                    Problema selezionato: <strong>{problem}</strong>. Questi
                    dettagli aiutano a evitare telefonate lunghe e indicazioni
                    ripetute.
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mx-auto max-w-4xl">
                  <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:rounded-[1.8rem] sm:p-7">
                    <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0f766e] sm:text-sm">
                          GPS preciso
                        </p>
                        <h2 className="mt-2 text-2xl font-black text-[#07111f] sm:mt-3 sm:text-3xl">
                          Condividi la posizione del veicolo.
                        </h2>
                      </div>
                      <div className="rounded-[1.2rem] bg-[#07111f] p-2 text-white shadow-2xl shadow-slate-950/20 sm:rounded-[1.4rem] sm:p-4">
                        <div className="grid h-28 place-items-center rounded-[1rem] border border-white/10 bg-white/5 sm:h-44">
                          <LottieAsset
                            src="/lottie/brescia-request/gps.json"
                            className="h-28 w-28 sm:h-44 sm:w-44"
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={detectPosition}
                      disabled={status === 'loading'}
                      className="mt-4 w-full rounded-2xl bg-[#0f766e] px-5 py-4 text-base font-black text-white shadow-[0_22px_54px_rgba(15,118,110,0.30)] transition hover:-translate-y-0.5 hover:bg-[#115e59] disabled:opacity-70 sm:mt-6 sm:py-5 sm:text-lg"
                    >
                      {status === 'loading'
                        ? 'Rilevamento in corso...'
                        : 'Rileva posizione GPS'}
                    </button>
                    {mapsLink && (
                      <p className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-800">
                        Posizione acquisita. Ora possiamo inviare un punto
                        preciso al carroattrezzi.
                      </p>
                    )}
                  </div>

                  <fieldset className="mt-4 rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:mt-5 sm:rounded-[1.8rem] sm:p-5">
                    <legend className="px-2 text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
                      Ti trovi in autostrada?
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {[
                        ['No', 'No'],
                        ['Sì', 'Sì'],
                      ].map(([value, label]) => (
                        <label
                          key={value}
                          className={`cursor-pointer rounded-2xl border px-5 py-4 text-center text-lg font-black transition ${
                            highway === value
                              ? 'border-[#0f766e] bg-[#0f766e] text-white shadow-[0_18px_44px_rgba(15,118,110,0.22)]'
                              : 'border-slate-300 bg-white text-slate-800'
                          }`}
                        >
                          <input
                            type="radio"
                            name="highway"
                            value={value}
                            checked={highway === value}
                            onChange={(event) => setHighway(event.target.value)}
                            className="sr-only"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 3 && (
                <div className="mx-auto grid max-w-4xl gap-5">
                  <label className="grid gap-2">
                    <span className="text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
                      Numero di telefono
                    </span>
                    <input
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      inputMode="tel"
                      placeholder="Es. 333 123 4567"
                      className="h-14 rounded-2xl border-2 border-slate-300 bg-white px-5 text-base font-black shadow-[0_18px_42px_rgba(15,23,42,0.12)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-100 sm:h-16 sm:text-lg"
                    />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
                      Note facoltative
                    </span>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Esempio: parcheggio supermercato, uscita autostrada, destinazione preferita..."
                      className="min-h-20 rounded-2xl border-2 border-slate-300 bg-white px-5 py-3 text-sm font-bold shadow-[0_18px_42px_rgba(15,23,42,0.12)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-100 sm:min-h-28 sm:py-4 sm:text-base"
                    />
                  </label>
                  <div className="rounded-[1.6rem] bg-[#07111f] p-5 text-white">
                    <p className="text-sm font-black uppercase tracking-[0.16em] text-[#facc15]">
                      riepilogo richiesta
                    </p>
                    <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-200 sm:grid-cols-2">
                      <span>Problema: {problem || '-'}</span>
                      <span>Mezzo: {vehicle || '-'}</span>
                      <span>Carburante: {fuel || '-'}</span>
                      <span>Autostrada: {highway || '-'}</span>
                    </div>
                  </div>
                </div>
              )}

              {message && (
                <p
                  className={`mx-auto mt-5 max-w-4xl rounded-2xl px-4 py-3 text-sm font-bold ${
                    status === 'success'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-amber-50 text-amber-900'
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mx-auto mt-7 flex max-w-4xl gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-2xl border border-slate-300 bg-white px-5 py-4 text-base font-black text-slate-700 shadow-sm"
                  >
                    Indietro
                  </button>
                )}
                {step === 1 && (
                  <PrimaryButton onClick={continueFromVehicle}>
                    Continua
                  </PrimaryButton>
                )}
                {step === 2 && (
                  <PrimaryButton onClick={continueFromLocation}>
                    Continua
                  </PrimaryButton>
                )}
                {step === 3 && (
                  <PrimaryButton
                    onClick={submitRequest}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading'
                      ? 'Invio in corso...'
                      : 'Invia richiesta completa'}
                  </PrimaryButton>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <a
        href={`tel:${tel}`}
        onClick={trackCall}
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl bg-[#facc15] px-4 py-4 text-center text-base font-black text-[#07111f] shadow-[0_20px_60px_rgba(0,0,0,0.36)] md:hidden"
      >
        Chiama Ora - Risposta Immediata
      </a>

      <style jsx global>{`
        @keyframes fadeMessage {
          0%,
          100% {
            opacity: 0.45;
            transform: translateY(2px);
          }
          20%,
          80% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .typing-text {
          display: inline-block;
          overflow: hidden;
          border-right: 0.16em solid rgba(250, 204, 21, 0.95);
          animation:
            fadeMessage 3.2s ease-in-out infinite,
            caretBlink 0.8s steps(1) infinite;
        }
        @keyframes caretBlink {
          0%,
          49% {
            border-color: rgba(250, 204, 21, 0.95);
          }
          50%,
          100% {
            border-color: transparent;
          }
        }
      `}</style>
    </main>
  )
}

function PremiumSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black uppercase tracking-[0.12em] text-[#0f766e]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-14 rounded-2xl border-2 border-slate-300 bg-white px-5 text-base font-black shadow-[0_18px_42px_rgba(15,23,42,0.12)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-100 sm:h-16 sm:text-lg"
      >
        <option value="">Seleziona</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  )
}

function PrimaryButton({
  children,
  onClick,
  disabled = false,
}: {
  children: ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex-1 rounded-2xl bg-[#0f766e] px-6 py-4 text-lg font-black text-white shadow-[0_22px_54px_rgba(15,118,110,0.28),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-8px_18px_rgba(19,78,74,0.25)] transition hover:-translate-y-0.5 hover:bg-[#115e59] disabled:opacity-70"
    >
      {children}
    </button>
  )
}



