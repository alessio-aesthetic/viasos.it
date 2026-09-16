'use client'

import {
  PartnerBadge,
  PartnerPanel,
  PartnerShell,
  StatusPill,
} from '@/components/viasos/partner-shell'
import { partnerRequest } from '@/lib/partner-api'
import {
  ArrowUpRightIcon,
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useMemo, useState, type FormEvent } from 'react'

type Partner = Record<string, string | number | boolean | undefined>
type Lead = {
  id: string
  Nome?: string
  Citta?: string
  Servizio?: string
  Descrizione?: string
  stato_lead?: string
  'Esito Chiamata'?: string
  'Feedback Carroattrezzi'?: string
  'Commissione Pagata'?: boolean
  'Da Fatturare'?: boolean
  'Importo Commissione'?: number
  'Link Pagamento Nexi'?: string
  'Link Pagamento Stripe'?: string
  'Data Creazione Lead'?: string
  Data?: string
}
type Data = {
  ok: boolean
  partner: Partner
  leads: Lead[]
  priority?: { share: number | null; mode: string }
}
const number = (p: Partner, k: string) =>
  typeof p[k] === 'number' && Number.isFinite(p[k]) ? (p[k] as number) : null
const text = (p: Partner, k: string) =>
  typeof p[k] === 'string' ? (p[k] as string) : ''
const euro = (n: number) =>
  new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(
    n,
  )
function bill(lead: Lead) {
  return lead['Commissione Pagata']
    ? 'paid'
    : lead['Da Fatturare'] === true
      ? 'due'
      : 'none'
}
function paymentUrl(lead: Lead) {
  const value = lead['Link Pagamento Nexi'] || lead['Link Pagamento Stripe']
  if (!value) return null
  try {
    const u = new URL(value)
    return u.protocol === 'https:' ? value : null
  } catch {
    return null
  }
}
function date(lead: Lead) {
  const v = lead['Data Creazione Lead'] || lead.Data
  if (!v) return 'Data non disponibile'
  const d = new Date(v)
  return isNaN(d.getTime())
    ? 'Data non disponibile'
    : d.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
}

export default function PartnerDashboard() {
  const [data, setData] = useState<Data | null>(null),
    [error, setError] = useState(''),
    [loading, setLoading] = useState(true)
  const [token, setToken] = useState('')
  useEffect(() => {
    const t =
      new URLSearchParams(location.search).get('token') ||
      sessionStorage.getItem('viasos-partner-session') ||
      ''
    setToken(t)
    if (!t) {
      setLoading(false)
      return
    }
    sessionStorage.setItem('viasos-partner-session', t)
    history.replaceState(null, '', '/partner/dashboard/')
    partnerRequest<Data>('viasos-partner-dashboard', { token: t })
      .then((r) => {
        if (!r.partner || !Array.isArray(r.leads))
          throw new Error('Dati del profilo non disponibili.')
        setData(r)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])
  if (!data)
    return (
      <PartnerShell>
        <main className="vp-container vp-dashboard-gate">
          <div className="vp-gate-symbol">
            <TruckIcon />
          </div>
          <PartnerBadge>AREA OPERATIVA</PartnerBadge>
          <h1>
            {loading
              ? 'Prepariamo la tua dashboard.'
              : 'La tua attività, in un solo posto.'}
          </h1>
          <p>
            {loading
              ? 'Recupero disponibilità, chiamate e servizi del tuo profilo.'
              : error ||
                'Accedi per gestire la disponibilità e consultare chiamate, servizi e pagamenti.'}
          </p>
          {loading ? (
            <div className="vp-loading-line" />
          ) : (
            <a className="vp-button" href="/partner/login/">
              Accedi alla dashboard ↗
            </a>
          )}
        </main>
      </PartnerShell>
    )
  return <Dashboard data={data} token={token} update={setData} />
}
function Dashboard({
  data,
  token,
  update,
}: {
  data: Data
  token: string
  update: (d: Data) => void
}) {
  const p = data.partner,
    [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(''),
    [filter, setFilter] = useState('all'),
    [query, setQuery] = useState(''),
    [page, setPage] = useState(1)
  const [fiscal, setFiscal] = useState({
    vatNumber: text(p, 'Partita IVA'),
    taxCode: text(p, 'Codice Fiscale'),
    sdi: text(p, 'Codice Destinatario SDI'),
    pec: text(p, 'PEC Fatturazione'),
  })
  const [fiscalBusy, setFiscalBusy] = useState(false),
    [fiscalMessage, setFiscalMessage] = useState('')
  const available = p.Attivo === true && p['Pausa Operativa'] !== true
  const taken = number(p, 'Chiamate Prese'),
    missed = number(p, 'Chiamate Non Prese'),
    negotiating = number(p, 'Chiamate In Trattativa')
  const configured =
    p['Pausa Operativa'] === true ? 0 : (data.priority?.share ?? null)
  const first = data.leads.filter(
    (l) =>
      (l as Lead & { 'Prima Chiamata Diretta'?: boolean })[
        'Prima Chiamata Diretta'
      ],
  ).length
  const acceptance =
    taken !== null && missed !== null && taken + missed > 0
      ? Math.round((taken / (taken + missed)) * 100)
      : null
  const due = data.leads.filter((l) => bill(l) === 'due'),
    paid = data.leads.filter((l) => bill(l) === 'paid')
  const dueAmount = due.reduce(
    (sum, l) => sum + (l['Importo Commissione'] || 0),
    0,
  )
  const filtered = useMemo(
    () =>
      data.leads.filter(
        (l) =>
          (filter === 'all' || bill(l) === filter) &&
          [
            l.Citta,
            l.Servizio,
            l.Nome,
            l.id,
            l['Esito Chiamata'],
            l['Feedback Carroattrezzi'],
          ]
            .join(' ')
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [data.leads, filter, query],
  )
  const pages = Math.max(1, Math.ceil(filtered.length / 8)),
    currentPage = Math.min(page, pages)
  async function changeAvailability() {
    setBusy(true)
    setNotice('')
    try {
      const r = await partnerRequest<{ partner: Partner }>(
        'viasos-partner-dashboard',
        { token, action: 'availability', available: !available },
      )
      if (!r.partner) throw new Error('Stato non confermato dal sistema.')
      update({ ...data, partner: r.partner })
      setNotice('Disponibilità aggiornata.')
      try {
        const fresh = await partnerRequest<Data>('viasos-partner-dashboard', {
          token,
        })
        update(fresh)
      } catch {
        setNotice(
          'Disponibilità salvata. Premi Aggiorna per ricaricare le statistiche.',
        )
      }
    } catch (e) {
      setNotice(e instanceof Error ? e.message : 'Aggiornamento non riuscito.')
    } finally {
      setBusy(false)
    }
  }
  async function saveFiscal(e: FormEvent) {
    e.preventDefault()
    setFiscalBusy(true)
    setFiscalMessage('')
    try {
      await partnerRequest('viasos-partner-dashboard', {
        token,
        action: 'fiscal',
        ...fiscal,
      })
      setFiscalMessage('Dati fiscali salvati.')
    } catch (e) {
      setFiscalMessage(
        e instanceof Error ? e.message : 'Salvataggio non riuscito.',
      )
    } finally {
      setFiscalBusy(false)
    }
  }
  function logout() {
    sessionStorage.removeItem('viasos-partner-session')
    location.href = '/partner/login/'
  }
  return (
    <PartnerShell>
      <main className="vp-container vp-dashboard">
        <div className="vp-dash-top">
          <div>
            <PartnerBadge>LA TUA AREA OPERATIVA</PartnerBadge>
            <h1>{text(p, 'Nome Ditta') || 'La tua attività'}</h1>
            <p>
              {text(p, 'Citta')} · {text(p, 'WhatsApp')}
            </p>
          </div>
          <div className="vp-dash-top-actions">
            <StatusPill tone={p.Attivo ? 'green' : 'yellow'}>
              {text(p, 'Stato Registrazione') ||
                (p.Attivo ? 'Profilo attivo' : 'In attesa di attivazione')}
            </StatusPill>
            <button
              className="vp-quiet-button"
              onClick={() => location.reload()}
            >
              Aggiorna
            </button>
            <button className="vp-quiet-button" onClick={logout}>
              Esci ↗
            </button>
          </div>
        </div>
        <div className="vp-dash-nav">
          <a href="#operativita">Operatività</a>
          <a href="#servizi">Servizi e pagamenti</a>
          <a href="#profilo">Profilo e fatturazione</a>
          <span>DATI DEL TUO PROFILO</span>
        </div>
        <section id="operativita" className="vp-availability">
          <div>
            <span className={`vp-live-dot ${available ? 'is-live' : ''}`} />
            <div>
              <PartnerBadge>DISPONIBILITÀ OPERATIVA</PartnerBadge>
              <h2>{available ? 'Pronto a ricevere.' : 'Chiamate in pausa.'}</h2>
              <p>
                {p.Attivo
                  ? 'Puoi mettere in pausa nuove chiamate e assegnazioni automatiche. I servizi già avviati restano attivi.'
                  : 'Il profilo deve essere attivato da ViaSOS prima di ricevere chiamate.'}
              </p>
            </div>
          </div>
          <button
            role="switch"
            aria-checked={available}
            aria-label="Disponibilità operativa"
            className="vp-availability-switch"
            disabled={busy || p.Attivo !== true}
            onClick={changeAvailability}
          >
            <span>
              {busy ? 'Salvataggio…' : available ? 'Disponibile' : 'In pausa'}
            </span>
            <i>
              <b />
            </i>
          </button>
        </section>
        {notice && (
          <p className="vp-message" role="status">
            {notice}
          </p>
        )}
        <div className="vp-metrics">
          <Metric
            icon={<CheckIcon />}
            label="Sì, preso"
            value={taken}
            caption="Esiti presi della chiamata"
          />
          <Metric
            icon={<PhoneIcon />}
            label="Non preso"
            value={missed}
            caption="Esiti non confermati"
          />
          <Metric
            icon={<ClockIcon />}
            label="In trattativa"
            value={negotiating}
            caption="Esiti in trattativa"
          />
          <Metric
            icon={<TruckIcon />}
            label="Servizi nello storico"
            value={data.leads.length}
            caption="Tutti i servizi associati"
          />
        </div>
        <div className="vp-dash-insights">
          <section className="vp-priority">
            <PartnerBadge>LA PRIMA CHIAMATA</PartnerBadge>
            <div className="vp-priority-main">
              <div>
                <h2>
                  La tua priorità
                  <br />
                  parte dagli esiti.
                </h2>
                <p>
                  Ogni Sì, preso migliora il tuo indicatore di esito; ogni Non
                  preso lo riduce. Conferma sempre il risultato reale del
                  contatto.
                </p>
              </div>
              <div className="vp-priority-number">
                <strong>
                  {configured !== null
                    ? Math.max(0, Math.min(100, configured))
                    : '—'}
                  <small>{configured !== null ? '%' : ''}</small>
                </strong>
                <span>QUOTA SUL NUMERO DI RIFERIMENTO</span>
              </div>
            </div>
            <div className="vp-priority-track">
              <span
                style={{
                  width: `${configured !== null ? Math.max(0, Math.min(100, configured)) : 0}%`,
                }}
              />
            </div>
            <p className="vp-priority-note">
              {configured === null
                ? 'La percentuale di prima chiamata non è ancora disponibile per questo profilo.'
                : 'Quota calcolata dai pesi e dai partner disponibili sul numero di riferimento. Il punteggio degli esiti è separato: non garantisce chiamate. I numeri dedicati seguono un instradamento specifico.'}
            </p>
            <div className="vp-priority-footer">
              <span>
                Esiti presi / presi + non presi{' '}
                <b>{acceptance === null ? '—' : `${acceptance}%`}</b>
              </span>
              <span>
                Prime chiamate nello storico <b>{first}</b>
              </span>
            </div>
          </section>
          <section className="vp-balance">
            <PartnerBadge>COMMISSIONI</PartnerBadge>
            <h2>Da pagare</h2>
            <strong>{euro(dueAmount)}</strong>
            <p>{due.length} servizi con commissione da saldare</p>
            <div>
              <span>Servizi pagati</span>
              <b>{paid.length}</b>
            </div>
            <a
              href="#servizi"
              onClick={() => {
                setFilter('due')
                setPage(1)
              }}
              className="vp-button"
            >
              Vedi i servizi da pagare <ArrowUpRightIcon />
            </a>
            <small>
              Le commissioni sono quelle registrate nei singoli servizi.
              {due.some((l) => l['Importo Commissione'] === undefined) &&
                ' Alcuni servizi attendono ancora la registrazione dell’importo e non sono inclusi nel totale.'}
            </small>
          </section>
        </div>
        <section id="servizi" className="vp-services">
          <div className="vp-section-heading">
            <div>
              <PartnerBadge>DAL CONTATTO AL PAGAMENTO</PartnerBadge>
              <h2>Tutti i tuoi servizi.</h2>
            </div>
            <label className="vp-search">
              Cerca nello storico
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setPage(1)
                }}
                placeholder="Comune, servizio o riferimento"
              />
            </label>
          </div>
          <div className="vp-service-filters" aria-label="Filtra per pagamento">
            {[
              ['all', 'Tutti', data.leads.length],
              ['due', 'Da pagare', due.length],
              ['paid', 'Pagati', paid.length],
              [
                'none',
                'Non da pagare',
                data.leads.length - due.length - paid.length,
              ],
            ].map(([key, label, count]) => (
              <button
                key={key}
                aria-pressed={filter === key}
                onClick={() => {
                  setFilter(String(key))
                  setPage(1)
                }}
              >
                {label}
                <span>{count}</span>
              </button>
            ))}
          </div>
          <div className="vp-service-list">
            {filtered.slice((currentPage - 1) * 8, currentPage * 8).map((l) => {
              const status = bill(l),
                url = paymentUrl(l)
              return (
                <article className="vp-service-row" key={l.id}>
                  <div className="vp-service-icon">
                    <TruckIcon />
                  </div>
                  <div className="vp-service-details">
                    <span>
                      {date(l)} · {l.id.slice(-6).toUpperCase()}
                    </span>
                    <h3>
                      {l.Servizio || 'Soccorso stradale'} ·{' '}
                      {l.Citta || 'Comune non indicato'}
                    </h3>
                    <p>
                      {l['Esito Chiamata'] ||
                        l['Feedback Carroattrezzi'] ||
                        l.stato_lead ||
                        'Esito in aggiornamento'}
                    </p>
                  </div>
                  <div className="vp-service-payment">
                    <strong>
                      {(l['Importo Commissione'] ?? 0) > 0
                        ? euro(l['Importo Commissione']!)
                        : '—'}
                    </strong>
                    <StatusPill
                      tone={
                        status === 'paid'
                          ? 'green'
                          : status === 'due'
                            ? 'yellow'
                            : 'neutral'
                      }
                    >
                      {status === 'paid'
                        ? 'Pagato'
                        : status === 'due'
                          ? 'Da pagare'
                          : 'Non da pagare'}
                    </StatusPill>
                  </div>
                  {status === 'due' && url ? (
                    <a
                      className="vp-pay-link"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Paga ↗
                    </a>
                  ) : (
                    <span className="vp-service-link-note">
                      {status === 'due' ? 'Link non disponibile' : ''}
                    </span>
                  )}
                  <details>
                    <summary>Dettagli del servizio</summary>
                    <p>{l.Descrizione || 'Nessuna descrizione aggiuntiva.'}</p>
                  </details>
                </article>
              )
            })}
            {!filtered.length && (
              <div className="vp-empty">
                <TruckIcon />
                <h3>
                  {data.leads.length
                    ? 'Nessun risultato per questo filtro.'
                    : 'Il primo servizio comincia da una chiamata.'}
                </h3>
                <p>
                  {data.leads.length
                    ? 'Prova un altro comune o uno stato diverso.'
                    : 'Quando un servizio sarà associato al tuo profilo, troverai qui esito e stato della commissione.'}
                </p>
              </div>
            )}
          </div>
          <div className="vp-pagination">
            <span>
              {filtered.length} servizi · Pagina {currentPage} di {pages}
            </span>
            <button
              disabled={currentPage <= 1}
              onClick={() => setPage(currentPage - 1)}
            >
              ← Precedente
            </button>
            <button
              disabled={currentPage >= pages}
              onClick={() => setPage(currentPage + 1)}
            >
              Successiva →
            </button>
          </div>
        </section>
        <section id="profilo" className="vp-profile-grid">
          <PartnerPanel>
            <PartnerBadge>BASE OPERATIVA</PartnerBadge>
            <h2>Il tuo territorio.</h2>
            <dl>
              <dt>Attività</dt>
              <dd>{text(p, 'Nome Ditta') || 'Non indicata'}</dd>
              <dt>Base</dt>
              <dd>
                {[text(p, 'Indirizzo Fatturazione'), text(p, 'Citta')]
                  .filter(Boolean)
                  .join(', ') || 'Non indicata'}
              </dd>
              <dt>Copertura</dt>
              <dd>
                {number(p, 'Copertura KM') !== null
                  ? `${number(p, 'Copertura KM')} km`
                  : 'Non indicata'}
              </dd>
              <dt>Autostrada</dt>
              <dd>
                {p['Abilitato Autostrada'] ? 'Abilitato' : 'Non abilitato'}
              </dd>
            </dl>
            <a className="vp-text-link" href="mailto:assistenza@viasos.it">
              Richiedi un aggiornamento del profilo ↗
            </a>
          </PartnerPanel>
          <PartnerPanel>
            <PartnerBadge>DATI DI FATTURAZIONE</PartnerBadge>
            <h2>Contabilità in ordine.</h2>
            <form className="vp-form vp-fiscal-form" onSubmit={saveFiscal}>
              {[
                ['vatNumber', 'Partita IVA'],
                ['taxCode', 'Codice fiscale'],
                ['sdi', 'Codice SDI'],
                ['pec', 'PEC'],
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    className="partner-input"
                    type={key === 'pec' ? 'email' : 'text'}
                    value={fiscal[key as keyof typeof fiscal]}
                    onChange={(e) =>
                      setFiscal({ ...fiscal, [key]: e.target.value })
                    }
                  />
                </label>
              ))}
              {fiscalMessage && (
                <p className="vp-message" role="status">
                  {fiscalMessage}
                </p>
              )}
              <button className="vp-button" disabled={fiscalBusy}>
                {fiscalBusy ? 'Salvataggio…' : 'Salva i dati fiscali ↗'}
              </button>
            </form>
          </PartnerPanel>
        </section>
      </main>
    </PartnerShell>
  )
}
function Metric({
  icon,
  label,
  value,
  caption,
}: {
  icon: React.ReactNode
  label: string
  value: number | null
  caption: string
}) {
  return (
    <section className="vp-metric">
      <div>
        {icon}
        <span>{label}</span>
      </div>
      <strong>{value ?? '—'}</strong>
      <p>{value === null ? 'Dato non ancora disponibile' : caption}</p>
    </section>
  )
}
