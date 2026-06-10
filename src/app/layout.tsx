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
  metadataBase: new URL('https://sweeppropertyplus.com'),
  title: 'Sweep Property Plus | Commercial Cleaning Services',
  description:
    'Professional commercial cleaning for offices and large buildings in Union, NJ and surrounding areas.',
  robots: isProduction ? undefined : { index: false, follow: false },
  openGraph: {
    title: 'Sweep Property Plus | Commercial Cleaning Services',
    description:
      'Professional commercial cleaning for offices and large buildings in Union, NJ and surrounding areas.',
    url: '/',
    siteName: 'Sweep Property Plus',
    type: 'website',
    locale: 'en_US',
  },
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
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  )
}
