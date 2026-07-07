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
    <main
      className={clsx(
        'min-h-screen bg-[#f6f9fc] text-[#07111f]',
        className,
      )}
    >
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" aria-label="Home ViaSOS">
            <Brand />
          </a>
          <nav className="flex items-center gap-3 text-sm font-black">
            <a
              href="/partner/login"
              className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-slate-700 transition hover:border-[#25d366]"
            >
              Accedi
            </a>
            <a
              href="/partner/registrazione"
              className="rounded-full bg-[#07111f] px-4 py-2.5 text-white shadow-lg shadow-slate-950/10 transition hover:bg-[#123456]"
            >
              Registrati
            </a>
          </nav>
        </div>
      </header>
      {children}
    </main>
  )
}

export function PartnerBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#075e54] shadow-sm">
      {children}
    </span>
  )
}

export function PartnerPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={clsx(
        'rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-950/5',
        className,
      )}
    >
      {children}
    </section>
  )
}

export function StatusPill({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'green' | 'yellow' | 'red' | 'neutral'
}) {
  const classes = {
    green: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    yellow: 'bg-amber-50 text-amber-800 ring-amber-200',
    red: 'bg-red-50 text-red-800 ring-red-200',
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
  }

  return (
    <span
      className={clsx(
        'inline-flex rounded-full px-3 py-1 text-xs font-black ring-1',
        classes[tone],
      )}
    >
      {children}
    </span>
  )
}
