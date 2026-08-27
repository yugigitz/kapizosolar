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
        title="Two people who got tired of seeing solar done badly"
        description="Kapizo Solar is new. We would rather you judge us on how carefully we size and install your system than on claims about how long we have been around."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="mx-auto max-w-3xl">
            <div className="prose-kapizo">
              <h2>Why Kapizo exists</h2>
              <p>
                Plenty of rooftop solar in Telangana is sold as a package rather than designed for
                the building it sits on. A customer is quoted 3 kW because 3 kW is what the seller
                stocks, not because anyone looked at their bill. Protection on the DC side gets
                trimmed to win the price. Then the system underperforms and the customer concludes
                solar does not work.
              </p>
              <p>
                We started Kapizo to do the ordinary things properly: read the bill, look at the
                roof, size the system to the usage, and put in the protection that should be there
                anyway.
              </p>
              <p>
                We are a solar EPC company based in Mancherial, working across Telangana. EPC means
                engineering, procurement and construction — we handle the whole thing, so you are not
                coordinating between a panel supplier, a local electrician and someone who does the
                DISCOM paperwork. One company, one point of accountability.
              </p>

              <h2>We are new, and we are not hiding it</h2>
              <p>
                Kapizo is taking on its first customer projects now. There is no photo gallery on
                this site because we have not completed installations yet, and we are not going to
                put stock photographs up and let you assume they are ours.
              </p>
              <p>
                If you are weighing that up: an early customer gets the founders on site rather than
                a subcontracted crew, and a company with every reason to get the job right. That is
                the honest trade. We would rather tell you this now than have you find out later.
              </p>

              <h2>How we work on a project</h2>
              <p>
                We start with your last few electricity bills, because your units tell us the right
                system size far better than your terrace does. Then we come and look at the roof —
                how much of it is genuinely shadow-free through the day, which way it faces, whether
                the structure can take the load, and where the cable will run.
              </p>
              <p>
                DC and AC protection is part of the design, not an add-on. It is the easiest thing to
                quietly leave out of a quote, and the thing you are least able to check once the
                system is on your roof.
              </p>
              <p>
                We also tell you the inconvenient parts up front: an on-grid system will not run
                during a power cut, your bill will not become zero, and the DISCOM decides its own
                approval timelines, not us. You should hear that before you pay, not after.
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
                Both of us have gone through structured training in solar PV design and installation
                practice before starting this. We mention it as context for how we approach the work,
                not as a substitute for a track record we still have to build.
              </p>

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
