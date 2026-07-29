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
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company'),
          phone: data.get('phone'),
          facility_type: data.get('facility_type'),
          message: data.get('message'),
          botcheck: data.get('botcheck') === 'on',
        }),
        signal: controller.signal,
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
    } finally {
      clearTimeout(timeout)
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white pt-20 pb-32 lg:pt-28 lg:pb-40"
    >
      {/* Ghost text — section-level backdrop */}
      <span
        aria-hidden="true"
        className="text-teal/7 pointer-events-none absolute top-0 left-0 text-[10rem] leading-none font-bold tracking-tighter select-none lg:text-[20rem]"
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
            <p className="text-gold-dark text-xs font-semibold tracking-widest uppercase">
              Get in Touch
            </p>
            <div className="bg-gold mt-3 h-0.5 w-10" aria-hidden="true" />
            <h2 className="text-teal-dark mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Let&rsquo;s talk about your space.
            </h2>
            <p className="text-neutral-mid mt-6 text-base leading-7">
              Tell us about your building and what you need. We&rsquo;ll be in touch to discuss a
              cleaning program for your facility.
            </p>

            <div className="text-neutral-mid mt-10 space-y-3 text-sm">
              <p>
                <span className="text-teal-dark font-semibold">Email:</span>{' '}
                <a
                  href="mailto:info@sweeproperty.com"
                  className="hover:text-teal transition-colors"
                >
                  info@sweeproperty.com
                </a>
              </p>
              <p>
                <span className="text-teal-dark font-semibold">Phone:</span>{' '}
                <a href="tel:+17327028440" className="hover:text-teal transition-colors">
                  (732) 702-8440
                </a>
              </p>
              <p>
                <span className="text-teal-dark font-semibold">Address:</span>{' '}
                <a
                  href="https://maps.google.com/?q=180+Summit+Ave,+Montvale,+NJ+07645"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal transition-colors"
                >
                  180 Summit Ave, Montvale, NJ 07645
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="bg-cream rounded-xl shadow-sm"
          >
            {status === 'success' ? (
              <div className="flex min-h-[520px] flex-col items-start justify-center p-8 lg:p-10">
                <CheckCircleIcon className="text-teal mb-4 size-12" aria-hidden="true" />
                <h3 className="text-teal-dark text-xl font-semibold">Request received.</h3>
                <p className="text-neutral-mid mt-3 text-base leading-7">
                  Thank you for reaching out. We&rsquo;ll be in touch soon to discuss your space.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-teal mt-8 cursor-pointer text-sm font-semibold underline-offset-2 hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 lg:p-10">
                {/* Honeypot — bots fill this in, humans don't */}
                <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" />

                <div className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-teal-dark mb-1.5 block text-sm font-semibold"
                      >
                        Name <span className="text-gold-dark">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="border-teal/20 text-neutral-dark placeholder:text-neutral-mid focus:border-teal focus:ring-teal/15 w-full rounded border bg-white px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="text-teal-dark mb-1.5 block text-sm font-semibold"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your company"
                        className="border-teal/20 text-neutral-dark placeholder:text-neutral-mid focus:border-teal focus:ring-teal/15 w-full rounded border bg-white px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-teal-dark mb-1.5 block text-sm font-semibold"
                    >
                      Email <span className="text-gold-dark">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="border-teal/20 text-neutral-dark placeholder:text-neutral-mid focus:border-teal focus:ring-teal/15 w-full rounded border bg-white px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-teal-dark mb-1.5 block text-sm font-semibold"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(201) 555-0123"
                      className="border-teal/20 text-neutral-dark placeholder:text-neutral-mid focus:border-teal focus:ring-teal/15 w-full rounded border bg-white px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="facility_type"
                      className="text-teal-dark mb-1.5 block text-sm font-semibold"
                    >
                      Facility Type
                    </label>
                    <select
                      id="facility_type"
                      name="facility_type"
                      value={facilityType}
                      onChange={(e) => setFacilityType(e.target.value)}
                      className={`border-teal/20 focus:border-teal focus:ring-teal/15 w-full rounded border bg-white px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none ${
                        facilityType === '' ? 'text-neutral-mid' : 'text-neutral-dark'
                      }`}
                    >
                      <option value="" disabled>
                        Select facility type
                      </option>
                      <option value="Office Building">Office Building</option>
                      <option value="School / University">School / University</option>
                      <option value="Retail / Shopping Center">Retail / Shopping Center</option>
                      <option value="Medical Building">Medical Building</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="text-teal-dark mb-1.5 block text-sm font-semibold"
                    >
                      Tell us about your space <span className="text-gold-dark">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Square footage, services needed, preferred schedule..."
                      className="border-teal/20 text-neutral-dark placeholder:text-neutral-mid focus:border-teal focus:ring-teal/15 w-full resize-none rounded border bg-white px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-error text-sm font-medium">
                      Something went wrong. Please try again or{' '}
                      <a
                        href="mailto:info@sweeproperty.com"
                        className="underline underline-offset-2"
                      >
                        email us directly
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-gold text-teal-dark w-full cursor-pointer rounded py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
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
