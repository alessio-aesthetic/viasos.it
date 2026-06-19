import { clsx } from 'clsx'

export function Brand({ className }: { className?: string }) {
  return (
    <div className={clsx('flex items-center', className)}>
      <img
        src="/images/viasos-logo-header.webp"
        alt="ViaSOS"
        className="h-11 w-auto rounded-2xl shadow-lg shadow-slate-950/15 sm:h-12"
      />
    </div>
  )
}
