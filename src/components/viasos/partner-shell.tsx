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
        'min-h-screen bg-[#f3f7fb] text-[#07111f]',
        className,
      )}
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[520px] bg-[linear-gradient(135deg,#06111f_0%,#0d3440_42%,#f4fbff_100%)]" />
      <header className="sticky inset-x-0 top-0 z-40 border-b border-white/60 bg-white/90 shadow-sm shadow-slate-950/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="/" aria-label="Home ViaSOS">
            <Brand />
          </a>
          <nav className="flex items-center gap-3 text-sm font-black">
            <a
              href="/partner/login"
              className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-slate-700 shadow-sm transition hover:border-[#25d366] hover:text-[#075e54]"
            >
              Accedi
            </a>
            <a
              href="/partner/registrazione"
              className="rounded-full bg-[#07111f] px-4 py-2.5 text-white shadow-lg shadow-slate-950/15 transition hover:bg-[#123456]"
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
    <span className="inline-flex rounded-full border border-emerald-200 bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#075e54] shadow-sm shadow-emerald-950/5">
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
        'rounded-[1.75rem] border border-white/80 bg-white/95 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/70 backdrop-blur',
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
