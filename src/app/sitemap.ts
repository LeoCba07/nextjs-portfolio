import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://leandrotrabucco.me',
      lastModified: new Date(),
    },
    {
      url: 'https://leandrotrabucco.me/#about',
      lastModified: new Date(),
    },
    {
      url: 'https://leandrotrabucco.me/#projects',
      lastModified: new Date(),
    },
    {
      url: 'https://leandrotrabucco.me/#contact',
      lastModified: new Date(),
    },
  ]
}
