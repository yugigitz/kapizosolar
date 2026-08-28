import { useMemo, useState } from 'react'
import { formatINR, formatNumber } from '@/lib/solarCalc'
import { BoltIcon, CalculatorIcon, PanelIcon } from './ui/Icons'

/**
 * Standard reducing-balance EMI.
 *
 *   EMI = P·r·(1+r)^n / ((1+r)^n − 1)
 *
 * with r the monthly rate and n the number of instalments. At r = 0 the
 * expression is undefined, so the interest-free case divides evenly instead.
 *
 * Exported so the figures can be checked directly rather than only through the
 * rendered output.
 */
export function calculateEmi(principal: number, annualRatePercent: number, months: number) {
  if (principal <= 0 || months <= 0) {
    return { emi: 0, totalPayable: 0, totalInterest: 0 }
  }
  const r = annualRatePercent / 12 / 100
  const emi = r === 0 ? principal / months : (principal * r * (1 + r) ** months) / ((1 + r) ** months - 1)
  const totalPayable = emi * months
  return {
    emi: Math.round(emi),
    totalPayable: Math.round(totalPayable),
    totalInterest: Math.round(totalPayable - principal),
  }
}

export default function SolarLoanCalculator() {
  const [amount, setAmount] = useState(0)
  const [rate, setRate] = useState(9)
  const [years, setYears] = useState(5)

  const months = years * 12
  const { emi, totalPayable, totalInterest } = useMemo(
    () => calculateEmi(amount, rate, months),
    [amount, rate, months],
  )

  const hasInput = amount > 0

  // Share of every rupee repaid that is interest. Derived from the figures
  // above, so it cannot drift away from them.
  const interestShare = totalPayable > 0 ? Math.round((totalInterest / totalPayable) * 100) : 0

  const outputs = [
    {
      icon: CalculatorIcon,
      label: 'Monthly EMI',
      value: hasInput ? formatINR(emi) : formatINR(0),
      note: `Payable every month for ${formatNumber(months)} months.`,
      lead: true,
    },
    {
      icon: BoltIcon,
      label: 'Total interest payable',
      value: hasInput ? formatINR(totalInterest) : formatINR(0),
      note: hasInput
        ? `About ${interestShare}% of everything you repay.`
        : 'Interest over the full tenure.',
      lead: false,
    },
    {
      icon: PanelIcon,
      label: 'Total amount payable',
      value: hasInput ? formatINR(totalPayable) : formatINR(0),
      note: 'Principal plus interest across the tenure.',
      lead: false,
    },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-kapizo-navy/[0.04] px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-kapizo-navy text-white"
          >
            <CalculatorIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-lg font-extrabold leading-tight text-kapizo-navy">
              Solar Loan EMI Calculator
            </p>
            <p className="text-xs text-slate-500">
              Work out the monthly instalment on an amount you are considering financing.
            </p>
          </div>
        </div>
        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800">
          Estimate only
        </span>
      </div>

      <div className="p-5 sm:p-7">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 border-l-4 border-l-kapizo-navy bg-slate-50/70 p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-kapizo-navy">Loan details</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Enter the amount, rate and tenure you have been offered. Kapizo Solar does not lend
                and is not tied to a lender, so nothing here is quoted from a specific bank.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label htmlFor="emi-amount" className="field-label">
                    Loan amount
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-500">₹</span>
                    <input
                      id="emi-amount"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={10000000}
                      placeholder="e.g. 200000"
                      value={amount === 0 ? '' : amount}
                      onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                      className="field"
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1000000}
                    step={10000}
                    value={Math.min(amount, 1000000)}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-kapizo-navy"
                    aria-label="Loan amount slider"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                    <span>₹0</span>
                    <span>₹10,00,000+</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="emi-rate" className="field-label">
                    Interest rate (% per year)
                  </label>
                  <input
                    id="emi-rate"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min={0}
                    max={36}
                    value={rate}
                    onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                    className="field"
                  />
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Use the rate your bank or lender has quoted you.
                  </p>
                </div>

                <div>
                  <label htmlFor="emi-tenure" className="field-label">
                    Tenure (years)
                  </label>
                  <input
                    id="emi-tenure"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={25}
                    value={years}
                    onChange={(e) => setYears(Math.min(25, Math.max(1, Number(e.target.value) || 1)))}
                    className="field"
                  />
                  <input
                    type="range"
                    min={1}
                    max={20}
                    step={1}
                    value={Math.min(years, 20)}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-kapizo-navy"
                    aria-label="Loan tenure slider"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                    <span>1 year</span>
                    <span>20 years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-bold text-kapizo-navy">Repayment estimate</h3>

            {!hasInput && (
              <p className="mt-3 rounded-lg border border-dashed border-kapizo-navy/25 bg-kapizo-navy/[0.03] px-3.5 py-2.5 text-xs font-semibold text-kapizo-navy">
                Enter a loan amount and the instalment figures fill in immediately.
              </p>
            )}

            <div className="mt-4 space-y-3">
              {outputs.map(({ icon: Icon, label, value, note, lead }) => (
                <div
                  key={label}
                  className={`rounded-xl border p-4 transition-colors duration-200 ${
                    lead && hasInput
                      ? 'border-2 border-kapizo-navy/30 bg-kapizo-navy/[0.04]'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className={`h-4 w-4 ${hasInput ? 'text-kapizo-navy' : 'text-slate-400'}`} />
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {label}
                    </p>
                  </div>
                  <p
                    className={`mt-1.5 font-display font-extrabold leading-tight ${
                      lead ? 'text-3xl' : 'text-xl'
                    } ${hasInput ? 'text-kapizo-navy' : 'text-slate-300'}`}
                  >
                    {value}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{note}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Calculated as a standard reducing-balance EMI on the amount, rate and tenure you
              entered. Lenders may add processing fees, insurance or other charges that are not part
              of this figure, and the rate you are actually offered depends on the lender's own
              assessment.
            </p>
          </div>
        </div>

        <div className="disclaimer mt-7">
          <strong>This is an estimate, not a loan offer.</strong> Kapizo Solar is not a lender and
          does not arrange finance. The figures above use only the numbers you entered, and no bank,
          scheme or eligibility is implied. Confirm the actual rate, tenure and charges with your
          lender before committing.
        </div>
      </div>
    </div>
  )
}
