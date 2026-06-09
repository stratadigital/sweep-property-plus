'use client'

import { motion } from 'motion/react'
import { staggerContainer, fadeUp, fadeUpContent, viewport } from '@/lib/animations'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream pb-32 pt-20 lg:pb-40 lg:pt-28">

      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 select-none text-[10rem] font-bold leading-none tracking-tighter text-teal-dark/6 lg:text-[20rem]"
      >
        ABOUT
      </span>

      <div className="relative z-1 mx-auto max-w-6xl px-6">
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >

          {/* Left — header */}
          <motion.div variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">About Us</p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              Dependable commercial cleaning for large facilities.
            </h2>
          </motion.div>

          {/* Right — prose */}
          <motion.div variants={fadeUpContent} className="space-y-6 lg:col-span-2">
            <p className="text-base leading-7 text-neutral-mid">
              Sweep Property Plus is a commercial cleaning company specializing in large
              facilities — office buildings, schools, retail centers, and multi-tenant
              complexes.
            </p>
            <p className="text-base leading-7 text-neutral-mid">
              We partner closely with property management teams throughout each engagement.
              After every shift, building management receives a daily report on what was
              completed.
            </p>
            <p className="text-base leading-7 text-neutral-mid">
              Clear communication is central to how we work. We stay in direct contact with
              facilities directors and property managers to make sure the work consistently
              reflects what each building requires.
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Diagonal → Services (teal-dark) */}
      <div className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none" aria-hidden="true">
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
