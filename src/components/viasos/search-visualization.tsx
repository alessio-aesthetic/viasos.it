const operators = [
  {
    label: 'Operatore 1',
    status: 'verifica disponibilità',
    state: 'checking',
  },
  {
    label: 'Operatore 2',
    status: 'non disponibile',
    state: 'unavailable',
  },
  {
    label: 'Operatore 3',
    status: 'disponibile',
    state: 'available',
  },
]

function TruckMarker({
  className,
  active = false,
}: {
  className: string
  active?: boolean
}) {
  return (
    <div
      className={`absolute ${className} grid size-14 place-items-center rounded-2xl border shadow-2xl backdrop-blur-xl ${
        active
          ? 'border-[#25d366]/60 bg-[#25d366]/20 shadow-[#25d366]/20'
          : 'border-white/15 bg-white/10 shadow-black/20'
      }`}
    >
      <svg viewBox="0 0 48 48" className="size-9" aria-hidden="true">
        <path
          d="M8 18h22v14H8z"
          className={active ? 'fill-[#25d366]' : 'fill-white'}
        />
        <path
          d="M30 21h7l5 6v5H30z"
          className={active ? 'fill-[#a7f3d0]' : 'fill-slate-300'}
        />
        <path d="M13 32a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm23 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" fill="#07111f" />
        <path d="M12 22h13v4H12z" fill="#ffd34d" />
      </svg>
    </div>
  )
}

export function SearchVisualization() {
  return (
    <section className="relative overflow-hidden bg-[#07111f] py-24 text-white sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(37,211,102,0.22),transparent_30%),radial-gradient(circle_at_84%_18%,rgba(255,211,77,0.16),transparent_28%),linear-gradient(180deg,#07111f_0%,#0b1728_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#25d366]/60 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-[#25d366]/25 bg-[#25d366]/10 px-4 py-2 text-sm font-black uppercase tracking-[0.18em] text-[#8ff7b6]">
              ricerca progressiva in tempo reale
            </p>
            <h2 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              La richiesta non si ferma al primo numero.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              ViaSOS parte dalla tua posizione, verifica gli operatori più
              vicini e continua la ricerca finche trova una disponibilità
              compatibile con veicolo, problema e zona.
            </p>
            <div className="mt-8 grid gap-3">
              {operators.map((operator, index) => (
                <div
                  key={operator.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-lg shadow-black/10"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-9 place-items-center rounded-xl text-sm font-black ${
                        operator.state === 'available'
                          ? 'bg-[#25d366] text-[#07111f]'
                          : operator.state === 'unavailable'
                            ? 'bg-white/10 text-slate-300'
                            : 'bg-[#ffd34d] text-[#07111f]'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-black">{operator.label}</span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      operator.state === 'available'
                        ? 'bg-[#25d366] text-[#07111f]'
                        : 'bg-white/10 text-slate-200'
                    }`}
                  >
                    {operator.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
            <div className="relative h-[560px] overflow-hidden rounded-[2rem] bg-[#0b1728] sm:h-[640px]">
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:56px_56px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.18),transparent_36%)]" />

              <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#25d366]/30 bg-[#25d366]/5 [animation:viasos-scan_2.8s_ease-out_infinite]" />
              <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#25d366]/20 bg-[#25d366]/5 [animation:viasos-scan_2.8s_ease-out_infinite_0.7s]" />
              <div className="absolute left-1/2 top-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#25d366]/10 [animation:viasos-scan_2.8s_ease-out_infinite_1.4s]" />

              <svg
                viewBox="0 0 760 560"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <path
                  d="M380 280 C470 192 560 154 650 118"
                  fill="none"
                  stroke="#25d366"
                  strokeWidth="4"
                  strokeDasharray="620"
                  strokeDashoffset="620"
                  className="[animation:viasos-route_2.8s_ease-out_infinite]"
                />
                <path
                  d="M380 280 C286 214 178 192 92 150"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity=".18"
                  strokeWidth="3"
                  strokeDasharray="10 14"
                />
                <path
                  d="M380 280 C282 370 188 414 84 472"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity=".18"
                  strokeWidth="3"
                  strokeDasharray="10 14"
                />
                <path
                  d="M380 280 C488 386 576 418 684 474"
                  fill="none"
                  stroke="#ffd34d"
                  strokeOpacity=".42"
                  strokeWidth="3"
                  strokeDasharray="12 14"
                />
              </svg>

              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 [animation:viasos-pulse-soft_2.5s_ease-in-out_infinite]">
                <div className="grid size-20 place-items-center rounded-[1.4rem] bg-[#25d366] text-[#07111f] shadow-2xl shadow-[#25d366]/30">
                  <svg viewBox="0 0 32 32" className="size-10" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M16 2.5c-5.2 0-9.4 4.2-9.4 9.4 0 6.7 8.2 16.9 8.6 17.3a1 1 0 0 0 1.6 0c.4-.4 8.6-10.6 8.6-17.3 0-5.2-4.2-9.4-9.4-9.4Zm0 13.2a3.8 3.8 0 1 1 0-7.6 3.8 3.8 0 0 1 0 7.6Z"
                    />
                  </svg>
                </div>
                <div className="mt-3 rounded-full bg-white px-4 py-2 text-center text-xs font-black text-[#07111f] shadow-xl">
                  La tua posizione
                </div>
              </div>

              <TruckMarker className="left-[10%] top-[18%]" />
              <TruckMarker className="right-[11%] top-[13%]" active />
              <TruckMarker className="left-[15%] bottom-[14%]" />
              <TruckMarker className="right-[14%] bottom-[18%]" />
              <TruckMarker className="left-[54%] top-[10%]" />
              <TruckMarker className="left-[8%] top-[54%]" />

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-300">
                    ricerca
                  </p>
                  <p className="mt-1 text-lg font-black">Operatori vicini</p>
                </div>
                <div className="rounded-2xl border border-[#ffd34d]/25 bg-[#ffd34d]/10 p-4 backdrop-blur-xl">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ffd34d]">
                    verifica
                  </p>
                  <p className="mt-1 text-lg font-black">Disponibilita</p>
                </div>
                <div className="rounded-2xl border border-[#25d366]/30 bg-[#25d366] p-4 text-[#07111f] shadow-xl shadow-[#25d366]/20">
                  <p className="text-xs font-black uppercase tracking-[0.16em]">
                    trovato
                  </p>
                  <p className="mt-1 text-lg font-black">Conferma WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
