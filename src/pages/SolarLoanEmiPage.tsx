import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import SolarLoanCalculator from '@/components/SolarLoanCalculator'
import CTASection from '@/components/CTASection'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { ArrowRightIcon, CheckIcon } from '@/components/ui/Icons'

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

/**
 * Educational content for the EMI calculator. Deliberately free of any named
 * bank, rate or eligibility claim: Kapizo does not lend, has no tie-up, and
 * none of that could be stated accurately here.
 */
const emiSections = [
  {
    heading: 'What is a solar loan EMI calculator?',
    paragraphs: [
      'It converts a loan offer into the number that actually affects your month: the instalment. You enter the amount you intend to borrow, the annual interest rate you have been quoted and the tenure, and it returns the monthly EMI, the total interest across the term and the total you would repay.',
      'It works on the numbers you give it. It does not check eligibility, does not apply any lender\u2019s rules, and does not know what fees a particular bank adds. Use it to compare offers you already have, or to see what a given instalment implies before you approach anyone.',
    ],
  },
  {
    heading: 'How solar loan EMI is calculated',
    paragraphs: [
      'Indian retail loans of this kind are almost always reducing balance, which means interest is charged on the outstanding principal rather than the original amount. As you repay, the interest share of each instalment falls and the principal share rises, while the instalment itself stays level.',
      'The standard formula is EMI = P\u00b7r\u00b7(1+r)\u207f \u00f7 ((1+r)\u207f \u2212 1), where P is the principal, r is the monthly interest rate (annual rate \u00f7 12 \u00f7 100) and n is the number of monthly instalments. At a zero rate the expression is undefined and the amount simply divides evenly across the term.',
    ],
    bullets: [
      'Loan amount (P): what you borrow after any down payment',
      'Monthly rate (r): annual rate ÷ 12 ÷ 100',
      'Instalments (n): tenure in years × 12',
    ],
  },
  {
    heading: 'How tenure and rate move the instalment',
    paragraphs: [
      'The two levers pull in opposite directions. A longer tenure lowers the monthly instalment but increases the total interest, because the balance is outstanding for longer. A shorter tenure raises the instalment and reduces total interest.',
      'The rate moves both at once: a higher rate raises the instalment and the total. Change one field at a time in the calculator above and watch the total interest figure — it makes the trade-off concrete faster than any explanation.',
    ],
  },
  {
    heading: 'Down payment and what you actually borrow',
    paragraphs: [
      'The loan amount is the project cost minus whatever you pay upfront. A larger down payment reduces the principal, which reduces both the instalment and the total interest, so it is worth modelling two or three contributions before settling on one.',
      'Enter the amount you expect to borrow, not the full system cost, unless you intend to finance the whole thing.',
    ],
  },
  {
    heading: 'EMI against expected electricity savings',
    paragraphs: [
      'The comparison most homeowners actually want is the instalment against the monthly bill reduction. If the saving covers a meaningful share of the instalment, the system is partly paying for itself while you repay; once the loan closes, the saving continues.',
      'Estimate the saving side first with the Solar Savings Calculator, then bring the figure here. Compare like with like: a monthly saving against a monthly instalment, both before any subsidy, since assistance is decided separately and is not guaranteed.',
    ],
  },
  {
    heading: 'What to check with a lender before you commit',
    paragraphs: [
      'An EMI figure is only part of the cost. Lenders add charges that never appear in an instalment calculation, and the terms vary enough between institutions that comparing headline rates alone is misleading.',
    ],
    bullets: [
      'Processing fee, and whether it is deducted from the disbursed amount',
      'Whether the rate is fixed or floating, and what it is benchmarked to',
      'Any insurance bundled with the loan, and whether it is optional',
      'Prepayment and foreclosure terms, and any charge for paying early',
      'Documentation, inspection or legal fees charged separately',
      'Whether disbursement is staged, and what triggers each stage',
    ],
  },
  {
    heading: 'Solar loan against paying upfront',
    paragraphs: [
      'Paying upfront costs nothing in interest and is the cheaper route in absolute terms. Financing spreads the cost so the system can be installed sooner, which starts the bill reduction sooner, at the price of the interest you pay for that.',
      'Neither is universally right. The honest comparison is total interest against the value of installing earlier plus whatever else you would have done with the capital.',
    ],
  },
  {
    heading: 'Telangana, Mancherial and PM Surya Ghar context',
    paragraphs: [
      'Solar financing in Telangana works the same way as anywhere else in India: the lender assesses you, not the roof, and the terms come from the institution rather than from the installer. We are based in Mancherial and work across Mancherial and other locations in Telangana, and we do not arrange or broker finance.',
      'Central financial assistance under PM Surya Ghar is a separate matter from a loan. It is decided by the government and your DISCOM under the prevailing scheme rules, it applies to eligible residential grid-connected systems, and it is not something an installer can promise. If assistance is central to your decision, confirm the current position on the official portal before you commit to a loan amount.',
    ],
  },
]

const emiPageFaqs = [
  {
    q: 'How is a solar loan EMI calculated?',
    a: 'On a reducing balance: EMI = P·r·(1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the amount borrowed, r is the monthly rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments. Interest accrues on the outstanding balance, so the interest share of each instalment falls over the term while the instalment stays level.',
  },
  {
    q: 'What will the EMI be on a solar loan?',
    a: 'It depends entirely on the amount, the rate and the tenure, which is why the calculator takes all three. As a worked example, ₹2,00,000 at 9% over five years gives an instalment of about ₹4,152, roughly ₹49,100 of total interest and about ₹2,49,100 repaid in total. Change any input and the figures move.',
  },
  {
    q: 'How much interest will I pay on a solar loan?',
    a: 'Total interest is the total repaid minus the amount borrowed, and the calculator shows it directly. It rises with both the rate and the tenure, and a longer tenure can add a surprising amount even at the same rate — which is the main reason to model a few tenures rather than accepting the first one offered.',
  },
  {
    q: 'Does a longer tenure make a solar loan cheaper?',
    a: 'It makes the monthly instalment smaller and the loan more expensive overall. The balance stays outstanding longer, so more interest accrues. Choose the shortest tenure whose instalment you are comfortable paying.',
  },
  {
    q: 'Is a solar loan better than paying upfront?',
    a: 'Paying upfront avoids interest entirely and costs less in absolute terms. Financing lets the system go up sooner, so the bill reduction starts sooner, at the cost of the interest. Compare the total interest against the value of installing earlier and against whatever else the capital would have done.',
  },
  {
    q: 'How does my EMI compare with my electricity bill savings?',
    a: 'Estimate the monthly saving with the Solar Savings Calculator and set it against the instalment shown here. If the saving covers a meaningful share of the EMI, the system offsets part of its own financing while you repay, and the full saving remains once the loan closes.',
  },
  {
    q: 'What charges should I check besides the interest rate?',
    a: 'Processing fees, any bundled insurance, documentation or inspection charges, prepayment and foreclosure terms, and whether the rate is fixed or floating. None of these appear in an EMI calculation, and together they can change which of two offers is actually cheaper.',
  },
  {
    q: 'Does Kapizo Solar provide solar loans?',
    a: 'No. Kapizo Solar is not a lender and has no tie-up with one. This calculator exists so you can evaluate an offer you have been given. Approval, rates, fees, eligibility and repayment terms are entirely a matter for the bank or lender.',
  },
  {
    q: 'Does PM Surya Ghar cover a solar loan?',
    a: 'PM Surya Ghar provides central financial assistance for eligible residential grid-connected systems; it is not a loan product from an installer. Assistance and financing are decided separately, by the government and DISCOM on one side and by your lender on the other. Confirm the current position on the official portal.',
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
        'Free solar loan EMI calculator: estimate the monthly instalment, total interest and total repayment on a rooftop solar loan from your own amount, rate and tenure. Includes how solar loan EMI is calculated and what to check with a lender.',
      path: '/solar-loan-emi',
    },
    [
      webPageSchema(
        'Solar Loan EMI Calculator | Kapizo Solar',
        'Estimate the monthly instalment, total interest and total payable on a solar loan.',
        '/solar-loan-emi',
      ),
      breadcrumbSchema(crumbs),
      faqSchema([...emiPageFaqs, ...emiFaqs]),
    ],
  )

  return (
    <>
      <PageHeader
        dense
        eyebrow="Solar Loan EMI Calculator"
        title="Solar Loan EMI Calculator – Estimate Your Monthly Solar Loan Payment"
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

          <div className="mt-8 max-w-3xl rounded-xl border-l-4 border-kapizo-navy bg-kapizo-navy/[0.03] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-kapizo-navy">
              Quick answer
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              A solar loan EMI is the fixed monthly instalment on money borrowed to install a solar
              system, calculated on a reducing balance from three inputs: the amount borrowed, the
              annual interest rate and the tenure. A longer tenure lowers the instalment and raises
              the total interest. Processing fees, insurance and prepayment terms sit outside the
              EMI figure and differ by lender.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50" aria-labelledby="emi-explainer">
        <div className="container-kapizo">
          <div className="max-w-3xl">
            <span className="eyebrow">Understanding solar financing</span>
            <h2 id="emi-explainer" className="h-section mt-3">
              How a solar loan EMI works
            </h2>
            <p className="lede mt-4">
              The arithmetic is standard and the inputs are yours. What it cannot know is what your
              lender adds on top, which is usually where two similar-looking offers differ.
            </p>

            <div className="mt-10 space-y-9">
              {emiSections.map((sec) => (
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
                Kapizo Solar is not a lender. This calculator provides an estimate only. Actual loan
                approval, interest rates, processing fees, eligibility and repayment terms depend on
                the respective bank or lender.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="emi-faq">
        <div className="container-kapizo">
          <div className="max-w-3xl">
            <span className="eyebrow">Questions</span>
            <h2 id="emi-faq" className="h-section mt-3">
              Solar loan EMI: common questions
            </h2>
            <div className="mt-9 space-y-7">
              {emiPageFaqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-display text-base font-bold text-kapizo-navy">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/solar-calculator" className="btn-outline">
                Solar Savings Calculator
                <ArrowRightIcon />
              </Link>
              <Link to="/solar-knowledge/solar-loan-vs-upfront-payment" className="btn-outline">
                Solar loan or paying upfront
                <ArrowRightIcon />
              </Link>
              <Link to="/pm-surya-ghar" className="btn-outline">
                PM Surya Ghar
                <ArrowRightIcon />
              </Link>
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
