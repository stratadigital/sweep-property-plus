const serviceLinks = [
  { name: 'Special Cleaning', href: '#services' },
  { name: 'Deep Cleaning', href: '#services' },
  { name: 'Carpet Cleaning & Shampooing', href: '#services' },
  { name: 'Floor Scrubbing & Shining', href: '#services' },
]

const companyLinks = [
  { name: 'About Us', href: '#about' },
  { name: 'Industries Served', href: '#industries' },
  { name: 'Why Choose Us', href: '#why-us' },
  { name: 'Get a Quote', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-teal-dark">
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand — spans 2 cols on lg */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-gold">SPP</span>
              <span className="text-sm font-semibold text-white/80">Sweep Property Plus</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/60">
              Commercial cleaning services for office buildings, schools, and large commercial
              facilities.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold/70">
              Services
            </p>
            <ul className="mt-6 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold/70">
              Company
            </p>
            <ul className="mt-6 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider + bottom row */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Sweep Property Plus. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
