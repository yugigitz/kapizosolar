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

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ]

  usePageMeta(
    {
      title: 'About Kapizo Solar | Solar EPC Company in Mancherial, Telangana',
      description:
        'Kapizo Solar is a solar EPC company based in Mancherial, Telangana, founded by Yugandhar Jadi and Thoutam Ramakrishna, focused on technical understanding and quality execution.',
      path: '/about',
    },
    [
      webPageSchema(
        'About Kapizo Solar',
        'A solar EPC company built around technical understanding, quality execution and customer-first service.',
        '/about',
      ),
      breadcrumbSchema(crumbs),
      ...business.founders.map((f) => ({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: f.name,
        jobTitle: f.role,
        worksFor: { '@id': `${SITE_URL}/#organization` },
      })),
    ],
  )

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A solar EPC company built around getting the engineering right"
        description="Kapizo Solar is a new company. We would rather be judged on how carefully we design and install than on claims about how long we have been around."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="mx-auto max-w-3xl">
            <div className="prose-kapizo">
              <h2>Who we are</h2>
              <p>
                Kapizo Solar is a solar EPC company based in Mancherial, Telangana. We design,
                supply, install and commission rooftop solar systems for homes, businesses,
                industrial premises and agricultural customers across the state.
              </p>
              <p>
                EPC stands for engineering, procurement and construction. In practice it means we are
                responsible for the system end to end — assessing the site, engineering the design,
                selecting and procuring components, installing to proper electrical standards, and
                supporting you afterwards. You deal with one accountable party rather than
                coordinating between a supplier, an electrician and a paperwork agent.
              </p>

              <h2>Where we are in our journey</h2>
              <p>
                We are being straightforward about this: Kapizo Solar is a new company and is
                currently onboarding its first customer projects. You will not find a gallery of past
                installations on this website, because we have not completed customer projects yet
                and we are not going to present stock photographs as our own work.
              </p>
              <p>
                What that means for an early customer is direct attention from the founders, a fully
                documented installation, and a company with every reason to get your project right.
                What it does not mean is that we will overstate our track record to win the work.
              </p>

              <h2>How we approach a project</h2>
              <p>
                Sizing starts from your actual electricity consumption and a physical assessment of
                your roof, not from a package list. Protection on both the DC and AC sides is treated
                as part of the core design rather than as an optional extra — it is the part most
                commonly trimmed to reduce a quote, and the part you are least able to inspect
                afterwards.
              </p>
              <p>
                We explain what is being installed and why, including the parts that are less
                convenient to hear: that an on-grid system will not run during a power cut, that a
                bill rarely becomes exactly zero, and that approval timelines are decided by your
                distribution company rather than by us.
              </p>

              <h2>The team</h2>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {business.founders.map((f) => (
                <div key={f.name} className="card p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-kapizo-orange-deep">
                    {f.role}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-extrabold text-kapizo-navy">
                    {f.name}
                  </h3>
                  <a
                    href={telHref(f.phone)}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-kapizo-green hover:underline"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    {f.phone}
                  </a>
                </div>
              ))}
            </div>

            <div className="prose-kapizo mt-10">
              <p>
                The team has undertaken structured preparation in solar PV system design and
                installation practice. We mention this as context for how we work, not as a
                substitute for a track record we have yet to build.
              </p>

              <h2>Where we work</h2>
              <p>
                Our office is in Mancherial and we serve customers across Telangana. Being local to
                the region matters for the parts of this business that are not glamorous — getting to
                site for the assessment, being reachable when there is a question, and returning for
                service after commissioning.
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
