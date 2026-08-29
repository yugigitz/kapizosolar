import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SolarLoanCalculator from '@/components/SolarLoanCalculator'
import CTASection from '@/components/CTASection'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { ArrowRightIcon } from '@/components/ui/Icons'

const emiFaqs = [
  {
    q: 'How is the EMI calculated?',
    a: 'As a standard reducing-balance instalment: EMI = P·r·(1+r)^n / ((1+r)^n − 1), where P is the loan amount, r is the monthly interest rate and n is the number of monthly instalments. The same formula your bank uses.',
  },
  {
    q: 'Does Kapizo Solar provide the loan?',
    a: 'No. Kapizo Solar is not a lender and has no tie-up with one. This calculator works only from the amount, rate and tenure you enter, so you can check an offer you have already been given.',
  },
  {
    q: 'Will the figure here match my bank statement exactly?',
    a: 'Usually it will be very close, but lenders may add processing fees, insurance or other charges that are not part of an EMI calculation. The rate you are offered also depends on the lender’s own assessment of your application.',
  },
  {
    q: 'How much should I finance?',
    a: 'That depends on the system your roof actually needs, which is why it is worth sizing the system first. The Solar Savings Calculator estimates the capacity and the annual saving, which gives you a figure to weigh the instalment against.',
  },
]

export default function SolarLoanEmiPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solar Loan EMI Calculator', path: '/solar-loan-emi' },
  ]

  usePageMeta(
    {
      title: 'Solar Loan EMI Calculator | Kapizo Solar',
      description:
        'Estimate the monthly EMI, total interest and total amount payable on a solar loan. Enter your own amount, interest rate and tenure. An estimate, not a loan offer.',
      path: '/solar-loan-emi',
    },
    [
      webPageSchema(
        'Solar Loan EMI Calculator | Kapizo Solar',
        'Estimate the monthly instalment, total interest and total payable on a solar loan.',
        '/solar-loan-emi',
      ),
      breadcrumbSchema(crumbs),
      faqSchema(emiFaqs),
    ],
  )

  return (
    <>
      <PageHeader
        dense
        eyebrow="Solar Loan EMI Calculator"
        title="What would the monthly instalment be?"
        description="If you are financing part of the system, enter the amount, rate and tenure you have been offered and this works out the EMI, the total interest and the total you would repay."
        breadcrumbs={crumbs}
      />

      <section
        className="bg-white pb-14 pt-8 sm:pb-16 sm:pt-9"
        aria-labelledby="emi-heading"
      >
        <div className="container-kapizo">
          <h2 id="emi-heading" className="sr-only">
            Solar loan EMI calculator
          </h2>
          <SolarLoanCalculator />

          {/* Sizing the system and financing it are the same decision from two
              sides, so each calculator points at the other. */}
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <p className="text-sm font-semibold text-kapizo-navy">
              Want to estimate your solar savings first?
            </p>
            <Link
              to="/solar-calculator"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-kapizo-green hover:underline"
            >
              Solar Savings Calculator
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container-kapizo">
          <div className="max-w-3xl">
            <span className="eyebrow">About this calculator</span>
            <h2 className="h-section mt-3">What the EMI figure does and does not include</h2>
            <p className="lede mt-4">
              The arithmetic is standard and the inputs are yours. What it cannot know is what your
              lender adds on top.
            </p>

            <div className="mt-8 space-y-6">
              {emiFaqs.map((item) => (
                <div key={item.q}>
                  <h3 className="font-display text-lg font-bold text-kapizo-navy">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Know the system before you size the loan"
        description="Send us your bill and we will confirm the capacity your roof actually needs, so the amount you finance matches the system you get."
        primaryLabel="Request a Site Visit"
        primaryTo="/contact"
        context="emi_page_footer"
      />
    </>
  )
}
