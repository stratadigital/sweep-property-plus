'use client'

import { motion } from 'motion/react'
import { fadeUp, staggerContainer, cardItem, fadeIn, viewport, viewportEarly } from '@/lib/animations'
import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
} from '@heroicons/react/24/outline'

const industries = [
  {
    name: 'Office Buildings',
    description:
      'Daily and ongoing cleaning programs for office buildings, common areas, and multi-tenant complexes.',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'Schools & Universities',
    description:
      'Regular cleaning programs for classrooms, hallways, restrooms, and shared spaces.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Retail & Shopping Centers',
    description:
      'Cleaning services for retail spaces, shopping centers, and other high-traffic commercial properties.',
    icon: BuildingStorefrontIcon,
  },
]


export default function Industries() {
  return (
    <section id="industries" className="relative bg-cream pb-32 pt-20 lg:pb-40 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative mb-16 overflow-hidden"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 select-none text-[7rem] font-bold leading-none tracking-tighter text-teal-dark/[0.05] sm:text-[9rem]"
          >
            SERVE
          </span>
          <div className="relative z-[1]">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Who We Serve
            </p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              Built for large-scale commercial spaces
            </h2>
          </div>
        </motion.div>

        {/* Industry cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarly}
        >
          {industries.map(({ name, description, icon: Icon }) => (
            <motion.div
              key={name}
              variants={cardItem}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <Icon className="mb-4 size-8 text-teal" aria-hidden="true" />
              <h3 className="text-base font-semibold text-teal-dark">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-mid">{description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mt-12 text-sm text-neutral-mid"
        >
          Don&rsquo;t see your facility type? We likely service it —{' '}
          <a href="#contact" className="font-semibold text-teal underline-offset-2 hover:underline">
            reach out
          </a>
          .
        </motion.p>

      </div>

      {/* Diagonal → Contact (cream) */}
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
