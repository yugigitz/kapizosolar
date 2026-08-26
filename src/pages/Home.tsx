import { Link } from 'react-router-dom'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import Solutions from '@/components/Solutions'
import SolarCalculator from '@/components/SolarCalculator'
import SolarSizeGuide from '@/components/SolarSizeGuide'
import SystemTypes from '@/components/SystemTypes'
import HowSolarWorks from '@/components/HowSolarWorks'
import SolarProcess from '@/components/SolarProcess'
import WhyKapizo from '@/components/WhyKapizo'
import ComponentQuality from '@/components/ComponentQuality'
import ProjectsComingSoon from '@/components/ProjectsComingSoon'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'
import PlanCard from '@/components/plans/PlanCard'
import { plans } from '@/data/plans'
import { usePageMeta } from '@/hooks/usePageMeta'
import {
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from '@/lib/seo'
import { ArrowRightIcon } from '@/components/ui/Icons'

export default function Home() {
  usePageMeta(
    {
      title: 'Kapizo Solar | Rooftop Solar EPC in Mancherial & Telangana',
      description:
        'Kapizo Solar designs and installs rooftop solar for homes, businesses, industry and agriculture across Telangana. Calculate your savings, compare plans and get a quote.',
      path: '/',
    },
    [
      organizationSchema,
      websiteSchema,
      webPageSchema(
        'Kapizo Solar — Rooftop Solar EPC in Mancherial & Telangana',
        'Rooftop solar design, installation and commissioning across Telangana.',
        '/',
      ),
      // No FAQPage schema here: the homepage shows only an excerpt of the FAQs,
      // and /faq is the canonical location for that content. Declaring it in
      // both places would duplicate the entity and overstate what this page shows.
    ],
  )

  return (
    <>
      <Hero />
      <TrustStrip />

      <section className="section bg-white" id="calculator">
        <div className="container-kapizo">
          <div className="max-w-2xl">
            <span className="eyebrow">Solar Calculator</span>
            <h2 className="h-section mt-3">Find your system size and savings</h2>
            <p className="lede mt-4">
              Enter your monthly electricity bill to get an indicative system size, expected
              generation, annual savings and payback period. It takes about thirty seconds.
            </p>
          </div>
          <div className="mt-10">
            <SolarCalculator />
          </div>
        </div>
      </section>

      <Solutions />
      <SolarSizeGuide />
      <SystemTypes />
      <HowSolarWorks />

      <section className="section bg-white" id="plans">
        <div className="container-kapizo">
          <div className="max-w-2xl">
            <span className="eyebrow">Kapizo Plans</span>
            <h2 className="h-section mt-3">Three ways to go solar with us</h2>
            <p className="lede mt-4">
              Budget, Standard and Premium differ in component specification, protection, monitoring
              and whether battery backup is included — not just in price. Pricing is confirmed after
              a site assessment, so we quote rather than publish a number that may not fit your roof.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <Link to="/plans" className="btn-outline mt-8">
            Compare all three plans in detail
            <ArrowRightIcon />
          </Link>
        </div>
      </section>

      <SolarProcess />
      <WhyKapizo />
      <ComponentQuality />
      <ProjectsComingSoon />
      <FAQ limit={6} showViewAll />
      <CTASection />
    </>
  )
}
