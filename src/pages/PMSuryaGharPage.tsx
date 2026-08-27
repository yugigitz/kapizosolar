import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import LeadForm from '@/components/LeadForm'
import { waMessages, whatsappHref } from '@/data/business'
import { usePageMeta } from '@/hooks/usePageMeta'
import {
  COST_VS_SUBSIDY_NOTE,
  OFFICIAL_LINKS,
  SUBSIDY_HEADLINE,
  SUBSIDY_LIMITATIONS,
  SUBSIDY_SLABS,
  SUBSIDY_STRUCTURE,
} from '@/data/scheme'
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
    q: 'How much subsidy is available under PM Surya Ghar?',
    a: `Under the residential Central Financial Assistance component, assistance is ${SUBSIDY_STRUCTURE} At published benchmark prices that works out to approximately ${SUBSIDY_SLABS.map((s) => `${s.amount} for ${s.capacity}`).join(', ')}. ${SUBSIDY_HEADLINE} Verify the current position on the official portal before making a financial decision.`,
  },
  {
    q: 'How does the rooftop solar subsidy actually reach me?',
    a: 'It is not a discount applied by the installer. Under the scheme, the consumer pays the balance amount to an empanelled vendor after successful installation and DISCOM verification, and the assistance is released after the DISCOM inspection and document verification, credited directly to the applicant\'s bank account. Eligibility and release are determined by the government and your DISCOM under the applicable scheme rules. Contacting any installer, including us, does not secure or guarantee assistance.',
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
    a: 'No, and we are not claiming to be. This matters to you: under the scheme\'s operational guidelines the consumer pays the balance amount to an empanelled vendor after installation and DISCOM verification. If the Central Financial Assistance route is important to your decision, confirm the current vendor requirements on the official portal and with your DISCOM before committing to any installer, including us. Rooftop solar still reduces your bill and still qualifies for net metering outside the assistance route, but that is a different calculation and you should make it with accurate information.',
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
        title="PM Surya Ghar Rooftop Solar Scheme"
        description="What the scheme is, who it is intended for, and how the application and subsidy process actually works, explained without overstating what anyone can promise you."
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
                summary in our own words, provided to help you understand the process. It is not a
                government publication and does not replace official guidance.
              </div>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                What the scheme is
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                PM Surya Ghar Muft Bijli Yojana is a central government scheme intended to increase
                rooftop solar adoption among residential electricity consumers in India. It provides
                central financial assistance towards the cost of a grid-connected rooftop system, and
                routes the whole process, from application and feasibility approval to installation reporting,
                inspection and subsidy release, through a single national portal, with your
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
                Under the scheme's Central Financial Assistance component for residential
                consumers, assistance is calculated as a share of the system cost at government
                benchmark prices: {SUBSIDY_STRUCTURE}
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                At the benchmark prices published for the scheme, that structure works out as
                follows.
              </p>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[380px] border-collapse text-sm">
                  <caption className="sr-only">
                    PM Surya Ghar central financial assistance by system capacity at government
                    benchmark prices
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        System capacity
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                        Central financial assistance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {SUBSIDY_SLABS.map((slab) => (
                      <tr key={slab.capacity} className="border-b border-slate-100">
                        <th scope="row" className="px-4 py-3.5 text-left font-semibold text-kapizo-navy">
                          {slab.capacity}
                        </th>
                        <td className="px-4 py-3.5 font-semibold text-kapizo-green">
                          {slab.amount}
                          {'isMaximum' in slab && slab.isMaximum ? ' (maximum)' : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="disclaimer mt-5">
                <strong>Important qualifications on these figures.</strong>
                <p className="mt-2">{SUBSIDY_HEADLINE}</p>
                <ul className="mt-2 space-y-1.5">
                  {SUBSIDY_LIMITATIONS.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              </div>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                Project price, assistance and what you actually pay
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                {COST_VS_SUBSIDY_NOTE}
              </p>

              <h2 className="mt-10 font-display text-2xl font-extrabold text-kapizo-navy">
                About empanelled vendors, please read
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Under the scheme's operational guidelines, the consumer pays the balance amount,
                the system cost less the assistance, to the bank account of an{' '}
                <strong>empanelled vendor</strong>, after successful installation and verification by
                the DISCOM.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                <strong>Kapizo Solar is not currently claiming empanelment under this scheme.</strong>{' '}
                We are telling you this plainly because it affects you: if the central financial
                assistance route matters to your decision, confirm the vendor requirements on the
                official portal and with your DISCOM before you commit to any installer, including
                us. We would rather lose an enquiry than have you discover this after signing.
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Rooftop solar remains worth installing outside the assistance route. It still
                reduces your bill and still qualifies for net metering under the normal DISCOM
                process. But that is a different calculation, and you should make it with accurate
                information.
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
                We handle the technical side: assessing your roof, designing a system that meets the
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
              <ul className="mt-4 space-y-3 text-base">
                <li>
                  <a
                    href={OFFICIAL_LINKS.cfaNotification}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-kapizo-green underline underline-offset-2 hover:text-kapizo-green-dark"
                  >
                    PM Surya Ghar scheme notification (PDF)
                  </a>
                  <span className="block text-sm text-slate-500">
                    The official notification setting out the residential Central Financial
                    Assistance structure quoted on this page.
                  </span>
                </li>
                <li>
                  <a
                    href={OFFICIAL_LINKS.portal}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-kapizo-green underline underline-offset-2 hover:text-kapizo-green-dark"
                  >
                    pmsuryaghar.gov.in
                  </a>
                  <span className="block text-sm text-slate-500">
                    The official national portal for registration, application status and current
                    scheme terms.
                  </span>
                </li>
                <li>
                  <a
                    href="https://mnre.gov.in/en/notice/operational-guidelines-for-implementation-of-the-component-central-financial-assistance-to-residential-consumers-of-pm-surya-ghar-muft-bijli-yojana/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-kapizo-green underline underline-offset-2 hover:text-kapizo-green-dark"
                  >
                    MNRE Operational Guidelines: Central Financial Assistance to Residential
                    Consumers
                  </a>
                  <span className="block text-sm text-slate-500">
                    The operational guidelines governing the residential CFA component.
                  </span>
                </li>
                <li>
                  <a
                    href="https://mnre.gov.in/en/notice/guidelines-for-pm-surya-ghar-muft-bijli-yojana/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-kapizo-green underline underline-offset-2 hover:text-kapizo-green-dark"
                  >
                    MNRE Guidelines for PM-Surya Ghar: Muft Bijli Yojana
                  </a>
                  <span className="block text-sm text-slate-500">
                    Ministry of New and Renewable Energy scheme guidelines.
                  </span>
                </li>
                <li>
                  <a
                    href="https://mnre.gov.in/en/grid-connected-solar-rooftop-programme/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-kapizo-green underline underline-offset-2 hover:text-kapizo-green-dark"
                  >
                    MNRE Grid Connected Rooftop Solar Programme
                  </a>
                  <span className="block text-sm text-slate-500">
                    Programme background and related notices.
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Where this page states figures, they reflect the scheme structure published by the
                Ministry of New and Renewable Energy and Government of India press releases. We
                summarise in our own words rather than reproducing government text. If anything on
                this page conflicts with the official sources above, the official sources govern.
              </p>

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
