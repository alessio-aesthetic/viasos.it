'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

import {
  PartnerBadge,
  PartnerPanel,
  PartnerShell,
} from '@/components/viasos/partner-shell'
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
      const result = await partnerRequest<{ url: string }>(
        'viasos-partner-login',
        {
          phone,
          password,
        },
      )
      window.location.href = result.url
    } catch (error) {
      setLoading(false)
      setMessage(
        error instanceof Error ? error.message : 'Accesso non riuscito.',
      )
    }
  }

  async function requestPasswordReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setResetLoading(true)
    setResetMessage('')

    try {
      await partnerRequest('viasos-partner-password-reset', {
        phone: resetPhone,
      })
      setResetMessage(
        'Richiesta inviata. Riceverai le istruzioni sul numero associato al profilo.',
      )
      setResetPhone('')
    } catch (error) {
      setResetMessage(
        error instanceof Error
          ? error.message
          : 'Non è stato possibile richiedere il reset.',
      )
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <PartnerShell>
      <main className="vp-container vp-auth-layout">
        <div className="vp-auth-story">
          <PartnerBadge>LE CHIAMATE. I SERVIZI. LA TUA ATTIVITÀ.</PartnerBadge>
          <h1>
            Rimettiti
            <br />
            <em>in linea.</em>
          </h1>
          <p>
            Il tuo spazio operativo: aggiorna la disponibilità, segui gli esiti
            e tieni sotto controllo le commissioni.
          </p>
          <div className="vp-auth-route" aria-hidden="true">
            <span>01 / DISPONIBILITÀ</span>
            <span>02 / CHIAMATE</span>
            <span>03 / SERVIZI</span>
          </div>
          <a href="/partner/" className="vp-text-link">
            Scopri la rete ViaSOS ↗
          </a>
        </div>
        <PartnerPanel className="vp-auth-form">
          <PartnerBadge>ACCESSO PARTNER</PartnerBadge>
          <h2>Benvenuto a bordo.</h2>
          <p>Accedi con il numero associato al tuo profilo.</p>
          <form onSubmit={submit} className="vp-form">
            <label>
              Numero di telefono
              <input
                className="partner-input"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+39"
                required
              />
            </label>
            <label>
              Password
              <input
                className="partner-input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                required
              />
            </label>
            {message && (
              <p className="vp-message vp-error" role="alert">
                {message}
              </p>
            )}
            <button className="vp-button" disabled={loading}>
              {loading ? 'Accesso in corso…' : 'Accedi alla dashboard ↗'}
            </button>
          </form>
          <button
            className="vp-reset-toggle"
            type="button"
            aria-expanded={resetOpen}
            onClick={() => {
              setResetOpen(!resetOpen)
              setResetMessage('')
            }}
          >
            Password dimenticata?
          </button>
          {resetOpen && (
            <form
              className="vp-reset-form vp-form"
              onSubmit={requestPasswordReset}
            >
              <h3>Recupera l’accesso</h3>
              <p>Ti invieremo le istruzioni al numero del profilo.</p>
              <label>
                Numero di telefono
                <input
                  className="partner-input"
                  type="tel"
                  value={resetPhone}
                  onChange={(e) => setResetPhone(e.target.value)}
                  required
                />
              </label>
              {resetMessage && (
                <p className="vp-message" role="status">
                  {resetMessage}
                </p>
              )}
              <button className="vp-button" disabled={resetLoading}>
                {resetLoading ? 'Invio in corso…' : 'Invia le istruzioni'}
              </button>
            </form>
          )}
          <div className="vp-auth-signup">
            Non sei ancora nella rete?
            <a href="/partner/registrazione/">Crea il tuo profilo →</a>
          </div>
        </PartnerPanel>
      </main>
    </PartnerShell>
  )
}
