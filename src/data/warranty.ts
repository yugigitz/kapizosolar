/**
 * SINGLE SOURCE OF TRUTH for warranty wording.
 *
 * Two separate things are described here and the market routinely blurs them:
 *
 *   1. Kapizo's own workmanship warranty, which Kapizo controls and can state
 *      as a firm commitment.
 *   2. Equipment warranties, which come from the manufacturer of whatever is
 *      actually supplied and vary by make and model.
 *
 * The website deliberately publishes no universal equipment warranty duration.
 * A blanket "25-year panel warranty" or "10-year inverter warranty" is a
 * promise about somebody else's product that Kapizo cannot honour if the
 * selected component carries different terms. Actual durations belong in the
 * customer's quotation, where the components are known.
 */

export type WarrantyLayer = {
  id: string
  layer: string
  provider: string
  /** Firm only where Kapizo controls it. Otherwise deferred to the quotation. */
  duration: string
  covers: string
  /** Shown where the distinction is easy to get wrong. */
  note?: string
}

export const WORKMANSHIP_WARRANTY_YEARS = 3
export const WORKMANSHIP_WARRANTY_NAME = '3-Year Kapizo Installation Workmanship Warranty'

export const WARRANTY_LAYERS: WarrantyLayer[] = [
  {
    id: 'workmanship',
    layer: 'Kapizo installation workmanship warranty',
    provider: 'Kapizo Solar',
    duration: '3 years from commissioning',
    covers:
      'Defects directly attributable to Kapizo installation workmanship, including mounting and roof-penetration workmanship, wiring joints and terminations, and loose connections caused by installation quality.',
    note: 'This is the part we control, so it is the part we state as a firm commitment. Detailed terms come with your quotation.',
  },
  {
    id: 'module-product',
    layer: 'Solar module product warranty',
    provider: 'Module manufacturer',
    duration: 'Per the selected manufacturer',
    covers: 'Manufacturing and material defects in the panel itself.',
    note: 'Durations differ by make and model, so the figure that applies to your system is confirmed in your quotation rather than promised here.',
  },
  {
    id: 'module-performance',
    layer: 'Solar module performance warranty',
    provider: 'Module manufacturer',
    duration: 'Per the selected manufacturer',
    covers:
      'The panel\'s power output over time, measured against that manufacturer\'s published degradation curve.',
    note: 'Module makers commonly publish a long performance warranty, considerably longer than the product warranty on the same panel. The two cover different things and the exact terms are the manufacturer\'s, not ours.',
  },
  {
    id: 'inverter',
    layer: 'Inverter warranty',
    provider: 'Inverter manufacturer',
    duration: 'Per the selected manufacturer',
    covers: 'The inverter unit, on that manufacturer\'s terms for the selected model.',
    note: 'Many models offer a paid extension. Worth asking about, since the inverter usually needs attention before anything else on the roof.',
  },
]

/** The distinction customers most often get wrong, in one sentence. */
export const WARRANTY_KEY_DISTINCTION =
  'A product warranty covers manufacturing and material defects in the panel. A performance warranty covers how much power that panel still produces years later. They run for different lengths and they cover different things, so a single headline number tells you very little.'

/** Equipment warranties are the manufacturer\'s, and are stated as such. */
export const EQUIPMENT_WARRANTY_NOTE =
  'Equipment warranties are provided according to the selected manufacturer\'s applicable warranty terms. Because the modules, inverter and balance-of-system are chosen to suit your site, the durations that apply to your system are confirmed in your quotation.'

export const WORKMANSHIP_WARRANTY_SUMMARY =
  'Covers defects directly attributable to Kapizo Solar installation workmanship, for 3 years from commissioning, subject to the detailed warranty terms provided with your quotation.'

/**
 * Roof leakage, stated properly.
 *
 * A blanket "roof leakage is not covered" is the industry's usual dodge and it
 * is not honest: if our penetration workmanship caused the leak, that is our
 * defect. What is genuinely outside the workmanship warranty is a roof that was
 * already failing before we arrived.
 */
export const ROOF_LEAKAGE_POSITION = {
  covered:
    'If leakage is directly caused by Kapizo installation workmanship, for example a roof penetration we made or sealed, it is covered during the workmanship warranty period.',
  notCovered:
    'Pre-existing leakage, structural defects, deteriorated or ageing roofing material, unrelated civil work, and modifications made by others are not Kapizo workmanship defects and fall outside this warranty.',
  assessment:
    'Roof condition is noted during the site assessment. Where a roof already shows signs of leakage or deterioration, we tell you before installation rather than after.',
}

/**
 * Indicative exclusions for the workmanship warranty. Orientation for the
 * customer, not the contract: the website is deliberately not a warranty
 * document and makes no legal claim beyond the actual terms.
 */
export const WORKMANSHIP_EXCLUSIONS = [
  'Manufacturer equipment defects, which fall under the respective manufacturer warranty',
  'Pre-existing roof leakage, structural defects and deteriorated roofing material',
  'Lightning, fire, flooding and severe weather beyond design conditions',
  'Rodent and pest damage',
  'Unauthorised modifications, or work on the system by others',
  'Physical damage after handover',
  'Grid abnormalities beyond equipment specifications',
  'Normal wear and tear',
]

export const WARRANTY_TERMS_NOTE =
  'Exact warranty coverage, exclusions and terms are provided in the final quotation and warranty documents.'

export const AMC_NAME = 'Optional annual maintenance contract (AMC)'

export const AMC_SUMMARY =
  'Available as an optional service for preventive maintenance and cleaning, subject to Kapizo Solar\'s AMC offering at the time.'
