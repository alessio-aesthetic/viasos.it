import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/privacy/', '/cookie/', '/termini/'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'yearly',
    priority: path === '/' ? 1 : 0.4,
  }))
}

