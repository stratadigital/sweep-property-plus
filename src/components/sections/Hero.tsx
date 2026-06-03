import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center pb-20">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2070&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Teal overlay */}
      <div className="absolute inset-0 bg-teal/[0.78]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">
          Commercial Cleaning Services
        </p>

        <h1 className="mt-4 max-w-2xl text-5xl font-bold tracking-tight text-white lg:text-7xl">
          Your space,
          <br />
          in our care.
        </h1>

        <p className="mt-6 max-w-lg text-lg font-medium text-white/80">
          Professional commercial cleaning for offices and large buildings — on your schedule, to
          your standard.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="rounded bg-gold px-6 py-3 text-sm font-semibold text-teal-dark shadow-sm transition-opacity hover:opacity-90"
          >
            Get a Free Quote
          </a>
          <a
            href="#services"
            className="rounded border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/70"
          >
            Our Services →
          </a>
        </div>
      </div>

      {/* Diagonal transition → Services */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block h-20 w-full fill-teal-dark">
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
