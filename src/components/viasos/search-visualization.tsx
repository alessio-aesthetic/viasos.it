const operators = [
  { label: 'Operatore 1', status: 'verifica disponibilita' },
  { label: 'Operatore 2', status: 'non disponibile' },
  { label: 'Operatore 3', status: 'disponibile' },
]

export function SearchVisualization() {
  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-[#07111f] p-5 text-white shadow-2xl shadow-slate-950/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(37,211,102,0.26),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(255,211,77,0.16),transparent_28%)]" />
      <div className="relative rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
        <div className="relative h-[360px] overflow-hidden rounded-[1.4rem] bg-[#0c1828]">
          <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#25d366]/40 bg-[#25d366]/10 animate-ping motion-reduce:animate-none" />
          <div className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#25d366] text-2xl shadow-xl shadow-[#25d366]/30">
            ●
          </div>
          <div className="absolute left-[calc(50%-56px)] top-[calc(50%+42px)] rounded-full bg-white px-3 py-1 text-xs font-black text-[#07111f]">
            La tua posizione
          </div>

          {[
            ['left-[14%] top-[18%]', '1'],
            ['right-[16%] top-[22%]', '2'],
            ['left-[20%] bottom-[20%]', '3'],
            ['right-[22%] bottom-[24%]', '4'],
            ['left-[58%] top-[13%]', '5'],
          ].map(([position, number], index) => (
            <div
              key={number}
              className={`absolute ${position} grid size-11 place-items-center rounded-full border border-white/20 bg-white/10 text-sm font-black shadow-lg backdrop-blur`}
              style={{ animationDelay: `${index * 180}ms` }}
            >
              🚚
            </div>
          ))}
          <svg
            viewBox="0 0 420 320"
            className="absolute inset-0 h-full w-full text-[#25d366]/70"
            aria-hidden="true"
          >
            <path
              d="M210 160 C245 110 315 94 344 78"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="8 10"
            />
            <path
              d="M210 160 C165 205 105 224 84 252"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 10"
              opacity=".45"
            />
          </svg>
        </div>
        <div className="mt-5 grid gap-3">
          {operators.map((operator, index) => (
            <div
              key={operator.label}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3"
            >
              <span className="font-bold">{operator.label}</span>
              <span
                className={
                  index === 2
                    ? 'rounded-full bg-[#25d366] px-3 py-1 text-xs font-black text-[#07111f]'
                    : 'rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200'
                }
              >
                {operator.status}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-[#25d366] p-4 text-[#07111f]">
          <p className="font-black">Carroattrezzi disponibile trovato</p>
          <p className="mt-1 text-sm font-semibold">
            Conferma inviata su WhatsApp
          </p>
        </div>
      </div>
    </div>
  )
}

