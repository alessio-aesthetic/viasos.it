'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

import { PartnerBadge, PartnerPanel, PartnerShell } from '@/components/viasos/partner-shell'
import { partnerRequest } from '@/lib/partner-api'

export default function PartnerLogin() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [resetOpen, setResetOpen] = useState(false)
  const [resetPhone, setResetPhone] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetMessage, setResetMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const result = await partnerRequest<{ url: string }>('viasos-partner-login', {
        phone,
        password,
      })
      window.location.href = result.url
    } catch (error) {
      setLoading(false)
      setMessage(error instanceof Error ? error.message : 'Accesso non riuscito.')
    }
  }

  async function requestPasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResetLoading(true)
    setResetMessage('')

    try {
      await partnerRequest('viasos-partner-password-reset', { phone: resetPhone })
      setResetMessage('Richiesta inviata. Riceverai le istruzioni sul numero associato al profilo.')
      setResetPhone('')
    } catch (error) {
      setResetMessage(error instanceof Error ? error.message : 'Non è stato possibile richiedere il reset.')
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <PartnerShell>
      <section className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center rounded-[2rem] bg-[#07111f] p-7 text-white shadow-2xl shadow-slate-950/15 sm:p-9">
          <PartnerBadge>Accesso partner</PartnerBadge>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">Entra nella tua dashboard ViaSOS</h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-300">Gestisci richieste, stato del profilo e attività da un unico spazio operativo protetto.</p>
          <div className="mt-8 grid gap-3 text-sm font-bold text-slate-200">
            <div className="rounded-2xl bg-white/10 p-4">Accesso rapido con numero di telefono.</div>
            <div className="rounded-2xl bg-white/10 p-4">Password personale per proteggere il tuo profilo.</div>
          </div>
        </div>
        <PartnerPanel className="self-center p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Portale operativo</p>
          <h2 className="mt-2 text-3xl font-black">Login partner</h2>
          <form className="mt-6 grid gap-5" onSubmit={submit}>
            <label className="grid gap-2 text-sm font-black text-slate-700">
              Numero di telefono
              <input value={phone} onChange={(event) => setPhone(event.target.value)} className="partner-input" inputMode="tel" placeholder="+39" required />
            </label>
            <label className="grid gap-2 text-sm font-black text-slate-700">
              Password
              <input value={password} onChange={(event) => setPassword(event.target.value)} className="partner-input" type="password" minLength={8} required />
            </label>
            {message ? <p className="rounded-2xl bg-red-50 p-4 font-bold text-red-800">{message}</p> : null}
            <button type="submit" disabled={loading} className="rounded-full bg-[#07111f] px-6 py-4 text-base font-black text-white transition hover:bg-[#123456] disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Accesso in corso' : 'Accedi alla dashboard'}
            </button>
          </form>
          <button type="button" onClick={() => { setResetOpen((current) => !current); setResetMessage('') }} className="mt-5 text-sm font-black text-[#075e54] underline decoration-emerald-300 underline-offset-4 hover:text-[#06483f]">
            Password dimenticata?
          </button>
          {resetOpen ? (
            <form className="mt-5 rounded-[1.5rem] border border-slate-200 bg-[#f8fbff] p-5" onSubmit={requestPasswordReset}>
              <p className="text-base font-black text-slate-950">Recupera la password</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">Inserisci il numero collegato al profilo. Ti invieremo le istruzioni per creare una nuova password.</p>
              <input value={resetPhone} onChange={(event) => setResetPhone(event.target.value)} className="partner-input mt-4" inputMode="tel" placeholder="Numero di telefono" required />
              {resetMessage ? <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-800">{resetMessage}</p> : null}
              <button type="submit" disabled={resetLoading} className="mt-4 w-full rounded-full bg-[#075e54] px-5 py-3 text-sm font-black text-white transition hover:bg-[#06483f] disabled:cursor-not-allowed disabled:opacity-60">
                {resetLoading ? 'Invio in corso' : 'Invia istruzioni di reset'}
              </button>
            </form>
          ) : null}
          <p className="mt-5 text-sm font-semibold text-slate-500">Non hai ancora un profilo? <a href="/partner/registrazione/" className="font-black text-[#075e54]">Registrati come partner</a></p>
        </PartnerPanel>
      </section>
    </PartnerShell>
  )
}
