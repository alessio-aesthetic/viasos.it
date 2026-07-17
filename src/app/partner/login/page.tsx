'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

import { PartnerBadge, PartnerPanel, PartnerShell } from '@/components/viasos/partner-shell'
import { partnerRequest } from '@/lib/partner-api'

export default function PartnerLogin() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    let result: { url: string }
    try {
      result = await partnerRequest<{ url: string }>('viasos-partner-login', { email, phone, password })
    } catch (error) {
      setLoading(false)
      setMessage(error instanceof Error ? error.message : 'Accesso non riuscito.')
      return
    }

    window.location.href = result.url
  }

  return (
    <PartnerShell>
      <section className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center rounded-[2rem] bg-[#07111f] p-7 text-white shadow-2xl shadow-slate-950/15 sm:p-9">
          <PartnerBadge>Accesso partner</PartnerBadge>
          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">Entra nella tua dashboard ViaSOS</h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-300">Gestisci richieste, stato del profilo e attività da un unico spazio operativo protetto.</p>
          <div className="mt-8 grid gap-3 text-sm font-bold text-slate-200">
            <div className="rounded-2xl bg-white/10 p-4">Dati e richieste sempre sotto controllo.</div>
            <div className="rounded-2xl bg-white/10 p-4">Password personale per proteggere il tuo accesso.</div>
          </div>
        </div>
        <PartnerPanel className="self-center p-8">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#075e54]">Portale operativo</p>
          <h2 className="mt-2 text-3xl font-black">Login partner</h2>
          <form className="mt-6 grid gap-5" onSubmit={submit}>
            <label className="grid gap-2 text-sm font-black text-slate-700">Email<input value={email} onChange={(event) => setEmail(event.target.value)} className="partner-input" type="email" required /></label>
            <label className="grid gap-2 text-sm font-black text-slate-700">Numero WhatsApp<input value={phone} onChange={(event) => setPhone(event.target.value)} className="partner-input" inputMode="tel" placeholder="+39" required /></label>
            <label className="grid gap-2 text-sm font-black text-slate-700">Password<input value={password} onChange={(event) => setPassword(event.target.value)} className="partner-input" type="password" minLength={8} required /></label>
            {message ? <p className="rounded-2xl bg-red-50 p-4 font-bold text-red-800">{message}</p> : null}
            <button type="submit" disabled={loading} className="rounded-full bg-[#07111f] px-6 py-4 text-base font-black text-white transition hover:bg-[#123456] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Accesso in corso' : 'Accedi alla dashboard'}</button>
          </form>
          <p className="mt-5 text-sm font-semibold text-slate-500">Non hai ancora un profilo? <a href="/partner/registrazione/" className="font-black text-[#075e54]">Registrati come partner</a></p>
        </PartnerPanel>
      </section>
    </PartnerShell>
  )
}
