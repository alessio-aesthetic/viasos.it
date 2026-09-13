'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { MapPinIcon, ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { normalizePlace, requestPosition, resolveLocation } from '@/lib/location-flow.mjs'

type Place={name:string;province:string;code:string;url:string;latitude:number;longitude:number}
let cached:Promise<Place[]>|null=null
function loadPlaces(){
  if(!cached){
    const controller=new AbortController()
    const timeout=setTimeout(()=>controller.abort(),8000)
    cached=fetch('/local-assets/cities.json?v=geo1',{signal:controller.signal}).then(async r=>{
    if(!r.ok)throw Error('Elenco non disponibile')
    const data:Place[]=await r.json()
    if(!data.length||!data.every(c=>typeof c.name==='string'&&typeof c.province==='string'&&typeof c.code==='string'&&c.url.startsWith('/carroattrezzi/')&&Number.isFinite(c.latitude)&&Number.isFinite(c.longitude)))throw Error('Elenco non valido')
    return data
  }).catch(e=>{cached=null;throw e}).finally(()=>clearTimeout(timeout))
  }
  return cached
}

export function LocationFinder(){
  const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[manual,setManual]=useState(false)
  const [query,setQuery]=useState(''),[places,setPlaces]=useState<Place[]>([]),[suggested,setSuggested]=useState<Place[]>([])
  const [clock,setClock]=useState(''),[loading,setLoading]=useState(false)
  const action=useRef(0)
  useEffect(()=>{const tick=()=>setClock(new Intl.DateTimeFormat('it-IT',{timeZone:'Europe/Rome',hour:'2-digit',minute:'2-digit'}).format(new Date()));tick();const id=setInterval(tick,30000);return()=>{clearInterval(id);action.current++}},[])
  const matches=useMemo(()=>{const q=normalizePlace(query);if(q.length<2)return[];return places.filter(c=>normalizePlace(c.name).includes(q)||normalizePlace(c.province).includes(q)||normalizePlace(c.code)===q).sort((a,b)=>Number(normalizePlace(b.name)===q)-Number(normalizePlace(a.name)===q)||Number(normalizePlace(b.name).startsWith(q))-Number(normalizePlace(a.name).startsWith(q))||a.name.localeCompare(b.name,'it')).slice(0,8)},[query,places])
  async function openManual(){action.current++;setBusy(false);setManual(true);setLoading(true);try{setPlaces(await loadPlaces())}catch{setMessage('Usa l’elenco per regione qui sotto: la ricerca non è disponibile.')}finally{setLoading(false)}}
  async function locate(){
    const id=++action.current;setBusy(true);setMessage('Rilevamento della posizione… Consenti l’accesso quando il browser lo chiede.');setSuggested([])
    if(!navigator.geolocation){setMessage('Questo browser non supporta la posizione. Scegli il tuo comune.');void openManual();return}
    try{
      const [position,data]=await Promise.all([requestPosition(navigator.geolocation),loadPlaces()])
      if(id!==action.current)return
      const result=resolveLocation(data,position.coords)
      setPlaces(data)
      if(!result.automatic){setManual(true);setSuggested(result.distance<=100?result.alternatives.map(x=>x.city):[]);setMessage('La posizione è imprecisa o lontana dai comuni dell’elenco. Scegli il comune del veicolo.');setBusy(false);return}
      setMessage(`Zona individuata: ${result.city.name}. Apertura del contatto…`)
      window.location.assign(result.city.url)
    }catch(error){
      if(id!==action.current)return
      const code=(error as {code?:number}).code
      setMessage(code===1?'Posizione non consentita. Puoi cercare subito il comune.':code===3?'La posizione sta impiegando troppo tempo. Scegli il comune oppure riprova.':'Non riesco a rilevare la posizione. Cerca il comune oppure riprova.')
      setBusy(false);setManual(true);setLoading(true)
      try{setPlaces(await loadPlaces())}catch{setMessage('Apri l’elenco per regione per scegliere il tuo comune.')}finally{setLoading(false)}
    }
  }
  return <div className="location-finder" id="assistenza">
    <div className="location-status"><span className="location-led"/><span>Carroattrezzi disponibile ora<small>Chiama per confermare disponibilità e tempi</small></span><time>{clock?`Ore ${clock}`:'Ora italiana'}</time></div>
    <button className="locate-primary" onClick={locate} disabled={busy} type="button"><MapPinIcon aria-hidden="true"/><span>{busy?'Sto trovando la tua zona…':'Usa la mia posizione'}<small>{busy?'Attendi il rilevamento del browser':'Trova il comune. Vai al numero. Chiama.'}</small></span><ArrowRightIcon aria-hidden="true"/></button>
    <p className="location-privacy">La posizione resta nel tuo browser. Nessun numero da inserire.</p>
    <p className="location-message" role="status" aria-live="polite">{message}</p>
    <noscript><a href="/carroattrezzi/">Scegli il tuo comune e trova il numero da chiamare →</a></noscript>
    <button className="manual-toggle" type="button" onClick={openManual} aria-expanded={manual}><MagnifyingGlassIcon aria-hidden="true"/> Oppure cerca il comune a mano</button>
    {manual&&<div className="manual-search"><label htmlFor="home-city">Dove si trova il veicolo?</label><input id="home-city" type="search" placeholder="Es. Bergamo, Padova, Udine…" value={query} onChange={e=>setQuery(e.target.value)} autoComplete="off"/>{loading&&<p role="status">Caricamento dei comuni…</p>}{!loading&&query.length>=2&&!matches.length&&<p role="status">Nessun risultato. Prova il nome della provincia.</p>}<div className="city-matches">{(query.length>=2?matches:suggested).map(c=><a key={c.url} href={c.url}><span>{c.name}<small>{c.province} ({c.code})</small></span><ArrowRightIcon aria-hidden="true"/></a>)}</div><a href="/carroattrezzi/" className="all-cities">Sfoglia tutti i comuni per regione →</a></div>}
    <div className="location-steps"><span><b>01</b> Posizione</span><span><b>02</b> Comune</span><span><b>03</b> Chiama</span></div>
  </div>
}
