import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { waMessages, whatsappHref } from '@/data/business'
import { CONFIGURABLE_PLACEHOLDER, PRICING_STATEMENT, plans } from '@/data/plans'
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

  const suggested = plans.find((p) => p.id === result.suggestedPlan)

  const quoteMessage = `Hello Kapizo Solar, I used the solar calculator on your website and would like a detailed quote.

Monthly bill: ₹${formatNumber(monthlyBill)}
Location: ${state}
Customer type: ${consumerTypes.find((c) => c.value === consumerType)?.label}
Estimated system: ${result.recommendedKw} kW
Estimated annual savings: ${formatINR(result.annualSavings)}
Preference: ${preference === 'hybrid' ? 'Hybrid (with battery)' : 'On-grid'}

Please share the recommended system size, cost and subsidy eligibility.`

  // The two figures a customer decides on: what to install, and what it saves.
  const headline = [
    {
      icon: PanelIcon,
      label: 'Recommended capacity',
      value: `${result.recommendedKw} kW`,
      note: 'Sized to your yearly usage, then rounded to a practical system size.',
      tone: 'green' as const,
    },
    {
      icon: BoltIcon,
      label: 'Estimated annual savings',
      value: formatINR(result.annualSavings),
      note: 'Units offset in a year, valued at your tariff. Before any subsidy.',
      tone: 'orange' as const,
    },
  ]

  // Supporting figures, secondary to the two above. Annual generation runs the
  // full width because it is the number the two headline figures are derived
  // from, and it was getting lost among the smaller tiles.
  const supporting = [
    {
      icon: SunIcon,
      label: 'Annual generation',
      value: `${formatNumber(result.annualGenerationUnits)} units`,
      note: 'Expected output over a full year, averaged across the seasons.',
      emphasis: true,
      wide: true,
    },
    { icon: SunIcon, label: 'Monthly generation', value: `${formatNumber(result.monthlyGenerationUnits)} units` },
    { icon: BoltIcon, label: 'Annual bill offset', value: `${result.offsetPercent}% of usage` },
    // Payback is shown only once verified system pricing is configured; it
    // cannot be derived without assuming a price per kW.
    ...(result.paybackYears !== null
      ? [{ icon: CalculatorIcon, label: 'Indicative payback', value: `~${result.paybackYears} years` }]
      : []),
    { icon: PanelIcon, label: 'Rooftop area needed', value: `~${formatNumber(result.requiredAreaSqft)} sq ft` },
    { icon: LeafIcon, label: 'CO₂ avoided per year', value: `~${result.co2TonnesPerYear} tonnes` },
  ]

  return (
    <div className={compact ? '' : 'card p-5 sm:p-7 lg:p-8'}>
      <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kapizo-orange-deep text-[11px] font-bold text-white"
              >
                1
              </span>
              <h3 className="font-display text-xl font-bold text-kapizo-navy">Your details</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Start with your monthly bill. If you know your tariff or terrace size, adding them
              sharpens the estimate.
            </p>
            {/* States the method plainly: the size follows the usage, rather than
                a package being recommended first and justified afterwards. */}
            <p className="mt-3 flex items-start gap-2 border-l-2 border-kapizo-green/50 pl-3 text-xs leading-relaxed text-slate-600">
              We size the system from the units you actually consume, not from a fixed package.
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

            <div>
              <button
                type="button"
                onClick={handleCalculate}
                className="btn-primary w-full !py-3.5 text-base"
              >
                <CalculatorIcon className="h-5 w-5" />
                Calculate My Solar Estimate
              </button>
              <p className="mt-2 text-center text-[11px] text-slate-500">
                Takes about thirty seconds. No contact details needed.
              </p>
            </div>
          </div>
          </div>
        </div>

        <div className="lg:col-span-3" ref={resultsRef}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-kapizo-green text-[11px] font-bold text-white"
              >
                2
              </span>
              <h3 className="font-display text-xl font-bold text-kapizo-navy">Indicative estimate</h3>
            </div>
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
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {headline.map(({ icon: Icon, label, value, note, tone }) => (
                  <div
                    key={label}
                    className={`relative overflow-hidden rounded-xl border-2 p-4 sm:p-5 ${
                      tone === 'green'
                        ? 'border-kapizo-green/35 bg-gradient-to-br from-kapizo-green/[0.07] to-transparent'
                        : 'border-kapizo-orange-deep/35 bg-gradient-to-br from-kapizo-orange/[0.09] to-transparent'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 top-0 h-1 ${
                        tone === 'green' ? 'bg-kapizo-green' : 'bg-kapizo-orange-deep'
                      }`}
                    />
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`h-4 w-4 ${
                          tone === 'green' ? 'text-kapizo-green' : 'text-kapizo-orange-deep'
                        }`}
                      />
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {label}
                      </p>
                    </div>
                    <p
                      className={`mt-2 font-display text-3xl font-extrabold leading-none tracking-tight ${
                        tone === 'green' ? 'text-kapizo-green-dark' : 'text-kapizo-orange-deep'
                      }`}
                    >
                      {value}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {supporting.map(({ icon: Icon, label, value, note, emphasis, wide }) => (
                  <div
                    key={label}
                    className={`rounded-xl border p-3.5 ${wide ? 'col-span-2' : ''} ${
                      emphasis
                        ? 'border-kapizo-green/30 bg-kapizo-green/[0.05]'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className={`h-3.5 w-3.5 ${emphasis ? 'text-kapizo-green' : 'text-slate-400'}`} />
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {label}
                      </p>
                    </div>
                    <p
                      className={`mt-1.5 font-display font-extrabold leading-tight ${
                        wide ? 'text-2xl' : 'text-lg'
                      } ${emphasis ? 'text-kapizo-green-dark' : 'text-kapizo-navy'}`}
                    >
                      {value}
                    </p>
                    {note && <p className="mt-1 text-xs leading-relaxed text-slate-500">{note}</p>}
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-kapizo-navy/15 bg-kapizo-navy/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Suggested starting point
                </p>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <p className="font-display text-lg font-extrabold text-kapizo-navy">
                    {suggested?.name ?? CONFIGURABLE_PLACEHOLDER}
                    {suggested?.recommended && (
                      <span className="ml-1.5 text-base" aria-hidden="true">
                        ⭐
                      </span>
                    )}
                  </p>
                  {suggested && (
                    <Link
                      to={`/plans/${suggested.slug}`}
                      className="text-sm font-semibold text-kapizo-green hover:underline"
                    >
                      View plan details →
                    </Link>
                  )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{PRICING_STATEMENT}</p>
              </div>

              {result.cappedByRoof && (
                <p className="mt-3 rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-xs text-blue-900">
                  Your capacity has been limited by the rooftop area you entered. A larger system may
                  be possible with an elevated structure. We can assess this during a site visit.
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
