'use client'

import { useEffect, useRef, useState } from 'react'

const phone = '030 204 1794'
const tel = '+390302041794'
const trackingKeys = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_campaign', 'utm_term', 'utm_medium', 'utm_content']

function Icon({ name = 'phone' }: { name?: 'phone' | 'check' | 'arrow' | 'pin' | 'clock' | 'shield' }) {
  const paths = {
    phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z',
    check: 'm5 12 4 4L19 6', arrow: 'M5 12h14m-6-6 6 6-6 6',
    pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
    clock: 'M12 8v4l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',
    shield: 'M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6l-9-4Zm-5 10 3 3 7-7',
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}

function trackCall(placement: string) {
  // Tracking must never delay or prevent the phone link from opening.
  try {
    const params = new URLSearchParams(window.location.search)
    const campaign = Object.fromEntries(trackingKeys.map(key => [key, params.get(key) || '']))
    const payload = { evento: 'click_telefono', fonte: 'sponsorizzata_landing', page_type: 'landing_call_only', citta: 'Brescia', pagina: '/richiesta-brescia', telefono: tel, telefono_label: phone, placement, url: window.location.href, dominio: window.location.hostname, timestamp: new Date().toISOString(), ...campaign }
    const endpoint = process.env.NEXT_PUBLIC_PHONE_CLICK_WEBHOOK_URL || 'https://alessiothrasos.app.n8n.cloud/webhook/click-telefono-carroattrezzi-bergamo'
    const body = JSON.stringify(payload)
    if (!navigator.sendBeacon?.(endpoint, new Blob([body], { type: 'application/json' }))) {
      void fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {})
    }
  } catch { /* The call remains available if tracking is blocked. */ }
}

function CallButton({ placement, compact = false }: { placement: string; compact?: boolean }) {
  return <a className={`bc-call ${compact ? 'bc-call-compact' : ''}`} href={`tel:${tel}`} onClick={() => trackCall(placement)} aria-label={`Chiama ora il ${phone}`}><span className="bc-phone-icon"><Icon /></span><span><strong>Chiama ora</strong><span className="bc-number">{phone}</span></span><span className="bc-call-arrow"><Icon name="arrow" /></span></a>
}

const benefits = [
  { icon: 'clock' as const, title: 'Meno passaggi. Più rapidità.', text: 'Parli direttamente con il riferimento per Brescia. Descrivi dove sei e cosa è successo: il recupero parte da qui.' },
  { icon: 'shield' as const, title: 'Il prezzo, prima di decidere.', text: 'Chiedi subito il preventivo per il tuo caso. Conosci il costo prima dell’uscita e scegli liberamente se accettare.' },
  { icon: 'pin' as const, title: 'Il soccorso adatto alla zona.', text: 'Brescia e provincia: comunica via, comune o punto di riferimento. Concorda tempi e destinazione al telefono.' },
]
const faqs = [
  ['Quanto costa il carroattrezzi?', 'Il costo dipende da distanza, veicolo, orario e tipo di recupero. Chiama e descrivi la situazione: chiedi il preventivo prima dell’uscita del mezzo. Non hai alcun obbligo di accettare.'],
  ['Quanto tempo serve per arrivare?', 'Indica il punto esatto del veicolo: il professionista può confermarti la disponibilità del mezzo e il tempo di arrivo previsto, in base alla distanza e al traffico.'],
  ['Posso chiamare anche di notte?', 'Il riferimento telefonico è disponibile 24 ore, anche nei festivi. Chiama per organizzare l’assistenza e verificare l’intervento nella tua zona.'],
  ['Cosa devo dire quando chiamo?', 'Bastano il luogo in cui ti trovi, il tipo di veicolo e il problema. Se non conosci l’indirizzo, indica un punto di riferimento, l’uscita o la direzione di marcia.'],
]

const animatedCases = [
  ['Auto in panne', 'auto-rotta'],
  ['Batteria scarica', 'batteria'],
  ['Gomma danneggiata', 'gomme'],
  ['Recupero dopo incidente', 'incidente'],
  ['Veicolo bloccato', 'auto-bloccata'],
  ['Carburante esaurito', 'senza-benzina'],
]

function AnimatedCases() {
  const container = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    let cancelled = false
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setAnimate(!motion.matches)
    updateMotion()
    motion.addEventListener('change', updateMotion)
    const load = () => { void import('@lottiefiles/lottie-player').then(() => { if (!cancelled) setReady(true) }).catch(() => {}) }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { load(); observer.disconnect() } }, { rootMargin: '200px' })
    if (container.current) observer.observe(container.current)
    return () => { cancelled = true; observer.disconnect(); motion.removeEventListener('change', updateMotion) }
  }, [])
  return <div className="bc-cases" ref={container}>{animatedCases.map(([name, asset]) => <div key={asset}><div className="bc-case-animation" aria-hidden="true">{ready && <lottie-player key={String(animate)} src={`/lottie/brescia-request/${asset}.json`} background="transparent" speed="1" {...(animate ? { loop: true, autoplay: true } : {})} />}</div><h3>{name}</h3><Icon name="check" /></div>)}</div>
}

export default function BresciaCall() {
  return <div className="bc-page">
    <header className="bc-header bc-wrap"><img src="/images/viasos-logo-header-cropped.webp" alt="ViaSOS" width="180" height="70" /><div className="bc-header-zone"><Icon name="pin" /><span>Brescia e provincia<strong>Soccorso stradale 24 ore</strong></span></div><a className="bc-header-phone" href={`tel:${tel}`} onClick={() => trackCall('header')}><Icon />{phone}</a></header>
    <main>
      <section className="bc-hero"><div className="bc-wrap bc-hero-grid">
        <div className="bc-intro"><p className="bc-eyebrow"><span /> SOCCORSO STRADALE · BRESCIA</p><h1>Auto ferma?<br />Il prossimo passo<br /><em>è una chiamata.</em></h1><div className="bc-price-focus"><span className="bc-price-kicker">IL VANTAGGIO È NEL PREZZO</span><p><strong>Con noi spendi meno.</strong><span>Costi inferiori rispetto agli altri carroattrezzi in zona <b>Brescia e provincia.</b></span></p></div><div className="bc-promises"><span><Icon name="check" />Preventivo prima dell’uscita</span><span><Icon name="check" />Nessun obbligo di accettare</span></div><div className="bc-route" aria-hidden="true"><span className="bc-route-pin">⌖</span><span className="bc-route-line" /><span className="bc-route-truck">↗</span><span>BRESCIA<br /><b>Partiamo da dove sei.</b></span></div></div>
        <div className="bc-contact"><div className="bc-contact-top"><span className="bc-availability"><i /> ASSISTENZA TELEFONICA 24/7</span></div><h2 className="bc-available-title">Carroattrezzi <strong>disponibile</strong> al 100% in questo momento.</h2><CallButton placement="hero" /><div className="bc-contact-bottom"><Icon name="shield" /><p><strong>Chiedi il preventivo. Poi decidi.</strong><span>Prezzo e tempi del mezzo si confermano al telefono.</span></p></div></div>
      </div><div className="bc-road-stripe" aria-hidden="true" /></section>
      <section className="bc-benefits bc-wrap" aria-label="Perché chiamare ViaSOS">{benefits.map((item, i) => <article key={item.title}><div className="bc-benefit-top"><Icon name={item.icon} /><span>0{i + 1}</span></div><h2>{item.title}</h2><p>{item.text}</p></article>)}</section>
      <section className="bc-help"><div className="bc-wrap bc-help-grid"><div><p className="bc-eyebrow">DAL PROBLEMA ALLA SOLUZIONE</p><h2>Qualunque sia l’imprevisto,<br /><em>raccontacelo.</em></h2><p>Auto, moto e furgoni. Una chiamata per capire il problema e concordare il recupero più adatto.</p><a className="bc-inline-call" href={`tel:${tel}`} onClick={() => trackCall('services')}>Parla con il riferimento di Brescia <Icon name="arrow" /></a></div><AnimatedCases /></div></section>
      <section className="bc-wrap bc-faq"><div><p className="bc-eyebrow">PRIMA DI CHIAMARE</p><h2>Poche informazioni.<br />Tutto più chiaro.</h2><p>Il prezzo, i tempi, il punto di recupero.<br />Definisci tutto durante la chiamata.</p></div><div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></section>
      <section className="bc-final bc-wrap"><div><p className="bc-eyebrow">BRESCIA E PROVINCIA · 24 ORE</p><h2>Fermo con il veicolo?<br /><em>Facciamo il prossimo passo.</em></h2><p>Chiama, spiega il problema e chiedi il tuo preventivo.</p></div><CallButton placement="closing" /></section>
    </main>
    <footer className="bc-footer bc-wrap"><span>© {new Date().getFullYear()} ViaSOS · P. IVA 02606820690</span><nav aria-label="Informazioni legali"><a href="/privacy/">Privacy</a><a href="/cookie/">Cookie</a><a href="/termini/">Termini</a></nav></footer>
    <div className="bc-mobile-dock"><CallButton placement="mobile_sticky" compact /></div>
  </div>
}
