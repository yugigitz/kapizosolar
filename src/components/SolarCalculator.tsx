import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { waMessages, whatsappHref } from '@/data/business'
import { trackEvent } from '@/lib/analytics'
import {
  DEFAULT_TARIFFS,
  STATES,
  calculateSolar,
  formatINR,
  formatNumber,
  type ConsumerType,
} from '@/lib/solarCalc'
import { ArrowRightIcon, BoltIcon, CalculatorIcon, LeafIcon, PanelIcon, SunIcon, WhatsAppIcon } from './ui/Icons'

const consumerTypes: { value: ConsumerType; label: string }[] = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'agricultural', label: 'Agricultural' },
]

export default function SolarCalculator({ compact = false }: { compact?: boolean }) {
  const [monthlyBill, setMonthlyBill] = useState(3000)
  const [state, setState] = useState('Telangana')
  const [consumerType, setConsumerType] = useState<ConsumerType>('residential')
  const [roofArea, setRoofArea] = useState('')
  const [tariff, setTariff] = useState('')
  const [preference, setPreference] = useState<'on-grid' | 'hybrid'>('on-grid')
  const [showResults, setShowResults] = useState(false)
  const [started, setStarted] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const result = useMemo(
    () =>
      calculateSolar({
        monthlyBill,
        state,
        consumerType,
        roofAreaSqft: roofArea ? Number(roofArea) : undefined,
        tariffPerUnit: tariff ? Number(tariff) : undefined,
        systemPreference: preference,
      }),
    [monthlyBill, state, consumerType, roofArea, tariff, preference],
  )

  function markStarted() {
    if (!started) {
      setStarted(true)
      trackEvent('calculator_start')
    }
  }

  function handleCalculate() {
    setShowResults(true)
    trackEvent('calculator_complete', {
      monthly_bill: monthlyBill,
      consumer_type: consumerType,
      recommended_kw: result.recommendedKw,
    })
    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const quoteMessage = `Hello Kapizo Solar, I used the solar calculator on your website and would like a detailed quote.

Monthly bill: ₹${formatNumber(monthlyBill)}
Location: ${state}
Customer type: ${consumerTypes.find((c) => c.value === consumerType)?.label}
Estimated system: ${result.recommendedKw} kW
Estimated annual savings: ${formatINR(result.annualSavings)}
Preference: ${preference === 'hybrid' ? 'Hybrid (with battery)' : 'On-grid'}

Please share the recommended system size, cost and subsidy eligibility.`

  const outputs = [
    {
      icon: PanelIcon,
      label: 'Recommended capacity',
      value: `${result.recommendedKw} kW`,
      accent: true,
    },
    { icon: SunIcon, label: 'Monthly generation', value: `${formatNumber(result.monthlyGenerationUnits)} units` },
    { icon: SunIcon, label: 'Annual generation', value: `${formatNumber(result.annualGenerationUnits)} units` },
    { icon: BoltIcon, label: 'Annual bill offset', value: `${result.offsetPercent}% of usage` },
    { icon: BoltIcon, label: 'Estimated annual savings', value: formatINR(result.annualSavings), accent: true },
    { icon: CalculatorIcon, label: 'Indicative payback', value: `~${result.paybackYears} years` },
    { icon: PanelIcon, label: 'Rooftop area needed', value: `~${formatNumber(result.requiredAreaSqft)} sq ft` },
    { icon: LeafIcon, label: 'CO₂ avoided per year', value: `~${result.co2TonnesPerYear} tonnes` },
  ]

  return (
    <div className={compact ? '' : 'card p-5 sm:p-7 lg:p-8'}>
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-2">
          <h3 className="font-display text-xl font-bold text-kapizo-navy">Your details</h3>
          <p className="mt-1.5 text-sm text-slate-600">
            Start with your monthly bill. If you know your tariff or terrace size, adding them
            sharpens the estimate.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="calc-bill" className="field-label">
                Monthly electricity bill
              </label>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-500">₹</span>
                <input
                  id="calc-bill"
                  type="number"
                  inputMode="numeric"
                  min={300}
                  max={1000000}
                  value={monthlyBill}
                  onChange={(e) => {
                    markStarted()
                    setMonthlyBill(Math.max(0, Number(e.target.value)))
                  }}
                  className="field"
                />
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={Math.min(monthlyBill, 50000)}
                onChange={(e) => {
                  markStarted()
                  setMonthlyBill(Number(e.target.value))
                }}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-kapizo-orange"
                aria-label="Monthly electricity bill slider"
              />
              <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                <span>₹500</span>
                <span>₹50,000+</span>
              </div>
            </div>

            <div>
              <span className="field-label">Consumer type</span>
              <div className="grid grid-cols-2 gap-2">
                {consumerTypes.map((ct) => (
                  <button
                    key={ct.value}
                    type="button"
                    onClick={() => {
                      markStarted()
                      setConsumerType(ct.value)
                    }}
                    aria-pressed={consumerType === ct.value}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition-all ${
                      consumerType === ct.value
                        ? 'border-kapizo-green bg-kapizo-green/5 text-kapizo-green'
                        : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {ct.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="calc-state" className="field-label">
                State / location
              </label>
              <select
                id="calc-state"
                value={state}
                onChange={(e) => {
                  markStarted()
                  setState(e.target.value)
                }}
                className="field"
              >
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <details className="rounded-lg border border-slate-200 bg-slate-50/60">
              <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-kapizo-navy">
                Optional details for a closer estimate
              </summary>
              <div className="space-y-4 px-4 pb-4">
                <div>
                  <label htmlFor="calc-area" className="field-label">
                    Available rooftop area (sq ft)
                  </label>
                  <input
                    id="calc-area"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    placeholder="e.g. 400"
                    value={roofArea}
                    onChange={(e) => setRoofArea(e.target.value)}
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="calc-tariff" className="field-label">
                    Your electricity tariff (₹ per unit)
                  </label>
                  <input
                    id="calc-tariff"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min={0}
                    placeholder={`Default: ₹${DEFAULT_TARIFFS[consumerType]}`}
                    value={tariff}
                    onChange={(e) => setTariff(e.target.value)}
                    className="field"
                  />
                </div>
                <div>
                  <span className="field-label">System preference</span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['on-grid', 'hybrid'] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPreference(p)}
                        aria-pressed={preference === p}
                        className={`rounded-lg border px-3 py-2 text-sm font-semibold capitalize transition-all ${
                          preference === p
                            ? 'border-kapizo-green bg-kapizo-green/5 text-kapizo-green'
                            : 'border-slate-300 bg-white text-slate-600'
                        }`}
                      >
                        {p === 'hybrid' ? 'Hybrid + battery' : 'On-grid'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </details>

            <button type="button" onClick={handleCalculate} className="btn-primary w-full">
              <CalculatorIcon className="h-4 w-4" />
              Calculate My Solar Estimate
            </button>
          </div>
        </div>

        <div className="lg:col-span-3" ref={resultsRef}>
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-bold text-kapizo-navy">Indicative estimate</h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Estimate only
            </span>
          </div>

          {!showResults ? (
            <div className="mt-5 flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-6 text-center">
              <SunIcon className="h-9 w-9 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-500">
                Enter your bill to see an estimate
              </p>
              <p className="mt-1 max-w-xs text-xs text-slate-400">
                You will see the system size that suits your usage, what it should generate,
                and roughly what you would save.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {outputs.map(({ icon: Icon, label, value, accent }) => (
                  <div
                    key={label}
                    className={`rounded-xl border p-3.5 ${
                      accent
                        ? 'border-kapizo-green/30 bg-kapizo-green/[0.04]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className={`h-3.5 w-3.5 ${accent ? 'text-kapizo-green' : 'text-slate-400'}`} />
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                    </div>
                    <p
                      className={`mt-1.5 font-display text-lg font-extrabold leading-tight ${
                        accent ? 'text-kapizo-green' : 'text-kapizo-navy'
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-kapizo-navy/15 bg-kapizo-navy/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Suggested Kapizo plan
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-lg font-extrabold text-kapizo-navy">
                    {result.suggestedPlan} Plan
                  </p>
                  <Link
                    to={`/plans/${result.suggestedPlan.toLowerCase()}`}
                    className="text-sm font-semibold text-kapizo-green hover:underline"
                  >
                    View plan details →
                  </Link>
                </div>
              </div>

              {result.cappedByRoof && (
                <p className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-xs text-blue-900">
                  Your capacity has been limited by the rooftop area you entered. A larger system may
                  be possible with an elevated structure — we can assess this during a site visit.
                </p>
              )}

              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <a
                  href={whatsappHref(quoteMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('quote_request', { source: 'calculator' })}
                  className="btn-primary flex-1"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Get My Detailed Solar Quote
                </a>
                <Link to="/contact" className="btn-outline flex-1">
                  Send Enquiry
                  <ArrowRightIcon />
                </Link>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Assumptions used: {formatNumber(result.monthlyUnits)} units per month at ₹
                {result.assumedTariff}/unit, and an annual average of 4.2 units per kW per day for
                Telangana conditions. Actual generation and savings depend on your site, orientation,
                shading, tariff and system condition.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="disclaimer mt-7">
        <strong>This is an estimate, not a quotation.</strong> Treat these numbers as a starting
        point for the conversation. What you actually generate depends on which way your roof faces,
        whether anything shades it during the day, your location and weather through the year, the
        components used, your DISCOM tariff and how much electricity you really use. We only put a
        firm number in writing after seeing the roof.
      </div>
    </div>
  )
}
