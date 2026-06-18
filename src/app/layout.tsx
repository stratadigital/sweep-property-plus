import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import MotionProvider from '@/components/layout/MotionProvider'
import Footer from '@/components/sections/Footer'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

// Mirrors robots.ts: only the production deployment is indexable.
// Off-production deploys emit <meta name="robots" content="noindex, nofollow">.
const isProduction = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sweeproperty.com'),
  title: 'Sweep Property Plus | Commercial Cleaning Services',
  description: 'Professional commercial cleaning for offices and large buildings.',
  alternates: { canonical: '/' },
  robots: isProduction ? undefined : { index: false, follow: false },
  openGraph: {
    title: 'Sweep Property Plus | Commercial Cleaning Services',
    description: 'Professional commercial cleaning for offices and large buildings.',
    url: '/',
    siteName: 'Sweep Property Plus',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sweep Property Plus | Commercial Cleaning Services',
    description: 'Professional commercial cleaning for offices and large buildings.',
  },
}

// Structured data for local SEO. Not visible on the page — surfaces the
// business address, contact, and NY/NJ service area to search engines.
const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Sweep Property Plus',
  description: 'Professional commercial cleaning for offices and large buildings.',
  url: 'https://www.sweeproperty.com',
  email: 'info@sweeproperty.com',
  telephone: '+1-732-702-8440',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15 E Midland Ave, Suite 2',
    addressLocality: 'Paramus',
    addressRegion: 'NJ',
    postalCode: '07652',
    addressCountry: 'US',
  },
  areaServed: [
    { '@type': 'State', name: 'New York' },
    { '@type': 'State', name: 'New Jersey' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full scroll-pt-26 antialiased motion-safe:scroll-smooth`}
    >
      <body className="bg-background text-foreground min-h-full font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
