'use client'

import {
  CameraIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

const webhook =
  'https://alessiothrasos.app.n8n.cloud/webhook/preventivi-carroattrezzi-cliente'

type Status = 'idle' | 'sending' | 'success' | 'error'

type PhotoPayload = {
  filename: string
  contentType: string
  base64: string
}

async function compressPhoto(file: File): Promise<PhotoPayload> {
  const source = await createImageBitmap(file)
  const maxSize = 1280
  const scale = Math.min(1, maxSize / Math.max(source.width, source.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(source.width * scale))
  canvas.height = Math.max(1, Math.round(source.height * scale))
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Impossibile elaborare la foto.')
  context.drawImage(source, 0, 0, canvas.width, canvas.height)
  source.close()

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) =>
        result ? resolve(result) : reject(new Error('Impossibile elaborare la foto.')),
      'image/jpeg',
      0.76,
    )
  })
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = () => reject(new Error('Impossibile leggere la foto.'))
    reader.readAsDataURL(blob)
  })

  return {
    filename: `veicolo-${Date.now()}.jpg`,
    contentType: 'image/jpeg',
    base64: dataUrl.split(',')[1] || '',
  }
}

export default function PreventivoClientePage() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [photoName, setPhotoName] = useState('')

  const request = useMemo(() => {
    if (typeof window === 'undefined') return { lead: '', token: '' }
    const params = new URLSearchParams(window.location.search)
    return {
      lead: params.get('lead') || '',
      token: params.get('token') || '',
    }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (!request.lead || !request.token) {
      setStatus('error')
      setMessage('Questo collegamento non è valido. Richieda un nuovo invito.')
      return
    }

    setStatus('sending')
    setMessage('Invio della richiesta in corso...')

    try {
      const photo = data.get('foto')
      let photoPayload: PhotoPayload | null = null
      if (photo instanceof File && photo.size > 0) {
        photoPayload = await compressPhoto(photo)
      }

      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: request.lead,
          token: request.token,
          indirizzo: String(data.get('indirizzo') || '').trim(),
          veicolo: String(data.get('veicolo') || '').trim(),
          problema: String(data.get('problema') || '').trim(),
          destinazione: String(data.get('destinazione') || '').trim(),
          autostrada: String(data.get('autostrada') || '').trim(),
          foto: photoPayload,
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.ok === false) {
        throw new Error(result.message || 'Non è stato possibile inviare la richiesta.')
      }

      setStatus('success')
      setMessage(
        'Richiesta inviata. Tenga il telefono a portata di mano: raccogliamo le proposte per un massimo di 90 secondi.',
      )
      form.reset()
      setPhotoName('')
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Non è stato possibile inviare la richiesta.',
      )
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-6 text-[#101828] sm:py-10">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-6 flex items-center justify-between">
          <a href="/" className="text-2xl font-black">
            Via<span className="text-[#087f5b]">SOS</span>
          </a>
          <div className="flex items-center gap-2 text-sm font-bold text-[#087f5b]">
            <ClockIcon className="size-5" />
            Meno di 13 secondi
          </div>
        </header>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.10)]">
          <div className="border-b border-slate-200 bg-[#071b2f] px-5 py-6 text-white sm:px-8">
            <p className="mb-2 text-sm font-bold text-[#67e8b8]">
              Confronto rapido nella tua zona
            </p>
            <h1 className="text-2xl font-black sm:text-3xl">
              Ricevi prezzi e tempi di arrivo
            </h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-200">
              Inserisci poche informazioni. Contatteremo i carroattrezzi disponibili
              della zona e ti mostreremo le proposte ricevute entro 90 secondi.
            </p>
          </div>

          <form className="space-y-5 p-5 sm:p-8" onSubmit={submit}>
            <Field
              icon={<MapPinIcon className="size-5" />}
              label="Indirizzo del veicolo, anche approssimativo"
              hint="Puoi indicare anche un bar, un negozio, un distributore, un parcheggio o un’uscita stradale vicina."
            >
              <textarea
                name="indirizzo"
                required
                rows={2}
                placeholder="Esempio: davanti al distributore in via Roma, vicino all’uscita..."
                className="field"
              />
            </Field>

            <Field label="Tipo di veicolo" hint="Scrivi marca, modello e tipologia, se li conosci.">
              <input
                name="veicolo"
                required
                placeholder="Esempio: Fiat Panda, automobile"
                className="field"
              />
            </Field>

            <Field label="Problema" hint="Descrivi brevemente cosa è successo.">
              <textarea
                name="problema"
                required
                rows={2}
                placeholder="Esempio: auto ferma, batteria scarica, incidente..."
                className="field"
              />
            </Field>

            <Field
              label="Destinazione desiderata o chilometri indicativi"
              hint="Indica dove vuoi portare il veicolo oppure la distanza approssimativa."
            >
              <input
                name="destinazione"
                required
                placeholder="Esempio: officina in città, circa 8 km"
                className="field"
              />
            </Field>

            <Field
              label="Autostrada"
              hint="Scrivi se sei in autostrada e, se possibile, direzione, uscita o chilometro."
            >
              <input
                name="autostrada"
                required
                placeholder="Esempio: no, oppure A4 direzione Milano"
                className="field"
              />
            </Field>

            <Field
              icon={<CameraIcon className="size-5" />}
              label="Foto del veicolo"
              hint="Facoltativa. Può aiutare il carroattrezzi a valutare meglio l’intervento."
            >
              <label className="flex min-h-14 cursor-pointer items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-sm font-bold text-slate-700 transition hover:border-[#087f5b] hover:bg-emerald-50">
                <input
                  name="foto"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) =>
                    setPhotoName(event.target.files?.[0]?.name || '')
                  }
                />
                {photoName || 'Aggiungi una foto'}
              </label>
            </Field>

            <div className="flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-4 text-sm leading-6 text-emerald-950">
              <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-[#087f5b]" />
              I tuoi recapiti saranno condivisi soltanto con il carroattrezzi che
              sceglierai.
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#087f5b] px-5 text-lg font-black text-white transition hover:bg-[#066b4d] disabled:cursor-wait disabled:opacity-65"
            >
              {status === 'success' ? (
                <CheckCircleIcon className="size-6" />
              ) : null}
              {status === 'sending'
                ? 'Invio in corso...'
                : status === 'success'
                  ? 'Richiesta inviata'
                  : 'Invia e ricevi i preventivi'}
            </button>

            {message ? (
              <p
                role="status"
                className={`rounded-lg px-4 py-3 text-sm font-semibold leading-6 ${
                  status === 'error'
                    ? 'bg-red-50 text-red-800'
                    : 'bg-emerald-50 text-emerald-900'
                }`}
              >
                {message}
              </p>
            ) : null}
          </form>
        </section>
      </div>
      <style jsx>{`
        :global(.field) {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 0.5rem;
          background: #ffffff;
          padding: 0.85rem 1rem;
          color: #0f172a;
          outline: none;
        }
        :global(.field:focus) {
          border-color: #087f5b;
          box-shadow: 0 0 0 3px rgba(8, 127, 91, 0.12);
        }
      `}</style>
    </main>
  )
}

function Field({
  label,
  hint,
  icon,
  children,
}: {
  label: string
  hint: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-2 text-base font-black">
        {icon}
        {label}
      </span>
      <span className="mb-3 block text-sm leading-6 text-slate-600">{hint}</span>
      {children}
    </label>
  )
}
