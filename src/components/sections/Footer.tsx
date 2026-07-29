import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Why Us', href: '/#why-us' },
  { name: 'Industries', href: '/#industries' },
  { name: 'Contact', href: '/#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-teal-dark">
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-10">
        {/* Brand + nav */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block">
              <Image
                src="/spp-logo-colored.png"
                alt="Sweep Property Plus"
                width={381}
                height={200}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Commercial cleaning services for office buildings, schools, and large commercial
              facilities.
            </p>
            <address className="mt-4 text-sm leading-7 text-white/60 not-italic">
              <a
                href="https://maps.google.com/?q=180+Summit+Ave,+Montvale,+NJ+07645"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                180 Summit Ave
                <br />
                Montvale, NJ 07645
              </a>
            </address>
          </div>

          {/* Nav links — mirror the header */}
          <nav className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider + bottom row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} Sweep Property Plus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
