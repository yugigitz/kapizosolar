/**
 * SINGLE SOURCE OF TRUTH for the three Kapizo solar options.
 *
 * Everything the website shows about Essential / Recommended / High Performance
 * is derived from this file. Change a value here and it propagates to the plans
 * grid, the comparison table, each plan detail page, the enquiry form, the
 * WhatsApp messages and the structured data.
 *
 * These are NOT fixed-price packages. They are decision paths — three system
 * approaches a customer can start from. Final specification and pricing are
 * always established per site, in the customer's quotation.
 *
 * `TBD` marks a value that has not been finalised commercially. The UI renders
 * TBD values as "Shared on request" rather than inventing a number. Replace a
 * TBD with a real value and the UI switches over automatically — no component
 * changes required.
 *
 * NOTE ON IDS AND SLUGS: the ids and route segments below deliberately remain
 * budget / standard / premium so that routing, the sitemap, canonical URLs and
 * the prerender list are untouched by the renaming. Only the customer-facing
 * `name` changed. If the URLs should match the new names, that is a routing
 * change and needs to be requested explicitly.
 */

import {
  AMC_NAME,
  AMC_SUMMARY,
  WARRANTY_LAYERS,
  WARRANTY_TERMS_NOTE,
  WORKMANSHIP_WARRANTY_NAME,
} from './warranty'
import { SUBSIDY_SHORT } from './scheme'

export const TBD = null
export type Configurable<T> = T | null

export type PlanId = 'budget' | 'standard' | 'premium'

export type PlanSpec = {
  label: string
  /** null renders as "Shared on request" */
  value: Configurable<string>
}

export type Plan = {
  id: PlanId
  name: string
  /** Route segment: /plans/<slug> — unchanged by the renaming, see file header. */
  slug: string
  positioning: string
  idealCustomer: string
  /** Short label used in cards and the comparison header */
  audienceLabel: string
  recommended: boolean
  recommendedReason: Configurable<string>

  capacityOptions: string
  specs: {
    panels: PlanSpec
    inverter: PlanSpec
    mounting: PlanSpec
    protection: PlanSpec
    monitoring: PlanSpec
    installation: PlanSpec
    documentation: PlanSpec
    support: PlanSpec
    storage: PlanSpec
  }

  inclusions: string[]
  optionalUpgrades: string[]
  exclusions: string[]
  keyAdvantages: string[]
  expectedOutcome: string

  /** Commercial values — intentionally unset until confirmed. */
  pricePerKw: Configurable<number>
  indicativePriceNote: Configurable<string>
  subsidyNote: Configurable<string>
  netPayableNote: Configurable<string>
  warranty: PlanSpec[]

  notes: string[]

  cta: {
    primary: string
    enquire: string
    whatsapp: string
    call: string
  }

  seo: {
    title: string
    description: string
  }
}

/** Text used wherever a Configurable value is unset. */
export const CONFIGURABLE_PLACEHOLDER = 'Shared on request'

export function specValue(spec: PlanSpec): string {
  return spec.value ?? CONFIGURABLE_PLACEHOLDER
}

export function isConfigured<T>(value: Configurable<T>): value is T {
  return value !== null && value !== undefined
}

/**
 * The single pricing statement used everywhere a price would otherwise appear.
 * No per-kW rate, total, saving or payback figure is published anywhere on the
 * site until Kapizo supplies verified commercial pricing.
 */
export const PRICING_STATEMENT =
  'Final pricing is shared after understanding your electricity usage, system requirement and site conditions.'

export const PRICING_STATEMENT_SHORT = 'Get a personalised quotation based on your requirement.'

/**
 * Component selection wording. No manufacturer, model, wattage or quantity is
 * named on the website — those belong in the customer's quotation, where they
 * can be committed to accurately.
 */
export const COMPONENT_SELECTION_NOTE =
  'Components are selected from suitable, established manufacturers. Selection depends on availability, system design and customer requirement.'

export const COMPONENT_QUOTATION_NOTE =
  'The exact manufacturer, model, wattage and quantity of modules, the inverter model, the structure specification and the balance-of-system specification are confirmed in your final quotation.'

/** Shared warranty rows, derived from the four-layer structure. */
const sharedWarranty: PlanSpec[] = WARRANTY_LAYERS.map((w) => ({
  label: w.layer,
  value: w.typical,
}))

const sharedExclusions = [
  'Civil works beyond standard mounting (for example roof strengthening or a new slab)',
  'DISCOM fees, application charges and any statutory levies',
  'Long cable runs or additional trenching beyond the surveyed route',
  'Electrical upgrades to your existing internal wiring or distribution board, if required',
  'Any works not listed in your signed proposal',
]

const sharedNotes = [
  COMPONENT_QUOTATION_NOTE,
  WARRANTY_TERMS_NOTE,
  'Final specification and pricing are confirmed after site assessment.',
]

export const plans: Plan[] = [
  {
    id: 'budget',
    name: 'Essential',
    slug: 'budget',
    positioning:
      'A straightforward solar solution for customers primarily looking to reduce their electricity bill with a reliable, practical system.',
    idealCustomer:
      'Your main goal is a smaller monthly bill, your supply is reasonably reliable, and you want a sensible system without paying for capability you will not use. Nothing is trimmed from the electrical safety side to reach this level.',
    audienceLabel: 'Practical and reliable',
    recommended: false,
    recommendedReason: TBD,
    capacityOptions: 'Sized to your electricity usage and available shadow-free roof area',
    specs: {
      panels: { label: 'Solar modules', value: 'Reliable modules from suitable, established manufacturers' },
      inverter: { label: 'Inverter', value: 'On-grid string inverter suited to the system design' },
      mounting: { label: 'Mounting structure', value: 'Standard galvanised structure for your roof type' },
      protection: { label: 'Protection', value: 'Essential DC and AC protection with earthing' },
      monitoring: { label: 'Monitoring', value: 'Standard inverter monitoring' },
      installation: { label: 'Installation', value: 'Professional installation and commissioning' },
      documentation: { label: 'Documentation', value: 'Net metering and subsidy application assistance' },
      support: { label: 'After-sales support', value: 'Standard support' },
      storage: { label: 'Battery / storage', value: 'Not included' },
    },
    inclusions: [
      'Site assessment and system sizing based on your electricity usage',
      'Supply of modules, inverter, structure and balance-of-system',
      'Standard mounting structure suited to your roof',
      'Essential DC and AC protection with earthing',
      'Installation, testing and commissioning',
      'Net metering application assistance',
      'PM Surya Ghar subsidy process assistance, where eligible',
      WORKMANSHIP_WARRANTY_NAME,
    ],
    optionalUpgrades: [
      'Higher-efficiency modules',
      'Inverter with app-based monitoring',
      'Surge protection upgrade',
      'Elevated structure to keep roof area usable',
      AMC_NAME,
    ],
    exclusions: sharedExclusions,
    keyAdvantages: [
      'Sensible system sizing based on your actual consumption',
      'Reliable components and essential protection done properly',
      'The same engineering approach to sizing and safety as the other two options',
      'Net metering and subsidy documentation assistance included',
    ],
    expectedOutcome:
      'Your daytime usage runs on solar instead of DISCOM units, so the bill comes down. During a power cut the system shuts down like any on-grid system — there is no battery at this level.',
    pricePerKw: TBD,
    indicativePriceNote: TBD,
    subsidyNote: SUBSIDY_SHORT,
    netPayableNote: TBD,
    warranty: sharedWarranty,
    notes: [
      'On-grid systems do not operate during a grid outage, because the inverter must disconnect for line-worker safety.',
      ...sharedNotes,
    ],
    cta: {
      primary: 'Get My Quotation',
      enquire: 'Ask for an Essential Quote',
      whatsapp: 'WhatsApp About Essential',
      call: 'Call About Essential',
    },
    seo: {
      title: 'Essential Solar Option | Rooftop Solar in Telangana | Kapizo Solar',
      description:
        'The Kapizo Essential option is a straightforward rooftop solar system for customers focused on reducing their electricity bill, engineered and protected properly. Serving Mancherial and Telangana.',
    },
  },
  {
    id: 'standard',
    name: 'Recommended',
    slug: 'standard',
    positioning:
      'A balanced combination of system performance, component quality, long-term value and service. This is where we suggest most residential customers start.',
    idealCustomer:
      'You want a system that performs well over fifteen years rather than one that only looks cheap on day one, you would like to see what it is generating, and you want the fuller protection scheme.',
    audienceLabel: 'Balanced performance and value',
    recommended: true,
    recommendedReason:
      'It is the option where the extra spend buys the things that actually matter over the life of the system: better component selection, a more efficient system design, stronger protection and proper monitoring. Below this level you save money up front; above it you are mainly paying for backup capability and premium configuration.',
    capacityOptions: 'Sized to your electricity usage and available shadow-free roof area',
    specs: {
      panels: { label: 'Solar modules', value: 'Better component selection from suitable, established manufacturers' },
      inverter: { label: 'Inverter', value: 'Efficient inverter matched to the system design' },
      mounting: { label: 'Mounting structure', value: 'Galvanised structure specified for your roof and wind conditions' },
      protection: { label: 'Protection', value: 'Stronger DC and AC protection, including surge protection' },
      monitoring: { label: 'Monitoring', value: 'Better monitoring, typically including app-based generation data' },
      installation: { label: 'Installation', value: 'Professional installation, testing and commissioning' },
      documentation: { label: 'Documentation', value: 'Net metering and subsidy application assistance' },
      support: { label: 'After-sales support', value: 'Priority support, with optional AMC' },
      storage: { label: 'Battery / storage', value: 'Not included — hybrid-ready configuration available on request' },
    },
    inclusions: [
      'Site assessment and system sizing based on your electricity usage',
      'Efficient system design for your roof orientation and shading pattern',
      'Better component selection from suitable, established manufacturers',
      'Stronger DC and AC protection, including surge protection',
      'Monitoring so you can see what the system is generating',
      'Installation, testing and commissioning',
      'Net metering application assistance',
      'PM Surya Ghar subsidy process assistance, where eligible',
      WORKMANSHIP_WARRANTY_NAME,
    ],
    optionalUpgrades: [
      'Hybrid-ready inverter, so a battery can be added later',
      'Battery storage for essential loads',
      'Elevated structure for continued roof use',
      'Extended inverter warranty, where the manufacturer offers it',
      AMC_NAME,
    ],
    exclusions: sharedExclusions,
    keyAdvantages: [
      'The upgrades that most affect output and safety across the system life',
      'Efficient system design rather than a standard layout',
      'Monitoring you will actually use',
      'Good long-term value between the two other options',
    ],
    expectedOutcome:
      'A well-specified system covering a substantial share of your annual usage, with generation you can check yourself. If you may want backup later, ask for a hybrid-ready inverter at the design stage.',
    pricePerKw: TBD,
    indicativePriceNote: TBD,
    subsidyNote: SUBSIDY_SHORT,
    netPayableNote: TBD,
    warranty: sharedWarranty,
    notes: [
      'Without a battery, this remains an on-grid system and does not run during a power cut.',
      ...sharedNotes,
    ],
    cta: {
      primary: 'Get My Quotation',
      enquire: 'Ask for a Recommended Quote',
      whatsapp: 'WhatsApp About Recommended',
      call: 'Call About Recommended',
    },
    seo: {
      title: 'Recommended Solar Option | Balanced Rooftop Solar | Kapizo Solar',
      description:
        'The Kapizo Recommended option balances component quality, system performance, long-term value and service. Our default suggestion for most homes in Mancherial and Telangana.',
    },
  },
  {
    id: 'premium',
    name: 'High Performance',
    slug: 'premium',
    positioning:
      'For customers who want higher system performance, enhanced component selection, greater monitoring capability or a more premium system configuration.',
    idealCustomer:
      'You want the strongest configuration we offer, you need power through outages, or you are holding the property long term and would rather invest once. Also suits commercial and industrial sites where downtime has a cost.',
    audienceLabel: 'Higher performance and configuration',
    recommended: false,
    recommendedReason: TBD,
    capacityOptions: 'Sized to your electricity usage and available shadow-free roof area',
    specs: {
      panels: { label: 'Solar modules', value: 'Higher-efficiency modules where appropriate for the site' },
      inverter: { label: 'Inverter', value: 'Hybrid or hybrid-ready inverter, per the system design' },
      mounting: { label: 'Mounting structure', value: 'Enhanced structure specification for the site conditions' },
      protection: { label: 'Protection', value: 'Enhanced DC and AC protection scheme' },
      monitoring: { label: 'Monitoring', value: 'Advanced monitoring where available for the selected equipment' },
      installation: { label: 'Installation', value: 'Professional installation, testing and commissioning' },
      documentation: { label: 'Documentation', value: 'Net metering and subsidy application assistance' },
      support: { label: 'After-sales support', value: 'Priority support, with optional AMC' },
      storage: { label: 'Battery / storage', value: 'Battery storage available, sized to your backup requirement' },
    },
    inclusions: [
      'Site assessment and system sizing based on your electricity usage',
      'System design for higher performance on your specific roof',
      'Enhanced component selection, where justified by the site and requirement',
      'Enhanced DC and AC protection scheme',
      'Advanced monitoring, where available for the selected equipment',
      'Installation, testing and commissioning',
      'Net metering application assistance',
      'PM Surya Ghar subsidy process assistance, where eligible',
      WORKMANSHIP_WARRANTY_NAME,
    ],
    optionalUpgrades: [
      'Battery capacity sized to the circuits you want backed up',
      'Extended inverter warranty, where the manufacturer offers it',
      'Elevated or custom structure',
      AMC_NAME,
    ],
    exclusions: sharedExclusions,
    keyAdvantages: [
      'Higher-efficiency components where the site justifies them',
      'Enhanced protection and monitoring capability',
      'Battery backup available for essential loads',
      'Suited to long-term ownership and to sites where downtime is costly',
    ],
    expectedOutcome:
      'Your bill comes down as with any solar system, and with battery storage the circuits you choose keep running through an outage. Battery capacity is sized to those circuits, not to the whole property.',
    pricePerKw: TBD,
    indicativePriceNote: TBD,
    subsidyNote: SUBSIDY_SHORT,
    netPayableNote: TBD,
    warranty: sharedWarranty,
    notes: [
      'Specific module technologies, inverter brands and equipment are not committed on this website. What is actually supplied is confirmed in your quotation.',
      'Battery and off-grid components are treated differently from grid-connected capacity for scheme purposes.',
      ...sharedNotes,
    ],
    cta: {
      primary: 'Get My Quotation',
      enquire: 'Ask for a High Performance Quote',
      whatsapp: 'WhatsApp About High Performance',
      call: 'Call About High Performance',
    },
    seo: {
      title: 'High Performance Solar Option | Premium Rooftop Solar | Kapizo Solar',
      description:
        'The Kapizo High Performance option is for customers wanting higher system performance, enhanced components, advanced monitoring or battery backup. Serving Mancherial and Telangana.',
    },
  },
]

export function getPlan(slug: string): Plan | undefined {
  return plans.find((p) => p.slug === slug)
}

/** Rows for the side-by-side comparison table, derived from the plan specs. */
export const comparisonRows: { label: string; key: keyof Plan['specs'] }[] = [
  { label: 'Solar modules', key: 'panels' },
  { label: 'Inverter', key: 'inverter' },
  { label: 'Mounting structure', key: 'mounting' },
  { label: 'Protection equipment', key: 'protection' },
  { label: 'Monitoring', key: 'monitoring' },
  { label: 'Installation scope', key: 'installation' },
  { label: 'Documentation assistance', key: 'documentation' },
  { label: 'After-sales support', key: 'support' },
  { label: 'Battery / storage', key: 'storage' },
]

/** Contextual WhatsApp message for a given plan. */
export function planWhatsAppMessage(plan: Plan): string {
  return `Hello Kapizo Solar, I am interested in the ${plan.name} option. Please share the system details, specification and a quotation for my property.`
}
