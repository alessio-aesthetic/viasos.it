'use client'

import { useEffect, useMemo, useState } from 'react'

const trackingKeys = [
  'gclid',
  'utm_source',
  'utm_campaign',
  'utm_term',
  'utm_medium',
] as const

type TrackingKey = (typeof trackingKeys)[number]
type TrackingData = Record<TrackingKey, string>
type Status = 'idle' | 'loading' | 'success' | 'error'

const vehicleTypes = ['Auto', 'Moto o scooter', 'Furgone', 'SUV o 4x4', 'Altro']
const problems = [
  'Batteria scarica',
  'Guasto meccanico',
  'Gomma forata',
  'Incidente',
  'Carburante esaurito',
  'Altro',
]

const defaultWebhook =
  'https://alessiothrasos.app.n8n.cloud/webhook/viasos-brescia'
const phoneClickWebhookUrl =
  process.env.NEXT_PUBLIC_PHONE_CLICK_WEBHOOK_URL ||
  'https://alessiothrasos.app.n8n.cloud/webhook/click-telefono-carroattrezzi-bergamo'

function storeTracking(): TrackingData {
  return trackingKeys.reduce((acc, key) => {
    acc[key] =
      typeof window === 'undefined'
        ? ''
        : window.localStorage.getItem(`ads_${key}`) || ''
    return acc
  }, {} as TrackingData)
}

function trackSponsoredPhoneClick({
  city,
  page,
  phone,
  phoneLabel,
}: {
  city: string
  page: string
  phone: string
  phoneLabel: string
}) {
  if (typeof window === 'undefined') return

  const payload = {
    evento: 'click_telefono',
    fonte: 'sponsorizzata_landing',
    page_type: 'landing_lottie_ads',
    citta: city,
    pagina: page,
    telefono: phone,
    telefono_label: phoneLabel,
    url: window.location.href,
    dominio: window.location.hostname,
    user_agent: window.navigator.userAgent,
    timestamp: new Date().toISOString(),
    ...storeTracking(),
  }
  const body = JSON.stringify(payload)
  const blob = new Blob([body], { type: 'application/json' })

  if (!navigator.sendBeacon?.(phoneClickWebhookUrl, blob)) {
    void fetch(phoneClickWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {})
  }
}

function trackCall({
  phone,
  tel,
  city,
  page,
}: {
  phone: string
  tel: string
  city: string
  page: string
}) {
  console.log(`conversione_click_telefono_${city.toLowerCase()}`)
  trackSponsoredPhoneClick({
    city,
    page,
    phone: tel,
    phoneLabel: phone,
  })
  // Google Ads: inserisci qui eventuale evento gtag per click telefono.
}

function trackLead(city = 'Brescia') {
  console.log(`conversione_invio_posizione_${city.toLowerCase()}`)
  // Google Ads: inserisci qui eventuale evento gtag per invio posizione.
}

export function BresciaLandingClient({
  phone,
  tel,
  city = 'Brescia',
  pagePath = '/carroattrezzi-brescia',
}: {
  phone: string
  tel: string
  city?: string
  pagePath?: string
}) {
  const [customerPhone, setCustomerPhone] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [problem, setProblem] = useState('')
  const [highway, setHighway] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [tracking, setTracking] = useState<TrackingData>(() =>
    trackingKeys.reduce((acc, key) => {
      acc[key] = ''
      return acc
    }, {} as TrackingData),
  )

  const cleanPhone = useMemo(
    () => customerPhone.replace(/[^\d+]/g, ''),
    [customerPhone],
  )
  const telHref = `tel:${tel}`

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const saved = storeTracking()

    trackingKeys.forEach((key) => {
      const value = params.get(key)
      if (value) {
        window.localStorage.setItem(`ads_${key}`, value)
        saved[key] = value
      }
    })

    setTracking(saved)
  }, [])

  function callNow() {
    trackCall({ phone, tel, city, page: pagePath })
  }

  async function submitPosition() {
    if (cleanPhone.replace(/[^\d]/g, '').length < 8) {
      setStatus('error')
      setMessage('Inserisci un numero di telefono valido.')
      return
    }

    if (!vehicle || !problem || !highway) {
      setStatus('error')
      setMessage('Seleziona mezzo, problema e autostrada.')
      return
    }

    if (!navigator.geolocation) {
      setStatus('error')
      setMessage('Il browser non supporta la posizione. Chiama direttamente.')
      return
    }

    setStatus('loading')
    setMessage('Rilevamento posizione in corso...')

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitudine = position.coords.latitude
        const longitudine = position.coords.longitude
        const googleMapsLink = `https://www.google.com/maps?q=${latitudine},${longitudine}`

        const payload = {
          telefono_cliente: cleanPhone,
          telefono_centrale: phone,
          latitudine,
          longitudine,
          google_maps_link: googleMapsLink,
          citta: city,
          mezzo: vehicle,
          problema: problem,
          autostrada: highway,
          sorgente: 'google_ads_landing',
          pagina: pagePath,
          timestamp: new Date().toISOString(),
          ...tracking,
        }

        try {
          const webhook =
            process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || defaultWebhook

          await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })

          trackLead(city)
          setStatus('success')
          setMessage(
            'Richiesta inviata. Tieni il telefono libero: verrai ricontattato rapidamente.',
          )
        } catch {
          setStatus('error')
          setMessage(
            'Non siamo riusciti a inviare la richiesta. Chiama ora il numero indicato.',
          )
        }
      },
      () => {
        setStatus('error')
        setMessage(
          'Posizione non concessa. Puoi riprovare oppure chiamare direttamente.',
        )
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f8fb] pb-24 text-[#111827]">
      <header className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" className="text-2xl font-black tracking-tight">
            Via<span className="text-[#0f766e]">SOS</span>
          </a>
          <a
            href={telHref}
            onClick={callNow}
            className="hidden rounded-2xl bg-[#ffcc00] px-6 py-3 text-sm font-black text-slate-950 shadow-[0_14px_34px_rgba(255,204,0,0.34)] sm:inline-flex"
          >
            Chiama {phone}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0b1728]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(20,184,166,0.28),transparent_32%),radial-gradient(circle_at_88%_20%,rgba(255,204,0,0.24),transparent_28%),linear-gradient(135deg,#0b1728_0%,#10233f_54%,#042f2e_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:py-16">
          <div className="order-2 lg:order-1">
            <p className="inline-flex rounded-full border border-teal-200/30 bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-teal-100">
              Soccorso stradale {city}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              Carroattrezzi {city} 24 Ore
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg font-semibold leading-8 text-slate-200 sm:text-xl">
              <p>
                Auto ferma? Chiama subito oppure invia la posizione: ViaSOS
                aiuta a individuare il carroattrezzi disponibile più vicino a
                {city} e provincia.
              </p>
              <p>
                Il form raccoglie telefono, mezzo, problema e GPS: così il
                contatto è più rapido e la richiesta arriva già chiara.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:flex sm:items-center">
              <a
                href={telHref}
                onClick={callNow}
                className="call-pulse inline-flex w-full items-center justify-center rounded-2xl border-2 border-[#ffef99] bg-[#ffcc00] px-7 py-5 text-center text-lg font-black text-slate-950 shadow-[0_24px_64px_rgba(255,204,0,0.44),inset_0_-5px_0_rgba(120,53,15,0.22)] transition hover:-translate-y-0.5 sm:w-auto lg:px-9 lg:py-6 lg:text-2xl"
              >
                📞 Chiama Ora - Risposta Immediata
              </a>
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById('richiesta')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
                className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-black text-slate-950 shadow-[0_18px_46px_rgba(255,255,255,0.18)] transition hover:bg-slate-100 sm:w-auto"
              >
                Invia posizione dal form
              </button>
            </div>
            <div className="mt-6 inline-flex flex-col rounded-3xl border border-white/10 bg-white/[0.08] px-5 py-4 shadow-2xl backdrop-blur">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-teal-100">
                chiamata diretta
              </span>
              <span className="mt-1 text-3xl font-black text-[#ffcc00]">
                {phone}
              </span>
            </div>
          </div>

          <div
            id="richiesta"
            className="order-1 rounded-[2rem] border border-white/80 bg-linear-to-b from-white via-white to-teal-50 p-4 text-slate-950 shadow-[0_42px_100px_rgba(0,0,0,0.42),0_18px_50px_rgba(20,184,166,0.24),inset_0_1px_0_rgba(255,255,255,1)] ring-1 ring-teal-200/70 sm:p-7 lg:order-2"
          >
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#0f766e]">
              richiesta veloce
            </p>
            <h2 className="mt-3 text-3xl font-black">
              Compila il form: ti rispondiamo istantaneamente!
            </h2>
            <div className="relative mt-4 overflow-hidden rounded-[1.65rem] bg-[#0b1728] p-1 shadow-[0_24px_58px_rgba(15,23,42,0.32)]">
              <div className="relative rounded-[1.45rem] border border-white/15 bg-linear-to-br from-[#172554]/96 via-[#0f172a]/96 to-[#134e4a]/96 p-5">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ffcc00]">
                  priorità immediata
                </p>
                <p className="mt-2 text-xl font-black leading-tight text-white sm:text-2xl">
                  Inserendo la posizione nel form, riceverai rapidamente il
                  contatto del carroattrezzi più vicino, così da ridurre{' '}
                  <span className="text-[#ffcc00]">
                    costi e tempi di attesa in strada.
                  </span>
                </p>
              </div>
            </div>

            <label className="mt-4 block text-sm font-black">Telefono</label>
            <input
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              inputMode="tel"
              placeholder="Es. 333 123 4567"
              className="mt-2 w-full rounded-2xl border-2 border-slate-300 bg-white px-5 py-4 text-lg font-black shadow-[0_18px_42px_rgba(15,23,42,0.16)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-200"
            />

            <label className="mt-5 block text-sm font-black">
              Tipo di mezzo
            </label>
            <select
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
              className="mt-2 w-full rounded-2xl border-2 border-slate-300 bg-white px-5 py-4 text-lg font-black shadow-[0_18px_42px_rgba(15,23,42,0.16)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-200"
            >
              <option value="">Seleziona il mezzo</option>
              {vehicleTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label className="mt-5 block text-sm font-black">
              Problema principale
            </label>
            <select
              value={problem}
              onChange={(event) => setProblem(event.target.value)}
              className="mt-2 w-full rounded-2xl border-2 border-slate-300 bg-white px-5 py-4 text-lg font-black shadow-[0_18px_42px_rgba(15,23,42,0.16)] outline-none focus:border-[#0f766e] focus:ring-4 focus:ring-teal-200"
            >
              <option value="">Seleziona il problema</option>
              {problems.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <fieldset className="mt-5">
              <legend className="text-sm font-black">Sei in autostrada?</legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {[
                  ['no', 'No'],
                  ['si', 'Sì'],
                ].map(([value, label]) => (
                  <label
                    key={value}
                    className={`flex cursor-pointer items-center justify-center rounded-2xl border px-4 py-4 text-base font-black transition ${
                      highway === value
                        ? 'border-[#0f766e] bg-teal-50 text-[#134e4a] shadow-[0_16px_34px_rgba(20,184,166,0.22)]'
                        : 'border-slate-300 bg-white text-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.14)]'
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

            <button
              type="button"
              onClick={submitPosition}
              disabled={status === 'loading'}
              className="mt-5 w-full rounded-[1.35rem] border border-[#0f766e] bg-[#0f766e] px-5 py-5 text-lg font-black text-white shadow-[0_22px_54px_rgba(15,118,110,0.34),inset_0_1px_0_rgba(255,255,255,0.32),inset_0_-10px_22px_rgba(19,78,74,0.24)] transition hover:-translate-y-0.5 hover:bg-[#115e59] disabled:cursor-wait disabled:opacity-70"
            >
              {status === 'loading'
                ? 'Invio in corso...'
                : 'Rileva posizione e invia richiesta'}
            </button>
            <p className="mt-3 text-center text-xs font-black uppercase tracking-[0.12em] text-slate-700">
              Richiesta gratuita e senza impegno
            </p>
            {message && (
              <p
                className={`mt-4 rounded-2xl p-4 text-sm font-bold leading-6 ${
                  status === 'success'
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-amber-50 text-amber-900'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ['1', 'Chiami o invii la posizione', 'Puoi telefonare subito oppure mandare GPS, mezzo e problema dal form.'],
            ['2', 'La richiesta arriva chiara', 'Il carroattrezzi riceve posizione e dati utili, senza perdere tempo in spiegazioni ripetute.'],
            ['3', 'Vieni ricontattato rapidamente', 'Confermi destinazione, condizioni e intervento direttamente al telefono.'],
          ].map(([number, title, text]) => (
            <div
              key={title}
              className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 shadow-sm"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-[#0f766e] text-lg font-black text-white">
                {number}
              </span>
              <h2 className="mt-4 text-xl font-black">{title}</h2>
              <p className="mt-3 leading-7 text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f1f5f9] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black sm:text-4xl">
            Quando chiamare ViaSOS a {city}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Auto in panne',
              'Batteria scarica',
              'Gomma forata',
              'Incidente stradale',
              'Recupero moto',
              'Furgone fermo',
              'Trasporto veicolo',
              'Soccorso in autostrada',
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5"
              >
                <h3 className="text-lg font-black">{item}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                  Gestiamo la richiesta con posizione precisa, numero di
                  telefono e dettagli essenziali per ridurre passaggi inutili.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1728] py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black">Hai bisogno adesso?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold text-slate-200">
            Chiama direttamente il numero {city}: è il modo più veloce quando
            il veicolo è fermo e vuoi parlare subito con qualcuno.
          </p>
          <a
            href={telHref}
            onClick={callNow}
            className="call-pulse mt-8 inline-flex rounded-2xl bg-[#ffcc00] px-8 py-5 text-lg font-black text-slate-950 shadow-[0_24px_64px_rgba(255,204,0,0.44)]"
          >
            📞 Chiama Ora - Risposta Immediata
          </a>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-yellow-300/30 bg-[#07111f]/96 p-3 shadow-[0_-20px_70px_rgba(0,0,0,0.45)] backdrop-blur md:hidden">
        <a
          href={telHref}
          onClick={callNow}
          className="call-pulse flex w-full items-center justify-center rounded-2xl border-2 border-[#ffef99] bg-[#ffcc00] px-4 py-5 text-center text-base font-black leading-tight text-slate-950"
        >
          📞 Chiama Ora - Risposta Immediata
        </a>
      </div>

      <style jsx global>{`
        @keyframes bresciaCallPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 22px 58px rgba(255, 204, 0, 0.4);
          }
          50% {
            transform: scale(1.025);
            box-shadow:
              0 28px 76px rgba(255, 204, 0, 0.6),
              0 0 0 8px rgba(255, 204, 0, 0.1);
          }
        }

        .call-pulse {
          animation: bresciaCallPulse 2.2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .call-pulse {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}
