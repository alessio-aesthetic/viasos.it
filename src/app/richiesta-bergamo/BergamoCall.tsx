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

const cases = [
  ['Auto in panne', 'auto-rotta'],
  ['Gomma a terra', 'gomme'],
  ['Batteria scarica', 'batteria'],
  ['Incidente', 'incidente'],
  ['Veicolo bloccato', 'auto-bloccata'],
  ['Senza carburante', 'senza-benzina'],
]

export default function BergamoCall() {
  const [time, setTime] = useState('')
  const [ready, setReady] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const update = () => setTime(localTime.format(new Date()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let mounted = true
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotion = () => setAnimate(!motion.matches)
    syncMotion()
    motion.addEventListener('change', syncMotion)
    void import('@lottiefiles/lottie-player').then(() => {
      if (mounted) setReady(true)
    }).catch(() => {})
    return () => {
      mounted = false
      motion.removeEventListener('change', syncMotion)
    }
  }, [])

  return (
    <div className="min-h-[100svh] bg-[#f6f7ed] text-center text-[#14251e]">
      <main className="mx-auto max-w-4xl px-4 pt-4 sm:px-6 sm:pt-6">
        <section className="rounded-[1.75rem] border border-[#294737] bg-[#14251e] px-4 pb-5 pt-4 text-[#fffdf2] shadow-lg sm:px-8 sm:pb-7">
          <img src="/images/viasos-logo-header-cropped.webp" alt="ViaSOS" width="146" height="56" className="mx-auto mb-3 h-auto w-24 rounded-lg bg-[#fffdf2] p-1.5 sm:w-28" />
          <h1 className="text-lg font-bold sm:text-2xl">Carroattrezzi a Bergamo</h1>
          <p className="mt-2 flex items-center justify-center gap-2 text-[clamp(1.45rem,6vw,3.5rem)] font-black leading-none tracking-tight text-[#a6efb6]">
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#a6efb6] shadow-[0_0_14px_#a6efb6]" />
            DISPONIBILE ORA
          </p>
          <time aria-label={time ? 'Ora di Bergamo ' + time : undefined} className="mt-1 block min-h-[1em] text-[clamp(3rem,12vw,6rem)] font-black leading-none tracking-tight tabular-nums">{time}</time>
          <a href={'tel:' + tel} onClick={() => trackCall('hero')} className="mx-auto mt-3 flex min-h-14 w-full max-w-md flex-wrap items-center justify-center gap-x-3 rounded-xl bg-[#ffd33d] px-3 py-2.5 text-[#14251e] shadow-[0_4px_0_#be9016] transition-colors hover:bg-[#ffe47a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white">
            <strong className="text-xl font-black sm:text-2xl">CHIAMA ORA</strong>
            <span className="whitespace-nowrap text-lg font-bold sm:text-xl">{phone}</span>
          </a>
          <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 divide-x divide-white/20">
            <p className="px-1 font-bold"><strong className="block text-lg sm:text-2xl">20 MINUTI</strong><span className="text-base">Arrivo stimato</span></p>
            <p className="px-1 font-bold"><strong className="block text-lg text-[#ffd33d] sm:text-2xl">PREZZI ONESTI</strong><span className="text-base">In base ai km reali</span></p>
          </div>
        </section>

        <section aria-labelledby="bergamo-cases" className="pb-5 pt-4 sm:pt-6">
          <h2 id="bergamo-cases" className="mb-2.5 text-xl font-black sm:text-2xl">Che cosa è successo?</h2>
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {cases.map(([label, asset]) => (
              <li key={asset}>
                <a href={'tel:' + tel} onClick={() => trackCall('case_' + asset)} aria-label={label + ' — Chiama ora'} className="flex h-full flex-col items-center justify-start gap-1 rounded-2xl border border-[#d9e1d4] bg-white px-1 pb-2.5 pt-1.5 text-base font-bold leading-tight transition-colors hover:border-[#429267] hover:bg-[#eef8ec] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  <span aria-hidden="true" className="block h-12 w-12 sm:h-16 sm:w-16">
                    {ready && <lottie-player key={String(animate)} src={'/lottie/brescia-request/' + asset + '.json'} background="transparent" speed="1" {...(animate ? { autoplay: true, loop: true } : {})} />}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-[#d9e1d4] bg-white px-4 py-5">
          <h2 className="text-xl font-black sm:text-2xl">Soccorso stradale a Bergamo e dintorni</h2>
          <p className="mt-1.5 text-base font-medium sm:text-lg">Chiamaci, indica dove sei e ricevi il preventivo.</p>
        </section>
      </main>
      <footer className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-4 pb-28 pt-6 text-base sm:pb-6">
        <a className="underline" href="/privacy/">Privacy</a>
        <a className="underline" href="/cookie/">Cookie</a>
        <a className="underline" href="/termini/">Termini</a>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#375044] bg-[#14251e] px-4 pt-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] sm:hidden">
        <a href={'tel:' + tel} onClick={() => trackCall('mobile_sticky')} className="mx-auto flex min-h-12 max-w-md flex-wrap items-center justify-center gap-x-2 rounded-xl bg-[#ffd33d] px-3 py-2 text-lg font-black text-[#14251e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          CHIAMA ORA <span className="whitespace-nowrap">{phone}</span>
        </a>
      </div>
    </div>
  )
}
