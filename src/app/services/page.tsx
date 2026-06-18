import type { Metadata } from 'next'
import ServicesHero from '@/components/sections/ServicesHero'
import ServiceSection from '@/components/sections/ServiceSection'
import ServicesCTA from '@/components/sections/ServicesCTA'
import cleaningImg from '../../../public/images/cleaning-3.png'
import conciergeImg from '../../../public/images/concierge-2.png'
import securityImg from '../../../public/images/security-guard-4.png'

export const metadata: Metadata = {
  title: 'Services | Sweep Property Plus',
  description:
    'Cleaning, concierge, and security services for commercial and multi-tenant buildings in Union, NJ and the surrounding area.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Services | Sweep Property Plus',
    description:
      'Cleaning, concierge, and security services for commercial and multi-tenant buildings in Union, NJ and the surrounding area.',
    url: '/services',
    siteName: 'Sweep Property Plus',
    type: 'website',
    locale: 'en_US',
  },
}

const services = [
  {
    number: '01',
    name: 'Cleaning Services',
    lead: 'Comprehensive cleaning programs built around your building’s schedule, traffic, and standards — from daily upkeep to periodic deep cleans that keep every space presentable and sanitary.',
    items: [
      'General office & commercial cleaning',
      'Deep cleaning & disinfection',
      'Carpet & upholstery care',
      'Restroom sanitation & restocking',
      'Day porter services',
      'Post-construction cleanup',
      'Common-area & lobby upkeep',
    ],
    image: cleaningImg,
    alt: 'Cleaner operating a floor-scrubbing machine in a commercial building lobby',
    bg: 'bg-white',
    ghost: 'text-teal/7',
    nextFill: 'fill-cream',
    reversed: false,
  },
  {
    number: '02',
    name: 'Concierge Services',
    lead: 'A professional front-of-house presence that keeps daily building operations running smoothly, so tenants and guests are looked after from the moment they walk in.',
    items: [
      'Front-desk & lobby reception',
      'Visitor & guest management',
      'Package & delivery handling',
      'Appointment & vendor coordination',
      'Doorman services',
      'Tenant & resident assistance',
    ],
    image: conciergeImg,
    alt: 'Concierge working at a reception desk in a modern building lobby',
    bg: 'bg-cream',
    ghost: 'text-teal-dark/6',
    nextFill: 'fill-white',
    reversed: true,
  },
  {
    number: '03',
    name: 'Security Services',
    lead: 'Trained, courteous personnel who protect your property and the people in it — combining an attentive on-site presence with monitoring and clear protocols around the clock.',
    items: [
      'Uniformed on-site guards',
      'Access control & visitor screening',
      'CCTV & control-room monitoring',
      'Emergency-response planning',
      'Event security',
    ],
    image: securityImg,
    alt: 'Uniformed security guard at a front-desk console in a building lobby',
    bg: 'bg-white',
    ghost: 'text-teal/7',
    nextFill: 'fill-teal',
    reversed: false,
  },
]

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      {services.map((service) => (
        <ServiceSection key={service.name} {...service} />
      ))}
      <ServicesCTA />
    </>
  )
}
