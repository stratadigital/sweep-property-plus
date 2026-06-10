'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'motion/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { slideInLeft, slideInRight, viewport } from '@/lib/animations'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  // Controlled so the empty state can render placeholder-gray like the inputs
  const [facilityType, setFacilityType] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setStatus('success')
        form.reset()
        setFacilityType('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-white pb-32 pt-20 lg:pb-40 lg:pt-28">

      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 select-none text-[10rem] font-bold leading-none tracking-tighter text-teal/7 lg:text-[20rem]"
      >
        CONTACT
      </span>

      <div className="relative z-1 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

          {/* Left — info */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <p className="text-gold-dark text-xs font-semibold uppercase tracking-widest">
              Get in Touch
            </p>
            <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
              Let&rsquo;s talk about your space.
            </h2>
            <p className="mt-6 text-base leading-7 text-neutral-mid">
              Tell us about your building and what you need. We&rsquo;ll be in touch to discuss
              a cleaning program for your facility.
            </p>

            <div className="mt-10 space-y-3 text-sm text-neutral-mid">
              <p>
                <span className="font-semibold text-teal-dark">Email:</span>{' '}
                info@sweeppropertyplus.com
              </p>
              <p>
                <span className="font-semibold text-teal-dark">Phone:</span> (908) 555-0100
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {status === 'success' ? (
              <div className="flex h-full flex-col items-start justify-center rounded-xl bg-cream p-10 shadow-sm">
                <CheckCircleIcon className="mb-4 size-12 text-teal" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-teal-dark">Request received.</h3>
                <p className="mt-3 text-base leading-7 text-neutral-mid">
                  Thank you for reaching out. We&rsquo;ll be in touch within one business day with
                  a proposal for your space.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 cursor-pointer text-sm font-semibold text-teal underline-offset-2 hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl bg-cream p-8 shadow-sm lg:p-10"
                noValidate
              >
                <input
                  type="hidden"
                  name="access_key"
                  value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? ''}
                />
                <input type="hidden" name="subject" value="New Quote Request — Sweep Property Plus" />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-teal-dark">
                        Name <span className="text-gold-dark">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded border border-teal/20 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-mid transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/15"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-teal-dark">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your company"
                        className="w-full rounded border border-teal/20 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-mid transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/15"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-teal-dark">
                      Email <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded border border-teal/20 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-mid transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/15"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-teal-dark">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(908) 555-0100"
                      className="w-full rounded border border-teal/20 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-mid transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/15"
                    />
                  </div>

                  <div>
                    <label htmlFor="facility_type" className="mb-1.5 block text-sm font-semibold text-teal-dark">
                      Facility Type
                    </label>
                    <select
                      id="facility_type"
                      name="facility_type"
                      value={facilityType}
                      onChange={(e) => setFacilityType(e.target.value)}
                      className={`w-full rounded border border-teal/20 bg-white px-4 py-3 text-sm transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/15 ${
                        facilityType === '' ? 'text-neutral-mid' : 'text-neutral-dark'
                      }`}
                    >
                      <option value="" disabled>Select facility type</option>
                      <option value="Office Building">Office Building</option>
                      <option value="School / University">School / University</option>
                      <option value="Retail / Shopping Center">Retail / Shopping Center</option>
                      <option value="Medical Building">Medical Building</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-teal-dark">
                      Tell us about your space <span className="text-gold-dark">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Square footage, services needed, preferred schedule..."
                      className="w-full resize-none rounded border border-teal/20 bg-white px-4 py-3 text-sm text-neutral-dark placeholder:text-neutral-mid transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/15"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-error text-sm font-medium">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full cursor-pointer rounded bg-gold py-3 text-sm font-semibold text-teal-dark shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Request a Free Quote'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>

      {/* Diagonal → Footer (teal-dark) */}
      <div className="absolute bottom-0 left-0 z-2 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-20 w-full fill-teal-dark"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
