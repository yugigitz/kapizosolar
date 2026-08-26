import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SystemTypes from '@/components/SystemTypes'
import CTASection from '@/components/CTASection'
import { serviceList, solutions } from '@/data/services'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons'

export default function SolutionsPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solar Solutions', path: '/solutions' },
  ]

  usePageMeta(
    {
      title: 'Solar Solutions — Residential, Commercial & Industrial | Kapizo Solar',
      description:
        'Rooftop solar EPC solutions for homes, businesses, industry and agriculture across Telangana. On-grid, hybrid and battery storage systems designed and installed by Kapizo Solar.',
      path: '/solutions',
    },
    [
      webPageSchema(
        'Solar Solutions — Kapizo Solar',
        'Rooftop solar solutions for every segment across Telangana.',
        '/solutions',
      ),
      breadcrumbSchema(crumbs),
      serviceSchema(
        'Solar EPC Services',
        'Design, supply, installation and commissioning of rooftop solar systems.',
        '/solutions',
      ),
    ],
  )

  return (
    <>
      <PageHeader
        eyebrow="Solar Solutions"
        title="Solar solutions for every kind of property"
        description="A home, a showroom, a factory and a farm draw power differently. We design for the load pattern in front of us rather than fitting every customer to the same package."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="space-y-6">
            {solutions.map((sol) => (
              <article key={sol.slug} className="card p-6 sm:p-8">
                <div className="grid gap-6 lg:grid-cols-3 lg:gap-10">
                  <div className="lg:col-span-2">
                    <h2 className="font-display text-2xl font-extrabold text-kapizo-navy">
                      {sol.title}
                    </h2>
                    <p className="mt-1.5 text-sm font-semibold text-kapizo-orange-deep">{sol.audience}</p>
                    <p className="mt-4 text-base leading-relaxed text-slate-600">{sol.summary}</p>
                    <p className="mt-3 text-sm font-medium text-slate-500">{sol.typicalUse}</p>

                    <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-slate-500">
                      Benefits
                    </h3>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {sol.benefits.map((b) => (
                        <li key={b} className="flex gap-2.5 text-sm text-slate-600">
                          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-kapizo-green" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                        System options
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {sol.systemOptions.map((o) => (
                          <li
                            key={o}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-kapizo-navy"
                          >
                            {o}
                          </li>
                        ))}
                      </ul>
                      <Link to={`/solutions/${sol.slug}`} className="btn-navy mt-4 w-full !py-2.5 text-xs">
                        Full details
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SystemTypes />

      <section className="section bg-slate-50">
        <div className="container-kapizo">
          <div className="max-w-2xl">
            <span className="eyebrow">Full Scope</span>
            <h2 className="h-section mt-3">Everything we handle as your EPC partner</h2>
            <p className="lede mt-4">
              EPC means engineering, procurement and construction — we are responsible for the system
              end to end rather than supplying parts and leaving you to coordinate.
            </p>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceList.map((service) => (
              <li
                key={service}
                className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-kapizo-navy"
              >
                <CheckIcon className="h-4 w-4 shrink-0 text-kapizo-green" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection primaryLabel="Size My System" />
    </>
  )
}
