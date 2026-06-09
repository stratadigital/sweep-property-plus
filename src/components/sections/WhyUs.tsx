'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { slideInLeft, slideInRight, staggerContainer, staggerItem, viewport, viewportEarly } from '@/lib/animations'

const features = [
  {
    name: 'Daily Reports to Management',
    description: 'Building management receives a daily report after every shift.',
  },
  {
    name: 'Programs Tailored to Your Facility',
    description:
      'We listen to what your building needs and build a cleaning program around your space, schedule, and standards — then tailor it as those needs change.',
  },
  {
    name: 'Clear Communication',
    description:
      'We partner closely with building management and property teams. You have direct access to our team and we communicate openly throughout the relationship.',
  },
  {
    name: 'High Standards on Every Visit',
    description:
      'We hold ourselves to consistent quality and reliability across every service we provide — not just at the start of a contract.',
  },
]


export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-white pb-32 pt-20 lg:pb-40 lg:pt-28">

      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 select-none text-[10rem] font-bold leading-none tracking-tighter text-teal/7 lg:text-[20rem]"
      >
        TRUST
      </span>

      <div className="relative z-1 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="relative h-80 overflow-hidden rounded-xl lg:h-140"
          >
            <Image
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"
              alt="Clean professional office interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Why Choose Us
            </p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              The standard you expect.
              <br />
              The consistency you can count on.
            </h2>

            <motion.ul
              className="mt-10 space-y-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportEarly}
            >
              {features.map((feature) => (
                <motion.li key={feature.name} variants={staggerItem} className="flex gap-4">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-teal"
                  />
                  <div>
                    <p className="font-semibold text-teal-dark">{feature.name}</p>
                    <p className="mt-1 text-base leading-7 text-neutral-mid">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

        </div>
      </div>

      {/* Diagonal → Industries (cream) */}
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
