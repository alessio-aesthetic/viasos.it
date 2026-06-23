import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/carroattrezzi-brescia', '/privacy/', '/cookie/', '/termini/'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' || path.includes('carroattrezzi')
      ? 'weekly'
      : 'yearly',
    priority: path === '/' ? 1 : path.includes('carroattrezzi') ? 0.9 : 0.4,
  }))
}
