import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | Sweep Property Plus',
}

export default function NotFound() {
  return (
    <section className="bg-cream flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-2xl px-6 text-center">
        {/* Sweep mark */}
        <svg
          width="56"
          height="56"
          viewBox="0 0 36 36"
          fill="none"
          className="mx-auto"
          aria-hidden="true"
        >
          <path
            d="M 9,27 A 13,13 0 0,1 27,9"
            stroke="#F2BD71"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 12,24 A 8.5,8.5 0 0,1 24,12"
            stroke="#337068"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <p className="text-gold-dark mt-8 text-xs font-semibold tracking-widest uppercase">
          Error 404
        </p>
        <h1 className="text-teal-dark mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Page not found.
        </h1>
        <p className="text-neutral-mid mt-6 text-base leading-7">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="bg-gold text-teal-dark rounded px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95"
          >
            Back to home
          </Link>
          <Link
            href="/#contact"
            className="text-teal-dark text-sm font-semibold underline-offset-2 hover:underline"
          >
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  )
}
