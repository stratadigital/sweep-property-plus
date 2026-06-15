'use client'

import Image from 'next/image'
import whyUsImg from '../../../public/images/why-us.webp'
import { motion } from 'motion/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  viewport,
  viewportTall,
} from '@/lib/animations'

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
    <section
      id="why-us"
      className="relative overflow-hidden bg-white pt-20 pb-32 lg:pt-28 lg:pb-40"
    >
      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="text-teal/7 pointer-events-none absolute top-0 left-0 text-[10rem] leading-none font-bold tracking-tighter select-none lg:text-[20rem]"
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
            viewport={viewportTall}
            className="relative h-80 overflow-hidden rounded-xl lg:h-140"
          >
            <Image
              src={whyUsImg}
              alt="Clean modern office building interior"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* Content — one stagger container: header slides in, features cascade after it */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <motion.div variants={slideInRight}>
              <p className="text-gold-dark text-xs font-semibold tracking-widest uppercase">
                Why Choose Us
              </p>
              <div className="bg-gold mt-3 h-0.5 w-10" aria-hidden="true" />
              <h2 className="text-teal-dark mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                The standard you expect.
                <br />
                The consistency you can count on.
              </h2>
            </motion.div>

            <ul className="mt-10 space-y-8">
              {features.map((feature) => (
                <motion.li key={feature.name} variants={staggerItem} className="flex gap-4">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="text-teal mt-0.5 size-5 shrink-0"
                  />
                  <div>
                    <p className="text-teal-dark font-semibold">{feature.name}</p>
                    <p className="text-neutral-mid mt-1 text-base leading-7">
                      {feature.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Diagonal → Industries (cream) */}
      <div
        className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="fill-cream block h-20 w-full"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
