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
  const [manualPosition, setManualPosition] = useState('')
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
    if (!coordinates && !manualPosition.trim()) {
      return 'Condividi la posizione o scrivi un riferimento manuale.'
    }
    if (!privacy) return 'Accetta la privacy per inviare la richiesta.'
    return ''
  }

  function useCurrentPosition() {
    if (!navigator.geolocation) {
      setStatus('error')
      setMessage(
        'Il browser non supporta la geolocalizzazione. Scrivi la posizione nel campo manuale.',
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
          'Posizione non concessa. Puoi scrivere manualmente dove si trova il veicolo.',
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
        'Numero WhatsApp non configurato. Configura NEXT_PUBLIC_WHATSAPP_NUMBER per attivare l’invio.',
      )
      return
    }

    const positionText = coordinates
      ? `${coordinates.latitude}, ${coordinates.longitude}`
      : manualPosition.trim()

    const text = [
      'Richiesta ViaSOS',
      `Telefono: ${cleanPhone}`,
      `Tipo di veicolo: ${vehicle}`,
      `Problema: ${problem}`,
      `Posizione: ${positionText}`,
      mapsLink ? `Google Maps: ${mapsLink}` : '',
      'Vorrei trovare il carroattrezzi disponibile piu vicino.',
    ]
      .filter(Boolean)
      .join('\n')

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
  }

  return (
    <div
      id="assistenza"
      className="flex w-full flex-col justify-center rounded-[2.5rem] border border-white/80 bg-white p-6 shadow-2xl shadow-slate-950/15 sm:p-8 lg:p-10"
    >
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#075e54]">
        richiesta immediata
      </p>
      <h2 className="mt-3 text-4xl font-black tracking-tight text-[#07111f]">
        Dove ti trovi? Al resto pensiamo noi.
      </h2>
      <p className="mt-3 text-base leading-7 font-semibold text-slate-600">
        Inserisci pochi dati essenziali: ViaSOS prepara una richiesta ordinata
        per cercare disponibilita vicino alla tua posizione.
      </p>
      <div className="mt-7 grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-800">
            Numero di telefono
          </span>
          <input
            inputMode="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Es. 333 123 4567"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base font-bold outline-none ring-[#25d366]/30 transition focus:border-[#25d366] focus:ring-4"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-800">
            Tipo di veicolo
          </span>
          <select
            value={vehicle}
            onChange={(event) => setVehicle(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base font-bold outline-none ring-[#25d366]/30 transition focus:border-[#25d366] focus:ring-4"
          >
            <option value="">Seleziona veicolo</option>
            {vehicleTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-800">
            Problema del veicolo
          </span>
          <select
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base font-bold outline-none ring-[#25d366]/30 transition focus:border-[#25d366] focus:ring-4"
          >
            <option value="">Seleziona problema</option>
            {vehicleProblems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-3">
          <span className="text-sm font-bold text-slate-800">Posizione</span>
          <button
            type="button"
            onClick={useCurrentPosition}
            disabled={status === 'loading'}
            className="rounded-2xl bg-[#07111f] px-4 py-4 text-base font-black text-white transition hover:bg-[#123456] disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'loading' ? 'Rilevamento...' : 'Usa la mia posizione'}
          </button>
          <input
            value={manualPosition}
            onChange={(event) => setManualPosition(event.target.value)}
            placeholder="Oppure scrivi strada, uscita, parcheggio o riferimento"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-base font-bold outline-none ring-[#25d366]/30 transition focus:border-[#25d366] focus:ring-4"
          />
        </div>
        <label className="flex gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <input
            type="checkbox"
            checked={privacy}
            onChange={(event) => setPrivacy(event.target.checked)}
            className="mt-1 size-4 rounded border-slate-300 text-[#25d366] focus:ring-[#25d366]"
          />
          <span>
            Accetto il trattamento dei dati secondo la{' '}
            <a href="/privacy/" className="font-bold text-[#075e54] underline">
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
          className="rounded-2xl bg-[#25d366] px-5 py-5 text-lg font-black text-[#07111f] shadow-xl shadow-emerald-900/15 transition hover:bg-[#32e878]"
        >
          Cerca subito assistenza
        </button>
        <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <strong className="text-[#07111f]">
            La richiesta viene trasmessa agli operatori disponibili piu vicini.
          </strong>{' '}
          Controlla WhatsApp dopo l’invio.
        </p>
      </div>
    </div>
  )
}
