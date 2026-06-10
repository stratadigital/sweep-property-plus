import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
})

// Mirrors robots.ts: only the production deployment is indexable.
// Off-production deploys emit <meta name="robots" content="noindex, nofollow">.
const isProduction = process.env.VERCEL_ENV === 'production'

export const metadata: Metadata = {
  title: 'Sweep Property Plus | Commercial Cleaning Services',
  description: 'Professional commercial cleaning for offices and large buildings.',
  robots: isProduction ? undefined : { index: false, follow: false },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="bg-background text-foreground min-h-full font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
