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
  network: '/lottie/technology-network.lottie',
  search: '/lottie/search-flow-large.lottie',
  whatsapp: '/lottie/whatsapp.lottie',
  position: '/lottie/brescia-request/gps.lottie',
  service: '/lottie/result-check.lottie',
  payment: '/lottie/easy-checkout.lottie',
}

export function PartnerVisual({
  type,
  size = 'normal',
}: {
  type: keyof typeof visualByType
  size?: 'normal' | 'large'
}) {
  return (
    <div className="relative grid min-h-36 place-items-center overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#f8fbff,#eef8f3)] ring-1 ring-slate-200/70">
      <Script
        src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs"
        type="module"
        strategy="afterInteractive"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,211,102,0.20),transparent_40%)]" />
      <dotlottie-player
        src={visualByType[type]}
        background="transparent"
        speed="1"
        loop
        autoplay
        style={{
          width: size === 'large' ? '13rem' : '9rem',
          height: size === 'large' ? '13rem' : '9rem',
          maxWidth: '100%',
          position: 'relative',
        }}
      />
    </div>
  )
}
