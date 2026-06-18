'use client'

import { motion } from 'motion/react'
import { fadeUp, fadeUpContent, staggerContainer } from '@/lib/animations'

export default function ServicesHero() {
  return (
    <section className="bg-teal-dark relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-40">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 text-[10rem] leading-none font-bold tracking-tighter text-white/5 select-none lg:text-[20rem]"
      >
        SERVICES
      </span>

      <motion.div
        className="relative z-1 mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Full-service facility management
        </motion.h1>
        <motion.p
          variants={fadeUpContent}
          className="mt-6 max-w-2xl text-base leading-7 text-white/60"
        >
          Cleaning, concierge, and security &mdash; three coordinated services that keep commercial
          and multi-tenant buildings running smoothly. Here&rsquo;s what each one includes.
        </motion.p>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-20 w-full fill-white"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
