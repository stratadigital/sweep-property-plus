'use client'

import { motion, type Variants } from 'motion/react'

const services = [
  {
    number: '01',
    name: 'Daily Office Cleaning',
    description:
      'Consistent nightly cleaning tailored to your office schedule — so your team arrives to a fresh space every morning.',
  },
  {
    number: '02',
    name: 'Special Cleaning',
    description:
      'High-touch surfaces and overlooked corners get the attention they need. Where it counts most.',
  },
  {
    number: '03',
    name: 'Deep Cleaning',
    description:
      'Full top-to-bottom service that removes built-up dirt and grime — ideal for move-ins, inspections, or seasonal resets.',
  },
  {
    number: '04',
    name: 'Carpet Cleaning & Shampooing',
    description:
      'Professional extraction that lifts stains and allergens deep within fibers, extending the life of your flooring.',
  },
  {
    number: '05',
    name: 'Floor Scrubbing & Shining',
    description:
      'Machine scrubbing and polish that leaves hard floors spotless and gleaming — the kind of clean you can see.',
  },
]

const rowContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const rowItem: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
}

export default function Services() {
  return (
    <section id="services" className="relative bg-teal-dark pb-32 pt-20 lg:pb-40 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            What We Offer
          </p>
          <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Services built for commercial spaces
          </h2>
        </motion.div>

        {/* Service rows */}
        <motion.div
          className="divide-y divide-white/10"
          variants={rowContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={rowItem}
              className="group flex items-start gap-8 py-10 transition-colors duration-200 hover:bg-white/3"
            >
              <span className="w-12 shrink-0 font-bold text-gold opacity-60 lg:text-lg">
                {service.number}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white sm:text-2xl">{service.name}</h3>
                <p className="mt-2 max-w-2xl text-base leading-7 text-white/60">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Diagonal → WhyUs (white) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
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
