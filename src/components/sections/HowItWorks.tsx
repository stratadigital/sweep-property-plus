'use client'

import { motion, type Variants } from 'motion/react'

const steps = [
  {
    number: '01',
    title: 'Request a Quote',
    description:
      'Fill out our form or give us a call. We visit your space, learn what you need, and put together a cleaning proposal built around your building.',
  },
  {
    number: '02',
    title: 'We Build Your Plan',
    description:
      'No two buildings are the same. We tailor services, frequency, and staffing to fit your schedule — and your standard.',
  },
  {
    number: '03',
    title: 'Consistent Service, Every Time',
    description:
      'Our team shows up, does the work, and delivers a report. You stay informed without ever having to follow up.',
  },
]

const stepContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const stepItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-teal pb-32 pt-20 lg:pb-40 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            How It Works
          </p>
          <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Three steps to a cleaner space.
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10"
          variants={stepContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.number} variants={stepItem} className="relative">
              {/* Connector line between steps on desktop */}
              {index < steps.length - 1 && (
                <div
                  className="absolute -right-5 top-8 hidden h-px w-10 bg-white/20 lg:block"
                  aria-hidden="true"
                />
              )}

              {/* Large decorative number */}
              <span className="block text-8xl font-bold leading-none text-white/10 select-none">
                {step.number}
              </span>

              {/* Gold accent bar */}
              <div className="mt-5 h-0.5 w-8 bg-gold" aria-hidden="true" />

              <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-white/70">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-16"
        >
          <a
            href="#contact"
            className="rounded bg-gold px-6 py-3 text-sm font-semibold text-teal-dark shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95"
          >
            Get a Free Quote
          </a>
        </motion.div>

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
