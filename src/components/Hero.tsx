import { Link } from 'react-router-dom'
import { KapizoBanner } from './ui/BrandImage'
import { waMessages } from '@/data/business'
import { WhatsAppButton } from './ui/CTAButtons'
import { ArrowRightIcon, BoltIcon, CalculatorIcon, CheckIcon, MapPinIcon, ShieldIcon } from './ui/Icons'

/**
 * Water-light texture that sits behind the wordmark's "ZO".
 *
 * Generated as an SVG turbulence pattern and applied as a CSS background layer
 * behind the logo <img>. The official logo asset is not modified, cropped or
 * composited with anything — remove this layer and the artwork is unchanged.
 */
const ZO_RIPPLE = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='520' height='260'>" +
    "<filter id='w' x='0' y='0' width='100%' height='100%'>" +
    "<feTurbulence type='fractalNoise' baseFrequency='0.013 0.045' numOctaves='5' seed='13' result='t'/>" +
    "<feColorMatrix in='t' type='matrix' values='0 0 0 0 0.66 0 0 0 0 0.88 0 0 0 0 1 0 0 0 1.7 -0.62'/>" +
    "</filter><rect width='100%' height='100%' filter='url(%23w)'/></svg>",
)

/** Confines the ripple to the ZO, so nothing appears behind KAPI. */
const ZO_MASK =
  'radial-gradient(21% 29% at 71% 47%, #000 0%, rgba(0,0,0,0.78) 46%, rgba(0,0,0,0.30) 74%, transparent 100%)'

const trustPoints = [
  { icon: ShieldIcon, text: 'Engineering-first system design' },
  { icon: BoltIcon, text: 'On-grid, hybrid & off-grid options' },
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

      <div className="container-kapizo relative pb-24 pt-12 sm:pb-28 sm:pt-14 lg:pb-32 lg:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-kapizo-amber backdrop-blur">
              <BoltIcon className="h-3.5 w-3.5" />
              Solar EPC - Mancherial, Telangana
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
              <Link to="/solar-calculator" className="btn-cta !px-6 !py-3.5 text-base">
                <CalculatorIcon className="h-5 w-5" />
                Calculate My Savings
                <ArrowRightIcon />
              </Link>
              {/* The WhatsApp glyph sits in a filled green disc so the channel is
                  identifiable at a glance against the dark hero. */}
              <WhatsAppButton
                message={waMessages.quote}
                label="Get Solar Quote"
                className="btn-ghost-light !px-6 !py-3.5 text-base [&>svg]:h-[15px] [&>svg]:w-[15px] [&>svg]:box-content [&>svg]:rounded-full [&>svg]:bg-[#25D366] [&>svg]:p-[5.5px] [&>svg]:text-white"
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
                {/*
                  No plate behind the logo. The banner stays transparent and the
                  blue-green hero gradient shows through around it.

                  The one legibility problem is local: the wordmark's "ZO" is
                  green and meets the green side of the gradient. So the light
                  is local too — a soft cool bloom sitting behind that part of
                  the wordmark, with a wider, much fainter wash under the rest
                  so the two never form a visible edge. No ring, no fill, no
                  shape: only a diffused lightening of the ground beneath the
                  letters.
                */}
                <div className="relative px-1.5 py-5 sm:py-[22px]">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: [
                        // Pooled behind the "ZO", the one part of the artwork that
                        // meets the green side of the gradient.
                        'radial-gradient(23% 31% at 71% 47%, rgba(214,244,255,0.74) 0%, rgba(186,230,252,0.58) 30%, rgba(150,214,246,0.34) 55%, rgba(130,200,238,0.13) 78%, rgba(255,255,255,0) 100%)',
                        // A wider, fainter wash so the pool has no edge to end on.
                        'radial-gradient(30% 37% at 70% 47%, rgba(214,238,255,0.13) 0%, rgba(214,238,255,0.05) 58%, rgba(255,255,255,0) 100%)',
                      ].join(', '),
                    }}
                  />
                  {/*
                    Caustic ripple, generated by SVG turbulence and masked to the
                    same ellipse. It is a CSS layer behind the <img>: the logo
                    file is never touched, and nothing is composited into it.
                  */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.52] mix-blend-screen"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,${ZO_RIPPLE}")`,
                      backgroundSize: '58% 76%',
                      backgroundPosition: '71% 47%',
                      backgroundRepeat: 'no-repeat',
                      maskImage: ZO_MASK,
                      WebkitMaskImage: ZO_MASK,
                    }}
                  />
                  <KapizoBanner
                    alt="Kapizo Solar rooftop solar EPC services in Telangana"
                    className="relative mx-auto w-full"
                    priority
                  />
                </div>
                {/*
                  Three columns from sm up, and not equal thirds: the segments
                  column needs the extra width so its three lines never break
                  mid-phrase. Below sm there is not room for three nowrap
                  columns, so the list stacks instead of overflowing the card.
                */}
                <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-white/10 pt-5 text-center sm:grid-cols-[0.86fr_1.5fr_0.78fr] sm:gap-1.5">
                  <div className="flex flex-col">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      Systems
                    </dt>
                    <dd className="mt-1 text-[12.5px] font-bold leading-[1.62] text-white sm:whitespace-nowrap sm:text-[11.5px]">
                      On-Grid <span className="text-kapizo-green-light">&bull;</span> Hybrid{' '}
                      <span className="text-kapizo-orange-light">&bull;</span> Off-Grid
                    </dd>
                  </div>
                  <div className="flex flex-col sm:border-x sm:border-white/10">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      Segments
                    </dt>
                    <dd className="mt-1 text-[12.5px] font-bold leading-[1.62] text-white sm:whitespace-nowrap sm:text-[11.5px]">
                      Residential
                      <br />
                      Commercial &amp; Industrial
                      <br />
                      Agriculture &amp; Institutions
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                      Coverage
                    </dt>
                    <dd className="mt-1 text-[12.5px] font-bold leading-[1.62] text-white sm:whitespace-nowrap sm:text-[11.5px]">
                      Across
                      <br />
                      <span className="text-kapizo-green-light">Telangana</span>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
                <span className="mt-px flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#2fa84f] text-white">
                  <CheckIcon className="h-[15px] w-[15px]" />
                </span>
                <p className="text-xs leading-relaxed text-slate-300">
                  Every system is sized from your electricity bill and a site assessment, never from
                  a generic package list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        Curved transition into the section below. Sits inside the hero and is
        painted in the next section's colour, so the two meet on a curve rather
        than a straight edge.
      */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] z-[3] leading-[0]">
        <svg
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="block h-10 w-full sm:h-14 lg:h-[78px]"
        >
          <path
            d="M0,30 C170,58 330,84 560,80 C800,76 1000,44 1200,30 C1300,23 1370,22 1440,26 L1440,110 L0,110 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  )
}
