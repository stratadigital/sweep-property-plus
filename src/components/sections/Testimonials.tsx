'use client'

import { motion, type Variants } from 'motion/react'

const testimonials = [
  {
    quote:
      'Sweep Property Plus has maintained our building for over two years. Their team is reliable, thorough, and management gets daily reports without having to chase anyone down.',
    name: 'Sarah M.',
    title: 'Facilities Manager',
    company: 'Morris Corporate Center',
  },
  {
    quote:
      'We brought them in for a deep clean before a major tenant inspection. The results were exceptional — the kind of clean that makes a building feel new again.',
    name: 'James R.',
    title: 'Property Manager',
    company: 'Summit Business Park',
  },
  {
    quote:
      'Our floors, carpets, and common areas have never looked better. Sweep Property Plus brings a consistency that our previous vendors simply could not deliver.',
    name: 'Lisa K.',
    title: 'Building Operations Manager',
    company: 'Meridian Office Plaza',
  },
]

const cardContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-white pb-32 pt-20 lg:pb-40 lg:pt-28">
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
            What Clients Say
          </p>
          <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
            Trusted by building managers and facilities teams.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardItem}
              className="flex flex-col rounded-xl bg-cream p-8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="mb-4 text-4xl font-bold leading-none text-teal/25 select-none">
                &ldquo;
              </span>
              <p className="flex-1 text-base leading-7 text-neutral-dark">{t.quote}</p>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal/10">
                  <span className="text-xs font-bold text-teal">
                    {t.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-teal-dark">{t.name}</p>
                  <p className="text-xs text-neutral-mid">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
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
