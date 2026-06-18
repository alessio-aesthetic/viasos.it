'use client'

import type React from 'react'
import Script from 'next/script'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': React.DetailedHTMLProps<
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

const visualByType = {
  nearby: '/lottie/search.lottie',
  whatsapp: '/lottie/whatsapp.lottie',
  network: '/lottie/technology-network.lottie',
}

export function TrustVisual({ type }: { type: 'nearby' | 'whatsapp' | 'network' }) {
  return (
    <div className="relative mx-auto grid size-48 place-items-center overflow-hidden rounded-[2.5rem] bg-linear-to-br from-white via-[#f6fbff] to-[#e9fff2] shadow-2xl shadow-slate-950/12 ring-1 ring-slate-200/80 sm:size-52">
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(37,211,102,0.18),transparent_48%)]" />
      <dotlottie-player
        src={visualByType[type]}
        background="transparent"
        speed="1"
        loop
        autoplay
        className="relative z-10 h-40 w-40 sm:h-44 sm:w-44"
      />
    </div>
  )
}
