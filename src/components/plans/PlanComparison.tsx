import { Link } from 'react-router-dom'
import { comparisonRows, plans, specValue } from '@/data/plans'
import { ArrowRightIcon } from '../ui/Icons'

export default function PlanComparison() {
  return (
    <div>
      {/* Desktop / tablet table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <caption className="sr-only">
            Comparison of Kapizo Solar Budget, Standard and Premium plans
          </caption>
          <thead>
            <tr>
              <th scope="col" className="w-[22%] border-b border-slate-200 px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                Feature
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={`border-b px-4 py-4 text-left align-top ${
                    plan.recommended
                      ? 'border-kapizo-green bg-kapizo-green/[0.04]'
                      : 'border-slate-200'
                  }`}
                >
                  <span className="font-display text-base font-extrabold text-kapizo-navy">
                    {plan.name}
                  </span>
                  {plan.recommended && (
                    <span className="ml-2 rounded-full bg-kapizo-green px-2 py-0.5 align-middle text-[9px] font-bold uppercase tracking-wider text-white">
                      Recommended
                    </span>
                  )}
                  <span className="mt-1 block text-xs font-medium normal-case text-slate-500">
                    {plan.audienceLabel}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="border-b border-slate-100 px-4 py-3.5 text-left font-semibold text-slate-600">
                Capacity range
              </th>
              {plans.map((plan) => (
                <td
                  key={plan.id}
                  className={`border-b border-slate-100 px-4 py-3.5 text-slate-700 ${
                    plan.recommended ? 'bg-kapizo-green/[0.03]' : ''
                  }`}
                >
                  {plan.capacityOptions}
                </td>
              ))}
            </tr>
            {comparisonRows.map((row) => (
              <tr key={row.key}>
                <th scope="row" className="border-b border-slate-100 px-4 py-3.5 text-left font-semibold text-slate-600">
                  {row.label}
                </th>
                {plans.map((plan) => (
                  <td
                    key={plan.id}
                    className={`border-b border-slate-100 px-4 py-3.5 text-slate-700 ${
                      plan.recommended ? 'bg-kapizo-green/[0.03]' : ''
                    }`}
                  >
                    {specValue(plan.specs[row.key])}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="px-4 py-5" />
              {plans.map((plan) => (
                <td key={plan.id} className={`px-4 py-5 ${plan.recommended ? 'bg-kapizo-green/[0.03]' : ''}`}>
                  <Link
                    to={`/plans/${plan.slug}`}
                    className={plan.recommended ? 'btn-primary w-full !py-2.5 text-xs' : 'btn-outline w-full !py-2.5 text-xs'}
                  >
                    View details
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile stacked comparison */}
      <div className="space-y-4 md:hidden">
        {plans.map((plan) => (
          <details
            key={plan.id}
            open={plan.recommended}
            className={`rounded-xl border bg-white ${
              plan.recommended ? 'border-kapizo-green' : 'border-slate-200'
            }`}
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3.5">
              <span>
                <span className="font-display text-base font-extrabold text-kapizo-navy">
                  {plan.name}
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">{plan.audienceLabel}</span>
              </span>
              {plan.recommended && (
                <span className="shrink-0 rounded-full bg-kapizo-green px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  Pick
                </span>
              )}
            </summary>
            <dl className="border-t border-slate-100 px-4 py-3 text-sm">
              <div className="flex flex-col gap-0.5 border-b border-slate-50 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Capacity range
                </dt>
                <dd className="text-slate-700">{plan.capacityOptions}</dd>
              </div>
              {comparisonRows.map((row) => (
                <div key={row.key} className="flex flex-col gap-0.5 border-b border-slate-50 py-2 last:border-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {row.label}
                  </dt>
                  <dd className="text-slate-700">{specValue(plan.specs[row.key])}</dd>
                </div>
              ))}
            </dl>
            <div className="px-4 pb-4">
              <Link to={`/plans/${plan.slug}`} className="btn-navy w-full !py-2.5 text-xs">
                View {plan.name}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
