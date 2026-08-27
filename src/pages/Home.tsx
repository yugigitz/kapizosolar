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
            <h2 className="h-section mt-3">Start with your electricity bill</h2>
            <p className="lede mt-4">
              Your bill tells us more about the right system size than your terrace does. Enter
              roughly what you pay each month and we will estimate the capacity, generation and
              savings that go with it.
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
              The three plans differ in the panels, the inverter, the protection and whether you get
              battery backup — not just in price. We do not publish a price per kW, because the real
              cost depends on your roof, and a number that fits one terrace misleads on another.
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
