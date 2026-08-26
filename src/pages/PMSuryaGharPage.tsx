import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import LeadForm from '@/components/LeadForm'
import { waMessages, whatsappHref } from '@/data/business'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { trackEvent } from '@/lib/analytics'
import { ArrowRightIcon, WhatsAppIcon } from '@/components/ui/Icons'

const journey = [
  {
    step: 1,
    title: 'Register on the national portal',
    detail:
      'Applications are made through the official PM Surya Ghar portal. You register with your electricity consumer number, your distribution company and your mobile number.',
  },
  {
    step: 2,
    title: 'Apply for feasibility approval',
    detail:
      'Your DISCOM reviews the application for technical feasibility on your connection before installation begins.',
  },
  {
    step: 3,
    title: 'Get the system installed',
    detail:
      'Once approved, the rooftop system is installed. The scheme requires the installation to meet the applicable technical specifications.',
  },
  {
    step: 4,
    title: 'Submit installation details and apply for net metering',
    detail:
      'Plant details are submitted on the portal and a net metering application is raised with the DISCOM.',
  },
  {
    step: 5,
    title: 'Inspection and commissioning certificate',
    detail:
      'The DISCOM inspects the installation and, once satisfied, issues a commissioning certificate through the portal.',
  },
  {
    step: 6,
    title: 'Submit bank details for subsidy credit',
    detail:
      'After commissioning, you submit your bank account details and a cancelled cheque on the portal. The subsidy is credited directly to your bank account.',
  },
]

const schemeFaqs = [
  {
    q: 'What is PM Surya Ghar Muft Bijli Yojana?',
    a: 'It is a central government scheme to promote rooftop solar for residential electricity consumers in India. It provides central financial assistance towards the cost of a grid-connected rooftop solar system, applied for through a single national portal, with the distribution company handling feasibility approval, inspection and net metering. The scheme is administered by the Ministry of New and Renewable Energy.',
  },
  {
    q: 'Who is the scheme intended for?',
    a: 'It is intended for residential electricity consumers who own the property or have the right to install on the roof, hold a valid electricity connection in their own name, and do not already have a subsidised solar system on the same connection. Commercial, industrial and institutional consumers are generally outside the residential subsidy component, though they can still install rooftop solar under normal net metering rules.',
  },
  {
    q: 'How does the rooftop solar subsidy work?',
    a: 'The assistance is structured per kilowatt of installed capacity, with the per-kW amount reducing as capacity increases and an overall ceiling above a certain size. It is not a discount applied by the installer — it is credited to the applicant\'s bank account after the system is installed, inspected and commissioned, and after bank details are submitted on the portal. Because the amounts and conditions are set by the government and can be revised, confirm the current figures on the official portal.',
  },
  {
    q: 'Does the subsidy cover battery or hybrid systems?',
    a: 'The residential component of the scheme is directed at grid-connected rooftop solar. Battery storage and off-grid components are treated differently and are generally not covered by the same assistance. If you want backup, we will explain clearly which part of your system would and would not fall within the scheme.',
  },
  {
    q: 'How long does the subsidy take to arrive?',
    a: 'The subsidy is processed after commissioning and after your bank details are submitted on the portal. The timeline depends on the DISCOM inspection, the portal processing and the disbursement cycle, so we do not promise a specific date. Anyone guaranteeing you an exact credit date is overstating what they control.',
  },
  {
    q: 'Is Kapizo Solar an empanelled or authorised vendor for the scheme?',
    a: 'We do not claim empanelment or authorised vendor status. Where a scheme requires a registered or empanelled vendor for a particular step, we will tell you plainly what the requirement is and what it means for your application. We assist with the documentation and the technical side of the installation.',
  },
]

export default function PMSuryaGharPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'PM Surya Ghar', path: '/pm-surya-ghar' },
  ]

  usePageMeta(
    {
      title: 'PM Surya Ghar Rooftop Solar Scheme Explained | Kapizo Solar',
      description:
        'A plain-language explanation of the PM Surya Ghar rooftop solar scheme: who it is for, how the subsidy works, the application journey and what to verify officially.',
      path: '/pm-surya-ghar',
    },
    [
      webPageSchema(
        'PM Surya Ghar Rooftop Solar Scheme Explained',
        'How the PM Surya Ghar rooftop solar scheme works for residential consumers.',
        '/pm-surya-ghar',
      ),
      breadcrumbSchema(crumbs),
      faqSchema(schemeFaqs),
    ],
  )

  useEffect(() => {
    trackEvent('pm_surya_ghar_view')
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Government Scheme"
        title="PM Surya Ghar — Rooftop Solar Scheme"
        description="What the scheme is, who it is intended for, and how the application and subsidy process actually works — explained without overstating what anyone can promise you."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="disclaimer">
                <strong>Please read first.</strong> Government scheme benefits, eligibility, subsidy
                amounts and approval requirements are subject to applicable government guidelines and
                may change. Customers should verify the latest information through official
                government channels before making a decision. The explanation below is Kapizo Solar's
                summary in our own words, provided to help you understand the process — it is not a
                government publication and does not replace official guidance.
              </div>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                What the scheme is
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                PM Surya Ghar Muft Bijli Yojana is a central government scheme intended to increase
                rooftop solar adoption among residential electricity consumers in India. It provides
                central financial assistance towards the cost of a grid-connected rooftop system, and
                routes the whole process — application, feasibility approval, installation reporting,
                inspection and subsidy release — through a single national portal, with your
                electricity distribution company involved at the approval and metering stages.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                The important structural point is that the assistance goes to you, the consumer,
                after the system is commissioned. It is not a discount the installer applies to the
                invoice, and no installer controls whether or when it is released.
              </p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Who it is intended for
              </h2>
              <ul className="mt-4 space-y-2.5 text-base text-slate-600">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kapizo-green" />
                  Residential electricity consumers with a valid connection in their own name
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kapizo-green" />
                  Applicants who own the roof or have the right to install on it
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kapizo-green" />
                  Properties with adequate shadow-free roof area for the intended capacity
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-kapizo-green" />
                  Connections that have not already received assistance for a solar system
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Commercial, industrial and institutional consumers fall outside the residential
                subsidy component, but can still install rooftop solar under the applicable net
                metering rules for their category.
              </p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                How the subsidy is structured
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Assistance is calculated per kilowatt of installed capacity. The per-kW amount is
                higher for the initial kilowatts and reduces for additional capacity, with an overall
                ceiling once the system passes a certain size. This design deliberately favours
                smaller residential systems.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                We have deliberately not printed specific rupee figures on this page. The amounts and
                conditions are set by the government and have been revised before. Rather than
                publish a number that may be out of date by the time you read it, we will confirm the
                figures applicable to your case at the time of your enquiry, and you should
                cross-check them on the official portal.
              </p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                The application journey
              </h2>
              <ol className="mt-5 space-y-4">
                {journey.map((j) => (
                  <li key={j.step} className="flex gap-4 rounded-xl border border-slate-200 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kapizo-navy text-sm font-extrabold text-white">
                      {j.step}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-kapizo-navy">{j.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{j.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Where Kapizo Solar fits in
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                We handle the technical side — assessing your roof, designing a system that meets the
                applicable specifications, installing and commissioning it properly, and assisting
                with the documentation you need to submit. Approvals, inspection and subsidy release
                are decisions made by the DISCOM and the government, not by us, and we will always be
                clear about that boundary.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                We do not claim empanelled or authorised vendor status under the scheme. If a
                particular step requires a registered vendor, we will tell you plainly what that
                means for your application rather than leaving it vague.
              </p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Verify on official sources
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Always confirm current eligibility, amounts and process on the official government
                sources rather than on any installer's website, including ours:
              </p>
              <ul className="mt-4 space-y-2 text-base">
                <li>
                  <a
                    href="https://pmsuryaghar.gov.in"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-kapizo-green underline underline-offset-2 hover:text-kapizo-green-dark"
                  >
                    pmsuryaghar.gov.in
                  </a>{' '}
                  <span className="text-slate-500">— the official national portal for the scheme</span>
                </li>
                <li>
                  <a
                    href="https://mnre.gov.in"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-kapizo-green underline underline-offset-2 hover:text-kapizo-green-dark"
                  >
                    mnre.gov.in
                  </a>{' '}
                  <span className="text-slate-500">
                    — Ministry of New and Renewable Energy
                  </span>
                </li>
              </ul>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Common questions
              </h2>
              <div className="mt-5 space-y-6">
                {schemeFaqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-display text-base font-bold text-kapizo-navy">{f.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-xl border border-kapizo-green/25 bg-kapizo-green/[0.04] p-6">
                <h3 className="font-display text-lg font-bold text-kapizo-navy">
                  Need help understanding your eligibility?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Send us your electricity bill and we will walk you through what applies to your
                  connection, what the process would involve and what we can assist with.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={whatsappHref(waMessages.subsidy)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { context: 'pm_surya_ghar' })}
                    className="btn-primary"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Check My Eligibility
                  </a>
                  <Link to="/solar-calculator" className="btn-outline">
                    Estimate my system size
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <LeadForm
                  variant="compact"
                  heading="Talk to Kapizo Solar"
                  description="We will explain what applies to your connection and what the next step looks like."
                />
                <div className="card mt-4 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Related
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <Link to="/solutions/residential" className="font-semibold text-kapizo-green hover:underline">
                        Residential rooftop solar →
                      </Link>
                    </li>
                    <li>
                      <Link to="/plans" className="font-semibold text-kapizo-green hover:underline">
                        Compare Kapizo plans →
                      </Link>
                    </li>
                    <li>
                      <Link to="/solar-knowledge/net-metering-explained" className="font-semibold text-kapizo-green hover:underline">
                        How net metering works →
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        title="Considering rooftop solar under the scheme?"
        description="Start with the system size you actually need. The subsidy follows the capacity, so sizing correctly is the first decision."
        waMessage={waMessages.subsidy}
        context="pm_surya_ghar_footer"
      />
    </>
  )
}
