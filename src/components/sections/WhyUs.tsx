import Image from 'next/image'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const features = [
  {
    name: 'Daily Reports to Management',
    description:
      'Every shift ends with a written report delivered to your building management team. You stay informed without having to ask.',
  },
  {
    name: 'Dedicated Day Porter Option',
    description:
      'Need coverage throughout the day? Our porter team keeps your space clean from open to close — not just overnight.',
  },
  {
    name: 'Local & Trusted',
    description:
      'Based in Union, NJ and serving the greater commercial market. A local company with the capacity of a national one.',
  },
  {
    name: 'Fully Bonded & Insured',
    description:
      'Every team member is vetted before they step into your building. Every job is fully covered. No exceptions.',
  },
]

export default function WhyUs() {
  return (
    <section id="about" className="relative bg-white pb-32 pt-20 lg:pb-40 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Image */}
          <div className="relative h-80 overflow-hidden rounded-xl lg:h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
              alt="Clean professional office interior"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Why Choose Us
            </p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              The standard you expect.
              <br />
              The consistency you can count on.
            </h2>

            <ul className="mt-10 space-y-8">
              {features.map((feature) => (
                <li key={feature.name} className="flex gap-4">
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
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Diagonal → Industries (cream) */}
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
