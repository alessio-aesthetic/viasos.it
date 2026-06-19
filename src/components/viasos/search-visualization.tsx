import Script from 'next/script'
import type React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'lottie-player': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string
        background?: string
        speed?: string
        loop?: boolean
        autoplay?: boolean
      }
    }
  }
}

const towTrucks = [
  {
    label: 'Carroattrezzi 1',
    status: 'verifica disponibilità',
    state: 'checking',
  },
  {
    label: 'Carroattrezzi 2',
    status: 'non disponibile',
    state: 'unavailable',
  },
  {
    label: 'Carroattrezzi 3',
    status: 'disponibile',
    state: 'available',
  },
]

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
              ViaSOS parte dalla tua posizione, verifica i carroattrezzi più
              vicini e continua la ricerca finché trova una disponibilità
              compatibile con veicolo, problema e zona.
            </p>
            <div className="mt-8 grid gap-3">
              {towTrucks.map((truck, index) => (
                <div
                  key={truck.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-lg shadow-black/10"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid size-9 place-items-center rounded-xl text-sm font-black ${
                        truck.state === 'available'
                          ? 'bg-[#25d366] text-[#07111f]'
                          : truck.state === 'unavailable'
                            ? 'bg-white/10 text-slate-300'
                            : 'bg-[#ffd34d] text-[#07111f]'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-black">{truck.label}</span>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      truck.state === 'available'
                        ? 'bg-[#25d366] text-[#07111f]'
                        : 'bg-white/10 text-slate-200'
                    }`}
                  >
                    {truck.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-6">
            <div className="relative grid min-h-[520px] place-items-center overflow-hidden rounded-[2rem] bg-[#0b1728] p-6 sm:min-h-[620px]">
              <Script
                src="https://unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js"
                strategy="afterInteractive"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.18),transparent_40%),linear-gradient(180deg,#0b1728_0%,#07111f_100%)]" />
              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:56px_56px]" />
              <lottie-player
                src="/lottie/search-flow-large.json"
                background="transparent"
                speed="1"
                loop
                autoplay
                style={{ width: 'min(100%, 560px)', height: 'min(76vw, 560px)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
