'use client'

import { useMemo, useState } from 'react'

import { vehicleProblems, vehicleTypes } from '@/data/site'

type Status = 'idle' | 'loading' | 'ready' | 'error'

type Coordinates = {
  latitude: number
  longitude: number
}

export function EmergencyForm() {
  const [phone, setPhone] = useState('')
  const [vehicle, setVehicle] = useState('')
  const [problem, setProblem] = useState('')
  const [highway, setHighway] = useState('')
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const [privacy, setPrivacy] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const cleanPhone = useMemo(() => phone.replace(/[^\d+]/g, ''), [phone])
  const hasValidPhone = cleanPhone.replace(/[^\d]/g, '').length >= 8
  const mapsLink = coordinates
    ? `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`
    : ''

  function validate() {
    if (!hasValidPhone) return 'Inserisci un numero di telefono valido.'
    if (!vehicle) return 'Seleziona il tipo di veicolo.'
    if (!problem) return 'Seleziona il problema del veicolo.'
    if (!highway) return 'Indica se ti trovi in autostrada.'
    if (!coordinates) return 'Condividi la posizione del veicolo.'
    if (!privacy) return 'Accetta la privacy per inviare la richiesta.'
    return ''
  }

  function useCurrentPosition() {
    if (!navigator.geolocation) {
      setStatus('error')
      setMessage(
        'Il browser non supporta la geolocalizzazione. Prova da smartphone o chiama direttamente.',
      )
      return
    }

    setStatus('loading')
    setMessage('Rilevamento della posizione in corso...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setStatus('ready')
        setMessage('Posizione rilevata. Puoi inviare la richiesta.')
      },
      () => {
        setStatus('error')
        setMessage(
          'Posizione non concessa. Per inviare la richiesta dal sito devi consentire il GPS.',
        )
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  function submitRequest() {
    const error = validate()
    if (error) {
      setStatus('error')
      setMessage(error)
      return
    }

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
    if (!whatsappNumber) {
      setStatus('error')
      setMessage(
        "Numero WhatsApp non configurato. Configura NEXT_PUBLIC_WHATSAPP_NUMBER per attivare l'invio.",
      )
      return
    }

    const positionText = `${coordinates?.latitude}, ${coordinates?.longitude}`
    const text = [
      'Richiesta ViaSOS',
      `Telefono: ${cleanPhone}`,
      `Tipo di veicolo: ${vehicle}`,
      `Problema: ${problem}`,
      `Autostrada: ${highway}`,
      `Posizione: ${positionText}`,
      mapsLink ? `Google Maps: ${mapsLink}` : '',
      'Vorrei trovare il carroattrezzi disponibile più vicino.',
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  return (
    <div
      id="assistenza"
      className="relative flex h-full w-full flex-col rounded-[2rem] bg-[#07111f] p-1.5 shadow-[0_46px_120px_rgba(7,17,31,0.32),0_22px_64px_rgba(37,211,102,0.24),inset_0_1px_0_rgba(255,255,255,0.55)] ring-1 ring-[#25d366]/20 sm:rounded-[2.75rem] sm:p-2"
    >
      <div className="absolute -inset-2 -z-10 rounded-[2.4rem] bg-linear-to-br from-[#25d366]/55 via-[#0ea5e9]/20 to-[#ffd34d]/45 blur-xl sm:rounded-[3.2rem]" />
      <div className="absolute inset-x-8 -bottom-6 -z-10 h-14 rounded-full bg-slate-950/25 blur-2xl" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-white/70 bg-linear-to-b from-white via-[#fbfffd] to-[#edf8f1] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-26px_46px_rgba(6,95,70,0.08)] sm:rounded-[2.35rem] sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-[#25d366] to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-[#25d366]/18 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 size-52 rounded-full bg-[#0ea5e9]/12 blur-2xl" />

        <p className="relative text-[11px] font-black uppercase tracking-[0.2em] text-[#075e54]">
          richiesta immediata
        </p>
        <h2 className="relative mt-3 rounded-3xl border border-[#25d366]/25 bg-white/85 p-4 text-2xl font-black leading-tight tracking-tight text-[#07111f] shadow-[0_18px_46px_rgba(15,23,42,0.08)] sm:text-3xl lg:text-4xl">
          Trova assistenza adesso completando il form.{' '}
          <span className="text-[#075e54]">
            Verrai ricontattato in meno di 40 secondi.
          </span>
        </h2>

        <div className="relative mt-4 grid flex-1 gap-3 sm:gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-800">
              Numero di telefono
            </span>
            <input
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Es. 333 123 4567"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-bold shadow-[inset_0_2px_8px_rgba(15,23,42,0.05),0_10px_22px_rgba(15,23,42,0.04)] outline-none ring-[#25d366]/30 transition focus:border-[#25d366] focus:ring-4 sm:py-4"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-800">
                Tipo di veicolo
              </span>
              <select
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-bold shadow-[inset_0_2px_8px_rgba(15,23,42,0.05),0_10px_22px_rgba(15,23,42,0.04)] outline-none ring-[#25d366]/30 transition focus:border-[#25d366] focus:ring-4 sm:py-4"
              >
                <option value="">Seleziona</option>
                {vehicleTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-800">
                Problema
              </span>
              <select
                value={problem}
                onChange={(event) => setProblem(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base font-bold shadow-[inset_0_2px_8px_rgba(15,23,42,0.05),0_10px_22px_rgba(15,23,42,0.04)] outline-none ring-[#25d366]/30 transition focus:border-[#25d366] focus:ring-4 sm:py-4"
              >
                <option value="">Seleziona</option>
                {vehicleProblems.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <fieldset className="rounded-[1.5rem] border border-slate-200 bg-white/95 p-3.5 shadow-[0_16px_36px_rgba(15,23,42,0.08)] sm:rounded-[2rem] sm:p-4">
            <legend className="px-2 text-sm font-black text-slate-800">
              Ti trovi in autostrada?
            </legend>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {['Sì', 'No'].map((item) => (
                <label
                  key={item}
                  className={`cursor-pointer rounded-2xl border px-4 py-3 text-center text-sm font-black transition ${
                    highway === item
                      ? 'border-[#25d366] bg-[#e9fff2] text-[#07111f] shadow-[0_10px_24px_rgba(37,211,102,0.18)]'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="highway"
                    value={item}
                    checked={highway === item}
                    onChange={(event) => setHighway(event.target.value)}
                    className="sr-only"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-3 rounded-[1.5rem] border border-emerald-200 bg-white p-3.5 shadow-[0_20px_48px_rgba(6,95,70,0.14)] sm:rounded-[2rem] sm:p-4">
            <span className="text-sm font-black uppercase tracking-[0.14em] text-[#075e54]">
              Posizione del veicolo
            </span>
            <button
              type="button"
              onClick={useCurrentPosition}
              disabled={status === 'loading'}
              className="rounded-2xl bg-[#07111f] px-4 py-4 text-base font-black text-white shadow-xl shadow-slate-950/25 transition hover:bg-[#123456] disabled:cursor-wait disabled:opacity-70 sm:py-5 sm:text-lg"
            >
              {status === 'loading' ? 'Rilevamento...' : 'Usa la mia posizione'}
            </button>
            <p className="text-sm leading-6 font-semibold text-slate-700">
              La posizione serve per inoltrare una richiesta precisa ai
              carroattrezzi presenti nella zona.
            </p>
          </div>

          <label className="flex gap-3 rounded-2xl bg-white/90 p-3.5 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-200 sm:p-4">
            <input
              type="checkbox"
              checked={privacy}
              onChange={(event) => setPrivacy(event.target.checked)}
              className="mt-1 size-4 rounded border-slate-300 text-[#25d366] focus:ring-[#25d366]"
            />
            <span>
              Accetto il trattamento dei dati secondo la{' '}
              <a href="/privacy" className="font-bold text-[#075e54] underline">
                privacy policy
              </a>
              .
            </span>
          </label>

          {message && (
            <p
              className={
                status === 'ready'
                  ? 'rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800'
                  : 'rounded-2xl bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900'
              }
              role="status"
            >
              {message}
            </p>
          )}

          <button
            type="button"
            onClick={submitRequest}
            className="mt-auto rounded-2xl bg-linear-to-r from-[#25d366] via-[#32e878] to-[#b8ff5c] px-5 py-4 text-lg font-black text-[#07111f] shadow-[0_22px_46px_rgba(37,211,102,0.34),inset_0_1px_0_rgba(255,255,255,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_58px_rgba(37,211,102,0.42)] sm:py-5"
          >
            Cerca subito assistenza
          </button>
        </div>
      </div>
    </div>
  )
}
