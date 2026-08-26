import { Link } from 'react-router-dom'
import { solutions } from '@/data/services'
import { trackEvent } from '@/lib/analytics'
import Reveal from './ui/Reveal'
import { ArrowRightIcon, BuildingIcon, CheckIcon, FactoryIcon, HomeIcon, LeafIcon } from './ui/Icons'

const icons = {
  residential: HomeIcon,
  commercial: BuildingIcon,
  industrial: FactoryIcon,
  agricultural: LeafIcon,
} as const

export default function Solutions() {
  return (
    <section className="section bg-slate-50" id="solutions">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow">Solar Solutions</span>
          <h2 className="h-section mt-3">Solar built around how you actually use power</h2>
          <p className="lede mt-4">
            A home, a showroom, a factory and a farm each have different load patterns. We size and
            design for the segment rather than fitting everyone to the same template.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {solutions.map((sol, i) => {
            const Icon = icons[sol.slug as keyof typeof icons]
            return (
              <Reveal as="article" key={sol.slug} delay={i * 70} className="card card-hover flex flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-kapizo-navy text-kapizo-amber">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-kapizo-navy">{sol.title}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-kapizo-orange-deep">
                  {sol.audience}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{sol.summary}</p>

                <ul className="mt-4 flex-1 space-y-2">
                  {sol.benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-slate-600">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-kapizo-green" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/solutions/${sol.slug}`}
                  onClick={() => trackEvent('solar_solution_view', { solution: sol.slug })}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-kapizo-green hover:gap-2.5 transition-all"
                >
                  Explore {sol.title.split(' ')[0].toLowerCase()} solar
                  <ArrowRightIcon />
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
