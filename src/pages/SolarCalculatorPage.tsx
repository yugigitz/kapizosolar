import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SolarCalculator from '@/components/SolarCalculator'
import CTASection from '@/components/CTASection'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { AREA_SQFT_PER_KW, DEFAULT_TARIFFS, SPECIFIC_YIELD_PER_KW_PER_DAY } from '@/lib/solarCalc'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons'

const methodologyFaqs = [
  {
    q: 'What does this solar calculator estimate?',
    a: 'It estimates the rooftop solar capacity that would broadly match your annual electricity consumption, along with the expected generation, the share of your usage that solar could offset, indicative annual savings, the rooftop area required and the approximate CO₂ avoided. It is a planning tool, not a quotation.',
  },
  {
    q: 'How does the calculation work?',
    a: `The calculator converts your monthly bill into units using either the tariff you enter or a default rate for your consumer category. It then divides your daily consumption by an assumed generation of about ${SPECIFIC_YIELD_PER_KW_PER_DAY} units per kW per day, an annual average for Telangana conditions, to arrive at a capacity, which is rounded to a practical size. If you enter a rooftop area, the capacity is capped at what that area can physically hold at roughly ${AREA_SQFT_PER_KW} sq ft per kW.`,
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
    a: 'The estimate uses an annual average. Real output varies month to month. Monsoon months generate less than clear pre-summer months. Output also degrades slowly over the life of the modules, and soiling reduces it between cleanings. Any shading that appears after installation, such as a new structure next door, will reduce generation.',
  },
  {
    q: 'Why is a site assessment required before a firm quote?',
    a: 'The calculator cannot see your roof. A site assessment establishes the actual shadow-free area, the shading pattern through the day, the structural condition and suitable mounting approach, the cable route to your distribution board, and the state of your existing electrical infrastructure. These determine both the achievable capacity and the true cost.',
  },
]

/**
 * Explainer content for the savings calculator. Figures are derived from the
 * same constants the calculator uses, so the page cannot drift away from the
 * tool it sits on. No system price appears anywhere, because none is verified.
 */
const savingsSections = [
  {
    heading: 'What is a solar savings calculator?',
    paragraphs: [
      'It is a sizing and savings estimator. You give it what you pay for electricity; it works backwards to the system capacity that would broadly match your consumption, then estimates what that capacity should generate and what those units are worth at your tariff.',
      'It is not a quotation. A quotation needs the roof: its shadow-free area, its orientation, its structure and the route the cable takes to your distribution board. The calculator cannot see any of that, which is why it produces a planning range rather than a price.',
    ],
  },
  {
    heading: 'How solar savings are estimated',
    paragraphs: [
      `The arithmetic is simple enough to check by hand. Monthly bill divided by tariff gives monthly units. Divide by 30 for daily units, then divide by the generation a kilowatt delivers in a day — around ${SPECIFIC_YIELD_PER_KW_PER_DAY} units per kW per day averaged across a year in Telangana conditions — and you have the capacity that would match your usage.`,
      'Savings are then the units the system actually offsets, valued at your tariff. Offset, not generated: a unit exported at a rate lower than you pay, or generated when nothing in the house is running, is not worth the same as a unit that replaces a purchase.',
    ],
    bullets: [
      'Monthly units = monthly bill ÷ tariff per unit',
      `Capacity (kW) = daily units ÷ ${SPECIFIC_YIELD_PER_KW_PER_DAY}`,
      'Annual savings = units offset in a year × tariff per unit',
    ],
  },
  {
    heading: 'How consumption drives system sizing',
    paragraphs: [
      'Consumption sets the target; roof area sets the ceiling. Sizing from roof area is the most common mistake we see, and it produces systems that are too large for the household that owns them.',
      'A system meaningfully larger than your consumption exports surplus you may not be fully compensated for. A system meaningfully smaller leaves you buying the balance at retail tariff. Neither is a disaster, but the money works best when capacity and consumption are close.',
    ],
  },
  {
    heading: 'Solar generation: what a kilowatt actually produces',
    paragraphs: [
      `Generation is the physical output of the array. In Telangana a well-installed, unshaded system commonly averages about ${SPECIFIC_YIELD_PER_KW_PER_DAY} units per kW per day across a full year, with a clear peak through the pre-summer months and a dip through the monsoon.`,
      'Plan against the annual average, not the best day. A design sized on peak output disappoints for most of the year. Output also declines slowly over the life of the modules, and soiling reduces it between cleanings.',
    ],
  },
  {
    heading: 'Electricity tariff: why the same system saves different amounts',
    paragraphs: [
      'Two identical systems on identical roofs save different amounts if the owners pay different tariffs. A unit avoided is worth exactly what you would have paid for it, so a higher tariff makes every generated unit more valuable.',
      `This is why commercial and industrial customers often see stronger savings than residential ones from the same capacity: the tariff they avoid is higher. The calculator uses your entered tariff, or a category default (currently ₹${DEFAULT_TARIFFS.residential} for residential and ₹${DEFAULT_TARIFFS.commercial} for commercial) when you leave it blank.`,
    ],
  },
  {
    heading: 'Roof area and shading',
    paragraphs: [
      `Capacity needs roughly ${AREA_SQFT_PER_KW} sq ft of shadow-free area per kW. That is the physical constraint, and it is why the calculator caps its recommendation when you enter a terrace size.`,
      'Shading is not proportional to the area shaded. A parapet, a water tank, an overhead cable or a neighbouring wall can cut output disproportionately depending on how the modules are wired into strings. A genuine site assessment looks at the shadow pattern through the day and across seasons, which is something no calculator can do from a bill.',
    ],
  },
  {
    heading: 'Self-consumption and net metering',
    paragraphs: [
      'Self-consumption is the share of generation used in the building as it is produced. Those units are worth full retail tariff, because they replace a purchase directly.',
      'Surplus goes to the grid. Where net metering is available, exported units are credited against imports on terms set by the regulator and your DISCOM, and the settlement rate is not always the same as the retail tariff. Shifting daytime loads — pumping, washing, heavier appliances — raises self-consumption and is usually the cheapest way to improve returns on a system already installed.',
    ],
  },
  {
    heading: 'Cost against savings, and payback',
    paragraphs: [
      'Payback is the installed cost divided by the annual saving. The saving side is what this calculator estimates. The cost side depends on capacity, roof type, structure height, cable runs and component selection, all established at site assessment.',
      'We deliberately do not publish a price per kW, and the calculator therefore does not display a payback figure. A single published rate would be wrong for most roofs, and a payback period built on a wrong rate is worse than no payback period at all. Once you have a written quotation, divide it by the annual saving shown here and you have your own figure.',
    ],
  },
  {
    heading: 'Telangana and Mancherial context',
    paragraphs: [
      'Telangana receives strong irradiance for most of the year, which is the main reason rooftop solar performs well across the state. Approvals, net metering and the connection process run through your DISCOM, and the timelines are theirs rather than ours.',
      'We are based in Mancherial and work across Mancherial and other locations in Telangana. Being local matters for the unglamorous parts: turning up for the site visit, following the metering paperwork through, and coming back when something needs attention. The physics of generation is the same across the state; what changes locally is shading, roof construction and the DISCOM office you deal with.',
    ],
  },
]

const savingsFaqs = [
  {
    q: 'How much can I save with rooftop solar in India?',
    a: 'It depends on your tariff and how much of the generation you use yourself, so there is no single national figure. The method is the same everywhere: estimate the units the system will generate in a year, work out how many of them replace units you would otherwise buy, and multiply by your tariff. A higher tariff and higher daytime usage both increase the saving from the same capacity.',
  },
  {
    q: 'How much can I save with rooftop solar in Telangana?',
    a: `Use the state's generation profile as the starting point: about ${SPECIFIC_YIELD_PER_KW_PER_DAY} units per kW per day averaged across the year for a well-installed, unshaded system. Multiply that by your capacity and your tariff to get an indicative annual figure, then adjust for how much you actually consume during daylight. The calculator on this page does exactly that from your bill.`,
  },
  {
    q: 'How much can 1 kW, 3 kW or 5 kW of solar generate?',
    a: `At roughly ${SPECIFIC_YIELD_PER_KW_PER_DAY} units per kW per day, 1 kW produces in the region of ${Math.round(SPECIFIC_YIELD_PER_KW_PER_DAY * 365)} units a year, 3 kW around ${Math.round(SPECIFIC_YIELD_PER_KW_PER_DAY * 365 * 3).toLocaleString('en-IN')} units and 5 kW around ${Math.round(SPECIFIC_YIELD_PER_KW_PER_DAY * 365 * 5).toLocaleString('en-IN')} units. What those units are worth to you is generation multiplied by your tariff, reduced by any surplus you export at a lower settlement rate.`,
  },
  {
    q: 'How much solar capacity does a home need?',
    a: 'Enough to match annual consumption, subject to what the roof can carry. Divide your daily units by the daily generation per kW and round to a practical size. Most Telangana homes land between 2 kW and 5 kW; a home with several air conditioners in regular use lands higher.',
  },
  {
    q: 'Does roof size affect how much solar I can install?',
    a: `Yes, as a ceiling rather than a target. At roughly ${AREA_SQFT_PER_KW} sq ft of shadow-free area per kW, a 400 sq ft usable terrace supports somewhere near 4 kW. If your consumption justifies more than the roof can hold, an elevated structure is sometimes worth costing out.`,
  },
  {
    q: 'What is the difference between solar generation and solar savings?',
    a: 'Generation is the electricity the system produces. Savings are the money you keep, which depends on how many of those units replace purchases at your tariff and how the rest are settled. A system can generate well and still save less than expected if most output is exported at a low settlement rate.',
  },
  {
    q: 'How does net metering affect rooftop solar savings?',
    a: 'Net metering lets surplus generation be credited against the units you import, on terms set by the regulator and your DISCOM. Where it is available and the settlement is favourable, exported units retain most of their value. Where it is not, only self-consumed units carry the full tariff, which makes daytime usage patterns matter much more.',
  },
  {
    q: 'Can I install rooftop solar in Mancherial?',
    a: 'Yes. Mancherial sits within the same strong irradiance band as the rest of Telangana, and the approval and metering process runs through the local DISCOM in the usual way. We work across Mancherial and other locations in Telangana.',
  },
  {
    q: 'How do I estimate my solar payback period?',
    a: 'Divide the installed cost from your written quotation by the annual saving. We do not publish a price per kW, so the calculator shows the savings side and leaves the cost side to your quotation rather than assuming a rate that would be wrong for most roofs.',
  },
]

export default function SolarCalculatorPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solar Savings Calculator', path: '/solar-calculator' },
  ]

  usePageMeta(
    {
      title: 'Solar Savings Calculator | Kapizo Solar',
      description:
        'Free solar savings calculator: estimate rooftop solar system size, annual generation and electricity bill savings from your monthly bill. Includes how solar savings are calculated, what affects them, and Telangana and Mancherial context.',
      path: '/solar-calculator',
    },
    [
      webPageSchema(
        'Solar Savings Calculator | Kapizo Solar',
        'Estimate rooftop solar capacity, generation and savings.',
        '/solar-calculator',
      ),
      breadcrumbSchema(crumbs),
      faqSchema([...savingsFaqs, ...methodologyFaqs]),
    ],
  )

  return (
    <>
      {/* Dense header: on this page the calculator itself is what the visitor
          came for, so the heading gives up height to bring the tool up into
          the first viewport. */}
      <PageHeader
        dense
        eyebrow="Solar Savings Calculator"
        title="Solar Savings Calculator – Estimate Your Rooftop Solar Savings"
        description="Enter roughly what you pay for electricity each month and we will estimate the system size, the generation and the saving that go with it."
        breadcrumbs={crumbs}
      />

      <section
        className="bg-white pb-10 pt-4 sm:pb-12 sm:pt-5"
        aria-labelledby="calc-heading"
      >
        <div className="container-kapizo">
          <h2 id="calc-heading" className="sr-only">
            Rooftop solar savings calculator
          </h2>
          <SolarCalculator />
        </div>
      </section>

      <section className="bg-white pb-14 sm:pb-16">
        <div className="container-kapizo">
          {/* Sizing the system and financing it are the same decision from two
              sides, so each calculator points at the other. */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-sm font-semibold text-kapizo-navy">
              Planning to finance your solar system?
            </p>
            <Link
              to="/solar-loan-emi"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-kapizo-green hover:underline"
            >
              Solar Loan EMI Calculator
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* Direct answer first, detail after: the shape answer engines and
              readers in a hurry both want. */}
          <div className="mt-8 max-w-3xl rounded-xl border-l-4 border-kapizo-green bg-kapizo-green/[0.04] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-kapizo-green">
              Quick answer
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              A solar savings calculator estimates how much of your electricity bill rooftop solar
              could replace. It converts your monthly bill into units, divides your daily
              consumption by the generation a kilowatt produces in your area, and values the units
              offset at your tariff. Actual savings depend on your consumption, your tariff, the
              capacity installed, shading, roof orientation, how much you use during daylight and
              whether net metering applies to your connection.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50" aria-labelledby="savings-explainer">
        <div className="container-kapizo">
          <div className="max-w-3xl">
            <span className="eyebrow">Understanding solar savings</span>
            <h2 id="savings-explainer" className="h-section mt-3">
              How rooftop solar savings are worked out
            </h2>
            <p className="lede mt-4">
              The calculator above does the arithmetic. This explains what it is doing, which
              factors move the answer most, and where a real roof departs from an estimate.
            </p>

            <div className="mt-10 space-y-9">
              {savingsSections.map((sec) => (
                <div key={sec.heading}>
                  <h3 className="font-display text-lg font-bold text-kapizo-navy">{sec.heading}</h3>
                  {sec.paragraphs.map((para) => (
                    <p key={para.slice(0, 40)} className="mt-2.5 text-sm leading-relaxed text-slate-600">
                      {para}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="mt-3 space-y-1.5">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-sm text-slate-600">
                          <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-kapizo-green" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
              <p className="text-sm leading-relaxed text-amber-900">
                <strong>Estimate, not a quotation.</strong> Every figure on this page is indicative
                and depends on your site, tariff and consumption. Subsidy eligibility under PM Surya
                Ghar is decided by the government and your DISCOM under the prevailing scheme rules,
                not by Kapizo Solar. See the{' '}
                <Link to="/pm-surya-ghar" className="font-semibold underline">
                  PM Surya Ghar page
                </Link>{' '}
                for the official structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="savings-faq">
        <div className="container-kapizo">
          <div className="max-w-3xl">
            <span className="eyebrow">Questions</span>
            <h2 id="savings-faq" className="h-section mt-3">
              Solar savings: common questions
            </h2>
            <div className="mt-9 space-y-7">
              {savingsFaqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-base font-bold text-kapizo-navy">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/solar-loan-emi" className="btn-outline">
                Solar Loan EMI Calculator
                <ArrowRightIcon />
              </Link>
              <Link to="/solar-knowledge/solar-payback-period-telangana" className="btn-outline">
                Solar payback period in Telangana
                <ArrowRightIcon />
              </Link>
              <Link to="/contact" className="btn-outline">
                Get a Solar Quote
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
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
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                The calculator does not show a payback period, because working one out requires
                assuming a system price. We share pricing after understanding your usage and site,
                and we would rather not put a made-up number in front of you.
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
              <Link to="/solar-loan-emi" className="btn-outline">
                Work out the monthly EMI
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
