import {
  BuildingOffice2Icon,
  AcademicCapIcon,
  BuildingStorefrontIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline'

const industries = [
  { name: 'Office Buildings & Parks', icon: BuildingOffice2Icon },
  { name: 'Schools & Educational Facilities', icon: AcademicCapIcon },
  { name: 'Retail Centers & Malls', icon: BuildingStorefrontIcon },
  { name: 'Medical & Professional Buildings', icon: BriefcaseIcon },
]

export default function Industries() {
  return (
    <section className="relative bg-cream pb-32 pt-20 lg:pb-40 lg:pt-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">
            Who We Serve
          </p>
          <div className="mt-3 h-0.5 w-10 bg-gold" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-teal-dark sm:text-4xl">
            Built for large-scale commercial spaces
          </h2>
        </div>

        {/* Industry tiles */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {industries.map(({ name, icon: Icon }) => (
            <div key={name} className="flex flex-col items-center gap-4 text-center">
              <div className="flex items-center justify-center rounded bg-white p-5 shadow-sm">
                <Icon className="size-10 text-teal" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold leading-snug text-teal-dark">{name}</p>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="mt-14 text-sm text-neutral-mid">
          Don&rsquo;t see your facility type? We likely service it —{' '}
          <a href="#contact" className="font-semibold text-teal underline-offset-2 hover:underline">
            reach out
          </a>
          .
        </p>

      </div>

      {/* Diagonal → How It Works (teal) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block h-20 w-full fill-teal"
        >
          <polygon points="0,80 1440,0 1440,80" />
        </svg>
      </div>
    </section>
  )
}
