'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Why Us', href: '#why-us' },
  { name: 'Industries', href: '#industries' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-teal/10 sticky top-0 z-40 border-b bg-white shadow-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              src="/spp-logo-colored.png"
              alt="Sweep Property Plus"
              width={381}
              height={200}
              className="h-14 w-auto"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="text-teal -m-2.5 inline-flex cursor-pointer items-center justify-center rounded p-2.5"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group text-teal-dark hover:text-teal relative text-sm font-semibold transition-colors"
            >
              {item.name}
              <span className="bg-gold absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="#contact"
            className="bg-gold text-teal-dark rounded px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:brightness-110 active:brightness-95"
          >
            Get a Quote
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="bg-teal-dark/20 fixed inset-0 z-40" aria-hidden="true" />
        <DialogPanel
          transition
          className="sm:ring-teal/10 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 transition duration-300 ease-in-out data-closed:translate-x-full sm:max-w-sm sm:ring-1"
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                src="/spp-logo-colored.png"
                alt="Sweep Property Plus"
                width={381}
                height={200}
                className="h-14 w-auto"
                unoptimized
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="text-teal -m-2.5 cursor-pointer rounded p-2.5"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="divide-teal/10 -my-6 divide-y">
              <div className="space-y-1 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-teal-dark hover:bg-cream -mx-3 block rounded px-3 py-2.5 text-base font-semibold"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-gold text-teal-dark block rounded px-4 py-3 text-center text-base font-semibold transition-all duration-200 hover:brightness-110"
                >
                  Get a Quote
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
