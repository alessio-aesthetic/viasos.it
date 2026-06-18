import '@/styles/tailwind.css'
import type { Metadata } from 'next'

import { site } from '@/data/site'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    template: `%s | ${site.name}`,
    default: site.title,
  },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className="bg-white text-slate-950 antialiased">{children}</body>
    </html>
  )
}

