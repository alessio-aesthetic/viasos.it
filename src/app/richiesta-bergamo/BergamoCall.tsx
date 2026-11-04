'use client'

import { useEffect, useState } from 'react'

const phone = '035 068 3839'
const tel = '+390350683839'
const trackingKeys = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_campaign', 'utm_term', 'utm_medium', 'utm_content']

function trackCall(placement: string) {
  // Tracking must never delay or prevent the phone link from opening.
  try {
    const params = new URLSearchParams(window.location.search)
    const campaign = Object.fromEntries(trackingKeys.map(key => [key, params.get(key) || '']))
    const payload = { evento: 'click_telefono', fonte: 'sponsorizzata_landing', page_type: 'landing_call_only', citta: 'Bergamo', pagina: '/richiesta-bergamo', telefono: tel, telefono_label: phone, placement, url: window.location.href, dominio: window.location.hostname, timestamp: new Date().toISOString(), ...campaign }
    const endpoint = process.env.NEXT_PUBLIC_PHONE_CLICK_WEBHOOK_URL || 'https://alessiothrasos.app.n8n.cloud/webhook/click-telefono-carroattrezzi-bergamo'
    const body = JSON.stringify(payload)
    if (!navigator.sendBeacon?.(endpoint, new Blob([body], { type: 'application/json' }))) {
      void fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
    }
  } catch { /* The call remains available if tracking is blocked. */ }
}

const localTime = new Intl.DateTimeFormat('it-IT', {
  timeZone: 'Europe/Rome',
  hour: '2-digit',
  minute: '2-digit',
})

export default function BergamoCall() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () => setTime(localTime.format(new Date()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="min-h-[100svh] bg-[#14251e] text-center text-[#fffdf2]">
      <main className="mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 py-7 sm:py-12">
        <img src="/images/viasos-logo-header-cropped.webp" alt="ViaSOS" width="146" height="56" className="mb-5 h-auto w-28 rounded-xl bg-[#fffdf2] p-2 sm:w-36" />
        <p className="text-lg font-semibold sm:text-2xl">Carroattrezzi Bergamo</p>
        <h1 className="mt-2 text-[clamp(2rem,7vw,5.25rem)] font-black leading-none tracking-tight text-[#a6efb6]">
          DISPONIBILE ORA
        </h1>
        <time aria-label={time ? 'Ora di Bergamo ' + time : undefined} className="mt-1 min-h-[1em] text-[clamp(4rem,14vw,9rem)] font-black leading-none tracking-tight tabular-nums">{time}</time>
        <a href={'tel:' + tel} onClick={() => trackCall('hero')} className="mt-5 flex w-full max-w-md flex-col rounded-2xl bg-[#ffd33d] px-6 py-3 text-[#14251e] shadow-[0_5px_0_#ca9e16] transition-colors hover:bg-[#ffe47a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white">
          <strong className="text-3xl font-black sm:text-4xl">CHIAMA ORA</strong>
          <span className="text-xl font-bold sm:text-2xl">{phone}</span>
        </a>
        <p className="mt-5 text-lg font-semibold sm:text-2xl">Arrivo stimato in 20 minuti</p>
        <p className="mt-4 text-2xl font-black text-[#ffd33d] sm:text-4xl">PREZZI ONESTI</p>
        <p className="mt-1 text-lg font-semibold sm:text-2xl">In base ai km reali</p>
      </main>
      <footer className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-5 pb-6 text-base">
        <a className="underline" href="/privacy/">Privacy</a>
        <a className="underline" href="/cookie/">Cookie</a>
        <a className="underline" href="/termini/">Termini</a>
      </footer>
    </div>
  )
}
