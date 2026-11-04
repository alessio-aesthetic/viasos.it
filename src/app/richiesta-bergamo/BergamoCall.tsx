'use client'

import { useEffect, useState } from 'react'

// Location pin by LottieFiles, Lottie Simple License.
// https://lottiefiles.com/free-animation/location-pin-8vNcyP2Nnz
const locationAnimation = 'data:application/json;base64,eyJ2IjoiNS41LjciLCJtZXRhIjp7ImciOiJMb3R0aWVGaWxlcyBBRSAiLCJhIjoiIiwiayI6IiIsImQiOiIiLCJ0YyI6IiJ9LCJmciI6MzAsImlwIjowLCJvcCI6NjAsInciOjI5OCwiaCI6Mjk4LCJubSI6InRlc3QyLTAzIiwiZGRkIjowLCJhc3NldHMiOltdLCJsYXllcnMiOlt7ImRkZCI6MCwiaW5kIjoxLCJ0eSI6NCwibm0iOiJTaGFwZSBMYXllciAyIiwic3IiOjEsImtzIjp7Im8iOnsiYSI6MSwiayI6W3siaSI6eyJ4IjpbMC41OF0sInkiOlsxXX0sIm8iOnsieCI6WzAuMDAxXSwieSI6WzBdfSwidCI6MTMsInMiOlsxMDBdfSx7InQiOjIzLCJzIjpbMF19XSwiaXgiOjExfSwiciI6eyJhIjowLCJrIjowLCJpeCI6MTB9LCJwIjp7ImEiOjAsImsiOlsxNDgsMjU3LjUsMF0sIml4IjoyfSwiYSI6eyJhIjowLCJrIjpbLTEsMTA4LjUsMF0sIml4IjoxfSwicyI6eyJhIjoxLCJrIjpbeyJpIjp7IngiOlswLjU4LDAuNTgsMC41OF0sInkiOlsxLDEsMV19LCJvIjp7IngiOlswLjAwMSwwLjAwMSwwLjAwMV0sInkiOlswLDAsMF19LCJ0IjoxMywicyI6WzAsMCwxMDBdfSx7InQiOjIzLCJzIjpbNzguMTI1LDEwMCwxMDBdfV0sIml4Ijo2fX0sImFvIjowLCJzaGFwZXMiOlt7InR5IjoiZ3IiLCJpdCI6W3siZCI6MSwidHkiOiJlbCIsInMiOnsiYSI6MCwiayI6WzMyMCw0OV0sIml4IjoyfSwicCI6eyJhIjowLCJrIjpbMCwwXSwiaXgiOjN9LCJubSI6IkVsbGlwc2UgUGF0aCAxIiwibW4iOiJBREJFIFZlY3RvciBTaGFwZSAtIEVsbGlwc2UiLCJoZCI6ZmFsc2V9LHsidHkiOiJzdCIsImMiOnsiYSI6MCwiayI6WzAsMCwwLDFdLCJpeCI6M30sIm8iOnsiYSI6MCwiayI6MTAwLCJpeCI6NH0sInciOnsiYSI6MCwiayI6MTYsIml4Ijo1fSwibGMiOjEsImxqIjoxLCJtbCI6NCwiYm0iOjAsIm5tIjoiU3Ryb2tlIDEiLCJtbiI6IkFEQkUgVmVjdG9yIEdyYXBoaWMgLSBTdHJva2UiLCJoZCI6ZmFsc2V9LHsidHkiOiJ0ciIsInAiOnsiYSI6MCwiayI6Wy0xLDEwOC41XSwiaXgiOjJ9LCJhIjp7ImEiOjAsImsiOlswLDBdLCJpeCI6MX0sInMiOnsiYSI6MCwiayI6WzEwMCwxMDBdLCJpeCI6M30sInIiOnsiYSI6MCwiayI6MCwiaXgiOjZ9LCJvIjp7ImEiOjAsImsiOjEwMCwiaXgiOjd9LCJzayI6eyJhIjowLCJrIjowLCJpeCI6NH0sInNhIjp7ImEiOjAsImsiOjAsIml4Ijo1fSwibm0iOiJUcmFuc2Zvcm0ifV0sIm5tIjoiRWxsaXBzZSAxIiwibnAiOjMsImNpeCI6MiwiYm0iOjAsIml4IjoxLCJtbiI6IkFEQkUgVmVjdG9yIEdyb3VwIiwiaGQiOmZhbHNlfV0sImlwIjoxMywib3AiOjYwLCJzdCI6MCwiYm0iOjB9LHsiZGRkIjowLCJpbmQiOjIsInR5Ijo0LCJubSI6ImxvYWN0aW9uIE91dGxpbmVzIiwic3IiOjEsImtzIjp7Im8iOnsiYSI6MCwiayI6MTAwLCJpeCI6MTF9LCJyIjp7ImEiOjAsImsiOjAsIml4IjoxMH0sInAiOnsicyI6dHJ1ZSwieCI6eyJhIjowLCJrIjoxNDguODMzLCJpeCI6M30sInkiOnsiYSI6MSwiayI6W3siaSI6eyJ4IjpbMC43MTRdLCJ5IjpbNC4yNjJdfSwibyI6eyJ4IjpbMC41MzddLCJ5IjpbMF19LCJ0IjowLCJzIjpbMjM0XX0seyJ0IjoxMywicyI6WzI2Ml19XSwiaXgiOjR9fSwiYSI6eyJhIjowLCJrIjpbMTA2LjYwNSwyNTYuODMzLDBdLCJpeCI6MX0sInMiOnsiYSI6MSwiayI6W3siaSI6eyJ4IjpbMC44MzMsMC44MzMsMC44MzNdLCJ5IjpbMC44MzMsMC44MzMsMC44MzNdfSwibyI6eyJ4IjpbMC4xNjcsMC4xNjcsMC4xNjddLCJ5IjpbMC4xNjcsMC4xNjcsMC4xNjddfSwidCI6MCwicyI6WzEwMSwxMDEsMTAwXX0seyJ0IjoxMCwicyI6WzEwMCwxMDAsMTAwXX1dLCJpeCI6Nn19LCJhbyI6MCwic2hhcGVzIjpbeyJ0eSI6ImdyIiwiaXQiOlt7ImluZCI6MCwidHkiOiJzaCIsIml4IjoxLCJrcyI6eyJhIjowLCJrIjp7ImkiOltbMCwtMjAuMjQ0XSxbMjAuMjQ2LDBdLFswLDIwLjI0NF0sWy0yMC4yNDQsMF1dLCJvIjpbWzAsMjAuMjQ0XSxbLTIwLjI0NCwwXSxbMCwtMjAuMjQ0XSxbMjAuMjQ2LDBdXSwidiI6W1szNi42NTQsMF0sWy0wLjAwMSwzNi42NTVdLFstMzYuNjU0LDBdLFstMC4wMDEsLTM2LjY1NV1dLCJjIjp0cnVlfSwiaXgiOjJ9LCJubSI6IlBhdGggMSIsIm1uIjoiQURCRSBWZWN0b3IgU2hhcGUgLSBHcm91cCIsImhkIjpmYWxzZX0seyJ0eSI6InN0IiwiYyI6eyJhIjowLCJrIjpbMCwwLDAsMV0sIml4IjozfSwibyI6eyJhIjowLCJrIjoxMDAsIml4Ijo0fSwidyI6eyJhIjowLCJrIjoxMiwiaXgiOjV9LCJsYyI6MiwibGoiOjIsImJtIjowLCJubSI6IlN0cm9rZSAxIiwibW4iOiJBREJFIFZlY3RvciBHcmFwaGljIC0gU3Ryb2tlIiwiaGQiOmZhbHNlfSx7InR5IjoidHIiLCJwIjp7ImEiOjAsImsiOlsxMDYuNjA2LDEwNi42MDVdLCJpeCI6Mn0sImEiOnsiYSI6MCwiayI6WzAsMF0sIml4IjoxfSwicyI6eyJhIjowLCJrIjpbMTAwLDEwMF0sIml4IjozfSwiciI6eyJhIjowLCJrIjowLCJpeCI6Nn0sIm8iOnsiYSI6MCwiayI6MTAwLCJpeCI6N30sInNrIjp7ImEiOjAsImsiOjAsIml4Ijo0fSwic2EiOnsiYSI6MCwiayI6MCwiaXgiOjV9LCJubSI6IlRyYW5zZm9ybSJ9XSwibm0iOiJHcm91cCAxIiwibnAiOjIsImNpeCI6MiwiYm0iOjAsIml4IjoxLCJtbiI6IkFEQkUgVmVjdG9yIEdyb3VwIiwiaGQiOmZhbHNlfSx7InR5IjoiZ3IiLCJpdCI6W3siaW5kIjowLCJ0eSI6InNoIiwiaXgiOjEsImtzIjp7ImEiOjAsImsiOnsiaSI6W1swLC00Mi4zMDhdLFswLDBdLFswLDQyLjMwOV0sWy00Mi4zMDcsMF1dLCJvIjpbWzAsNDIuMzA5XSxbMCwwXSxbMCwtNDIuMzA4XSxbNDIuMzA4LDBdXSwidiI6W1s3Ni42MDUsLTM2LjgxMl0sWzAsMTEzLjQxN10sWy03Ni42MDUsLTM2LjgxMl0sWzAsLTExMy40MTddXSwiYyI6dHJ1ZX0sIml4IjoyfSwibm0iOiJQYXRoIDEiLCJtbiI6IkFEQkUgVmVjdG9yIFNoYXBlIC0gR3JvdXAiLCJoZCI6ZmFsc2V9LHsidHkiOiJzdCIsImMiOnsiYSI6MCwiayI6WzAsMCwwLDFdLCJpeCI6M30sIm8iOnsiYSI6MCwiayI6MTAwLCJpeCI6NH0sInciOnsiYSI6MCwiayI6MTIsIml4Ijo1fSwibGMiOjIsImxqIjoyLCJibSI6MCwibm0iOiJTdHJva2UgMSIsIm1uIjoiQURCRSBWZWN0b3IgR3JhcGhpYyAtIFN0cm9rZSIsImhkIjpmYWxzZX0seyJ0eSI6InRyIiwicCI6eyJhIjowLCJrIjpbMTA2LjYwNSwxNDMuNDE3XSwiaXgiOjJ9LCJhIjp7ImEiOjAsImsiOlswLDBdLCJpeCI6MX0sInMiOnsiYSI6MCwiayI6WzEwMCwxMDBdLCJpeCI6M30sInIiOnsiYSI6MCwiayI6MCwiaXgiOjZ9LCJvIjp7ImEiOjAsImsiOjEwMCwiaXgiOjd9LCJzayI6eyJhIjowLCJrIjowLCJpeCI6NH0sInNhIjp7ImEiOjAsImsiOjAsIml4Ijo1fSwibm0iOiJUcmFuc2Zvcm0ifV0sIm5tIjoiR3JvdXAgMiIsIm5wIjoyLCJjaXgiOjIsImJtIjowLCJpeCI6MiwibW4iOiJBREJFIFZlY3RvciBHcm91cCIsImhkIjpmYWxzZX0seyJ0eSI6InRtIiwicyI6eyJhIjowLCJrIjoxMDAsIml4IjoxfSwiZSI6eyJhIjowLCJrIjowLCJpeCI6Mn0sIm8iOnsiYSI6MCwiayI6MCwiaXgiOjN9LCJtIjoxLCJpeCI6Mywibm0iOiJUcmltIE91dCBQYXRoIiwibW4iOiJBREJFIFZlY3RvciBGaWx0ZXIgLSBUcmltIiwiaGQiOmZhbHNlfSx7InR5IjoicmQiLCJubSI6IlJvdW5kIENvcm5lcnMgMSIsInIiOnsiYSI6MSwiayI6W3siaSI6eyJ4IjpbMC42NjddLCJ5IjpbMV19LCJvIjp7IngiOlswLjMzM10sInkiOlswXX0sInQiOjAsInMiOls4NV19LHsidCI6MTMsInMiOlswXX1dLCJpeCI6MX0sIml4Ijo0LCJtbiI6IkFEQkUgVmVjdG9yIEZpbHRlciAtIFJDIiwiaGQiOmZhbHNlfSx7InR5IjoidG0iLCJzIjp7ImEiOjAsImsiOjAsIml4IjoxfSwiZSI6eyJhIjoxLCJrIjpbeyJpIjp7IngiOlswLjVdLCJ5IjpbMV19LCJvIjp7IngiOlswLjE2N10sInkiOlswLjE2N119LCJ0IjowLCJzIjpbMF19LHsidCI6MTMsInMiOlsxMDBdfV0sIml4IjoyfSwibyI6eyJhIjowLCJrIjowLCJpeCI6M30sIm0iOjEsIml4Ijo1LCJubSI6IlRyaW0gSW4gUGF0aCIsIm1uIjoiQURCRSBWZWN0b3IgRmlsdGVyIC0gVHJpbSIsImhkIjpmYWxzZX1dLCJpcCI6MCwib3AiOjYwLCJzdCI6MCwiYm0iOjB9XSwibWFya2VycyI6W119'

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
          <h1 className="text-[clamp(1.5rem,6.3vw,3rem)] font-black leading-tight uppercase">Soccorso Stradale 24H</h1>
          <p className="mt-2 flex items-center justify-center gap-2 text-[clamp(1.65rem,7.2vw,4rem)] font-black leading-none tracking-tight text-[#75ff98]">
            <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#75ff98] shadow-[0_0_14px_#75ff98]" />
            DISPONIBILE ORA
          </p>
          <time aria-label={time ? 'Ora di Bergamo ' + time : undefined} className="mt-1 block min-h-[1em] text-[clamp(3rem,12vw,6rem)] font-black leading-none tracking-tight tabular-nums">{time}</time>
          <a href={'tel:' + tel} onClick={() => trackCall('hero')} className="mx-auto mt-3 flex min-h-14 w-full max-w-md flex-wrap items-center justify-center gap-x-3 rounded-xl bg-[#ffd33d] px-3 py-2.5 text-[#14251e] shadow-[0_4px_0_#be9016] transition-colors hover:bg-[#ffe47a] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white">
            <strong className="text-xl font-black sm:text-2xl">CHIAMA ORA</strong>
            <span className="whitespace-nowrap text-lg font-bold sm:text-xl">{phone}</span>
          </a>
          <p className="mx-auto mt-4 max-w-md text-lg font-bold leading-snug sm:text-xl">Ti inviamo il carroattrezzi più vicino e disponibile.</p>
          <p className="mt-1 text-base font-semibold text-[#75ff98] sm:text-lg">Così risparmi tempo e denaro.</p>
          <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 divide-x divide-white/20">
            <p className="px-1 font-bold"><strong className="block text-lg sm:text-2xl">20 MINUTI</strong><span className="text-base">Arrivo stimato</span></p>
            <p className="px-1 font-bold"><strong className="block text-lg text-[#ffd33d] sm:text-2xl">PREZZI BASSI ED ONESTI</strong><span className="text-base">In base ai km reali</span></p>
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
          <span aria-hidden="true" className="mx-auto block h-20 w-20">{ready && <lottie-player key={String(animate)} src={locationAnimation} background="transparent" speed="1" {...(animate ? { autoplay: true, loop: true } : {})} />}</span>
          <h2 className="text-xl font-black sm:text-2xl">Più vicino. Meno strada. Meno attesa.</h2>
          <p className="mt-1.5 text-base font-medium sm:text-lg">Chiamaci e dicci dove sei: ti inviamo il carroattrezzi più vicino disponibile. Prezzi bassi e onesti, in base ai km reali.</p>
        </section>
      </main>
      <footer className="mt-8 border-t border-[#375044] bg-[#14251e] px-4 pb-28 pt-8 text-[#fffdf2] sm:pb-8">
        <a href="/" className="inline-block rounded-lg bg-[#fffdf2] p-2"><img src="/images/viasos-logo-header-cropped.webp" alt="ViaSOS — Pagina iniziale" width="120" height="46" /></a>
        <p className="mt-3 text-lg font-bold">Soccorso stradale a Bergamo e provincia</p>
        <a className="mt-2 inline-block font-bold text-[#ffd33d]" href={'tel:' + tel} onClick={() => trackCall('footer')}>{phone}</a>
        <nav aria-label="Informazioni legali" className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-white/20 pt-5">
        <a className="underline" href="/privacy/">Privacy</a>
        <a className="underline" href="/cookie/">Cookie</a>
        <a className="underline" href="/termini/">Termini</a>
        </nav>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#375044] bg-[#14251e] px-4 pt-2 pb-[calc(.5rem+env(safe-area-inset-bottom))] sm:hidden">
        <a href={'tel:' + tel} onClick={() => trackCall('mobile_sticky')} className="mx-auto flex min-h-12 max-w-md flex-wrap items-center justify-center gap-x-2 rounded-xl bg-[#ffd33d] px-3 py-2 text-lg font-black text-[#14251e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          CHIAMA ORA <span className="whitespace-nowrap">{phone}</span>
        </a>
      </div>
    </div>
  )
}
