import type { MetadataRoute } from 'next'

// Only the production deployment is crawlable. Staging and preview
// deployments (VERCEL_ENV === 'preview') and local dev are disallowed,
// so client review URLs never get indexed by search engines.
const isProduction = process.env.VERCEL_ENV === 'production'

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.sweeproperty.com/sitemap.xml',
  }
}
