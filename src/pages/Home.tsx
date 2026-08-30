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
import { ArrowRightIcon, CalculatorIcon } from '@/components/ui/Icons'

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
        'Kapizo Solar | Rooftop Solar EPC in Mancherial & Telangana',
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
            <span className="eyebrow">Solar Calculators</span>
            <h2 className="h-section mt-3">Start with your electricity bill</h2>
            <p className="lede mt-4">
              Your bill tells us more about the right system size than your terrace does. Enter
              roughly what you pay each month and we will estimate the capacity, generation and
              savings that go with it.
            </p>
          </div>

          {/* Both calculators are reachable from here, so nobody has to open one
              and go looking for the other. */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                to: '/solar-calculator',
                title: 'Solar Savings Calculator',
                detail: 'Calculate your potential solar savings.',
              },
              {
                to: '/solar-loan-emi',
                title: 'Solar Loan EMI Calculator',
                detail: 'Estimate your monthly solar loan EMI.',
              },
            ].map((c) => (
              /*
                Hover fills the whole card with the accessible brand orange
                (5.05:1 under white text; the lighter brand orange is 2.6:1 and
                could not carry white type). The hover variant is gated behind
                @media (hover:hover) so it does not stick after a tap on a
                phone, where `active:` gives the press feedback instead.
                Dimensions, spacing and the link target are untouched.
              */
              <Link
                key={c.to}
                to={c.to}
                className="card card-hover group flex items-center gap-4 p-5 transition-colors
                           [@media(hover:hover)]:hover:border-kapizo-orange-deep
                           [@media(hover:hover)]:hover:bg-kapizo-orange-deep
                           active:border-kapizo-orange-deep active:bg-kapizo-orange-deep
                           focus-visible:border-kapizo-orange-deep focus-visible:bg-kapizo-orange-deep
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kapizo-orange-deep/40"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-kapizo-orange/10 text-kapizo-orange-deep transition-colors
                             [@media(hover:hover)]:group-hover:bg-white/20 [@media(hover:hover)]:group-hover:text-white
                             group-active:bg-white/20 group-active:text-white
                             group-focus-visible:bg-white/20 group-focus-visible:text-white"
                >
                  <CalculatorIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span
                    className="block font-display text-base font-extrabold text-kapizo-navy transition-colors
                               [@media(hover:hover)]:group-hover:text-white group-active:text-white
                               group-focus-visible:text-white"
                  >
                    {c.title}
                  </span>
                  <span
                    className="mt-0.5 block text-sm text-slate-600 transition-colors
                               [@media(hover:hover)]:group-hover:text-white group-active:text-white
                               group-focus-visible:text-white"
                  >
                    {c.detail}
                  </span>
                </span>
                <ArrowRightIcon
                  className="ml-auto h-4 w-4 shrink-0 text-slate-400 transition-colors
                             [@media(hover:hover)]:group-hover:text-white group-active:text-white
                             group-focus-visible:text-white"
                />
              </Link>
            ))}
          </div>

          <div className="mt-6">
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
              battery backup, not just in price. We do not publish a price per kW, because the real
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
      <FAQ limit={6} showViewAll />
      <CTASection />
    </>
  )
}
