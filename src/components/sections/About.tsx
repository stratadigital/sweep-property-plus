'use client'

import Image from 'next/image'
import aboutImg from '../../../public/images/cleaning-1.webp'
import { motion } from 'motion/react'
import {
  BuildingOffice2Icon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import {
  staggerContainer,
  fadeUp,
  fadeUpContent,
  staggerItem,
  viewport,
  viewportTall,
} from '@/lib/animations'

const points = [
  {
    icon: BuildingOffice2Icon,
    text: 'Sweep Property Plus is a commercial cleaning company specializing in large facilities — office buildings, schools, retail centers, and multi-tenant complexes.',
  },
  {
    icon: ClipboardDocumentCheckIcon,
    text: 'We partner closely with property management teams throughout each engagement. After every shift, building management receives a daily report on what was completed.',
  },
  {
    icon: ChatBubbleLeftRightIcon,
    text: 'Clear communication is central to how we work. We stay in direct contact with facilities directors and property managers to make sure the work consistently reflects what each building requires.',
  },
]

export default function About() {
  return (
    <section id="about" className="bg-cream relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-40">
      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="text-teal-dark/6 pointer-events-none absolute top-0 left-0 text-[10rem] leading-none font-bold tracking-tighter select-none lg:text-[20rem]"
      >
        ABOUT
      </span>

      <motion.div
        className="relative z-1 mx-auto max-w-6xl px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="max-w-2xl">
          <p className="text-gold-dark text-xs font-semibold tracking-widest uppercase">About Us</p>
          <div className="bg-gold mt-3 h-0.5 w-10" aria-hidden="true" />
          <h2 className="text-teal-dark mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Dependable commercial cleaning for large facilities.
          </h2>
        </motion.div>

        {/* Three points */}
        <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-12">
          {points.map((point) => (
            <motion.li key={point.text} variants={staggerItem} className="relative pl-9">
              <point.icon aria-hidden="true" className="text-teal absolute top-1 left-0 size-5" />
              <p className="text-neutral-mid text-base leading-7">{point.text}</p>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Large image, rising out of the section */}
      <div className="relative mt-14 lg:mt-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            variants={fadeUpContent}
            initial="hidden"
            whileInView="visible"
            viewport={viewportTall}
            className="ring-teal-dark/10 relative h-72 overflow-hidden rounded-xl shadow-2xl ring-1 sm:h-96 lg:h-[32rem]"
          >
            <Image
              src={aboutImg}
              alt="Clean, modern office building interior"
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-cream pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b"
            />
          </motion.div>
        </div>
      </div>

      {/* Diagonal → Services (teal-dark) */}
      <div
        className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="fill-teal-dark block h-20 w-full"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
