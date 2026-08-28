import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import WhyKapizo from '@/components/WhyKapizo'
import ProjectsComingSoon from '@/components/ProjectsComingSoon'
import CTASection from '@/components/CTASection'
import { business, phones, telHref } from '@/data/business'
import { usePageMeta } from '@/hooks/usePageMeta'
import { SITE_URL } from '@/data/business'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo'
import { ArrowRightIcon, PhoneIcon } from '@/components/ui/Icons'

/**
 * The delivery sequence, kept short on purpose. Each line is a step a customer
 * can expect to see happen, not a description of a value.
 */
const projectSteps = [
  { title: 'Understand actual usage', detail: 'We read your recent electricity bills. Units consumed size the system; a terrace does not.' },
  { title: 'Assess the site', detail: 'Shadow-free area through the day, orientation, structural condition and the cable route.' },
  { title: 'Determine the system size', detail: 'Capacity worked out from consumption and what the roof can genuinely carry.' },
  { title: 'Select components', detail: 'Modules, inverter and balance of system chosen for the conditions on that roof.' },
  { title: 'Design the electrical system', detail: 'Layout, earthing, and DC and AC protection designed in rather than added on.' },
  { title: 'Install to standard', detail: 'Mounting, cabling and terminations carried out to proper electrical practice.' },
  { title: 'Test, commission, hand over', detail: 'The system is verified end to end and explained to you before we leave.' },
  { title: 'Support afterwards', detail: 'Net metering follow-through, servicing, and a number that still answers later.' },
]

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  usePageMeta(
    {
      title: 'About Kapizo Solar | Solar EPC Company in Mancherial, Telangana',
      description:
        'Kapizo Solar is a solar EPC company based in Mancherial, Telangana, run by Yugandhar Jadi and Thoutam Ramakrishna, built around engineering-led system design and quality execution.',
      path: '/about',
    },
    [
      webPageSchema(
        'About Kapizo Solar',
        'A solar EPC company built around technical understanding, quality execution and customer-first service.',
        '/about',
      ),
      breadcrumbSchema(crumbs),
      ...business.contacts.map((c) => ({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: c.name,
        // No jobTitle: designations are not finalised.
        worksFor: { '@id': `${SITE_URL}/#organization` },
      })),
    ],
  )

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Solar done to an engineering standard"
        description="We looked closely at how rooftop solar is designed and installed in Telangana, found the standard uneven, and built Kapizo Solar around closing that gap."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="mx-auto max-w-3xl">
            <div className="prose-kapizo">
              <h2>Why Kapizo exists</h2>
              <p>
                We both come from a technical background. Yugandhar Jadi and Thoutam Ramakrishna
                each hold an M.Sc. in Electronics, and Thoutam also completed an embedded systems
                course in Pune. That background matters here for one reason: it shaped how closely
                we looked at solar before deciding to work in it.
              </p>
              <p>
                What we found, studying the technology and watching the market in Telangana, was a
                gap. Adoption is rising quickly. The standard of the work often is not. System
                sizing gets done from a price list rather than from a bill. Component selection
                follows margin rather than site conditions. Protection on the DC side is trimmed to
                win a quote. Installation quality varies widely, and the customer usually cannot
                tell until the system underperforms.
              </p>
              <p>
                Kapizo Solar exists to close that gap. We are a solar EPC company based in
                Mancherial, working across Telangana. EPC means engineering, procurement and
                construction: we design the system, source the components and carry out the
                installation ourselves, so there is one point of accountability rather than a panel
                supplier, a local electrician and someone who handles the DISCOM paperwork.
              </p>

              <h2>Quality first, in practice</h2>
              <p>
                Quality-first is easy to claim, so here is what we mean by it. Sizing comes from
                measured consumption. Design is worked out for the specific roof, not adapted from a
                template. Components are chosen for the conditions they will actually operate in.
                DC and AC protection is part of the design rather than an optional line. Installation
                follows proper electrical standards, and the system is tested and commissioned
                before it is handed over. After that, we stay reachable.
              </p>
              <p>
                We are also genuinely interested in where this technology goes. Renewable generation
                at the building level changes how a household or a business relates to its energy
                supply, and we would rather be part of doing that well than part of the volume. Our
                motivation is not to move as many systems as possible. It is to install ones that
                perform for their full life and to be the company a customer can still call in year
                six.
              </p>

              <h2>How we work on a project</h2>
              <p>
                We do not start with a package and fit the customer into it. We start with the
                customer's actual requirement and design the system around it.
              </p>
            </div>

            <ol className="mt-6 grid gap-3 sm:grid-cols-2">
              {projectSteps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-kapizo-green/10 text-xs font-bold text-kapizo-green"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-kapizo-navy">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="prose-kapizo mt-10">
              <p>
                We also say the inconvenient parts up front: an on-grid system will not run during a
                power cut, your bill will not fall to zero, and the DISCOM sets its own approval
                timelines. You should hear that before you pay, not after.
              </p>

              <h2>The team</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {business.contacts.map((c) => (
                /* No designation line: the "The team" heading above already
                   frames these cards, and no job titles are claimed. */
                <div key={c.name} className="card p-6">
                  <h3 className="font-display text-lg font-extrabold text-kapizo-navy">{c.name}</h3>
                  <a
                    href={telHref(c.phone)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-kapizo-green hover:underline"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="prose-kapizo mt-10">
              <h2>Where we work</h2>
              <p>
                Our office is in Mancherial and we take on work across Telangana. Being local matters
                for the unglamorous parts of this business: turning up for the site visit, picking up
                the phone when you have a question six months later, and coming back when something
                needs servicing.
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-display text-lg font-bold text-kapizo-navy">Kapizo Solar</h3>
              <address className="mt-3 text-sm not-italic leading-relaxed text-slate-600">
                {business.address.line1}
                <br />
                {business.address.line2}
                <br />
                {business.address.city}, {business.address.state} – {business.address.postalCode}
              </address>
              <p className="mt-3 text-sm text-slate-600">
                <span className="font-semibold text-kapizo-navy">Service area: </span>
                {business.serviceArea}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Contact Kapizo Solar
                  <ArrowRightIcon />
                </Link>
                <a href={telHref(phones.primary)} className="btn-outline">
                  <PhoneIcon className="h-4 w-4" />
                  {phones.primary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyKapizo />
      <ProjectsComingSoon />
      <CTASection />
    </>
  )
}
