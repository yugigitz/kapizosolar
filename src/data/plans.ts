/**
 * SINGLE SOURCE OF TRUTH for the Kapizo three-plan system.
 *
 * Everything the website shows about Budget / Standard / Premium is derived from
 * this file. Change a value here and it propagates to the plans grid, the
 * comparison table, each plan detail page, the enquiry form, the WhatsApp
 * messages and the structured data.
 *
 * `TBD` marks a value that has not been finalised commercially. The UI renders
 * TBD values as "Shared on request" rather than inventing a number. Replace a
 * TBD with a real value and the UI switches over automatically — no component
 * changes required.
 */

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
  /** Route segment: /plans/<slug> */
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

const sharedExclusions = [
  'Civil works beyond standard mounting (for example roof strengthening or a new slab)',
  'DISCOM fees, application charges and any statutory levies',
  'Long cable runs or additional trenching beyond the surveyed route',
  'Electrical upgrades to your existing internal wiring or distribution board, if required',
  'Any works not listed in your signed proposal',
]

export const plans: Plan[] = [
  {
    id: 'budget',
    name: 'Budget Plan',
    slug: 'budget',
    positioning: 'A correctly engineered on-grid system at the lowest sensible entry cost.',
    idealCustomer:
      'Customers whose priority is reducing the monthly electricity bill with the smallest initial investment, and who do not need battery backup.',
    audienceLabel: 'Lowest entry cost',
    recommended: false,
    recommendedReason: TBD,
    capacityOptions: 'Typically 1 kW – 5 kW, sized to your bill and roof area',
    specs: {
      panels: { label: 'Solar modules', value: 'Standard-efficiency modules' },
      inverter: { label: 'Inverter', value: 'On-grid string inverter' },
      mounting: { label: 'Mounting structure', value: 'Standard galvanised structure for your roof type' },
      protection: { label: 'Protection', value: 'Essential DC and AC protection with earthing' },
      monitoring: { label: 'Monitoring', value: 'Inverter display' },
      installation: { label: 'Installation', value: 'Professional installation and commissioning' },
      documentation: { label: 'Documentation', value: 'Net metering application assistance' },
      support: { label: 'After-sales support', value: 'Standard support' },
      storage: { label: 'Battery / storage', value: 'Not included' },
    },
    inclusions: [
      'Site assessment and system design',
      'Supply of modules, inverter, structure and balance-of-system',
      'Standard mounting structure suited to your roof',
      'Essential DC and AC protection with earthing',
      'Installation, testing and commissioning',
      'Net metering application assistance',
    ],
    optionalUpgrades: [
      'Higher-efficiency modules',
      'Inverter with app-based monitoring',
      'Surge protection upgrade',
      'Elevated structure to keep roof area usable',
    ],
    exclusions: sharedExclusions,
    keyAdvantages: [
      'Lowest initial investment of the three plans',
      'Same engineering approach to sizing and protection as the higher plans',
      'Straightforward path to bill reduction',
    ],
    expectedOutcome:
      'A grid-connected system sized to your consumption that reduces the units you buy from the DISCOM during daylight hours. No backup during a power cut.',
    pricePerKw: TBD,
    indicativePriceNote: TBD,
    subsidyNote:
      'Residential grid-connected systems may be eligible for central financial assistance under PM Surya Ghar, subject to prevailing government guidelines and DISCOM processes.',
    netPayableNote: TBD,
    warranty: [
      { label: 'Module warranty', value: TBD },
      { label: 'Inverter warranty', value: TBD },
      { label: 'Workmanship', value: TBD },
    ],
    notes: [
      'On-grid systems do not operate during a grid outage, because the inverter must disconnect for line-worker safety.',
      'Final specification is confirmed after site assessment.',
    ],
    cta: {
      primary: 'Request Quote',
      enquire: 'Enquire About Budget Plan',
      whatsapp: 'WhatsApp About Budget Plan',
      call: 'Call About Budget Plan',
    },
    seo: {
      title: 'Budget Solar Plan | Entry-Level Rooftop Solar | Kapizo Solar',
      description:
        'The Kapizo Budget Plan is an on-grid rooftop solar system at the lowest sensible entry cost, engineered and protected properly. Serving Mancherial and Telangana.',
    },
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    slug: 'standard',
    positioning:
      'A balanced specification with better modules, monitoring and full protection.',
    idealCustomer:
      'Customers who want a meaningful step up in component quality, visibility into generation and a fuller protection scheme, without moving to a premium build.',
    audienceLabel: 'Balanced quality and value',
    recommended: true,
    recommendedReason:
      'It adds the upgrades that most affect long-term output and safety — higher-efficiency modules, monitoring you can actually check, and full surge protection — while staying below a premium build.',
    capacityOptions: 'Typically 2 kW – 15 kW, sized to your bill and roof area',
    specs: {
      panels: { label: 'Solar modules', value: 'Higher-efficiency modules' },
      inverter: { label: 'Inverter', value: 'On-grid inverter with app / portal monitoring' },
      mounting: { label: 'Mounting structure', value: 'Upgraded structure specification' },
      protection: { label: 'Protection', value: 'Full DC and AC protection with surge protection' },
      monitoring: { label: 'Monitoring', value: 'App / web portal monitoring' },
      installation: { label: 'Installation', value: 'Professional installation with cable management' },
      documentation: { label: 'Documentation', value: 'Net metering plus scheme documentation assistance' },
      support: { label: 'After-sales support', value: 'Scheduled support guidance' },
      storage: { label: 'Battery / storage', value: 'Optional add-on' },
    },
    inclusions: [
      'Site assessment and detailed system design',
      'Higher-efficiency module selection',
      'Inverter with monitoring capability',
      'Upgraded mounting structure specification',
      'Full DC and AC protection including surge protection',
      'Installation with cable management and finishing',
      'Net metering and applicable scheme documentation assistance',
      'Handover walkthrough of the system',
    ],
    optionalUpgrades: [
      'Battery backup for essential loads',
      'Premium tier modules',
      'Extended inverter warranty, where the manufacturer offers it',
      'Elevated structure for continued roof use',
    ],
    exclusions: sharedExclusions,
    keyAdvantages: [
      'Better generation per square foot from higher-efficiency modules',
      'You can see what the system is generating, rather than assuming',
      'Full protection scheme including surge protection',
      'Upgrade path to battery backup later',
    ],
    expectedOutcome:
      'A well-specified grid-connected system with monitoring, sized to cover a substantial share of your annual consumption, with the option to add battery backup later.',
    pricePerKw: TBD,
    indicativePriceNote: TBD,
    subsidyNote:
      'Residential grid-connected systems may be eligible for central financial assistance under PM Surya Ghar, subject to prevailing government guidelines and DISCOM processes.',
    netPayableNote: TBD,
    warranty: [
      { label: 'Module warranty', value: TBD },
      { label: 'Inverter warranty', value: TBD },
      { label: 'Workmanship', value: TBD },
    ],
    notes: [
      'Battery backup can be added later if the inverter is specified as hybrid-ready at the design stage — tell us at the enquiry stage if this matters to you.',
      'Final specification is confirmed after site assessment.',
    ],
    cta: {
      primary: 'Request Quote',
      enquire: 'Enquire About Standard Plan',
      whatsapp: 'WhatsApp About Standard Plan',
      call: 'Call About Standard Plan',
    },
    seo: {
      title: 'Standard Solar Plan | Recommended Rooftop Solar | Kapizo Solar',
      description:
        'The Kapizo Standard Plan balances higher-efficiency modules, monitoring and full protection for residential and small commercial rooftop solar in Telangana.',
    },
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    slug: 'premium',
    positioning:
      'A higher specification build with hybrid capability and battery backup as an option.',
    idealCustomer:
      'Customers who want the best available specification, need backup during outages, or are holding the asset for the long term and want the strongest components and finish.',
    audienceLabel: 'Highest specification',
    recommended: false,
    recommendedReason: TBD,
    capacityOptions: 'Typically 5 kW and above, including commercial and industrial capacities',
    specs: {
      panels: { label: 'Solar modules', value: 'Premium tier modules' },
      inverter: { label: 'Inverter', value: 'Premium hybrid or hybrid-ready inverter' },
      mounting: { label: 'Mounting structure', value: 'Enhanced structure with added corrosion protection' },
      protection: { label: 'Protection', value: 'Comprehensive protection and earthing scheme' },
      monitoring: { label: 'Monitoring', value: 'Detailed monitoring with handover walkthrough' },
      installation: { label: 'Installation', value: 'Premium finish with detailed cable management' },
      documentation: { label: 'Documentation', value: 'End-to-end documentation assistance' },
      support: { label: 'After-sales support', value: 'Priority support' },
      storage: { label: 'Battery / storage', value: 'Available, sized to your backup loads' },
    },
    inclusions: [
      'Detailed site assessment and engineering design',
      'Premium tier module selection',
      'Hybrid or hybrid-ready inverter',
      'Enhanced structure with added corrosion protection',
      'Comprehensive protection and earthing scheme',
      'Premium installation finish and cable management',
      'Detailed monitoring configuration and handover walkthrough',
      'End-to-end documentation assistance',
      'Priority after-sales support',
    ],
    optionalUpgrades: [
      'Battery bank sized to your essential loads',
      'Additional capacity for future load growth',
      'Extended warranty options, where the manufacturer offers them',
    ],
    exclusions: sharedExclusions,
    keyAdvantages: [
      'Backup capability during grid outages when battery is included',
      'Highest component specification offered',
      'Comprehensive protection and finish',
      'Priority support after commissioning',
    ],
    expectedOutcome:
      'A high-specification system that reduces your grid consumption and, with a battery, keeps your essential loads running through an outage.',
    pricePerKw: TBD,
    indicativePriceNote: TBD,
    subsidyNote:
      'Subsidy applicability depends on your consumer category and system configuration, and is subject to prevailing government guidelines. Battery and off-grid components are treated differently from grid-connected capacity.',
    netPayableNote: TBD,
    warranty: [
      { label: 'Module warranty', value: TBD },
      { label: 'Inverter warranty', value: TBD },
      { label: 'Battery warranty', value: TBD },
      { label: 'Workmanship', value: TBD },
    ],
    notes: [
      'Battery capacity is sized to the specific circuits you want backed up, not to the whole property.',
      'Batteries have their own service life, separate from the modules.',
      'Final specification is confirmed after site assessment.',
    ],
    cta: {
      primary: 'Request Quote',
      enquire: 'Enquire About Premium Plan',
      whatsapp: 'WhatsApp About Premium Plan',
      call: 'Call About Premium Plan',
    },
    seo: {
      title: 'Premium Solar Plan | Hybrid & Battery Backup | Kapizo Solar',
      description:
        'The Kapizo Premium Plan offers a high-specification rooftop solar build with hybrid capability and optional battery backup, for homes and businesses in Telangana.',
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
  return `Hello Kapizo Solar, I am interested in the ${plan.name}. Please share the details, specification and pricing for my property.`
}
