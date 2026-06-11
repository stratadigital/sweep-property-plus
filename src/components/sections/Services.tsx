'use client'

import { motion } from 'motion/react'
import { fadeUp, staggerContainer, rowItem, viewport, viewportEarly } from '@/lib/animations'

const services = [
  {
    number: '01',
    name: 'Special Cleaning',
    description:
      'Targeted cleaning for high-traffic and hard-to-reach areas — the spots that need extra attention beyond the regular program.',
  },
  {
    number: '02',
    name: 'Deep Cleaning',
    description:
      'Full top-to-bottom service that removes built-up dirt and grime — ideal for move-ins, inspections, or seasonal resets.',
  },
  {
    number: '03',
    name: 'Carpet Cleaning & Shampooing',
    description:
      'Professional extraction that lifts stains and allergens deep within fibers, extending the life of your flooring.',
  },
  {
    number: '04',
    name: 'Floor Scrubbing & Shining',
    description:
      'Machine scrubbing and polish that leaves hard floors spotless and gleaming — the kind of clean you can see.',
  },
]

const dayPorterPoints = [
  'Continuous upkeep of restrooms, lobbies, and common areas',
  'Restocking supplies and maintaining high-traffic spaces',
  'Prompt response to spills, messes, or urgent cleaning needs',
  'Ensuring your workspace always looks presentable for staff and visitors',
]


export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-teal-dark pb-32 pt-20 lg:pb-40 lg:pt-28">

      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 select-none text-[10rem] font-bold leading-none tracking-tighter text-white/5 lg:text-[20rem]"
      >
        CLEAN
      </span>

      <div className="relative z-1 mx-auto max-w-6xl px-6">

        {/* Header + rows — one coordinated stagger so they reveal as a sequence */}
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
              Services built for commercial spaces
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

        {/* Day Porter callout */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-14 lg:grid-cols-2 lg:gap-16"
        >
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Day Porter</p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-semibold text-white">
              A dedicated presence during business hours.
            </h3>
            <p className="mt-4 text-base leading-7 text-white/60">
              While your regular cleaning program runs after hours, a Day Porter is on-site during
              the workday — keeping your building presentable as people move through it. Five hours
              a day, handled.
            </p>
          </div>

          {/* Right — bullet points from brochure */}
          <ul className="space-y-4 self-center">
            {dayPorterPoints.map((point) => (
              <li key={point} className="flex items-baseline gap-3">
                <span className="size-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span className="text-base leading-7 text-white/70">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

      </div>

      {/* Diagonal → WhyUs (white) */}
      <div className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none" aria-hidden="true">
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
