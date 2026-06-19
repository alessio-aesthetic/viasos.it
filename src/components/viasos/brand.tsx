import { clsx } from 'clsx'

export function Brand({ className }: { className?: string }) {
  return (
    <div className={clsx('flex items-center', className)}>
      <img
        src="/images/viasos-logo-header.webp"
        alt="ViaSOS"
        className="h-20 w-auto sm:h-24 lg:h-28"
      />
    </div>
  )
}
