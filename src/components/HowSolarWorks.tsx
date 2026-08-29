import { BatteryIcon, BoltIcon, GridIcon, HomeIcon, PanelIcon, ShieldIcon, SunIcon } from './ui/Icons'
import Reveal from './ui/Reveal'

const steps = [
  { icon: SunIcon, title: 'Sunlight', detail: 'Irradiance falls on the module surface through the day.' },
  { icon: PanelIcon, title: 'Solar Panels', detail: 'Modules convert sunlight into DC electricity.' },
  { icon: ShieldIcon, title: 'DC Protection', detail: 'DC isolators, fuses and surge protection on the array side.' },
  { icon: BoltIcon, title: 'Solar Inverter', detail: 'Converts DC into grid-quality AC and tracks maximum power.' },
  { icon: ShieldIcon, title: 'AC Protection', detail: 'AC breakers, RCD and earthing before the distribution board.' },
  { icon: HomeIcon, title: 'Home / Business Loads', detail: 'Your appliances and equipment run on solar first.' },
  { icon: GridIcon, title: 'Grid or Battery', detail: 'Surplus is exported to the grid, or stored if you have a battery.' },
]

export default function HowSolarWorks() {
  return (
    <section className="section bg-kapizo-navy" id="how-it-works">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow !text-kapizo-amber">How Solar Works</span>
          <h2 className="h-section mt-3 !text-white">
            From sunlight to your switchboard
          </h2>
          <p className="lede mt-4 !text-slate-300">
            Rooftop solar is a straightforward chain. Understanding it helps you judge whether a
            proposal you receive is complete, particularly the protection stages, which are the
            easiest to leave out.
          </p>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={i * 60}
              className="relative rounded-xl border border-white/10 bg-white/[0.04] p-5"
            >
              <span className="absolute right-4 top-4 font-display text-2xl font-extrabold text-white/10">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-kapizo-amber/15 text-kapizo-amber">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-white">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{step.detail}</p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-8 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm leading-relaxed text-slate-300">
          <BatteryIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-kapizo-green-light" />
          In an on-grid system there is no battery, and the inverter shuts down during a grid outage
          for line-worker safety. A hybrid system keeps your backed-up circuits running from the
          battery instead.
        </p>
      </div>
    </section>
  )
}
