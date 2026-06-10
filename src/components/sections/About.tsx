'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { staggerContainer, fadeUp, fadeUpContent, staggerItem, viewport } from '@/lib/animations'

export default function About() {
  return (
    <section id="about" className="bg-cream relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-40">
      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="text-teal-dark/6 pointer-events-none absolute top-0 left-0 text-[10rem] leading-none font-bold tracking-tighter select-none lg:text-[20rem]"
      >
        ABOUT
      </span>

      <motion.div
        className="relative z-1 mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="max-w-2xl">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase">About Us</p>
          <div className="bg-gold mt-3 h-0.5 w-10" aria-hidden="true" />
          <h2 className="text-teal-dark mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Dependable commercial cleaning for large facilities.
          </h2>
        </motion.div>

        {/* Full-width photo band */}
        <motion.div
          variants={fadeUpContent}
          className="relative mt-10 h-64 overflow-hidden rounded-xl shadow-sm sm:h-80 lg:mt-12 lg:h-[26rem]"
        >
          <Image
            src="https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1600&q=80"
            alt="Spotless commercial common area"
            fill
            sizes="(max-width: 1024px) 100vw, 1152px"
            className="object-cover"
          />
        </motion.div>

        {/* Prose — multi-column body */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          <motion.p variants={staggerItem} className="text-neutral-mid text-base leading-7">
            Sweep Property Plus is a commercial cleaning company specializing in large facilities —
            office buildings, schools, retail centers, and multi-tenant complexes.
          </motion.p>
          <motion.p variants={staggerItem} className="text-neutral-mid text-base leading-7">
            We partner closely with property management teams throughout each engagement. After
            every shift, building management receives a daily report on what was completed.
          </motion.p>
          <motion.p variants={staggerItem} className="text-neutral-mid text-base leading-7">
            Clear communication is central to how we work. We stay in direct contact with facilities
            directors and property managers to make sure the work consistently reflects what each
            building requires.
          </motion.p>
        </div>
      </motion.div>

      {/* Diagonal → Services (teal-dark) */}
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
