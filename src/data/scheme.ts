/**
 * SINGLE SOURCE OF TRUTH for government scheme information.
 *
 * PM Surya Ghar figures appear on the scheme page, in the FAQs, on the plan
 * pages and in the knowledge articles. They are defined once here so a change
 * in government policy is a one-line edit rather than a hunt across the site.
 *
 * These figures were verified against Government of India and Ministry of New
 * and Renewable Energy published sources. Scheme terms change, so re-verify on
 * the official portal before relying on them commercially.
 */

export const SCHEME_NAME = 'PM Surya Ghar: Muft Bijli Yojana'
export const SCHEME_SHORT = 'PM Surya Ghar'

export const OFFICIAL_LINKS = {
  portal: 'https://pmsuryaghar.gov.in',
  mnreResidentialCfa:
    'https://mnre.gov.in/en/notice/operational-guidelines-for-implementation-of-the-component-central-financial-assistance-to-residential-consumers-of-pm-surya-ghar-muft-bijli-yojana/',
  mnreGuidelines: 'https://mnre.gov.in/en/notice/guidelines-for-pm-surya-ghar-muft-bijli-yojana/',
  mnreRooftopProgramme: 'https://mnre.gov.in/en/grid-connected-solar-rooftop-programme/',
  /** The scheme notification setting out the residential CFA structure. */
  cfaNotification: 'https://solarrooftop.pmsuryaghar.gov.in/notification/170_notification.pdf',
} as const

/**
 * Central financial assistance by capacity, at government benchmark prices.
 * The scheme caps assistance at the 3 kW level, so larger systems receive the
 * same maximum amount.
 */
export const SUBSIDY_SLABS = [
  { capacity: '1 kW', amount: '₹30,000', amountValue: 30000 },
  { capacity: '2 kW', amount: '₹60,000', amountValue: 60000 },
  { capacity: '3 kW and above', amount: '₹78,000', amountValue: 78000, isMaximum: true },
] as const

/** The headline figure, phrased so it can never read as a guaranteed entitlement. */
export const SUBSIDY_MAX = '₹78,000'

/**
 * The per-kW structure set out in the scheme notification.
 * 2 kW at ₹30,000 gives ₹60,000; the third kW adds ₹18,000 to reach the
 * ₹78,000 ceiling. Nothing further is payable above 3 kW.
 */
export const SUBSIDY_STRUCTURE =
  '₹30,000 per kW for the first 2 kW, plus ₹18,000 for the additional 1 kW up to 3 kW. No further central assistance applies above 3 kW, so the maximum for a residential system is ₹78,000.'

/** How the three figures customers confuse relate to each other. */
export const COST_VS_SUBSIDY_NOTE =
  'Three separate figures are involved and they are easy to mix up. The project price is what the system costs, and it depends on your site and specification. The Central Financial Assistance is a government amount you may be eligible for, decided by the government and your DISCOM. What you finally pay is the project price less any assistance actually approved and released to you. We quote the project price. We cannot quote the other two, and neither can any installer.'

/**
 * The one-line statement to use wherever the subsidy is mentioned.
 * Deliberately says "up to" and "may be available" — never that a customer
 * will receive a specific amount.
 */
export const SUBSIDY_HEADLINE = `Eligible residential consumers may receive Central Financial Assistance under ${SCHEME_SHORT}, subject to the scheme's eligibility requirements, approved process, applicable benchmark conditions and portal and DISCOM requirements. The maximum for a residential system is ${SUBSIDY_MAX}. Not every customer receives the maximum, and some receive none.`

/** Short form for cards and plan pages where space is tight. */
export const SUBSIDY_SHORT = `Eligible residential consumers may receive Central Financial Assistance of up to ${SUBSIDY_MAX} under ${SCHEME_SHORT}, subject to the scheme's eligibility requirements, approved process and DISCOM requirements. This is separate from the project price and is not a discount we control.`

/**
 * Kapizo's position on the scheme. Stated plainly because it affects the
 * customer's decision before they commit to an installer.
 */
export const SUBSIDY_LIMITATIONS = [
  'Eligibility is determined by the government and your DISCOM under the applicable scheme rules, not by Kapizo Solar, and not by the fact that a system has been installed.',
  'Contacting or appointing Kapizo Solar does not secure, guarantee or accelerate any subsidy.',
  'Assistance is released after the application, DISCOM feasibility approval, installation to the applicable technical specifications, inspection and document verification.',
  'The scheme routes the balance payment through an empanelled vendor. Kapizo Solar does not currently claim empanelment, so confirm the vendor requirements on the official portal before committing to any installer, including us.',
  'Amounts, eligibility and procedure are set by the government and can be revised at any time. Verify the current position on the official portal before making a financial decision.',
]

/** Standard disclaimer shown wherever scheme benefits are discussed. */
export const SCHEME_DISCLAIMER =
  'Government scheme benefits, eligibility, subsidy amounts and approval requirements are subject to applicable government guidelines and may change. Customers should verify the latest information through official government channels.'
