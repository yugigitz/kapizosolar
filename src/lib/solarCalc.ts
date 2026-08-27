import type { PlanId } from '@/data/plans'

export type ConsumerType = 'residential' | 'commercial' | 'industrial' | 'agricultural'

export type CalcInput = {
  monthlyBill: number
  state: string
  consumerType: ConsumerType
  roofAreaSqft?: number
  tariffPerUnit?: number
  systemPreference?: 'on-grid' | 'hybrid'
}

export type CalcResult = {
  assumedTariff: number
  monthlyUnits: number
  recommendedKw: number
  cappedByRoof: boolean
  monthlyGenerationUnits: number
  annualGenerationUnits: number
  annualOffsetUnits: number
  offsetPercent: number
  annualSavings: number
  /** null until verified system pricing is configured. */
  paybackYears: number | null
  requiredAreaSqft: number
  co2TonnesPerYear: number
  /**
   * Which of the three options to suggest. A PlanId rather than a display
   * name, so renaming an option in plans.ts does not require a change here.
   */
  suggestedPlan: PlanId
}

/**
 * Indicative default tariffs by consumer category (INR/unit). These are planning
 * assumptions for an estimate only — actual tariffs are set by the DISCOM and vary
 * by slab, category and sanctioned load.
 */
export const DEFAULT_TARIFFS: Record<ConsumerType, number> = {
  residential: 7.5,
  commercial: 9.5,
  industrial: 8.5,
  agricultural: 6.0,
}

/** Indicative specific yield (units per kW per day, annual average) for Telangana conditions. */
export const SPECIFIC_YIELD_PER_KW_PER_DAY = 4.2

/** Indicative installed cost per kW (INR), used only for a rough payback range. */
/**
 * Installed cost per kW, used ONLY to derive a payback period.
 *
 * Deliberately unset. Publishing a payback figure requires assuming a system
 * price, and Kapizo has not issued verified commercial pricing — an assumed
 * rate here would put an invented price per kW in front of customers.
 *
 * Set the real rates here and the payback output appears automatically
 * everywhere, with no component changes.
 */
const SYSTEM_COST_PER_KW: Record<ConsumerType, number | null> = {
  residential: null,
  commercial: null,
  industrial: null,
  agricultural: null,
}

/** Indicative shadow-free area required per kW (sq ft). */
export const AREA_SQFT_PER_KW = 90

/** Indicative grid emission factor (tonnes CO2 per MWh) for the Indian grid. */
const CO2_TONNES_PER_UNIT = 0.00082

export const STATES = [
  'Telangana',
  'Andhra Pradesh',
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Chhattisgarh',
  'Odisha',
  'Other',
]

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step
}

export function calculateSolar(input: CalcInput): CalcResult {
  const assumedTariff =
    input.tariffPerUnit && input.tariffPerUnit > 0
      ? input.tariffPerUnit
      : DEFAULT_TARIFFS[input.consumerType]

  const monthlyUnits = input.monthlyBill / assumedTariff
  const dailyUnits = monthlyUnits / 30

  // Size so that annual generation broadly matches annual consumption.
  let recommendedKw = dailyUnits / SPECIFIC_YIELD_PER_KW_PER_DAY

  // Round to a practical increment.
  recommendedKw = recommendedKw < 3 ? roundTo(recommendedKw, 0.5) : roundTo(recommendedKw, 1)
  recommendedKw = Math.max(recommendedKw, 1)

  // Constrain by available roof area if the customer supplied it.
  let cappedByRoof = false
  if (input.roofAreaSqft && input.roofAreaSqft > 0) {
    const maxKwByArea = Math.floor((input.roofAreaSqft / AREA_SQFT_PER_KW) * 2) / 2
    if (maxKwByArea >= 1 && maxKwByArea < recommendedKw) {
      recommendedKw = maxKwByArea
      cappedByRoof = true
    }
  }

  const monthlyGenerationUnits = recommendedKw * SPECIFIC_YIELD_PER_KW_PER_DAY * 30
  const annualGenerationUnits = recommendedKw * SPECIFIC_YIELD_PER_KW_PER_DAY * 365

  const annualConsumptionUnits = monthlyUnits * 12
  const annualOffsetUnits = Math.min(annualGenerationUnits, annualConsumptionUnits)
  const offsetPercent =
    annualConsumptionUnits > 0
      ? Math.min(100, (annualGenerationUnits / annualConsumptionUnits) * 100)
      : 0

  const annualSavings = annualOffsetUnits * assumedTariff

  const preferenceMultiplier = input.systemPreference === 'hybrid' ? 1.35 : 1
  const indicativeCost =
    recommendedKw * (SYSTEM_COST_PER_KW[input.consumerType] ?? 0) * preferenceMultiplier
  // null until verified pricing exists, so no payback figure is published.
  const costPerKw = SYSTEM_COST_PER_KW[input.consumerType]
  const paybackYears =
    costPerKw !== null && annualSavings > 0 ? indicativeCost / annualSavings : null

  const requiredAreaSqft = Math.round(recommendedKw * AREA_SQFT_PER_KW)
  const co2TonnesPerYear = annualGenerationUnits * CO2_TONNES_PER_UNIT

  // Selection thresholds unchanged; only the returned identifier changed.
  let suggestedPlan: PlanId = 'recommended'
  if (input.systemPreference === 'hybrid' || recommendedKw >= 8) {
    suggestedPlan = 'high-performance'
  } else if (recommendedKw <= 2) {
    suggestedPlan = 'essential'
  }

  return {
    assumedTariff,
    monthlyUnits: Math.round(monthlyUnits),
    recommendedKw,
    cappedByRoof,
    monthlyGenerationUnits: Math.round(monthlyGenerationUnits),
    annualGenerationUnits: Math.round(annualGenerationUnits),
    annualOffsetUnits: Math.round(annualOffsetUnits),
    offsetPercent: Math.round(offsetPercent),
    annualSavings: Math.round(annualSavings),
    paybackYears: paybackYears === null ? null : Math.round(paybackYears * 10) / 10,
    requiredAreaSqft,
    co2TonnesPerYear: Math.round(co2TonnesPerYear * 10) / 10,
    suggestedPlan,
  }
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value)
}

export const systemSizeGuide = [
  {
    size: '1 kW',
    kw: 1,
    useCase: 'A small home with light usage: fans, lights, TV and a fridge.',
    area: '~90 sq ft',
    generation: '~4 units/day',
  },
  {
    size: '2 kW',
    kw: 2,
    useCase: 'A small to mid-size home, typically with one air conditioner used sparingly.',
    area: '~180 sq ft',
    generation: '~8 units/day',
  },
  {
    size: '3 kW',
    kw: 3,
    useCase: 'The most common residential size, a typical family home with regular AC use.',
    area: '~270 sq ft',
    generation: '~13 units/day',
  },
  {
    size: '5 kW',
    kw: 5,
    useCase: 'A larger home with multiple air conditioners, or a small shop or office.',
    area: '~450 sq ft',
    generation: '~21 units/day',
  },
  {
    size: '10 kW',
    kw: 10,
    useCase: 'A large residence, small commercial establishment, school or clinic.',
    area: '~900 sq ft',
    generation: '~42 units/day',
  },
  {
    size: '25 kW+',
    kw: 25,
    useCase: 'Commercial and industrial premises with substantial daytime load.',
    area: '~2,250 sq ft and above',
    generation: '~105 units/day and above',
  },
]
