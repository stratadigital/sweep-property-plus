import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import MotionProvider from '@/components/layout/MotionProvider'
import Footer from '@/components/sections/Footer'
import { GoogleAnalytics } from '@next/third-parties/google'

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
    streetAddress: '180 Summit Ave, Unit 202',
    addressLocality: 'Montvale',
    addressRegion: 'NJ',
    postalCode: '07645',
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
        {isProduction && (
          <>
            <GoogleAnalytics gaId="G-LMRJJ2TBTB" />
            <Script
              id="hotjar"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(c,s,q,u,a,r,e){c.hj=c.hj||function(){(c.hj.q=c.hj.q||[]).push(arguments)};c._hjSettings={hjid:a};r=s.getElementsByTagName('head')[0];e=s.createElement('script');e.async=true;e.src=q+c._hjSettings.hjid+u;r.appendChild(e)})(window,document,'https://static.hj.contentsquare.net/c/csq-','.js',6735223);`,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
