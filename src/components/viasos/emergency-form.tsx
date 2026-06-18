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
        'Numero WhatsApp non configurato. Configura NEXT_PUBLIC_WHATSAPP_NUMBER per attivare l’invio.',
      )
      return
    }

    const positionText = `${coordinates?.latitude}, ${coordinates?.longitude}`

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
      className="relative flex w-full flex-col justify-center overflow-hidden rounded-[2.75rem] border border-white/80 bg-white p-2 shadow-2xl shadow-slate-950/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(37,211,102,0.2),transparent_34%),radial-gradient(circle_at_90%_10%,rgba(255,211,77,0.28),transparent_32%)]" />
      <div className="relative rounded-[2.35rem] bg-white p-5 sm:p-7 lg:p-8">
        <div className="rounded-[2rem] bg-[#07111f] p-5 text-white shadow-2xl shadow-slate-950/20">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#25d366]">
            richiesta immediata
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Trova assistenza adesso.
          </h2>
          <p className="mt-4 text-base leading-7 font-semibold text-slate-300">
            Inserisci telefono, veicolo e problema. Con la posizione GPS ViaSOS
            prepara una richiesta chiara per cercare l&apos;operatore disponibile piu
            vicino.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {['GPS preciso', 'Rete attiva', 'Risposta rapida'].map((item) => (
              <span
                key={item}
                className="rounded-2xl bg-white/10 px-3 py-3 text-xs font-black text-white ring-1 ring-white/10"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4">
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
        <div className="grid gap-3 rounded-[2rem] border border-emerald-200 bg-emerald-50/70 p-4">
          <span className="text-sm font-black uppercase tracking-[0.14em] text-[#075e54]">
            Posizione del veicolo
          </span>
          <button
            type="button"
            onClick={useCurrentPosition}
            disabled={status === 'loading'}
            className="rounded-2xl bg-[#07111f] px-4 py-5 text-lg font-black text-white shadow-xl shadow-slate-950/20 transition hover:bg-[#123456] disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'loading' ? 'Rilevamento...' : 'Usa la mia posizione'}
          </button>
          <p className="text-sm leading-6 font-semibold text-emerald-900">
            La posizione serve solo per inoltrare una richiesta piu precisa agli
            operatori presenti nella zona.
          </p>
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
          className="rounded-2xl bg-[#25d366] px-5 py-5 text-lg font-black text-[#07111f] shadow-xl shadow-emerald-900/20 transition hover:bg-[#32e878]"
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
    </div>
  )
}
