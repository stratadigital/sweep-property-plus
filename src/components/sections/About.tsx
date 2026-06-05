'use client'

import { motion } from 'motion/react'

export default function About() {
  return (
    <section id="about" className="relative bg-white pb-32 pt-20 lg:pb-40 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-20">

          {/* Left — header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">About Us</p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              The standard your building sets every day.
            </h2>
          </motion.div>

          {/* Right — prose */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-base leading-7 text-neutral-mid">
              A building communicates before anyone opens their mouth. The condition of the lobby at
              8am, the restrooms mid-afternoon, the floors after the evening crew has moved through
              — these are the details that shape how tenants feel about their space, and how
              visitors judge the organization inside it. For facilities directors and property
              managers, maintaining that standard across every floor, every day, without it becoming
              a constant distraction, is the real challenge.
            </p>
            <p className="text-base leading-7 text-neutral-mid">
              Sweep Property Plus is a commercial cleaning company built around large-scale
              facilities. We work with office buildings, multi-tenant complexes, and institutional
              spaces that demand operational consistency — the kind where the crew is familiar, the
              process is documented, and the building manager stops having to think about cleaning
              because it simply gets done.
            </p>
            <p className="text-base leading-7 text-neutral-mid">
              Our work is methodical and tailored to each facility. The standard is established on
              day one, and we hold it. The measure of our service isn&rsquo;t the initial
              impression — it&rsquo;s whether you notice us missing when we&rsquo;re not there.
            </p>
          </motion.div>

        </div>
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
