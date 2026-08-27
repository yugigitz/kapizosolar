import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SolarCalculator from '@/components/SolarCalculator'
import CTASection from '@/components/CTASection'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { AREA_SQFT_PER_KW, SPECIFIC_YIELD_PER_KW_PER_DAY } from '@/lib/solarCalc'
import { ArrowRightIcon } from '@/components/ui/Icons'

const methodologyFaqs = [
  {
    q: 'What does this solar calculator estimate?',
    a: 'It estimates the rooftop solar capacity that would broadly match your annual electricity consumption, along with the expected generation, the share of your usage that solar could offset, indicative annual savings, a rough payback period, the rooftop area required and the approximate CO₂ avoided. It is a planning tool, not a quotation.',
  },
  {
    q: 'How does the calculation work?',
    a: `The calculator converts your monthly bill into units using either the tariff you enter or a default rate for your consumer category. It then divides your daily consumption by an assumed generation of about ${SPECIFIC_YIELD_PER_KW_PER_DAY} units per kW per day — an annual average for Telangana conditions — to arrive at a capacity, which is rounded to a practical size. If you enter a rooftop area, the capacity is capped at what that area can physically hold at roughly ${AREA_SQFT_PER_KW} sq ft per kW.`,
  },
  {
    q: 'What affects how much electricity a solar system generates?',
    a: 'Location and seasonal irradiance, roof orientation and tilt, shading from parapets, trees, water tanks or neighbouring buildings, module efficiency and temperature behaviour, inverter sizing and efficiency, cable losses, and how clean the modules are kept. Two identical systems on different roofs in the same town can differ noticeably in output.',
  },
  {
    q: 'What affects how much money you actually save?',
    a: 'Savings depend on your tariff and slab structure, how much of your consumption happens during daylight hours, whether net metering is available for your connection and how surplus export is settled, and any fixed charges that continue regardless of consumption. A higher tariff makes each generated unit more valuable, which is why commercial customers often see stronger savings.',
  },
  {
    q: 'Why can actual generation vary from the estimate?',
    a: 'The estimate uses an annual average. Real output varies month to month — monsoon months generate less than clear pre-summer months. Output also degrades slowly over the life of the modules, and soiling reduces it between cleanings. Any shading that appears after installation, such as a new structure next door, will reduce generation.',
  },
  {
    q: 'Why is a site assessment required before a firm quote?',
    a: 'The calculator cannot see your roof. A site assessment establishes the actual shadow-free area, the shading pattern through the day, the structural condition and suitable mounting approach, the cable route to your distribution board, and the state of your existing electrical infrastructure. These determine both the achievable capacity and the true cost.',
  },
]

export default function SolarCalculatorPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solar Calculator', path: '/solar-calculator' },
  ]

  usePageMeta(
    {
      title: 'Solar Calculator — Estimate System Size & Savings | Kapizo Solar',
      description:
        'Estimate your rooftop solar system size, generation, annual savings and payback period for Telangana. Free indicative solar calculator from Kapizo Solar.',
      path: '/solar-calculator',
    },
    [
      webPageSchema(
        'Solar Calculator — Kapizo Solar',
        'Estimate rooftop solar capacity, generation and savings.',
        '/solar-calculator',
      ),
      breadcrumbSchema(crumbs),
      faqSchema(methodologyFaqs),
    ],
  )

  return (
    <>
      <PageHeader
        eyebrow="Solar Calculator"
        title="How much solar do you actually need?"
        description="Tell us roughly what you pay for electricity each month. We will use that to estimate the system size that may suit you, what it should generate, and what you could save. It takes about thirty seconds."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white" aria-labelledby="calc-heading">
        <div className="container-kapizo">
          <h2 id="calc-heading" className="sr-only">
            Rooftop solar savings calculator
          </h2>
          <SolarCalculator />
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-kapizo">
          <div className="max-w-3xl">
            <span className="eyebrow">Methodology</span>
            <h2 className="h-section mt-3">How this calculator works</h2>
            <p className="lede mt-4">
              We would rather you understand the assumptions than treat the number as a promise.
              Here is exactly what it does, and the things it cannot know about your roof.
            </p>

            <div className="mt-10 space-y-8">
              {methodologyFaqs.map((item) => (
                <div key={item.q}>
                  <h3 className="font-display text-lg font-bold text-kapizo-navy">{item.q}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="font-display text-lg font-bold text-kapizo-navy">
                Assumptions used in this tool
              </h3>
              <dl className="mt-4 divide-y divide-slate-100 text-sm">
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-slate-500">Generation assumption</dt>
                  <dd className="text-right font-semibold text-kapizo-navy">
                    ~{SPECIFIC_YIELD_PER_KW_PER_DAY} units per kW per day (annual average)
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-slate-500">Area assumption</dt>
                  <dd className="text-right font-semibold text-kapizo-navy">
                    ~{AREA_SQFT_PER_KW} sq ft of shadow-free area per kW
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-slate-500">Tariff</dt>
                  <dd className="text-right font-semibold text-kapizo-navy">
                    Your entered tariff, or a category default
                  </dd>
                </div>
                <div className="flex justify-between gap-4 py-2.5">
                  <dt className="text-slate-500">Payback</dt>
                  <dd className="text-right font-semibold text-kapizo-navy">
                    Indicative installed cost ÷ estimated annual savings
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Payback is shown before any government subsidy. Where a subsidy applies, the actual
                payback period would be shorter.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/plans" className="btn-outline">
                See which plan suits this system
                <ArrowRightIcon />
              </Link>
              <Link to="/pm-surya-ghar" className="btn-outline">
                Understand subsidy eligibility
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Turn your estimate into a real proposal"
        description="Send us your bill and we will confirm the capacity against your actual roof, then give you a written quote."
        primaryLabel="Request a Site Visit"
        primaryTo="/contact"
        context="calculator_page_footer"
      />
    </>
  )
}
