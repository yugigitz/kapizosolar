import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import PlanCard from '@/components/plans/PlanCard'
import PlanComparison from '@/components/plans/PlanComparison'
import CTASection from '@/components/CTASection'
import LeadForm from '@/components/LeadForm'
import { plans } from '@/data/plans'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { ArrowRightIcon } from '@/components/ui/Icons'

const planFaqs = [
  {
    q: 'What is the difference between the Essential, Recommended and High Performance options?',
    a: 'They differ in component selection, system design, protection scheme, monitoring and whether battery storage is included. Essential is a straightforward on-grid system with reliable components and essential protection, for customers focused on reducing the bill. Recommended adds better component selection, a more efficient design, stronger protection including surge protection, and proper monitoring. High Performance adds enhanced components where the site justifies them, an enhanced protection scheme, advanced monitoring where available, and battery storage as an option. All three include the same engineering approach to sizing and safety, net metering and subsidy assistance, and the 1-Year Kapizo Installation Workmanship Warranty.'
  },
  {
    q: 'Which option should I choose?',
    a: 'Most residential customers should start with Recommended — it is where the extra spend buys the things that matter across the life of the system. Choose Essential if reducing the bill is the whole goal and you do not need backup. Choose High Performance if you need power through outages, want the strongest configuration, or are holding the property long term. These are starting points, not fixed packages: the final system is designed around your usage and roof.'
  },
  {
    q: 'Do the plans include the government subsidy?',
    a: 'No plan price includes or depends on a subsidy. Residential grid-connected systems may be eligible for central financial assistance under PM Surya Ghar, subject to prevailing government guidelines and your DISCOM process, but that assistance goes to the applicant through the official portal — it is not a discount we control or can promise. The scheme also routes the balance payment through an empanelled vendor, and Kapizo Solar does not currently claim empanelment, so confirm the vendor requirements on the official portal before committing if the assistance route is central to your decision.',
  },
  {
    q: 'Why are prices not shown on the website?',
    a: 'Because a single published figure would be wrong for most roofs. Cost depends on capacity, roof type, structure height, cable runs and component selection, all of which are established at site assessment. Final pricing is shared after understanding your electricity usage, system requirement and site conditions, in a written quotation for your property.'
  },
]

export default function PlansPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
  ]

  usePageMeta(
    {
      title: 'Solar Options — Essential, Recommended & High Performance | Kapizo Solar',
      description:
        'Compare the Kapizo Solar Essential, Recommended and High Performance rooftop solar options: component selection, system design, protection, monitoring and battery options. Get a personalised quotation.',
      path: '/plans',
    },
    [
      webPageSchema(
        'Kapizo Solar Options — Essential, Recommended and High Performance',
        'Compare the three Kapizo Solar rooftop solar plans.',
        '/plans',
      ),
      breadcrumbSchema(crumbs),
      faqSchema(planFaqs),
    ],
  )

  return (
    <>
      <PageHeader
        eyebrow="Kapizo Plans"
        title="Three ways to approach your solar system"
        description="Essential, Recommended and High Performance are starting points rather than fixed packages. What changes between them is component selection, system design, protection, monitoring and battery capability. What does not change is the care taken over sizing and safety."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white" aria-labelledby="plans-heading">
        <div className="container-kapizo">
          <h2 id="plans-heading" className="sr-only">
            The three Kapizo Solar plans
          </h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-50" id="compare">
        <div className="container-kapizo">
          <div className="max-w-2xl">
            <span className="eyebrow">Side by Side</span>
            <h2 className="h-section mt-3">Full plan comparison</h2>
            <p className="lede mt-4">
              Every line below is a genuine difference, not a marketing tier. Where a value reads
              “Shared on request”, we confirm it in your written quotation once we have seen the roof.
            </p>
          </div>
          <div className="mt-10">
            <PlanComparison />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="eyebrow">Choosing</span>
              <h2 className="h-section mt-3">How to pick between them</h2>
              <div className="mt-6 space-y-5">
                {planFaqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-display text-base font-bold text-kapizo-navy">{f.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/solar-calculator" className="btn-outline">
                  Size my system first
                  <ArrowRightIcon />
                </Link>
                <Link to="/pm-surya-ghar" className="btn-outline">
                  Check subsidy eligibility
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>

            <div>
              <LeadForm
                variant="compact"
                heading="Request a plan quote"
                description="Tell us your requirement and preferred plan. We will confirm the specification and pricing against your site."
              />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which plan fits?"
        description="Send us your last electricity bill on WhatsApp. We will tell you the capacity you need and which plan makes sense — before you commit to anything."
        primaryLabel="Calculate My System Size"
      />
    </>
  )
}
