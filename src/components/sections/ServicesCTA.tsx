'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { fadeUp, fadeUpContent, staggerContainer, viewport } from '@/lib/animations'

export default function ServicesCTA() {
  return (
    <section className="bg-teal relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-40">
      <motion.div
        className="relative z-1 mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        <motion.div variants={fadeUp} className="max-w-2xl">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase">Get Started</p>
          <div className="bg-gold mt-3 h-0.5 w-10" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&rsquo;s build a program for your building.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/70">
            Tell us about your facility and the services you need. We&rsquo;ll put together a
            proposal built around your space.
          </p>
        </motion.div>

        <motion.div variants={fadeUpContent} className="mt-8">
          <Link
            href="/#contact"
            className="bg-gold text-teal-dark group inline-flex items-center gap-2 rounded px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95"
          >
            Get a Quote
            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="fill-teal-dark block h-20 w-full"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
