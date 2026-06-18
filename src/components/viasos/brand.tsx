import { clsx } from 'clsx'

export function Brand({ className }: { className?: string }) {
  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <div className="relative grid size-10 place-items-center rounded-2xl bg-[#07111f] shadow-lg shadow-[#07111f]/20">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-6 text-emerald-400"
        >
          <path
            fill="currentColor"
            d="M16 2.5c-5.2 0-9.4 4.2-9.4 9.4 0 6.7 8.2 16.9 8.6 17.3a1 1 0 0 0 1.6 0c.4-.4 8.6-10.6 8.6-17.3 0-5.2-4.2-9.4-9.4-9.4Zm0 13.2a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Z"
          />
        </svg>
        <span className="absolute -right-1 -top-1 rounded-full bg-[#ffd34d] px-1.5 py-0.5 text-[9px] font-black text-[#07111f]">
          SOS
        </span>
      </div>
      <span className="text-2xl font-black tracking-tight text-[#07111f]">
        ViaSOS
      </span>
    </div>
  )
}

