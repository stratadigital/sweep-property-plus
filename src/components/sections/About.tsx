'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { slideInLeft, slideInRight, viewport } from '@/lib/animations'

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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — header + prose */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">About Us</p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              Dependable commercial cleaning for large facilities.
            </h2>

            <div className="mt-8 space-y-6">
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
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative h-80 overflow-hidden rounded-xl lg:h-140"
          >
            <Image
              src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=80"
              alt="Pristine commercial building lobby"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

        </div>
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
