'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  curtainPanel,
  curtainImage,
  viewportTall,
} from '@/lib/animations'
import cleaningImg from '../../../public/images/services/cleaning.webp'
import conciergeImg from '../../../public/images/services/concierge.webp'
import securityImg from '../../../public/images/services/security.webp'

const services = [
  {
    number: '01',
    name: 'Cleaning Services',
    description:
      'Comprehensive cleaning programs for commercial and multi-tenant facilities — from routine maintenance to specialized deep cleaning. See our full cleaning programs below.',
    image: cleaningImg,
    alt: 'Gloved hand wiping down a desk in a commercial office',
    caption: 'Daily upkeep',
  },
  {
    number: '02',
    name: 'Concierge Services',
    description:
      'We streamline daily building operations — managing deliveries, coordinating appointments, and providing personalized on-site assistance to enhance convenience and productivity.',
    image: conciergeImg,
    alt: 'Reception desk inside a modern office building',
    caption: 'On-site assistance',
  },
  {
    number: '03',
    name: 'Security Services',
    description:
      'Ensuring the safety of your premises is paramount. Our security services include monitoring, access control, and emergency response planning to safeguard your property and its occupants.',
    image: securityImg,
    alt: 'Wall of CCTV monitors showing live building surveillance',
    caption: 'Around-the-clock watch',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="bg-teal-dark relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-40"
    >
      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 text-[10rem] leading-none font-bold tracking-tighter text-white/5 select-none lg:text-[20rem]"
      >
        SERVE
      </span>

      <div className="relative z-1 mx-auto max-w-6xl px-6">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportTall}
          className="mb-16"
        >
          <p className="text-gold text-xs font-semibold tracking-widest uppercase">What We Offer</p>
          <div className="bg-gold mt-3 h-0.5 w-10" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Full-service facility management
          </h2>
        </motion.div>

        {/* Editorial rows — image + text, sides alternate down the page */}
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, index) => {
            const isReversed = index % 2 === 1
            return (
              <motion.div
                key={service.name}
                initial="hidden"
                whileInView="visible"
                viewport={viewportTall}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image — curtain reveal + subtle hover zoom/caption */}
                <div
                  className={`group relative aspect-[4/3] overflow-hidden rounded-xl ${
                    isReversed ? 'lg:order-2' : ''
                  }`}
                >
                  <motion.div variants={curtainImage} className="absolute inset-0">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>

                  {/* Curtain panel — wipes off left-to-right on scroll-in */}
                  <motion.div
                    variants={curtainPanel}
                    className="bg-teal absolute inset-0 z-10 origin-left"
                    aria-hidden="true"
                  />

                  {/* Hover caption */}
                  <div className="from-teal-dark/80 pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-full bg-gradient-to-t to-transparent p-5 transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-gold text-xs font-semibold tracking-widest uppercase">
                      {service.caption}
                    </p>
                  </div>
                </div>

                {/* Text */}
                <motion.div
                  variants={isReversed ? slideInLeft : slideInRight}
                  className={isReversed ? 'lg:order-1' : ''}
                >
                  <span className="text-gold font-bold lg:text-lg">{service.number}</span>
                  <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                    {service.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-7 text-white/60">
                    {service.description}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Diagonal → Cleaning (cream) */}
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
