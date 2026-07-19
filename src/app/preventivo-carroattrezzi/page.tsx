'use client'

import {
  BanknotesIcon,
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

const webhook =
  'https://alessiothrasos.app.n8n.cloud/webhook/preventivi-carroattrezzi-offerta'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function PreventivoCarroattrezziPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const request = useMemo(() => {
    if (typeof window === 'undefined') return { quote: '', token: '' }
    const params = new URLSearchParams(window.location.search)
    return {
      quote: params.get('quote') || '',
      token: params.get('token') || '',
    }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    if (!request.quote || !request.token) {
      setStatus('error')
      setMessage('Questo collegamento non è valido o è scaduto.')
      return
    }

    setStatus('sending')
    setMessage('Registrazione della proposta in corso...')
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote_id: request.quote,
          token: request.token,
          prezzo: String(data.get('prezzo') || '').trim(),
          tempo_arrivo: String(data.get('tempo_arrivo') || '').trim(),
          note: String(data.get('note') || '').trim(),
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.ok === false) {
        throw new Error(result.message || 'Non è stato possibile registrare la proposta.')
      }
      setStatus('success')
      setMessage(
        'Proposta registrata. Il cliente riceverà il prezzo e il tempo stimato di arrivo.',
      )
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Non è stato possibile registrare la proposta.',
      )
    }
  }

  return (
    <main className="min-h-screen bg-[#eef3f8] px-4 py-6 text-[#101828] sm:py-10">
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-6 flex items-center justify-between">
          <a href="/" className="text-2xl font-black">
            Via<span className="text-[#087f5b]">SOS</span>
          </a>
          <span className="rounded-lg bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm">
            Area operativa
          </span>
        </header>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.10)]">
          <div className="bg-[#071b2f] px-5 py-6 text-white sm:px-8">
            <p className="mb-2 text-sm font-bold text-[#67e8b8]">
              Richiesta appena compilata
            </p>
            <h1 className="text-2xl font-black sm:text-3xl">
              Invia la tua proposta
            </h1>
            <p className="mt-3 leading-7 text-slate-200">
              Indica il prezzo totale e il tempo necessario per raggiungere il
              cliente. La proposta verrà confrontata con quelle ricevute entro 90
              secondi.
            </p>
          </div>

          <form className="space-y-5 p-5 sm:p-8" onSubmit={submit}>
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-base font-black">
                <BanknotesIcon className="size-5 text-[#087f5b]" />
                Prezzo totale
              </span>
              <div className="relative">
                <input
                  name="prezzo"
                  required
                  inputMode="decimal"
                  placeholder="Esempio: 120"
                  className="field pr-14"
                />
                <span className="absolute inset-y-0 right-4 flex items-center font-black text-slate-500">
                  €
                </span>
              </div>
              <span className="mt-2 block text-sm leading-6 text-slate-600">
                Inserisci il prezzo complessivo comunicato al cliente, inclusi gli
                eventuali supplementi già prevedibili.
              </span>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-base font-black">
                <ClockIcon className="size-5 text-[#087f5b]" />
                Tempo stimato di arrivo
              </span>
              <div className="relative">
                <input
                  name="tempo_arrivo"
                  required
                  inputMode="numeric"
                  placeholder="Esempio: 25"
                  className="field pr-20"
                />
                <span className="absolute inset-y-0 right-4 flex items-center text-sm font-black text-slate-500">
                  minuti
                </span>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-base font-black">
                Condizioni o note
              </span>
              <textarea
                name="note"
                rows={3}
                placeholder="Facoltativo: specifica cosa comprende il prezzo o eventuali condizioni."
                className="field"
              />
            </label>

            <div className="flex items-start gap-3 rounded-lg bg-emerald-50 px-4 py-4 text-sm leading-6 text-emerald-950">
              <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-[#087f5b]" />
              Il numero del cliente verrà condiviso soltanto se la tua proposta sarà
              scelta.
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
                  ? 'Proposta inviata'
                  : 'Invia proposta'}
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
