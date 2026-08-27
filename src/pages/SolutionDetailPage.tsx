import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import LeadForm from '@/components/LeadForm'
import CTASection from '@/components/CTASection'
import { phones, telHref, waMessages, whatsappHref } from '@/data/business'
import { solutions } from '@/data/services'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo'
import { trackEvent } from '@/lib/analytics'
import { ArrowRightIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons'

export default function SolutionDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const sol = solutions.find((s) => s.slug === slug)

  if (!sol) return <Navigate to="/solutions" replace />

  const path = `/solutions/${sol.slug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solar Solutions', path: '/solutions' },
    { name: sol.title, path },
  ]

  usePageMeta(
    {
      title: `${sol.title} in Telangana | Kapizo Solar`,
      description: `${sol.summary.slice(0, 150)} Kapizo Solar designs and installs across Telangana.`,
      path,
    },
    [
      webPageSchema(sol.title, sol.summary, path),
      breadcrumbSchema(crumbs),
      serviceSchema(sol.title, sol.summary, path),
    ],
  )

  const waMessage = waMessages[sol.waKey]

  return (
    <>
      <PageHeader eyebrow={sol.audience} title={sol.title} description={sol.summary} breadcrumbs={crumbs}>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link to="/solar-calculator" className="btn-primary">
            Calculate My System Size
            <ArrowRightIcon />
          </Link>
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { context: `solution_${sol.slug}` })}
            className="btn-green"
          >
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp for Solar Quote
          </a>
          <a
            href={telHref(phones.primary)}
            onClick={() => trackEvent('phone_click', { context: `solution_${sol.slug}` })}
            className="btn-ghost-light"
          >
            <PhoneIcon className="h-4 w-4" />
            {phones.primary}
          </a>
        </div>
      </PageHeader>

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-extrabold text-kapizo-navy">
                Who this is for
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{sol.audience}.</p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{sol.typicalUse}</p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Why it makes sense
              </h2>
              <ul className="mt-4 space-y-3">
                {sol.benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-base text-slate-600">
                    <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-kapizo-green" />
                    {b}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                System options
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {sol.systemOptions.map((o) => (
                  <div key={o} className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-sm font-bold text-kapizo-navy">{o}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/solutions#system-types"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-kapizo-green hover:underline"
              >
                Understand the difference between on-grid, hybrid and storage
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Next steps
              </h2>
              <ol className="mt-4 space-y-3 text-base text-slate-600">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kapizo-green text-xs font-bold text-white">
                    1
                  </span>
                  <span>
                    Use the{' '}
                    <Link to="/solar-calculator" className="font-semibold text-kapizo-green hover:underline">
                      solar calculator
                    </Link>{' '}
                    to get an indicative capacity for your consumption.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kapizo-green text-xs font-bold text-white">
                    2
                  </span>
                  <span>
                    Compare the{' '}
                    <Link to="/plans" className="font-semibold text-kapizo-green hover:underline">
                      Essential, Recommended and High Performance options
                    </Link>{' '}
                    to decide on specification.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kapizo-green text-xs font-bold text-white">
                    3
                  </span>
                  <span>Request a site assessment so we can confirm capacity and issue a quote.</span>
                </li>
              </ol>
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <LeadForm
                  variant="compact"
                  heading={`Enquire about ${sol.title.toLowerCase()}`}
                  description="Share your details and we will come back with a system size and proposal."
                />
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection waMessage={waMessage} context={`solution_${sol.slug}_footer`} />
    </>
  )
}
