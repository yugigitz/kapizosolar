import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import LeadForm from '@/components/LeadForm'
import CTASection from '@/components/CTASection'
import { phones, telHref, whatsappHref } from '@/data/business'
import {
  CONFIGURABLE_PLACEHOLDER,
  getPlan,
  isConfigured,
  planWhatsAppMessage,
  plans,
  specValue,
} from '@/data/plans'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, serviceSchema, webPageSchema } from '@/lib/seo'
import { trackEvent } from '@/lib/analytics'
import { ArrowRightIcon, CheckIcon, PhoneIcon, WhatsAppIcon, XIcon } from '@/components/ui/Icons'

export default function PlanDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const plan = slug ? getPlan(slug) : undefined

  if (!plan) return <Navigate to="/plans" replace />

  const path = `/plans/${plan.slug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Plans', path: '/plans' },
    { name: plan.name, path },
  ]

  usePageMeta(
    { title: plan.seo.title, description: plan.seo.description, path },
    [
      webPageSchema(plan.name, plan.seo.description, path),
      breadcrumbSchema(crumbs),
      serviceSchema(`${plan.name} — Rooftop Solar Installation`, plan.positioning, path),
    ],
  )

  const otherPlans = plans.filter((p) => p.id !== plan.id)
  const waMessage = planWhatsAppMessage(plan)

  return (
    <>
      <PageHeader
        eyebrow={plan.audienceLabel}
        title={plan.name}
        description={plan.positioning}
        breadcrumbs={crumbs}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#plan-enquiry" className="btn-primary">
            {plan.cta.enquire}
            <ArrowRightIcon />
          </a>
          <a
            href={whatsappHref(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { context: 'plan_detail', plan: plan.id })}
            className="btn-green"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {plan.cta.whatsapp}
          </a>
          <a
            href={telHref(phones.primary)}
            onClick={() => trackEvent('phone_click', { context: 'plan_detail', plan: plan.id })}
            className="btn-ghost-light"
          >
            <PhoneIcon className="h-4 w-4" />
            Call {phones.primary}
          </a>
        </div>
      </PageHeader>

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-extrabold text-kapizo-navy">
                Who this plan is for
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{plan.idealCustomer}</p>

              {isConfigured(plan.recommendedReason) && (
                <p className="mt-4 rounded-lg border border-kapizo-green/25 bg-kapizo-green/[0.05] px-4 py-3 text-sm leading-relaxed text-kapizo-green-dark">
                  <strong>Why this is our recommended plan: </strong>
                  {plan.recommendedReason}
                </p>
              )}

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                System overview
              </h2>
              <p className="mt-3 text-sm font-semibold text-kapizo-orange">{plan.capacityOptions}</p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">{plan.expectedOutcome}</p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Specification
              </h2>
              <dl className="mt-4 divide-y divide-slate-100 border-y border-slate-200">
                {Object.values(plan.specs).map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
                    <dt className="text-sm font-semibold text-slate-500 sm:w-56 sm:shrink-0">
                      {spec.label}
                    </dt>
                    <dd
                      className={`text-sm ${
                        isConfigured(spec.value) ? 'text-kapizo-navy' : 'italic text-slate-400'
                      }`}
                    >
                      {specValue(spec)}
                    </dd>
                  </div>
                ))}
              </dl>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                What is included
              </h2>
              <ul className="mt-4 space-y-2.5">
                {plan.inclusions.map((inc) => (
                  <li key={inc} className="flex gap-2.5 text-sm text-slate-600">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-kapizo-green" />
                    {inc}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Optional upgrades
              </h2>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {plan.optionalUpgrades.map((up) => (
                  <li
                    key={up}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-600"
                  >
                    {up}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Not included
              </h2>
              <ul className="mt-4 space-y-2.5">
                {plan.exclusions.map((ex) => (
                  <li key={ex} className="flex gap-2.5 text-sm text-slate-600">
                    <XIcon className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                    {ex}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Warranty
              </h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {plan.warranty.map((w) => (
                  <div key={w.label} className="rounded-lg border border-slate-200 p-4">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {w.label}
                    </dt>
                    <dd
                      className={`mt-1 text-sm font-semibold ${
                        isConfigured(w.value) ? 'text-kapizo-navy' : 'italic text-slate-400'
                      }`}
                    >
                      {w.value ?? CONFIGURABLE_PLACEHOLDER}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Warranties are provided by the component manufacturers and differ by make and model.
                The exact warranty applicable to your system is stated in your written proposal.
              </p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Pricing and subsidy
              </h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Price
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {isConfigured(plan.indicativePriceNote)
                      ? plan.indicativePriceNote
                      : 'Confirmed in your written proposal after site assessment. Cost depends on capacity, roof type, structure height, cable runs and component selection.'}
                  </p>
                </div>
                {isConfigured(plan.subsidyNote) && (
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Subsidy
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{plan.subsidyNote}</p>
                    <Link
                      to="/pm-surya-ghar"
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-kapizo-green hover:underline"
                    >
                      Read about PM Surya Ghar
                      <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>

              <div className="disclaimer mt-8">
                <strong>Important.</strong>
                <ul className="mt-2 space-y-1.5">
                  {plan.notes.map((n) => (
                    <li key={n}>• {n}</li>
                  ))}
                  <li>
                    • Government scheme benefits, eligibility and subsidy amounts are subject to
                    applicable government guidelines and may change. Verify the current position
                    through official government channels.
                  </li>
                </ul>
              </div>
            </div>

            {/* Sticky conversion rail */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="card p-5">
                  <h2 className="font-display text-lg font-bold text-kapizo-navy">
                    Enquire about the {plan.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    We will confirm the specification, capacity and price against your site.
                  </p>
                  <div className="mt-5 space-y-2.5">
                    <a href="#plan-enquiry" className="btn-primary w-full">
                      {plan.cta.primary}
                    </a>
                    <a
                      href={whatsappHref(waMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent('whatsapp_click', { context: 'plan_rail', plan: plan.id })
                      }
                      className="btn-green w-full"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      WhatsApp Kapizo
                    </a>
                    <a
                      href={telHref(phones.primary)}
                      onClick={() =>
                        trackEvent('phone_click', { context: 'plan_rail', plan: plan.id })
                      }
                      className="btn-outline w-full"
                    >
                      <PhoneIcon className="h-4 w-4" />
                      Call {phones.primary}
                    </a>
                    <Link to="/plans#compare" className="btn-outline w-full">
                      Compare Plans
                    </Link>
                  </div>
                </div>

                <div className="card mt-4 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Other plans
                  </p>
                  <ul className="mt-3 space-y-2">
                    {otherPlans.map((p) => (
                      <li key={p.id}>
                        <Link
                          to={`/plans/${p.slug}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3.5 py-3 transition-colors hover:border-kapizo-green hover:bg-kapizo-green/[0.03]"
                        >
                          <span>
                            <span className="block text-sm font-bold text-kapizo-navy">{p.name}</span>
                            <span className="block text-xs text-slate-500">{p.audienceLabel}</span>
                          </span>
                          <ArrowRightIcon className="h-4 w-4 shrink-0 text-slate-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50" id="plan-enquiry">
        <div className="container-kapizo">
          <div className="mx-auto max-w-2xl">
            <LeadForm
              presetPlan={plan.id}
              variant="compact"
              heading={`Enquire about the ${plan.name}`}
              description="Your plan selection is already included. Add your details and we will respond with a system size and proposal."
            />
          </div>
        </div>
      </section>

      <CTASection
        title={`Want to be sure the ${plan.name} is right for you?`}
        description="Size your system first, then compare plans against a real number rather than a guess."
        waMessage={waMessage}
        primaryLabel="Use the Solar Calculator"
        context={`plan_${plan.id}_footer`}
      />
    </>
  )
}
