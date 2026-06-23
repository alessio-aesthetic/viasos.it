'use client'

import { useEffect, useMemo, useState } from 'react'

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

const problems = [
  {
    value: 'Batteria scarica',
    title: 'Batteria scarica',
    icon: '▣',
    text: 'Il veicolo non si avvia o il quadro resta spento.',
  },
  {
    value: 'Gomma forata',
    title: 'Gomma a terra',
    icon: '◉',
    text: 'Pneumatico danneggiato, ruota bloccata o impossibilità di ripartire.',
  },
  {
    value: 'Guasto meccanico',
    title: 'Problema meccanico',
    icon: '▰',
    text: 'Motore fermo, spie accese, perdita o rumore improvviso.',
  },
  {
    value: 'Incidente',
    title: 'Incidente',
    icon: '⚡',
    text: 'Veicolo danneggiato o non più sicuro da spostare.',
  },
  {
    value: 'Veicolo bloccato',
    title: 'Bloccato',
    icon: '⌁',
    text: 'Auto, moto o furgone fermo in parcheggio, cortile o strada.',
  },
  {
    value: 'Carburante esaurito',
    title: 'Serbatoio a secco',
    icon: '◇',
    text: 'Carburante finito o errore di rifornimento.',
  },
]

const vehicles = ['Auto', 'Moto o scooter', 'Furgone', 'SUV o 4x4', 'Camper', 'Altro']
const fuels = ['Benzina', 'Diesel', 'GPL', 'Metano', 'Elettrica', 'Ibrida', 'Non lo so']

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

  const cleanPhone = useMemo(
    () => customerPhone.replace(/[^\d+]/g, ''),
    [customerPhone],
  )
  const mapsLink = coordinates
    ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
    : ''

  const assistantMessages = [
    'Ti guido passo dopo passo.',
    'Scegli il problema del veicolo.',
    'Aggiungi posizione e telefono.',
    'Prepariamo una richiesta chiara per il carroattrezzi.',
  ]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setAssistantIndex((current) => (current + 1) % assistantMessages.length)
    }, 2600)

    return () => window.clearInterval(interval)
  }, [assistantMessages.length])

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
    <main className="min-h-screen overflow-hidden bg-[#101b31] text-slate-950">
      <div className="fixed inset-0 bg-[linear-gradient(90deg,rgba(10,40,80,0.82),rgba(125,0,54,0.78)),url('/images/hero-road.webp')] bg-cover bg-center" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(14,165,233,0.32),transparent_28%),radial-gradient(circle_at_86%_20%,rgba(244,63,94,0.36),transparent_32%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-6 sm:px-6 lg:px-8">
        <section className="mx-auto w-full overflow-hidden rounded-[1.15rem] bg-white shadow-[0_34px_110px_rgba(0,0,0,0.42)]">
          <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sm:px-10">
            <a href="/carroattrezzi-brescia" className="text-3xl font-black tracking-tight text-[#0b4a8f]">
              Via<span className="text-[#d5004d]">SOS</span>
            </a>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${tel}`}
                onClick={trackCall}
                className="hidden rounded-xl border-2 border-[#0b4a8f] px-4 py-2 text-sm font-black text-[#0b4a8f] sm:inline-flex"
              >
                {phone}
              </a>
              <span className="flex size-11 items-center justify-center rounded-xl border-2 border-[#0b4a8f] text-2xl font-black text-[#0b4a8f]">
                ≡
              </span>
            </div>
          </header>

          <div className="px-6 pb-8 pt-4 sm:px-10 sm:pb-12">
            <div className="flex items-start gap-3">
              <div className="relative mt-1 flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-[#0b4a8f] bg-[#e8f4ff] shadow-lg">
                <span className="text-3xl">◔</span>
                <span className="absolute -right-1 -top-1 size-4 rounded-full bg-[#d5004d]" />
              </div>
              <div className="relative min-h-14 flex-1 rounded-[1.3rem] border-2 border-[#0b4a8f] px-5 py-3 text-base font-bold text-[#0b4a8f] sm:text-lg">
                <span className="absolute -left-3 top-5 size-5 rotate-45 border-b-2 border-l-2 border-[#0b4a8f] bg-white" />
                <span className="inline-block animate-[fadeMessage_2.6s_ease-in-out_infinite]">
                  {assistantMessages[assistantIndex]}
                </span>
              </div>
            </div>

            <div className="mx-auto mt-8 max-w-3xl">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-slate-200" />
                <div
                  className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-[#0b4a8f] transition-all duration-500"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
                {[0, 1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`relative z-10 flex size-9 items-center justify-center rounded-full border-2 text-sm font-black ${
                      item <= step
                        ? 'border-[#0b4a8f] bg-[#0b4a8f] text-white shadow-lg shadow-blue-950/20'
                        : 'border-slate-300 bg-white text-slate-400'
                    }`}
                  >
                    {item + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              {step === 0 && (
                <div>
                  <h1 className="text-2xl font-black text-[#0b4a8f] sm:text-3xl">
                    Qual è il problema del veicolo?
                  </h1>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {problems.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => selectProblem(item.value)}
                        className="group min-h-32 rounded-md bg-[#d5004d] p-5 text-center text-white shadow-[0_10px_24px_rgba(75,0,32,0.26)] transition hover:-translate-y-1 hover:bg-[#b90043]"
                      >
                        <span className="block text-5xl font-black leading-none opacity-80">
                          {item.icon}
                        </span>
                        <span className="mt-3 block text-xl font-black">
                          {item.title}
                        </span>
                        <span className="mx-auto mt-2 block max-w-xs text-sm font-semibold leading-5 text-pink-50 opacity-0 transition group-hover:opacity-100">
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="mx-auto max-w-3xl">
                  <h1 className="text-2xl font-black text-[#0b4a8f] sm:text-3xl">
                    Completa le informazioni sul veicolo
                  </h1>
                  <div className="mt-6 grid gap-5">
                    <label className="grid gap-2">
                      <span className="text-sm font-black uppercase tracking-[0.12em] text-[#d5004d]">
                        Tipo di veicolo
                      </span>
                      <select
                        value={vehicle}
                        onChange={(event) => setVehicle(event.target.value)}
                        className="h-14 rounded-md border border-slate-300 bg-white px-4 text-lg font-bold outline-none focus:border-[#0b4a8f] focus:ring-4 focus:ring-blue-100"
                      >
                        <option value="">Seleziona</option>
                        {vehicles.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm font-black uppercase tracking-[0.12em] text-[#d5004d]">
                        Tipo di carburante
                      </span>
                      <select
                        value={fuel}
                        onChange={(event) => setFuel(event.target.value)}
                        className="h-14 rounded-md border border-slate-300 bg-white px-4 text-lg font-bold outline-none focus:border-[#0b4a8f] focus:ring-4 focus:ring-blue-100"
                      >
                        <option value="">Seleziona</option>
                        {fuels.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="mx-auto max-w-3xl">
                  <h1 className="text-2xl font-black text-[#0b4a8f] sm:text-3xl">
                    Dove si trova il veicolo?
                  </h1>
                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <button
                      type="button"
                      onClick={detectPosition}
                      disabled={status === 'loading'}
                      className="w-full rounded-md bg-[#0b4a8f] px-5 py-4 text-lg font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-[#083a73] disabled:opacity-70"
                    >
                      {status === 'loading'
                        ? 'Rilevamento in corso...'
                        : 'Usa la mia posizione'}
                    </button>
                    {mapsLink && (
                      <p className="mt-4 rounded-lg bg-white p-3 text-sm font-bold text-[#0b4a8f]">
                        Posizione acquisita. Il link Google Maps verrà inviato
                        con la richiesta.
                      </p>
                    )}
                  </div>
                  <fieldset className="mt-5">
                    <legend className="text-sm font-black uppercase tracking-[0.12em] text-[#d5004d]">
                      Ti trovi in autostrada?
                    </legend>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      {[
                        ['No', 'No'],
                        ['Sì', 'Sì'],
                      ].map(([value, label]) => (
                        <label
                          key={value}
                          className={`cursor-pointer rounded-md border px-5 py-4 text-center text-lg font-black transition ${
                            highway === value
                              ? 'border-[#0b4a8f] bg-[#0b4a8f] text-white'
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
                <div className="mx-auto max-w-3xl">
                  <h1 className="text-2xl font-black text-[#0b4a8f] sm:text-3xl">
                    Ultimo passaggio: telefono
                  </h1>
                  <div className="mt-6 grid gap-5">
                    <label className="grid gap-2">
                      <span className="text-sm font-black uppercase tracking-[0.12em] text-[#d5004d]">
                        Numero di telefono
                      </span>
                      <input
                        value={customerPhone}
                        onChange={(event) => setCustomerPhone(event.target.value)}
                        inputMode="tel"
                        placeholder="Es. 333 123 4567"
                        className="h-14 rounded-md border border-slate-300 bg-white px-4 text-lg font-bold outline-none focus:border-[#0b4a8f] focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-sm font-black uppercase tracking-[0.12em] text-[#d5004d]">
                        Note facoltative
                      </span>
                      <textarea
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                        placeholder="Esempio: uscita autostrada, parcheggio, destinazione preferita..."
                        className="min-h-28 rounded-md border border-slate-300 bg-white px-4 py-3 text-base font-bold outline-none focus:border-[#0b4a8f] focus:ring-4 focus:ring-blue-100"
                      />
                    </label>
                  </div>
                </div>
              )}

              {message && (
                <p
                  className={`mx-auto mt-5 max-w-3xl rounded-lg px-4 py-3 text-sm font-bold ${
                    status === 'success'
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'bg-amber-50 text-amber-900'
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="mx-auto mt-7 flex max-w-3xl gap-3">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-md border border-slate-300 bg-white px-5 py-4 text-base font-black text-slate-700"
                  >
                    Indietro
                  </button>
                )}
                {step === 1 && (
                  <button
                    type="button"
                    onClick={continueFromVehicle}
                    className="flex-1 rounded-md bg-[#d5004d] px-6 py-4 text-lg font-black text-white shadow-lg shadow-pink-950/20"
                  >
                    Continua →
                  </button>
                )}
                {step === 2 && (
                  <button
                    type="button"
                    onClick={continueFromLocation}
                    className="flex-1 rounded-md bg-[#d5004d] px-6 py-4 text-lg font-black text-white shadow-lg shadow-pink-950/20"
                  >
                    Continua →
                  </button>
                )}
                {step === 3 && (
                  <button
                    type="button"
                    onClick={submitRequest}
                    disabled={status === 'loading'}
                    className="flex-1 rounded-md bg-[#d5004d] px-6 py-4 text-lg font-black text-white shadow-lg shadow-pink-950/20 disabled:opacity-70"
                  >
                    {status === 'loading'
                      ? 'Invio in corso...'
                      : 'Invia richiesta'}
                  </button>
                )}
              </div>

              <div className="mx-auto mt-6 max-w-3xl rounded-lg bg-[#fff5d6] p-4 text-center text-sm font-black text-[#172554]">
                Preferisci parlare subito?{' '}
                <a
                  href={`tel:${tel}`}
                  onClick={trackCall}
                  className="text-[#d5004d] underline"
                >
                  Chiama ora {phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <a
        href={`tel:${tel}`}
        onClick={trackCall}
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl bg-[#ffcc00] px-4 py-4 text-center text-base font-black text-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.36)] md:hidden"
      >
        📞 Chiama Ora - Risposta Immediata
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
      `}</style>
    </main>
  )
}
