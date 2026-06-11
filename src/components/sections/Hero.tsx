'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { heroContainer, heroItem } from '@/lib/animations'

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center pb-24">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2070&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Gradient overlay — darkens toward base of section for diagonal contrast */}
      <div className="absolute inset-0 bg-linear-to-b from-teal/80 to-teal-dark/92" aria-hidden="true" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={heroItem} className="text-xs font-semibold uppercase tracking-widest text-gold">
          Commercial Cleaning Services
        </motion.p>

        <motion.h1
          variants={heroItem}
          className="mt-4 max-w-2xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Your space,
          <br />
          in our care.
        </motion.h1>

        <motion.p variants={heroItem} className="mt-6 max-w-lg text-lg font-normal text-white/80">
          Professional commercial cleaning for offices and large buildings — on your schedule, to
          your standard.
        </motion.p>

        <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded bg-gold px-6 py-3 text-sm font-semibold text-teal-dark shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95"
          >
            Get a Free Quote
          </a>
        </motion.div>
      </motion.div>

      {/* Diagonal → About (cream) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-20 w-full fill-cream"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
