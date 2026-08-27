/**
 * SINGLE SOURCE OF TRUTH for warranty wording.
 *
 * The website previously implied a single "25–30 year panel warranty". That is
 * a widespread and misleading shorthand in the Indian solar market: the 25–30
 * year figure is the PERFORMANCE (power output) warranty, while the product
 * (materials and workmanship) warranty on the same panel is typically 10–12
 * years. Presenting the long figure as though it covered the whole panel sets
 * an expectation the manufacturer will not honour.
 *
 * Four distinct layers are modelled here, each from a different provider:
 *   1. Module product warranty      — from the module manufacturer
 *   2. Module performance warranty  — from the module manufacturer
 *   3. Inverter warranty            — from the inverter manufacturer
 *   4. Installation workmanship     — from Kapizo Solar
 * Plus an optional AMC, which is a service, not a warranty.
 *
 * Typical ranges only. The actual terms depend on the components selected for
 * a specific project and are stated in that customer's quotation.
 */

export type WarrantyLayer = {
  id: string
  layer: string
  provider: string
  typical: string
  covers: string
  /** Shown where the distinction is easy to get wrong. */
  note?: string
}

export const WARRANTY_LAYERS: WarrantyLayer[] = [
  {
    id: 'module-product',
    layer: 'Solar module — product warranty',
    provider: 'Module manufacturer',
    typical: 'Typically 10–12 years',
    covers: 'Manufacturing and material defects in the panel itself.',
    note: 'This is the warranty that covers the physical panel. It is shorter than the performance warranty, and the two are often confused.',
  },
  {
    id: 'module-performance',
    layer: 'Solar module — performance warranty',
    provider: 'Module manufacturer',
    typical: 'Typically 25–30 years',
    covers:
      'The panel\'s guaranteed power output over time, against the manufacturer\'s published degradation curve.',
    note: 'A performance warranty is not a promise that the panel will not fail — it is a promise about how much power it will still produce.',
  },
  {
    id: 'inverter',
    layer: 'Inverter warranty',
    provider: 'Inverter manufacturer',
    typical: 'Typically 5–10 years',
    covers: 'The inverter unit, per the manufacturer\'s terms for the selected model.',
    note: 'Many models offer a paid extension. Worth considering, since the inverter is the component most likely to need attention first.',
  },
  {
    id: 'workmanship',
    layer: 'Kapizo installation workmanship warranty',
    provider: 'Kapizo Solar',
    typical: '1 year from commissioning',
    covers:
      'Installation workmanship attributable to Kapizo — installation defects, mounting and roof-penetration workmanship, wiring joints and terminations, and loose connections caused by installation quality.',
  },
]

/** The distinction customers most often get wrong, in one sentence. */
export const WARRANTY_KEY_DISTINCTION =
  'Product warranty covers manufacturing and material defects. Performance warranty covers the panel\'s guaranteed power output over time. They are different lengths and they cover different things.'

export const WORKMANSHIP_WARRANTY_NAME = '1-Year Kapizo Installation Workmanship Warranty'

export const WORKMANSHIP_WARRANTY_SUMMARY =
  'Covers installation workmanship attributable to Kapizo Solar, including applicable installation defects, mounting and roof-penetration workmanship, wiring joints and terminations, and loose connections caused by installation quality.'

/**
 * Indicative exclusions. These are commercial terms for orientation, not the
 * contract — the website is deliberately not a warranty document.
 */
export const WORKMANSHIP_EXCLUSIONS = [
  'Manufacturer equipment defects, which are covered by the respective manufacturer warranty',
  'Lightning, fire, flooding and severe weather beyond design conditions',
  'Rodent and pest damage',
  'Unauthorised modifications or third-party work on the system',
  'Physical damage after handover',
  'Grid abnormalities beyond equipment specifications',
  'Normal wear and tear',
]

export const WARRANTY_TERMS_NOTE =
  'Exact warranty coverage, exclusions and terms are provided in the final quotation and warranty documents.'

export const AMC_NAME = 'Optional annual maintenance contract (AMC)'

export const AMC_SUMMARY =
  'Available as an optional service for preventive maintenance and cleaning, subject to Kapizo Solar\'s AMC offering at the time.'
