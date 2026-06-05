'use client'

import Image from 'next/image'
import { motion, type Variants } from 'motion/react'

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center pb-20">
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
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={item} className="text-xs font-semibold uppercase tracking-widest text-gold">
          Commercial Cleaning Services
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-4 max-w-2xl text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Your space,
          <br />
          in our care.
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-lg text-lg font-normal text-white/80">
          Professional commercial cleaning for offices and large buildings — on your schedule, to
          your standard.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded bg-gold px-6 py-3 text-sm font-semibold text-teal-dark shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95"
          >
            Get a Free Quote
          </a>
          <a
            href="#services"
            className="rounded border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70"
          >
            Our Services →
          </a>
        </motion.div>
      </motion.div>

      {/* Diagonal → About (white) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 96"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-24 w-full fill-white"
        >
          <polygon points="0,96 1440,0 1440,96" />
        </svg>
      </div>
    </section>
  )
}
