'use client'

import Image, { type StaticImageData } from 'next/image'
import { motion } from 'motion/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerItem,
  viewportTall,
} from '@/lib/animations'

type ServiceSectionProps = {
  number: string
  name: string
  lead: string
  items: string[]
  image: StaticImageData
  alt: string
  bg: string
  ghost: string
  nextFill: string
  reversed?: boolean
}

export default function ServiceSection({
  number,
  name,
  lead,
  items,
  image,
  alt,
  bg,
  ghost,
  nextFill,
  reversed = false,
}: ServiceSectionProps) {
  const imageVariant = reversed ? slideInRight : slideInLeft
  const textVariant = reversed ? slideInLeft : slideInRight

  return (
    <section className={`${bg} relative overflow-hidden pt-20 pb-32 lg:pt-28 lg:pb-40`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 ${
          reversed ? 'left-0' : 'right-0'
        } text-[11rem] leading-none font-bold tracking-tighter select-none ${ghost} lg:text-[20rem]`}
      >
        {number}
      </span>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportTall}
        className="relative z-1 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16"
      >
        <motion.div
          variants={imageVariant}
          className={`ring-teal-dark/10 group relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-1 ${
            reversed ? 'lg:order-2' : ''
          }`}
        >
          <Image
            src={image}
            alt={alt}
            fill
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </motion.div>

        <motion.div variants={textVariant} className={reversed ? 'lg:order-1' : ''}>
          <h2 className="text-teal-dark text-2xl font-bold tracking-tight sm:text-3xl">{name}</h2>
          <p className="text-neutral-mid mt-4 max-w-xl text-base leading-7">{lead}</p>

          <p className="text-gold-dark mt-8 text-xs font-semibold tracking-widest uppercase">
            What&rsquo;s included
          </p>

          <motion.ul
            variants={staggerContainer}
            className="border-teal/10 divide-teal/10 mt-4 divide-y border-t"
          >
            {items.map((item) => (
              <motion.li key={item} variants={staggerItem} className="flex items-center gap-3 py-3">
                <CheckIcon aria-hidden="true" className="text-teal size-5 shrink-0" />
                <span className="text-neutral-dark text-sm">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className={`${nextFill} block h-20 w-full`}
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
