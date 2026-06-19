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
    <div className="relative mx-auto grid h-56 w-full place-items-center sm:h-64">
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
      />
      <dotlottie-player
        src={visualByType[type]}
        background="transparent"
        speed="1"
        loop
        autoplay
        className="h-52 w-52 sm:h-60 sm:w-60"
      />
    </div>
  )
}
