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
    q: 'What is the difference between the Budget, Standard and Premium solar plans?',
    a: 'The three plans differ in module and inverter specification, mounting structure, protection scheme, monitoring, documentation support and whether battery storage is included. Budget is an on-grid system with essential protection at the lowest entry cost. Standard adds higher-efficiency modules, app-based monitoring and full surge protection. Premium adds premium-tier components, a hybrid or hybrid-ready inverter with a battery option, an enhanced structure and priority support.',
  },
  {
    q: 'Which Kapizo solar plan should I choose?',
    a: 'Choose Budget if your only goal is reducing the bill and you do not need backup. Choose Standard if you want better components and the ability to see what the system is generating — this suits most residential customers. Choose Premium if you need backup during outages, want the highest specification, or are holding the property long term.',
  },
  {
    q: 'Do the plans include the government subsidy?',
    a: 'No plan price includes or depends on a subsidy. Residential grid-connected systems may be eligible for central financial assistance under PM Surya Ghar, subject to prevailing government guidelines and your DISCOM process, but that assistance goes to the applicant through the official portal — it is not a discount we control or can promise. The scheme also routes the balance payment through an empanelled vendor, and Kapizo Solar does not currently claim empanelment, so confirm the vendor requirements on the official portal before committing if the assistance route is central to your decision.',
  },
  {
    q: 'Why are prices not shown on the plan pages?',
    a: 'The cost of a rooftop system depends on capacity, roof type, structure height, cable runs and component selection — all of which are confirmed during site assessment. Publishing a single figure would either overstate or understate the cost for most roofs, so we provide a written quote against your actual site instead.',
  },
]

export default function PlansPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
  ]

  usePageMeta(
    {
      title: 'Solar Plans — Budget, Standard & Premium | Kapizo Solar',
      description:
        'Compare Kapizo Solar Budget, Standard and Premium rooftop solar plans: modules, inverter, protection, monitoring, documentation and battery options. Request a quote.',
      path: '/plans',
    },
    [
      webPageSchema(
        'Kapizo Solar Plans — Budget, Standard and Premium',
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
        title="Budget, Standard and Premium — what actually changes"
        description="Three specification levels, one engineering approach. What changes is the panels, the inverter, the protection and whether you get battery backup. What does not change is the care taken over sizing and safety."
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
              “Shared on request”, we confirm it in your written proposal once we have seen the roof.
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
