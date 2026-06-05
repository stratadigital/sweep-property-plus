'use client'

import { motion, type Variants } from 'motion/react'
import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline'

const industries = [
  {
    name: 'Office Buildings',
    description:
      'Daily programs for multi-tenant offices, common areas, and conference spaces — scaled to your building.',
    icon: BuildingOffice2Icon,
  },
  {
    name: 'Schools & Universities',
    description:
      'Thorough sanitation for classrooms, hallways, and restrooms, keeping students and staff safe.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Retail & Shopping Centers',
    description:
      'High-traffic floor care, restroom maintenance, and lobby upkeep that reflects your brand standards.',
    icon: BuildingStorefrontIcon,
  },
  {
    name: 'Medical Buildings',
    description:
      'Cleaning protocols designed for environments where hygiene standards are non-negotiable.',
    icon: BriefcaseIcon,
  },
]

const cardContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Industries() {
  return (
    <section id="industries" className="relative bg-cream pb-32 pt-20 lg:pb-40 lg:pt-28">
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
            Who We Serve
          </p>
          <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
            Built for large-scale commercial spaces
          </h2>
        </motion.div>

        {/* Industry cards */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
          className="block h-20 w-full fill-cream"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
