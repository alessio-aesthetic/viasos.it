function RadarVisual() {
  return (
    <div className="relative mx-auto size-40 overflow-hidden rounded-[2rem] bg-[#07111f] shadow-2xl shadow-slate-950/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,211,102,0.22),transparent_54%)]" />
      <div className="absolute inset-5 rounded-full border border-[#25d366]/20 [animation:viasos-scan_2.6s_ease-out_infinite]" />
      <div className="absolute inset-9 rounded-full border border-[#25d366]/30 [animation:viasos-scan_2.6s_ease-out_infinite_0.55s]" />
      <div className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#25d366] shadow-xl shadow-[#25d366]/40" />
      {['left-8 top-8', 'right-7 top-12', 'left-10 bottom-8', 'right-10 bottom-9'].map(
        (position) => (
          <span
            key={position}
            className={`absolute ${position} size-3 rounded-full bg-white/90 shadow-lg`}
          />
        ),
      )}
    </div>
  )
}

function WhatsAppVisual() {
  return (
    <div className="relative mx-auto size-40 rounded-[2rem] bg-[#e9fff2] shadow-2xl shadow-emerald-950/15">
      <div className="absolute left-9 top-5 h-32 w-20 rounded-[1.5rem] bg-[#07111f] p-2 shadow-xl [animation:viasos-float_3s_ease-in-out_infinite]">
        <div className="h-full rounded-[1rem] bg-white" />
      </div>
      <div className="absolute right-4 top-12 rounded-2xl bg-[#25d366] px-4 py-3 shadow-xl shadow-emerald-950/20 [animation:viasos-pulse-soft_2.4s_ease-in-out_infinite]">
        <div className="h-1.5 w-16 rounded-full bg-[#07111f]" />
        <div className="mt-2 h-1.5 w-10 rounded-full bg-[#07111f]/70" />
      </div>
      <div className="absolute bottom-8 right-8 grid size-10 place-items-center rounded-full bg-[#ffd34d] text-[#07111f] shadow-lg">
        <span className="text-lg font-black">✓</span>
      </div>
    </div>
  )
}

function NetworkVisual() {
  return (
    <div className="relative mx-auto size-40 rounded-[2rem] bg-white shadow-2xl shadow-slate-950/12">
      <svg viewBox="0 0 160 160" className="absolute inset-0 size-full" aria-hidden="true">
        <path d="M44 54 106 38 122 94 76 120 44 54Z" fill="none" stroke="#07111f" strokeOpacity=".18" strokeWidth="6" />
        <path d="M44 54 106 38 122 94" fill="none" stroke="#25d366" strokeWidth="5" strokeDasharray="180" strokeDashoffset="180" className="[animation:viasos-route_3s_ease-in-out_infinite]" />
      </svg>
      {[
        ['left-8 top-10 bg-[#25d366]'],
        ['right-8 top-6 bg-[#ffd34d]'],
        ['right-5 bottom-12 bg-[#25d366]'],
        ['left-14 bottom-7 bg-[#07111f]'],
      ].map(([classes]) => (
        <span
          key={classes}
          className={`absolute ${classes} size-9 rounded-2xl border-4 border-white shadow-xl [animation:viasos-pulse-soft_2.8s_ease-in-out_infinite]`}
        />
      ))}
    </div>
  )
}

export function TrustVisual({ type }: { type: 'nearby' | 'whatsapp' | 'network' }) {
  if (type === 'nearby') return <RadarVisual />
  if (type === 'whatsapp') return <WhatsAppVisual />
  return <NetworkVisual />
}
