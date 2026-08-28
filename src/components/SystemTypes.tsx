import { useState } from 'react'
import { systemTypes } from '@/data/services'
import { ArrowRightIcon, BatteryIcon, CheckIcon, GridIcon, PanelIcon, SunIcon } from './ui/Icons'

const flowIcons = [SunIcon, PanelIcon, BatteryIcon, GridIcon]

export default function SystemTypes() {
  const [active, setActive] = useState(systemTypes[0].id)
  const current = systemTypes.find((s) => s.id === active) ?? systemTypes[0]

  return (
    <section className="section bg-white" id="system-types">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow">System Types</span>
          <h2 className="h-section mt-3">On-grid, hybrid or off-grid?</h2>
          <p className="lede mt-4">
            It comes down to what the site needs. Battery storage is not a system type of its
            own: it is the component that lets a hybrid or off-grid system keep running when the
            grid cannot.
          </p>
        </div>

        <div className="mt-10" role="tablist" aria-label="Solar system types">
          <div className="flex flex-wrap gap-2">
            {systemTypes.map((sys) => (
              <button
                key={sys.id}
                role="tab"
                aria-selected={active === sys.id}
                aria-controls={`panel-${sys.id}`}
                id={`tab-${sys.id}`}
                onClick={() => setActive(sys.id)}
                className={`rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
                  active === sys.id
                    ? 'border-kapizo-navy bg-kapizo-navy text-white'
                    : 'border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                }`}
              >
                {sys.name}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`panel-${current.id}`}
            aria-labelledby={`tab-${current.id}`}
            className="mt-6 grid gap-6 rounded-xl border border-slate-200 bg-slate-50/60 p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-kapizo-navy">{current.name}</h3>
              <p className="mt-1 text-sm font-semibold text-kapizo-orange-deep">{current.bestFor}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{current.explanation}</p>

              <ul className="mt-5 space-y-2.5">
                {current.considerations.map((c) => (
                  <li key={c} className="flex gap-2.5 text-sm text-slate-600">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-kapizo-green" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Energy flow
              </p>
              <ol className="space-y-2">
                {current.flow.map((node, i) => {
                  const Icon = flowIcons[Math.min(i, flowIcons.length - 1)]
                  return (
                    <li key={node}>
                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kapizo-orange/10 text-kapizo-orange-deep">
                          <Icon className="h-4.5 w-4.5" />
                        </span>
                        <span className="text-sm font-semibold text-kapizo-navy">{node}</span>
                      </div>
                      {i < current.flow.length - 1 && (
                        <div className="flex justify-center py-1" aria-hidden="true">
                          <ArrowRightIcon className="h-4 w-4 rotate-90 text-slate-300" />
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
