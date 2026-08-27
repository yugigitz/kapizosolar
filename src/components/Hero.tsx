import { Link } from 'react-router-dom'
import { KapizoBanner } from './ui/BrandImage'
import { waMessages } from '@/data/business'
import { WhatsAppButton } from './ui/CTAButtons'
import { ArrowRightIcon, BoltIcon, CheckIcon, MapPinIcon, ShieldIcon } from './ui/Icons'

const trustPoints = [
  { icon: ShieldIcon, text: 'Engineering-first system design' },
  { icon: BoltIcon, text: 'On-grid, hybrid & storage options' },
  { icon: MapPinIcon, text: 'Serving Mancherial & Telangana' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-kapizo-gradient">
      <div className="absolute inset-0 bg-kapizo-radial" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      <div className="container-kapizo relative py-14 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-kapizo-amber backdrop-blur">
              <BoltIcon className="h-3.5 w-3.5" />
              Solar EPC · Mancherial, Telangana
            </span>

            <h1 className="mt-5 font-display text-[2rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.4rem]">
              Power Your Home.
              <br />
              <span className="text-kapizo-amber">Cut Your Electricity Costs.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              Professional rooftop solar solutions for homes, businesses and institutions across
              Telangana, designed around your actual consumption, installed to proper electrical
              standards.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/solar-calculator" className="btn-primary">
                Calculate My Savings
                <ArrowRightIcon />
              </Link>
              <WhatsAppButton
                message={waMessages.quote}
                label="Get Solar Quote"
                className="btn-ghost-light"
                context="hero"
              />
            </div>

            <ul className="mt-9 grid gap-3 sm:grid-cols-3">
              {trustPoints.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-kapizo-amber">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-5 backdrop-blur-sm sm:p-6">
                <KapizoBanner
                  alt="Kapizo Solar rooftop solar EPC services in Telangana"
                  className="w-full"
                  priority
                />
                <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      Systems
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-white">On-Grid · Hybrid</dd>
                  </div>
                  <div className="border-x border-white/10">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      Segments
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-white">Home · Business</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      Coverage
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-white">Telangana</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-kapizo-green-light" />
                <p className="text-xs leading-relaxed text-slate-300">
                  Every system is sized from your electricity bill and a site assessment, never from
                  a generic package list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
