'use client'

import { motion } from 'motion/react'
import { fadeUp, staggerContainer, rowItem, viewportEarly } from '@/lib/animations'

const services = [
  {
    number: '01',
    name: 'Cleaning Services',
    description:
      'Comprehensive cleaning programs for commercial and multi-tenant facilities — from routine maintenance to specialized deep cleaning. See our full cleaning programs below.',
  },
  {
    number: '02',
    name: 'Concierge Services',
    description:
      'We streamline daily building operations — managing deliveries, coordinating appointments, and providing personalized on-site assistance to enhance convenience and productivity.',
  },
  {
    number: '03',
    name: 'Security Services',
    description:
      'Ensuring the safety of your premises is paramount. Our security services include monitoring, access control, and emergency response planning to safeguard your property and its occupants.',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-teal-dark pb-32 pt-20 lg:pb-40 lg:pt-28">

      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 select-none text-[10rem] font-bold leading-none tracking-tighter text-white/5 lg:text-[20rem]"
      >
        SERVE
      </span>

      <div className="relative z-1 mx-auto max-w-6xl px-6">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              What We Offer
            </p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Full-service facility management
            </h2>
          </motion.div>

          <div className="divide-y divide-white/10">
            {services.map((service) => (
              <motion.div
                key={service.name}
                variants={rowItem}
                className="flex items-start gap-8 py-10"
              >
                <span className="w-12 shrink-0 font-bold text-gold lg:text-lg">
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
          </div>
        </motion.div>

      </div>

      {/* Diagonal → Cleaning (cream) */}
      <div className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none" aria-hidden="true">
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
