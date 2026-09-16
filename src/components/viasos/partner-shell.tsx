import { clsx } from 'clsx'
import { Brand } from './brand'

export function PartnerShell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={clsx('rescue-partner vp-app', className)}>
      <header className="vp-header">
        <div className="vp-container">
          <a href="/" aria-label="Home ViaSOS">
            <Brand />
          </a>
          <span className="vp-header-label">RETE PARTNER / AREA OPERATIVA</span>
          <nav aria-label="Portale partner">
            <a href="/partner/">La rete</a>
            <a href="/partner/login/">Accedi</a>
            <a className="vp-header-join" href="/partner/registrazione/">
              Entra nella rete ↗
            </a>
          </nav>
        </div>
      </header>
      {children}
      <footer className="vp-footer vp-container">
        <span>ViaSOS · La strada ci connette.</span>
        <a href="/privacy/">Privacy</a>
        <a href="mailto:assistenza@viasos.it">assistenza@viasos.it</a>
      </footer>
    </div>
  )
}
export function PartnerBadge({ children }: { children: React.ReactNode }) {
  return <span className="vp-eyebrow">{children}</span>
}
export function PartnerPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <section className={clsx('vp-panel', className)}>{children}</section>
}
export function StatusPill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'green' | 'yellow' | 'red' | 'neutral'
}) {
  return <span className={`vp-pill vp-pill-${tone}`}>{children}</span>
}
