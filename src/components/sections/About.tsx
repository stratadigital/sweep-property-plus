'use client'

import { motion } from 'motion/react'
import { staggerContainer, fadeUp, fadeUpContent, viewport } from '@/lib/animations'

export default function About() {
  return (
    <section id="about" className="relative bg-cream pb-32 pt-20 lg:pb-40 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >

          {/* Left — header */}
          <motion.div variants={fadeUp} className="relative overflow-hidden">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 select-none text-[7rem] font-bold leading-none tracking-tighter text-teal-dark/[0.06] sm:text-[9rem]"
            >
              BUILT
            </span>
            <div className="relative z-[1]">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">About Us</p>
              <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
                Commercial cleaning built for large facilities.
              </h2>
            </div>
          </motion.div>

          {/* Right — prose */}
          <motion.div variants={fadeUpContent} className="lg:col-span-2 space-y-6">
            <p className="text-base leading-7 text-neutral-mid">
              Sweep Property Plus is a commercial cleaning company specializing in large
              facilities — office buildings, schools, retail centers, and multi-tenant
              complexes. We build daily cleaning programs around each building and maintain
              them long-term.
            </p>
            <p className="text-base leading-7 text-neutral-mid">
              Every program includes a consistent crew assigned to your building, a documented
              cleaning schedule tailored to your space, and daily reports delivered to
              management after every shift. Once the program is in place, the building gets
              cleaned reliably — without requiring ongoing attention from your team.
            </p>
            <p className="text-base leading-7 text-neutral-mid">
              We work directly with facilities directors and property managers. Getting the
              program right from day one — and holding that standard — is how we build
              long-term relationships with our clients.
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Diagonal → Services (teal-dark) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-20 w-full fill-teal-dark"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
